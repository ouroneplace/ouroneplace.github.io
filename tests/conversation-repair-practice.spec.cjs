const {test, expect} = require('@playwright/test');

const route='/one-place/conversation-repair-practice.html';

async function reflect(page, step, option){
  await page.locator('form[data-step="'+step+'"] input[value="'+option+'"]').check();
  await page.locator('form[data-step="'+step+'"] button[type=submit]').click();
}
test('real visitor outcome: notice, listen, choose, edit a bounded message', async({page})=>{
  await page.goto(route);
  await expect(page.getByRole('heading',{level:1,name:'Conversation Repair Practice'})).toBeVisible();
  await expect(page.locator('#makeExample')).toBeDisabled();
  await reflect(page,0,0);
  await expect(page.locator('#feedback1')).toContainText('observable information');
  await reflect(page,1,0);
  await expect(page.locator('#feedback2')).toContainText('invites correction');
  await reflect(page,2,0);
  await expect(page.locator('#progress')).toContainText('3 of 3');
  await expect(page.locator('#makeExample')).toBeEnabled();
  await page.locator('#makeExample').click();
  await expect(page.locator('#draft')).toHaveValue(/Could you tell me what you expected/);
  await page.locator('#draft').fill('I heard you needed the counter. Could we agree on tasks tomorrow?');
  await expect(page.locator('#draft')).toHaveValue(/agree on tasks tomorrow/);
  await expect(page.locator('#draftStatus')).toBeEmpty();
});

test('all choices get distinct non-scored feedback, including limits and pauses', async({page})=>{
  await page.goto(route);
  const feedbacks=[
    ['observable information','possible story','motive is unknown'],
    ['invites correction','downplays','Kai did not state','specific pause'],
    ['realistic offer','unlimited promise','Demanding','clear limit']
  ];
  for(let i=0;i<3;i++){
    for(let j=0;j<feedbacks[i].length;j++){
      await reflect(page,i,j);
      await expect(page.locator('#feedback'+(i+1))).toContainText(feedbacks[i][j]);
      await expect(page.locator('#feedback'+(i+1))).toContainText('There is no grade');
    }
  }
  await expect(page.locator('#makeExample')).toBeEnabled();
  await page.locator('#makeExample').click();
  await expect(page.locator('#draft')).toHaveValue(/cannot take another task tonight/);
});

test('blank reflection explains what is needed without changing progress',async({page})=>{
  await page.goto(route);
  await page.locator('form[data-step="0"] button[type=submit]').click();
  await expect(page.locator('#feedback1')).toContainText('Choose an option');
  await expect(page.locator('#feedback1')).toHaveClass(/caution/);
  await expect(page.locator('#progress')).toContainText('0 of 3');
  await expect(page.locator('#makeExample')).toBeDisabled();
});

test('editing a selection invalidates only its prior reflection',async({page})=>{
  await page.goto(route);
  await reflect(page,0,0);
  await reflect(page,1,0);
  await reflect(page,2,0);
  await page.locator('form[data-step="1"] input[value="2"]').check();
  await expect(page.locator('#progress')).toContainText('2 of 3');
  await expect(page.locator('#makeExample')).toBeDisabled();
  await expect(page.locator('#feedback2')).toContainText('Choice changed');
  await page.locator('form[data-step="1"] button[type=submit]').click();
  await expect(page.locator('#progress')).toContainText('3 of 3');
  await expect(page.locator('#feedback2')).toContainText('Kai did not state');
});

test('a typed message is not overwritten by generating an example',async({page})=>{
  await page.goto(route);
  await reflect(page,0,0);await reflect(page,1,0);await reflect(page,2,0);
  await page.locator('#makeExample').click();
  await page.locator('#draft').fill('My own wording and decision');
  await page.locator('#makeExample').click();
  await expect(page.locator('#draft')).toHaveValue('My own wording and decision');
  await expect(page.locator('#draftStatus')).toContainText('Your text has not been changed');
  await page.locator('#clearDraft').click();
  await expect(page.locator('#draft')).toHaveValue('');
  await expect(page.locator('#progress')).toContainText('3 of 3');
  await page.locator('#makeExample').click();
  await expect(page.locator('#draft')).toHaveValue(/I thought I agreed to do dishes/);
});

test('reset clears answers, feedback, editable draft and restores focus',async({page})=>{
  await page.goto(route);
  await reflect(page,0,2);await reflect(page,1,3);await reflect(page,2,3);
  await page.locator('#makeExample').click();
  await page.locator('#resetPractice').click();
  await expect(page.locator('input[type=radio]:checked')).toHaveCount(0);
  await expect(page.locator('#feedback1')).toBeEmpty();
  await expect(page.locator('#feedback2')).toBeEmpty();
  await expect(page.locator('#feedback3')).toBeEmpty();
  await expect(page.locator('#draft')).toHaveValue('');
  await expect(page.locator('#progress')).toContainText('0 of 3');
  await expect(page.locator('#makeExample')).toBeDisabled();
  await expect(page.locator('form[data-step="0"] input[value="0"]')).toBeFocused();
});

test('draft may be freely entered before practice and never auto-replaced by a choice change',async({page})=>{
  await page.goto(route);
  await page.locator('#draft').fill('An original idea');
  await reflect(page,0,0);await reflect(page,1,0);await reflect(page,2,0);
  await page.locator('#makeExample').click();
  await expect(page.locator('#draft')).toHaveValue('An original idea');
  await reflect(page,2,3);
  await expect(page.locator('#draft')).toHaveValue('An original idea');
});

test('navigation stays inside existing experiences with real local routes',async({page})=>{
  await page.goto(route);
  await expect(page.getByRole('link',{name:'Relationships area'})).toHaveAttribute('href','../index.html?area=Relationships%20%26%20Communication');
  const links=['../index.html','../human-literacy/index.html#choose','../lessons/05/','../lessons/06/','../lessons/07/'];
  for (const href of links){
    const response=await page.request.get(new URL(href,page.url()).toString());
    expect(response.status(),href).toBe(200);
  }
  await page.getByRole('link',{name:'Relationships area'}).click();
  await expect(page.getByRole('heading',{name:'Relationships & Communication'})).toBeVisible();
});

test('no external connections or persistent local storage on interaction',async({page})=>{
  const external=[];
  page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:8765/'))external.push(r.url());});
  await page.goto(route);
  await reflect(page,0,1);await reflect(page,1,3);await reflect(page,2,3);
  await page.locator('#makeExample').click();
  await page.locator('#draft').fill('Keep this text private');
  expect(external).toEqual([]);
  expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
  await page.reload();
  await expect(page.locator('#draft')).toHaveValue('');
  await expect(page.locator('#makeExample')).toBeDisabled();
});

test('outside source links are opt-in and marked as external',async({page})=>{
  await page.goto(route);
  const external=page.locator('a[href^="https://"]');
  await expect(external).toHaveCount(2);
  for(const a of await external.all()){
    await expect(a).toHaveAttribute('rel',/noopener noreferrer/);
    await expect(a).toHaveAttribute('target','_blank');
    await expect(a).toContainText('(external');
  }
});

for(const width of [320,390,1366,1920]){
 test('reflow without horizontal scrolling at '+width+'px',async({page})=>{
   await page.setViewportSize({width,height:900});
   await page.goto(route);
   await expect(page.getByRole('heading',{level:1})).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
   await reflect(page,0,0);
   await expect(page.locator('#feedback1')).toContainText('observable information');
 });
}
test('200 percent text at 320px stays usable',async({page})=>{
  await page.setViewportSize({width:320,height:900});
  await page.goto(route);
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
  await reflect(page,0,0);
  await expect(page.locator('#feedback1')).toContainText('observable information');
  await expect(page.locator('#makeExample')).toBeDisabled();
});

test('keyboard, labels and live feedback are operable',async({page})=>{
  await page.goto(route);
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  const first=page.locator('form[data-step="0"] input[value="0"]');
  await first.focus();
  await page.keyboard.press('Space');
  await expect(first).toBeChecked();
  const button=page.locator('form[data-step="0"] button[type=submit]');
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#feedback1')).toContainText('observable information');
  await expect(page.locator('#feedback1')).toHaveAttribute('role','status');
  await expect(page.locator('#draft')).toHaveAttribute('maxlength','2000');
  await expect(page.locator('#draftLabel')).toHaveAttribute('for','draft');
  await expect(page.locator('fieldset legend')).toHaveCount(3);
});

test.describe('no-JavaScript accessibility',()=>{
 test.use({javaScriptEnabled:false});
 test('core instruction and complete example remain readable and navigable',async({page})=>{
   await page.goto(route);
   await expect(page.getByRole('heading',{level:1,name:'Conversation Repair Practice'})).toBeVisible();
   await expect(page.getByText('Complete sample message:')).toBeVisible();
   await expect(page.locator('form.practice')).toHaveCount(3);
   await expect(page.locator('form.practice').first()).toBeHidden();
   await expect(page.locator('#makeExample')).toBeHidden();
   await page.getByText('Read an example explanation').first().click();
   await expect(page.getByText(/We know the counter was covered/)).toBeVisible();
   await expect(page.getByRole('link',{name:/Listening to Understand/})).toBeVisible();
 });
});
