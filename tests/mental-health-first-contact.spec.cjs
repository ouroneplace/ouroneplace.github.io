const {test,expect}=require('@playwright/test');
const url='/one-place/mental-health-first-contact.html';
const ids=['start','cost','access'],safe=[1,0,2];
for(const width of [320,390,1366,1920]){
 test('First Contact: responsive navigation and complete lessons '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:780});await page.goto(url);
  await expect(page.getByRole('heading',{level:1,name:'Finding Support: First Contact Practice'})).toBeVisible();
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('form.practice')).toHaveCount(3);
  await expect(page.locator('.sources a')).toHaveCount(5);
  const links=page.getByRole('navigation',{name:'Choose a first-contact lesson'}).getByRole('link');
  await expect(links).toHaveCount(4);
  for(let i=0;i<4;i++){await links.nth(i).click();await expect(page).toHaveURL(new RegExp('#'+(ids[i]||'questions')+'$'));}
  const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(d.html,d.body),'horizontal overflow at '+width+' '+JSON.stringify(d)).toBeLessThanOrEqual(d.width+1);
  expect(errors).toEqual([]);
 });
}
for(let i=0;i<ids.length;i++){
 test('First Contact '+ids[i]+' blank, two unsafe, safe, stale and reset',async({page})=>{
  await page.goto(url+'#'+ids[i]);
  const form=page.locator('#'+ids[i]+' .practice'),radios=form.getByRole('radio'),submit=form.getByRole('button',{name:'Check this choice'}),feedback=form.locator('.feedback');
  await submit.click();await expect(feedback).toContainText('Choose one fictional');await expect(radios.first()).toBeFocused();
  for(let j=0;j<3;j++)if(j!==safe[i]){
   await radios.nth(j).check();await expect(feedback).toBeEmpty();
   await submit.click();await expect(feedback).toContainText('Consider a safer next step.');
  }
  await radios.nth(safe[i]).check();await expect(feedback).toBeEmpty();
  await submit.click();await expect(feedback).toContainText('Good practical reasoning.');
  await radios.nth((safe[i]+1)%3).check();await expect(feedback).toBeEmpty();
  await form.getByRole('button',{name:'Start again'}).click();await expect(feedback).toBeEmpty();
  await expect(form.locator('input:checked')).toHaveCount(0);
 });
}
test('First Contact: visible US crisis route before all activities',async({page})=>{
 await page.setViewportSize({width:320,height:780});await page.goto(url);
 const notice=page.locator('main > .alert');
 await expect(notice).toBeVisible();await expect(notice).toContainText('Safety comes before');
 await expect(notice).toContainText('immediate danger');
 await expect(notice.getByRole('link',{name:'988'})).toHaveAttribute('href','https://988lifeline.org/');
 await expect(page.locator('#start .stop')).toContainText('imminent danger');
});
test('First Contact: builder requires three choices and generates private sample',async({page})=>{
 await page.goto(url);const form=page.locator('#builder'),status=form.locator('.status'),sample=form.locator('#sample');
 await form.getByRole('button',{name:'Create sample inquiry'}).click();
 await expect(status).toContainText('Choose all three options');await expect(form.locator('#topic')).toBeFocused();
 await form.locator('#topic').selectOption('costs');await form.locator('#route').selectOption('community');await form.locator('#confirm').selectOption('fees');
 await form.getByRole('button',{name:'Create sample inquiry'}).click();
 await expect(sample).toHaveValue(/actual first-visit cost/);
 await expect(sample).toHaveValue(/community referral service/);
 await expect(sample).toHaveValue(/which actual fees/);
 await form.getByRole('button',{name:'Select text for manual copy'}).click();
 await expect(sample).toBeFocused();
 const range=await sample.evaluate(x=>({start:x.selectionStart,end:x.selectionEnd,length:x.value.length}));
 expect(range).toEqual({start:0,end:range.length,length:range.length});
});
test('First Contact: changed choices invalidate old sample; reset clears',async({page})=>{
 await page.goto(url);const form=page.locator('#builder'),sample=form.locator('#sample'),status=form.locator('.status'),copy=form.getByRole('button',{name:'Select text for manual copy'});
 await form.locator('#topic').selectOption('openings');await form.locator('#route').selectOption('clinic');await form.locator('#confirm').selectOption('schedule');
 await form.getByRole('button',{name:'Create sample inquiry'}).click();
 await expect(sample).toHaveValue(/new patients are being accepted/);await expect(copy).toBeEnabled();
 await form.locator('#topic').selectOption('access');
 await expect(sample).toHaveValue('');await expect(copy).toBeDisabled();await expect(status).toBeEmpty();
 await form.getByRole('button',{name:'Create sample inquiry'}).click();
 await expect(sample).toHaveValue(/accessible in-person or secure virtual visit/);
 await form.getByRole('button',{name:'Clear selections'}).click();
 await expect(sample).toHaveValue('');await expect(copy).toBeDisabled();
 for(const id of ['topic','route','confirm'])await expect(form.locator('#'+id)).toHaveValue('');
});
test('First Contact: 320px zoom and skip link keyboard reach content',async({page})=>{
 await page.setViewportSize({width:320,height:740});await page.goto(url);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to first contact practice'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
 const form=page.locator('#start .practice'),radio=form.getByRole('radio').nth(1);
 await radio.focus();await page.keyboard.press('Space');await expect(radio).toBeChecked();
 await form.getByRole('button',{name:'Check this choice'}).focus();await page.keyboard.press('Enter');
 await expect(form.getByRole('status')).toContainText('Good practical reasoning.');
 const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(d.html,d.body),'zoom overflow '+JSON.stringify(d)).toBeLessThanOrEqual(d.width+1);
});
test('First Contact: JavaScript-off shows safe complete teaching and paper sample',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{const page=await context.newPage();await page.goto(url);
  await expect(page.locator('section.lesson')).toHaveCount(3);
  await expect(page.locator('section.lesson .stop')).toHaveCount(3);
  await expect(page.locator('button[type=submit]:disabled')).toHaveCount(4);
  await expect(page.locator('#questions')).toContainText('Without JavaScript');
  await expect(page.locator('#questions')).toContainText('I am looking for mental health support');
  await page.getByRole('navigation',{name:'Choose a first-contact lesson'}).getByRole('link').nth(2).click();await expect(page).toHaveURL(/#access$/);
 }finally{await context.close();}
});
test('First Contact: no remote requests, storage or outbound writes',async({page})=>{
 const writes=[],offsite=[];page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.url());
  if(!['localhost','127.0.0.1'].includes(new URL(r.url()).hostname))offsite.push(r.url());
 });
 await page.goto(url);const form=page.locator('#builder');
 await form.locator('#topic').selectOption('access');await form.locator('#route').selectOption('coverage');await form.locator('#confirm').selectOption('access');
 await form.getByRole('button',{name:'Create sample inquiry'}).click();
 expect(writes).toEqual([]);expect(offsite).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await page.reload();await expect(page.locator('#sample')).toHaveValue('');
});
test('First Contact: only opt-in trusted source links and correct area return',async({page})=>{
 await page.goto(url);await expect(page.locator('.sources a')).toHaveCount(5);
 for(const link of await page.locator('.sources a').all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  const url=await link.getAttribute('href');
  expect(url).toMatch(/^https:\/\/(www\.nimh\.nih\.gov|www\.samhsa\.gov)\//);
 }
 await expect(page.getByRole('link',{name:'Mental Health & Safety area'})).toHaveAttribute('href','../index.html?area=Mental%20Health%20%26%20Safety');
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
});
