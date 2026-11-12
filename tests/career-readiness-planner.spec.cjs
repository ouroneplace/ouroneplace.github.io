const {test,expect}=require('@playwright/test');

for(const [key,stage,goal] of [["first","Exploring first role","Prepare for a first customer-support interview"],["switch","Changing careers","Explore an office coordination role"],["return","Returning after a break","Explore a part-time scheduling role"],["flexible","Exploring flexible work","Find a legitimate flexible role with clear duties"]]){
 test('Career Readiness: example '+key+' is editable and never silently exported',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  let downloads=0;page.on('download',()=>downloads++);
  await page.goto('/one-place/career-readiness-planner.html#planner');
  const button=page.locator('[data-career-example="'+key+'"]');
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.locator('#careerStage')).toHaveValue(stage);
  await expect(page.locator('#careerGoal')).toHaveValue(goal);
  await expect(page.locator('#careerGoal')).toBeFocused();
  await expect(page.locator('#careerResult')).toBeHidden();
  await expect(page.locator('#downloadCareer')).toBeDisabled();
  await page.locator('#reviewCareer').click();
  await expect(page.locator('#careerResult')).toContainText(goal);
  await expect(page.locator('#careerResult')).toContainText('This is your planning draft');
  await expect(page.locator('#downloadCareer')).toBeEnabled();
  await page.locator('#careerAction').fill('My own accurate replacement action');
  await expect(page.locator('#careerResult')).toBeHidden();
  await expect(page.locator('#downloadCareer')).toBeDisabled();
  await page.locator('#reviewCareer').click();
  await expect(page.locator('#careerResult')).toContainText('My own accurate replacement action');
  expect(downloads).toBe(0);
  expect(errors).toEqual([]);
 });
}

for(const width of [320,390,1366,1920]){
 test('Career Readiness: responsive form and teaching at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:844});
  await page.goto('/one-place/career-readiness-planner.html');
  await expect(page.getByRole('heading',{name:'Career Readiness Planner',level:1})).toBeVisible();
  await expect(page.locator('.step')).toHaveCount(4);
  await expect(page.getByRole('group',{name:'Choose a fictional career planning example'}).getByRole('button')).toHaveCount(4);
  await expect(page.locator('form#careerForm')).toHaveCount(1);
  for(const anchor of ['planner','safety']){
    await page.goto('/one-place/career-readiness-planner.html#'+anchor);
    await expect(page.locator('#'+anchor)).toBeVisible();
    const dim=await page.evaluate(()=>({screen:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
    expect(Math.max(dim.html,dim.body),'Overflow at '+width+': '+JSON.stringify(dim)).toBeLessThanOrEqual(width+1);
  }
  expect(errors).toEqual([]);
 });
}

test('Career Readiness: empty and partial inputs are explained and focused',async({page})=>{
 await page.goto('/one-place/career-readiness-planner.html#planner');
 await expect(page.locator('#reviewCareer')).toBeEnabled();
 await expect(page.locator('#downloadCareer')).toBeDisabled();
 await expect(page.locator('#printCareer')).toBeDisabled();
 await page.locator('#reviewCareer').click();
 await expect(page.locator('#careerStatus')).toContainText('Add a role or goal');
 await expect(page.locator('#careerGoal')).toBeFocused();
 await page.locator('#careerGoal').fill('Prepare for a new role');
 await page.locator('#reviewCareer').click();
 await expect(page.locator('#careerSkill')).toBeFocused();
 await page.locator('#careerSkill').fill('Clear communication');
 await page.locator('#reviewCareer').click();
 await expect(page.locator('#careerAction')).toBeFocused();
 await page.locator('#careerAction').fill('I explained a task step by step');
 await page.locator('#reviewCareer').click();
 await expect(page.locator('#careerResult')).toContainText('Prepare for a new role');
 await expect(page.locator('#careerResult')).toContainText('Not entered');
});

test('Career Readiness: replacing existing text requires consent and cancel preserves it',async({page})=>{
 await page.goto('/one-place/career-readiness-planner.html#planner');
 await page.locator('#careerGoal').fill('My draft goal');
 await page.locator('#careerSkill').fill('My draft skill');
 await page.locator('#careerAction').fill('My draft action');
 page.once('dialog',async d=>{expect(d.message()).toContain('Replace the current career draft');await d.dismiss();});
 await page.locator('[data-career-example="return"]').click();
 await expect(page.locator('#careerGoal')).toHaveValue('My draft goal');
 await expect(page.locator('#careerSkill')).toHaveValue('My draft skill');
 await expect(page.locator('#careerAction')).toHaveValue('My draft action');
 page.once('dialog',async d=>{await d.accept();});
 await page.locator('[data-career-example="flexible"]').click();
 await expect(page.locator('#careerGoal')).toHaveValue('Find a legitimate flexible role with clear duties');
});

test('Career Readiness: export is deliberate and downloads exact reviewed plain text',async({page})=>{
 const downloads=[];page.on('download',d=>downloads.push(d));
 await page.goto('/one-place/career-readiness-planner.html#planner');
 await page.locator('#careerGoal').fill('My role goal');
 await page.locator('#careerSkill').fill('A genuine skill');
 await page.locator('#careerAction').fill('I wrote clear instructions');
 await page.locator('#reviewCareer').click();
 page.once('dialog',async d=>{expect(d.message()).toContain('Download this reviewed career plan');await d.dismiss();});
 await page.locator('#downloadCareer').click();
 await expect(page.locator('#careerStatus')).toContainText('Download canceled');
 expect(downloads).toHaveLength(0);
 page.once('dialog',async d=>{await d.accept();});
 const pending=page.waitForEvent('download');
 await page.locator('#downloadCareer').click();
 const file=await pending;
 expect(file.suggestedFilename()).toBe('one-place-career-plan.txt');
 const chunks=[];for await(const chunk of await file.createReadStream())chunks.push(chunk);
 const txt=Buffer.concat(chunks).toString('utf8');
 expect(txt).toContain('My role goal');
 expect(txt).toContain('A genuine skill');
 expect(txt).toContain('I wrote clear instructions');
 expect(txt).toContain('Verify the employer');
});

test('Career Readiness: clear preserves the existing draft when canceled',async({page})=>{
 await page.goto('/one-place/career-readiness-planner.html');
 await page.locator('#careerGoal').fill('My current goal');
 await page.locator('#careerSkill').fill('My accurate skill');
 await page.locator('#careerAction').fill('I completed this task');
 await page.locator('#reviewCareer').click();
 page.once('dialog',async d=>{await d.dismiss();});
 await page.locator('#clearCareer').click();
 await expect(page.locator('#careerGoal')).toHaveValue('My current goal');
 await expect(page.locator('#careerResult')).toContainText('My accurate skill');
 page.once('dialog',async d=>{await d.accept();});
 await page.locator('#clearCareer').click();
 await expect(page.locator('#careerGoal')).toHaveValue('');
 await expect(page.locator('#careerSkill')).toHaveValue('');
 await expect(page.locator('#careerAction')).toHaveValue('');
 await expect(page.locator('#careerResult')).toBeHidden();
 await expect(page.locator('#downloadCareer')).toBeDisabled();
});

test('Career Readiness: 320px and enlarged 200 percent text are keyboard usable',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/career-readiness-planner.html#planner');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const button=page.locator('[data-career-example="switch"]');
 await button.focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#careerGoal')).toBeFocused();
 await expect(page.locator('#careerGoal')).toHaveValue('Explore an office coordination role');
 await page.locator('#reviewCareer').focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#careerResult')).toBeVisible();
 const d=await page.evaluate(()=>({screen:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(d.html,d.body),'200% reflow '+JSON.stringify(d)).toBeLessThanOrEqual(d.screen+1);
});

test('Career Readiness: script-free page keeps teaching visible and controls disabled',async({browser})=>{
 const c=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await c.newPage();
  await page.goto('/one-place/career-readiness-planner.html');
  await expect(page.getByRole('heading',{name:'Career Readiness Planner'})).toBeVisible();
  await expect(page.locator('.step:visible')).toHaveCount(4);
  await expect(page.locator('.examples')).toBeHidden();
  await expect(page.locator('#reviewCareer')).toBeDisabled();
  await expect(page.locator('#downloadCareer')).toBeDisabled();
  await expect(page.locator('#clearCareer')).toBeDisabled();
  await expect(page.locator('noscript p')).toContainText('Without JavaScript');
 }finally{await c.close();}
});

test('Career Readiness: untrusted notes are plain text; no storage, uploads or third parties',async({page})=>{
 const writes=[],external=[];page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
  if(!['localhost','127.0.0.1'].includes(new URL(r.url()).hostname))external.push(r.url());
 });
 await page.goto('/one-place/career-readiness-planner.html');
 const literal='<img src=x onerror="window.careerUnsafe=true">';
 await page.locator('#careerGoal').fill('Explore safe work');
 await page.locator('#careerSkill').fill('Researching');
 await page.locator('#careerAction').fill(literal);
 await page.locator('#reviewCareer').click();
 await expect(page.locator('#careerResult')).toContainText(literal);
 await expect(page.locator('#careerResult img')).toHaveCount(0);
 expect(await page.evaluate(()=>window.careerUnsafe)).toBeUndefined();
 expect(writes).toEqual([]);expect(external).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await page.reload();
 await expect(page.locator('#careerResult')).toBeHidden();
 await expect(page.locator('#downloadCareer')).toBeDisabled();
});

test('Career Readiness: linked only in Work & Careers without changing four original cards',async({page})=>{
 await page.goto('/index.html?area=Work%20%26%20Careers');
 await expect(page.getByRole('heading',{level:1,name:'Work & Careers',exact:true})).toBeVisible();
 await expect(page.locator('.offers > a.offer')).toHaveCount(4);
 await page.getByRole('link',{name:'Open Career Readiness Planner'}).click();
 await expect(page).toHaveURL(/\/one-place\/career-readiness-planner\.html$/);
 await page.getByRole('link',{name:'Work & Careers'}).first().click();
 await expect(page).toHaveURL(/area=Work/);
 await page.goto('/index.html?area=Business%20%26%20Entrepreneurship');
 await expect(page.locator('#career-readiness-path')).toHaveCount(0);
});

test('Career Readiness: original source links are clearly labeled, independent and safe',async({page})=>{
 await page.goto('/one-place/career-readiness-planner.html');
 const links=page.locator('.sources a[href^="https://"]');
 await expect(links).toHaveCount(3);
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(link).toContainText('(U.S., external)');
 }
});

test('Career Readiness: print view displays only reviewed output, not other form inputs',async({page})=>{
 await page.goto('/one-place/career-readiness-planner.html');
 await page.locator('#careerGoal').fill('Prepare for a reliable job interview');
 await page.locator('#careerSkill').fill('Clear communication');
 await page.locator('#careerAction').fill('I clarified a task');
 await page.locator('#reviewCareer').click();
 await page.emulateMedia({media:'print'});
 const state=await page.evaluate(()=>{
  const display=sel=>getComputedStyle(document.querySelector(sel)).display;
  return {preview:display('#careerResult'),otherMain:display('main > p.lead'),fieldset:display('#careerForm fieldset'),buttons:display('#careerForm .actions'),extra:display('#planner > p')};
 });
 expect(state.preview).not.toBe('none');
 expect(state.otherMain).toBe('none');
 expect(state.fieldset).toBe('none');
 expect(state.buttons).toBe('none');
 expect(state.extra).toBe('none');
 await expect(page.locator('#careerResult')).toContainText('Prepare for a reliable job interview');
});
