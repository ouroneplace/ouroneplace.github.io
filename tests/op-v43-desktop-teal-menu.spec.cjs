const {test,expect}=require('@playwright/test');

for (const width of [768,1050,1366,1920]) {
 test('Desktop ONE PLACE: single TEAL emblem, grouped About, intact cards at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:width>=1366?900:768});
  await page.goto('/index.html');
  const header=page.locator('header.op5-cosmic');
  await expect(header).toBeVisible();
  await expect(header).toHaveCSS('background-image',/one-place-desktop-panorama\.svg/);
  await expect(header.locator('.op4-source-symbol')).toHaveCSS('opacity','0');
  await expect(header.locator('.op4-name')).toHaveText('ONE PLACE');
  await expect(page.locator('.grid > a.tile')).toHaveCount(21);
  await expect(page.locator('.grid > .tile.pending')).toHaveCount(3);
  const menu=page.locator('.op5-menu-row .op4-menu');
  await menu.locator('summary').click();
  const nav=page.getByRole('navigation',{name:'About ONE PLACE'});
  await expect(nav.locator('.op5-menu-group')).toHaveCount(4);
  await expect(nav.getByRole('link',{name:'TEAL'})).toHaveCount(1);
  await expect(nav.getByRole('link',{name:'FAQ & Questions'})).toHaveCount(1);
  await expect(nav.getByRole('link',{name:/TEAL-101/})).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open','');
  await expect(menu.locator('summary')).toBeFocused();
  await menu.locator('summary').click();
  await nav.getByRole('link',{name:'TEAL'}).click();
  await expect(page).toHaveURL(/\/teal\/$/);
  await expect(page.locator('#teal-101 .teal101-chapter')).toHaveCount(12);
  expect(errors).toEqual([]);
 });
}

test('Desktop panorama renders as a valid local SVG document',async({page})=>{
 await page.goto('/');
 const r=await page.request.get('/teal/assets/one-place-desktop-panorama.svg');
 expect(r.ok()).toBe(true);
 expect(r.headers()['content-type']).toMatch(/image\/svg\+xml/);
 const dimensions=await page.evaluate(async()=>{
  const img=new Image();
  img.src='/teal/assets/one-place-desktop-panorama.svg';
  await img.decode();
  return {width:img.naturalWidth,height:img.naturalHeight};
 });
 expect(dimensions).toEqual({width:1920,height:360});
});

test('About ONE PLACE has one TEAL destination and one questions section',async({page})=>{
 await page.goto('/index.html?about');
 await expect(page.locator('#teal-philosophy')).toHaveCount(0);
 await expect(page.locator('#qa')).toHaveCount(0);
 const faq=page.locator('#faq');
 await expect(faq).toContainText('Do I have to agree with TEAL?');
 await expect(faq).toContainText('Can I suggest a correction or ask something else?');
 await expect(page.locator('#version')).toContainText('Homepage version 4.3.0');
 await page.locator('.op4-menu summary').click();
 const nav=page.getByRole('navigation',{name:'About ONE PLACE'});
 await expect(nav.getByRole('link',{name:'TEAL'})).toHaveAttribute('href','teal/');
 await page.locator('#version').click();
 await expect(page.locator('.op4-menu')).not.toHaveAttribute('open','');
 await page.goto('/index.html?about#teal-philosophy');
 await expect(page).toHaveURL(/\/teal\/$/);
});

for(const width of [320,390]){
 test('Approved mobile homepage remains intact after desktop and About changes '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:800});
  await page.goto('/');
  await expect(page.locator('.op5-cosmic')).toHaveCSS('background-image',/earth-1536\.webp/);
  await expect(page.locator('.op4-source-symbol')).toHaveCSS('opacity','0');
  await expect(page.locator('.grid > a.tile[href*="?area="]')).toHaveCount(18);
  await expect(page.locator('.grid > a.new-card')).toHaveCount(3);
  await expect(page.locator('.grid > .tile.pending')).toHaveCount(3);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 });
}
