const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const url='/one-place/veterans-benefits-preparation.html';
const topics=['disability','health','education','caregiving','survivors','transition','housing','reviews'];

test('Veterans preparation provides eight evidence-based, jurisdiction-labeled pathways',async({page})=>{
 await page.goto(url);
 await expect(page).toHaveTitle(/Veterans Benefits Preparation/);
 await expect(page.locator('.path')).toHaveCount(8);
 await expect(page.locator('.path:visible')).toHaveCount(1);
 await expect(page.locator('#disability')).toBeVisible();
 for(const id of topics){
  await page.locator('[data-select="'+id+'"]').click();
  await expect(page.locator('#'+id)).toBeVisible();
  await expect(page.locator('.path:visible')).toHaveCount(1);
  await expect(page.locator('[data-select="'+id+'"]')).toHaveAttribute('aria-current','page');
  await expect(page.locator('#'+id+' [data-record]')).toHaveCount(3);
  await expect(page.locator('#'+id+' .questions li')).toHaveCount(3);
 }
 await expect(page.locator('#scams-title')).toBeVisible();
 await expect(page.locator('aside.note')).toContainText('Outside the United States');
});
test('plan reflects marked and unmarked examples and invalidates on editing or pathway change',async({page})=>{
 await page.goto(url+'#health');
 await page.locator('#health [data-record]').first().check();
 await page.getByRole('button',{name:'Review my preparation plan'}).click();
 await expect(page.locator('#planText')).toContainText('Pathway: VA health care');
 await expect(page.locator('#planText')).toContainText('Marked located:');
 await expect(page.locator('#planText')).toContainText('To locate or confirm');
 await expect(page.getByRole('button',{name:'Download text copy'})).toBeEnabled();
 await page.locator('#health [data-record]').nth(1).check();
 await expect(page.locator('#planText')).toBeHidden();
 await expect(page.getByRole('button',{name:'Download text copy'})).toBeDisabled();
 await page.getByRole('button',{name:'Review my preparation plan'}).click();
 await page.locator('[data-select="survivors"]').click();
 await expect(page.locator('#survivors')).toBeVisible();
 await expect(page.locator('#planText')).toBeHidden();
 await expect(page.getByRole('button',{name:'Download text copy'})).toBeDisabled();
});
test('clear confirmation protects and then resets all pathways',async({page})=>{
 await page.goto(url);
 await page.locator('#disability [data-record]').first().check();
 await page.getByRole('button',{name:'Review my preparation plan'}).click();
 page.once('dialog',d=>d.dismiss());
 await page.getByRole('button',{name:'Clear all checkmarks and plan'}).click();
 await expect(page.locator('#disability [data-record]').first()).toBeChecked();
 await expect(page.locator('#planText')).toBeVisible();
 page.once('dialog',d=>d.accept());
 await page.getByRole('button',{name:'Clear all checkmarks and plan'}).click();
 await expect(page.locator('[data-record]:checked')).toHaveCount(0);
 await expect(page.locator('#planText')).toBeHidden();
 await expect(page.getByRole('button',{name:'Download text copy'})).toBeDisabled();
});
test('download requires explicit confirmation and exports reviewed text only',async({page})=>{
 await page.goto(url+'#education');
 await page.locator('#education [data-record]').first().check();
 await page.getByRole('button',{name:'Review my preparation plan'}).click();
 page.once('dialog',d=>d.dismiss());
 await page.getByRole('button',{name:'Download text copy'}).click();
 await expect(page.getByRole('status')).toContainText('canceled');
 page.once('dialog',d=>d.accept());
 const event=page.waitForEvent('download');
 await page.getByRole('button',{name:'Download text copy'}).click();
 const download=await event;
 expect(download.suggestedFilename()).toBe('one-place-veterans-benefits-preparation.txt');
 const text=fs.readFileSync(await download.path(),'utf8');
 expect(text).toContain('Pathway: Education & training');
 expect(text).toContain('VA education eligibility');
 expect(text).not.toContain('undefined');
});
test('no JavaScript still exposes every topic and official source without dead actions',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:720}});
 try{
  const page=await context.newPage();
  await page.goto(url);
  await expect(page.locator('.path:visible')).toHaveCount(8);
  await expect(page.locator('noscript')).toContainText('JavaScript is off');
  await expect(page.getByRole('button',{name:'Review my preparation plan'})).toBeDisabled();
  await expect(page.locator('#reviews')).toContainText('decision letter');
  const dims=await page.evaluate(()=>({body:document.body.scrollWidth,doc:document.documentElement.scrollWidth,win:innerWidth}));
  expect(Math.max(dims.body,dims.doc)).toBeLessThanOrEqual(dims.win+1);
 }finally{await context.close()}
});
for(const width of [320,390,1366,1920]){
 test('reflows without horizontal overflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:800});
  await page.goto(url);
  await page.locator('[data-select="reviews"]').click();
  await page.getByRole('button',{name:'Review my preparation plan'}).click();
  const d=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,body:document.body.scrollWidth,win:innerWidth}));
  expect(Math.max(d.doc,d.body)).toBeLessThanOrEqual(d.win+1);
 });
}
test('320px with 200 percent root text is keyboard operable and has no horizontal overflow',async({page})=>{
 await page.setViewportSize({width:320,height:750});
 await page.goto(url);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const link=page.locator('[data-select="caregiving"]');
 await link.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#caregiving')).toBeVisible();
 const checkbox=page.locator('#caregiving [data-record]').first();
 await checkbox.focus();await page.keyboard.press('Space');
 await expect(checkbox).toBeChecked();
 await page.getByRole('button',{name:'Review my preparation plan'}).focus();await page.keyboard.press('Enter');
 await expect(page.locator('#planText')).toContainText('Family & caregiver support');
 const d=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,body:document.body.scrollWidth,win:innerWidth}));
 expect(Math.max(d.doc,d.body)).toBeLessThanOrEqual(d.win+1);
});
test('privacy: no persistent browser state, external script, background writes or automatic outbound requests',async({page})=>{
 const outbound=[],writes=[];
 page.on('request',r=>{
  if(!r.url().startsWith('http'))return;
  if(!['127.0.0.1','localhost'].includes(new URL(r.url()).hostname))outbound.push(r.url());
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
 });
 await page.goto(url);
 await page.locator('#disability [data-record]').first().check();
 await page.getByRole('button',{name:'Review my preparation plan'}).click();
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 expect(outbound).toEqual([]);expect(writes).toEqual([]);
 await page.reload();
 await expect(page.locator('[data-record]:checked')).toHaveCount(0);
 await expect(page.locator('#planText')).toBeHidden();
 await expect(page.locator('script[src]')).toHaveCount(0);
});
test('official external links are marked and isolated; no fake eligibility score',async({page})=>{
 await page.goto(url);
 const links=page.locator('a[href^="https://"]');
 expect(await links.count()).toBeGreaterThan(15);
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(link).toContainText('(external)');
  const href=await link.getAttribute('href');
  expect(/^https:\/\/(www\.)?(va\.gov|caregiver\.va\.gov|dol\.gov)\//.test(href)).toBe(true);
 }
 await expect(page.locator('body')).toContainText('cannot confirm approval');
 await expect(page.locator('body')).toContainText('No automated eligibility score');
});
