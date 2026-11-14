const {test,expect}=require('@playwright/test');
const url='/one-place/calm-moment-practice.html';
const ids=['ground','connect','followup'],safe=[1,2,0];
for(const width of [320,390,1366,1920]){
 test('Calm Moment: all lessons reflow at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:800});await page.goto(url);
  await expect(page.getByRole('heading',{name:'Calm Moment Practice',level:1})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('form.practice')).toHaveCount(3);
  await expect(page.locator('.sources a')).toHaveCount(4);
  const links=page.getByRole('navigation',{name:'Choose a calm moment lesson'}).getByRole('link');
  for(let i=0;i<3;i++){await links.nth(i).click();await expect(page).toHaveURL(new RegExp('#'+ids[i]+'$'));}
  const d=await page.evaluate(()=>({viewport:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(d.html,d.body),'overflow '+width+': '+JSON.stringify(d)).toBeLessThanOrEqual(d.viewport+1);
  expect(errors).toEqual([]);
 });
}
for(let i=0;i<ids.length;i++){
 test('Calm Moment '+ids[i]+': blank, wrong, right, stale response and reset',async({page})=>{
  await page.goto(url+'#'+ids[i]);
  const form=page.locator('#'+ids[i]+' form.practice'),choices=form.getByRole('radio'),submit=form.getByRole('button',{name:'Check the idea'}),feedback=form.locator('.feedback');
  await submit.click();await expect(feedback).toContainText('Choose one fictional');await expect(choices.first()).toBeFocused();
  await choices.nth((safe[i]+1)%3).check();await submit.click();await expect(feedback).toContainText('Consider another approach.');
  await choices.nth(safe[i]).check();await expect(feedback).toBeEmpty();
  await submit.click();await expect(feedback).toContainText('Good reasoning.');
  await choices.nth((safe[i]+2)%3).check();await expect(feedback).toBeEmpty();
  await form.getByRole('button',{name:'Start again'}).click();
  await expect(feedback).toBeEmpty();await expect(form.locator('input:checked')).toHaveCount(0);
 });
}
test('Calm Moment: urgent route visible before decisions',async({page})=>{
 await page.setViewportSize({width:320,height:750});await page.goto(url);
 const alert=page.locator('main > .alert');
 await expect(alert).toBeVisible();await expect(alert).toContainText('Safety comes before practice');
 await expect(alert.getByRole('link',{name:'988'})).toHaveAttribute('href','https://988lifeline.org/');
 await expect(page.locator('#followup .caution')).toContainText('immediate danger');
});
test('Calm Moment: keyboard skip, radio choice and enlarged text',async({page})=>{
 await page.setViewportSize({width:320,height:750});await page.goto(url);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to coping practice'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
 const form=page.locator('#ground form.practice');const radio=form.getByRole('radio').nth(1);
 await radio.focus();await page.keyboard.press('Space');await expect(radio).toBeChecked();
 await form.getByRole('button',{name:'Check the idea'}).focus();await page.keyboard.press('Enter');
 await expect(form.getByRole('status')).toContainText('Good reasoning.');
 const d=await page.evaluate(()=>({viewport:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(d.html,d.body),'200% text overflow '+JSON.stringify(d)).toBeLessThanOrEqual(d.viewport+1);
});
test('Calm Moment: all guidance and anchors work without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{const page=await context.newPage();await page.goto(url);
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('button[type=submit]:disabled')).toHaveCount(3);
  await expect(page.locator('noscript .alert')).toContainText('remain readable without JavaScript');
  await page.getByRole('navigation',{name:'Choose a calm moment lesson'}).getByRole('link').nth(2).click();
  await expect(page).toHaveURL(/#followup$/);
 }finally{await context.close();}
});
test('Calm Moment: local-only, no storage/writes/third-party loads',async({page})=>{
 const writes=[],thirdParty=[];page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
  if(!['localhost','127.0.0.1'].includes(new URL(r.url()).hostname))thirdParty.push(r.url());
 });
 await page.goto(url);const form=page.locator('#connect form.practice');
 await form.getByRole('radio').nth(2).check();await form.getByRole('button',{name:'Check the idea'}).click();
 expect(writes).toEqual([]);expect(thirdParty).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 for(const link of await page.locator('main a[href^="https://"]').all()){
  await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await page.reload();await expect(page.locator('form.practice input:checked')).toHaveCount(0);
});
test('Calm Moment: link to existing nonduplicated support lab and area/home paths',async({page})=>{
 await page.goto(url);
 await expect(page.getByRole('link',{name:'Support Skills & Safety Lab'})).toHaveAttribute('href','support-skills-safety.html');
 await expect(page.getByRole('link',{name:'Mental Health & Safety area'})).toHaveAttribute('href','../index.html?area=Mental%20Health%20%26%20Safety');
 await expect(page.locator('.nav a')).toHaveCount(3);
});
