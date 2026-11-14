const {test,expect}=require('@playwright/test');
const path='/one-place/first-week-work-practice.html';
const cases={
 task:{correct:'clarify',wrong:['guess','wait']},
 hours:{correct:'compare',wrong:['ignore','invent']},
 access:{correct:'request',wrong:['mock','expose']}
};
function caseForm(page,name){return page.locator('form[data-case="'+name+'"]');}

test('First Week: three complete fictional teaching cases and official opt-in references',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(path);
 await expect(page.getByRole('heading',{name:'First Week at Work Practice',level:1})).toBeVisible();
 await expect(page.locator('.case')).toHaveCount(3);
 await expect(page.locator('.guide')).toHaveCount(3);
 await expect(page.locator('.case details')).toHaveCount(3);
 await expect(page.locator('form.practice')).toHaveCount(3);
 for(const name of Object.keys(cases)){
  const section=page.locator('#'+name);
  await expect(section.getByText('WHY:',{exact:false})).toBeVisible();
  await expect(section.getByText('STOP:',{exact:false})).toBeVisible();
  await expect(caseForm(page,name).locator('input[type=radio]')).toHaveCount(3);
  await expect(caseForm(page,name)).toBeVisible();
 }
 const external=page.locator('.sources a');
 await expect(external).toHaveCount(3);
 for(const link of await external.all()){
  expect(await link.getAttribute('href')).toMatch(/^https:\/\/(www\.)?(dol\.gov|eeoc\.gov|osha\.gov)\//);
  expect(await link.getAttribute('target')).toBe('_blank');
  expect(await link.getAttribute('rel')).toContain('noopener');
 }
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
 expect(errors).toEqual([]);
});

test('First Week: all nine choices explain why and identify a next step',async({page})=>{
 await page.goto(path);
 for(const [name,info] of Object.entries(cases)){
  const form=caseForm(page,name);
  for(const value of [...info.wrong,info.correct]){
   await form.locator('input[value="'+value+'"]').check();
   await expect(form.locator('.feedback')).toBeEmpty();
   await form.getByRole('button',{name:'Check my choice'}).click();
   const feedback=form.locator('.feedback');
   await expect(feedback).toContainText('Why:');
   await expect(feedback).toContainText('Next:');
   await expect(feedback).toContainText(value===info.correct?'A safer choice':'Not yet');
  }
 }
});

test('First Week: blank choices and changes cannot reuse stale feedback; reset is reversible',async({page})=>{
 await page.goto(path);
 const form=caseForm(page,'hours');
 await form.getByRole('button',{name:'Check my choice'}).click();
 await expect(form.locator('.feedback')).toContainText('Choose a fictional response first');
 await form.locator('input[value="ignore"]').check();
 await expect(form.locator('.feedback')).toBeEmpty();
 await form.getByRole('button',{name:'Check my choice'}).click();
 await expect(form.locator('.feedback')).toContainText('Not yet');
 await form.locator('input[value="compare"]').check();
 await expect(form.locator('.feedback')).toBeEmpty();
 await form.getByRole('button',{name:'Check my choice'}).click();
 await expect(form.locator('.feedback')).toContainText('A safer choice');
 await form.getByRole('button',{name:'Reset this practice'}).click();
 await expect(form.locator('input:checked')).toHaveCount(0);
 await expect(form.locator('.feedback')).toBeEmpty();
 await expect(caseForm(page,'task')).toBeVisible();
});

for(const width of [320,390,1366,1920]){
 test('First Week: responsive teaching and optional practice at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:844});
  await page.goto(path);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.case')).toHaveCount(3);
  await expect(page.locator('form.practice:visible')).toHaveCount(3);
  const dimensions=await page.evaluate(()=>({html:document.documentElement.scrollWidth,body:document.body.scrollWidth,width:innerWidth}));
  expect(Math.max(dimensions.html,dimensions.body),JSON.stringify(dimensions)).toBeLessThanOrEqual(width+1);
  const form=caseForm(page,'task');
  await form.locator('input[value="clarify"]').check();
  await form.getByRole('button',{name:'Check my choice'}).click();
  await expect(form.locator('.feedback')).toContainText('A safer choice');
 });
}
for(const width of [320,390]){
 test('First Week: 200% root text remains readable without horizontal overflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:844});
  await page.goto(path);
  await page.addStyleTag({content:'html{font-size:200%!important}'});
  const dims=await page.evaluate(()=>({html:document.documentElement.scrollWidth,body:document.body.scrollWidth,width:innerWidth}));
  expect(Math.max(dims.html,dims.body),JSON.stringify(dims)).toBeLessThanOrEqual(width+1);
  await expect(page.locator('.case')).toHaveCount(3);
  await expect(caseForm(page,'access').getByRole('button',{name:'Check my choice'})).toBeVisible();
 });
}

for(const width of [320,1366]){
 test('First Week: no JavaScript keeps complete paper guidance at '+width+'px',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,baseURL:'http://127.0.0.1:8765',viewport:{width,height:844}});
  try{
   const page=await context.newPage();await page.goto(path);
   await expect(page.getByRole('heading',{name:'First Week at Work Practice',level:1})).toBeVisible();
   await expect(page.locator('form.practice:visible')).toHaveCount(0);
   await expect(page.locator('.case')).toHaveCount(3);
   await expect(page.locator('noscript')).toContainText('optional quizzes are disabled');
   for(const name of Object.keys(cases)){
    await expect(page.locator('#'+name+' .guide')).toBeVisible();
    await expect(page.locator('#'+name+' summary')).toBeVisible();
    await page.locator('#'+name+' summary').click();
    await expect(page.locator('#'+name+' details p')).toBeVisible();
   }
   const d=await page.evaluate(()=>({html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(d.html,d.body)).toBeLessThanOrEqual(width+1);
  }finally{await context.close();}
 });
}

test('First Week: keyboard skip link reaches main and first practice model response',async({page})=>{
 await page.setViewportSize({width:320,height:844});
 await page.goto(path);
 await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Skip to first-week learning'})).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.locator('#main')).toBeFocused();
 await page.keyboard.press('Tab');
 await expect(page.locator('#task summary')).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.locator('#task details')).toHaveAttribute('open','');
});

test('First Week: fictional choices remain private and navigation stays within approved paths',async({page})=>{
 const outside=[],errors=[];
 page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:8765/'))outside.push(r.url());});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(path);
 await caseForm(page,'access').locator('input[value="request"]').check();
 await caseForm(page,'access').getByRole('button',{name:'Check my choice'}).click();
 const state=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length,cookies:document.cookie,forms:[...document.forms].map(f=>f.getAttribute('action'))}));
 expect(state.local).toBe(0);expect(state.session).toBe(0);expect(state.cookies).toBe('');
 expect(state.forms).toEqual([null,null,null]);
 expect(outside).toEqual([]);expect(errors).toEqual([]);
 await expect(page.getByRole('link',{name:'Work & Careers',exact:true}).first()).toHaveAttribute('href','../index.html?area=Work%20%26%20Careers');
 await expect(page.getByRole('link',{name:'One Place home',exact:true}).first()).toHaveAttribute('href','../index.html');
});
