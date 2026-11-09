const {test,expect}=require('@playwright/test');
test('v4 removes the old public banner and exposes honest About information',async({page})=>{
 await page.goto('/');
 await expect(page.locator('header .flag')).toHaveCount(0);
 await expect(page.locator('.op4-brand')).toContainText('ONE PLACE');
 await expect(page.locator('.op4-brand svg')).toBeVisible();
 await expect(page.locator('.op4-menu summary')).toHaveText('About');
 await expect(page.locator('.grid .tile.pending')).toHaveCount(3);
 await expect(page.getByRole('searchbox')).toHaveCount(0);
});
test('Founder integration: Our Humanity and Home Skills remain discoverable',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/index.html');
 await expect(page.locator('.grid > a.tile')).toHaveCount(21);
 await page.locator('.grid > a.new-card').filter({hasText:'Our Humanity'}).click();
 await expect(page).toHaveURL(/\/one-place\/our-humanity\.html$/);
 await expect(page.getByRole('heading',{name:/Come as you are/})).toBeVisible();
 await page.getByRole('link',{name:'One Place Home',exact:true}).first().click();
 await expect(page.getByRole('heading',{name:'Explore every part of life'})).toBeVisible();
 await page.locator('.grid > a.tile').nth(1).click();
 await expect(page.getByRole('link',{name:/Open Home Skills Academy/})).toBeVisible();
 await page.getByRole('link',{name:/Open Home Skills Academy/}).click();
 await expect(page).toHaveURL(/\/one-place\/home-skills\.html$/);
 await expect(page.locator('details.skill')).toHaveCount(36);
 expect(errors).toEqual([]);
});
for(const width of [320,390,1366]){
 test('Founder integrated v4 cards fit '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:800});
  await page.goto('/index.html');
  await expect(page.locator('.grid > a.new-card').filter({hasText:'Our Humanity'})).toBeVisible();
  const size=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
  expect(size.page).toBeLessThanOrEqual(size.viewport+1);
 });
}
