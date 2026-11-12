const {test,expect}=require('@playwright/test');

const ids=['unexpected-message','urgent-family-request','account-protection','already-paid'];
const answers=[1,2,1,1];
for(const width of [320,390,1366,1920]){
 test('Digital Safety: four lessons reflow without overflow at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:850});
  await page.goto('/one-place/digital-safety-practice.html');
  await expect(page.getByRole('heading',{name:'Digital Safety Practice Lab',level:1})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(4);
  await expect(page.locator('form.practice')).toHaveCount(4);
  await expect(page.locator('input[type="radio"]')).toHaveCount(12);
  await expect(page.locator('.resources a')).toHaveCount(4);
  for(const id of ids){
   const nav=page.getByRole('navigation',{name:'Jump to a practice situation'}).getByRole('link',{name:new RegExp(id==='unexpected-message'?'unexpected delivery':id==='urgent-family-request'?'voice that sounds':id==='account-protection'?'sign-in code':'already sent','i')});
   await nav.click();
   await expect(page).toHaveURL(new RegExp('#'+id+'$'));
   await expect(page.locator('#'+id)).toBeVisible();
   const x=await page.evaluate(()=>({screen:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(x.document,x.body),'overflow '+width+': '+JSON.stringify(x)).toBeLessThanOrEqual(width+1);
  }
  expect(errors).toEqual([]);
 });
}
for(let n=0;n<ids.length;n++){
 test('Digital Safety: '+ids[n]+' explains blank, unsafe, safe and reset choices',async({page})=>{
  await page.goto('/one-place/digital-safety-practice.html#'+ids[n]);
  const form=page.locator('#'+ids[n]+' form.practice');
  const feedback=form.locator('.feedback');
  const options=form.getByRole('radio');
  await expect(options).toHaveCount(3);
  await form.getByRole('button',{name:'Check my decision'}).click();
  await expect(feedback).toContainText('Choose a response');
  await expect(options.first()).toBeFocused();
  const wrong=(answers[n]+1)%3;
  await options.nth(wrong).check();
  await form.getByRole('button',{name:'Check my decision'}).click();
  await expect(feedback).toContainText('Consider this instead.');
  await options.nth(answers[n]).check();
  await expect(feedback).toBeEmpty();
  await form.getByRole('button',{name:'Check my decision'}).click();
  await expect(feedback).toContainText('Good decision.');
  await form.getByRole('button',{name:'Try again'}).click();
  await expect(feedback).toBeEmpty();
  await expect(options.nth(answers[n])).not.toBeChecked();
 });
}
test('Digital Safety: keyboard and 200 percent text work on 320px',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/digital-safety-practice.html#urgent-family-request');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const practice=page.locator('#urgent-family-request form.practice');
 const radio=practice.getByRole('radio').nth(2);
 await radio.focus();await page.keyboard.press('Space');
 await expect(radio).toBeChecked();
 await practice.getByRole('button',{name:'Check my decision'}).focus();
 await page.keyboard.press('Enter');
 await expect(practice.getByRole('status')).toContainText('Good decision.');
 const x=await page.evaluate(()=>({screen:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(x.document,x.body),'200% text reflow: '+JSON.stringify(x)).toBeLessThanOrEqual(x.screen+1);
});
test('Digital Safety: all teaching remains available without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto('/one-place/digital-safety-practice.html');
  await expect(page.locator('section.lesson:visible')).toHaveCount(4);
  await expect(page.locator('button[type="submit"]:disabled')).toHaveCount(4);
  await expect(page.getByText('All four examples, safer choices, instructions and source links remain readable without JavaScript.')).toBeVisible();
  await page.getByRole('navigation',{name:'Jump to a practice situation'}).getByRole('link').nth(3).click();
  await expect(page).toHaveURL(/#already-paid$/);
  await expect(page.locator('#already-paid')).toBeVisible();
 } finally{await context.close();}
});
test('Digital Safety: practice stores no data, sends no writes and has safe source links',async({page})=>{
 const writes=[],thirdParty=[];
 page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  const url=new URL(r.url());
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
  if(!['127.0.0.1','localhost'].includes(url.hostname))thirdParty.push(r.url());
 });
 await page.goto('/one-place/digital-safety-practice.html');
 await page.locator('#already-paid input[type="radio"]').nth(1).check();
 await page.locator('#already-paid button[type="submit"]').click();
 expect(writes).toEqual([]);
 expect(thirdParty).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 for(const link of await page.locator('.resources a[href^="https://"]').all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await page.reload();
 await expect(page.locator('form.practice .feedback').last()).toBeEmpty();
 await expect(page.locator('#already-paid input[type="radio"]:checked')).toHaveCount(0);
});
test('Digital Safety: discoverable only in the appropriate area, four original cards remain',async({page})=>{
 await page.goto('/index.html?area=Technology%20%26%20Digital%20Safety');
 await expect(page.getByRole('heading',{name:'Technology & Digital Safety'})).toBeVisible();
 await expect(page.locator('.offers > a.offer')).toHaveCount(4);
 await page.getByRole('link',{name:'Open the Digital Safety Practice Lab'}).click();
 await expect(page).toHaveURL(/\/one-place\/digital-safety-practice\.html$/);
 await page.getByRole('link',{name:'Digital Safety area'}).click();
 await expect(page).toHaveURL(/area=Technology/);
 await page.goto('/index.html?area=Learning%20%26%20Education');
 await expect(page.locator('#digital-safety-practice-path')).toHaveCount(0);
});
