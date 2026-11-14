const {test,expect}=require('@playwright/test');
const url='/one-place/preventive-care-conversation.html';
const lessonIds=['needs','records','tradeoffs','access'];
const answers=['b','c','a','b'];

for(const width of [320,390,1366,1920]){
 test('preventive care guide has four complete skills and reflows at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:840});
  await page.goto(url);
  await expect(page).toHaveTitle(/Preventive Care Conversation Practice/);
  await expect(page.getByRole('heading',{name:'Preventive Care Conversation Practice',level:1})).toBeVisible();
  await expect(page.locator('article.lesson')).toHaveCount(4);
  await expect(page.locator('form.practice')).toHaveCount(4);
  for(const id of lessonIds){
   await expect(page.locator('#'+id+' dl dt')).toHaveCount(4);
   await expect(page.locator('#'+id+' .feedback')).toHaveAttribute('role','status');
   await expect(page.locator('#'+id+' details summary')).toBeVisible();
   await expect(page.locator('#'+id+' button[type=submit]')).toBeEnabled();
  }
  const dims=await page.evaluate(()=>({width:innerWidth,body:document.body.scrollWidth,html:document.documentElement.scrollWidth}));
  expect(Math.max(dims.body,dims.html),JSON.stringify(dims)).toBeLessThanOrEqual(dims.width+1);
  expect(errors).toEqual([]);
 });
}

test('all four fictional cases give grounded safer and unsafe feedback without a score',async({page})=>{
 await page.goto(url);
 for(let i=0;i<lessonIds.length;i++){
  const form=page.locator('#'+lessonIds[i]+' form.practice');
  await form.locator('button[type=submit]').click();
  await expect(form.locator('.feedback')).toContainText('Choose an answer first');
  const answer=answers[i];
  await form.locator('input[value="'+answer+'"]').check();
  await form.locator('button[type=submit]').click();
  await expect(form.locator('.feedback')).toContainText('Good question to ask.');
  const unsafe=['a','a','b','a'][i];
  await form.locator('input[value="'+unsafe+'"]').check();
  await expect(form.locator('.feedback')).toHaveText('Choice changed. Check my reasoning for updated feedback.');
  await form.locator('button[type=submit]').click();
  await expect(form.locator('.feedback')).toContainText('Try a safer first step.');
  await form.locator('button[type=reset]').click();
  await expect(form.locator('input:checked')).toHaveCount(0);
  await expect(form.locator('.feedback')).toHaveText('Choose a response, then check the reasoning.');
 }
});

for(const width of [320,1366]){
 test('changing a checked answer immediately invalidates favorable feedback at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:850});
  await page.goto(url);
  const form=page.locator('#needs form.practice');
  await form.locator('input[value=b]').check();
  await form.locator('button[type=submit]').click();
  await expect(form.locator('.feedback')).toContainText('Good question to ask.');
  await form.locator('input[value=a]').check();
  await expect(form.locator('.feedback')).not.toContainText('Good question to ask.');
  await expect(form.locator('.feedback')).toContainText('Choice changed.');
  await form.locator('button[type=submit]').click();
  await expect(form.locator('.feedback')).toContainText('Try a safer first step.');
  await form.locator('input[value=c]').check();
  await expect(form.locator('.feedback')).toHaveText('Choice changed. Check my reasoning for updated feedback.');
 });
}

test('official links have clear provenance and no implicit opening',async({page})=>{
 const external=[];
 page.on('request',request=>{
  if(!request.url().startsWith('http://127.0.0.1:8765/')&&!request.url().startsWith('data:'))external.push(request.url());
 });
 await page.goto(url);
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
 await expect(page.locator('#sources a[href^="https://"]')).toHaveCount(4);
 for(const a of await page.locator('#sources a[href^="https://"]').all()){
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toHaveAttribute('rel',/noopener/);
  await expect(a).toContainText('external');
 }
 expect(external).toEqual([]);
});

test('private fictional answers do not write to storage, POST, or load trackers',async({page})=>{
 const writes=[],external=[];
 page.on('request',req=>{
  if(!['GET','HEAD'].includes(req.method()))writes.push(req.method()+' '+req.url());
  if(!req.url().startsWith('http://127.0.0.1:8765/')&&!req.url().startsWith('data:'))external.push(req.url());
 });
 await page.goto(url);
 const form=page.locator('#records form.practice');
 await form.locator('input[value=c]').check();
 await form.locator('button[type=submit]').click();
 await form.locator('button[type=reset]').click();
 expect(writes).toEqual([]);
 expect(external).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage),cookies:document.cookie}))).toEqual({local:[],session:[],cookies:''});
});

test('with JavaScript off the lessons, no-device worksheet, explanations and official links remain available',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto(url);
  await expect(page.locator('article.lesson')).toHaveCount(4);
  await expect(page.locator('form.practice button[type=submit]:disabled')).toHaveCount(4);
  await expect(page.getByRole('heading',{name:'Paper / no-device conversation prompt'})).toBeVisible();
  await expect(page.locator('#sources a[href^="https://"]')).toHaveCount(4);
  const reveal=page.locator('#needs details');
  await reveal.locator('summary').click();
  await expect(reveal.getByText('A qualified clinician can help interpret current screening')).toBeVisible();
  await page.emulateMedia({media:'print'});
  await expect(page.locator('#needs')).toBeVisible();
  await expect(page.locator('#paper')).toBeVisible();
  await expect(page.locator('#sources')).toBeVisible();
  const dims=await page.evaluate(()=>({width:innerWidth,body:document.body.scrollWidth,html:document.documentElement.scrollWidth}));
  expect(Math.max(dims.body,dims.html)).toBeLessThanOrEqual(dims.width+1);
 }finally{await context.close();}
});

for(const width of [320,1366]){
 test('Home, Health hub, and existing Studio are reachable at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:840});
  await page.goto(url);
  await page.getByRole('link',{name:'Health & Wellness',exact:true}).first().click();
  await expect(page).toHaveURL(/health-wellness\.html$/);
  await page.goto(url);
  await page.getByRole('link',{name:'Appointment Preparation Studio'}).click();
  await expect(page).toHaveURL(/health-wellness\.html#plan$/);
  await page.goto(url);
  await page.getByRole('link',{name:'One Place home'}).first().click();
  await expect(page).toHaveURL(/\/index\.html$/);
 });
}

test('skip link moves keyboard focus to main content',async({page})=>{
 await page.goto(url);
 await page.keyboard.press('Tab');
 await expect(page.locator('.skip')).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.locator('#main')).toBeFocused();
});
