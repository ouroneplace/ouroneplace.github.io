const {test,expect}=require('@playwright/test');
const url='/one-place/disaster-reconnection-practice.html';
const ids=['channels','reunite','access'],safe=[0,2,1];
for(const width of [320,390,1366,1920]){
 test('Reconnection responsive and navigation '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',x=>errors.push(x.message));
  await page.setViewportSize({width,height:790});await page.goto(url);
  await expect(page.getByRole('heading',{name:'Emergency Reconnection Practice',level:1})).toBeVisible();
  await expect(page.locator('.lesson')).toHaveCount(3);
  await expect(page.locator('form.practice')).toHaveCount(3);
  await expect(page.locator('.lesson details')).toHaveCount(3);
  await expect(page.locator('.sources a')).toHaveCount(3);
  const links=page.getByRole('navigation',{name:'Choose a reconnection lesson'}).getByRole('link');
  await expect(links).toHaveCount(4);
  for(let i=0;i<4;i++){await links.nth(i).click();await expect(page).toHaveURL(new RegExp('#'+(ids[i]||'plan')+'$'));}
  const layout=await page.evaluate(()=>({w:innerWidth,doc:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(layout.doc,layout.body),'overflow '+JSON.stringify(layout)).toBeLessThanOrEqual(layout.w+1);
  expect(errors).toEqual([]);
 });
}
for(let i=0;i<ids.length;i++){
 test('Reconnection '+ids[i]+' all choices, blank, stale, reset and visible explanations',async({page})=>{
  await page.goto(url+'#'+ids[i]);
  const s=page.locator('#'+ids[i]),f=s.locator('form.practice'),radios=f.getByRole('radio'),submit=f.getByRole('button',{name:'Check my response'}),feedback=f.locator('.feedback');
  await submit.click();await expect(feedback).toContainText('Choose a fictional');await expect(radios.first()).toBeFocused();
  for(let j=0;j<3;j++)if(j!==safe[i]){await radios.nth(j).check();await expect(feedback).toBeEmpty();await submit.click();await expect(feedback).toContainText('Consider a safer plan.');}
  await radios.nth(safe[i]).check();await expect(feedback).toBeEmpty();await submit.click();await expect(feedback).toContainText('Good preparation reasoning.');
  await radios.nth((safe[i]+1)%3).check();await expect(feedback).toBeEmpty();
  await f.getByRole('button',{name:'Clear response'}).click();await expect(feedback).toBeEmpty();await expect(f.locator('input:checked')).toHaveCount(0);
  await s.locator('summary').click();await expect(s.locator('details')).toHaveAttribute('open','');
  await expect(s.locator('details li')).toHaveCount(3);
 });
}
test('Reconnection real-emergency instructions and privacy are upfront',async({page})=>{
 await page.setViewportSize({width:320,height:790});await page.goto(url);
 const alert=page.locator('main > .alert');
 await expect(alert).toBeVisible();await expect(alert).toContainText('Real emergency? Stop');
 await expect(alert).toContainText('restricted area');await expect(alert).toContainText('911');
 await expect(page.locator('#reunite .stop')).toContainText('flooded');
});
test('Reconnection generic outline requires all choices and selects text',async({page})=>{
 await page.goto(url);
 const form=page.locator('#builder'),status=form.locator('.status'),output=form.locator('#outline');
 await form.getByRole('button',{name:'Create discussion outline'}).click();
 await expect(status).toContainText('Choose all three options');await expect(form.locator('#need')).toBeFocused();
 await form.locator('#need').selectOption('separated');await form.locator('#backup').selectOption('outside');await form.locator('#confirm').selectOption('official');
 await form.getByRole('button',{name:'Create discussion outline'}).click();
 await expect(output).toHaveValue(/household members being in different places/);
 await expect(output).toHaveValue(/consenting out-of-area contact/);
 await expect(output).toHaveValue(/current local instructions/);
 await form.getByRole('button',{name:'Select text to copy manually'}).click();await expect(output).toBeFocused();
 const range=await output.evaluate(e=>({start:e.selectionStart,end:e.selectionEnd,len:e.value.length}));
 expect(range).toEqual({start:0,end:range.len,len:range.len});
});
test('Reconnection outline becomes stale and reset removes it',async({page})=>{
 await page.goto(url);const f=page.locator('#builder'),text=f.locator('#outline'),copy=f.getByRole('button',{name:'Select text to copy manually'}),status=f.locator('.status');
 await f.locator('#need').selectOption('calls');await f.locator('#backup').selectOption('text');await f.locator('#confirm').selectOption('consent');
 await f.getByRole('button',{name:'Create discussion outline'}).click();await expect(text).toHaveValue(/phone calls failing/);await expect(copy).toBeEnabled();
 await f.locator('#need').selectOption('support');await expect(text).toHaveValue('');await expect(copy).toBeDisabled();await expect(status).toBeEmpty();
 await f.getByRole('button',{name:'Create discussion outline'}).click();await expect(text).toHaveValue(/accessibility, dependent care or pet needs/);
 await f.getByRole('button',{name:'Clear selections'}).click();await expect(text).toHaveValue('');
 for(const id of ['need','backup','confirm'])await expect(f.locator('#'+id)).toHaveValue('');
 await expect(copy).toBeDisabled();
});
test('Reconnection mobile 200-percent root text and keyboard skip',async({page})=>{
 await page.setViewportSize({width:320,height:740});await page.goto(url);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to reconnection guide'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
 const f=page.locator('#channels .practice'),radio=f.getByRole('radio').first();
 await radio.focus();await page.keyboard.press('Space');await expect(radio).toBeChecked();
 await f.getByRole('button',{name:'Check my response'}).focus();await page.keyboard.press('Enter');
 await expect(f.getByRole('status')).toContainText('Good preparation reasoning.');
 const layout=await page.evaluate(()=>({w:innerWidth,doc:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(layout.doc,layout.body),'zoom overflow '+JSON.stringify(layout)).toBeLessThanOrEqual(layout.w+1);
});
test('Reconnection JavaScript off: lessons, all reasons, print outline and disabled buttons',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:750}});
 try{const page=await context.newPage();await page.goto(url);
  await expect(page.locator('.lesson')).toHaveCount(3);
  await expect(page.locator('button[type=submit]:disabled')).toHaveCount(4);
  for(const id of ids){
   const s=page.locator('#'+id);
   await s.locator('summary').click();await expect(s.locator('details li')).toHaveCount(3);
  }
  await expect(page.locator('#plan')).toContainText('Paper version (works without JavaScript)');
  await expect(page.locator('#plan')).toContainText('an out-of-area contact willing to help');
  await page.getByRole('navigation',{name:'Choose a reconnection lesson'}).getByRole('link').nth(2).click();await expect(page).toHaveURL(/#access$/);
 }finally{await context.close();}
});
test('Reconnection interactions have no storage or outgoing requests',async({page})=>{
 const writes=[],external=[];
 page.on('request',r=>{if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.url());
  if(!['localhost','127.0.0.1'].includes(new URL(r.url()).hostname))external.push(r.url());
 });
 await page.goto(url);const f=page.locator('#builder');
 await f.locator('#need').selectOption('support');await f.locator('#backup').selectOption('paper');await f.locator('#confirm').selectOption('staff');
 await f.getByRole('button',{name:'Create discussion outline'}).click();
 expect(writes).toEqual([]);expect(external).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await page.reload();await expect(page.locator('#outline')).toHaveValue('');
});
test('Reconnection official links and unpublished sibling lessons are not assumed',async({page})=>{
 await page.goto(url);await expect(page.locator('.sources a')).toHaveCount(3);
 const sources=await page.locator('.sources a').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
 expect(sources).toEqual(['https://www.cdc.gov/prepare-your-health/plan-ahead/stay-connected.html','https://www.redcross.org/get-help/how-to-prepare-for-emergencies/make-a-plan.html','https://www.redcross.org/get-help/disaster-relief-and-recovery-services/contact-and-locate-loved-ones.html']);
 for(const link of await page.locator('.sources a').all()){await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener noreferrer/);}
 await expect(page.getByRole('link',{name:'Emergencies & Preparedness area'})).toHaveAttribute('href','../index.html?area=Emergencies%20%26%20Preparedness');
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
});
