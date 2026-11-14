const {test,expect}=require('@playwright/test');
const URL='/one-place/business-records-practice.html';
const correct={paid:'sale',supplies:'cost',groceries:'personal',returned:'refund'};
const names=Object.keys(correct),kinds=['sale','cost','personal','refund'];
const sel=(page,id)=>page.locator('#kind-'+id);
const review=page=>page.getByRole('button',{name:'Review my four choices'});
async function allCorrect(page){
 for(const id of names)await sel(page,id).selectOption(correct[id]);
}
test('Business Records: factual teaching, four model answers and official opt-in links',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(URL);
 await expect(page.getByRole('heading',{name:'Small Business Records Practice',level:1})).toBeVisible();
 await expect(page.locator('.example')).toHaveCount(4);
 await expect(page.locator('.example .guide')).toHaveCount(4);
 await expect(page.locator('.example details')).toHaveCount(4);
 await expect(page.locator('#practice select')).toHaveCount(4);
 await expect(page.locator('#practice')).toBeVisible();
 for(const name of names){
  const section=page.locator('#'+name);
  await expect(section.getByText('WHY:',{exact:false})).toBeVisible();
  await expect(section.getByText('STOP:',{exact:false})).toBeVisible();
  await expect(section.locator('summary')).toBeVisible();
  await expect(sel(page,name)).toBeEnabled();
  await expect(sel(page,name).locator('option')).toHaveCount(5);
 }
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
 const links=page.locator('.sources a');
 await expect(links).toHaveCount(3);
 for(const anchor of await links.all()){
  expect(await anchor.getAttribute('href')).toMatch(/^https:\/\/(www\.)?(irs\.gov|sba\.gov)\//);
  await expect(anchor).toHaveAttribute('target','_blank');
  expect(await anchor.getAttribute('rel')).toMatch(/noopener/);
 }
 expect(errors).toEqual([]);
});
test('Business Records: all four correct choices show specific reasons and evidence',async({page})=>{
 await page.goto(URL);await allCorrect(page);await review(page).click();
 await expect(page.locator('#review')).toBeVisible();
 await expect(page.locator('#review-summary')).toContainText('4 of 4');
 await expect(page.locator('#review-list li')).toHaveCount(4);
 for(const item of await page.locator('#review-list li').all()){
  await expect(item).toContainText('Matches the model.');
  await expect(item).toContainText('Why:');
  await expect(item).toContainText('Evidence:');
 }
 await expect(page.locator('#status')).toContainText('All four fictional choices reviewed');
});
test('Business Records: each of 16 case-by-category combinations has honest review',async({page})=>{
 await page.goto(URL);await allCorrect(page);
 for(const id of names){
  for(const kind of kinds){
   await sel(page,id).selectOption(kind);
   await review(page).click();
   const right=kind===correct[id];
   await expect(page.locator('#review-summary')).toContainText(right?'4 of 4':'3 of 4');
   const target=page.locator('#review-list li').nth(names.indexOf(id));
   await expect(target).toContainText(right?'Matches the model.':'Needs another look.');
   await expect(target).toContainText('Model:');
   await expect(target).toContainText('Evidence:');
  }
  await sel(page,id).selectOption(correct[id]);
 }
});
test('Business Records: incomplete input focuses the first missing classification',async({page})=>{
 await page.goto(URL);await review(page).click();
 await expect(page.locator('#status')).toContainText('all four fictional events');
 await expect(sel(page,'paid')).toBeFocused();
 await expect(page.locator('#review')).toBeHidden();
 await sel(page,'paid').selectOption('sale');
 await sel(page,'supplies').selectOption('cost');
 await review(page).click();
 await expect(sel(page,'groceries')).toBeFocused();
 await expect(page.locator('#review-list li')).toHaveCount(0);
});
test('Business Records: editing after review invalidates stale feedback',async({page})=>{
 await page.goto(URL);await allCorrect(page);await review(page).click();
 await expect(page.locator('#review')).toBeVisible();
 await sel(page,'paid').selectOption('cost');
 await expect(page.locator('#review')).toBeHidden();
 await expect(page.locator('#review-list li')).toHaveCount(0);
 await expect(page.locator('#status')).toContainText('Choice changed');
 await review(page).click();
 await expect(page.locator('#review-summary')).toContainText('3 of 4');
});
test('Business Records: reset clears all invented choices and returns to first field',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(URL);
 expect(await page.evaluate(()=>typeof document.getElementById('practice').reset)).toBe('function');
 await allCorrect(page);await review(page).click();
 await page.getByRole('button',{name:'Reset fictional practice'}).click();
 await expect(page.locator('#review')).toBeHidden();
 await expect(page.locator('#status')).toContainText('practice reset');
 await expect(page.locator('#review-list li')).toHaveCount(0);
 for(const id of names)await expect(sel(page,id)).toHaveValue('');
 await expect(sel(page,'paid')).toBeFocused();
 expect(errors).toEqual([]);
});
for(const width of [320,390,1366,1920]){
 test('Business Records: teaching and practice reflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:844});await page.goto(URL);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.example')).toHaveCount(4);
  await expect(page.locator('#practice')).toBeVisible();
  const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(d.html,d.body),JSON.stringify(d)).toBeLessThanOrEqual(width+1);
  await allCorrect(page);await review(page).click();
  await expect(page.locator('#review-summary')).toContainText('4 of 4');
 });
}
for(const width of [320,390]){
 test('Business Records: 200% root text remains usable without page overflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:844});await page.goto(URL);
  await page.addStyleTag({content:'html{font-size:200%!important}'});
  const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(d.html,d.body),JSON.stringify(d)).toBeLessThanOrEqual(width+1);
  await expect(page.locator('.example')).toHaveCount(4);
  await expect(sel(page,'returned')).toBeVisible();
 });
}
for(const width of [320,1366]){
 test('Business Records: no-JavaScript retains four full lessons and model answers at '+width+'px',async({browser})=>{
  const context=await browser.newContext({baseURL:'http://127.0.0.1:8765',javaScriptEnabled:false,viewport:{width,height:844}});
  try{
   const page=await context.newPage();await page.goto(URL);
   await expect(page.getByRole('heading',{name:'Small Business Records Practice',level:1})).toBeVisible();
   await expect(page.locator('.example')).toHaveCount(4);
   await expect(page.locator('#practice:visible')).toHaveCount(0);
   await expect(page.locator('noscript p.notice')).toContainText('optional classification form requires JavaScript');
   for(const id of names){
    await expect(page.locator('#'+id+' .guide')).toBeVisible();
    await page.locator('#'+id+' summary').click();
    await expect(page.locator('#'+id+' details p')).toBeVisible();
   }
   const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(d.html,d.body),JSON.stringify(d)).toBeLessThanOrEqual(width+1);
  }finally{await context.close();}
 });
}
test('Business Records: skip link and native selectors are keyboard usable',async({page})=>{
 await page.setViewportSize({width:320,height:844});await page.goto(URL);
 await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Skip to business records learning'})).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.locator('#main')).toBeFocused();
 await page.keyboard.press('Tab');
 await expect(page.locator('#paid summary')).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.locator('#paid details')).toHaveAttribute('open','');
 await sel(page,'paid').focus();
 await page.keyboard.press('ArrowDown');
 expect(await sel(page,'paid').inputValue()).not.toBe('');
});
test('Business Records: no real intake, storage, automatic offsite requests or browser writes',async({page})=>{
 const external=[],errors=[],writes=[];
 page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:8765/'))external.push(r.url());if(['POST','PUT','PATCH','DELETE'].includes(r.method()))writes.push(r.url());});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(URL);await allCorrect(page);await review(page).click();
 const state=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length,cookie:document.cookie,inputs:[...document.querySelectorAll('input,textarea')].length,formAction:document.querySelector('#practice').getAttribute('action')}));
 expect(state.local).toBe(0);expect(state.session).toBe(0);expect(state.cookie).toBe('');
 expect(state.inputs).toBe(0);expect(state.formAction).toBe(null);
 expect(external).toEqual([]);expect(writes).toEqual([]);expect(errors).toEqual([]);
 await expect(page.locator('header nav a').first()).toHaveAttribute('href','../index.html?area=Business%20%26%20Entrepreneurship');
 await expect(page.locator('header nav a').nth(1)).toHaveAttribute('href','../index.html');
});
