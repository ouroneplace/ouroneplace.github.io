const {test, expect} = require('@playwright/test');
const fs = require('node:fs/promises');

// OP-104 regression: expected income arriving after a bill's due date must
// never obscure a dated, earlier cash shortage.
async function enterBill(page, name, amount, date) {
  await page.getByRole('tab', {name: '2. Bills'}).click();
  await page.locator('#billName').fill(name);
  await page.locator('#billAmount').fill(String(amount));
  if (date) await page.locator('#billDate').fill(date);
  await page.locator('#billForm button[type="submit"]').click();
}

async function enterIncome(page, name, amount, date) {
  await page.getByRole('tab', {name: '3. Income'}).click();
  await page.locator('#incomeName').fill(name);
  await page.locator('#incomeAmount').fill(String(amount));
  if (date) await page.locator('#incomeDate').fill(date);
  await page.locator('#incomeForm button[type="submit"]').click();
}

test('due-before-paycheck shows the $50 shortage, not a misleading $850 headline, across outputs', async ({page}) => {
  await page.goto('/one-place/money-bills.html');
  const dueDate = await page.locator('#billDate').inputValue();
  const paycheckDate = await page.locator('#incomeDate').inputValue();
  await page.locator('#cash').fill('450');
  await page.locator('#confirmed').check();
  await page.locator('#complete').check();
  await enterBill(page, 'rent', 500);
  await enterIncome(page, 'paycheck', 900);
  await expect(page.locator('#cashLabel')).toContainText('Estimated shortfall by ' + dueDate);
  await expect(page.locator('#cashResult')).toHaveText('$50.00 short');
  await expect(page.locator('#cashHelp')).toContainText(paycheckDate);
  await page.getByRole('tab', {name: '4. My action plan'}).click();
  await expect(page.locator('#planLines')).toContainText('Estimated shortfall by ' + dueDate);
  await expect(page.locator('#planLines')).toContainText('$50.00');
  await expect(page.locator('#planLines')).toContainText('Conditional balance');
  await expect(page.locator('#planLines')).toContainText('$850.00');
  await expect(page.locator('#planWarning')).toContainText('Estimated $50.00 cash shortfall');
  await expect(page.locator('#nextActions')).toContainText('Contact the bill provider before the due date');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#exportPlan').click();
  const download = await downloadPromise;
  const txt = await fs.readFile(await download.path(), 'utf8');
  expect(txt).toContain('Estimated shortfall by ' + dueDate + ': $50.00');
  expect(txt).toContain('Conditional balance after dated entries through ' + paycheckDate);
  expect(txt).toContain('NOT spendable now');
  await page.emulateMedia({media:'print'});
  await expect(page.locator('#planLines')).toContainText('Estimated shortfall by ' + dueDate);
});

test('future income is excluded from any available-cash headline when verification is incomplete', async ({page}) => {
  await page.goto('/one-place/money-bills.html');
  await page.locator('#cash').fill('450');
  await enterBill(page, 'rent', 500);
  await enterIncome(page, 'paycheck', 900);
  await expect(page.locator('#cashResult')).toHaveText('Not assessed');
  await page.getByRole('tab', {name:'4. My action plan'}).click();
  await expect(page.locator('#planLines')).not.toContainText('Conditional balance');
  await expect(page.locator('#planWarning')).toContainText('Not an affordability assessment');
});

test('same-day cumulative bills report the full first-day shortage', async ({page}) => {
  await page.goto('/one-place/money-bills.html');
  const billDate = await page.locator('#billDate').inputValue();
  await page.locator('#cash').fill('450');
  await page.locator('#confirmed').check();
  await page.locator('#complete').check();
  await enterBill(page, 'rent', 500);
  await enterBill(page, 'electric', 100, billDate);
  await expect(page.locator('#cashResult')).toHaveText('$150.00 short');
});


test('Money & Bills: current public resource labels and plan disclaimer', async ({page}) => {
  await page.goto('/one-place/money-bills.html');
  await expect(page.getByRole('link',{name:/CFPB · Consumer financial guidance/}))
    .toHaveAttribute('href','https://www.consumerfinance.gov/consumer-tools/');
  await page.getByRole('tab',{name:'4. My action plan'}).click();
  await expect(page.getByRole('link',{name:/CFPB · Money-management worksheets/}))
    .toHaveAttribute('href','https://www.consumerfinance.gov/consumer-tools/educator-tools/adult-financial-education/tools-and-resources/');
  const started=page.waitForEvent('download');
  await page.locator('#exportPlan').click();
  const txt=await fs.readFile(await (await started).path(),'utf8');
  expect(txt).toContain('Public tool preview - organizational guidance, not financial advice.');
  expect(txt).not.toContain('Founder review - organizational guidance');
});

test('Money & Bills: return to category without losing existing Debt Guide link',async({page}) => {
  for(const width of [1366,390,320]){
    await page.setViewportSize({width,height:850});
    await page.goto('/one-place/money-bills.html');
    const nav=page.getByRole('navigation',{name:'Money & Bills navigation'});
    await expect(nav.getByRole('link',{name:'Debt guide'})).toHaveAttribute('href','debt-creditor-guide.html');
    const back=nav.getByRole('link',{name:'← Money & Bills home'});
    await expect(back).toHaveAttribute('href','money-center.html');
    await expect(back).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
    await back.click();
    await expect(page).toHaveURL(/money-center/);
    await expect(page.getByRole('heading',{name:'Money & Bills',exact:true})).toBeVisible();
  }
});

// Issue #83: essential Money & Bills teaching remains available without JavaScript.
// Script-off controls cannot accept unprocessable financial information.
for(const config of [
 {width:320,root:'17px'},{width:390,root:'17px'},
 {width:1366,root:'17px'},{width:1920,root:'17px'},
 {width:320,root:'34px'},{width:390,root:'34px'}
]){
 test('Money Bills #83 readable script-off fallback '+config.width+'px root '+config.root,async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:config.width,height:740}});
  try{
   const page=await context.newPage();
   await page.goto('/one-place/money-bills.html');
   await page.evaluate(size=>document.documentElement.style.setProperty('font-size',size,'important'),config.root);
   for(const [panel,heading] of [
    ['overview','Start with the real situation'],
    ['bills','Add unpaid bills and commitments'],
    ['income','Add expected income'],
    ['plan','Your next-step summary']
   ]){
    await expect(page.locator('#panel-'+panel)).toBeVisible();
    await expect(page.getByRole('heading',{name:heading,exact:true})).toBeVisible();
   }
   await expect(page.getByRole('heading',{name:'Prepare to call a bill provider'})).toBeVisible();
   await expect(page.locator('noscript p')).toBeVisible();
   expect(await page.locator('noscript p').textContent()).toContain('Read-only without JavaScript');
   await expect(page.locator('.tabs')).toBeHidden();
   for(const s of ['#billForm','#incomeForm','.toolactions','#panel-overview .fieldrow','#panel-overview .check','#panel-plan .buttonrow'])
    await expect(page.locator(s+':visible')).toHaveCount(0);
   await expect(page.locator('#main button:visible,#main input:visible,#main select:visible,#main textarea:visible')).toHaveCount(0);
   const widths=await page.evaluate(()=>({viewport:innerWidth,doc:document.documentElement.scrollWidth}));
   expect(widths.doc).toBeLessThanOrEqual(widths.viewport+1);
  }finally{await context.close();}
 });
}
for(const width of [320,1366]){
 test('Money Bills #83 enhanced tab startup and keyboard navigation '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:740});
  await page.goto('/one-place/money-bills.html');
  await expect(page.locator('noscript')).toBeHidden();
  await expect(page.locator('#panel-overview')).toBeVisible();
  for(const id of ['bills','income','plan'])await expect(page.locator('#panel-'+id)).toBeHidden();
  await page.locator('#tab-bills').click();
  await expect(page.locator('#panel-bills')).toBeVisible();
  await page.locator('#tab-bills').press('ArrowRight');
  await expect(page.locator('#panel-income')).toBeVisible();
  await page.locator('#tab-income').press('ArrowRight');
  await expect(page.locator('#panel-plan')).toBeVisible();
  await expect(page.getByRole('heading',{name:'Prepare to call a bill provider'})).toBeVisible();
  await page.locator('#tab-plan').press('Home');
  await expect(page.locator('#panel-overview')).toBeVisible();
  await expect(page.locator('#tab-overview')).toHaveAttribute('aria-selected','true');
  expect(errors).toEqual([]);
 });
}
