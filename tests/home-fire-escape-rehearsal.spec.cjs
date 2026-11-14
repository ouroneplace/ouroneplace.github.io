const {test,expect}=require('@playwright/test');
const path='/one-place/home-fire-escape-rehearsal.html';

for(const width of [320,1366]){
 test('public indexing parity for fire escape and area navigation at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:840});
  await page.goto(path);
  const robots=page.locator('meta[name="robots"]');
  await expect(robots).toHaveCount(1);
  await expect(robots).toHaveAttribute('content','index,follow');
  await expect(page.getByRole('heading',{name:'Home Fire Escape Rehearsal',level:1})).toBeVisible();
  await expect(page.locator('header nav a').first()).toHaveAttribute('href','../index.html?area=Emergencies%20%26%20Preparedness');
 });
}

for(const width of [320,390,1366,1920]){
 test('fire rehearsal teaches five safe skills and fits '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:840});
  await page.goto(path);
  await expect(page).toHaveTitle(/Home Fire Escape Rehearsal/);
  await expect(page.getByRole('heading',{name:'Home Fire Escape Rehearsal',level:1})).toBeVisible();
  await expect(page.locator('article.lesson')).toHaveCount(5);
  await expect(page.locator('article.lesson dt')).toHaveCount(30);
  await expect(page.locator('#fallback')).toBeHidden();
  const m=await page.evaluate(()=>({w:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(m.html,m.body),JSON.stringify(m)).toBeLessThanOrEqual(m.w+1);
  expect(errors).toEqual([]);
 });
}
test('200%-text reflow stays within a 320px viewport',async({page})=>{
 await page.setViewportSize({width:320,height:720});
 await page.goto(path);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 await expect(page.locator('#concern')).toBeVisible();
 const m=await page.evaluate(()=>({w:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(m.html,m.body),JSON.stringify(m)).toBeLessThanOrEqual(m.w+1);
});
for(const width of [320,390]){
 test('selected fire choices are fully visible beside native controls at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:840});
  await page.goto(path);
  const concern=page.locator('#concernChoice'),action=page.locator('#actionChoice');
  await expect(concern).toBeHidden();
  await expect(action).toBeHidden();
  await page.locator('#concern').selectOption('alerts');
  await page.locator('#setting').selectOption('shared');
  await page.locator('#action').selectOption('specialist');
  await expect(concern).toHaveText('Selected barrier: Make fire alerts understandable and detectable');
  await expect(action).toHaveText('Selected next action: Contact qualified fire or building staff');
  for(const output of [concern,action]){
   await expect(output).toBeVisible();
   const dimensions=await output.evaluate(el=>{
    const box=el.getBoundingClientRect(),range=document.createRange();
    range.selectNodeContents(el);
    return {left:box.left,right:box.right,client:el.clientWidth,scroll:el.scrollWidth,fragments:range.getClientRects().length,viewport:innerWidth,documentScroll:document.documentElement.scrollWidth};
   });
   expect(dimensions.left).toBeGreaterThanOrEqual(0);
   expect(dimensions.right).toBeLessThanOrEqual(width);
   expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client+1);
   expect(dimensions.documentScroll).toBeLessThanOrEqual(width+1);
  }
  await page.getByRole('button',{name:'Review my rehearsal step'}).click();
  await expect(page.locator('#reviewed')).toBeVisible();
  await page.locator('#concern').selectOption('mobility');
  await expect(concern).toContainText('Include mobility and assistance needs');
  await expect(page.locator('#reviewed')).toBeHidden();
  page.once('dialog',dialog=>dialog.dismiss());
  await page.getByRole('button',{name:'Clear choices'}).click();
  await expect(concern).toBeVisible();
  page.once('dialog',dialog=>dialog.accept());
  await page.getByRole('button',{name:'Clear choices'}).click();
  await expect(concern).toBeHidden();
  await expect(action).toBeHidden();
  await expect(concern).toBeEmpty();
  await expect(action).toBeEmpty();
 });
}

test('five concerns and three settings give useful and bounded reviewed steps',async({page})=>{
 await page.goto(path);
 const concerns=['routes','mobility','alerts','dependents','building'],settings=['single','multi','shared'];
 for(const concern of concerns)for(const setting of settings){
  await page.locator('#concern').selectOption(concern);
  await page.locator('#setting').selectOption(setting);
  await page.locator('#action').selectOption('specialist');
  await page.getByRole('button',{name:'Review my rehearsal step'}).click();
  await expect(page.locator('#reviewed')).toBeVisible();
  await expect(page.locator('#preview')).toContainText('Check success:');
  await expect(page.locator('#preview')).toContainText('Stop or seek help:');
  await expect(page.locator('#preview')).toContainText('This is a planning note, not inspection or professional approval.');
  await expect(page.getByRole('button',{name:'Print reviewed step'})).toBeEnabled();
 }
});
test('empty and partial inputs do not generate a reviewed document',async({page})=>{
 await page.goto(path);
 await expect(page.locator('#print')).toBeDisabled();
 await page.getByRole('button',{name:'Review my rehearsal step'}).click();
 await expect(page.locator('#reviewed')).toBeHidden();
 await page.locator('#concern').selectOption('routes');
 await page.getByRole('button',{name:'Review my rehearsal step'}).click();
 await expect(page.locator('#reviewed')).toBeHidden();
 await page.locator('#setting').selectOption('single');
 await page.getByRole('button',{name:'Review my rehearsal step'}).click();
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.locator('#action')).toHaveValue('');
});
test('review is invalidated by edits and cleared only with confirmation',async({page})=>{
 await page.goto(path);
 await page.locator('#concern').selectOption('alerts');
 await page.locator('#setting').selectOption('shared');
 await page.locator('#action').selectOption('coordinate');
 await page.getByRole('button',{name:'Review my rehearsal step'}).click();
 await expect(page.locator('body')).toHaveClass(/print-review/);
 await page.locator('#concern').selectOption('mobility');
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.locator('#print')).toBeDisabled();
 await expect(page.locator('body')).not.toHaveClass(/print-review/);
 await page.getByRole('button',{name:'Review my rehearsal step'}).click();
 page.once('dialog',d=>d.dismiss());
 await page.getByRole('button',{name:'Clear choices'}).click();
 await expect(page.locator('#concern')).toHaveValue('mobility');
 await expect(page.locator('#reviewed')).toBeVisible();
 page.once('dialog',d=>d.accept());
 await page.getByRole('button',{name:'Clear choices'}).click();
 await expect(page.locator('#concern')).toHaveValue('');
 await expect(page.locator('#setting')).toHaveValue('');
 await expect(page.locator('#action')).toHaveValue('');
 await expect(page.locator('#reviewed')).toBeHidden();
});
test('unreviewed and edited notes stay out of print while paper guide remains usable',async({page})=>{
 await page.goto(path);
 await page.emulateMedia({media:'print'});
 await expect(page.locator('body')).not.toHaveClass(/print-review/);
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.getByRole('heading',{name:'Five skills for an accessible fire plan'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'A paper escape rehearsal'})).toBeVisible();
 await page.emulateMedia({media:'screen'});
 await page.locator('#concern').selectOption('alerts');
 await page.locator('#setting').selectOption('shared');
 await page.locator('#action').selectOption('specialist');
 await page.getByRole('button',{name:'Review my rehearsal step'}).click();
 await expect(page.locator('#reviewed')).toBeVisible();
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#reviewed')).toBeVisible();
 await expect(page.locator('#preview')).toContainText('Make fire alerts');
 await expect(page.getByRole('heading',{name:'A paper escape rehearsal'})).toBeHidden();
 await page.emulateMedia({media:'screen'});
 await page.locator('#setting').selectOption('multi');
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.locator('body')).not.toHaveClass(/print-review/);
 await expect(page.locator('#print')).toBeDisabled();
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.getByRole('heading',{name:'Five skills for an accessible fire plan'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'A paper escape rehearsal'})).toBeVisible();
});

test('only the reviewed step is printed by the dedicated button',async({page})=>{
 await page.goto(path);
 await page.evaluate(()=>{window.__prints=0;window.print=()=>window.__prints++;});
 await expect(page.locator('#print')).toBeDisabled();
 await page.locator('#concern').selectOption('building');
 await page.locator('#setting').selectOption('shared');
 await page.locator('#action').selectOption('specialist');
 await page.getByRole('button',{name:'Review my rehearsal step'}).click();
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#reviewed')).toBeVisible();
 await expect(page.getByRole('heading',{name:'Five skills for an accessible fire plan'})).toBeHidden();
 await expect(page.getByRole('heading',{name:'A paper escape rehearsal'})).toBeHidden();
 await page.emulateMedia({media:'screen'});
 await page.locator('#print').click();
 expect(await page.evaluate(()=>window.__prints)).toBe(1);
});
test('fictional practice handles blank, both unsafe options, safe choice and retry',async({page})=>{
 await page.goto(path);
 await page.locator('#check').click();
 await expect(page.locator('#feedback')).toContainText('Choose a response first');
 await page.locator('input[name="decision"][value="a"]').check();
 await page.locator('#check').click();
 await expect(page.locator('#feedback')).toContainText('Unsafe: smoke');
 await page.locator('input[name="decision"][value="c"]').check();
 await page.locator('#check').click();
 await expect(page.locator('#feedback')).toContainText('Unsafe: an app');
 await page.locator('input[name="decision"][value="b"]').check();
 await page.locator('#check').click();
 await expect(page.locator('#feedback')).toContainText('Safer response');
 await page.locator('#retry').click();
 await expect(page.locator('input[name="decision"]:checked')).toHaveCount(0);
 await expect(page.locator('#feedback')).toContainText('Choice cleared');
});
for(const width of [320,1366]){
 test('changing fire escape answer clears previous safe feedback at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:850});
  await page.goto(path);
  const feedback=page.locator('#feedback');
  await page.locator('input[name="decision"][value="b"]').check();
  await page.locator('#check').click();
  await expect(feedback).toContainText('Safer response');
  await page.locator('input[name="decision"][value="a"]').check();
  await expect(feedback).toHaveText('Choice selected. Check my reasoning for updated feedback.');
  await expect(feedback).not.toContainText('Safer response');
  await page.locator('#check').click();
  await expect(feedback).toContainText('Unsafe: smoke');
  await page.locator('input[name="decision"][value="b"]').check();
  await expect(feedback).toHaveText('Choice selected. Check my reasoning for updated feedback.');
  await expect(feedback).not.toContainText('Unsafe: smoke');
  await page.locator('#check').click();
  await expect(feedback).toContainText('Safer response');
 });
}
test('keyboard, labels, skip link and live feedback are semantic',async({page})=>{
 await page.goto(path);
 await page.getByRole('link',{name:'Skip to fire escape guide'}).focus();
 await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/#main$/);
 await page.locator('#concern').focus();
 await page.keyboard.press('Tab');
 await expect(page.locator('#setting')).toBeFocused();
 await expect(page.getByRole('group',{name:'What is the safest general response?'})).toBeVisible();
 await expect(page.getByRole('status')).toHaveCount(2);
});
test('without JavaScript full lessons, explanation, and paper plan are readable',async({browser})=>{
 const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
 const page=await ctx.newPage();
 await page.goto(path);
 await expect(page.locator('#planForm')).toBeHidden();
 await expect(page.locator('#fallback')).toBeVisible();
 await expect(page.locator('article.lesson')).toHaveCount(5);
 await expect(page.getByRole('heading',{name:'A paper escape rehearsal'})).toBeVisible();
 await page.locator('details summary').click();
 await expect(page.getByText(/Do not enter smoke or return to a dangerous building/)).toBeVisible();
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.getByRole('heading',{name:'A paper escape rehearsal'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Five skills for an accessible fire plan'})).toBeVisible();
 const m=await page.evaluate(()=>({w:innerWidth,b:document.body.scrollWidth,h:document.documentElement.scrollWidth}));
 expect(Math.max(m.b,m.h)).toBeLessThanOrEqual(m.w+1);
 }finally{await ctx.close();}
});
test('page does not collect personal information, write requests, or persist',async({page})=>{
 const third=[],writes=[];
 page.on('request',request=>{
  if(!['GET','HEAD'].includes(request.method()))writes.push(request.url());
  if(!request.url().startsWith('http://127.0.0.1:8765/')&&!request.url().startsWith('data:'))third.push(request.url());
 });
 await page.goto(path);
 await expect(page.locator('input[type="text"],textarea,input[type="email"],input[type="tel"]')).toHaveCount(0);
 await page.locator('#concern').selectOption('mobility');
 await page.locator('#setting').selectOption('multi');
 await page.locator('#action').selectOption('specialist');
 await page.getByRole('button',{name:'Review my rehearsal step'}).click();
 await page.locator('input[name="decision"][value="b"]').check();
 await page.locator('#check').click();
 expect(third).toEqual([]);
 expect(writes).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage),cookies:document.cookie}))).toEqual({local:[],session:[],cookies:''});
});
for(const width of [320,1366]){
 test('fire guide click-through to accepted smoke alarms and Emergencies area at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:840});
  await page.goto(path);
  await page.getByRole('link',{name:'Home Skills smoke alarm lesson'}).click();
  await expect(page).toHaveURL(/\/one-place\/home-skills\.html#skill-28$/);
  await expect(page.locator('#skill-28 summary')).toContainText('Test smoke alarms');
  await expect(page.locator('#skill-29 summary')).toContainText('Check carbon monoxide alarms');
  await page.goBack();
  await expect(page.getByRole('heading',{name:'Home Fire Escape Rehearsal',level:1})).toBeVisible();
  await page.locator('header nav').getByRole('link',{name:'Emergencies & Preparedness'}).click();
  await expect(page).toHaveURL(/\/index\.html\?area=Emergencies%20%26%20Preparedness$/);
  await expect(page.getByRole('heading',{name:'Emergencies & Preparedness',level:1})).toBeVisible();
  await expect(page.getByText('Create a family emergency plan')).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('heading',{name:'Home Fire Escape Rehearsal',level:1})).toBeVisible();
 });
}

test('primary sources, local limits, and protected feature return paths',async({page})=>{
 await page.goto(path);
 const external=page.locator('.sources a[href^="https://"]');
 await expect(external).toHaveCount(5);
 for(const a of await external.all()){
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(a).toContainText('external');
 }
 await expect(page.getByText(/911 is used in the U.S./)).toBeVisible();
 await expect(page.getByRole('link',{name:'UK government: home fire safety, accessible version (external; England)'})).toBeVisible();
 await expect(page.getByText(/do not apply England-specific rules automatically elsewhere/)).toBeVisible();
 await expect(page.locator('header nav a').first()).toHaveAttribute('href','../index.html?area=Emergencies%20%26%20Preparedness');
 await expect(page.getByRole('link',{name:'Home Skills smoke alarm lesson'})).toHaveAttribute('href','home-skills.html#skill-28');
 await page.goto('/one-place/home-skills.html#skill-28');
 await expect(page.locator('#skill-28 summary')).toContainText('Test smoke alarms');
 await expect(page.locator('#skill-29 summary')).toContainText('Check carbon monoxide alarms');
});
