const {test,expect}=require('@playwright/test');
// Founder approved visual direction on November 9: cosmic TEAL banner with only
// the ONE PLACE wordmark; About beneath the banner; intro and functional tiles.
for(const width of [320,390,768,1050,1366,1670]){
 test('Founder-approved ONE PLACE homepage layout at '+width+'px', async({page})=>{
  await page.setViewportSize({width,height:width>=1050?941:800});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/index.html');
  const header=page.locator('header.op5-cosmic');
  const brand=header.locator('.op4-brand');
  await expect(header).toBeVisible();
  await expect(header.locator('.op4-name')).toHaveText('ONE PLACE');
  await expect(header.locator('.op4-source-symbol')).toBeVisible();
  const back=await header.evaluate(el=>getComputedStyle(el).backgroundImage);
  expect(back).toContain('/teal/assets/earth-1536.webp');
  if(width<=700){
   // The original mobile scene contains the emblem; avoid a second visible copy.
   await expect(header.locator('.op4-source-symbol')).toHaveCSS('opacity','0');
   const layout=await page.evaluate(()=>({grid:getComputedStyle(document.querySelector('.grid')).gridTemplateColumns,scene:getComputedStyle(document.querySelector('.op5-cosmic')).backgroundSize}));
   expect(layout.grid.split(' ').length).toBe(3);
   expect(layout.scene).toBe('cover');
   const seam=await header.evaluate(el=>({
    outer:el.getBoundingClientRect().height,
    overlay:parseFloat(getComputedStyle(el,'::before').height),
    background:getComputedStyle(el).backgroundPosition
   }));
   // Guard against fixed-height legacy ::before, the 98px seam observed on Android.
   expect(Math.abs(seam.outer-seam.overlay)).toBeLessThanOrEqual(2);
   expect(seam.background).toContain('53%');
  }
  await expect(header).not.toContainText('Trinity Equals');
  await expect(header).not.toContainText('Respect for Self');
  await expect(header).not.toContainText('CLICK THE SYMBOL');
  await expect(header).not.toContainText('About');
  const menu=page.locator('.op5-menu-row .op4-menu');
  await expect(menu.getByText('About',{exact:true})).toBeVisible();
  const a=await header.boundingBox(),b=await menu.boundingBox();
  expect(b.y).toBeGreaterThanOrEqual(a.y+a.height-1);
  expect(b.x+b.width).toBeLessThanOrEqual(width+1);
  await expect(page.getByRole('heading',{name:'What do you need help with?'})).toBeVisible();
  await expect(page.getByText('ONE HOME FOR LIFE’S MANY NEEDS')).toBeVisible();
  await expect(page.getByText('Explore practical life areas, learning, human connection and safe ways to practice.')).toBeVisible();
  await expect(page.getByRole('heading',{name:'Explore every part of life'})).toBeVisible();
  await expect(page.locator('.grid > a.tile[href*="?area="]')).toHaveCount(18);
  await expect(page.locator('.grid > a.new-card')).toHaveCount(3);
  await expect(page.locator('.grid > .tile.pending')).toHaveCount(3);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
  await brand.focus();
  await expect(brand).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading',{name:'Explore every part of life'})).toBeVisible();
  expect(errors).toEqual([]);
 });
}
test('About is navigable under the banner and links to the complete TEAL-101',async({page})=>{
 await page.setViewportSize({width:1366,height:941});
 await page.goto('/');
 await page.locator('.op5-menu-row .op4-menu summary').click();
 const menu=page.getByRole('navigation',{name:'About ONE PLACE'});
 await expect(menu.getByRole('link',{name:'TEAL Philosophy & all 12 sections'})).toBeVisible();
 await menu.getByRole('link',{name:'TEAL Philosophy & all 12 sections'}).click();
 await expect(page).toHaveURL(/\/teal\/#teal-101$/);
 await expect(page.locator('#teal-101 .teal101-chapter')).toHaveCount(12);
});
test('The original category cards retain actual destinations after homepage restyle',async({page})=>{
 await page.goto('/');
 await page.locator('.grid > a.tile[href*="?area="]').first().click();
 await expect(page.getByRole('heading',{level:1,name:'Money & Bills'})).toBeVisible();
 await page.getByRole('link',{name:/One Place home/i}).first().click();
 await page.locator('.grid > a.new-card').filter({hasText:'Human Literacy'}).click();
 await expect(page).toHaveURL(/\/human-literacy\/$/);
});

test('Mobile full Earth-and-TEAL scene loads without seam at 320px and 390px',async({page})=>{
 const art=await page.request.get('/teal/assets/earth-1536.webp');
 expect(art.ok()).toBe(true);
 expect((await art.body()).length).toBeGreaterThan(10000);
 for(const width of [320,390]){
  await page.setViewportSize({width,height:800});
  await page.goto('/');
  const header=page.locator('.op5-cosmic');
  await expect(header).toBeVisible();
  await expect(header).toHaveCSS('background-image',/earth-1536\.webp/);
  await expect(header.locator('.op4-name')).toHaveText('ONE PLACE');
  await expect(page.locator('.op5-menu-row summary')).toHaveText('About');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
 }
});
