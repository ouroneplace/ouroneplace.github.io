const {test,expect}=require('@playwright/test');
const url='/one-place/alerts-safe-action-practice.html';
const ids=['channels','watch','flood'],safe=[1,2,1];
for(const width of [320,390,1366,1920]){
 test('Alerts Safe Action: three lessons and responsive navigation at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:780});await page.goto(url);
  await expect(page.getByRole('heading',{name:'Alerts to Safe Action Practice',level:1})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('form.practice')).toHaveCount(3);
  await expect(page.locator('.sources a')).toHaveCount(4);
  const nav=page.getByRole('navigation',{name:'Choose a weather alert lesson'}).getByRole('link');
  for(let i=0;i<ids.length;i++){
   await nav.nth(i).click();await expect(page).toHaveURL(new RegExp('#'+ids[i]+'$'));
   await expect(page.locator('#'+ids[i]+' .stop')).toBeVisible();
  }
  const d=await page.evaluate(()=>({width:innerWidth,body:document.body.scrollWidth,html:document.documentElement.scrollWidth}));
  expect(Math.max(d.body,d.html),'horizontal overflow '+width+' '+JSON.stringify(d)).toBeLessThanOrEqual(d.width+1);
  expect(errors).toEqual([]);
 });
}
for(let i=0;i<ids.length;i++){
 test('Alerts Safe Action '+ids[i]+' blank, 2 unsafe, safe, invalidation and reset',async({page})=>{
  await page.goto(url+'#'+ids[i]);
  const f=page.locator('#'+ids[i]+' form.practice'),r=f.getByRole('radio'),check=f.getByRole('button',{name:'Check my understanding'}),feedback=f.locator('.feedback');
  await check.click();await expect(feedback).toContainText('Choose a fictional response');await expect(r.first()).toBeFocused();
  for(let n=0;n<3;n++)if(n!==safe[i]){
   await r.nth(n).check();await expect(feedback).toBeEmpty();await check.click();
   await expect(feedback).toContainText('Consider the safer step.');
  }
  await r.nth(safe[i]).check();await expect(feedback).toBeEmpty();
  await check.click();await expect(feedback).toContainText('Good safety reasoning.');
  await r.nth((safe[i]+1)%3).check();await expect(feedback).toBeEmpty();
  await f.getByRole('button',{name:'Start again'}).click();await expect(feedback).toBeEmpty();
  await expect(f.locator('input:checked')).toHaveCount(0);
 });
}
test('Alerts Safe Action upfront real-emergency stop with hazard distinction',async({page})=>{
 await page.setViewportSize({width:320,height:800});await page.goto(url);
 const alert=page.locator('main > p.alert');
 await expect(alert).toBeVisible();await expect(alert).toContainText('leave this lesson');
 await expect(alert).toContainText('tornado warning');
 await expect(alert).toContainText('flood evacuation order');
 await expect(page.locator('#flood .stop')).toContainText('emergency help');
 await expect(page.locator('#watch .stop')).toContainText('Mobile homes');
});
test('Alerts Safe Action keyboard skip, 320px plus 200% text',async({page})=>{
 await page.setViewportSize({width:320,height:740});await page.goto(url);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to weather alert lessons'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
 const f=page.locator('#channels form.practice'),answer=f.getByRole('radio').nth(1);
 await answer.focus();await page.keyboard.press('Space');await expect(answer).toBeChecked();
 await f.getByRole('button',{name:'Check my understanding'}).focus();await page.keyboard.press('Enter');
 await expect(f.getByRole('status')).toContainText('Good safety reasoning.');
 const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(d.html,d.body),'200%-text lateral overflow '+JSON.stringify(d)).toBeLessThanOrEqual(d.width+1);
});
test('Alerts Safe Action no JavaScript keeps complete teaching and print steps',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{const page=await context.newPage();await page.goto(url);
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('section.lesson .stop')).toHaveCount(3);
  await expect(page.locator('button[type=submit]:disabled')).toHaveCount(3);
  await expect(page.locator('noscript .alert')).toContainText('remain readable without JavaScript');
  await page.getByRole('navigation',{name:'Choose a weather alert lesson'}).getByRole('link').nth(2).click();
  await expect(page).toHaveURL(/#flood$/);
 }finally{await context.close();}
});
test('Alerts Safe Action does not write or upload; official links opt-in',async({page})=>{
 const writes=[],external=[];page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.url());
  if(!['127.0.0.1','localhost'].includes(new URL(r.url()).hostname))external.push(r.url());
 });
 await page.goto(url);const f=page.locator('#flood form.practice');
 await f.getByRole('radio').nth(1).check();await f.getByRole('button',{name:'Check my understanding'}).click();
 expect(writes).toEqual([]);expect(external).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 for(const link of await page.locator('.sources a').all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await page.reload();await expect(page.locator('form.practice input:checked')).toHaveCount(0);
});
test('Alerts Safe Action static links and sources remain narrowly distinct',async({page})=>{
 await page.goto(url);
 await expect(page.getByRole('link',{name:'Emergencies & Preparedness area'})).toHaveAttribute('href','../index.html?area=Emergencies%20%26%20Preparedness');
 await expect(page.locator('main')).toContainText('Power Outage Continuity Check');
 await expect(page.locator('main')).toContainText('Home Fire Escape Rehearsal');
 await expect(page.locator('main a[href="power-outage-continuity.html"], main a[href="home-fire-escape-rehearsal.html"]')).toHaveCount(0);
 await expect(page.locator('.sources a')).toHaveCount(4);
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
});
