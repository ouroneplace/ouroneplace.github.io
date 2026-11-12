const {test,expect}=require('@playwright/test');

for(const width of [320,390,1366,1920]){
 test('Health Literacy Lab teaches four real lessons without overflow at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:840});
  await page.goto('/one-place/health-literacy-lab.html');
  await expect(page.getByRole('heading',{name:'Health Literacy Practice Lab',level:1})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(4);
  await expect(page.locator('form.practice')).toHaveCount(4);
  await expect(page.locator('form.practice button[type="submit"]:enabled')).toHaveCount(4);
  const jumps=page.getByRole('navigation',{name:'Jump to a lesson'}).getByRole('link');
  await expect(jumps).toHaveCount(4);
  for(const [i,id] of ['label','medicines','claims','screening'].entries()){
   await jumps.nth(i).click();
   await expect(page).toHaveURL(new RegExp('#'+id+'$'));
   await expect(page.locator('#'+id)).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  expect(errors).toEqual([]);
 });
}
for(const id of ['label','medicines','claims','screening']){
 test('Health Literacy Lab '+id+' explains blank, wrong and right choices',async({page})=>{
  await page.goto('/one-place/health-literacy-lab.html#'+id);
  const form=page.locator('form.practice[data-lesson="'+id+'"]');
  const status=form.locator('.feedback');
  const radios=form.getByRole('radio');
  await expect(radios).toHaveCount(3);
  await form.getByRole('button',{name:'Check my choice'}).click();
  await expect(status).toContainText('Choose one response');
  await expect(radios.first()).toBeFocused();
  const correct=Number(await form.getAttribute('data-correct'));
  await radios.nth((correct+1)%3).check();
  await form.getByRole('button',{name:'Check my choice'}).click();
  await expect(status).toContainText('Keep practicing.');
  await radios.nth(correct).check();
  await expect(status).toBeEmpty();
  await form.getByRole('button',{name:'Check my choice'}).click();
  await expect(status).toContainText('Good reasoning.');
  await form.getByRole('button',{name:'Try again'}).click();
  await expect(status).toBeEmpty();
  await expect(radios.nth(correct)).not.toBeChecked();
 });
}
test('Health Literacy Lab works with keyboard and 200 percent text at 320px',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/health-literacy-lab.html#label');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const form=page.locator('form.practice[data-lesson="label"]');
 const radios=form.getByRole('radio');
 await radios.nth(1).focus();
 await page.keyboard.press('Space');
 await expect(radios.nth(1)).toBeChecked();
 await form.getByRole('button',{name:'Check my choice'}).focus();
 await page.keyboard.press('Enter');
 await expect(form.getByRole('status')).toContainText('Good reasoning.');
 const result=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(result.scroll,result.body),'200% text reflow '+JSON.stringify(result)).toBeLessThanOrEqual(result.width+1);
});
test('Health Literacy Lab educational material remains visible with JavaScript off',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto('/one-place/health-literacy-lab.html');
  await expect(page.getByRole('heading',{name:'Health Literacy Practice Lab'})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(4);
  await expect(page.locator('noscript p')).toContainText('Teaching and official links remain available');
  await expect(page.locator('form.practice button[type="submit"]:disabled')).toHaveCount(4);
  await expect(page.getByRole('link',{name:/FDA Drug Facts label/})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }finally{await context.close();}
});
test('Health Literacy Lab saves no answers and makes no unsolicited third-party requests',async({page})=>{
 const requests=[],thirdParty=[];
 page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))requests.push(r.method()+' '+r.url());
  if(!['127.0.0.1','localhost'].includes(new URL(r.url()).hostname))thirdParty.push(r.url());
 });
 await page.goto('/one-place/health-literacy-lab.html');
 const form=page.locator('form.practice').last();
 await form.getByRole('radio').last().check();
 await form.getByRole('button',{name:'Check my choice'}).click();
 expect(requests).toEqual([]);
 expect(thirdParty).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await page.reload();
 await expect(page.locator('form.practice .feedback').last()).toBeEmpty();
});
test('Health Literacy Lab links from Health Center and returns to accepted Studio',async({page})=>{
 await page.goto('/one-place/health-wellness.html#visit');
 await page.getByRole('link',{name:'Open the free Health Literacy Practice Lab'}).click();
 await expect(page).toHaveURL(/\/one-place\/health-literacy-lab\.html$/);
 await page.getByRole('link',{name:'accepted Appointment Preparation Studio'}).click();
 await expect(page).toHaveURL(/\/one-place\/health-wellness\.html#plan$/);
 await expect(page.getByRole('button',{name:'Review my appointment notes'})).toBeVisible();
 await expect(page.locator('#downloadVisit')).toBeDisabled();
});
test('Health Literacy Lab cites four official sources with safe external links',async({page})=>{
 await page.goto('/one-place/health-literacy-lab.html');
 const links=page.locator('a[href^="https://"]');
 await expect(links).toHaveCount(4);
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(link).toContainText('(external)');
 }
});