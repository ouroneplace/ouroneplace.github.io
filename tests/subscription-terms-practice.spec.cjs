const {test,expect}=require('@playwright/test');
const URL='/one-place/subscription-terms-practice.html';
const answer={trial:'start',addon:'extras',promo:'renew',cancel:'exit'};
const cases=Object.keys(answer),values=['start','extras','renew','exit'];
const choice=(p,id)=>p.locator('#question-'+id);
const review=(p)=>p.getByRole('button',{name:'Review four fictional choices'});
async function allCorrect(page){for(const id of cases)await choice(page,id).selectOption(answer[id]);}

test('Subscription Terms: independent teaching, four cases and full static model answers',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(URL);
 await expect(page.getByRole('heading',{name:'Before You Agree: Subscription Terms Practice',level:1})).toBeVisible();
 await expect(page.locator('.case')).toHaveCount(4);
 await expect(page.locator('.case details')).toHaveCount(4);
 await expect(page.locator('#practice')).toBeVisible();
 await expect(page.locator('#practice select')).toHaveCount(4);
 for(const id of cases){
  const section=page.locator('#'+id);
  await expect(section.locator('.teaching')).toBeVisible();
  await expect(section.getByText('WHY:',{exact:false})).toBeVisible();
  await expect(section.getByText('STOP:',{exact:false})).toBeVisible();
  await expect(section.locator('summary')).toBeVisible();
  await expect(choice(page,id)).toBeEnabled();
  await expect(choice(page,id).locator('option')).toHaveCount(5);
 }
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
 expect(errors).toEqual([]);
});

test('Subscription Terms: four correct answers get four WHY and ASK explanations',async({page})=>{
 await page.goto(URL);await allCorrect(page);await review(page).click();
 await expect(page.locator('#review')).toBeVisible();
 await expect(page.locator('#summary')).toContainText('4 of 4');
 await expect(page.locator('#explanations li')).toHaveCount(4);
 for(const li of await page.locator('#explanations li').all()){
  await expect(li).toContainText('Matches the model.');
  await expect(li).toContainText('WHY:');
  await expect(li).toContainText('ASK:');
 }
});

test('Subscription Terms: every one of 16 case-choice combinations explains the choice',async({page})=>{
 await page.goto(URL);await allCorrect(page);
 for(const id of cases){
  for(const value of values){
   await choice(page,id).selectOption(value);
   await review(page).click();
   const ok=value===answer[id];
   await expect(page.locator('#summary')).toContainText(ok?'4 of 4':'3 of 4');
   const result=page.locator('#explanations li').nth(cases.indexOf(id));
   await expect(result).toContainText(ok?'Matches the model.':'Recheck this offer.');
   await expect(result).toContainText('Model:');
   await expect(result).toContainText('ASK:');
  }
  await choice(page,id).selectOption(answer[id]);
 }
});

test('Subscription Terms: blank form focuses first missing and has no stale review',async({page})=>{
 await page.goto(URL);await review(page).click();
 await expect(page.locator('#review')).toBeHidden();
 await expect(page.locator('#status')).toContainText('all four fictional offers');
 await expect(choice(page,'trial')).toBeFocused();
 await choice(page,'trial').selectOption('start');
 await choice(page,'addon').selectOption('extras');
 await review(page).click();
 await expect(choice(page,'promo')).toBeFocused();
 await expect(page.locator('#explanations li')).toHaveCount(0);
});

test('Subscription Terms: edits invalidate old reviewed results',async({page})=>{
 await page.goto(URL);await allCorrect(page);await review(page).click();
 await expect(page.locator('#summary')).toContainText('4 of 4');
 await choice(page,'promo').selectOption('start');
 await expect(page.locator('#review')).toBeHidden();
 await expect(page.locator('#explanations li')).toHaveCount(0);
 await expect(page.locator('#status')).toContainText('Choice changed');
 await review(page).click();
 await expect(page.locator('#summary')).toContainText('3 of 4');
});

test('Subscription Terms: reset clears choices, stale output, and restores focus',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(URL);
 expect(await page.evaluate(()=>typeof document.getElementById('practice').reset)).toBe('function');
 await allCorrect(page);await review(page).click();
 await page.getByRole('button',{name:'Reset fictional practice'}).click();
 await expect(page.locator('#review')).toBeHidden();
 await expect(page.locator('#explanations li')).toHaveCount(0);
 await expect(page.locator('#status')).toContainText('practice reset');
 for(const id of cases)await expect(choice(page,id)).toHaveValue('');
 await expect(choice(page,'trial')).toBeFocused();
 expect(errors).toEqual([]);
});

for(const width of [320,390,1366,1920]){
 test('Subscription Terms: full page and practice reflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:844});await page.goto(URL);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.case')).toHaveCount(4);
  await expect(page.locator('#practice')).toBeVisible();
  const d=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(d.document,d.body),JSON.stringify(d)).toBeLessThanOrEqual(width+1);
  await allCorrect(page);await review(page).click();
  await expect(page.locator('#summary')).toContainText('4 of 4');
 });
}

for(const width of [320,390]){
 test('Subscription Terms: 200%-root text has no horizontal overflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:844});await page.goto(URL);
  await page.addStyleTag({content:'html{font-size:200%!important}'});
  const d=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(d.document,d.body),JSON.stringify(d)).toBeLessThanOrEqual(width+1);
  await expect(page.locator('.case')).toHaveCount(4);
  await expect(choice(page,'cancel')).toBeVisible();
 });
}

for(const width of [320,1366]){
 test('Subscription Terms: no-script lessons and models remain accessible at '+width+'px',async({browser})=>{
  const context=await browser.newContext({baseURL:'http://127.0.0.1:8765',javaScriptEnabled:false,viewport:{width,height:844}});
  try{
   const page=await context.newPage();await page.goto(URL);
   await expect(page.getByRole('heading',{name:'Before You Agree: Subscription Terms Practice',level:1})).toBeVisible();
   await expect(page.locator('.case')).toHaveCount(4);
   await expect(page.locator('#practice:visible')).toHaveCount(0);
   await expect(page.locator('noscript p.notice')).toContainText('optional classification form is unavailable');
   for(const id of cases){
    await expect(page.locator('#'+id+' .teaching')).toBeVisible();
    await page.locator('#'+id+' summary').click();
    await expect(page.locator('#'+id+' details p')).toBeVisible();
   }
   const d=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(d.document,d.body),JSON.stringify(d)).toBeLessThanOrEqual(width+1);
  }finally{await context.close();}
 });
}

test('Subscription Terms: keyboard skip and native interactive details and selects work',async({page})=>{
 await page.setViewportSize({width:320,height:844});await page.goto(URL);
 await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Skip to subscription terms lesson'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
 await page.keyboard.press('Tab');await expect(page.locator('#trial summary')).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#trial details')).toHaveAttribute('open','');
 await choice(page,'trial').focus();await page.keyboard.press('ArrowDown');
 expect(await choice(page,'trial').inputValue()).not.toBe('');
});

test('Subscription Terms: original U.S. government sources are opt-in and navigation is correct',async({page})=>{
 await page.goto(URL);const sources=page.locator('.sources a');
 await expect(sources).toHaveCount(4);
 for(const link of await sources.all()){
  expect(await link.getAttribute('href')).toMatch(/^https:\/\/(consumer\.ftc\.gov|www\.usa\.gov)\//);
  await expect(link).toHaveAttribute('target','_blank');
  expect(await link.getAttribute('rel')).toMatch(/noopener/);
 }
 await expect(page.locator('header nav a').first()).toHaveAttribute('href','../index.html?area=Legal%20%26%20Consumer%20Rights');
 await expect(page.locator('header nav a').nth(1)).toHaveAttribute('href','../index.html');
});

test('Subscription Terms: no accounts, names, browser storage, or first-party writes',async({page})=>{
 const errors=[],external=[],writes=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',request=>{
  if(!request.url().startsWith('http://127.0.0.1:8765/'))external.push(request.url());
  if(['POST','PUT','PATCH','DELETE'].includes(request.method()))writes.push(request.url());
 });
 await page.goto(URL);await allCorrect(page);await review(page).click();
 const state=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length,cookie:document.cookie,textInputs:document.querySelectorAll('input,textarea').length,action:document.querySelector('#practice').getAttribute('action')}));
 expect(state).toEqual({local:0,session:0,cookie:'',textInputs:0,action:null});
 expect(external).toEqual([]);expect(writes).toEqual([]);expect(errors).toEqual([]);
});
