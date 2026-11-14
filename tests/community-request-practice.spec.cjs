const {test,expect}=require('@playwright/test');
const route='/one-place/community-request-practice.html';
const scene=i=>'form[data-step="'+i+'"]';
const names=['observation','request','channel','followUp'];

async function choose(page,step,choice){
 const form=page.locator(scene(step));
 await form.locator('input[value="'+choice+'"]').check();
 await form.getByRole('button',{name:/Explain/}).click();
}
async function fillDraft(page){
 await page.locator('#observation').fill('Two notices disagree about public Saturday hours.');
 await page.locator('#request').fill('Could you confirm the current schedule?');
 await page.locator('#channel').fill('Use the operator official website.');
 await page.locator('#followUp').fill('Follow official instructions if needed.');
}

test('accurate title, single public indexing directive and transparent privacy statement',async({page})=>{
 await page.goto(route);
 await expect(page).toHaveTitle(/Ask, Check, Follow Up/);
 await expect(page.getByRole('heading',{level:1,name:'Ask, Check, Follow Up'})).toBeVisible();
 await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow');
 await expect(page.getByText(/does not contact a public office, send your message, save your writing/)).toBeVisible();
});

test('five practical steps, explicit privacy and emergency boundaries remain readable',async({page})=>{
 await page.goto(route);
 await expect(page.locator('ol.steps li')).toHaveCount(5);
 for(const step of ['Notice:','Check:','Ask:','Keep track:','Follow up or stop:']){
  await expect(page.locator('ol.steps')).toContainText(step);
 }
 await expect(page.getByText(/Safety comes before a form/)).toBeVisible();
 await expect(page.getByText(/immediate danger or a medical emergency/)).toBeVisible();
});

test('three fictional decisions can be reviewed independently without a score',async({page})=>{
 await page.goto(route);
 await expect(page.locator('#progress')).toContainText('0 of 3');
 await choose(page,0,1);
 await expect(page.locator('#answer1')).toContainText('current official notice');
 await choose(page,1,1);
 await expect(page.locator('#answer2')).toContainText('specific, answerable fact');
 await choose(page,2,1);
 await expect(page.locator('#answer3')).toContainText('actual office');
 await expect(page.locator('#progress')).toContainText('3 of 3');
 await expect(page.locator('#practice')).not.toContainText('Your score');
});

test('all nine decisions have distinct, meaningful explanations',async({page})=>{
 await page.goto(route);
 const answers=[];
 for(let i=0;i<3;i++){
  const group=[];
  for(let j=0;j<3;j++){
   await choose(page,i,j);
   const s=await page.locator('#answer'+(i+1)).innerText();
   expect(s.length).toBeGreaterThan(35);
   group.push(s);
  }
  expect(new Set(group).size).toBe(3);
  answers.push(...group);
 }
 expect(new Set(answers).size).toBe(9);
 await expect(page.locator('#progress')).toContainText('3 of 3');
});

test('blank choice is not counted and gives an alternative',async({page})=>{
 await page.goto(route);
 await page.locator(scene(0)).getByRole('button',{name:'Explain schedule choice'}).click();
 await expect(page.locator('#answer1')).toContainText('Choose an option first');
 await expect(page.locator('#progress')).toContainText('0 of 3');
});

test('changing a reviewed answer removes stale reassurance but keeps independent reviews',async({page})=>{
 await page.goto(route);
 await choose(page,0,1);await choose(page,1,1);
 await expect(page.locator('#progress')).toContainText('2 of 3');
 await page.locator(scene(0)).locator('input[value="0"]').check();
 await expect(page.locator('#answer1')).toContainText('selection changed');
 await expect(page.locator('#answer1')).not.toContainText('current official notice');
 await expect(page.locator('#progress')).toContainText('1 of 3');
 await expect(page.locator('#answer2')).toContainText('answerable fact');
 await choose(page,0,0);
 await expect(page.locator('#answer1')).toContainText('group message');
 await expect(page.locator('#progress')).toContainText('2 of 3');
});

test('four labeled, capped private draft fields remain editable',async({page})=>{
 await page.goto(route);
 for(const id of names){
  await expect(page.locator('#'+id)).toHaveAttribute('maxlength','320');
  await expect(page.locator('label[for="'+id+'"]')).toHaveCount(1);
 }
 await fillDraft(page);
 await expect(page.locator('#request')).toHaveValue('Could you confirm the current schedule?');
 await page.locator('#followUp').fill('Stop if a new posted notice answers this question.');
 await expect(page.locator('#followUp')).toHaveValue(/posted notice/);
});

test('example fills blank fields without interruption',async({page})=>{
 await page.goto(route);
 let dialogs=0;page.on('dialog',async dialog=>{dialogs++;await dialog.dismiss();});
 await page.getByRole('button',{name:'Load fictional example'}).click();
 expect(dialogs).toBe(0);
 await expect(page.locator('#observation')).toHaveValue(/fictional center/);
 await expect(page.locator('#followUp')).toHaveValue(/official instructions/);
 await expect(page.locator('#status')).toContainText('Fictional example loaded');
});

test('canceling example replacement preserves all written fields and selections',async({page})=>{
 await page.goto(route);await fillDraft(page);await choose(page,0,1);
 page.once('dialog',async dialog=>{expect(dialog.message()).toContain('Replace your four written fields');await dialog.dismiss();});
 await page.getByRole('button',{name:'Load fictional example'}).click();
 await expect(page.locator('#observation')).toHaveValue('Two notices disagree about public Saturday hours.');
 await expect(page.locator('#request')).toHaveValue('Could you confirm the current schedule?');
 await expect(page.locator('#channel')).toHaveValue('Use the operator official website.');
 await expect(page.locator('#followUp')).toHaveValue('Follow official instructions if needed.');
 await expect(page.locator('#progress')).toContainText('1 of 3');
 await expect(page.locator('#status')).toContainText('writing was kept');
});

test('confirming example replaces only writing while preserving reviewed decisions',async({page})=>{
 await page.goto(route);await fillDraft(page);await choose(page,0,1);
 page.once('dialog',async dialog=>{await dialog.accept();});
 await page.getByRole('button',{name:'Load fictional example'}).click();
 await expect(page.locator('#observation')).toHaveValue(/fictional center/);
 await expect(page.locator('#request')).toHaveValue(/confirm the current Saturday/);
 await expect(page.locator('#progress')).toContainText('1 of 3');
 await expect(page.locator('#answer1')).toContainText('current official notice');
});

test('canceling full reset protects unsent words, reviewed and unreviewed selections',async({page})=>{
 await page.goto(route);await fillDraft(page);await choose(page,0,1);
 await page.locator(scene(1)).locator('input[value="2"]').check();
 page.once('dialog',async dialog=>{expect(dialog.message()).toContain('all four written fields');await dialog.dismiss();});
 await page.getByRole('button',{name:'Start over and clear practice'}).click();
 await expect(page.locator('#request')).toHaveValue('Could you confirm the current schedule?');
 await expect(page.locator(scene(0)).locator('input[value="1"]')).toBeChecked();
 await expect(page.locator(scene(1)).locator('input[value="2"]')).toBeChecked();
 await expect(page.locator('#progress')).toContainText('1 of 3');
 await expect(page.locator('#answer1')).toContainText('current official notice');
 await expect(page.locator('#status')).toContainText('writing and choices were kept');
});

test('confirming full reset removes all current practice and reflects completion',async({page})=>{
 await page.goto(route);await fillDraft(page);await choose(page,0,1);await choose(page,2,2);
 page.once('dialog',async dialog=>{await dialog.accept();});
 await page.getByRole('button',{name:'Start over and clear practice'}).click();
 for(const id of names)await expect(page.locator('#'+id)).toHaveValue('');
 await expect(page.locator('input[type=radio]:checked')).toHaveCount(0);
 for(const id of ['answer1','answer2','answer3'])await expect(page.locator('#'+id)).toBeEmpty();
 await expect(page.locator('#progress')).toContainText('0 of 3');
 await expect(page.locator('#status')).toContainText('Nothing was saved or sent');
});

test('empty reset needs no dialog but unreviewed selection still requests consent',async({page})=>{
 await page.goto(route);
 let prompts=0;page.on('dialog',async dialog=>{prompts++;await dialog.dismiss();});
 await page.getByRole('button',{name:'Start over and clear practice'}).click();
 expect(prompts).toBe(0);
 await page.locator(scene(2)).locator('input[value="0"]').check();
 await page.getByRole('button',{name:'Start over and clear practice'}).click();
 expect(prompts).toBe(1);
 await expect(page.locator(scene(2)).locator('input[value="0"]')).toBeChecked();
});

test('no personal information is transmitted or stored by practice',async({page})=>{
 const external=[];
 page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:8765/'))external.push(r.url());});
 await page.goto(route);await fillDraft(page);await choose(page,1,1);
 expect(external).toEqual([]);
 const values=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length,cookies:document.cookie}));
 expect(values).toEqual({local:0,session:0,cookies:''});
 await page.reload();
 for(const id of names)await expect(page.locator('#'+id)).toHaveValue('');
 await expect(page.locator('#progress')).toContainText('0 of 3');
});

test('local Community navigation and Human Literacy destination resolve',async({page})=>{
 await page.goto(route);
 for(const href of ['../index.html','../human-literacy/','../index.html?area=Community%20%26%20Civic%20Life']){
  const response=await page.request.get(new URL(href,page.url()).toString());
  expect(response.status(),href).toBe(200);
 }
 await page.getByRole('link',{name:'Community area'}).click();
 await expect(page).toHaveURL(/index\.html\?area=Community%20%26%20Civic%20Life$/);
 await expect(page.getByRole('heading',{level:1,name:'Community & Civic Life',exact:true})).toBeVisible();
});

test('official external resource is opt-in rather than contacted by load',async({page})=>{
 await page.goto(route);
 const external=page.locator('a[href^="https://"]');
 await expect(external).toHaveCount(1);
 await expect(external).toHaveAttribute('href','https://www.usa.gov/state-local-governments');
 await expect(external).toHaveAttribute('target','_blank');
 await expect(external).toHaveAttribute('rel',/noopener noreferrer/);
 await expect(external).toContainText('(external)');
});

test('skip link moves actual keyboard focus into main and resumes first decision',async({page})=>{
 await page.goto(route);
 await page.keyboard.press('Tab');await expect(page.locator('.skip')).toBeFocused();
 await page.keyboard.press('Enter');await expect(page).toHaveURL(/#main$/);
 await expect(page.locator('#main')).toBeFocused();
 await page.keyboard.press('Tab');
 await expect(page.locator(scene(0)).locator('input[value="0"]')).toBeFocused();
});

test('keyboard controls, group names, text labels and announcements operate',async({page})=>{
 await page.goto(route);
 await expect(page.locator('form.choice fieldset legend')).toHaveCount(3);
 const input=page.locator(scene(1)).locator('input[value="1"]');
 await input.focus();await page.keyboard.press('Space');await expect(input).toBeChecked();
 const explain=page.locator(scene(1)).getByRole('button',{name:'Explain request choice'});
 await explain.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#answer2')).toHaveAttribute('role','status');
 await expect(page.locator('#answer2')).toContainText('specific, answerable fact');
 await expect(page.locator('#progress')).toHaveAttribute('aria-live','polite');
 await expect(page.locator('#status')).toHaveAttribute('aria-live','polite');
});

test('reduced-motion preference still supports reviewed practice',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(route);
 await choose(page,2,1);
 await expect(page.locator('#answer3')).toContainText('actual office');
});

for(const width of [320,390,1366,1920]){
 test('community guide, form and feedback reflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:900});await page.goto(route);
  await expect(page.getByRole('heading',{level:1,name:'Ask, Check, Follow Up'})).toBeVisible();
  expect(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)<=innerWidth+1)).toBe(true);
  await choose(page,0,1);
  await expect(page.locator('#answer1')).toContainText('current official notice');
 });
}

test('200 percent text at narrow 320px phone keeps inputs and instructions usable',async({page})=>{
 await page.setViewportSize({width:320,height:900});await page.goto(route);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 expect(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)<=innerWidth+1)).toBe(true);
 await choose(page,1,1);
 await expect(page.locator('#answer2')).toContainText('answerable fact');
 await expect(page.locator('#followUp')).toBeVisible();
});

test('six screenshot and full-page geometry samples preserve readable layouts',async({page},testInfo)=>{
 const samples=[{w:320,large:false},{w:320,large:true},{w:390,large:false},{w:390,large:true},{w:1366,large:false},{w:1920,large:false}];
 for(const x of samples){
  await page.setViewportSize({width:x.w,height:900});await page.goto(route);
  if(x.large)await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  const geom=await page.evaluate(()=>{
   const panels=[...document.querySelectorAll('main>.panel')].map(el=>{const r=el.getBoundingClientRect();return{top:r.top,bottom:r.bottom};});
   const heights=[...document.querySelectorAll('button')].map(el=>el.getBoundingClientRect().height);
   return{viewport:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth,panels,minButton:Math.min(...heights)};
  });
  expect(Math.max(geom.html,geom.body)).toBeLessThanOrEqual(geom.viewport+1);
  expect(geom.panels).toHaveLength(4);
  for(let i=1;i<geom.panels.length;i++)expect(geom.panels[i].top).toBeGreaterThanOrEqual(geom.panels[i-1].bottom-1);
  expect(geom.minButton).toBeGreaterThanOrEqual(44);
  const name='community-'+x.w+(x.large?'-200-percent':'-normal');
  const png=await page.screenshot({fullPage:true});
  await testInfo.attach(name+'.png',{body:png,contentType:'image/png'});
  console.log('COMMUNITY_PAGE_GEOMETRY '+JSON.stringify({label:name,sourceRoute:route,htmlWidth:geom.html,bodyWidth:geom.body,viewport:geom.viewport,panels:geom.panels.length,minButtonHeight:geom.minButton,pngHeight:png.readUInt32BE(20)}));
 }
});

test.describe('script unavailable',()=>{
 test.use({javaScriptEnabled:false});
 test('five steps, safety warning and complete sample plan still work on paper',async({page})=>{
  await page.goto(route);
  await expect(page.getByRole('heading',{level:1,name:'Ask, Check, Follow Up'})).toBeVisible();
  await expect(page.locator('ol.steps li')).toHaveCount(5);
  await expect(page.getByText(/Paper practice works without JavaScript/)).toBeVisible();
  await expect(page.locator('#practice')).toBeHidden();
  await expect(page.locator('#draft')).toBeHidden();
  await page.locator('#paper summary').click();
  await expect(page.locator('#paper')).toContainText('current Saturday drop-in hours');
  await expect(page.getByRole('link',{name:/USAGov state and local government directory/})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 });
});