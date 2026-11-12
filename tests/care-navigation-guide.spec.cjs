const {test,expect}=require('@playwright/test');

for(const width of [320,390,1366,1920]){
 test('Care Navigation Guide renders four distinct paths without overflow at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:840});
  await page.goto('/one-place/care-navigation.html');
  await expect(page.getByRole('heading',{name:'Care Navigation Guide',level:1})).toBeVisible();
  await expect(page.locator('section.path')).toHaveCount(4);
  await expect(page.getByRole('checkbox')).toHaveCount(12);
  const jumps=page.getByRole('navigation',{name:'Choose a care situation'}).getByRole('link');
  await expect(jumps).toHaveCount(4);
  for(const [i,id] of ['visit','home','results','access'].entries()){
   await jumps.nth(i).click();
   await expect(page).toHaveURL(new RegExp('#'+id+'$'));
   await expect(page.locator('#'+id)).toBeVisible();
   const sizes=await page.evaluate(()=>({inner:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(sizes.html,sizes.body),'reflow at '+width+': '+JSON.stringify(sizes)).toBeLessThanOrEqual(sizes.inner+1);
  }
  expect(errors).toEqual([]);
 });
}

test('Care Navigation Guide fits 320px with enlarged root text',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/care-navigation.html#home');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const sizes=await page.evaluate(()=>({inner:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(sizes.html,sizes.body),'200 percent '+JSON.stringify(sizes)).toBeLessThanOrEqual(sizes.inner+1);
 await expect(page.getByRole('heading',{name:'Coming home after a hospital stay'})).toBeVisible();
});

test('Care Navigation checkboxes are optional, focusable, and work from keyboard',async({page})=>{
 await page.goto('/one-place/care-navigation.html#visit');
 const checks=page.locator('#visit input[type="checkbox"]');
 await expect(checks).toHaveCount(3);
 await expect(checks.first()).not.toBeChecked();
 await checks.first().focus();await page.keyboard.press('Space');
 await expect(checks.first()).toBeChecked();
 await page.keyboard.press('Space');
 await expect(checks.first()).not.toBeChecked();
});

test('Care Navigation guide remains usable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto('/one-place/care-navigation.html');
  await expect(page.locator('section.path')).toHaveCount(4);
  await page.getByRole('navigation',{name:'Choose a care situation'}).getByRole('link').nth(1).click();
  await expect(page).toHaveURL(/#home$/);
  await page.locator('#home input[type="checkbox"]').first().check();
  await expect(page.locator('#home input[type="checkbox"]').first()).toBeChecked();
 }finally{await context.close();}
});

test('Care Navigation guide neither stores private data nor sends background requests',async({page})=>{
 const thirdParty=[],writes=[];
 page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
  if(!['127.0.0.1','localhost'].includes(new URL(r.url()).hostname))thirdParty.push(r.url());
 });
 await page.goto('/one-place/care-navigation.html');
 await page.getByRole('checkbox').first().check();
 expect(writes).toEqual([]);
 expect(thirdParty).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
});

test('Care Navigation guide connects Health Center, approved Studio, and family handoff',async({page})=>{
 await page.goto('/one-place/health-wellness.html#visit');
 await page.getByRole('link',{name:'Open the Care Navigation Guide'}).click();
 await expect(page).toHaveURL(/\/one-place\/care-navigation\.html$/);
 await page.locator('#visit').getByRole('link',{name:'Appointment Preparation Studio'}).click();
 await expect(page).toHaveURL(/\/one-place\/health-wellness\.html#plan$/);
 await expect(page.getByRole('button',{name:'Review my appointment notes'})).toBeVisible();
 await page.goto('/one-place/care-navigation.html');
 await page.getByRole('link',{name:'Family Handoff Toolkit'}).last().click();
 await expect(page).toHaveURL(/\/one-place\/family-handoff\.html$/);
});

test('Care Navigation guide preserves official links and honest scope boundaries',async({page})=>{
 await page.goto('/one-place/care-navigation.html');
 await expect(page.getByText('Respect the person:')).toBeVisible();
 await expect(page.getByText(/Local service availability and rules differ worldwide/)).toBeVisible();
 const links=page.locator('a[href^="https://"]');
 await expect(links).toHaveCount(4);
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(link).toContainText('(external)');
 }
});
