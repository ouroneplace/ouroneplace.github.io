const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const url='/one-place/veterans-benefits-preparation.html';
const topics=['disability','health','education','caregiving','survivors','transition','housing','reviews'];

for(const width of [320,1366]){
 test('public Veterans lesson declares one indexable discoverable robots policy at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:800});
  await page.goto(url);
  const robots=page.locator('head meta[name="robots"]');
  await expect(robots).toHaveCount(1);
  await expect(robots).toHaveAttribute('content','index,follow');
  await expect(page.locator('h1')).toContainText('Benefits preparation');
  await expect(page.locator('main > aside.note')).toContainText('United States only');
 });
}

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
 page.once('dialog',d=>d.accept());
 await page.locator('[data-select="survivors"]').click();
 await expect(page.locator('#survivors')).toBeVisible();
 await expect(page.locator('#planText')).toBeHidden();
 await expect(page.getByRole('button',{name:'Download text copy'})).toBeDisabled();
});
test('privacy navigation preserves a reviewed plan and chosen pathway',async({page})=>{
 await page.goto(url+'#health');
 await page.locator('#health [data-record]').first().check();
 await page.getByRole('button',{name:'Review my preparation plan'}).click();
 await page.getByRole('link',{name:'Privacy & limits'}).click();
 await expect(page).toHaveURL(/#privacy$/);
 await expect(page.locator('#health')).toBeVisible();
 await expect(page.locator('#planText')).toContainText('Pathway: VA health care');
 await expect(page.getByRole('button',{name:'Download text copy'})).toBeEnabled();
});
test('keyboard pathway navigation focuses the opened lesson and preserves plan privacy behavior',async({page})=>{
 await page.goto(url);
 const caregiving=page.locator('[data-select="caregiving"]');
 await caregiving.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#caregiving')).toBeVisible();
 await expect(page.locator('#caregiving')).toBeFocused();
 await page.keyboard.press('Tab');
 const first=page.locator('#caregiving [data-record]').first();
 await expect(first).toBeFocused();
 await page.keyboard.press('Space');await expect(first).toBeChecked();
 await page.getByRole('button',{name:'Review my preparation plan'}).click();
 await expect(page.locator('#planText')).toContainText('Family & caregiver support');
 await page.getByRole('link',{name:'Privacy & limits'}).click();
 await expect(page.locator('#caregiving')).toBeVisible();
 await expect(page.locator('#planText')).toBeVisible();
 const health=page.locator('[data-select="health"]');
 page.once('dialog',d=>d.accept());
 await health.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#health')).toBeFocused();
 await expect(page.locator('#planText')).toBeHidden();
 await expect(page.getByRole('button',{name:'Download text copy'})).toBeDisabled();
});
test('reviewed plan survives a canceled pathway change and changes only after consent',async({page})=>{
 await page.goto(url+'#health');
 const record=page.locator('#health [data-record]').first();
 await record.check();
 await page.getByRole('button',{name:'Review my preparation plan'}).click();
 await expect(page.locator('#planText')).toContainText('Pathway: VA health care');
 await expect(page.getByRole('button',{name:'Download text copy'})).toBeEnabled();
 page.once('dialog',d=>{
  expect(d.message()).toContain('reviewed preparation plan');
  d.dismiss();
 });
 await page.locator('[data-select="survivors"]').click();
 await expect(page).toHaveURL(/#health$/);
 await expect(page.locator('#health')).toBeVisible();
 await expect(page.locator('#health')).toBeFocused();
 await expect(record).toBeChecked();
 await expect(page.locator('#planText')).toContainText('Pathway: VA health care');
 await expect(page.getByRole('button',{name:'Download text copy'})).toBeEnabled();
 await page.getByRole('link',{name:'Privacy & limits'}).click();
 await expect(page.locator('#planText')).toContainText('Pathway: VA health care');
 page.once('dialog',d=>d.accept());
 await page.locator('[data-select="survivors"]').click();
 await expect(page.locator('#survivors')).toBeFocused();
 await expect(page.locator('#planText')).toBeHidden();
 await expect(page.getByRole('button',{name:'Download text copy'})).toBeDisabled();
 await expect(record).toBeChecked();
 await page.locator('[data-select="education"]').click();
 await expect(page.locator('#education')).toBeVisible();
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
  await expect(page.locator('noscript')).toBeVisible();
  expect(await page.locator('noscript').evaluate(el=>el.outerHTML)).toContain('JavaScript is off');
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
 const overflowing=await page.evaluate(()=>({horizontalScroll:scrollX,objects:Array.from(document.querySelectorAll('body *')).filter(el=>{const rect=el.getBoundingClientRect();return (el.scrollWidth>el.clientWidth+2)||(rect.width>0&&(rect.left<-1||rect.right>innerWidth+1))}).slice(0,12).map(el=>({element:el.tagName.toLowerCase()+'#'+el.id,scroll:el.scrollWidth,client:el.clientWidth,overflow:getComputedStyle(el).overflowX,box:[Math.round(el.getBoundingClientRect().left),Math.round(el.getBoundingClientRect().right)],sample:(el.textContent||'').trim().slice(0,45)}))}));
 expect(Math.max(d.doc,d.body),'Overflow elements: '+JSON.stringify(overflowing)).toBeLessThanOrEqual(d.win+1);
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

for(const width of [320,390]){
 test('enlarged-text labels keep full words and remain readable at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:800});
  await page.goto(url);
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  await page.getByRole('button',{name:'Review my preparation plan'}).click();
  const d=await page.evaluate(()=>{
   const broken=[];
   for(const el of document.querySelectorAll('h1,h2,h3,.choice,.controls button,.eyebrow')){
    if(el.closest('[hidden]'))continue;
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    let textNode;
    while((textNode=walker.nextNode())){
     const words=/[^\s-]+/g;let m;
     while((m=words.exec(textNode.textContent))){
      if(m[0].length<4)continue;
      const range=document.createRange();
      range.setStart(textNode,m.index);range.setEnd(textNode,m.index+m[0].length);
      if(range.getClientRects().length>1)broken.push(el.tagName.toLowerCase()+'#'+el.id+': '+m[0]);
     }
    }
   }
   return {broken,scroll:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),viewport:innerWidth};
  });
  expect(d.broken,'Split words at large text: '+JSON.stringify(d.broken)).toEqual([]);
  expect(d.scroll).toBeLessThanOrEqual(d.viewport+1);
  await expect(page.getByRole('button',{name:'Download text copy'})).toBeEnabled();
 });
}

test('reviewed plan prints completely with selected lesson and no interactive controls',async({page})=>{
 await page.goto(url+'#health');
 await page.locator('#health [data-record]').first().check();
 await page.getByRole('button',{name:'Review my preparation plan'}).click();
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#health')).toBeVisible();
 await expect(page.locator('#disability')).toBeHidden();
 await expect(page.locator('#planText')).toBeVisible();
 await expect(page.locator('#planText')).toContainText('Pathway: VA health care');
 await expect(page.locator('header')).toBeHidden();
 await expect(page.locator('.choices')).toBeHidden();
 await expect(page.locator('.controls')).toBeHidden();
 const print=await page.locator('#planText').evaluate(el=>({max:getComputedStyle(el).maxHeight,overflow:getComputedStyle(el).overflow,scroll:el.scrollHeight,client:el.clientHeight}));
 expect(print.max).toBe('none');
 expect(print.overflow).toBe('visible');
 expect(print.scroll).toBeLessThanOrEqual(print.client+2);
});
test('no-JavaScript paper fallback prints every Veterans lesson and its official reading',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:740}});
 try{
  const page=await context.newPage();await page.goto(url);
  await page.emulateMedia({media:'print'});
  await expect(page.locator('.path:visible')).toHaveCount(8);
  await expect(page.locator('noscript')).toBeVisible();
  await expect(page.locator('article.path .sources a')).toHaveCount(17);
  await expect(page.locator('#planText')).toBeHidden();
  await expect(page.locator('.controls')).toBeHidden();
  await expect(page.locator('header')).toBeHidden();
  await expect(page.locator('#reviews')).toContainText('decision letter');
 }finally{await context.close()}
});

for(const width of [320,1366]){
 test('Veterans links reach real One Place home and life area, with browser back at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:780});
  await page.goto(url+'#caregiving');
  await expect(page.locator('#caregiving')).toBeVisible();
  await page.locator('header a.brand').click();
  await expect(page).toHaveURL(/\/index\.html$/);
  await expect(page.locator('#main')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/veterans-benefits-preparation\.html#caregiving$/);
  await expect(page.locator('#caregiving')).toBeVisible();
  await expect(page.locator('#health')).toBeHidden();
  await page.locator('header nav.mainnav a[href*="area="]').click();
  await expect(page).toHaveURL(/index\.html\?area=Veterans%20%26%20Military%20Families$/);
  await expect(page.locator('#main h1')).toHaveText('Veterans & Military Families');
  await expect(page.locator('#main .offers .offer')).toHaveCount(4);
  await page.goBack();
  await expect(page.locator('#caregiving')).toBeVisible();
  await page.locator('footer a[href*="area="]').click();
  await expect(page.locator('#main h1')).toHaveText('Veterans & Military Families');
  await page.goBack();
  await expect(page.locator('#caregiving')).toBeVisible();
 });
}

test('Veterans eight pathways render complete pages at six phone, zoom and desktop settings',async({page})=>{
 test.setTimeout(180000);
 const folder='test-results/team-b-veterans-visual';
 fs.mkdirSync(folder,{recursive:true});
 const sizes=[
  {w:320,h:740,large:false},
  {w:390,h:780,large:false},
  {w:1366,h:900,large:false},
  {w:1920,h:960,large:false},
  {w:320,h:740,large:true},
  {w:390,h:780,large:true}
 ];
 for(const v of sizes){
  await page.setViewportSize({width:v.w,height:v.h});
  await page.goto(url);
  if(v.large)await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  for(const id of topics){
   await page.locator('[data-select="'+id+'"]').click();
   await expect(page.locator('#'+id)).toBeVisible();
   const result=await page.evaluate(()=>{
    const selectors=['header','main > .hero','main > aside.note','main > section.panel','footer'];
    const blocks=selectors.flatMap(q=>[...document.querySelectorAll(q)]).map(el=>{
     const r=el.getBoundingClientRect();
     return {name:el.id||el.getAttribute('aria-labelledby')||el.className||el.tagName,left:r.left,right:r.right,top:r.top,bottom:r.bottom};
    }).sort((a,b)=>a.top-b.top);
    const broken=[];
    for(const el of document.querySelectorAll('nav.mainnav a,.choices a,h1,h2,h3,h4,.controls button,.eyebrow')){
     if(!el.getClientRects().length)continue;
     const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
     while((node=walker.nextNode())){
      const re=/[A-Za-z]{4,}/g;let m;
      while((m=re.exec(node.textContent))){
       const range=document.createRange();range.setStart(node,m.index);range.setEnd(node,m.index+m[0].length);
       if(range.getClientRects().length>1)broken.push(el.tagName+':'+m[0]);
      }
     }
    }
    const buttons=[...document.querySelectorAll('.controls button:not(:disabled)')].map(el=>({label:el.textContent.trim(),height:el.getBoundingClientRect().height}));
    return {blocks,broken,buttons,width:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),viewport:innerWidth,active:document.querySelector('.path:not([hidden])')?.id,root:parseFloat(getComputedStyle(document.documentElement).fontSize),limit:document.querySelector('main > aside.note')?.textContent||''};
   });
   expect(result.active).toBe(id);
   expect(result.blocks,'Page section count').toHaveLength(9);
   expect(result.width,'Side-scroll '+JSON.stringify({v,id,result})).toBeLessThanOrEqual(result.viewport+1);
   expect(result.broken,'Fragmented words '+JSON.stringify({v,id,broken:result.broken})).toEqual([]);
   expect(result.limit).toContain('United States only');
   if(v.large)expect(result.root).toBeGreaterThanOrEqual(32);
   for(let i=0;i<result.blocks.length;i++){
    const b=result.blocks[i];
    expect(b.left,'Left cropping '+JSON.stringify({v,id,b})).toBeGreaterThanOrEqual(-1);
    expect(b.right,'Right cropping '+JSON.stringify({v,id,b})).toBeLessThanOrEqual(result.viewport+1);
    if(i)expect(b.top,'Overlapping blocks '+JSON.stringify({v,id,b,prior:result.blocks[i-1]})).toBeGreaterThanOrEqual(result.blocks[i-1].bottom-1);
   }
   for(const b of result.buttons)expect(b.height,'Small active control '+JSON.stringify({v,id,b})).toBeGreaterThanOrEqual(44);
   console.log('VETERANS_PAGE_GEOMETRY',JSON.stringify({viewport:v.w,enlarged:v.large,path:id,blocks:result.blocks.length,split:result.broken.length,documentWidth:result.width,buttons:result.buttons.length}));
  }
  await page.getByRole('button',{name:'Review my preparation plan'}).click();
  await expect(page.locator('#planText')).toContainText('A VA decision I disagree with');
  const image=folder+'/veterans-'+v.w+(v.large?'-200pct':'-normal')+'.png';
  await page.screenshot({path:image,fullPage:true,animations:'disabled'});
  const png=fs.readFileSync(image);
  expect(png.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');
  expect(png.readUInt32BE(16)).toBe(v.w);
  expect(png.readUInt32BE(20)).toBeGreaterThanOrEqual(v.h);
 }
});
