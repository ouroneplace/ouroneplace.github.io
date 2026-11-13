const {test,expect}=require('@playwright/test');
const url='/one-place/power-outage-continuity.html';

for(const width of [320,390,1366,1920]){
 test('power outage guide renders five complete lessons and reflows at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:840});
  await page.goto(url);
  await expect(page).toHaveTitle(/Power Outage Continuity Check/);
  await expect(page.getByRole('heading',{name:'Power Outage Continuity Check',level:1})).toBeVisible();
  await expect(page.locator('article.lesson')).toHaveCount(5);
  await expect(page.locator('article.lesson dt')).toHaveCount(30);
  await expect(page.locator('#noJsHelp')).toBeHidden();
  const m=await page.evaluate(()=>({width:innerWidth,body:document.body.scrollWidth,html:document.documentElement.scrollWidth}));
  expect(Math.max(m.body,m.html),JSON.stringify(m)).toBeLessThanOrEqual(m.width+1);
  expect(errors).toEqual([]);
 });
}

test('320px at 200 percent root font has no overflow',async({page})=>{
 await page.setViewportSize({width:320,height:720});
 await page.goto(url);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 await expect(page.getByLabel('What must continue working?')).toBeVisible();
 const m=await page.evaluate(()=>({w:innerWidth,a:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
 expect(Math.max(m.a,m.b),JSON.stringify(m)).toBeLessThanOrEqual(m.w+1);
});

test('320px enlarged text keeps whole heading words without suppressing zoom',async({page})=>{
 await page.setViewportSize({width:320,height:720});
 await page.goto(url);
 for(const enlarged of [false,true]){
  await page.evaluate(enlarged=>document.documentElement.style.fontSize=enlarged?'200%':'100%',enlarged);
  const m=await page.evaluate(()=>{
   const heading=document.querySelector('h1'),node=heading.firstChild,text=node.textContent,range=document.createRange();
   return {viewport:innerWidth,scroll:document.documentElement.scrollWidth,bodyScroll:document.body.scrollWidth,rootPx:parseFloat(getComputedStyle(document.documentElement).fontSize),headingPx:parseFloat(getComputedStyle(heading).fontSize),words:[...text.matchAll(/\S+/g)].map(match=>{range.setStart(node,match.index);range.setEnd(node,match.index+match[0].length);return {text:match[0],fragments:range.getClientRects().length};})};
  });
  expect(m.words.map(w=>w.text)).toEqual(['Power','Outage','Continuity','Check']);
  expect(m.words.every(w=>w.fragments===1),JSON.stringify(m)).toBe(true);
  expect(m.headingPx).toBeGreaterThanOrEqual(m.rootPx*1.1);
  expect(Math.max(m.scroll,m.bodyScroll),JSON.stringify(m)).toBeLessThanOrEqual(m.viewport+1);
 }
});

test('every priority yields clear prepare, respond, recover and stop steps',async({page})=>{
 await page.goto(url);
 const cases={
  equipment:'Vital equipment support interrupted',
  medicine:'Do not self-discontinue',
  communication:'Someone unreachable and in danger',
  people:'Never force unsafe transfers',
  pets:'Do not assume shelters accept every animal'
 };
 for(const [priority,stop] of Object.entries(cases)){
  for(const phase of ['before','during','after']){
   await page.locator('#priority').selectOption(priority);
   await page.locator('#phase').selectOption(phase);
   await page.locator('#support').selectOption('check');
   await page.getByRole('button',{name:'Review my outage step'}).click();
   await expect(page.locator('#reviewed')).toBeVisible();
   await expect(page.locator('#preview')).toContainText(stop);
   await expect(page.locator('#preview')).toContainText('Check the outcome:');
   await expect(page.locator('#preview')).toContainText('Local alerts and current emergency instructions');
   await expect(page.locator('#printPlan')).toBeEnabled();
  }
 }
});

test('high-risk equipment, medicine and accessible exit avoid unsupported promises',async({page})=>{
 await page.goto(url);
 await page.locator('#priority').selectOption('equipment');
 await page.locator('#phase').selectOption('during');
 await page.locator('#support').selectOption('stop');
 await page.getByRole('button',{name:'Review my outage step'}).click();
 await expect(page.locator('#preview')).toContainText('Never improvise electricity to a medical device');
 await expect(page.locator('#preview')).toContainText('seek urgent or qualified help');
 await page.locator('#priority').selectOption('medicine');
 await expect(page.locator('#reviewed')).toBeHidden();
 await page.getByRole('button',{name:'Review my outage step'}).click();
 await expect(page.locator('#preview')).toContainText('product-specific');
 await page.locator('#priority').selectOption('people');
 await page.getByRole('button',{name:'Review my outage step'}).click();
 await expect(page.locator('#preview')).toContainText('cannot safely stay or leave');
});

test('empty and partial inputs do not create review',async({page})=>{
 await page.goto(url);
 await expect(page.locator('#printPlan')).toBeDisabled();
 await page.getByRole('button',{name:'Review my outage step'}).click();
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.locator('#priority')).toHaveJSProperty('required',true);
 await page.locator('#priority').selectOption('medicine');
 await page.getByRole('button',{name:'Review my outage step'}).click();
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.locator('#phase')).toHaveValue('');
 await page.locator('#phase').selectOption('before');
 await page.getByRole('button',{name:'Review my outage step'}).click();
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.locator('#support')).toHaveValue('');
});

test('edit invalidates review and cancel clear preserves choices; confirmation clears',async({page})=>{
 await page.goto(url);
 await page.locator('#priority').selectOption('communication');
 await page.locator('#phase').selectOption('before');
 await page.locator('#support').selectOption('coordinate');
 await page.locator('#planForm').evaluate(form=>form.requestSubmit());
 await expect(page.locator('#reviewed')).toBeVisible();
 await page.locator('#phase').selectOption('during');
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.locator('#printPlan')).toBeDisabled();
 await page.getByRole('button',{name:'Review my outage step'}).click();
 page.once('dialog',d=>d.dismiss());
 await page.locator('#resetPlan').click();
 await expect(page.locator('#priority')).toHaveValue('communication');
 await expect(page.locator('#reviewed')).toBeVisible();
 page.once('dialog',d=>d.accept());
 await page.locator('#resetPlan').click();
 await expect(page.locator('#priority')).toHaveValue('');
 await expect(page.locator('#phase')).toHaveValue('');
 await expect(page.locator('#support')).toHaveValue('');
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.locator('#printPlan')).toBeDisabled();
});

test('print is deliberate and only available after review',async({page})=>{
 await page.goto(url);
 await page.evaluate(()=>{window.__prints=0;window.print=()=>window.__prints++;});
 await expect(page.locator('#printPlan')).toBeDisabled();
 await page.locator('#priority').selectOption('pets');
 await page.locator('#phase').selectOption('after');
 await page.locator('#support').selectOption('coordinate');
 await page.getByRole('button',{name:'Review my outage step'}).click();
 await expect(page.locator('body')).toHaveClass(/print-reviewed/);
 await page.emulateMedia({media:'print'});
 await expect(page.getByRole('heading',{name:'Review before using'})).toBeVisible();
 await expect(page.locator('#skills-title')).toBeHidden();
 await page.emulateMedia({media:'screen'});
 await page.locator('#printPlan').click();
 expect(await page.evaluate(()=>window.__prints)).toBe(1);
 await page.locator('#priority').selectOption('communication');
 await expect(page.locator('body')).not.toHaveClass(/print-reviewed/);
});

test('generator scenario supports blank, both unsafe, correct and reset',async({page})=>{
 await page.goto(url);
 await page.locator('#checkDecision').click();
 await expect(page.locator('#decisionStatus')).toContainText('Choose an option');
 await page.locator('input[name="decision"][value="a"]').check();
 await page.locator('#checkDecision').click();
 await expect(page.locator('#decisionStatus')).toContainText('open garage door');
 await page.locator('input[name="decision"][value="c"]').check();
 await page.locator('#checkDecision').click();
 await expect(page.locator('#decisionStatus')).toContainText('Charcoal grills');
 await page.locator('input[name="decision"][value="b"]').check();
 await page.locator('#checkDecision').click();
 await expect(page.locator('#decisionStatus')).toContainText('Best first response');
 await page.locator('#clearDecision').click();
 await expect(page.locator('input[name="decision"]:checked')).toHaveCount(0);
 await expect(page.locator('#decisionStatus')).toContainText('Decision cleared');
});

test('keyboard focus and semantic labels support non-pointer navigation',async({page})=>{
 await page.goto(url);
 await page.getByRole('link',{name:'Skip to outage guide'}).focus();
 await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/#main$/);
 await page.locator('#priority').focus();
 await page.keyboard.press('Tab');
 await expect(page.locator('#phase')).toBeFocused();
 await expect(page.getByRole('group',{name:'What should happen first?'})).toBeVisible();
 await expect(page.getByRole('status')).toHaveCount(2);
 await expect(page.locator('details summary')).toBeVisible();
});

test('no-JS page still teaches, explains and offers paper checklist at 320px',async({browser})=>{
 const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:720}});
 try{
  const page=await ctx.newPage();
  await page.goto(url);
  await expect(page.locator('#planForm')).toBeHidden();
  await expect(page.locator('#noJsHelp')).toBeVisible();
  await expect(page.locator('article.lesson')).toHaveCount(5);
  await expect(page.getByRole('heading',{name:'Paper checklist — works offline'})).toBeVisible();
  await page.locator('details summary').click();
  await expect(page.getByText(/Never run fuel-burning generators or grills indoors/)).toBeVisible();
  const m=await page.evaluate(()=>({w:innerWidth,a:document.documentElement.scrollWidth,b:document.body.scrollWidth}));
  expect(Math.max(m.a,m.b)).toBeLessThanOrEqual(m.w+1);
 }finally{await ctx.close();}
});

test('privacy: no personal fields, third-party subresources, writes, storage, or cookies',async({page})=>{
 const writes=[],third=[];
 page.on('request',r=>{
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
  if(!r.url().startsWith('http://127.0.0.1:8765/')&&!r.url().startsWith('data:'))third.push(r.url());
 });
 await page.goto(url);
 await expect(page.locator('input[type="text"],textarea,input[type="email"],input[type="tel"]')).toHaveCount(0);
 await page.locator('#priority').selectOption('medicine');
 await page.locator('#phase').selectOption('during');
 await page.locator('#support').selectOption('stop');
 await page.getByRole('button',{name:'Review my outage step'}).click();
 await page.locator('input[name="decision"][value="b"]').check();
 await page.locator('#checkDecision').click();
 expect(writes).toEqual([]);expect(third).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage),cookies:document.cookie}))).toEqual({local:[],session:[],cookies:''});
});

test('source boundaries and HQ-only navigation are unambiguous',async({page})=>{
 await page.goto(url);
 const external=page.locator('.source-links a[href^="https://"]');
 await expect(external).toHaveCount(7);
 for(const a of await external.all()){
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(a).toContainText('external');
 }
 await expect(page.locator('header nav a').first()).toHaveAttribute('href','../index.html?area=Emergencies%20%26%20Preparedness');
 await expect(page.getByText('911 in the United States')).toBeVisible();
 await expect(page.getByText(/more than 20 feet from doors, windows and vents/)).toBeVisible();
 await expect(page.getByRole('link',{name:'Family Handoff'})).toHaveAttribute('href','family-handoff.html');
 await expect(page.getByRole('link',{name:'Home Skills emergency supplies lesson'})).toHaveAttribute('href','home-skills.html#skill-30');
});
