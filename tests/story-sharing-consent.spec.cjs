const {test,expect}=require('@playwright/test');
const route='/one-place/story-sharing-consent.html';
async function reflect(page,step,choice){
 const form=page.locator('form[data-step="'+step+'"]');
 await form.locator('input[value="'+choice+'"]').check();
 await form.getByRole('button',{name:/Reflect on/}).click();
}

test('three consent moves lead to an optional editable invitation',async({page})=>{
 await page.goto(route);
 await expect(page.getByRole('heading',{level:1,name:'Stories Are Gifts, Not Obligations'})).toBeVisible();
 await expect(page.locator('#load')).toBeDisabled();
 await reflect(page,0,1);await reflect(page,1,0);await reflect(page,2,2);
 await expect(page.locator('#progress')).toContainText('3 of 3');
 await expect(page.locator('#load')).toBeEnabled();
 await page.locator('#load').click();
 await expect(page.locator('#draft')).toHaveValue(/I would like to make private written notes/);
 await page.locator('#draft').fill('A kind fictional invitation without pressure');
 await expect(page.locator('#draft')).toHaveValue('A kind fictional invitation without pressure');
});

test('nine options receive individualized reasoning, not a score',async({page})=>{
 await page.goto(route);
 const excerpts=[
  ['without agreement','freedom to refuse','Guilt is pressure'],
  ['honors the limit','overrides Morgan','mislabeled as Morgan'],
  ['public social post','identifying details','exact words']
 ];
 for(let i=0;i<3;i++){
  for(let j=0;j<3;j++){
   await reflect(page,i,j);
   await expect(page.locator('#feedback'+(i+1))).toContainText(excerpts[i][j]);
   await expect(page.locator('#feedback'+(i+1))).toContainText('not a grade');
  }
 }
});

test('blank choice offers accessible explanation and no completion',async({page})=>{
 await page.goto(route);
 await page.locator('form[data-step="1"] button[type=submit]').click();
 await expect(page.locator('#feedback2')).toContainText('Choose a response');
 await expect(page.locator('#feedback2')).toHaveClass(/warn/);
 await expect(page.locator('#progress')).toContainText('0 of 3');
 await expect(page.locator('#load')).toBeDisabled();
});

test('changed selection retracts stale reflection until renewed',async({page})=>{
 await page.goto(route);
 for(let i=0;i<3;i++)await reflect(page,i,0);
 await expect(page.locator('#load')).toBeEnabled();
 await page.locator('form[data-step="2"] input[value="2"]').check();
 await expect(page.locator('#feedback3')).toContainText('Choice changed');
 await expect(page.locator('#progress')).toContainText('2 of 3');
 await expect(page.locator('#load')).toBeDisabled();
 await page.locator('form[data-step="2"] button[type=submit]').click();
 await expect(page.locator('#feedback3')).toContainText('exact words');
 await expect(page.locator('#progress')).toContainText('3 of 3');
});

test('a visitor can draft first; examples never overwrite personal wording',async({page})=>{
 await page.goto(route);
 await page.locator('#draft').fill('My own fictional wording');
 for(let i=0;i<3;i++)await reflect(page,i,0);
 await page.locator('#load').click();
 await expect(page.locator('#draft')).toHaveValue('My own fictional wording');
 await expect(page.locator('#draftStatus')).toContainText('nothing was overwritten');
 await page.locator('#clear').click();
 await expect(page.locator('#draft')).toHaveValue('');
 await expect(page.locator('#progress')).toContainText('3 of 3');
 await page.locator('#load').click();
 await expect(page.locator('#draft')).toHaveValue(/neighbors/);
 await page.locator('#draft').fill('I can edit loaded example without losing it');
 await page.locator('#load').click();
 await expect(page.locator('#draft')).toHaveValue('I can edit loaded example without losing it');
});

test('clear invitation does not erase reflections; full reset does',async({page})=>{
 await page.goto(route);
 for(let i=0;i<3;i++)await reflect(page,i,1);
 await page.locator('#load').click();
 await page.locator('#clear').click();
 await expect(page.locator('#draft')).toHaveValue('');
 await expect(page.locator('#load')).toBeEnabled();
 await page.locator('#draft').fill('Temporary invitation');
 await page.locator('#reset').click();
 await expect(page.locator('form.practice input:checked')).toHaveCount(0);
 for(const n of [1,2,3])await expect(page.locator('#feedback'+n)).toBeEmpty();
 await expect(page.locator('#draft')).toHaveValue('');
 await expect(page.locator('#progress')).toContainText('0 of 3');
 await expect(page.locator('#load')).toBeDisabled();
 await expect(page.locator('form[data-step="0"] input[value="0"]')).toBeFocused();
});

test('practice never sends or stores written words',async({page})=>{
 const remote=[];
 page.on('request',req=>{if(!req.url().startsWith('http://127.0.0.1:8765/'))remote.push(req.url());});
 await page.goto(route);
 for(let i=0;i<3;i++)await reflect(page,i,2);
 await page.locator('#load').click();
 await page.locator('#draft').fill('Secret fictional phrase that must disappear');
 expect(remote).toEqual([]);
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
 await page.reload();
 await expect(page.locator('#draft')).toHaveValue('');
 await expect(page.locator('form.practice input:checked')).toHaveCount(0);
 await expect(page.locator('#load')).toBeDisabled();
});

test('external ethical sources are opt-in and local links resolve',async({page})=>{
 await page.goto(route);
 const external=page.locator('a[href^="https://"]');
 await expect(external).toHaveCount(3);
 for(const a of await external.all()){
  await expect(a).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toContainText('(external)');
 }
 for(const path of ['../index.html','../human-literacy/','../index.html?area=Creativity%20%26%20Legacy']){
  const res=await page.request.get(new URL(path,page.url()).toString());
  expect(res.status(),path).toBe(200);
 }
 await page.getByRole('link',{name:'Creativity & Legacy area'}).click();
 await expect(page.getByRole('heading',{level:1,name:'Creativity & Legacy',exact:true})).toBeVisible();
});

for(const width of [320,390,1366,1920]){
 test('responsive reflow and usable practice at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto(route);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await reflect(page,0,1);
  await expect(page.locator('#feedback1')).toContainText('freedom to refuse');
 });
}

test('200 percent enlarged text at 320px does not overflow',async({page})=>{
 await page.setViewportSize({width:320,height:900});
 await page.goto(route);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await reflect(page,1,0);
 await expect(page.locator('#feedback2')).toContainText('honors the limit');
 await expect(page.locator('#draft')).toBeVisible();
});

test('mobile and enlarged text keep every story heading word intact',async({page})=>{
 for(const {width,enlarged} of [
  {width:320,enlarged:false},
  {width:320,enlarged:true},
  {width:390,enlarged:false},
  {width:390,enlarged:true}
 ]){
  await page.setViewportSize({width,height:900});
  await page.goto(route);
  if(enlarged)await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
  const layout=await page.evaluate(()=>{
   const heading=document.querySelector('h1');
   const node=heading.firstChild;
   const words=[...node.textContent.matchAll(/\S+/g)].map(match=>{
    const range=document.createRange();
    range.setStart(node,match.index);
    range.setEnd(node,match.index+match[0].length);
    return {word:match[0],fragments:range.getClientRects().length};
   });
   return {
    words,
    root:parseFloat(getComputedStyle(document.documentElement).fontSize),
    title:parseFloat(getComputedStyle(heading).fontSize),
    noSidewaysScroll:document.documentElement.scrollWidth<=innerWidth+1
   };
  });
  expect(layout.words,JSON.stringify({width,enlarged})).toEqual([
   {word:'Stories',fragments:1},
   {word:'Are',fragments:1},
   {word:'Gifts,',fragments:1},
   {word:'Not',fragments:1},
   {word:'Obligations',fragments:1}
  ]);
  expect(layout.noSidewaysScroll,JSON.stringify({width,enlarged})).toBe(true);
  if(enlarged)expect(layout.title).toBeGreaterThanOrEqual(layout.root*1.09);
 }
});

test('all story section-heading words remain whole with enlarged phone text',async({page})=>{
 for(const {width,enlarged} of [
  {width:320,enlarged:false},{width:320,enlarged:true},
  {width:390,enlarged:false},{width:390,enlarged:true},
  {width:480,enlarged:true},{width:600,enlarged:true}
 ]){
  await page.setViewportSize({width,height:900});
  await page.goto(route);
  if(enlarged)await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
  const layout=await page.evaluate(()=>{
   const headings=[...document.querySelectorAll('main section.card h2')].map(h=>{
    const parts=[];
    const walker=document.createTreeWalker(h,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
     for(const match of node.textContent.matchAll(/[\p{L}\p{N}]+/gu)){
      const range=document.createRange();
      range.setStart(node,match.index);
      range.setEnd(node,match.index+match[0].length);
      parts.push({word:match[0],fragments:range.getClientRects().length});
     }
    }
    return {title:h.textContent.trim(),font:parseFloat(getComputedStyle(h).fontSize),words:parts};
   });
   return {
    headings,
    rootFont:parseFloat(getComputedStyle(document.documentElement).fontSize),
    htmlWidth:document.documentElement.scrollWidth,
    bodyWidth:document.body.scrollWidth
   };
  });
  expect(layout.headings.length,JSON.stringify({width,enlarged})).toBe(6);
  expect(layout.headings.flatMap(h=>h.words.filter(w=>w.fragments!==1).map(w=>h.title+': '+w.word)),
    JSON.stringify({width,enlarged})).toEqual([]);
  expect(layout.htmlWidth,JSON.stringify({width,enlarged})).toBeLessThanOrEqual(width+1);
  expect(layout.bodyWidth,JSON.stringify({width,enlarged})).toBeLessThanOrEqual(width+1);
  if(enlarged){
   expect(layout.rootFont).toBeGreaterThanOrEqual(32);
   expect(Math.min(...layout.headings.map(h=>h.font))).toBeGreaterThanOrEqual(layout.rootFont*1.14);
  }
 }
});

test('whole-page screenshot and section geometry hold across real browser sizes',async({page},testInfo)=>{
 test.setTimeout(120000);
 const configs=[
  {width:320,large:false},
  {width:320,large:true},
  {width:390,large:false},
  {width:390,large:true},
  {width:1366,large:false},
  {width:1920,large:false}
 ];
 for(const cfg of configs){
  await page.setViewportSize({width:cfg.width,height:900});
  await page.goto(route);
  if(cfg.large)await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
  const dims=await page.evaluate(()=>{
   const blocks=[...document.querySelectorAll('main > header, main > .pattern, main > section.card, footer')];
   const positions=blocks.map(el=>{
    const r=el.getBoundingClientRect();
    return {name:el.tagName.toLowerCase(),x:r.left,right:r.right,y:r.top,bottom:r.bottom,height:r.height};
   });
   const buttons=[...document.querySelectorAll('button')].filter(el=>!el.disabled);
   return {
    viewport:innerWidth,
    rootFont:parseFloat(getComputedStyle(document.documentElement).fontSize),
    htmlWidth:document.documentElement.scrollWidth,
    bodyWidth:document.body.scrollWidth,
    sections:positions,
    smallestButtonHeight:Math.min(...buttons.map(el=>el.getBoundingClientRect().height)),
    visibleSafetyNote:document.querySelector('.critical').getBoundingClientRect().height>0
   };
  });
  expect(dims.htmlWidth,JSON.stringify(cfg)).toBeLessThanOrEqual(cfg.width+1);
  expect(dims.bodyWidth,JSON.stringify(cfg)).toBeLessThanOrEqual(cfg.width+1);
  expect(dims.visibleSafetyNote,JSON.stringify(cfg)).toBe(true);
  expect(dims.sections.length,JSON.stringify(cfg)).toBe(9);
  expect(dims.smallestButtonHeight,JSON.stringify(cfg)).toBeGreaterThanOrEqual(44);
  for(let i=0;i<dims.sections.length;i++){
   const section=dims.sections[i];
   expect(section.height,JSON.stringify({cfg,section})).toBeGreaterThan(20);
   expect(section.x,JSON.stringify({cfg,section})).toBeGreaterThanOrEqual(-1);
   expect(section.right,JSON.stringify({cfg,section})).toBeLessThanOrEqual(cfg.width+1);
   if(i>0)expect(section.y,JSON.stringify({cfg,i})).toBeGreaterThanOrEqual(dims.sections[i-1].bottom-1);
  }
  const png=await page.screenshot({fullPage:true,animations:'disabled'});
  expect(png.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');
  expect(png.readUInt32BE(16),JSON.stringify(cfg)).toBe(cfg.width);
  expect(png.readUInt32BE(20),JSON.stringify(cfg)).toBeGreaterThanOrEqual(900);
  const label=cfg.width+(cfg.large?'-200-percent':'-normal');
  await testInfo.attach('story-full-'+label+'.png',{body:png,contentType:'image/png'});
  console.log('STORY_PAGE_GEOMETRY '+JSON.stringify({label,rootFont:dims.rootFont,sections:dims.sections.length,scrollWidth:dims.htmlWidth,pngHeight:png.readUInt32BE(20),minButtonHeight:dims.smallestButtonHeight}));
 }
});

test('keyboard order, focus, semantic radio groups and live updates work',async({page})=>{
 await page.goto(route);
 await page.keyboard.press('Tab');
 await expect(page.locator('.skip')).toBeFocused();
 const first=page.locator('form[data-step="0"] input[value="1"]');
 await first.focus();await page.keyboard.press('Space');
 await expect(first).toBeChecked();
 await page.locator('form[data-step="0"] button[type=submit]').focus();await page.keyboard.press('Enter');
 await expect(page.locator('#feedback1')).toContainText('freedom to refuse');
 await expect(page.locator('#feedback1')).toHaveAttribute('role','status');
 await expect(page.locator('fieldset legend')).toHaveCount(3);
 await expect(page.locator('label[for="draft"]')).toHaveCount(1);
 await expect(page.locator('#draft')).toHaveAttribute('maxlength','800');
});

test('reducing motion still permits practice without animation',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(route);
 await reflect(page,2,2);
 await expect(page.locator('#feedback3')).toContainText('exact words');
});

test.describe('no JavaScript',()=>{
 test.use({javaScriptEnabled:false});
 test('all teaching, scenario explanations, sample and sources are readable',async({page})=>{
  await page.goto(route);
  await expect(page.getByRole('heading',{level:1,name:'Stories Are Gifts, Not Obligations'})).toBeVisible();
  await expect(page.locator('form.practice')).toHaveCount(3);
  await expect(page.locator('form.practice').first()).toBeHidden();
  await expect(page.locator('#draft')).toBeHidden();
  await page.locator('section[aria-labelledby="inviteTitle"] summary').click();
  await expect(page.getByText(/Permission to chat does not automatically authorize/)).toBeVisible();
  await page.locator('section[aria-labelledby="shareTitle"] summary').click();
  await expect(page.getByText(/Even an unnamed quote might identify someone/)).toBeVisible();
  await page.locator('#sample summary').click();
  await expect(page.locator('#sample')).toContainText('Would you be comfortable talking');
  await expect(page.getByRole('link',{name:/Oral History Association/})).toBeVisible();
 });
});