const {test,expect}=require('@playwright/test');
const url='/one-place/tiny-creative-work.html';
const sample={title:'Quiet Window',one:'I noticed a leaf in the light.',two:'The shadow held a quiet pause.',three:'I can begin again with one small thing.'};
async function write(page,work=sample){
 await page.locator('#work-title').fill(work.title);
 await page.locator('#line-one').fill(work.one);
 await page.locator('#line-two').fill(work.two);
 await page.locator('#line-three').fill(work.three);
}
for(const width of [320,390,1366,1920]){
 test('Tiny Creative Work: intro, lesson, paper fallback and reflow at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:850});await page.goto(url);
  await expect(page.getByRole('heading',{name:'Make, Revise, Keep: A Tiny Creative Work'})).toBeVisible();
  await expect(page.locator('#moves .steps li')).toHaveCount(3);
  await expect(page.locator('textarea')).toHaveCount(3);
  await expect(page.locator('details summary')).toContainText('Read a complete original fictional example');
  const d=await page.evaluate(()=>({v:innerWidth,h:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
  expect(Math.max(d.h,d.b),'overflow '+JSON.stringify(d)).toBeLessThanOrEqual(d.v+1);
  expect((await page.screenshot({fullPage:true})).byteLength).toBeGreaterThan(4500);
  expect(errors).toEqual([]);
 });
}
for(const width of [320,390]){
 test('Tiny Creative Work: 200% text remains readable at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:800});await page.goto(url);
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  await expect(page.locator('#write')).toBeVisible();
  await expect(page.locator('#sources')).toBeVisible();
  const d=await page.evaluate(()=>({v:innerWidth,h:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
  expect(Math.max(d.h,d.b),'zoom overflow '+JSON.stringify(d)).toBeLessThanOrEqual(d.v+1);
  expect((await page.screenshot({fullPage:true})).byteLength).toBeGreaterThan(4500);
 });
}
test('Tiny Creative Work: missing line preserves all writing and focuses missing field',async({page})=>{
 await page.goto(url);await page.locator('#line-one').fill(sample.one);
 await page.getByRole('button',{name:'Review my work'}).click();
 await expect(page.locator('#editor-status')).toContainText('Write all three short lines');
 await expect(page.locator('#line-two')).toBeFocused();
 await expect(page.locator('#line-one')).toHaveValue(sample.one);
 await expect(page.locator('#preview')).toBeHidden();
 await expect(page.locator('#save-button')).toBeDisabled();
});
test('Tiny Creative Work: preview, safe text rendering, stale invalidation and manual revision',async({page})=>{
 await page.goto(url);
 await write(page,{...sample,two:'<strong>Do not parse me</strong> & still creative'});
 await page.getByRole('button',{name:'Review my work'}).click();
 await expect(page.locator('#preview')).toBeVisible();
 await expect(page.locator('#preview-text')).toContainText('<strong>Do not parse me</strong>');
 await expect(page.locator('#preview-text strong')).toHaveCount(0);
 await expect(page.locator('#save-button')).toBeEnabled();
 await page.locator('#line-three').fill('A different ending remains my choice.');
 await expect(page.locator('#preview')).toBeHidden();
 await expect(page.locator('#save-button')).toBeDisabled();
 await expect(page.locator('#line-one')).toHaveValue(sample.one);
 await page.getByRole('button',{name:'Review my work'}).click();
 await expect(page.locator('#preview-text')).toContainText('A different ending remains my choice.');
 await expect(page.locator('#save-button')).toBeEnabled();
});
test('Tiny Creative Work: replace example cancel protects unsaved work, confirm loads original sample',async({page})=>{
 await page.goto(url);await page.locator('#line-one').fill('Do not erase this line');
 page.once('dialog',dialog=>dialog.dismiss());
 await page.getByRole('button',{name:'Load a fictional example'}).click();
 await expect(page.locator('#line-one')).toHaveValue('Do not erase this line');
 await expect(page.locator('#editor-status')).toContainText('preserved');
 page.once('dialog',dialog=>dialog.accept());
 await page.getByRole('button',{name:'Load a fictional example'}).click();
 await expect(page.locator('#work-title')).toHaveValue('A Small Beginning');
 await expect(page.locator('#line-three')).toHaveValue('I can begin again with something small.');
 await expect(page.locator('#preview')).toBeHidden();
});
test('Tiny Creative Work: reset cancellation and confirmation preserve or clear work correctly',async({page})=>{
 await page.goto(url);await write(page);
 await page.getByRole('button',{name:'Review my work'}).click();
 page.once('dialog',dialog=>dialog.dismiss());
 await page.getByRole('button',{name:'Clear my writing'}).click();
 await expect(page.locator('#line-one')).toHaveValue(sample.one);
 await expect(page.locator('#preview')).toBeVisible();
 page.once('dialog',dialog=>dialog.accept());
 await page.getByRole('button',{name:'Clear my writing'}).click();
 await expect(page.locator('#line-one')).toBeEmpty();
 await expect(page.locator('#work-title')).toBeEmpty();
 await expect(page.locator('#preview')).toBeHidden();
 await expect(page.locator('#save-button')).toBeDisabled();
 await expect(page.locator('#editor-status')).toContainText('All fields cleared');
 await page.getByRole('button',{name:'Clear my writing'}).click();
 await expect(page.locator('#editor-status')).toContainText('All fields cleared');
});
test('Tiny Creative Work: explicit local plain text download includes current revision',async({page})=>{
 await page.goto(url);await write(page);
 await page.getByRole('button',{name:'Review my work'}).click();
 const downloading=page.waitForEvent('download');
 await page.getByRole('button',{name:'Download my plain-text copy'}).click();
 const download=await downloading;
 expect(download.suggestedFilename()).toBe('one-place-tiny-creative-work.txt');
 await expect(page.locator('#keep-status')).toContainText('Verify it appears and opens');
 await expect(page.locator('#line-one')).toHaveValue(sample.one);
});
for(const width of [320,1366]){
 test('Tiny Creative Work: no JavaScript still explains and shows paper-only exercise at '+width+'px',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width,height:800}});
  try{
   const page=await context.newPage();await page.goto(url);
   await expect(page.locator('#moves .steps li')).toHaveCount(3);
   await expect(page.locator('textarea')).toHaveCount(3);
   await expect(page.locator('#creative-form button:disabled')).toHaveCount(3);
   await expect(page.locator('#save-button:disabled')).toHaveCount(1);
   await expect(page.locator('#print-button:disabled')).toHaveCount(1);
   await page.locator('details summary').click();
   await expect(page.locator('.papersample:visible')).toContainText('A Small Beginning');
   const d=await page.evaluate(()=>({v:innerWidth,h:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
   expect(Math.max(d.h,d.b)).toBeLessThanOrEqual(d.v+1);
  }finally{await context.close();}
 });
}
test('Tiny Creative Work: real skip-link keyboard focus and review Enter',async({page})=>{
 await page.goto(url);await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Skip to creative work lesson'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 await page.locator('#line-one').focus();await page.keyboard.type(sample.one);
 await page.locator('#line-two').focus();await page.keyboard.type(sample.two);
 await page.locator('#line-three').focus();await page.keyboard.type(sample.three);
 await page.getByRole('button',{name:'Review my work'}).focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#preview')).toBeVisible();
});
test('Tiny Creative Work: no automatic network/storage and external resource and area links',async({page})=>{
 const writes=[],thirdParties=[],errors=[];
 page.on('request',r=>{const u=new URL(r.url());if(!['GET','HEAD'].includes(r.method()))writes.push(r.url());if(!['localhost','127.0.0.1'].includes(u.hostname))thirdParties.push(r.url());});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);await write(page);await page.getByRole('button',{name:'Review my work'}).click();
 expect(thirdParties).toEqual([]);expect(writes).toEqual([]);expect(errors).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
 const links=page.locator('#sources a[href^="https://"]');await expect(links).toHaveCount(2);
 for(const link of await links.all()){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener noreferrer/);}
 await page.getByRole('link',{name:'Back to Creativity & Legacy'}).click();
 await expect(page).toHaveURL(/area=Creativity/);
 await expect(page.getByRole('heading',{name:'Creativity & Legacy',level:1})).toBeVisible();
});
test('Tiny Creative Work: print CSS preserves authored text and avoids unwanted controls',async({page})=>{
 await page.goto(url);await write(page);await page.getByRole('button',{name:'Review my work'}).click();
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#preview')).toBeVisible();
 await expect(page.locator('#preview-text')).toContainText(sample.three);
 await expect(page.getByRole('button',{name:'Download my plain-text copy'})).toBeHidden();
 await expect(page.locator('header')).toBeHidden();
 await page.emulateMedia({media:'screen'});
 await expect(page.getByRole('button',{name:'Print my work'})).toBeVisible();
});
