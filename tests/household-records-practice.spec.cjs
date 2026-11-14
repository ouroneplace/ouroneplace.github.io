const {test,expect}=require('@playwright/test');
const url='/one-place/household-records-practice.html';
const examples=[{id:'find',best:1},{id:'protect',best:0},{id:'urgent',best:2}];
for(const width of [320,390,1366,1920]){
 test('Household Records: meaningful teaching and no horizontal overflow at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:850});await page.goto(url);
  await expect(page.getByRole('heading',{name:'Find It When Needed: Household Records Practice'})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('form.practice')).toHaveCount(3);
  await expect(page.locator('li[data-choice]')).toHaveCount(9);
  await expect(page.locator('#steps .moves li')).toHaveCount(5);
  await expect(page.locator('#worksheet .paper-list li')).toHaveCount(4);
  const dims=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(dims.html,dims.body),'horizontal overflow '+JSON.stringify(dims)).toBeLessThanOrEqual(dims.width+1);
  const picture=await page.screenshot({fullPage:true});expect(picture.byteLength).toBeGreaterThan(5000);
  expect(errors).toEqual([]);
 });
}
for(const width of [320,390]){
 test('Household Records: 200% root text and paper worksheet reflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:800});await page.goto(url);
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  await expect(page.locator('#worksheet .paper')).toBeVisible();
  await expect(page.locator('#find')).toBeVisible();
  const d=await page.evaluate(()=>({v:innerWidth,h:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
  expect(Math.max(d.h,d.b),'200%-text overflow '+JSON.stringify(d)).toBeLessThanOrEqual(d.v+1);
  const picture=await page.screenshot({fullPage:true});expect(picture.byteLength).toBeGreaterThan(5000);
 });
}
for(const c of examples){
 test('Household Records: blank, three reasons, changed answer, reset for '+c.id,async({page})=>{
  await page.goto(url+'#'+c.id);
  const form=page.locator('#'+c.id+' form.practice');
  const radio=form.getByRole('radio'),feedback=form.locator('.feedback');
  await expect(radio).toHaveCount(3);
  await form.getByRole('button',{name:'Check this choice'}).click();
  await expect(feedback).toContainText('Choose an option');
  await expect(radio.first()).toBeFocused();
  for(let i=0;i<3;i++){
   await radio.nth(i).check();
   await expect(feedback).toBeEmpty();
   await form.getByRole('button',{name:'Check this choice'}).click();
   const reason=(await form.locator('.reasons li[data-choice="'+i+'"]').textContent()).trim();
   await expect(feedback).toContainText(reason);
   await expect(feedback).toContainText(i===c.best?'Useful choice.':'Consider another approach.');
  }
  await form.getByRole('button',{name:'Start this example again'}).click();
  await expect(feedback).toBeEmpty();
  await expect(form.locator('input:checked')).toHaveCount(0);
 });
}
for(const width of [320,1366]){
 test('Household Records: no-JS readable answers and paper checklist at '+width+'px',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width,height:800}});
  try{
   const page=await context.newPage();await page.goto(url);
   await expect(page.locator('section.lesson')).toHaveCount(3);
   await expect(page.locator('button[type="submit"]:disabled')).toHaveCount(3);
   await expect(page.locator('#steps .moves li')).toHaveCount(5);
   await expect(page.locator('#worksheet .paper-list li')).toHaveCount(4);
   await page.locator('#urgent details summary').click();
   await expect(page.locator('#urgent li[data-choice]:visible')).toHaveCount(3);
   await expect(page.getByText('Or use the browser Print menu',{exact:false})).toBeVisible();
   const d=await page.evaluate(()=>({v:innerWidth,h:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
   expect(Math.max(d.h,d.b)).toBeLessThanOrEqual(d.v+1);
  }finally{await context.close();}
 });
}
test('Household Records: actual skip link and keyboard-only answer submission',async({page})=>{
 await page.goto(url);await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Skip to household records lesson'})).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.locator('main')).toBeFocused();
 await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Learn the five moves'})).toBeFocused();
 await page.locator('#find input[type="radio"]').nth(1).focus();
 await page.keyboard.press('Space');
 await page.locator('#find button[type="submit"]').focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#find .feedback')).toContainText('Useful choice.');
});
test('Household Records: privacy, official opt-in links, area return',async({page})=>{
 const writes=[],external=[];
 page.on('request',request=>{
  if(!request.url().startsWith('http'))return;
  const u=new URL(request.url());
  if(!['GET','HEAD'].includes(request.method()))writes.push(request.url());
  if(!['localhost','127.0.0.1'].includes(u.hostname))external.push(request.url());
 });
 await page.goto(url);
 await page.locator('#protect input[type="radio"]').first().check();
 await page.locator('#protect button[type="submit"]').click();
 expect(writes).toEqual([]);expect(external).toEqual([]);
 const store=await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}));
 expect(store).toEqual({local:[],session:[]});
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow');
 await expect(page.locator('#sources a[href^="https://"]')).toHaveCount(3);
 for(const link of await page.locator('#sources a').all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await page.getByRole('link',{name:'Return to Daily Life & Organization'}).click();
 await expect(page).toHaveURL(/area=Daily/);
 await expect(page.getByRole('heading',{name:'Daily Life & Organization',level:1})).toBeVisible();
});
test('Household Records: print mode keeps real worksheet visible without exercise controls',async({page})=>{
 await page.goto(url);await page.emulateMedia({media:'print'});
 await expect(page.locator('#worksheet .paper')).toBeVisible();
 await expect(page.locator('form.practice').first()).toBeHidden();
 await expect(page.locator('#print-sheet')).toBeHidden();
 await page.emulateMedia({media:'screen'});
 await expect(page.getByRole('button',{name:'Print paper worksheet'})).toBeVisible();
});
