const {test,expect}=require('@playwright/test');
const URL='/one-place/military-family-move-handoff.html';
const answer={travel:'relocation',school:'liaison',coverage:'tricare',support:'efmp'};
const cases=Object.keys(answer),options=['relocation','liaison','tricare','efmp'];
const pick=(page,id)=>page.locator('#answer-'+id);
const submit=page=>page.getByRole('button',{name:'Review all four fictional choices'});
async function selectModels(page){for(const id of cases)await pick(page,id).selectOption(answer[id]);}

test('Military Move: four distinct case guides and native static model answers',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(URL);
 await expect(page.getByRole('heading',{name:'Military Family Move Handoff Practice',level:1})).toBeVisible();
 await expect(page.locator('.case')).toHaveCount(4);
 await expect(page.locator('.case details')).toHaveCount(4);
 await expect(page.locator('#practice')).toBeVisible();
 await expect(page.locator('#practice select')).toHaveCount(4);
 for(const id of cases){
  const item=page.locator('#'+id);
  await expect(item.locator('.coach')).toBeVisible();
  await expect(item.getByText('WHY:',{exact:false})).toBeVisible();
  await expect(item.getByText('WHEN TO STOP:',{exact:false})).toBeVisible();
  await expect(item.locator('summary')).toBeVisible();
  await expect(pick(page,id)).toBeEnabled();
  await expect(pick(page,id).locator('option')).toHaveCount(5);
 }
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow');
 expect(errors).toEqual([]);
});

test('Military Move: four model classifications produce four clear WHY and ASK explanations',async({page})=>{
 await page.goto(URL);await selectModels(page);await submit(page).click();
 await expect(page.locator('#review')).toBeVisible();
 await expect(page.locator('#summary')).toContainText('4 of 4');
 await expect(page.locator('#reasons li')).toHaveCount(4);
 for(const item of await page.locator('#reasons li').all()){
  await expect(item).toContainText('Matches the model.');
  await expect(item).toContainText('WHY:');
  await expect(item).toContainText('ASK:');
 }
 await expect(page.locator('#status')).toContainText('Four fictional situations reviewed');
});

test('Military Move: all 16 scenario/contact combinations explain every answer',async({page})=>{
 await page.goto(URL);await selectModels(page);
 for(const id of cases){
  for(const value of options){
   await pick(page,id).selectOption(value);await submit(page).click();
   const right=answer[id]===value;
   await expect(page.locator('#summary')).toContainText(right?'4 of 4':'3 of 4');
   const item=page.locator('#reasons li').nth(cases.indexOf(id));
   await expect(item).toContainText(right?'Matches the model.':'Try another starting contact.');
   await expect(item).toContainText('Model:');
   await expect(item).toContainText('ASK:');
  }
  await pick(page,id).selectOption(answer[id]);
 }
});

test('Military Move: missing choices prevent stale review and focus first missing field',async({page})=>{
 await page.goto(URL);
 await submit(page).click();
 await expect(page.locator('#review')).toBeHidden();
 await expect(page.locator('#status')).toContainText('all four fictional situations');
 await expect(pick(page,'travel')).toBeFocused();
 await pick(page,'travel').selectOption('relocation');
 await pick(page,'school').selectOption('liaison');
 await submit(page).click();
 await expect(pick(page,'coverage')).toBeFocused();
 await expect(page.locator('#reasons li')).toHaveCount(0);
});

test('Military Move: changed answer immediately invalidates reviewed feedback',async({page})=>{
 await page.goto(URL);await selectModels(page);await submit(page).click();
 await expect(page.locator('#summary')).toContainText('4 of 4');
 await pick(page,'coverage').selectOption('liaison');
 await expect(page.locator('#review')).toBeHidden();
 await expect(page.locator('#reasons li')).toHaveCount(0);
 await expect(page.locator('#status')).toContainText('choice changed');
 await submit(page).click();
 await expect(page.locator('#summary')).toContainText('3 of 4');
});

test('Military Move: reset fully clears all fictional choices and stale feedback',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(URL);
 expect(await page.evaluate(()=>typeof document.getElementById('practice').reset)).toBe('function');
 await selectModels(page);await submit(page).click();
 await page.getByRole('button',{name:'Reset fictional practice'}).click();
 await expect(page.locator('#review')).toBeHidden();
 await expect(page.locator('#reasons li')).toHaveCount(0);
 await expect(page.locator('#status')).toContainText('practice reset');
 for(const id of cases)await expect(pick(page,id)).toHaveValue('');
 await expect(pick(page,'travel')).toBeFocused();
 expect(errors).toEqual([]);
});

for(const width of [320,390,1366,1920]){
 test('Military Move: complete page reflows with practice at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:844});await page.goto(URL);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.case')).toHaveCount(4);
  await expect(page.locator('#practice')).toBeVisible();
  const d=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(d.document,d.body),JSON.stringify(d)).toBeLessThanOrEqual(width+1);
  await selectModels(page);await submit(page).click();
  await expect(page.locator('#summary')).toContainText('4 of 4');
 });
}

for(const width of [320,390]){
 test('Military Move: 200%-root text remains readable at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:844});await page.goto(URL);
  await page.addStyleTag({content:'html{font-size:200%!important}'});
  const d=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(d.document,d.body),JSON.stringify(d)).toBeLessThanOrEqual(width+1);
  await expect(page.locator('.case')).toHaveCount(4);
  await expect(pick(page,'support')).toBeVisible();
 });
}

for(const width of [320,1366]){
 test('Military Move: script-disabled readers retain all four complete guides at '+width+'px',async({browser})=>{
  const context=await browser.newContext({baseURL:'http://127.0.0.1:8765',javaScriptEnabled:false,viewport:{width,height:844}});
  try{
   const page=await context.newPage();await page.goto(URL);
   await expect(page.getByRole('heading',{name:'Military Family Move Handoff Practice',level:1})).toBeVisible();
   await expect(page.locator('.case')).toHaveCount(4);
   await expect(page.locator('#practice:visible')).toHaveCount(0);
   await expect(page.locator('noscript p.alert')).toContainText('optional fictional choice form is disabled');
   for(const id of cases){
    await expect(page.locator('#'+id+' .coach')).toBeVisible();
    await page.locator('#'+id+' summary').click();
    await expect(page.locator('#'+id+' details p')).toBeVisible();
   }
   const d=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(d.document,d.body),JSON.stringify(d)).toBeLessThanOrEqual(width+1);
  }finally{await context.close();}
 });
}

test('Military Move: keyboard skip link and accessible native form controls',async({page})=>{
 await page.setViewportSize({width:320,height:844});await page.goto(URL);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to military family move lesson'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
 await page.keyboard.press('Tab');await expect(page.locator('#travel summary')).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#travel details')).toHaveAttribute('open','');
 await pick(page,'travel').focus();
 await page.keyboard.press('ArrowDown');
 expect(await pick(page,'travel').inputValue()).not.toBe('');
});

test('Military Move: official original-source links are deliberate and direct',async({page})=>{
 await page.goto(URL);
 const links=page.locator('.source-links a');await expect(links).toHaveCount(5);
 for(const link of await links.all()){
  const href=await link.getAttribute('href');
  expect(href).toMatch(/^https:\/\/(www\.)?(militaryonesource\.mil|tricare\.mil)\//);
  await expect(link).toHaveAttribute('target','_blank');
  expect(await link.getAttribute('rel')).toMatch(/noopener/);
 }
 await expect(page.locator('header nav a').first()).toHaveAttribute('href','../index.html?area=Veterans%20%26%20Military%20Families');
 await expect(page.locator('header nav a').nth(1)).toHaveAttribute('href','../index.html');
});

test('Military Move: no private inputs, persistence, browser writes or automatic offsite calls',async({page})=>{
 const errors=[],external=[],writes=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{
  if(!r.url().startsWith('http://127.0.0.1:8765/'))external.push(r.url());
  if(['POST','PUT','PATCH','DELETE'].includes(r.method()))writes.push(r.url());
 });
 await page.goto(URL);await selectModels(page);await submit(page).click();
 const state=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length,cookie:document.cookie,textInputs:document.querySelectorAll('input,textarea').length,action:document.querySelector('#practice').getAttribute('action')}));
 expect(state).toEqual({local:0,session:0,cookie:'',textInputs:0,action:null});
 expect(external).toEqual([]);expect(writes).toEqual([]);expect(errors).toEqual([]);
});
