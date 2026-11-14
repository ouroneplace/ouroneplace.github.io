const {test,expect}=require('@playwright/test');
const url='/one-place/caregiver-respite-practice.html',ids=['ask','options','handoff'],safe=[1,0,2];
for(const width of [320,390,1366,1920]){
 test('Respite: responsive teaching and anchors at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:760});await page.goto(url);
  await expect(page.getByRole('heading',{name:'Caregiver Relief & Respite Practice',level:1})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('form.practice')).toHaveCount(3);
  await expect(page.locator('section.lesson details')).toHaveCount(3);
  await expect(page.locator('.sources a')).toHaveCount(4);
  const links=page.getByRole('navigation',{name:'Choose a caregiver relief lesson'}).getByRole('link');
  await expect(links).toHaveCount(4);
  for(let i=0;i<4;i++){await links.nth(i).click();await expect(page).toHaveURL(new RegExp('#'+(ids[i]||'plan')+'$'));}
  const layout=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(layout.html,layout.body),'overflow '+JSON.stringify(layout)).toBeLessThanOrEqual(layout.width+1);
  expect(errors).toEqual([]);
 });
}
for(let i=0;i<3;i++){
 test('Respite '+ids[i]+' blank, all nine explanations, stale and reset',async({page})=>{
  await page.goto(url+'#'+ids[i]);const section=page.locator('#'+ids[i]),form=section.locator('form.practice'),radios=form.getByRole('radio'),submit=form.getByRole('button',{name:'Check my choice'}),feedback=form.locator('.feedback');
  await submit.click();await expect(feedback).toContainText('Choose one fictional answer');await expect(radios.first()).toBeFocused();
  for(let j=0;j<3;j++)if(j!==safe[i]){await radios.nth(j).check();await expect(feedback).toBeEmpty();await submit.click();await expect(feedback).toContainText('Consider a safer approach.');}
  await radios.nth(safe[i]).check();await expect(feedback).toBeEmpty();await submit.click();await expect(feedback).toContainText('Good care-planning reasoning.');
  await radios.nth((safe[i]+1)%3).check();await expect(feedback).toBeEmpty();
  await form.getByRole('button',{name:'Start again'}).click();await expect(feedback).toBeEmpty();await expect(form.locator('input:checked')).toHaveCount(0);
  await section.locator('summary').click();await expect(section.locator('details')).toHaveAttribute('open','');await expect(section.locator('details li')).toHaveCount(3);
 });
}
test('Respite: urgent safety, consent and untrained transfer warning',async({page})=>{
 await page.setViewportSize({width:320,height:730});await page.goto(url);
 const alert=page.locator('main > .alert');await expect(alert).toContainText('Safety and consent first');
 await expect(alert).toContainText('Never leave a person');await expect(alert).toContainText('untrained helper');
 await expect(page.locator('#ask .stop')).toContainText('unqualified replacement');
});
test('Respite: builder blank, valid, select for manual copy',async({page})=>{
 await page.goto(url);const f=page.locator('#builder'),status=f.locator('.status'),draft=f.locator('#draft');
 await f.getByRole('button',{name:'Create sample conversation'}).click();await expect(status).toContainText('Choose all three');await expect(f.locator('#need')).toBeFocused();
 await f.locator('#need').selectOption('program');await f.locator('#help').selectOption('service');await f.locator('#confirm').selectOption('backup');
 await f.getByRole('button',{name:'Create sample conversation'}).click();
 await expect(draft).toHaveValue(/whether a respite service can help/);
 await expect(draft).toHaveValue(/a verified respite or community provider/);
 await expect(draft).toHaveValue(/backup coverage and the escalation contact/);
 await f.getByRole('button',{name:'Select sample text to copy manually'}).click();await expect(draft).toBeFocused();
 const selection=await draft.evaluate(e=>({start:e.selectionStart,end:e.selectionEnd,length:e.value.length}));
 expect(selection).toEqual({start:0,end:selection.length,length:selection.length});
});
test('Respite: changing options clears stale draft and reset clears everything',async({page})=>{
 await page.goto(url);const f=page.locator('#builder'),draft=f.locator('#draft'),status=f.locator('.status'),select=f.getByRole('button',{name:'Select sample text to copy manually'});
 await f.locator('#need').selectOption('rest');await f.locator('#help').selectOption('errands');await f.locator('#confirm').selectOption('skills');
 await f.getByRole('button',{name:'Create sample conversation'}).click();await expect(draft).toHaveValue(/planned break/);await expect(select).toBeEnabled();
 await f.locator('#need').selectOption('backup');await expect(draft).toHaveValue('');await expect(select).toBeDisabled();await expect(status).toBeEmpty();
 await f.getByRole('button',{name:'Create sample conversation'}).click();await expect(draft).toHaveValue(/unconfirmed backup helper/);
 await f.getByRole('button',{name:'Clear selections'}).click();await expect(draft).toHaveValue('');
 for(const id of ['need','help','confirm'])await expect(f.locator('#'+id)).toHaveValue('');
 await expect(select).toBeDisabled();
});
test('Respite: keyboard skip, 320px and 200 percent text remains usable',async({page})=>{
 await page.setViewportSize({width:320,height:730});await page.goto(url);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to caregiver relief lessons'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
 const form=page.locator('#ask form.practice'),radio=form.getByRole('radio').nth(1);
 await radio.focus();await page.keyboard.press('Space');await expect(radio).toBeChecked();
 await form.getByRole('button',{name:'Check my choice'}).focus();await page.keyboard.press('Enter');await expect(form.getByRole('status')).toContainText('Good care-planning reasoning.');
 const layout=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(layout.html,layout.body),'zoom overflow '+JSON.stringify(layout)).toBeLessThanOrEqual(layout.width+1);
});
test('Respite: no-JavaScript static lessons, nine reasons and paper fallback',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{const page=await context.newPage();await page.goto(url);
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('button[type=submit]:disabled')).toHaveCount(4);
  for(const id of ids){const s=page.locator('#'+id);await s.locator('summary').click();await expect(s.locator('details li')).toHaveCount(3);}
  await expect(page.locator('#plan')).toContainText('Paper fallback (no JavaScript needed)');
  await expect(page.locator('#plan')).toContainText('coverage and the backup before leaving');
  await page.getByRole('navigation',{name:'Choose a caregiver relief lesson'}).getByRole('link').nth(2).click();await expect(page).toHaveURL(/#handoff$/);
 }finally{await context.close();}
});
test('Respite: no storage, external requests or outgoing messages',async({page})=>{
 const writes=[],remote=[];page.on('request',r=>{if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.url());
  if(!['localhost','127.0.0.1'].includes(new URL(r.url()).hostname))remote.push(r.url());
 });
 await page.goto(url);const f=page.locator('#builder');
 await f.locator('#need').selectOption('rest');await f.locator('#help').selectOption('team');await f.locator('#confirm').selectOption('consent');
 await f.getByRole('button',{name:'Create sample conversation'}).click();
 expect(writes).toEqual([]);expect(remote).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await page.reload();await expect(page.locator('#draft')).toHaveValue('');
});
test('Respite: official source URLs, safe opt-in and accepted family toolkit',async({page})=>{
 await page.goto(url);const links=page.locator('.sources a');await expect(links).toHaveCount(4);
 const hrefs=await links.evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
 expect(hrefs).toEqual([
 'https://www.nia.nih.gov/health/caregiving/what-respite-care',
 'https://www.nia.nih.gov/health/caregiving/taking-care-yourself-tips-caregivers',
 'https://acl.gov/programs/support-caregivers/national-family-caregiver-support-program',
 'https://eldercare.acl.gov/'
 ]);
 for(const link of await links.all()){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener noreferrer/);}
 await expect(page.getByRole('link',{name:'Family Handoff Toolkit'})).toHaveAttribute('href','family-handoff.html');
 await expect(page.getByRole('link',{name:'Family & Caregiving area'})).toHaveAttribute('href','../index.html?area=Family%20%26%20Caregiving');
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
});
