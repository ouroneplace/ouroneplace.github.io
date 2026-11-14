const {test,expect}=require('@playwright/test');
const url='/one-place/everyday-access-check.html';
const sizes=[320,390,1366,1920];

for(const width of sizes){
 test('access check displays all five lessons and fits '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.setViewportSize({width,height:850});
  await page.goto(url);
  await expect(page).toHaveTitle(/Everyday Access Check/);
  await expect(page.getByRole('heading',{level:1,name:'Everyday Access Check'})).toBeVisible();
  await expect(page.locator('article.lesson')).toHaveCount(5);
  await expect(page.locator('#noJsHelp')).toBeHidden();
  await expect(page.locator('article.lesson dt')).toHaveCount(30);
  await expect(page.locator('header nav').getByRole('link',{name:'Aging & Accessibility'})).toBeVisible();
  const measure=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(measure.html,measure.body),JSON.stringify(measure)).toBeLessThanOrEqual(measure.width+1);
  expect(errors).toEqual([]);
 });
}

for(const width of [320,1366]){
 test('native select borders remain distinguishable at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:850});
  await page.goto(url);
  const ratios=await page.evaluate(()=>{
   const toRgb=value=>(value.match(/[0-9.]+/g)||[]).slice(0,3).map(Number);
   const luminosity=value=>{
    const rgb=toRgb(value).map(x=>x/255).map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4);
    return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;
   };
   const contrast=(a,b)=>{const x=luminosity(a),y=luminosity(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);};
   return ['barrier','place','support'].map(id=>{
    const style=getComputedStyle(document.getElementById(id));
    return {id,border:style.borderTopColor,background:style.backgroundColor,ratio:contrast(style.borderTopColor,style.backgroundColor)};
   });
  });
  for(const control of ratios){
   expect(control.ratio,JSON.stringify(control)).toBeGreaterThanOrEqual(3.2);
  }
 });
}

for(const width of [320,1366]){
 test('public-release draft allows search indexing and link discovery at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:840});
  await page.goto(url);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow');
  await expect(page.getByRole('heading',{name:'Everyday Access Check',level:1})).toBeVisible();
  await expect(page.locator('header nav').getByRole('link',{name:'Aging & Accessibility'})).toHaveAttribute('href','../index.html?area=Aging%20%26%20Accessibility');
 });
}

test('320px viewport remains readable with 200% document font and no horizontal overflow',async({page})=>{
 await page.setViewportSize({width:320,height:720});
 await page.goto(url);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 await expect(page.getByLabel('What is making this routine hard?')).toBeVisible();
 const m=await page.evaluate(()=>{
   const h=document.querySelector('h1'),node=h.firstChild,text=node.textContent,range=document.createRange();
   const spans=[];let at=0;for(const word of text.match(/\S+/g)){const i=text.indexOf(word,at);range.setStart(node,i);range.setEnd(node,i+word.length);spans.push({word,lineRects:range.getClientRects().length});at=i+word.length;}
   return {screen:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth,headingPx:parseFloat(getComputedStyle(h).fontSize),bodyPx:parseFloat(getComputedStyle(document.body).fontSize),spans};
 });
 expect(Math.max(m.html,m.body),JSON.stringify(m)).toBeLessThanOrEqual(m.screen+1);
 expect(m.spans.every(x=>x.lineRects===1),JSON.stringify(m.spans)).toBe(true);
 expect(m.headingPx).toBeGreaterThanOrEqual(m.bodyPx);
});

for(const width of [320,390]){
 test('200%-text narrow lesson cards keep usable reading width at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:720});
  await page.goto(url);
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  const info=await page.evaluate(()=>{
   const lesson=document.querySelector('article.lesson');
   const node=document.querySelector('.lead').firstChild;
   const match=/accommodation/.exec(node.textContent);
   const range=document.createRange();
   range.setStart(node,match.index);
   range.setEnd(node,match.index+match[0].length);
   return {
    screen:innerWidth,
    body:document.body.scrollWidth,
    html:document.documentElement.scrollWidth,
    lessonWidth:lesson.getBoundingClientRect().width,
    paragraphFont:parseFloat(getComputedStyle(lesson.querySelector('dd')).fontSize),
    introWordRects:[...range.getClientRects()].filter(rect=>rect.width>.5).length
   };
  });
  expect(Math.max(info.body,info.html),JSON.stringify(info)).toBeLessThanOrEqual(info.screen+1);
  expect(info.lessonWidth,JSON.stringify(info)).toBeGreaterThanOrEqual(260);
  expect(info.paragraphFont,JSON.stringify(info)).toBeGreaterThanOrEqual(32);
  expect(info.introWordRects,JSON.stringify(info)).toBe(1);
 });
}

test('390px closed support selection has an adjacent, readable full choice',async({page})=>{
 await page.setViewportSize({width:390,height:840});
 await page.goto(url);
 await expect(page.locator('#supportChoice')).toBeHidden();
 await page.locator('#barrier').selectOption('movement');
 await page.locator('#place').selectOption('home');
 await page.locator('#support').selectOption('ask');
 const echo=page.locator('#supportChoice');
 await expect(echo).toBeVisible();
 await expect(echo).toHaveText('Selected next step: I will ask the person or service what helps');
 const metrics=await page.evaluate(()=>{
  const e=document.querySelector('#supportChoice'),r=e.getBoundingClientRect();
  return {viewport:innerWidth,right:r.right,left:r.left,height:r.height,textWidth:e.scrollWidth,boxWidth:e.clientWidth,scroll:document.documentElement.scrollWidth};
 });
 expect(metrics.right).toBeLessThanOrEqual(metrics.viewport);
 expect(metrics.textWidth).toBeLessThanOrEqual(metrics.boxWidth+1);
 expect(metrics.height).toBeGreaterThan(30);
 expect(metrics.scroll).toBeLessThanOrEqual(metrics.viewport+1);
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#reviewed')).toBeVisible();
 await page.locator('#support').selectOption('professional');
 await expect(echo).toHaveText('Selected next step: I need qualified assistance before proceeding');
 await expect(page.locator('#reviewed')).toBeHidden();
 page.once('dialog',d=>d.dismiss());
 await page.getByRole('button',{name:'Clear choices'}).click();
 await expect(echo).toBeVisible();
 page.once('dialog',d=>d.accept());
 await page.getByRole('button',{name:'Clear choices'}).click();
 await expect(echo).toBeHidden();
 await expect(echo).toBeEmpty();
});

test('each barrier yields an honest concrete review with a stop condition',async({page})=>{
 await page.goto(url);
 const expected={
  movement:'Unsafe transfers',vision:'Sudden vision loss',hearing:'Safety-critical alarm systems',information:'For access to records',energy:'New or worsening symptoms'
 };
 for(const [key,stop] of Object.entries(expected)){
  await page.locator('#barrier').selectOption(key);
  await page.locator('#place').selectOption('home');
  await page.locator('#support').selectOption('observe');
  await page.getByRole('button',{name:'Review my access plan'}).click();
  await expect(page.locator('#reviewed')).toBeVisible();
  await expect(page.locator('#preview')).toContainText(stop);
  await expect(page.locator('#preview')).toContainText('Check success:');
  await expect(page.getByRole('button',{name:'Print reviewed plan'})).toBeEnabled();
 }
});

test('different places and seeking qualified support alter the plan without promising services',async({page})=>{
 await page.goto(url);
 await page.locator('#barrier').selectOption('hearing');
 await page.locator('#place').selectOption('community');
 await page.locator('#support').selectOption('professional');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#preview')).toContainText('contact the venue or transport provider');
 await expect(page.locator('#preview')).toContainText('pause the risky part');
 await expect(page.locator('#preview')).toContainText('Stop and ask for help:');
 await expect(page.locator('#preview')).not.toContainText('guaranteed');
});

test('missing and partial choices cannot generate a completed plan',async({page})=>{
 await page.goto(url);
 await expect(page.getByRole('button',{name:'Print reviewed plan'})).toBeDisabled();
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#reviewed')).toBeHidden();
 expect(await page.locator('#barrier').evaluate(el=>el.validity.valueMissing)).toBe(true);
 await page.locator('#barrier').selectOption('movement');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#reviewed')).toBeHidden();
 expect(await page.locator('#place').evaluate(el=>el.validity.valueMissing)).toBe(true);
});

test('changes invalidate old plan; cancel clear preserves; confirm clear resets',async({page})=>{
 await page.goto(url);
 await page.locator('#barrier').selectOption('vision');
 await page.locator('#place').selectOption('appointment');
 await page.locator('#support').selectOption('ask');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#reviewed')).toBeVisible();
 await page.locator('#place').selectOption('home');
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.getByRole('button',{name:'Print reviewed plan'})).toBeDisabled();
 await page.getByRole('button',{name:'Review my access plan'}).click();
 page.once('dialog',dialog=>dialog.dismiss());
 await page.getByRole('button',{name:'Clear choices'}).click();
 await expect(page.locator('#barrier')).toHaveValue('vision');
 await expect(page.locator('#reviewed')).toBeVisible();
 page.once('dialog',dialog=>dialog.accept());
 await page.getByRole('button',{name:'Clear choices'}).click();
 await expect(page.locator('#barrier')).toHaveValue('');
 await expect(page.locator('#place')).toHaveValue('');
 await expect(page.locator('#support')).toHaveValue('');
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.getByRole('button',{name:'Print reviewed plan'})).toBeDisabled();
});

test('printing without an approved review keeps the static guide, not an empty plan',async({page})=>{
 await page.goto(url);
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.locator('article.lesson').first()).toBeVisible();
 await expect(page.getByRole('heading',{name:'Paper or offline worksheet'})).toBeVisible();
 await expect(page.locator('body')).not.toHaveClass(/print-reviewed/);
});

test('print reviewed plan shows only the selected outcome, then edit invalidates it',async({page})=>{
 await page.goto(url);
 await page.evaluate(()=>{window.__printCount=0;window.print=()=>window.__printCount++;});
 await expect(page.locator('#printPlan')).toBeDisabled();
 await page.locator('#barrier').selectOption('movement');
 await page.locator('#place').selectOption('home');
 await page.locator('#support').selectOption('ask');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#reviewed')).toBeVisible();
 await expect(page.locator('body')).toHaveClass(/print-reviewed/);
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#preview')).toContainText('Check success:');
 await expect(page.locator('#reviewed')).toBeVisible();
 await expect(page.locator('article.lesson').first()).toBeHidden();
 await expect(page.getByRole('heading',{name:'Paper or offline worksheet'})).toBeHidden();
 await expect(page.locator('#noJsHelp')).toBeHidden();
 await page.emulateMedia({media:'screen'});
 await page.locator('#printPlan').click();
 expect(await page.evaluate(()=>window.__printCount)).toBe(1);
 await page.locator('#barrier').selectOption('hearing');
 await expect(page.locator('body')).not.toHaveClass(/print-reviewed/);
 await expect(page.locator('#reviewed')).toBeHidden();
 await expect(page.locator('#printPlan')).toBeDisabled();
 await page.emulateMedia({media:'print'});
 await expect(page.locator('article.lesson').first()).toBeVisible();
 await expect(page.locator('#reviewed')).toBeHidden();
});

test('fictional scenario has blank, appropriate, unsafe and reset feedback',async({page})=>{
 await page.goto(url);
 await page.locator('#checkAnswer').click();
 await expect(page.locator('#feedback')).toContainText('Choose an answer');
 await page.locator('input[name="answer"][value="b"]').check();
 await page.locator('#checkAnswer').click();
 await expect(page.locator('#feedback')).toContainText('may be unsafe');
 await page.locator('input[name="answer"][value="c"]').check();
 await page.locator('#checkAnswer').click();
 await expect(page.locator('#feedback')).toContainText('Do not remove');
 await page.locator('input[name="answer"][value="a"]').check();
 await page.locator('#checkAnswer').click();
 await expect(page.locator('#feedback')).toContainText('Best first step');
 await page.locator('#resetAnswer').click();
 await expect(page.locator('input[name="answer"]:checked')).toHaveCount(0);
 await expect(page.locator('#feedback')).toContainText('Choice cleared');
});

for(const width of [320,1366]){
 test('changing a safety quiz selection invalidates previous feedback at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:850});
  await page.goto(url);
  const feedback=page.locator('#feedback');
  await page.locator('input[name="answer"][value="a"]').check();
  await page.locator('#checkAnswer').click();
  await expect(feedback).toContainText('Best first step');
  await page.locator('input[name="answer"][value="b"]').check();
  await expect(feedback).toContainText('Choice selected. Check my reasoning for feedback.');
  await expect(feedback).not.toContainText('Best first step');
  await page.locator('#checkAnswer').click();
  await expect(feedback).toContainText('may be unsafe');
  await page.locator('input[name="answer"][value="a"]').check();
  await expect(feedback).toContainText('Choice selected. Check my reasoning for feedback.');
  await expect(feedback).not.toContainText('may be unsafe');
  await page.locator('#checkAnswer').click();
  await expect(feedback).toContainText('Best first step');
 });
}

test('keyboard access and accessible structure',async({page})=>{
 await page.goto(url);
 await page.getByRole('link',{name:'Skip to the Everyday Access Check'}).focus();
 await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/#main$/);
 await page.locator('#barrier').focus();
 await page.keyboard.press('m');
 await page.keyboard.press('Tab');
 await expect(page.locator('#place')).toBeFocused();
 await expect(page.getByRole('status')).toHaveCount(2);
 await expect(page.getByRole('group',{name:'What is the best first action?'})).toBeVisible();
 await expect(page.locator('details summary')).toBeVisible();
});

test('all lessons, safety boundaries and paper worksheet remain available with JavaScript disabled',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto(url);
  await expect(page.locator('article.lesson')).toHaveCount(5);
  await expect(page.getByRole('heading',{name:'Paper or offline worksheet'})).toBeVisible();
  await expect(page.locator('#noJsHelp')).toBeVisible();
  await expect(page.locator('#noJsHelp')).toContainText('The interactive planner is unavailable.');
  await expect(page.locator('#planForm')).toBeHidden();
  await page.locator('details summary').click();
  await expect(page.getByText('First ask the person and arrange a clear, safe route.')).toBeVisible();
  await page.emulateMedia({media:'print'});
  await expect(page.locator('#reviewed')).toBeHidden();
  await expect(page.locator('article.lesson').first()).toBeVisible();
  await expect(page.getByRole('heading',{name:'Paper or offline worksheet'})).toBeVisible();
  const m=await page.evaluate(()=>({width:innerWidth,body:document.body.scrollWidth,html:document.documentElement.scrollWidth}));
  expect(Math.max(m.body,m.html)).toBeLessThanOrEqual(m.width+1);
 }finally{await context.close();}
});

test('no tracking, network writes, cross-origin loads or stored visitor state',async({page})=>{
 const writes=[],thirdParty=[];
 page.on('request',req=>{
  if(!['GET','HEAD'].includes(req.method()))writes.push(req.method()+' '+req.url());
  if(!req.url().startsWith('http://127.0.0.1:8765/')&&!req.url().startsWith('data:'))thirdParty.push(req.url());
 });
 await page.goto(url);
 await page.locator('#barrier').selectOption('information');
 await page.locator('#place').selectOption('appointment');
 await page.locator('#support').selectOption('professional');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await page.locator('input[name="answer"][value="a"]').check();
 await page.locator('#checkAnswer').click();
 expect(writes).toEqual([]);
 expect(thirdParty).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage),cookies:document.cookie}))).toEqual({local:[],session:[],cookies:''});
});

for(const width of [320,1366]){
 test('accepted care and Aging links work after actual visitor clicks at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:840});
  await page.goto(url);
  await page.getByRole('link',{name:'Family Handoff Toolkit'}).click();
  await expect(page).toHaveURL(/\/one-place\/family-handoff\.html$/);
  await expect(page.getByRole('heading',{level:1,name:'Share the care. Make the next step clear.'})).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('heading',{level:1,name:'Everyday Access Check'})).toBeVisible();

  await page.getByRole('link',{name:'Care Navigation Guide'}).click();
  await expect(page).toHaveURL(/\/one-place\/care-navigation\.html$/);
  await expect(page.getByRole('heading',{level:1,name:'Care Navigation Guide'})).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('heading',{level:1,name:'Everyday Access Check'})).toBeVisible();

  await page.locator('header nav').getByRole('link',{name:'Aging & Accessibility'}).click();
  await expect(page).toHaveURL(/\/index\.html\?area=Aging%20%26%20Accessibility$/);
  await expect(page.getByRole('heading',{level:1,name:'Aging & Accessibility'})).toBeVisible();
  await expect(page.getByText('Find older-adult community resources')).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('heading',{level:1,name:'Everyday Access Check'})).toBeVisible();
 });
}

test('external evidence and area navigation are explicit and non-invasive',async({page})=>{
 await page.goto(url);
 const resources=page.locator('.source-links a[href^="https://"]');
 await expect(resources).toHaveCount(7);
 for(const a of await resources.all()){
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(a).toContainText('external');
 }
 await expect(page.getByText('UK services only')).toBeVisible();
 await expect(page.locator('header nav a').first()).toHaveAttribute('href','../index.html?area=Aging%20%26%20Accessibility');
 await expect(page.getByRole('link',{name:'Family Handoff Toolkit'})).toHaveAttribute('href','family-handoff.html');
 await expect(page.getByRole('link',{name:'Care Navigation Guide'})).toHaveAttribute('href','care-navigation.html');
});
