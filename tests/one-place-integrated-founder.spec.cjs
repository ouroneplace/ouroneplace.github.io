const {test,expect}=require('@playwright/test');
test('public work-in-progress copy is clearly labeled',async({page})=>{
 await page.goto('/');
 await expect(page.locator('header .flag')).toHaveText('PUBLIC WORK IN PROGRESS · NO PURCHASES');
 await expect(page.locator('header .flag')).not.toContainText('PUBLIC PREVIEW');
});

test('Founder integration: both Our Humanity and Home Skills are discoverable from one homepage',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/index.html');
  await expect(page.locator('.grid > a.tile')).toHaveCount(18);
  const nav=page.getByRole('navigation',{name:'One Place navigation'});
  const humanity=nav.getByRole('link',{name:'Our Humanity',exact:true});
  await expect(humanity).toBeVisible();
  await humanity.click();
  await expect(page).toHaveURL(/\/one-place\/our-humanity\.html$/);
  await expect(page.getByRole('heading',{name:/Come as you are/})).toBeVisible();
  await page.getByRole('link',{name:'One Place Home',exact:true}).first().click();
  await expect(page.getByRole('heading',{name:'Explore every part of life'})).toBeVisible();
  await page.getByRole('link',{name:/Housing & Utilities/}).first().click();
  await expect(page.getByRole('link',{name:/Open Home Skills Academy/})).toBeVisible();
  await page.getByRole('link',{name:/Open Home Skills Academy/}).click();
  await expect(page).toHaveURL(/\/one-place\/home-skills\.html$/);
  await expect(page.locator('details.skill')).toHaveCount(36);
  expect(errors).toEqual([]);
});
for(const width of [320,390,1366]){
 test('Founder integrated nav: both features fit '+width+'px',async({page})=>{
   await page.setViewportSize({width,height:800});
   await page.goto('/index.html');
   await expect(page.getByRole('navigation',{name:'One Place navigation'}).getByRole('link',{name:'Our Humanity',exact:true})).toBeVisible();
   const size=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
   expect(size.page).toBeLessThanOrEqual(size.viewport+1);
 });
}
