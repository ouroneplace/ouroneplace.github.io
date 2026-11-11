const {test,expect}=require('@playwright/test');
const fs=require('node:fs/promises');

test('Debt Guide appears in Money & Bills and five distinct paths remain navigable',async({page})=>{
  const errs=[];page.on('pageerror',e=>errs.push(e.message));
  await page.goto('/index.html?area=Money%20%26%20Bills');
  const guideLink=page.getByRole('link',{name:'Open debt guide'});
  await expect(guideLink).toBeVisible();
  await expect(guideLink).toHaveAttribute('href','debt-creditor-guide.html');
  await guideLink.click();
  await expect(page).toHaveURL(/\/one-place\/debt-creditor-guide\.html$/);
  await expect(page).toHaveTitle(/Debt & Creditor Guide/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex,nofollow,noarchive');
  const journeys=[
    ["I can't afford my payments","hardship","CFPB: When you can't pay credit-card bills"],
    ["A debt collector contacted me","collector","CFPB: Debt-validation information"],
    ["I don't recognize a debt","unknown","CFPB: Disputing a debt you may not owe"],
    ["I received court papers","court","CFPB: What to do if you are sued"],
    ["I want to compare my options","options","FTC: Compare debt help and avoid scams"]
  ];
  for(const [label,value,source] of journeys){
    await page.getByRole('radio',{name:label}).check();
    await expect(page.getByRole('heading',{name:label,exact:true})).toBeVisible();
    await expect(page.locator('#source-link')).toContainText(source);
    await expect(page.locator('#steps li')).toHaveCount(3);
    await expect(page.locator('#checklist input[type="checkbox"]')).toHaveCount(3);
    await expect(page.locator('#script')).not.toBeEmpty();
  }
  await page.getByRole('radio',{name:'I received court papers'}).check();
  await expect(page.locator('#warning')).toContainText('Missing a court response deadline');
  await expect(page.locator('#script')).not.toContainText('I owe');
  await expect(page.locator('#source-link')).toHaveAttribute('target','_blank');
  expect(errs).toEqual([]);
});

test('Debt Guide preserves editable wording and exports only local text',async({page})=>{
  const unwanted=[];
  page.on('request',req=>{
    const url=new URL(req.url());
    if(url.hostname!=='127.0.0.1' && url.hostname!=='localhost')unwanted.push(req.url());
  });
  await page.goto('/one-place/debt-creditor-guide.html');
  await page.getByRole('radio',{name:"I don't recognize a debt"}).check();
  await page.locator('#script').fill('Fictional sample: please verify the disputed claim.');
  await page.locator('#next').fill('Check the dispute deadline on the notice');
  await page.locator('#checklist input').first().check();
  const downloadPromise=page.waitForEvent('download');
  await page.getByRole('button',{name:/Download my next-step plan/}).click();
  const file=await downloadPromise;
  const text=await fs.readFile(await file.path(),'utf8');
  expect(text).toContain("I don't recognize a debt");
  expect(text).toContain('Fictional sample: please verify the disputed claim.');
  expect(text).toContain('Check the dispute deadline on the notice');
  expect(text).toContain('[x]');
  expect(text).toContain('not legal or financial advice');
  expect(text).not.toContain('personally identifying account number');
  await expect(page.locator('#status')).toContainText('one-place-debt-unknown-next-steps.txt');
  await page.getByRole('button',{name:/Start over/}).click();
  await expect(page.getByRole('radio',{name:"I can't afford my payments"})).toBeChecked();
  await expect(page.locator('#next')).toBeEmpty();
  expect(await page.evaluate(()=>Object.keys(localStorage))).toEqual([]);
  expect(unwanted).toEqual([]);
});

for(const width of [320,390,1366]){
  test('Debt Guide responsive and returns to Money & Bills at '+width+'px',async({page})=>{
    await page.setViewportSize({width,height:844});
    await page.goto('/one-place/debt-creditor-guide.html');
    await expect(page.getByRole('navigation',{name:'Return navigation'})).toBeVisible();
    await expect(page.getByRole('heading',{name:'Debt & Creditor Guide'})).toBeVisible();
    await page.getByRole('radio',{name:'I received court papers'}).check();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
    const back=page.getByRole('navigation',{name:'Return navigation'}).getByRole('link',{name:/Money & Bills/});
    await expect(back).toHaveAttribute('href','../index.html?area=Money%20%26%20Bills');
    await back.click();
    await expect(page).toHaveURL(/money-center/);
    await expect(page.getByRole('heading',{name:'Money & Bills',exact:true})).toBeVisible();
  });
}


test('Debt Guide preserves fictional edits between situations and clears every path on reset',async({page})=>{
 await page.goto('/one-place/debt-creditor-guide.html');
 await page.locator('#script').fill('Fictional hardship request with safe wording.');
 await page.locator('#next').fill('Contact card issuer through verified phone');
 await page.locator('#checklist input').first().check();
 await page.getByRole('radio',{name:"I don't recognize a debt"}).check();
 await page.locator('#script').fill('Fictional dispute request.');
 await page.locator('#next').fill('Check notice date');
 await page.locator('#checklist input').nth(1).check();
 await page.getByRole('radio',{name:"I can't afford my payments"}).check();
 await expect(page.locator('#script')).toHaveValue('Fictional hardship request with safe wording.');
 await expect(page.locator('#next')).toHaveValue('Contact card issuer through verified phone');
 await expect(page.locator('#checklist input').first()).toBeChecked();
 const downloadPromise=page.waitForEvent('download');
 await page.getByRole('button',{name:/Download my next-step plan/}).click();
 const file=await downloadPromise;
 expect(file.suggestedFilename()).toBe('one-place-debt-hardship-next-steps.txt');
 const result=await fs.readFile(await file.path(),'utf8');
 expect(result).toContain('Fictional hardship request with safe wording.');
 expect(result).toContain('Contact card issuer through verified phone');
 await page.getByRole('radio',{name:"I don't recognize a debt"}).check();
 await expect(page.locator('#script')).toHaveValue('Fictional dispute request.');
 await expect(page.locator('#checklist input').nth(1)).toBeChecked();
 await page.getByRole('button',{name:/Start over/}).click();
 await expect(page.getByRole('radio',{name:"I can't afford my payments"})).toBeChecked();
 await expect(page.locator('#next')).toBeEmpty();
 await expect(page.locator('#checklist input').first()).not.toBeChecked();
 await expect(page.locator('#script')).not.toHaveValue('Fictional hardship request with safe wording.');
 await page.getByRole('radio',{name:"I don't recognize a debt"}).check();
 await expect(page.locator('#script')).not.toHaveValue('Fictional dispute request.');
 await expect(page.locator('#next')).toBeEmpty();
 await expect(page.locator('#checklist input').nth(1)).not.toBeChecked();
 expect(await page.evaluate(()=>Object.keys(localStorage))).toEqual([]);
});
