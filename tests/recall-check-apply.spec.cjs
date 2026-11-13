const {test,expect}=require('@playwright/test');
const route='/one-place/recall-check-apply.html';

async function explain(page,question,choice){
 const form=page.locator('form[data-question="'+question+'"]');
 await form.locator('input[value="'+choice+'"]').check();
 await form.getByRole('button',{name:/Explain this/}).click();
}
test('read, hide, recall, compare and apply one fictional source',async({page})=>{
 await page.goto(route);
 await expect(page.getByRole('heading',{level:1,name:'Recall, Check, Apply'})).toBeVisible();
 await expect(page.locator('#original')).toHaveAttribute('open','');
 await page.locator('#try').click();
 await expect(page.locator('#original')).not.toHaveAttribute('open','');
 await expect(page.locator('#recall')).toBeFocused();
 await page.locator('#recall').fill('Paper is provided and pencil is optional.');
 await page.locator('#compare').click();
 await expect(page.locator('#reference')).toBeVisible();
 await expect(page.locator('#reference')).toContainText('Saturday, 10:00 a.m.');
 await expect(page.locator('#recall')).toHaveValue('Paper is provided and pencil is optional.');
 await explain(page,0,1);
 await expect(page.locator('#feedback1')).toContainText('matches the source');
 await explain(page,1,2);
 await expect(page.locator('#feedback2')).toContainText('other supports unspecified');
 await explain(page,2,1);
 await expect(page.locator('#feedback3')).toContainText('optional pencil and step-free side entrance');
});

test('memory text never gets scored, interpreted or overwritten when original is reopened',async({page})=>{
 await page.goto(route);
 await page.locator('#recall').fill('An uncertain memory that may be mistaken');
 await page.locator('#compare').click();
 await expect(page.locator('#recallStatus')).toContainText('has not read or graded');
 await page.locator('#show').click();
 await expect(page.locator('#original')).toHaveAttribute('open','');
 await expect(page.locator('#recall')).toHaveValue('An uncertain memory that may be mistaken');
 await page.locator('#clearRecall').click();
 await expect(page.locator('#recall')).toHaveValue('');
 await expect(page.locator('#reference')).toBeHidden();
 await expect(page.locator('#recall')).toBeFocused();
});

test('blank recall is allowed to compare immediately and recover',async({page})=>{
 await page.goto(route);
 await expect(page.locator('#recall')).toHaveValue('');
 await page.locator('#compare').click();
 await expect(page.locator('#reference')).toBeVisible();
 await expect(page.locator('#recallStatus')).toContainText('not read or graded');
});

test('all three answers for every question give distinct specific feedback and no numeric grade',async({page})=>{
 await page.goto(route);
 const phrases=[
  ['required is too strong','matches the source','not say pencils are supplied'],
  ['does not establish','does not prove unavailable','other supports unspecified'],
  ['not proof Mina cannot attend','optional pencil and step-free','does not guarantee pencils']
 ];
 for(let i=0;i<3;i++)for(let j=0;j<3;j++){
  await explain(page,i,j);
  await expect(page.locator('#feedback'+(i+1))).toContainText(phrases[i][j]);
  await expect(page.locator('#feedback'+(i+1))).toContainText('not a score');
 }
});

test('blank choice is explained, changing choice clears stale explanation',async({page})=>{
 await page.goto(route);
 await page.locator('form[data-question="0"] button[type=submit]').click();
 await expect(page.locator('#feedback1')).toContainText('Select an option');
 await expect(page.locator('#feedback1')).toHaveClass(/warning/);
 await explain(page,0,1);
 await expect(page.locator('#feedback1')).toContainText('matches the source');
 await page.locator('form[data-question="0"] input[value="2"]').check();
 await expect(page.locator('#feedback1')).toContainText('Choice changed');
 await expect(page.locator('#feedback1')).not.toContainText('matches the source');
 await page.locator('form[data-question="0"] button[type=submit]').click();
 await expect(page.locator('#feedback1')).toContainText('not say pencils are supplied');
 await expect(page.locator('#feedback1')).not.toHaveClass(/warning/);
});

test('transfer writing is editable, separate from recall, and can be cleared independently',async({page})=>{
 await page.goto(route);
 await page.locator('#recall').fill('Optional note');
 await page.locator('#next').fill('I will verify my sources and ask what is unknown.');
 await page.locator('#clearNext').click();
 await expect(page.locator('#next')).toHaveValue('');
 await expect(page.locator('#recall')).toHaveValue('Optional note');
 await expect(page.locator('#resetStatus')).toContainText('Your other practice remains');
});

test('reset clears all texts, radio choices and feedback and restores source',async({page})=>{
 await page.goto(route);
 await page.locator('#try').click();
 await page.locator('#recall').fill('Private words');
 await page.locator('#compare').click();
 await explain(page,0,0);
 await explain(page,1,2);
 await explain(page,2,1);
 await page.locator('#next').fill('A generic later action');
 await page.locator('#reset').click();
 await expect(page.locator('#recall')).toHaveValue('');
 await expect(page.locator('#next')).toHaveValue('');
 await expect(page.locator('#original')).toHaveAttribute('open','');
 await expect(page.locator('#reference')).toBeHidden();
 await expect(page.locator('form.practice input:checked')).toHaveCount(0);
 for(const n of [1,2,3])await expect(page.locator('#feedback'+n)).toBeEmpty();
 await expect(page.locator('#sourceStatus')).toBeEmpty();
 await expect(page.locator('#recallStatus')).toBeEmpty();
 await expect(page.locator('#resetStatus')).toContainText('All private practice text and choices cleared');
 await expect(page.locator('#try')).toBeFocused();
});

test('area, home and Human Literacy navigation resolve and sources are opt-in',async({page})=>{
 await page.goto(route);
 const paths=['../index.html','../human-literacy/','../index.html?area=Learning%20%26%20Education'];
 for(const path of paths){
  const res=await page.request.get(new URL(path,page.url()).toString());
  expect(res.status(),path).toBe(200);
 }
 const links=page.locator('a[href^="https://"]');
 await expect(links).toHaveCount(2);
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(link).toContainText('(external)');
 }
 await page.getByRole('link',{name:'Learning area'}).click();
 await expect(page.getByRole('heading',{level:1,name:'Learning & Education',exact:true})).toBeVisible();
});

test('no remote requests, stored state, submissions or persistent learner text',async({page})=>{
 const outside=[];
 page.on('request',req=>{if(!req.url().startsWith('http://127.0.0.1:8765/'))outside.push(req.url());});
 await page.goto(route);
 await page.locator('#recall').fill('Do not send this');
 await page.locator('#next').fill('Do not remember this');
 await explain(page,0,2); await explain(page,1,0); await explain(page,2,1);
 await page.locator('#compare').click();
 expect(outside).toEqual([]);
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
 await page.reload();
 await expect(page.locator('#recall')).toHaveValue('');
 await expect(page.locator('#next')).toHaveValue('');
 await expect(page.locator('input:checked')).toHaveCount(0);
});

for(const width of [320,390,1366,1920]){
 test('reflow at '+width+'px and focusable teaching',async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto(route);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await page.locator('#try').click();
  await expect(page.locator('#recall')).toBeFocused();
  await explain(page,1,2);
  await expect(page.locator('#feedback2')).toContainText('other supports unspecified');
 });
}
test('200 percent text remains usable at 320px',async({page})=>{
 await page.setViewportSize({width:320,height:900});
 await page.goto(route);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await explain(page,0,1);
 await expect(page.locator('#feedback1')).toContainText('matches the source');
 await expect(page.locator('#compare')).toBeVisible();
});

test('section heading words remain complete at phone widths and 200-percent text',async({page})=>{
 for(const {width,enlarged} of [
  {width:320,enlarged:false},
  {width:320,enlarged:true},
  {width:390,enlarged:false},
  {width:390,enlarged:true},
  {width:480,enlarged:true},
  {width:600,enlarged:true}
 ]){
  await page.setViewportSize({width,height:900});
  await page.goto(route);
  if(enlarged)await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
  const layout=await page.evaluate(()=>{
   const headings=[...document.querySelectorAll('main h2')];
   const checked=headings.map(heading=>{
    const words=[];
    const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
    let node;
    while(node=walker.nextNode()){
     for(const match of node.textContent.matchAll(/[\p{L}\p{N}]+/gu)){
      const range=document.createRange();
      range.setStart(node,match.index);
      range.setEnd(node,match.index+match[0].length);
      words.push({word:match[0],fragments:range.getClientRects().length});
     }
    }
    return {title:heading.textContent.trim(),words,size:parseFloat(getComputedStyle(heading).fontSize)};
   });
   return {
    checked,
    root:parseFloat(getComputedStyle(document.documentElement).fontSize),
    htmlWidth:document.documentElement.scrollWidth,
    bodyWidth:document.body.scrollWidth
   };
  });
  expect(layout.checked.length,JSON.stringify({width,enlarged})).toBe(6);
  expect(layout.checked.flatMap(h=>h.words.filter(w=>w.fragments!==1).map(w=>h.title+': '+w.word)),
   JSON.stringify({width,enlarged})).toEqual([]);
  expect(layout.htmlWidth,JSON.stringify({width,enlarged})).toBeLessThanOrEqual(width+1);
  expect(layout.bodyWidth,JSON.stringify({width,enlarged})).toBeLessThanOrEqual(width+1);
  if(enlarged){
   expect(layout.root).toBeGreaterThanOrEqual(32);
   expect(Math.min(...layout.checked.map(h=>h.size))).toBeGreaterThanOrEqual(layout.root*1.14);
  }
 }
});

test('keyboard, semantic labels and announced feedback are operable',async({page})=>{
 await page.goto(route);
 await page.keyboard.press('Tab');
 await expect(page.locator('.skip')).toBeFocused();
 await page.locator('#try').focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#recall')).toBeFocused();
 await page.locator('form[data-question="0"] input[value="1"]').focus();
 await page.keyboard.press('Space');
 await expect(page.locator('form[data-question="0"] input[value="1"]')).toBeChecked();
 await page.locator('form[data-question="0"] button[type=submit]').focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#feedback1')).toContainText('matches the source');
 await expect(page.locator('#feedback1')).toHaveAttribute('role','status');
 await expect(page.locator('fieldset legend')).toHaveCount(3);
 await expect(page.locator('label[for="recall"]')).toHaveCount(1);
 await expect(page.locator('label[for="next"]')).toHaveCount(1);
 await expect(page.locator('#recall')).toHaveAttribute('maxlength','450');
 await expect(page.locator('#next')).toHaveAttribute('maxlength','350');
});

test('reduced motion setting does not change educational result',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(route);
 await page.locator('#try').click();
 await expect(page.locator('#recall')).toBeFocused();
 await page.locator('#compare').click();
 await expect(page.locator('#reference')).toContainText('whether other support or pencils are supplied');
});

test.describe('no JavaScript',()=>{
 test.use({javaScriptEnabled:false});
 test('full lesson, answers, transfer and original source remain accessible',async({page})=>{
  await page.goto(route);
  await expect(page.getByRole('heading',{level:1,name:'Recall, Check, Apply'})).toBeVisible();
  await expect(page.locator('#original')).toHaveAttribute('open','');
  await expect(page.locator('#original')).toContainText('bringing a pencil is optional');
  await expect(page.locator('#try')).toBeHidden();
  await expect(page.locator('form.practice').first()).toBeHidden();
  await expect(page.locator('#recall')).toBeHidden();
  await page.locator('section[aria-labelledby="recallTitle"] details summary').click();
  await expect(page.getByText(/Checking the notice reveals 10:00/)).toBeVisible();
  await page.locator('section[aria-labelledby="applyTitle"] details summary').click();
  await expect(page.getByText(/absence of a pencil does not by itself/)).toBeVisible();
  await expect(page.getByRole('link',{name:/Roediger/})).toBeVisible();
 });
});