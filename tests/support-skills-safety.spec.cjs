const {test,expect}=require('@playwright/test');

const ids=['notice','boundary','urgent','supporter'];
const safe=[1,0,2,1];
for(const width of [320,390,1366,1920]){
 test('Support Skills: four safe scenarios reflow at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:840});
  await page.goto('/one-place/support-skills-safety.html');
  await expect(page.getByRole('heading',{name:'Support Skills & Safety Lab',level:1})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(4);
  await expect(page.locator('form.practice')).toHaveCount(4);
  await expect(page.locator('input[type=radio]')).toHaveCount(12);
  await expect(page.locator('.sources a')).toHaveCount(4);
  for(let i=0;i<ids.length;i++){
   await page.getByRole('navigation',{name:'Choose a support skills situation'}).getByRole('link').nth(i).click();
   await expect(page).toHaveURL(new RegExp('#'+ids[i]+'$'));
   await expect(page.locator('#'+ids[i])).toBeVisible();
   const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(d.html,d.body),'horizontal overflow '+width+': '+JSON.stringify(d)).toBeLessThanOrEqual(d.width+1);
  }
  expect(errors).toEqual([]);
 });
}
for(let i=0;i<ids.length;i++){
 test('Support Skills '+ids[i]+' provides meaningful blank/unsafe/safe/reset feedback',async({page})=>{
  await page.goto('/one-place/support-skills-safety.html#'+ids[i]);
  const form=page.locator('#'+ids[i]+' form.practice');
  const choices=form.getByRole('radio');
  const submit=form.getByRole('button',{name:'Check my response'});
  const feedback=form.locator('.feedback');
  await submit.click();
  await expect(feedback).toContainText('Choose one response');
  await expect(choices.first()).toBeFocused();
  await choices.nth((safe[i]+1)%3).check();
  await submit.click();
  await expect(feedback).toContainText('Consider this response instead.');
  await choices.nth(safe[i]).check();
  await expect(feedback).toBeEmpty();
  await submit.click();
  await expect(feedback).toContainText('Good reasoning.');
  await form.getByRole('button',{name:'Start again'}).click();
  await expect(feedback).toBeEmpty();
  await expect(choices.nth(safe[i])).not.toBeChecked();
 });
}
test('Support Skills makes immediate crisis route visible before lessons without requiring interaction',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/support-skills-safety.html');
 const alert=page.locator('main > p.alert');
 await expect(alert).toBeVisible();
 await expect(alert).toContainText('skip these lessons');
 await expect(alert.getByRole('link',{name:'988'})).toHaveAttribute('href','https://988lifeline.org/');
 await expect(page.locator('#urgent .caution')).toContainText('active crisis');
 const urgent=page.locator('#urgent form.practice');
 await urgent.getByRole('radio').nth(2).check();
 await urgent.getByRole('button',{name:'Check my response'}).click();
 await expect(urgent.getByRole('status')).toContainText('Safety comes first');
});
test('Support Skills works by keyboard at 320px with 200 percent text',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/support-skills-safety.html#boundary');
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
 const form=page.locator('#boundary form.practice');
 const answer=form.getByRole('radio').first();
 await answer.focus();await page.keyboard.press('Space');
 await expect(answer).toBeChecked();
 await form.getByRole('button',{name:'Check my response'}).focus();
 await page.keyboard.press('Enter');
 await expect(form.getByRole('status')).toContainText('Good reasoning.');
 const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(d.html,d.body),'200% text '+JSON.stringify(d)).toBeLessThanOrEqual(d.width+1);
});
test('Support Skills preserves all urgent guidance and lessons without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto('/one-place/support-skills-safety.html');
  await expect(page.locator('section.lesson:visible')).toHaveCount(4);
  await expect(page.locator('button[type="submit"]:disabled')).toHaveCount(4);
  await expect(page.locator('main > p.alert')).toContainText('Urgent help comes first');
  await expect(page.locator('noscript .alert')).toContainText('remain readable without JavaScript');
  await page.getByRole('navigation',{name:'Choose a support skills situation'}).getByRole('link').nth(2).click();
  await expect(page).toHaveURL(/#urgent$/);
 }finally{await context.close();}
});
test('Support Skills uses no server writes, third parties or browser storage on load and practice',async({page})=>{
 const writes=[],thirdParty=[];
 page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
  if(!['127.0.0.1','localhost'].includes(new URL(r.url()).hostname))thirdParty.push(r.url());
 });
 await page.goto('/one-place/support-skills-safety.html');
 await page.locator('#notice input[type=radio]').nth(1).check();
 await page.locator('#notice button[type=submit]').click();
 expect(writes).toEqual([]);
 expect(thirdParty).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 for(const a of await page.locator('.sources a, main > p.alert a').all()){
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await page.reload();
 await expect(page.locator('#notice input[type=radio]:checked')).toHaveCount(0);
 await expect(page.locator('#notice .feedback')).toBeEmpty();
});
test('Support Skills is discoverable from Mental Health and Safety without changing its four cards',async({page})=>{
 await page.goto('/index.html?area=Mental%20Health%20%26%20Safety');
 await expect(page.getByRole('heading',{name:'Mental Health & Safety'})).toBeVisible();
 await expect(page.locator('.offers > a.offer')).toHaveCount(4);
 await page.getByRole('link',{name:'Open Support Skills & Safety Lab'}).click();
 await expect(page).toHaveURL(/\/one-place\/support-skills-safety\.html$/);
 await page.getByRole('link',{name:'Mental Health & Safety area'}).click();
 await expect(page).toHaveURL(/area=Mental/);
 await page.goto('/index.html?area=Health%20%26%20Wellness');
 await expect(page.locator('#support-skills-path')).toHaveCount(0);
});
