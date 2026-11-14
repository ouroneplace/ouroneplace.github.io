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
  page.once('dialog',async dialog=>{
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Clear your practice wording');
    await dialog.accept();
  });
  await page.locator('#clearDraft').click();
  await expect(page.locator('#draft')).toHaveValue('');
  await expect(page.locator('#progress')).toContainText('3 of 3');
  await page.locator('#makeExample').click();
  await expect(page.locator('#draft')).toHaveValue(/I thought I agreed to do dishes/);
});

test('Clear wording only asks before losing typed text and Cancel preserves it',async({page})=>{
  await page.goto(route);
  await reflect(page,0,0);
  await page.locator('#draft').fill('A thoughtful sentence I am still writing');
  page.once('dialog',async dialog=>{
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Clear your practice wording');
    await dialog.dismiss();
  });
  await page.locator('#clearDraft').click();
  await expect(page.locator('#draft')).toHaveValue('A thoughtful sentence I am still writing');
  await expect(page.locator('#draftStatus')).toContainText('Clear canceled');
  await expect(page.locator('#progress')).toContainText('1 of 3');
  await expect(page.locator('form[data-step="0"] input[value="0"]')).toBeChecked();
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('#clearDraft').click();
  await expect(page.locator('#draft')).toHaveValue('');
  await expect(page.locator('#draftStatus')).toContainText('Wording cleared');
  await expect(page.locator('#progress')).toContainText('1 of 3');
  await expect(page.locator('#draft')).toBeFocused();
});

test('Clear wording only on empty draft does not interrupt with confirmation',async({page})=>{
  await page.goto(route);
  let prompts=0;
  page.on('dialog',async dialog=>{prompts++;await dialog.dismiss();});
  await page.locator('#clearDraft').click();
  expect(prompts).toBe(0);
  await expect(page.locator('#draftStatus')).toContainText('Wording cleared');
});

test('reset clears answers, feedback, editable draft and restores focus',async({page})=>{
  await page.goto(route);
  await reflect(page,0,2);await reflect(page,1,3);await reflect(page,2,3);
  await page.locator('#makeExample').click();
  page.once('dialog',dialog=>dialog.accept());
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

test('cancel full reset preserves custom draft, checked answers and reviewed feedback',async({page})=>{
  await page.goto(route);
  await page.locator('#draft').fill('A message I am still editing');
  await reflect(page,0,0);
  await page.locator('form[data-step="1"] input[value="3"]').check();
  page.once('dialog',async dialog=>{
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('draft wording');
    await dialog.dismiss();
  });
  await page.locator('#resetPractice').click();
  await expect(page.locator('#draft')).toHaveValue('A message I am still editing');
  await expect(page.locator('#progress')).toContainText('1 of 3');
  await expect(page.locator('#feedback1')).toContainText('observable information');
  await expect(page.locator('form[data-step="1"] input[value="3"]')).toBeChecked();
  await expect(page.locator('#draftStatus')).toContainText('Start over canceled');
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('#resetPractice').click();
  await expect(page.locator('#draft')).toHaveValue('');
  await expect(page.locator('input[type=radio]:checked')).toHaveCount(0);
  await expect(page.locator('#progress')).toContainText('0 of 3');
});

test('untouched conversation reset does not request confirmation',async({page})=>{
  await page.goto(route);
  let dialogCount=0;
  page.on('dialog',async dialog=>{dialogCount++;await dialog.dismiss();});
  await page.locator('#resetPractice').click();
  expect(dialogCount).toBe(0);
  await expect(page.locator('#draftStatus')).toContainText('Practice cleared');
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
  await expect(page.getByRole('heading',{level:1,name:'Relationships & Communication',exact:true})).toBeVisible();
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

test('mobile heading and safety warning keep whole words at normal and 200-percent text',async({page})=>{
  for(const config of [
    {width:320,enlarged:false},
    {width:320,enlarged:true},
    {width:390,enlarged:false}
  ]){
    await page.setViewportSize({width:config.width,height:900});
    await page.goto(route);
    if(config.enlarged) await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
    const visible=await page.evaluate(()=>{
      const headline=document.querySelector('h1');
      const headingText=headline.firstChild;
      const pieces=[...headingText.textContent.matchAll(/\S+/g)].map(m=>{
        const range=document.createRange();
        range.setStart(headingText,m.index);
        range.setEnd(headingText,m.index+m[0].length);
        return {word:m[0],fragments:range.getClientRects().length};
      });
      const warningText=document.querySelector('.note strong').firstChild;
      const warningWord='disagreements';
      const index=warningText.textContent.indexOf(warningWord);
      const range=document.createRange();
      range.setStart(warningText,index);
      range.setEnd(warningText,index+warningWord.length);
      return {
        pieces,
        warningFragments:range.getClientRects().length,
        rootFont:parseFloat(getComputedStyle(document.documentElement).fontSize),
        h1Font:parseFloat(getComputedStyle(headline).fontSize),
        noHorizontalOverflow:document.documentElement.scrollWidth<=window.innerWidth+1
      };
    });
    expect(visible.pieces,JSON.stringify(config)).toEqual([
      {word:'Conversation',fragments:1},
      {word:'Repair',fragments:1},
      {word:'Practice',fragments:1}
    ]);
    expect(visible.warningFragments,JSON.stringify(config)).toBe(1);
    expect(visible.noHorizontalOverflow,JSON.stringify(config)).toBe(true);
    if(config.enlarged) expect(visible.h1Font).toBeGreaterThanOrEqual(visible.rootFont*1.1);
  }
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
   await page.locator('#staticExample summary').click();
   await expect(page.locator('#staticExample')).toContainText('Complete sample message:');
   await expect(page.locator('#staticExample')).toContainText('Could you tell me what you expected?');
   await expect(page.locator('form.practice')).toHaveCount(3);
   await expect(page.locator('form.practice').first()).toBeHidden();
   await expect(page.locator('#makeExample')).toBeHidden();
   await page.getByText('Read an example explanation').first().click();
   await expect(page.getByText(/We know the counter was covered/)).toBeVisible();
   await expect(page.getByRole('link',{name:/Listening to Understand/})).toBeVisible();
 });
});
