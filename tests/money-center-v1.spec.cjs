const {test,expect}=require('@playwright/test');
for(const width of [320,390,768,1366,1920]){
 test('Money center works at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:850});
  await page.goto('/index.html?area=Money%20%26%20Bills');
  await expect(page).toHaveURL(/one-place\/money-center\.html$/);
  await expect(page.getByRole('heading',{name:'Money & Bills',exact:true})).toBeVisible();
  await expect(page.getByText('What do you need help with?')).toBeVisible();
  await expect(page.getByRole('heading',{name:'Money tools that actually work'})).toBeVisible();
  await expect(page.getByRole('link',{name:'Open bill planner'})).toHaveAttribute('href','money-bills.html');
  await expect(page.getByRole('link',{name:'Open debt guide'})).toHaveAttribute('href','debt-creditor-guide.html');
  await expect(page.getByText('No pretend products, checkout, subscriptions or unlaunched assisted services.')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
  expect(errors).toEqual([]);
 });
}
test('Situation guide, topic panel, comparison, and privacy-first downloadable plan',async({page})=>{
 await page.goto('/one-place/money-center.html');
 await page.locator('#situation').selectOption('debt');
 await expect(page.locator('#situationResult')).toContainText('identify');
 await page.getByRole('button',{name:'Budgeting & cash flow'}).click();
 await expect(page.locator('#topicPanel')).toContainText('expected income');
 await page.locator('#priceA').fill('3.00');await page.locator('#qtyA').fill('8');
 await page.locator('#priceB').fill('3.77');await page.locator('#qtyB').fill('8');
 await expect(page.locator('#comparison')).toContainText('Store A');
 const checks=page.locator('.task');for(let i=0;i<4;i++)await checks.nth(i).check();
 await expect(page.locator('#download')).toBeDisabled();
 await checks.nth(3).uncheck();
 await expect(page.locator('#download')).toBeEnabled();
 const promise=page.waitForEvent('download');
 await page.locator('#download').click();
 const file=await promise;expect(file.suggestedFilename()).toBe('one-place-money-next-steps.txt');
 await page.locator('#reset').click();
 await expect(page.locator('#checkupStatus')).toContainText('0 priorities');
});
test('Money center returns home and links to previously approved tools',async({page})=>{
 await page.goto('/one-place/money-center.html');
 await page.getByRole('link',{name:'Bill planner',exact:true}).click();
 await expect(page).toHaveURL(/\/one-place\/money-bills\.html$/);
 await page.getByRole('link',{name:/Money & Bills category|Money & Bills/i}).first().click();
 await expect(page).toHaveURL(/money-center\.html$/);
});
