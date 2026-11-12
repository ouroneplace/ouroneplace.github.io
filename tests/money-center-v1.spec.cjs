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
  expect(await page.evaluate(()=>{window.scrollTo(1000,0);return window.scrollX===0 && getComputedStyle(document.body).overflowX==='clip';})).toBe(true);
  expect(errors).toEqual([]);
 });
}
test('Situation guide, topic panel, comparison, and privacy-first downloadable plan',async({page})=>{
 await page.goto('/one-place/money-center.html');
 await page.locator('#situation').selectOption('debt');
 await expect(page.locator('#situationResult')).toContainText('identify');
 await page.getByRole('button',{name:'Budgeting & cash flow'}).click();
 await expect(page.locator('#topicPanel')).toContainText('anticipated income');
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


test('Money center source ends cleanly without visible code after footer',async({page})=>{
 await page.goto('/one-place/money-center.html');
 await expect(page.locator('footer')).toBeVisible();
 const tail=await page.evaluate(()=>Array.from(document.body.childNodes).filter(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim()).map(n=>n.textContent.trim()));
 expect(tail).toEqual([]);
 const source=await page.locator('html').evaluate(el=>el.outerHTML);
 expect(source).not.toContain('</html>+delta.toFixed');
});

test('Money & Bills resource links and all three tool headers have clear return paths',async({page})=>{
 for(const width of [320,390,1366]){
  await page.setViewportSize({width,height:850});
  await page.goto('/one-place/money-center.html');
  const cfpb='https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/toolkit/';
  await expect(page.getByRole('link',{name:/View CFPB resources/})).toHaveAttribute('href',cfpb);
  await expect(page.locator('a[href*="consumerfinance.gov/consumer-tools/educator-tool/your-money-your-goals/toolkit/"]')).toHaveCount(0);
  await page.getByRole('link',{name:'Open bill planner'}).click();
  await expect(page).toHaveURL(/money-bills\.html$/);
  await page.getByRole('navigation',{name:'Money & Bills navigation'}).getByRole('link',{name:/Money & Bills home/}).click();
  await expect(page).toHaveURL(/money-center\.html$/);
  await page.getByRole('link',{name:'Open debt guide'}).click();
  await expect(page).toHaveURL(/debt-creditor-guide\.html$/);
  await page.getByRole('navigation',{name:'Return navigation'}).getByRole('link',{name:/Money & Bills home/}).click();
  await expect(page).toHaveURL(/money-center\.html$/);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
 }
});

// This test checks the destination itself. An href-only assertion did not catch
// the CFPB 404 reported in the founder's November 11 walkthrough.
test('CFPB toolkit link opens a real resource page instead of an error page',async({request})=>{
 const url='https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/toolkit/';
 const response=await request.get(url,{timeout:20000});
 expect(response.status(),'CFPB resource returned HTTP '+response.status()).toBe(200);
 const body=await response.text();
 expect(body).toMatch(/Your Money, Your Goals toolkit/i);
 expect(body).toMatch(/Bill calendar/i);
 expect(body).not.toMatch(/404:\\s*Page not found/i);
});

test('Every Money Center entry point uses the verified CFPB toolkit address',async({page})=>{
 await page.goto('/one-place/money-center.html');
 const url='https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/toolkit/';
 await expect(page.getByRole('link',{name:/View CFPB resources/})).toHaveAttribute('href',url);
 await expect(page.locator('#help a').filter({hasText:/CFPB/})).toHaveAttribute('href',url);
 for(const selection of ['bills','debt','plan']){
  await page.locator('#situation').selectOption(selection);
  await expect(page.locator('#situationLinks a[href^="https://www.consumerfinance.gov"]')).toHaveAttribute('href',url);
 }
 for(const subject of ['Groceries & household savings','Saving, emergency funds & goals']){
  await page.getByRole('button',{name:subject,exact:true}).click();
  await expect(page.locator('#topicPanel a')).toHaveAttribute('href',url);
 }
 const bad=await page.evaluate(()=>[...document.querySelectorAll('a[href]')].map(a=>a.href).filter(u=>u.includes('/educator-tool/')));
 expect(bad).toEqual([]);
});
