const {test,expect}=require('@playwright/test');
const route='/one-place/trip-out-back-backup.html';
const scene=i=>'form[data-scene="'+i+'"]';

async function choose(page,step,value){
 const form=page.locator(scene(step));
 await form.locator('input[value="'+value+'"]').check();
 await form.getByRole('button',{name:/Explain/}).click();
}
async function fillPlan(page){
 await page.locator('#goPlan').fill('Check actual operator alerts before leaving.');
 await page.locator('#backPlan').fill('Confirm a safe return service.');
 await page.locator('#fitPlan').fill('Ask about boarding needs and cost.');
 await page.locator('#backupPlan').fill('Postpone if a safe return is not confirmed.');
}

test('real lesson title, exact indexing policy and an honest privacy promise',async({page})=>{
 await page.goto(route);
 await expect(page).toHaveTitle(/Out, Back & Backup/);
 await expect(page.getByRole('heading',{level:1,name:'Out, Back & Backup'})).toBeVisible();
 await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow');
 await expect(page.getByText(/does not find routes, check schedules, make bookings/)).toBeVisible();
 await expect(page.getByText(/Getting somewhere is only half the trip/)).toBeVisible();
});

test('five outbound, return, fit, backup and check-in teaching steps remain available',async({page})=>{
 await page.goto(route);
 await expect(page.locator('ol.checks li')).toHaveCount(5);
 for(const phrase of ['Out:','Back:','Fit:','Backup:','Tell and check:'])
  await expect(page.locator('ol.checks')).toContainText(phrase);
 await expect(page.getByText(/Never rely on a stranger's unsolicited ride/)).toBeVisible();
});

test('a visitor can review three decisions without scoring',async({page})=>{
 await page.goto(route);
 await expect(page.locator('#progress')).toContainText('0 of 3');
 await choose(page,0,1);
 await expect(page.locator('#feedback1')).toContainText('Checking the actual provider');
 await choose(page,1,1);
 await expect(page.locator('#feedback2')).toContainText('Pausing to ask about accessible boarding');
 await choose(page,2,1);
 await expect(page.locator('#feedback3')).toContainText('not solved until a usable safe option');
 await expect(page.locator('#progress')).toContainText('3 of 3');
 await expect(page.locator('#practice')).not.toContainText('Score:');
});

test('all nine decisions give distinct useful explanations',async({page})=>{
 await page.goto(route);
 const feedback=[];
 for(let step=0;step<3;step++){
  const group=[];
  for(let choice=0;choice<3;choice++){
   await choose(page,step,choice);
   const text=await page.locator('#feedback'+(step+1)).innerText();
   expect(text.length).toBeGreaterThan(30);
   group.push(text);
  }
  expect(new Set(group).size).toBe(3);
  feedback.push(...group);
 }
 expect(new Set(feedback).size).toBe(9);
 await expect(page.locator('#progress')).toContainText('3 of 3');
});

test('blank decisions do not complete a step and provide an alternative',async({page})=>{
 await page.goto(route);
 await page.locator(scene(0)).getByRole('button',{name:'Explain route choice'}).click();
 await expect(page.locator('#feedback1')).toContainText('Choose one response first');
 await expect(page.locator('#progress')).toContainText('0 of 3');
 await page.locator(scene(1)).getByRole('button',{name:'Explain access choice'}).click();
 await expect(page.locator('#feedback2')).toContainText('Choose one response first');
});

test('an already-away traveler receives a safe-place and verified-help backup, not departure advice',async({page})=>{
 await page.goto(route);
 await expect(page.locator('form[data-scene="2"]').locator('..')).toContainText('After the library visit');
 await choose(page,2,1);
 await expect(page.locator('#feedback3')).toContainText('already away');
 await expect(page.locator('#feedback3')).toContainText('stay somewhere safe');
 await expect(page.locator('#feedback3')).toContainText('contact the provider or trusted support');
 await expect(page.locator('#feedback3')).not.toContainText('postpone');
 await page.locator('#paper summary').click();
 await expect(page.locator('#paper')).toContainText('If already out');
});

test('changing a reviewed choice invalidates stale reassurance and preserves other steps',async({page})=>{
 await page.goto(route);
 await choose(page,0,1);await choose(page,1,1);
 await expect(page.locator('#progress')).toContainText('2 of 3');
 await page.locator(scene(0)).locator('input[value="0"]').check();
 await expect(page.locator('#feedback1')).toContainText('Answer changed. Review again');
 await expect(page.locator('#feedback1')).not.toContainText('Checking the actual provider');
 await expect(page.locator('#progress')).toContainText('1 of 3');
 await expect(page.locator('#feedback2')).toContainText('Pausing to ask');
 await choose(page,0,0);
 await expect(page.locator('#feedback1')).toContainText('saved image can be outdated');
 await expect(page.locator('#progress')).toContainText('2 of 3');
});

test('a fictional plan remains editable and capped at readable short entries',async({page})=>{
 await page.goto(route);
 const fields=['goPlan','backPlan','fitPlan','backupPlan'];
 for(const id of fields){await expect(page.locator('#'+id)).toHaveAttribute('maxlength','320');await expect(page.locator('label[for="'+id+'"]')).toHaveCount(1);}
 await fillPlan(page);
 await expect(page.locator('#goPlan')).toHaveValue('Check actual operator alerts before leaving.');
 await page.locator('#backupPlan').fill('I would postpone the fictional trip.');
 await expect(page.locator('#backupPlan')).toHaveValue(/postpone/);
 await expect(page.locator('#progress')).toContainText('0 of 3');
});

test('fictional example loads without asking to replace blank fields',async({page})=>{
 await page.goto(route);
 let dialogs=0;page.on('dialog',dialog=>{dialogs++;dialog.dismiss();});
 await page.getByRole('button',{name:'Load a fictional example'}).click();
 expect(dialogs).toBe(0);
 await expect(page.locator('#goPlan')).toHaveValue(/Saturday outbound service/);
 await expect(page.locator('#backupPlan')).toHaveValue(/If canceled while out, stay safe and ask trusted support/);
 await expect(page.locator('#status')).toContainText('Fictional trip example loaded');
});

test('example cancel preserves all four visitor-authored fields',async({page})=>{
 await page.goto(route);await fillPlan(page);
 page.once('dialog',async dialog=>{expect(dialog.message()).toContain('Replace the four');await dialog.dismiss();});
 await page.getByRole('button',{name:'Load a fictional example'}).click();
 await expect(page.locator('#goPlan')).toHaveValue('Check actual operator alerts before leaving.');
 await expect(page.locator('#backPlan')).toHaveValue('Confirm a safe return service.');
 await expect(page.locator('#fitPlan')).toHaveValue('Ask about boarding needs and cost.');
 await expect(page.locator('#backupPlan')).toHaveValue('Postpone if a safe return is not confirmed.');
 await expect(page.locator('#status')).toContainText('Your writing was kept');
});

test('example confirmation replaces only the written plan, not reviewed choices',async({page})=>{
 await page.goto(route);await fillPlan(page);await choose(page,0,1);
 page.once('dialog',async dialog=>{expect(dialog.message()).toContain('Replace');await dialog.accept();});
 await page.getByRole('button',{name:'Load a fictional example'}).click();
 await expect(page.locator('#goPlan')).toHaveValue(/Saturday outbound service/);
 await expect(page.locator('#progress')).toContainText('1 of 3');
 await expect(page.locator('#feedback1')).toContainText('Checking the actual provider');
});

test('canceling full reset protects writing, reviewed answers and unreviewed selections',async({page})=>{
 await page.goto(route);await fillPlan(page);await choose(page,0,1);
 await page.locator(scene(1)).locator('input[value="2"]').check();
 page.once('dialog',async dialog=>{expect(dialog.message()).toContain('all four written trip checks');await dialog.dismiss();});
 await page.getByRole('button',{name:'Start over and clear practice'}).click();
 await expect(page.locator('#goPlan')).toHaveValue(/operator alerts/);
 await expect(page.locator(scene(0)).locator('input[value="1"]')).toBeChecked();
 await expect(page.locator(scene(1)).locator('input[value="2"]')).toBeChecked();
 await expect(page.locator('#progress')).toContainText('1 of 3');
 await expect(page.locator('#status')).toContainText('Your writing and choices were kept');
});

test('confirmed full reset clears all private inputs, choices and reflections',async({page})=>{
 await page.goto(route);await fillPlan(page);await choose(page,0,1);await choose(page,1,2);
 page.once('dialog',async dialog=>{expect(dialog.message()).toContain('Start over?');await dialog.accept();});
 await page.getByRole('button',{name:'Start over and clear practice'}).click();
 for(const id of ['goPlan','backPlan','fitPlan','backupPlan'])await expect(page.locator('#'+id)).toHaveValue('');
 await expect(page.locator('input[type=radio]:checked')).toHaveCount(0);
 for(const n of [1,2,3])await expect(page.locator('#feedback'+n)).toBeEmpty();
 await expect(page.locator('#progress')).toContainText('0 of 3');
 await expect(page.locator('#status')).toContainText('Nothing was saved or sent');
});

test('blank reset is immediate; unreviewed radio alone still requires confirmation',async({page})=>{
 await page.goto(route);
 let asks=0;
 page.on('dialog',async dialog=>{asks++;await dialog.dismiss();});
 await page.getByRole('button',{name:'Start over and clear practice'}).click();
 expect(asks).toBe(0);
 await page.locator(scene(2)).locator('input[value="0"]').check();
 await page.getByRole('button',{name:'Start over and clear practice'}).click();
 expect(asks).toBe(1);
 await expect(page.locator(scene(2)).locator('input[value="0"]')).toBeChecked();
});

test('never calls outside servers, location APIs or browser storage',async({page})=>{
 const external=[];page.on('request',req=>{if(!req.url().startsWith('http://127.0.0.1:8765/'))external.push(req.url());});
 await page.goto(route);await fillPlan(page);await choose(page,0,1);
 await page.getByRole('button',{name:'Load a fictional example'}).click().catch(()=>{});
 expect(external).toEqual([]);
 const result=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length,cookie:document.cookie,geolocationRequest:typeof navigator.geolocation==='undefined'?'absent':'not-used'}));
 expect(result.local).toBe(0);expect(result.session).toBe(0);expect(result.cookie).toBe('');
 await page.reload();
 for(const id of ['goPlan','backPlan','fitPlan','backupPlan'])await expect(page.locator('#'+id)).toHaveValue('');
 await expect(page.locator('#progress')).toContainText('0 of 3');
});

test('area return and Human Literacy are reachable and external sources opt-in',async({page})=>{
 await page.goto(route);
 for(const href of ['../index.html','../human-literacy/','../index.html?area=Transportation%20%26%20Travel']){
  const result=await page.request.get(new URL(href,page.url()).toString());
  expect(result.status(),href).toBe(200);
 }
 const external=page.locator('a[href^="https://"]');
 await expect(external).toHaveCount(2);
 await expect(page.locator('a[href="https://www.transit.dot.gov/"]')).toHaveCount(1);
 await expect(page.locator('a[href="https://www.usa.gov/disability-rights"]')).toHaveCount(1);
 for(const link of await external.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(link).toContainText('(external)');
 }
 await page.getByRole('link',{name:'Transportation area'}).click();
 await expect(page).toHaveURL(/index\.html\?area=Transportation%20%26%20Travel$/);
 await expect(page.getByRole('heading',{level:1,name:'Transportation & Travel',exact:true})).toBeVisible();
});

for(const width of [320,390,1366,1920]){
 test('trip practice and real feedback reflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto(route);
  await expect(page.getByRole('heading',{level:1,name:'Out, Back & Backup'})).toBeVisible();
  expect(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)<=innerWidth+1)).toBe(true);
  await choose(page,0,1);
  await expect(page.locator('#feedback1')).toContainText('Checking the actual provider');
 });
}

test('200 percent text at a 320px phone viewport leaves controls and steps usable',async({page})=>{
 await page.setViewportSize({width:320,height:900});await page.goto(route);
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 expect(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)<=innerWidth+1)).toBe(true);
 await choose(page,1,1);
 await expect(page.locator('#feedback2')).toContainText('accessible boarding');
 await expect(page.locator('#backupPlan')).toBeVisible();
});

test('six full-page geometry samples and screenshot records retain safe widths',async({page},testInfo)=>{
 const scenarios=[{width:320,large:false},{width:320,large:true},{width:390,large:false},{width:390,large:true},{width:1366,large:false},{width:1920,large:false}];
 for(const x of scenarios){
  await page.setViewportSize({width:x.width,height:900});
  await page.goto(route);
  if(x.large)await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  const geometry=await page.evaluate(()=>{
   const sections=Array.from(document.querySelectorAll('main>.panel')).map(el=>{const r=el.getBoundingClientRect();return{top:r.top,bottom:r.bottom};});
   const buttons=Array.from(document.querySelectorAll('button')).map(el=>el.getBoundingClientRect().height);
   return{width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth,sections,minButton:Math.min(...buttons)};
  });
  expect(Math.max(geometry.html,geometry.body)).toBeLessThanOrEqual(geometry.width+1);
  expect(geometry.sections).toHaveLength(4);
  for(let i=1;i<geometry.sections.length;i++)expect(geometry.sections[i].top).toBeGreaterThanOrEqual(geometry.sections[i-1].bottom-1);
  expect(geometry.minButton).toBeGreaterThanOrEqual(44);
  const label=x.width+(x.large?'-200-percent':'-normal');
  const image=await page.screenshot({fullPage:true});
  await testInfo.attach('trip-full-'+label+'.png',{body:image,contentType:'image/png'});
  console.log('TRIP_PAGE_GEOMETRY '+JSON.stringify({label,sourceRoute:route,scrollWidth:geometry.html,bodyWidth:geometry.body,sections:geometry.sections.length,minButtonHeight:geometry.minButton,pngHeight:image.readUInt32BE(20)}));
 }
});

test('keyboard navigation, named groups, labeled fields and announced feedback',async({page})=>{
 await page.goto(route);
 await page.keyboard.press('Tab');
 await expect(page.locator('.skip')).toBeFocused();
 await expect(page.locator('form.choice-form fieldset legend')).toHaveCount(3);
 for(const id of ['goPlan','backPlan','fitPlan','backupPlan']){
  await expect(page.locator('label[for="'+id+'"]')).toHaveCount(1);
 }
 const first=page.locator(scene(0)).locator('input[value="1"]');
 await first.focus();await page.keyboard.press('Space');
 await expect(first).toBeChecked();
 const explain=page.locator(scene(0)).getByRole('button',{name:'Explain route choice'});
 await explain.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#feedback1')).toHaveAttribute('role','status');
 await expect(page.locator('#feedback1')).toContainText('Checking the actual provider');
 await expect(page.locator('#status')).toHaveAttribute('aria-live','polite');
 await expect(page.locator('#progress')).toContainText('1 of 3');
});

test('reduced motion preference keeps fictional practice usable',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(route);await choose(page,2,1);
 await expect(page.locator('#feedback3')).toContainText('usable safe option');
});

test.describe('no JavaScript',()=>{
 test.use({javaScriptEnabled:false});
 test('five checks, safe stop, full fictional paper plan and external references stay usable',async({page})=>{
  await page.goto(route);
  await expect(page.getByRole('heading',{level:1,name:'Out, Back & Backup'})).toBeVisible();
  await expect(page.locator('ol.checks li')).toHaveCount(5);
  await expect(page.getByText(/Without JavaScript, the whole lesson still works on paper/)).toBeVisible();
  await expect(page.locator('#practice')).toBeHidden();
  await expect(page.locator('#planner')).toBeHidden();
  await page.locator('#paper summary').click();
  await expect(page.locator('#paper')).toContainText('final workable return service');
  await expect(page.getByRole('link',{name:/U.S. Federal Transit Administration/})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 });
});
