const {test,expect}=require('@playwright/test');
const route='/one-place/daily-task-follow-through.html';

async function review(page,move,choice){
 const form=page.locator('form[data-move="'+move+'"]');
 await form.locator('input[value="'+choice+'"]').check();
 await form.getByRole('button',{name:/Reflect on/}).click();
}

test('a visitor can practice all four moves and adapt the result',async({page})=>{
 await page.goto(route);
 await expect(page.getByRole('heading',{level:1,name:'One Task, Four Moves'})).toBeVisible();
 await expect(page.locator('#load')).toBeDisabled();
 await review(page,0,0);await review(page,1,1);await review(page,2,2);await review(page,3,1);
 await expect(page.locator('#count')).toContainText('4 of 4');
 await expect(page.locator('#load')).toBeEnabled();
 await page.locator('#load').click();
 await expect(page.locator('#planCheck')).toHaveValue(/route is clear/);
 await page.locator('#planCheck').fill('Check my own items are ready, not a score');
 await expect(page.locator('#planCheck')).toHaveValue(/not a score/);
});

test('every option has specific reasons; none produces a grade',async({page})=>{
 await page.goto(route);
 const phrases=[
  ['real requirement','spends resources','all-at-once'],
  ['fall','voluntary','barrier to adapt'],
  ['not evidence','helper','original requirement'],
  ['not a personal failure','perceive it','private information']
 ];
 for(let i=0;i<4;i++){
  for(let j=0;j<3;j++){
   await review(page,i,j);
   await expect(page.locator('#feedback'+(i+1))).toContainText(phrases[i][j]);
   await expect(page.locator('#feedback'+(i+1))).toContainText('There is no grade');
  }
 }
});

test('blank submission explains recovery without progress',async({page})=>{
 await page.goto(route);
 await page.locator('form[data-move="2"] button[type=submit]').click();
 await expect(page.locator('#feedback3')).toContainText('Choose a response');
 await expect(page.locator('#feedback3')).toHaveClass(/caution/);
 await expect(page.locator('#count')).toContainText('0 of 4');
 await expect(page.locator('#load')).toBeDisabled();
});

test('editing a selection retracts that move without losing other choices',async({page})=>{
 await page.goto(route);
 for(let i=0;i<4;i++)await review(page,i,0);
 await expect(page.locator('#load')).toBeEnabled();
 await page.locator('form[data-move="1"] input[value="2"]').check();
 await expect(page.locator('#count')).toContainText('3 of 4');
 await expect(page.locator('#load')).toBeDisabled();
 await expect(page.locator('#feedback2')).toContainText('Choice changed');
 await page.locator('form[data-move="1"] button[type=submit]').click();
 await expect(page.locator('#count')).toContainText('4 of 4');
});

test('loading sample never silently overwrites visitor edits',async({page})=>{
 await page.goto(route);
 for(let i=0;i<4;i++)await review(page,i,0);
 await page.locator('#load').click();
 await page.locator('#planPrepare').fill('My fictional plan');
 await page.locator('#load').click();
 await expect(page.locator('#planPrepare')).toHaveValue('My fictional plan');
 await expect(page.locator('#planStatus')).toContainText('No text was overwritten');
 await page.locator('#clear').click();
 await expect(page.locator('#planPrepare')).toHaveValue('');
 await expect(page.locator('#count')).toContainText('4 of 4');
 await page.locator('#load').click();
 await expect(page.locator('#planPrepare')).toHaveValue(/Confirm notebook and pencil/);
});

test('blank typed plan remains editable before answering and is preserved',async({page})=>{
 await page.goto(route);
 await page.locator('#planRemember').fill('My own safe cue');
 for(let i=0;i<4;i++)await review(page,i,0);
 await page.locator('#load').click();
 await expect(page.locator('#planRemember')).toHaveValue('My own safe cue');
});

test('reset clears selections, feedback, text and returns focus to first input',async({page})=>{
 await page.goto(route);
 for(let i=0;i<4;i++)await review(page,i,0);
 await page.locator('#load').click();
 await page.locator('#reset').click();
 await expect(page.locator('input[type=radio]:checked')).toHaveCount(0);
 for(let i=1;i<=4;i++)await expect(page.locator('#feedback'+i)).toBeEmpty();
 for(const id of ['planPrepare','planDo','planCheck','planRemember'])await expect(page.locator('#'+id)).toHaveValue('');
 await expect(page.locator('#count')).toContainText('0 of 4');
 await expect(page.locator('#load')).toBeDisabled();
 await expect(page.locator('form[data-move="0"] input[value="0"]')).toBeFocused();
});

test('source and local routes are real, external links consent-first',async({page})=>{
 await page.goto(route);
 const local=['../index.html','../human-literacy/'];
 for(const href of local){
  const response=await page.request.get(new URL(href,page.url()).toString());
  expect(response.status(),href).toBe(200);
 }
 const external=page.locator('a[href^="https://"]');
 await expect(external).toHaveCount(2);
 for(const a of await external.all()){
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(a).toContainText('(external)');
 }
 await page.getByRole('link',{name:'Daily Life area'}).click();
 await expect(page.getByRole('heading',{level:1,name:'Daily Life & Organization',exact:true})).toBeVisible();
});

test('no third-party connections, storage, uploads or retained text',async({page})=>{
 const external=[];
 page.on('request',req=>{if(!req.url().startsWith('http://127.0.0.1:8765/'))external.push(req.url());});
 await page.goto(route);
 for(let i=0;i<4;i++)await review(page,i,1);
 await page.locator('#load').click();
 await page.locator('#planDo').fill('No personal information');
 expect(external).toEqual([]);
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
 await page.reload();
 await expect(page.locator('#planDo')).toHaveValue('');
 await expect(page.locator('#count')).toContainText('0 of 4');
});

for(const width of [320,390,1366,1920]){
 test('accessible reflow and working feedback at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto(route);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await review(page,0,0);
  await expect(page.locator('#feedback1')).toContainText('real requirement');
 });
}

test('320px screen at 200 percent text does not cause horizontal overflow',async({page})=>{
 await page.setViewportSize({width:320,height:900});
 await page.goto(route);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await review(page,0,0);
 await expect(page.locator('#feedback1')).toContainText('real requirement');
});

test('keyboard path and assistive labeling are provided',async({page})=>{
 await page.goto(route);
 await page.keyboard.press('Tab');
 await expect(page.locator('.skip')).toBeFocused();
 const input=page.locator('form[data-move="0"] input[value="0"]');
 await input.focus();await page.keyboard.press('Space');
 await expect(input).toBeChecked();
 const submit=page.locator('form[data-move="0"] button[type=submit]');
 await submit.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#feedback1')).toContainText('real requirement');
 await expect(page.locator('#feedback1')).toHaveAttribute('role','status');
 await expect(page.locator('fieldset legend')).toHaveCount(4);
 await expect(page.locator('.plan label')).toHaveCount(4);
 for(const id of ['planPrepare','planDo','planCheck','planRemember']){
  await expect(page.locator('label[for="'+id+'"]')).toHaveCount(1);
  await expect(page.locator('#'+id)).toHaveAttribute('maxlength','350');
 }
});

test.describe('no JavaScript',()=>{
 test.use({javaScriptEnabled:false});
 test('teaching and complete example are usable without script',async({page})=>{
  await page.goto(route);
  await expect(page.getByRole('heading',{level:1,name:'One Task, Four Moves'})).toBeVisible();
  await expect(page.locator('form.choice-form')).toHaveCount(4);
  await expect(page.locator('form.choice-form').first()).toBeHidden();
  await expect(page.locator('#planPrepare')).toBeHidden();
  await page.locator('#samplePlan summary').click();
  await expect(page.locator('#samplePlan')).toContainText('Confirm notebook and pencil');
  await page.locator('section[aria-labelledby="rememberTitle"] summary').click();
  await expect(page.getByText(/A short cue like/)).toBeVisible();
  await expect(page.getByRole('link',{name:/Royal College/})).toBeVisible();
 });
});
