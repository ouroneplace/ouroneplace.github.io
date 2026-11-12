const {test,expect}=require('@playwright/test');

for(const width of [320,390,1366,1920]){
 test('Health Costs Lab shows four lessons without overflow at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:840});
  await page.goto('/one-place/health-costs-lab.html');
  await expect(page.getByRole('heading',{name:'Health Costs Practice Lab',level:1})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(4);
  await expect(page.locator('form.practice')).toHaveCount(4);
  await expect(page.locator('form.practice button[type="submit"]:enabled')).toHaveCount(4);
  const jumps=page.getByRole('navigation',{name:'Jump to a lesson'}).getByRole('link');
  await expect(jumps).toHaveCount(4);
  for(const id of ['eob','match','terms','questions']){
   await page.getByRole('navigation',{name:'Jump to a lesson'}).getByRole('link',{name:new RegExp('#'===id?'':id==='eob'?'Know the document':id==='match'?'Compare a bill':id==='terms'?'cost-sharing':'unexpected charge','i')}).click();
   await expect(page).toHaveURL(new RegExp('#'+id+'$'));
   await expect(page.locator('#'+id)).toBeVisible();
   expect(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)<=innerWidth+1)).toBe(true);
  }
  expect(errors).toEqual([]);
 });
}

for(const id of ['eob','match','terms','questions']){
 test('Health Costs Lab '+id+' explains blank, wrong, correct and reset',async({page})=>{
  await page.goto('/one-place/health-costs-lab.html#'+id);
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

test('Health Costs Lab supports keyboard and 200 percent text at 320px',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/health-costs-lab.html#eob');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const form=page.locator('form.practice[data-lesson="eob"]');
 await form.getByRole('radio').nth(1).focus();
 await page.keyboard.press('Space');
 await expect(form.getByRole('radio').nth(1)).toBeChecked();
 await form.getByRole('button',{name:'Check my choice'}).focus();
 await page.keyboard.press('Enter');
 await expect(form.locator('.feedback')).toContainText('Good reasoning.');
 const dims=await page.evaluate(()=>({inner:innerWidth,scroll:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(dims.scroll,dims.body),'200% reflow '+JSON.stringify(dims)).toBeLessThanOrEqual(dims.inner+1);
});

test('Health Costs Lab stays readable and prevents submissions with JavaScript disabled',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto('/one-place/health-costs-lab.html');
  await expect(page.locator('section.lesson')).toHaveCount(4);
  await expect(page.locator('noscript p')).toContainText('Teaching and official links remain available');
  await expect(page.locator('form.practice button[type="submit"]:disabled')).toHaveCount(4);
  await expect(page.getByRole('link',{name:/CMS: how to read an EOB/})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }finally{await context.close();}
});

test('Health Costs Lab has no answer persistence or outbound requests',async({page})=>{
 const thirdParty=[],writes=[];
 page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
  if(!['127.0.0.1','localhost'].includes(new URL(r.url()).hostname))thirdParty.push(r.url());
 });
 await page.goto('/one-place/health-costs-lab.html');
 const form=page.locator('form.practice').last();
 await form.getByRole('radio').nth(1).check();
 await form.getByRole('button',{name:'Check my choice'}).click();
 expect(writes).toEqual([]);expect(thirdParty).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await page.reload();
 await expect(page.locator('form.practice .feedback').last()).toBeEmpty();
});

test('Health Costs Lab links from Health & Wellness and returns to approved Studio',async({page})=>{
 await page.goto('/one-place/health-wellness.html#coverage');
 await page.getByRole('link',{name:'Open the free Health Costs Practice Lab'}).click();
 await expect(page).toHaveURL(/\/one-place\/health-costs-lab\.html$/);
 await page.getByRole('link',{name:'Appointment Preparation Studio'}).click();
 await expect(page).toHaveURL(/\/one-place\/health-wellness\.html#plan$/);
 await expect(page.getByRole('button',{name:'Review my appointment notes'})).toBeVisible();
 await expect(page.locator('#downloadVisit')).toBeDisabled();
});

test('Health Costs Lab cites four official linked sources safely',async({page})=>{
 await page.goto('/one-place/health-costs-lab.html');
 const links=page.locator('a[href^="https://"]');
 await expect(links).toHaveCount(4);
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(link).toContainText('(external)');
 }
});