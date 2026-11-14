const {test,expect}=require('@playwright/test');
const pageUrl='/one-place/accessible-service-request-practice.html';
const ids=['format','meeting','alternative'],safe=[1,0,2];
for(const width of [320,390,1366,1920]){
 test('Accessible communication: responsive content at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:800});await page.goto(pageUrl);
  await expect(page.getByRole('heading',{name:'Ask for Accessible Communication',level:1})).toBeVisible();
  await expect(page.locator('.lesson')).toHaveCount(3);
  await expect(page.locator('.practice')).toHaveCount(3);
  await expect(page.locator('.sources a')).toHaveCount(3);
  const links=page.getByRole('navigation',{name:'Choose a communication lesson'}).getByRole('link');
  await expect(links).toHaveCount(4);
  for(let n=0;n<4;n++){await links.nth(n).click();await expect(page).toHaveURL(new RegExp('#'+(ids[n]||'request')+'$'));}
  const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(d.html,d.body),'overflow '+width+' '+JSON.stringify(d)).toBeLessThanOrEqual(d.width+1);
  expect(errors).toEqual([]);
 });
}
for(let i=0;i<ids.length;i++){
 test('Accessible communication '+ids[i]+' all choices and feedback reset',async({page})=>{
  await page.goto(pageUrl+'#'+ids[i]);
  const form=page.locator('#'+ids[i]+' form.practice'),choices=form.getByRole('radio'),check=form.getByRole('button',{name:'Check my choice'}),feedback=form.locator('.feedback');
  await check.click();await expect(feedback).toContainText('Choose a fictional');await expect(choices.first()).toBeFocused();
  for(let j=0;j<3;j++)if(j!==safe[i]){await choices.nth(j).check();await expect(feedback).toBeEmpty();await check.click();await expect(feedback).toContainText('Consider a more effective approach.');}
  await choices.nth(safe[i]).check();await expect(feedback).toBeEmpty();await check.click();await expect(feedback).toContainText('Good access reasoning.');
  await choices.nth((safe[i]+1)%3).check();await expect(feedback).toBeEmpty();
  await form.getByRole('button',{name:'Start again'}).click();await expect(feedback).toBeEmpty();await expect(form.locator('input:checked')).toHaveCount(0);
 });
}
test('Accessible communication: local draft requires every selection and asks no private details',async({page})=>{
 await page.goto(pageUrl);
 const b=page.locator('#request-form'),status=b.locator('.status'),sample=b.locator('#sample');
 await b.getByRole('button',{name:'Create my sample wording'}).click();
 await expect(status).toContainText('Choose all three options');
 await expect(b.locator('#setting')).toBeFocused();await expect(sample).toHaveValue('');
 await b.locator('#setting').selectOption('office');await b.locator('#method').selectOption('electronic');
 await b.locator('#confirm').selectOption('test');await b.getByRole('button',{name:'Create my sample wording'}).click();
 await expect(sample).toContainValue('state or local public office');
 await expect(sample).toContainValue('accessible electronic text');
 await expect(sample).toContainValue('check that the accessible material or aid works');
 await b.getByRole('button',{name:'Select wording for manual copy'}).click();
 await expect(sample).toBeFocused();
 const selected=await sample.evaluate(x=>({start:x.selectionStart,end:x.selectionEnd,length:x.value.length}));
 expect(selected).toEqual({start:0,end:selected.length,length:selected.length});
});
test('Accessible communication: changing selection invalidates old sample and reset clears',async({page})=>{
 await page.goto(pageUrl);
 const b=page.locator('#request-form'),sample=b.locator('#sample'),status=b.locator('.status'),select=b.getByRole('button',{name:'Select wording for manual copy'});
 await b.locator('#setting').selectOption('meeting');await b.locator('#method').selectOption('captions');await b.locator('#confirm').selectOption('written');
 await b.getByRole('button',{name:'Create my sample wording'}).click();
 await expect(sample).toContainValue('real-time captions');await expect(select).toBeEnabled();
 await b.locator('#method').selectOption('interpreter');await expect(sample).toHaveValue('');await expect(select).toBeDisabled();await expect(status).toBeEmpty();
 await b.getByRole('button',{name:'Create my sample wording'}).click();await expect(sample).toContainValue('qualified sign-language interpreting');
 await b.getByRole('button',{name:'Clear selections'}).click();
 await expect(sample).toHaveValue('');await expect(select).toBeDisabled();
 await expect(b.locator('#setting')).toHaveValue('');await expect(b.locator('#method')).toHaveValue('');await expect(b.locator('#confirm')).toHaveValue('');
});
test('Accessible communication: keyboard skip and 200 percent text on phone',async({page})=>{
 await page.setViewportSize({width:320,height:740});await page.goto(pageUrl);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to communication practice'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
 const form=page.locator('#format .practice'),radio=form.getByRole('radio').nth(1);
 await radio.focus();await page.keyboard.press('Space');await expect(radio).toBeChecked();
 await form.getByRole('button',{name:'Check my choice'}).focus();await page.keyboard.press('Enter');
 await expect(form.getByRole('status')).toContainText('Good access reasoning.');
 const d=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(d.html,d.body),'zoom overflow '+JSON.stringify(d)).toBeLessThanOrEqual(d.width+1);
});
test('Accessible communication: readable full no-JS practice and sample',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:760}});
 try{const page=await context.newPage();await page.goto(pageUrl);
  await expect(page.locator('.lesson')).toHaveCount(3);
  await expect(page.locator('button[type=submit]:disabled')).toHaveCount(4);
  await expect(page.locator('#request')).toContainText('No-JavaScript request example');
  await expect(page.locator('#request')).toContainText('I am trying to use your service');
  await page.getByRole('navigation',{name:'Choose a communication lesson'}).getByRole('link').nth(2).click();await expect(page).toHaveURL(/#alternative$/);
 }finally{await context.close();}
});
test('Accessible communication: no storage or outgoing request from interaction',async({page})=>{
 const writes=[],offsite=[];page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.url());
  if(!['localhost','127.0.0.1'].includes(new URL(r.url()).hostname))offsite.push(r.url());
 });
 await page.goto(pageUrl);
 const b=page.locator('#request-form');
 await b.locator('#setting').selectOption('business');await b.locator('#method').selectOption('print');await b.locator('#confirm').selectOption('alternate');
 await b.getByRole('button',{name:'Create my sample wording'}).click();
 expect(writes).toEqual([]);expect(offsite).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await page.reload();await expect(page.locator('#sample')).toHaveValue('');
});
test('Accessible communication: US-specific source links, safe opt-in and area return',async({page})=>{
 await page.goto(pageUrl);
 await expect(page.locator('.sources a')).toHaveCount(3);
 for(const link of await page.locator('.sources a').all()){
  await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(link).toHaveAttribute('href',/^https:\/\/www\.ada\.gov\//);
 }
 await expect(page.getByRole('link',{name:'Aging & Accessibility area'})).toHaveAttribute('href','../index.html?area=Aging%20%26%20Accessibility');
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','index,follow');
 await expect(page.locator('main > p.notice')).toContainText('not a legal decision');
});
