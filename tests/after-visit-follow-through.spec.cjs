const {test,expect}=require('@playwright/test');
const url='/one-place/after-visit-follow-through.html';
const ids=['results','referral','instructions'],safe=[1,0,2];
for(const width of [320,390,1366,1920]){
 test('After Visit: responsive lessons and navigation '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:800});await page.goto(url);
  await expect(page.getByRole('heading',{level:1,name:'After-Visit Follow-Through Practice'})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('form.practice')).toHaveCount(3);
  await expect(page.locator('.sources a')).toHaveCount(3);
  const links=page.getByRole('navigation',{name:'Choose a follow-through lesson'}).getByRole('link');
  await expect(links).toHaveCount(4);
  for(let i=0;i<4;i++){await links.nth(i).click();await expect(page).toHaveURL(new RegExp('#'+(ids[i]||'plan')+'$'));}
  const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(d.html,d.body),'lateral overflow '+width+' '+JSON.stringify(d)).toBeLessThanOrEqual(d.width+1);
  expect(errors).toEqual([]);
 });
}
for(let i=0;i<ids.length;i++){
 test('After Visit '+ids[i]+' three choices, feedback invalidation and reset',async({page})=>{
  await page.goto(url+'#'+ids[i]);
  const f=page.locator('#'+ids[i]+' form.practice'),choices=f.getByRole('radio'),check=f.getByRole('button',{name:'Check the next step'}),feedback=f.locator('.feedback');
  await check.click();await expect(feedback).toContainText('Choose one fictional');await expect(choices.first()).toBeFocused();
  for(let j=0;j<3;j++)if(j!==safe[i]){
   await choices.nth(j).check();await expect(feedback).toBeEmpty();await check.click();await expect(feedback).toContainText('Consider another approach.');
  }
  await choices.nth(safe[i]).check();await expect(feedback).toBeEmpty();await check.click();await expect(feedback).toContainText('Good follow-through reasoning.');
  await choices.nth((safe[i]+1)%3).check();await expect(feedback).toBeEmpty();
  await f.getByRole('button',{name:'Start again'}).click();await expect(feedback).toBeEmpty();await expect(f.locator('input:checked')).toHaveCount(0);
 });
}
test('After Visit: upfront medical emergency and confidentiality boundary',async({page})=>{
 await page.setViewportSize({width:320,height:740});await page.goto(url);
 const notice=page.locator('main > .alert');
 await expect(notice).toBeVisible();await expect(notice).toContainText('Safety before practice');
 await expect(notice).toContainText('not a medical record portal');
 await expect(notice).toContainText('immediate danger');
 await expect(page.locator('#instructions .stop')).toContainText('cannot decide');
});
test('After Visit: planner requires 3 choices and produces local wording',async({page})=>{
 await page.goto(url);const f=page.locator('#planner'),status=f.locator('.status'),draft=f.locator('#draft');
 await f.getByRole('button',{name:'Create sample wording'}).click();
 await expect(status).toContainText('Choose all three options');await expect(f.locator('#topic')).toBeFocused();
 await f.locator('#topic').selectOption('referral');await f.locator('#team').selectOption('specialist');await f.locator('#check').selectOption('when');
 await f.getByRole('button',{name:'Create sample wording'}).click();
 await expect(draft).toHaveValue(/status and scheduling instructions/);await expect(draft).toHaveValue(/specialist scheduling office/);
 await expect(draft).toHaveValue(/when to expect a reply/);
 await f.getByRole('button',{name:'Select wording to copy manually'}).click();await expect(draft).toBeFocused();
 const selection=await draft.evaluate(x=>({start:x.selectionStart,end:x.selectionEnd,len:x.value.length}));
 expect(selection).toEqual({start:0,end:selection.len,len:selection.len});
});
test('After Visit: planner invalidates old draft, reset and regenerate',async({page})=>{
 await page.goto(url);const f=page.locator('#planner'),draft=f.locator('#draft'),status=f.locator('.status'),copy=f.getByRole('button',{name:'Select wording to copy manually'});
 await f.locator('#topic').selectOption('result');await f.locator('#team').selectOption('clinic');await f.locator('#check').selectOption('what');
 await f.getByRole('button',{name:'Create sample wording'}).click();await expect(draft).toHaveValue(/result of a test/);await expect(copy).toBeEnabled();
 await f.locator('#topic').selectOption('instructions');await expect(draft).toHaveValue('');await expect(copy).toBeDisabled();await expect(status).toBeEmpty();
 await f.getByRole('button',{name:'Create sample wording'}).click();await expect(draft).toHaveValue(/recent visit that I do not understand/);
 await f.getByRole('button',{name:'Clear choices'}).click();await expect(draft).toHaveValue('');
 for(const id of ['topic','team','check'])await expect(f.locator('#'+id)).toHaveValue('');
 await expect(copy).toBeDisabled();
});
test('After Visit: skip link and keyboard at 200 percent text on phone',async({page})=>{
 await page.setViewportSize({width:320,height:740});await page.goto(url);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to follow-through lessons'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
 const f=page.locator('#results form.practice'),choice=f.getByRole('radio').nth(1);
 await choice.focus();await page.keyboard.press('Space');await expect(choice).toBeChecked();
 await f.getByRole('button',{name:'Check the next step'}).focus();await page.keyboard.press('Enter');
 await expect(f.getByRole('status')).toContainText('Good follow-through reasoning.');
 const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(d.html,d.body),'200%-text overflow '+JSON.stringify(d)).toBeLessThanOrEqual(d.width+1);
});
test('After Visit: no JavaScript has all lessons and manual example, no broken controls',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{const page=await context.newPage();await page.goto(url);
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('button[type=submit]:disabled')).toHaveCount(4);
  await expect(page.locator('#plan')).toContainText('No-JavaScript example');
  await expect(page.locator('#plan')).toContainText('I am following up after my appointment');
  await page.getByRole('navigation',{name:'Choose a follow-through lesson'}).getByRole('link').nth(2).click();await expect(page).toHaveURL(/#instructions$/);
 }finally{await context.close();}
});
test('After Visit: no outbound contact or personal browser storage',async({page})=>{
 const writes=[],external=[];page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.url());
  if(!['localhost','127.0.0.1'].includes(new URL(r.url()).hostname))external.push(r.url());
 });
 await page.goto(url);const f=page.locator('#planner');
 await f.locator('#topic').selectOption('result');await f.locator('#team').selectOption('clinic');await f.locator('#check').selectOption('how');
 await f.getByRole('button',{name:'Create sample wording'}).click();
 expect(writes).toEqual([]);expect(external).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await page.reload();await expect(page.locator('#draft')).toHaveValue('');
});
test('After Visit: source links, robots and local Health navigation',async({page})=>{
 await page.goto(url);await expect(page.locator('.sources a')).toHaveCount(3);
 const hrefs=await page.locator('.sources a').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
 expect(hrefs).toEqual([
  'https://odphp.health.gov/myhealthfinder/doctor-visits/talking-doctor/take-charge-your-health-care',
  'https://medlineplus.gov/ency/patientinstructions/000860.htm',
  'https://www.ahrq.gov/questions/be-engaged/index.html'
 ]);
 for(const link of await page.locator('.sources a').all()){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener noreferrer/);}
 await expect(page.getByRole('link',{name:'Health & Wellness',exact:true})).toHaveAttribute('href','health-wellness.html#choose');
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
});
