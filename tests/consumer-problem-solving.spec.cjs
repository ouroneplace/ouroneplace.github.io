const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const url='/one-place/consumer-problem-solving.html',cases=['purchase','financial','scam'];
test('consumer practice has three fictional cases with practical evidence, questions and correct agency roles',async({page})=>{
 await page.goto(url);
 await expect(page).toHaveTitle(/Consumer Problem-Solving Practice/);
 await expect(page.locator('#facts')).toBeEnabled();
 await expect(page.locator('#request')).toBeEnabled();
 await expect(page.locator('.practice input[type="radio"]:enabled')).toHaveCount(9);
 await expect(page.locator('.case')).toHaveCount(3);await expect(page.locator('.case:visible')).toHaveCount(1);
 for(const id of cases){
  await page.locator('[data-select="'+id+'"]').click();
  await expect(page.locator('#'+id)).toBeVisible();
  await expect(page.locator('.case:visible')).toHaveCount(1);
  await expect(page.locator('#'+id+' [data-evidence]')).toHaveCount(3);
  await expect(page.locator('#'+id+' .twocol ol li')).toHaveCount(3);
  await expect(page.locator('[data-select="'+id+'"]')).toHaveAttribute('aria-current','page');
 }
 await expect(page.locator('#scam .agency')).toContainText('not a refund hotline');
});
test('each fictional case teaches blank, less-safe and safer decisions',async({page})=>{
 await page.goto(url);
 for(const [index,id] of cases.entries()){
  if(index>0)page.once('dialog',d=>d.accept());
  await page.locator('[data-select="'+id+'"]').click();
  const quiz=page.locator('#'+id+' .practice'),radios=quiz.getByRole('radio');
  await quiz.getByRole('button',{name:'Check my reasoning'}).click();
  await expect(quiz.getByRole('status')).toContainText('Choose an action');
  await expect(radios.first()).toBeFocused();
  const correct=Number(await quiz.getAttribute('data-correct'));
  await radios.nth((correct+1)%3).check();await quiz.getByRole('button',{name:'Check my reasoning'}).click();
  await expect(quiz.getByRole('status')).not.toContainText('Good reasoning');
  await radios.nth(correct).check();await expect(quiz.getByRole('status')).toBeEmpty();
  await quiz.getByRole('button',{name:'Check my reasoning'}).click();
  await expect(quiz.getByRole('status')).toContainText('Good reasoning');
 }
});
test('quiz-only choices and feedback survive canceled case switches and clear only with consent',async({page})=>{
 await page.goto(url);
 const radio=page.locator('#purchase .practice input[type="radio"]').first();
 const feedback=page.locator('#purchase .practice .feedback');
 await radio.check();
 await page.locator('#purchase .practice [data-check]').click();
 await expect(feedback).toContainText('Sharing payment details publicly is unsafe');
 const saved=await feedback.textContent();
 page.once('dialog',d=>{
  expect(d.message()).toContain('practice choices');
  d.dismiss();
 });
 await page.locator('[data-select="financial"]').click();
 await expect(page).toHaveURL(/#purchase$/);
 await expect(page.locator('#purchase')).toBeVisible();
 await expect(radio).toBeChecked();
 await expect(feedback).toHaveText(saved);
 await expect(page.locator('#facts')).toHaveValue(/Sample Store/);
 await expect(page.locator('#planText')).toBeHidden();
 page.once('dialog',d=>d.accept());
 await page.locator('[data-select="financial"]').click();
 await expect(page.locator('#financial')).toBeVisible();
 await expect(page.locator('#financial')).toBeFocused();
 await expect(radio).not.toBeChecked();
 await expect(feedback).toBeEmpty();
 await expect(page.locator('#facts')).toHaveValue(/Example Bank/);
 await page.locator('[data-select="scam"]').click();
 await expect(page.locator('#scam')).toBeVisible();
});
test('draft validation preserves edits, focuses missing field, blocks stale export',async({page})=>{
 await page.goto(url+'#purchase');
 await page.locator('#facts').fill('');await page.getByRole('button',{name:'Review my plan'}).click();
 await expect(page.getByRole('status').last()).toContainText('at least 15 characters');
 await expect(page.locator('#facts')).toBeFocused();
 await page.locator('#facts').fill('A fictional item did not arrive after delivery was claimed.');
 await page.locator('#request').fill('');await page.getByRole('button',{name:'Review my plan'}).click();
 await expect(page.locator('#request')).toBeFocused();
 await expect(page.getByRole('button',{name:'Download reviewed text'})).toBeDisabled();
 await page.locator('#request').fill('Please investigate and offer the available options.');
 await page.locator('#purchase [data-evidence]').first().check();
 await page.getByRole('button',{name:'Review my plan'}).click();
 await expect(page.locator('#planText')).toContainText('A fictional item did not arrive');
 await expect(page.locator('#planText')).toContainText('Receipt or order confirmation');
 await expect(page.getByRole('button',{name:'Download reviewed text'})).toBeEnabled();
 await page.locator('#request').fill('I changed my practice request.');
 await expect(page.locator('#planText')).toBeHidden();
 await expect(page.getByRole('button',{name:'Download reviewed text'})).toBeDisabled();
 await expect(page.locator('#facts')).toHaveValue('A fictional item did not arrive after delivery was claimed.');
});
test('canceling case switch preserves editable work; confirming replaces with fictional starter',async({page})=>{
 await page.goto(url);
 await page.locator('#facts').fill('This is fictional information entered just for a practice session.');
 page.once('dialog',dialog=>dialog.dismiss());await page.locator('[data-select="financial"]').click();
 await expect(page.locator('#purchase')).toBeVisible();
 await expect(page.locator('#facts')).toHaveValue('This is fictional information entered just for a practice session.');
 page.once('dialog',dialog=>dialog.accept());await page.locator('[data-select="financial"]').click();
 await expect(page.locator('#financial')).toBeVisible();
 await expect(page.locator('#facts')).toHaveValue(/Example Bank/);
 await expect(page.locator('#purchase')).toBeHidden();
});
test('case switching protects evidence-only marks and reviewed plans without text edits',async({page})=>{
 await page.goto(url);
 const checked=page.locator('#purchase [data-evidence]').first();
 await checked.check();
 page.once('dialog',d=>d.dismiss());
 await page.locator('[data-select="financial"]').click();
 await expect(page.locator('#purchase')).toBeVisible();
 await expect(page).toHaveURL(/#purchase$/);
 await expect(checked).toBeChecked();
 await checked.uncheck();
 await page.getByRole('button',{name:'Review my plan'}).click();
 await expect(page.locator('#planText')).toBeVisible();
 await expect(page.getByRole('button',{name:'Download reviewed text'})).toBeEnabled();
 page.once('dialog',d=>d.dismiss());
 await page.locator('[data-select="financial"]').click();
 await expect(page.locator('#purchase')).toBeVisible();
 await expect(page.locator('#planText')).toContainText('A purchase that did not arrive');
 await expect(page.getByRole('button',{name:'Download reviewed text'})).toBeEnabled();
 page.once('dialog',d=>d.accept());
 await page.locator('[data-select="financial"]').click();
 await expect(page.locator('#financial')).toBeVisible();
 await expect(page.locator('#planText')).toBeHidden();
 await expect(page.locator('#facts')).toHaveValue(/Example Bank/);
});
test('keyboard case navigation focuses the displayed lesson without discarding a privacy-reviewed plan',async({page})=>{
 await page.goto(url);
 const link=page.locator('[data-select="scam"]');
 await link.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#scam')).toBeVisible();
 await expect(page.locator('#scam')).toBeFocused();
 await page.keyboard.press('Tab');
 const box=page.locator('#scam [data-evidence]').first();
 await expect(box).toBeFocused();
 await page.keyboard.press('Space');await expect(box).toBeChecked();
 await page.getByRole('button',{name:'Review my plan'}).click();
 await expect(page.locator('#planText')).toContainText('A suspicious prize message');
 await page.getByRole('link',{name:'Privacy & limits'}).click();
 await expect(page.locator('#scam')).toBeVisible();
 await expect(page.locator('#planText')).toBeVisible();
 page.once('dialog',d=>d.accept());
 const second=page.locator('[data-select="financial"]');
 await second.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#financial')).toBeFocused();
 await expect(page.locator('#planText')).toBeHidden();
 await expect(page.getByRole('button',{name:'Download reviewed text'})).toBeDisabled();
});
test('reset cancel preserves work; reset accept clears checkboxes and reviewed plan',async({page})=>{
 await page.goto(url);
 await page.locator('#purchase [data-evidence]').first().check();
 await page.locator('#facts').fill('A fictional item arrived with the wrong accessory supplied.');
 await page.getByRole('button',{name:'Review my plan'}).click();
 page.once('dialog',d=>d.dismiss());await page.getByRole('button',{name:'Reset fictional practice'}).click();
 await expect(page.locator('#facts')).toHaveValue('A fictional item arrived with the wrong accessory supplied.');
 await expect(page.locator('#planText')).toBeVisible();
 page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Reset fictional practice'}).click();
 await expect(page.locator('#facts')).toHaveValue(/Sample Store/);
 await expect(page.locator('[data-evidence]:checked')).toHaveCount(0);
 await expect(page.locator('#planText')).toBeHidden();
});
test('reviewed file download needs consent and preserves exact text',async({page})=>{
 await page.goto(url+'#financial');
 await page.getByRole('button',{name:'Review my plan'}).click();
 page.once('dialog',d=>d.dismiss());await page.getByRole('button',{name:'Download reviewed text'}).click();
 await expect(page.getByRole('status').last()).toContainText('canceled');
 page.once('dialog',d=>d.accept());const event=page.waitForEvent('download');
 await page.getByRole('button',{name:'Download reviewed text'}).click();
 const d=await event;expect(d.suggestedFilename()).toBe('one-place-consumer-problem-solving.txt');
 const content=fs.readFileSync(await d.path(),'utf8');
 expect(content).toContain('An unexplained financial charge');
 expect(content).toContain('CFPB');expect(content).toContain('Fictional example');
});
test('user-edited text is displayed as text, not inserted markup',async({page})=>{
 await page.goto(url);const injection='<img src=x onerror=alert(1)> an example remains plain text.';
 await page.locator('#facts').fill(injection);
 await page.getByRole('button',{name:'Review my plan'}).click();
 await expect(page.locator('#planText')).toContainText(injection);
 await expect(page.locator('#planText img')).toHaveCount(0);
});
test('privacy link never erases a reviewed plan or causes the chosen case to switch',async({page})=>{
 await page.goto(url+'#scam');await page.getByRole('button',{name:'Review my plan'}).click();
 await page.getByRole('link',{name:'Privacy & limits'}).click();
 await expect(page.locator('#scam')).toBeVisible();
 await expect(page.locator('#planText')).toContainText('A suspicious prize message');
 await expect(page.getByRole('button',{name:'Download reviewed text'})).toBeEnabled();
});
test('no-JavaScript view retains all fictional lessons, source links and paper fallback',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{const page=await context.newPage();await page.goto(url);
 await expect(page.locator('.case:visible')).toHaveCount(3);
 await expect(page.locator('noscript')).toBeVisible();
 expect(await page.locator('noscript').evaluate(el=>el.outerHTML)).toContain('JavaScript is off');
 await expect(page.getByRole('button',{name:'Review my plan'})).toBeDisabled();
 await expect(page.locator('#facts')).toBeDisabled();
 await expect(page.locator('#request')).toBeDisabled();
 await expect(page.locator('.practice input[type="radio"]')).toHaveCount(9);
 await expect(page.locator('.practice input[type="radio"]:disabled')).toHaveCount(9);
 await expect(page.locator('#scam .official a')).toHaveCount(3);
 const d=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,body:document.body.scrollWidth,win:innerWidth}));
 expect(Math.max(d.doc,d.body)).toBeLessThanOrEqual(d.win+1);
 }finally{await context.close();}
});
for(const width of [320,390,1366,1920]){
 test('mobile/desktop layout reflows at '+width,async({page})=>{
  await page.setViewportSize({width,height:760});await page.goto(url+'#financial');
  await page.getByRole('button',{name:'Review my plan'}).click();
  const d=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,body:document.body.scrollWidth,win:innerWidth}));
  expect(Math.max(d.doc,d.body)).toBeLessThanOrEqual(d.win+1);
 });
}
test('320px with 200 percent text allows keyboard practice, review, reflow',async({page})=>{
 await page.setViewportSize({width:320,height:740});await page.goto(url);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const link=page.locator('[data-select="scam"]');await link.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#scam')).toBeVisible();
 const option=page.locator('#scam .practice input[type="radio"]').first();
 await option.focus();await page.keyboard.press('Space');await expect(option).toBeChecked();
 await page.getByRole('button',{name:'Check my reasoning'}).focus();await page.keyboard.press('Enter');
 await expect(page.locator('#scam .feedback')).toContainText('Good reasoning');
 await page.getByRole('button',{name:'Review my plan'}).focus();await page.keyboard.press('Enter');
 await expect(page.locator('#planText')).toContainText('A suspicious prize message');
 const d=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,body:document.body.scrollWidth,win:innerWidth}));
 const overflowing=await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.left<-1||r.right>innerWidth+1)}).slice(0,7).map(el=>el.tagName.toLowerCase()+'#'+el.id+'.'+el.className));
 expect(Math.max(d.doc,d.body),'Overflow elements: '+JSON.stringify(overflowing)).toBeLessThanOrEqual(d.win+1);
});
test('privacy has no network writes, outside scripts, silent outbound requests or persistence',async({page})=>{
 const third=[],writes=[];
 page.on('request',r=>{if(!r.url().startsWith('http'))return;
 if(!['localhost','127.0.0.1'].includes(new URL(r.url()).hostname))third.push(r.url());
 if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
 });
 await page.goto(url);await page.locator('#facts').fill('A fictional problem happened and this is just a practice test.');
 await page.getByRole('button',{name:'Review my plan'}).click();
 expect(third).toEqual([]);expect(writes).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await expect(page.locator('script[src]')).toHaveCount(0);
 await page.reload();await expect(page.locator('#facts')).toHaveValue(/Sample Store/);
 await expect(page.locator('#planText')).toBeHidden();
});
test('external sources are official verified HTTPS with safe link isolation',async({page})=>{
 await page.goto(url);const links=page.locator('a[href^="https://"]');
 expect(await links.count()).toBeGreaterThan(10);
 for(const link of await links.all()){
 await expect(link).toHaveAttribute('target','_blank');
 await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
 await expect(link).toContainText('(external)');
 const u=await link.getAttribute('href');
 expect(/^https:\/\/(consumer\.ftc\.gov|reportfraud\.ftc\.gov|www\.usa\.gov|www\.consumerfinance\.gov)\//.test(u)).toBe(true);
 }
 await expect(page.locator('#limits')).toContainText('not pause all legal clocks');
});

for(const width of [320,390]){
 test('consumer label words remain intact with 200 percent text at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:780});await page.goto(url);
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  for(const id of cases){
   await page.locator('[data-select="'+id+'"]').click();
   await expect(page.locator('#'+id)).toBeVisible();
   const result=await page.evaluate(()=>{
    const broken=[];
    for(const el of document.querySelectorAll('h1,h2,h3,h4,.routes a,.actions button,.practice legend,.practice label,.fieldrow label,.eyebrow')){
     if(el.getClientRects().length===0)continue;
     const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
     while((node=walker.nextNode())){
      const words=/[A-Za-z]{4,}/g;let m;
      while((m=words.exec(node.textContent))){
       const range=document.createRange();range.setStart(node,m.index);range.setEnd(node,m.index+m[0].length);
       if(range.getClientRects().length>1)broken.push(el.tagName.toLowerCase()+': '+m[0]);
      }
     }
    }
    return {broken,documentWidth:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),viewport:innerWidth,bodyFont:parseFloat(getComputedStyle(document.body).fontSize),h1Font:parseFloat(getComputedStyle(document.querySelector('h1')).fontSize)};
   });
   expect(result.broken,'Mid-word label breaks in '+id+': '+JSON.stringify(result.broken)).toEqual([]);
   expect(result.documentWidth).toBeLessThanOrEqual(result.viewport+1);
   expect(result.bodyFont).toBeGreaterThanOrEqual(32);
   expect(result.h1Font).toBeGreaterThan(result.bodyFont);
  }
  await page.getByRole('button',{name:'Review my plan'}).click();
  await expect(page.locator('#planText')).toContainText('A suspicious prize message');
  const overflow=await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
 });
}
