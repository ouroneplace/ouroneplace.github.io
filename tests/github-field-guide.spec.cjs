const {test,expect}=require('@playwright/test');

for(const width of [320,390,1366,1920]){
 test('GitHub Field Guide is readable and one-at-a-time at '+width+'px',async({page})=>{
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.setViewportSize({width,height:840});
  await page.goto('/one-place/github-field-guide.html');
  await expect(page.getByRole('heading',{name:'GitHub Field Guide',level:1})).toBeVisible();
  await expect(page.locator('section.mission')).toHaveCount(4);
  await expect(page.locator('section.mission:visible')).toHaveCount(1);
  await expect(page.locator('input[type=radio]')).toHaveCount(12);
  for(const [n,id] of ['mission-1','mission-2','mission-3','mission-4'].entries()){
   await page.getByRole('navigation',{name:'Choose a GitHub mission'}).getByRole('link').nth(n).click();
   await expect(page).toHaveURL(new RegExp('#'+id+'$'));
   await expect(page.locator('#'+id)).toBeVisible();
   await expect(page.locator('section.mission:visible')).toHaveCount(1);
   expect(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth))).toBeLessThanOrEqual(width+1);
  }
  expect(errors).toEqual([]);
 });
}

for(const n of [1,2,3,4]){
 test('GitHub Field Guide mission '+n+' gives explanatory feedback and allows a retry',async({page})=>{
  await page.goto('/one-place/github-field-guide.html#mission-'+n);
  const practice=page.locator('#mission-'+n+' .practice');
  const button=practice.getByRole('button',{name:'Check my answer'});
  const feedback=practice.locator('.feedback');
  const answers=practice.getByRole('radio');
  await expect(answers).toHaveCount(3);
  await button.click();
  await expect(feedback).toContainText('Choose one answer first');
  await expect(answers.first()).toBeFocused();
  const correct=Number(await practice.getAttribute('data-correct'));
  await answers.nth((correct+1)%3).check();
  await button.click();
  await expect(feedback).toContainText('Try this reasoning.');
  await answers.nth(correct).check();
  await expect(feedback).toBeEmpty();
  await button.click();
  await expect(feedback).toContainText('Good reasoning.');
 });
}

test('GitHub Field Guide supports previous, next and browser back navigation',async({page})=>{
 await page.goto('/one-place/github-field-guide.html');
 await page.locator('#mission-1 .next').click();
 await expect(page).toHaveURL(/#mission-2$/);
 await expect(page.getByRole('heading',{name:'Understand a draft pull request'})).toBeVisible();
 await page.locator('#mission-2 .next').click();
 await expect(page).toHaveURL(/#mission-3$/);
 await page.goBack();
 await expect(page).toHaveURL(/#mission-2$/);
 await page.locator('#mission-2 .prev').click();
 await expect(page).toHaveURL(/#mission-1$/);
 await expect(page.locator('#progress')).toContainText('Mission 1 of 4');
});

test('GitHub Field Guide works by keyboard and at 200 percent text on a 320px screen',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/github-field-guide.html#mission-3');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const practice=page.locator('#mission-3 .practice');
 const correct=Number(await practice.getAttribute('data-correct'));
 await practice.getByRole('radio').nth(correct).focus();
 await page.keyboard.press('Space');
 await expect(practice.getByRole('radio').nth(correct)).toBeChecked();
 await practice.getByRole('button',{name:'Check my answer'}).focus();
 await page.keyboard.press('Enter');
 await expect(practice.getByRole('status')).toContainText('Good reasoning.');
 const widths=await page.evaluate(()=>({screen:innerWidth,doc:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(widths.doc,widths.body),'200% text reflow '+JSON.stringify(widths)).toBeLessThanOrEqual(widths.screen+1);
});

test('GitHub Field Guide keeps all explanations and sources usable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto('/one-place/github-field-guide.html');
  await expect(page.locator('section.mission:visible')).toHaveCount(4);
  await expect(page.locator('button.check:disabled')).toHaveCount(4);
  await page.getByRole('navigation',{name:'Choose a GitHub mission'}).getByRole('link').nth(2).click();
  await expect(page).toHaveURL(/#mission-3$/);
  await expect(page.getByRole('heading',{name:'Understand a red X in Actions'})).toBeVisible();
 }finally{await context.close();}
});

test('GitHub Field Guide appears only in Learning and Education, preserves four catalog cards',async({page})=>{
 await page.goto('/index.html?area=Learning%20%26%20Education');
 await expect(page.locator('.offers > a.offer')).toHaveCount(4);
 await page.getByRole('link',{name:'Learn GitHub with One Place'}).click();
 await expect(page).toHaveURL(/\/one-place\/github-field-guide\.html$/);
 await page.getByRole('link',{name:'Learning & Education'}).last().click();
 await expect(page).toHaveURL(/area=Learning/);
 await page.goto('/index.html?area=Technology%20%26%20Digital%20Safety');
 await expect(page.locator('#github-learning-path')).toHaveCount(0);
});

test('GitHub Field Guide uses safe external links, no tracking, saves nothing',async({page})=>{
 const writes=[],thirdParty=[];
 page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
  if(!['127.0.0.1','localhost'].includes(new URL(r.url()).hostname))thirdParty.push(r.url());
 });
 await page.goto('/one-place/github-field-guide.html');
 await page.locator('#mission-1 .practice input[type="radio"]').nth(1).check();
 await page.locator('#mission-1 .practice button.check').click();
 expect(writes).toEqual([]);
 expect(thirdParty).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 const links=page.locator('.links a[href^="https://"]');
 await expect(links).toHaveCount(9);
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await page.reload();
 await expect(page.locator('#mission-1 .feedback')).toBeEmpty();
});

test('GitHub Field Guide captures reviewable exact-source screenshots across layouts',async({page})=>{
 const fs=require('node:fs');
 fs.mkdirSync('review-artifacts',{recursive:true});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 for(const width of [320,390,1366,1920]){
  await page.setViewportSize({width,height:850});
  await page.goto('/one-place/github-field-guide.html');
  await expect(page.getByRole('heading',{name:'GitHub Field Guide'})).toBeVisible();
  await expect(page.locator('section.mission:visible')).toHaveCount(1);
  await page.screenshot({path:'review-artifacts/github-field-guide-'+width+'-top.png'});
  const layout=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
  expect(Math.max(layout.html,layout.body),'viewport '+width+': '+JSON.stringify(layout)).toBeLessThanOrEqual(width+1);
 }
 await page.setViewportSize({width:390,height:850});
 for(const mission of [2,3,4]){
  await page.goto('/one-place/github-field-guide.html#mission-'+mission);
  await expect(page.locator('#mission-'+mission)).toBeVisible();
  await page.screenshot({path:'review-artifacts/github-field-guide-390-mission'+mission+'.png'});
 }
 await page.setViewportSize({width:320,height:850});
 await page.goto('/one-place/github-field-guide.html#mission-3');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 await expect(page.locator('#mission-3')).toBeVisible();
 await page.screenshot({path:'review-artifacts/github-field-guide-320-text200.png'});
 const zoomLayout=await page.evaluate(()=>({width:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(zoomLayout.html,zoomLayout.body),'320px at 200%: '+JSON.stringify(zoomLayout)).toBeLessThanOrEqual(zoomLayout.width+1);
 expect(errors).toEqual([]);
});
