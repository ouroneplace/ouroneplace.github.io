const {test,expect}=require('@playwright/test');

for(const width of [320,390,1366,1920]){
 test('Health & Wellness: all four paths are real and accessible at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:850});
  await page.goto('/index.html?area=Health%20%26%20Wellness');
  await expect(page).toHaveURL(/\/one-place\/health-wellness\.html$/);
  await expect(page.getByRole('heading',{level:1,name:'Health & Wellness',exact:true})).toBeVisible();
  await expect(page.locator('.offers > a.offer')).toHaveCount(4);
  await expect(page.getByRole('form',{name:'Wellness routine builder'})).toHaveCount(1);
  await expect(page.getByRole('form',{name:'Appointment preparation studio'})).toHaveCount(1);
  await expect(page.getByRole('button',{name:'Review my appointment notes'})).toBeEnabled();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  const targets=['coverage','visit','habits','plan'];
  for(let i=0;i<4;i++){
   const link=page.locator('.offers > a.offer').nth(i);
   await expect(link).toHaveAttribute('href','../one-place/health-wellness.html#'+targets[i]);
   await link.click();
   await expect(page).toHaveURL(new RegExp('#'+targets[i]+'$'));
   await expect(page.locator('#'+targets[i])).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  await page.getByRole('link',{name:'One Place home',exact:true}).first().click();
  await expect(page.getByRole('heading',{name:'Explore every part of life'})).toBeVisible();
  expect(errors).toEqual([]);
 });
}

test('Health: old service deep links land on each working tool rather than prototype',async({page})=>{
 for(const [id,target] of [['s013','coverage'],['s014','visit'],['s015','habits'],['s016','plan']]){
  await page.goto('/index.html?service='+id);
  await expect(page).toHaveURL(new RegExp('/one-place/health-wellness.html#'+target+'$'));
  await expect(page.locator('#'+target)).toBeVisible();
 }
});

test('Health: appointment notes require content, review before export, and no automatic download',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let downloads=0;page.on('download',()=>downloads++);
 await page.goto('/one-place/health-wellness.html#plan');
 await expect(page.locator('#downloadVisit')).toBeDisabled();
 await page.locator('#reviewVisit').click();
 await expect(page.locator('#visitStatus')).toContainText('Add at least one');
 await expect(page.locator('#concerns')).toBeFocused();
 expect(downloads).toBe(0);
 await page.locator('#concerns').fill('Discuss everyday sleep difficulty');
 await page.locator('#questions').fill('What are the options?');
 await page.locator('#reviewVisit').click();
 await expect(page.locator('#visitPreview')).toContainText('Discuss everyday sleep difficulty');
 await expect(page.locator('#downloadVisit')).toBeEnabled();
 await page.locator('#questions').fill('What should I ask about next?');
 await expect(page.locator('#downloadVisit')).toBeDisabled();
 await page.locator('#reviewVisit').click();
 page.once('dialog',d=>d.dismiss());
 await page.locator('#downloadVisit').click();
 await expect(page.locator('#visitStatus')).toContainText('Download canceled');
 expect(downloads).toBe(0);
 page.once('dialog',d=>d.accept());
 const pending=page.waitForEvent('download');
 await page.locator('#downloadVisit').click();
 const file=await pending;
 expect(file.suggestedFilename()).toBe('one-place-appointment-questions.txt');
 const chunks=[];for await(const c of await file.createReadStream())chunks.push(c);
 const body=Buffer.concat(chunks).toString('utf8');
 expect(body).toContain('What should I ask about next?');
 expect(body).toContain('Discuss everyday sleep difficulty');
 expect(errors).toEqual([]);
});

test('Health: draft clearing requires consent and does not erase when canceled',async({page})=>{
 await page.goto('/one-place/health-wellness.html');
 await page.locator('#concerns').fill('Fictional private planning note');
 page.once('dialog',d=>d.dismiss());
 await page.locator('#clearVisit').click();
 await expect(page.locator('#concerns')).toHaveValue('Fictional private planning note');
 page.once('dialog',d=>d.accept());
 await page.locator('#clearVisit').click();
 await expect(page.locator('#concerns')).toHaveValue('');
 await expect(page.locator('#visitStatus')).toContainText('cleared');
 await expect(page.locator('#downloadVisit')).toBeDisabled();
});

test('Health: the habit builder is useful, editable and safe at 200% text',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/health-wellness.html#habits');
 await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
 await page.locator('#makeHabit').click();
 await expect(page.locator('#habitStatus')).toContainText('Choose both');
 await page.locator('#habitCue').fill('After breakfast');
 await page.locator('#habitAction').fill('Take a quiet pause');
 await page.locator('#makeHabit').click();
 await expect(page.locator('#habitResult')).toContainText('After breakfast');
 const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).slice(0,8).map(el=>({tag:el.tagName,id:el.id,cls:el.className,right:Math.round(el.getBoundingClientRect().right)}))}));
 expect(dimensions.scroll,'200% health routine reflow: '+JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.width+1);
 await page.locator('#habitAction').fill('Take a gentle pause');
 await expect(page.locator('#habitResult')).toBeHidden();
 await page.locator('#makeHabit').click();
 await expect(page.locator('#habitResult')).toContainText('gentle pause');
 await page.locator('#resetHabit').click();
 await expect(page.locator('#habitResult')).toBeHidden();
});

test('Health: user notes are escaped, kept local and lost on reload',async({page})=>{
 const requests=[];
 page.on('request',request=>{if(!['GET','HEAD'].includes(request.method()))requests.push(request.method()+' '+request.url());});
 await page.goto('/one-place/health-wellness.html');
 const literal='<img src=x onerror="window.healthUnsafe=true">'+ 'R'.repeat(200);
 await page.locator('#questions').fill(literal);
 await page.locator('#reviewVisit').click();
 await expect(page.locator('#visitPreview')).toContainText(literal);
 await expect(page.locator('#visitPreview img')).toHaveCount(0);
 expect(await page.evaluate(()=>window.healthUnsafe)).toBeUndefined();
 expect(await page.evaluate(()=>Object.keys(localStorage).length)).toBe(0);
 expect(requests).toEqual([]);
 await page.reload();
 await expect(page.locator('#questions')).toHaveValue('');
 await expect(page.locator('#downloadVisit')).toBeDisabled();
});

test('Health: official references are plainly labeled as external and have safe link attributes',async({page})=>{
 await page.goto('/one-place/health-wellness.html');
 const links=page.locator('a[href^="https://"]');
 expect(await links.count()).toBeGreaterThanOrEqual(5);
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await expect(page.getByRole('link',{name:/MedlinePlus: talking with your doctor/})).toHaveAttribute('href','https://medlineplus.gov/talkingwithyourdoctor.html');
 await expect(page.getByRole('link',{name:/AHRQ: Question Builder/})).toHaveAttribute('href','https://www.ahrq.gov/questions/question-builder/online.html');
});

test('Health: guide and four choices remain readable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto('/one-place/health-wellness.html');
  await expect(page.getByRole('heading',{name:'Health & Wellness',exact:true})).toBeVisible();
  await expect(page.locator('.offers > a.offer')).toHaveCount(4);
  await expect(page.locator('noscript p')).toContainText('JavaScript is needed for the two interactive builders.');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }finally{await context.close();}
});


test('Health: source registry labels all implemented Health tools as free and routes to real pages',async({page})=>{
 await page.goto('/index.html');
 const records=await page.evaluate(()=>all.filter(item=>item.area==='Health & Wellness').map(item=>({kind:item.kind,url:uService(item.id)})));
 expect(records).toEqual([
  {kind:'free',url:'one-place/health-wellness.html#coverage'},
  {kind:'free',url:'one-place/health-wellness.html#visit'},
  {kind:'free',url:'one-place/health-wellness.html#habits'},
  {kind:'free',url:'one-place/health-wellness.html#plan'}
 ]);
});
