const {test,expect}=require('@playwright/test');

for(const width of [320,390,768,1366,1920]){
 test('Family category and handoff remain usable at '+width+'px',async({page})=>{
  const errs=[];page.on('pageerror',err=>errs.push(err.message));
  await page.setViewportSize({width,height:850});
  await page.goto('/index.html?area=Family%20%26%20Caregiving');
  await expect(page.getByRole('heading',{name:'Family & Caregiving',exact:true})).toBeVisible();
  const link=page.locator('[data-care-pilot-link]');
  await expect(link).toHaveAttribute('href','one-place/family-handoff.html');
  await expect(page.getByText('FUTURE SERVICE',{exact:true})).toHaveCount(0);
  await expect(page.getByText('An unlaunched assisted-service idea',{exact:false})).toHaveCount(0);
  await expect(page.locator('#areaKit')).toHaveCount(0);
  await expect(page.locator('.offers > a.offer')).toHaveCount(4);
  await expect(page.locator('#family-resources a')).toHaveCount(3);
  await expect(page.locator('#family-resources a').nth(0)).toHaveAttribute('href','https://eldercare.acl.gov/');
  await expect(page.locator('#family-resources a').nth(2)).toHaveAttribute('href','https://www.caregiver.va.gov/CAREGIVER/PGCSS.asp');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)).toBe(true);
  await link.click();
  await expect(page).toHaveURL(/\/one-place\/family-handoff\.html$/);
  await expect(page).toHaveTitle('Family Handoff Toolkit · ONE PLACE');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow');
  await expect(page.getByText(/FREE PUBLIC FAMILY HANDOFF TOOL/)).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)).toBe(true);
  await page.getByRole('link',{name:/Family & Caregiving/}).click();
  await expect(page).toHaveURL(/\?area=Family%20%26%20Caregiving$/);
  expect(errs).toEqual([]);
 });
}

test('Handoff: review button does not download an incomplete plan automatically',async({page})=>{
 await page.goto('/one-place/family-handoff.html');
 let count=0;page.on('download',()=>count++);
 await page.locator('#quick').click();
 await expect(page.getByRole('heading',{name:'Handoff preview'})).toBeVisible();
 await expect(page.locator('#alert')).toContainText('Before sharing');
 await expect(page.locator('#exportStatus')).toContainText('Review the handoff');
 expect(count).toBe(0);
 page.once('dialog',d=>d.dismiss());
 await page.locator('#save').click();
 await expect(page.locator('#exportStatus')).toContainText('Download canceled');
 expect(count).toBe(0);
});

test('Handoff: task edit and cancel preserve entries and allow completed export',async({page})=>{
 const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.goto('/one-place/family-handoff.html');
 await page.locator('#person').fill('Family member A');
 await page.locator('#lead').fill('Primary helper');
 await page.locator('#backup').fill('Backup helper');
 await page.getByRole('button',{name:/Next: responsibilities/}).click();
 await page.locator('#title').fill('Arrange transport');
 await page.locator('#owner').fill('Helper One');
 await page.locator('#taskSubmit').click();
 await expect(page.locator('#tasks .task')).toHaveCount(1);
 await page.getByRole('button',{name:'Edit responsibility: Arrange transport'}).click();
 await expect(page.locator('#taskSubmit')).toHaveText('Save changes');
 await page.locator('#title').fill('Arrange safe transport');
 await page.locator('#owner').fill('Helper Two');
 await page.locator('#cancelEdit').click();
 await expect(page.getByRole('button',{name:'Edit responsibility: Arrange transport'})).toBeVisible();
 await page.getByRole('button',{name:'Edit responsibility: Arrange transport'}).click();
 await page.locator('#title').fill('Arrange safe transport');
 await page.locator('#owner').fill('Helper Two');
 await page.locator('#taskSubmit').click();
 await expect(page.locator('#tasks .task')).toHaveCount(1);
 await expect(page.locator('#tasks')).toContainText('Arrange safe transport');
 await expect(page.locator('#tasks')).toContainText('Helper Two');
 await page.getByRole('button',{name:/Next: follow-up/}).click();
 await expect(page.getByRole('heading',{name:'Open concerns and follow-up'})).toBeVisible();
 await page.getByRole('button',{name:/Make handoff/}).click();
 await expect(page.locator('#nReady')).toHaveText('Review ready');
 const filePromise=page.waitForEvent('download');
 await page.locator('#save').click();
 const file=await filePromise;
 expect(file.suggestedFilename()).toBe('one-place-family-handoff.txt');
 const chunks=[];for await(const c of await file.createReadStream())chunks.push(c);
 const body=Buffer.concat(chunks).toString('utf8');
 expect(body).toContain('Arrange safe transport');
 expect(body).toContain('Owner: Helper Two');
 expect(body).not.toContain('FICTIONAL EXAMPLE');
 expect(errs).toEqual([]);
});

test('Handoff: loading fictional data asks before overwriting and stays clearly marked',async({page})=>{
 await page.goto('/one-place/family-handoff.html');
 await page.locator('#person').fill('My own planning note');
 page.once('dialog',d=>d.dismiss());
 await page.locator('#sample').click();
 await expect(page.locator('#person')).toHaveValue('My own planning note');
 page.once('dialog',d=>d.accept());
 await page.locator('#sample').click();
 await expect(page.locator('#nReady')).toHaveText('Sample');
 await expect(page.locator('#sampleNotice')).toBeVisible();
 await expect(page.locator('#tasks .task')).toHaveCount(2);
 await page.getByRole('tab',{name:'1. Household'}).click();
 await page.locator('#person').fill('A revised label');
 await expect(page.locator('#sampleNotice')).toBeVisible();
 await expect(page.locator('#nReady')).toHaveText('Sample');
 await page.getByRole('tab',{name:'4. Handoff'}).click();
 await expect(page.locator('#preview')).toContainText('FICTIONAL EXAMPLE');
 page.once('dialog',d=>d.dismiss());
 await page.locator('#save').click();
 await expect(page.locator('#exportStatus')).toContainText('Download canceled');
 page.once('dialog',d=>d.accept());
 await page.locator('#clear').click();
 await expect(page.locator('#tasks .task')).toHaveCount(0);
 await expect(page.locator('#sampleNotice')).toBeHidden();
 await expect(page.locator('#nReady')).toHaveText('Needs review');
});

test('Verified family support resources stay available and external links are labeled',async({page})=>{
 await page.goto('/one-place/family-handoff.html');
 const links=page.locator('a[href^="https://"]');
 await expect(links).toHaveCount(4);
 for(const a of await links.all()){
  await expect(a).toHaveAttribute('target','_blank');
  await expect(a).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await expect(page.getByRole('link',{name:/Eldercare Locator/})).toHaveAttribute('href','https://eldercare.acl.gov/');
});


test('All four Family category cards open distinct working Handoff steps',async({page})=>{
 for(let i=1;i<=4;i++){
  await page.setViewportSize({width:390,height:844});
  await page.goto('/index.html?area=Family%20%26%20Caregiving');
  const offer=page.locator('.offers > a.offer').nth(i-1);
  await expect(offer).toHaveAttribute('href','one-place/family-handoff.html#p'+i);
  await offer.click();
  await expect(page).toHaveURL(new RegExp('family-handoff\\.html#p'+i+'$'));
  await expect(page.locator('#p'+i)).toBeVisible();
  await expect(page.locator('[role="tab"][data-panel="p'+i+'"]')).toHaveAttribute('aria-selected','true');
  await expect(page.getByRole('link',{name:'One Place home',exact:true})).toBeVisible();
 }
});
