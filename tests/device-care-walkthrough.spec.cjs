const {test,expect}=require('@playwright/test');
const url='/one-place/device-care-walkthrough.html';
const cases=[{id:'update',best:1},{id:'backup',best:0},{id:'permissions',best:2}];
for(const width of [320,390,1366,1920]){
 test('Device Care: three sections and reflow at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:850});
  await page.goto(url);
  await expect(page.getByRole('heading',{name:'Everyday Device Care: Update, Back Up, Review'})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('form.practice')).toHaveCount(3);
  await expect(page.locator('.reasons li')).toHaveCount(9);
  const dims=await page.evaluate(()=>({viewport:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(dims.html,dims.body),'horizontal overflow '+JSON.stringify(dims)).toBeLessThanOrEqual(dims.viewport+1);
  const screenshot=await page.screenshot({fullPage:true});expect(screenshot.byteLength).toBeGreaterThan(5000);
  expect(errors).toEqual([]);
 });
}
for(const width of [320,390]){
 test('Device Care: 200% text reflows at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:800});await page.goto(url);
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  const d=await page.evaluate(()=>({v:innerWidth,h:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
  expect(Math.max(d.h,d.b)).toBeLessThanOrEqual(d.v+1);
  for(const id of ['update','backup','permissions'])await expect(page.locator('#'+id)).toBeVisible();
  const screenshot=await page.screenshot({fullPage:true});expect(screenshot.byteLength).toBeGreaterThan(5000);
 });
}
for(const c of cases){
 test('Device Care: all choice explanations, stale review, and reset for '+c.id,async({page})=>{
  await page.goto(url+'#'+c.id);
  const form=page.locator('#'+c.id+' form.practice'), options=form.getByRole('radio'),feedback=form.locator('.feedback');
  await expect(options).toHaveCount(3);
  await form.getByRole('button',{name:'Check this choice'}).click();
  await expect(feedback).toContainText('Choose an option');
  await expect(options.first()).toBeFocused();
  for(let i=0;i<3;i++){
   await options.nth(i).check();
   await expect(feedback).toBeEmpty();
   await form.getByRole('button',{name:'Check this choice'}).click();
   const reason=await form.locator('.reasons [data-choice="'+i+'"]').innerText();
   await expect(feedback).toContainText(reason);
   await expect(feedback).toContainText(i===c.best?'Useful decision.':'Consider another approach.');
  }
  await form.getByRole('button',{name:'Try another choice'}).click();
  await expect(feedback).toBeEmpty();await expect(form.locator('input:checked')).toHaveCount(0);
 });
}
test('Device Care: keyboard skip link and practice navigation',async({page})=>{
 await page.goto(url);
 await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Skip to device-care lessons'})).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.locator('main')).toBeFocused();
 await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'01. Updates'})).toBeFocused();
 await page.locator('#update input[type="radio"]').nth(1).focus();
 await page.keyboard.press('Space');
 await page.locator('#update button[type="submit"]').focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#update [role="status"]')).toContainText('Useful decision.');
});
test('Device Care: JavaScript off retains full advice without interactive dead end',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:780}});
 try{const page=await context.newPage();await page.goto(url);
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('button[type="submit"]:disabled')).toHaveCount(3);
  await expect(page.getByText('JavaScript is off.',{exact:false})).toContainText('Every lesson, device-care step, option and explanation');
  await page.locator('#permissions details summary').click();
  await expect(page.locator('#permissions .reasons li:visible')).toHaveCount(3);
  await expect(page.locator('#takeaway ol li')).toHaveCount(3);
 }finally{await context.close();}
});
test('Device Care: privacy, external link safety, and area return',async({page})=>{
 const writes=[],third=[];page.on('request',request=>{
  if(!request.url().startsWith('http'))return;
  const u=new URL(request.url());
  if(!['GET','HEAD'].includes(request.method()))writes.push(request.url());
  if(!['localhost','127.0.0.1'].includes(u.hostname))third.push(request.url());
 });
 await page.goto(url);
 await page.locator('#backup input[type="radio"]').first().check();
 await page.locator('#backup button[type="submit"]').click();
 expect(writes).toEqual([]);expect(third).toEqual([]);
 const stores=await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}));
 expect(stores).toEqual({local:[],session:[]});
 await expect(page.locator('#sources a[href^="https://"]')).toHaveCount(3);
 for(const a of await page.locator('#sources a').all()){
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await page.getByRole('link',{name:'Return to Technology & Digital Safety'}).click();
 await expect(page).toHaveURL(/area=Technology/);
 await expect(page.getByRole('heading',{name:'Technology & Digital Safety',level:1})).toBeVisible();
});
