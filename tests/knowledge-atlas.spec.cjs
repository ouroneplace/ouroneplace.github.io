const {test,expect}=require('@playwright/test');

const cases=[
 {id:'claim1',correct:1,key:'Good reasoning.'},
 {id:'claim2',correct:2,key:'Good reasoning.'},
 {id:'claim3',correct:0,key:'Good reasoning.'}
];

for(const width of [320,390,1366,1920]){
 test('Knowledge Atlas: six real foundations and three practices reflow at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:850});
  await page.goto('/one-place/knowledge-atlas.html');
  await expect(page.getByRole('heading',{name:'A map of what we can learn together.',level:1})).toBeVisible();
  await expect(page.locator('.lesson')).toHaveCount(6);
  await expect(page.locator('.challenge')).toHaveCount(3);
  await expect(page.locator('.choice-form')).toHaveCount(3);
  await expect(page.locator('.choice input[type=radio]')).toHaveCount(9);
  await expect(page.locator('.lesson ol li')).toHaveCount(18);
  await expect(page.getByText('This is a beginning, not all of human knowledge.')).toBeVisible();
  for(const id of ['first','body','reason','earth','together','universe','practice','next']){
   await page.goto('/one-place/knowledge-atlas.html#'+id);
   await expect(page.locator('#'+id)).toBeVisible();
   const dimensions=await page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(dimensions.document,dimensions.body),'overflow at '+width+' '+id+': '+JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.width+1);
  }
  expect(errors).toEqual([]);
 });
}

for(const scene of cases){
 test('Knowledge Atlas: '+scene.id+' explains blank, unsafe, safe and reset choices',async({page})=>{
  await page.goto('/one-place/knowledge-atlas.html#'+scene.id);
  const parent=page.locator('#'+scene.id);
  const form=parent.locator('form.choice-form');
  const feedback=form.locator('.feedback');
  const choices=form.getByRole('radio');
  await expect(choices).toHaveCount(3);
  await form.getByRole('button',{name:'Check my reasoning'}).click();
  await expect(feedback).toContainText('Choose a response');
  await expect(choices.first()).toBeFocused();
  const wrong=(scene.correct+1)%3;
  await choices.nth(wrong).check();
  await form.getByRole('button',{name:'Check my reasoning'}).click();
  await expect(feedback).toContainText('Consider the safer choice.');
  await expect(feedback).toContainText(/.{40,}/);
  await choices.nth(scene.correct).check();
  await expect(feedback).toBeEmpty();
  await form.getByRole('button',{name:'Check my reasoning'}).click();
  await expect(feedback).toContainText(scene.key);
  await form.getByRole('button',{name:'Try again'}).click();
  await expect(feedback).toBeEmpty();
  await expect(choices.nth(scene.correct)).not.toBeChecked();
  await parent.locator('details summary').click();
  await expect(parent.locator('details')).toHaveAttribute('open','');
  await expect(parent.locator('details p')).toBeVisible();
 });
}

test('Knowledge Atlas: keyboard and 200 percent text remain operable at 320px',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/knowledge-atlas.html#claim2');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const form=page.locator('#claim2 form.choice-form'),radio=form.getByRole('radio').nth(2);
 await radio.focus();await page.keyboard.press('Space');
 await expect(radio).toBeChecked();
 await form.getByRole('button',{name:'Check my reasoning'}).focus();
 await page.keyboard.press('Enter');
 await expect(form.locator('.feedback')).toContainText('Good reasoning.');
 const dim=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(dim.html,dim.body),'200% text: '+JSON.stringify(dim)).toBeLessThanOrEqual(dim.width+1);
});

test('Knowledge Atlas: no-JavaScript still teaches and provides accessible source links',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto('/one-place/knowledge-atlas.html');
  await expect(page.locator('.lesson:visible')).toHaveCount(6);
  await expect(page.locator('.challenge:visible')).toHaveCount(3);
  await expect(page.locator('.choice-form button[type=submit]:disabled')).toHaveCount(3);
  await expect(page.locator('.lesson ol li')).toHaveCount(18);
  await expect(page.locator('#claim1 details summary')).toBeVisible();
  await page.locator('#claim1 details summary').click();
  await expect(page.locator('#claim1 details p')).toBeVisible();
  await page.getByRole('navigation',{name:'Jump to a knowledge foundation'}).getByRole('link').nth(3).click();
  await expect(page).toHaveURL(/#earth$/);
 }finally{await context.close();}
});

test('Knowledge Atlas: first-party self-contained page makes no third-party requests or writes',async({page})=>{
 const writes=[],thirdParty=[],firstParty=[];
 page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  const url=new URL(r.url());
  firstParty.push(r.url());
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
  if(!['127.0.0.1','localhost'].includes(url.hostname))thirdParty.push(r.url());
 });
 await page.goto('/one-place/knowledge-atlas.html');
 await page.locator('#claim1 input[type=radio]').nth(1).check();
 await page.locator('#claim1 button[type=submit]').click();
 expect(writes).toEqual([]);
 expect(thirdParty).toEqual([]);
 expect(firstParty.some(x=>x.includes('knowledge-atlas.html'))).toBe(true);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await page.reload();
 await expect(page.locator('#claim1 .feedback')).toBeEmpty();
 await expect(page.locator('#claim1 input:checked')).toHaveCount(0);
});

test('Knowledge Atlas: all six sources are optional external verifiable links and navigation is internal',async({page})=>{
 await page.goto('/one-place/knowledge-atlas.html');
 const links=page.locator('.lesson a[href^="https://"]');
 await expect(links).toHaveCount(6);
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(link).toContainText('external');
 }
 await expect(page.locator('#standards a[href^="https://"]')).toHaveCount(2);
 for(const link of await page.locator('#standards a[href^="https://"]').all()){
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await expect(page.getByRole('link',{name:'One Place home'}).first()).toHaveAttribute('href','../index.html');
 await page.getByRole('link',{name:'One Place home'}).first().click();
 await expect(page).toHaveURL(/\/index\.html$/);
});

test('Knowledge Atlas: standalone content remains useful without an external service',async({page})=>{
 await page.route('**/*',route=>{
  const url=new URL(route.request().url());
  if(['localhost','127.0.0.1'].includes(url.hostname))return route.continue();
  return route.abort();
 });
 await page.goto('/one-place/knowledge-atlas.html');
 await expect(page.locator('.lesson')).toHaveCount(6);
 await expect(page.locator('#reason')).toContainText('original source');
 await expect(page.locator('#earth')).toContainText('soil');
 await expect(page.locator('#universe')).toContainText('eight recognized planets');
 await expect(page.locator('#claim3 details')).toContainText('responsible local water provider');
});

test('Knowledge Atlas: published homepage and approved core pages are not modified by this draft',async({page})=>{
 await page.goto('/index.html');
 await expect(page.getByRole('heading',{level:1,name:/What do you need help with\?/})).toBeVisible();
 await expect(page.locator('a[href="one-place/knowledge-atlas.html"]')).toHaveCount(0);
});
