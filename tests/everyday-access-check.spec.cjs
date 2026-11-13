const {test,expect}=require('@playwright/test');
const url='/one-place/everyday-access-check.html';
const sizes=[320,390,1366,1920];

for(const width of sizes){
 test('access check displays all five lessons and fits '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.setViewportSize({width,height:850});
  await page.goto(url);
  await expect(page).toHaveTitle(/Everyday Access Check/);
  await expect(page.getByRole('heading',{level:1,name:'Everyday Access Check'})).toBeVisible();
  await expect(page.locator('article.lesson')).toHaveCount(5);
  await expect(page.locator('article.lesson dt')).toHaveCount(30);
  await expect(page.locator('header nav').getByRole('link',{name:'Aging & Accessibility'})).toBeVisible();
  const measure=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(measure.html,measure.body),JSON.stringify(measure)).toBeLessThanOrEqual(measure.width+1);
  expect(errors).toEqual([]);
 });
}

test('320px viewport remains readable with 200% document font and no horizontal overflow',async({page})=>{
 await page.setViewportSize({width:320,height:720});
 await page.goto(url);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 await expect(page.getByLabel('What is making this routine hard?')).toBeVisible();
 const m=await page.evaluate(()=>({screen:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(m.html,m.body),JSON.stringify(m)).toBeLessThanOrEqual(m.screen+1);
});

test('each barrier yields an honest concrete review with a stop condition',async({page})=>{
 await page.goto(url);
 const expected={
  movement:'Unsafe transfers',vision:'Sudden vision loss',hearing:'Safety-critical alarm systems',information:'For access to records',energy:'New or worsening symptoms'
 };
 for(const [key,stop] of Object.entries(expected)){
  await page.locator('#barrier').selectOption(key);
  await page.locator('#place').selectOption('home');
  await page.locator('#support').selectOption('observe');
  await page.getByRole('button',{name:'Review my access plan'}).click();
  await expect(page.locator('#reviewed')).toBeVisible();
  await expect(page.locator('#preview')).toContainText(stop);
  await expect(page.locator('#preview')).toContainText('Check success:');
  await expect(page.getByRole('button',{name:'Print reviewed plan'})).toBeEnabled();
 }
});

test('different places and seeking qualified support alter the plan without promising services',async({page})=>{
 await page.goto(url);
 await page.locator('#barrier').selectOption('hearing');
 await page.locator('#place').selectOption('community');
 await page.locator('#support').selectOption('professional');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#preview')).toContainText('contact the venue or transport provider');
 await expect(page.locator('#preview')).toContainText('pause the risky part');
 await expect(page.locator('#preview')).toContainText('no');
 await expect(page.locator('#preview')).not.toContainText('guaranteed');
});

test('missing and partial choices cannot generate a completed plan',async({page})=>{
 await page.goto(url);
 await expect(page.getByRole('button',{name:'Print reviewed plan'})).toBeDisabled();
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#reviewed')).toBeHidden();
 expect(await page.locator('#barrier').evaluate(el=>el.validity.valueMissing)).toBe(true);
 await page.locator('#barrier').selectOption('movement');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#reviewed')).toBeHidden();
 expect(await page.locator('#place').evaluate(el=>el.validity.valueMissing)).toBe(true);
});

test('changes invalidate old plan; cancel clear preserves; confirm clear resets',async({page})=>{
 await page.goto(url);
 await page.locator('#barrier').selectOption('vision');
 await page.locator('#place').selectOption('appointment');
 await page.locator('#support').selectOption('ask');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#reviewed')).toBeVisible();
 await page.locator('#place').selectOption('home');
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.getByRole('button',{name:'Print reviewed plan'})).toBeDisabled();
 await page.getByRole('button',{name:'Review my access plan'}).click();
 page.once('dialog',dialog=>dialog.dismiss());
 await page.getByRole('button',{name:'Clear choices'}).click();
 await expect(page.locator('#barrier')).toHaveValue('vision');
 await expect(page.locator('#reviewed')).toBeVisible();
 page.once('dialog',dialog=>dialog.accept());
 await page.getByRole('button',{name:'Clear choices'}).click();
 await expect(page.locator('#barrier')).toHaveValue('');
 await expect(page.locator('#place')).toHaveValue('');
 await expect(page.locator('#support')).toHaveValue('');
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.getByRole('button',{name:'Print reviewed plan'})).toBeDisabled();
});

test('print can be requested only after review',async({page})=>{
 await page.goto(url);
 await page.evaluate(()=>{window.__printCount=0;window.print=()=>window.__printCount++;});
 await expect(page.locator('#printPlan')).toBeDisabled();
 await page.locator('#barrier').selectOption('movement');
 await page.locator('#place').selectOption('home');
 await page.locator('#support').selectOption('ask');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await page.locator('#printPlan').click();
 expect(await page.evaluate(()=>window.__printCount)).toBe(1);
});

test('fictional scenario has blank, appropriate, unsafe and reset feedback',async({page})=>{
 await page.goto(url);
 await page.locator('#checkAnswer').click();
 await expect(page.locator('#feedback')).toContainText('Choose an answer');
 await page.locator('input[name="answer"][value="b"]').check();
 await page.locator('#checkAnswer').click();
 await expect(page.locator('#feedback')).toContainText('may be unsafe');
 await page.locator('input[name="answer"][value="c"]').check();
 await page.locator('#checkAnswer').click();
 await expect(page.locator('#feedback')).toContainText('Do not remove');
 await page.locator('input[name="answer"][value="a"]').check();
 await page.locator('#checkAnswer').click();
 await expect(page.locator('#feedback')).toContainText('Best first step');
 await page.locator('#resetAnswer').click();
 await expect(page.locator('input[name="answer"]:checked')).toHaveCount(0);
 await expect(page.locator('#feedback')).toContainText('Choice cleared');
});

test('keyboard access and accessible structure',async({page})=>{
 await page.goto(url);
 await page.getByRole('link',{name:'Skip to the Everyday Access Check'}).focus();
 await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/#main$/);
 await page.locator('#barrier').focus();
 await page.keyboard.press('m');
 await page.keyboard.press('Tab');
 await expect(page.locator('#place')).toBeFocused();
 await expect(page.getByRole('status')).toHaveCount(2);
 await expect(page.getByRole('group',{name:'What is the best first action?'})).toBeVisible();
 await expect(page.locator('details summary')).toBeVisible();
});

test('all lessons, safety boundaries and paper worksheet remain available with JavaScript disabled',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto(url);
  await expect(page.locator('article.lesson')).toHaveCount(5);
  await expect(page.getByRole('heading',{name:'Paper or offline worksheet'})).toBeVisible();
  await expect(page.getByText('The interactive planner is unavailable.')).toBeVisible();
  await page.locator('details summary').click();
  await expect(page.getByText('First ask the person and arrange a clear, safe route.')).toBeVisible();
  const m=await page.evaluate(()=>({width:innerWidth,body:document.body.scrollWidth,html:document.documentElement.scrollWidth}));
  expect(Math.max(m.body,m.html)).toBeLessThanOrEqual(m.width+1);
 }finally{await context.close();}
});

test('no tracking, network writes, cross-origin loads or stored visitor state',async({page})=>{
 const writes=[],thirdParty=[];
 page.on('request',req=>{
  if(!['GET','HEAD'].includes(req.method()))writes.push(req.method()+' '+req.url());
  if(!req.url().startsWith('http://127.0.0.1:8765/')&&!req.url().startsWith('data:'))thirdParty.push(req.url());
 });
 await page.goto(url);
 await page.locator('#barrier').selectOption('information');
 await page.locator('#place').selectOption('appointment');
 await page.locator('#support').selectOption('professional');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await page.locator('input[name="answer"][value="a"]').check();
 await page.locator('#checkAnswer').click();
 expect(writes).toEqual([]);
 expect(thirdParty).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage),cookies:document.cookie}))).toEqual({local:[],session:[],cookies:''});
});

test('external evidence and area navigation are explicit and non-invasive',async({page})=>{
 await page.goto(url);
 const resources=page.locator('.source-links a[href^="https://"]');
 await expect(resources).toHaveCount(6);
 for(const a of await resources.all()){
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(a).toContainText('external');
 }
 await expect(page.getByText('UK services only')).toBeVisible();
 await expect(page.locator('header nav a').first()).toHaveAttribute('href','../index.html?area=Aging%20%26%20Accessibility');
 await expect(page.getByRole('link',{name:'Family Handoff Toolkit'})).toHaveAttribute('href','family-handoff.html');
 await expect(page.getByRole('link',{name:'Care Navigation Guide'})).toHaveAttribute('href','care-navigation.html');
});
