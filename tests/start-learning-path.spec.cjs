const {test,expect}=require('@playwright/test');
const url='/one-place/start-learning-path.html';
const cases=[{id:'goal',best:1},{id:'verify',best:2},{id:'fit',best:0}];
async function pick(page,t='reading',f='text',p='brief'){
 await page.locator('#topic').selectOption(t);
 await page.locator('#format').selectOption(f);
 await page.locator('#pace').selectOption(p);
}
for(const width of [320,390,1366,1920]){
 test('Start Learning: complete content, no overflow, screenshot at '+width+'px',async({page})=>{
  const errs=[];page.on('pageerror',e=>errs.push(e.message));
  await page.setViewportSize({width,height:840});await page.goto(url);
  await expect(page.getByRole('heading',{name:'Start Small, Check the Source'})).toBeVisible();
  await expect(page.locator('#steps .steps li')).toHaveCount(3);
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('li[data-choice]')).toHaveCount(9);
  await expect(page.locator('#learning-form select')).toHaveCount(3);
  const g=await page.evaluate(()=>({v:innerWidth,h:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
  expect(Math.max(g.h,g.b),'overflow '+JSON.stringify(g)).toBeLessThanOrEqual(g.v+1);
  expect((await page.screenshot({fullPage:true})).byteLength).toBeGreaterThan(4000);
  expect(errs).toEqual([]);
 });
}
for(const width of [320,390]){
 test('Start Learning: 200% root text readable without horizontal overflow '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:760});await page.goto(url);
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  await expect(page.locator('#plan')).toBeVisible();
  const g=await page.evaluate(()=>({v:innerWidth,h:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
  expect(Math.max(g.h,g.b),'zoom overflow '+JSON.stringify(g)).toBeLessThanOrEqual(g.v+1);
  expect((await page.screenshot({fullPage:true})).byteLength).toBeGreaterThan(4000);
 });
}
for(const s of cases){
 test('Start Learning: all three choice reasons, blank, change and reset for '+s.id,async({page})=>{
  await page.goto(url+'#'+s.id);
  const form=page.locator('#'+s.id+' form.choice-form'),radios=form.getByRole('radio'),feedback=form.locator('.feedback');
  await expect(radios).toHaveCount(3);
  await form.getByRole('button',{name:'Check this choice'}).click();
  await expect(feedback).toContainText('Choose one fictional option');
  await expect(radios.first()).toBeFocused();
  for(let n=0;n<3;n++){
   await radios.nth(n).check();await expect(feedback).toBeEmpty();
   await form.getByRole('button',{name:'Check this choice'}).click();
   const expected=(await form.locator('.reasons [data-choice="'+n+'"]').textContent()).trim();
   await expect(feedback).toContainText(expected);
   await expect(feedback).toContainText(n===s.best?'Useful approach.':'Consider a different approach.');
  }
  await form.getByRole('button',{name:'Start this example over'}).click();
  await expect(feedback).toBeEmpty();await expect(form.locator('input:checked')).toHaveCount(0);
 });
}
for(const width of [320,1366]){
 test('Start Learning: JS-off full static teaching and paper example at '+width+'px',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width,height:840}});
  try{const page=await context.newPage();await page.goto(url);
   await expect(page.locator('section.lesson')).toHaveCount(3);
   await expect(page.locator('#steps .steps li')).toHaveCount(3);
   await expect(page.locator('form.choice-form button[type="submit"]:disabled')).toHaveCount(3);
   await expect(page.locator('#learning-form button:disabled')).toHaveCount(3);
   await page.locator('#verify details summary').click();
   await expect(page.locator('#verify li[data-choice]:visible')).toHaveCount(3);
   await page.locator('#plan details summary').click();
   await expect(page.locator('#plan .model:visible')).toContainText('Learn to read one household notice');
   const g=await page.evaluate(()=>({v:innerWidth,h:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
   expect(Math.max(g.h,g.b)).toBeLessThanOrEqual(g.v+1);
  }finally{await context.close();}
 });
}
test('Start Learning: incomplete plan preserves choices and focuses next select',async({page})=>{
 await page.goto(url);await page.locator('#topic').selectOption('math');
 await page.getByRole('button',{name:'Review a sample learning plan'}).click();
 await expect(page.locator('#plan-status')).toContainText('Choose all three general options');
 await expect(page.locator('#format')).toBeFocused();
 await expect(page.locator('#topic')).toHaveValue('math');
 await expect(page.locator('#plan-preview')).toBeHidden();
 await expect(page.locator('#print-plan')).toBeDisabled();
});
test('Start Learning: sample plan content changes, stale result invalidated until re-review',async({page})=>{
 await page.goto(url);await pick(page,'reading','text','brief');
 await page.getByRole('button',{name:'Review a sample learning plan'}).click();
 await expect(page.locator('#plan-preview')).toBeVisible();
 await expect(page.locator('#plan-text')).toContainText('one everyday notice');
 await expect(page.locator('#plan-text')).toContainText('readable text');
 await expect(page.locator('#print-plan')).toBeEnabled();
 await page.locator('#topic').selectOption('math');
 await expect(page.locator('#plan-preview')).toBeHidden();await expect(page.locator('#print-plan')).toBeDisabled();
 await expect(page.locator('#format')).toHaveValue('text');
 await page.locator('#format').selectOption('audio');
 await page.locator('#pace').selectOption('split');
 await page.getByRole('button',{name:'Review a sample learning plan'}).click();
 await expect(page.locator('#plan-preview')).toBeVisible();
 await expect(page.locator('#plan-text')).toContainText('compare two unit prices');
 await expect(page.locator('#plan-text')).toContainText('readable transcript');
 await expect(page.locator('#plan-text')).toContainText('take a break');
});
test('Start Learning: reset confirmation cancel preserves completed plan; accept clears; empty reset no prompt',async({page})=>{
 await page.goto(url);await pick(page,'digital','video','help');
 await page.getByRole('button',{name:'Review a sample learning plan'}).click();
 page.once('dialog',dialog=>dialog.dismiss());
 await page.getByRole('button',{name:'Clear my selections'}).click();
 await expect(page.locator('#topic')).toHaveValue('digital');
 await expect(page.locator('#plan-preview')).toBeVisible();
 await expect(page.locator('#plan-status')).toContainText('Selections preserved');
 page.once('dialog',dialog=>dialog.accept());
 await page.getByRole('button',{name:'Clear my selections'}).click();
 await expect(page.locator('#topic')).toHaveValue('');
 await expect(page.locator('#format')).toHaveValue('');
 await expect(page.locator('#pace')).toHaveValue('');
 await expect(page.locator('#plan-preview')).toBeHidden();
 await expect(page.locator('#print-plan')).toBeDisabled();
 await page.getByRole('button',{name:'Clear my selections'}).click();
 await expect(page.locator('#plan-status')).toContainText('Sample selections cleared');
});
test('Start Learning: keyboard skip link and keyboard submit on fictional choices',async({page})=>{
 await page.goto(url);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to learning practice'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 await page.locator('#goal input[type=radio]').nth(1).focus();
 await page.keyboard.press('Space');
 await page.locator('#goal button[type=submit]').focus();await page.keyboard.press('Enter');
 await expect(page.locator('#goal .feedback')).toContainText('Useful approach.');
});
test('Start Learning: no outbound requests, browser storage, and official links and real area return',async({page})=>{
 const writes=[],offsite=[],errors=[];
 page.on('request',r=>{const u=new URL(r.url());if(!['GET','HEAD'].includes(r.method()))writes.push(r.url());if(!['localhost','127.0.0.1'].includes(u.hostname))offsite.push(r.url());});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);await pick(page);await page.getByRole('button',{name:'Review a sample learning plan'}).click();
 expect(writes).toEqual([]);expect(offsite).toEqual([]);expect(errors).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
 const links=page.locator('#sources a[href^="https://"]');await expect(links).toHaveCount(2);
 for(const l of await links.all()){await expect(l).toHaveAttribute('target','_blank');await expect(l).toHaveAttribute('rel',/noopener noreferrer/);}
 await page.getByRole('link',{name:'Return to Learning & Education'}).click();
 await expect(page).toHaveURL(/area=Learning/);
 await expect(page.getByRole('heading',{name:'Learning & Education',level:1})).toBeVisible();
});
test('Start Learning: print CSS hides controls but keeps plan readable',async({page})=>{
 await page.goto(url);await pick(page);
 await page.getByRole('button',{name:'Review a sample learning plan'}).click();
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#plan-preview')).toBeVisible();
 await expect(page.locator('#plan-text')).toContainText('one everyday notice');
 await expect(page.locator('#learning-form button[type=submit]')).toBeHidden();
 await expect(page.locator('#sources')).toBeHidden();
 await page.emulateMedia({media:'screen'});
 await expect(page.getByRole('button',{name:'Print the sample plan'})).toBeVisible();
});
