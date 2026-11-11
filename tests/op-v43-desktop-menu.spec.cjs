const {test,expect}=require('@playwright/test');

for(const width of [390,768,1366,1920]){
 test('ONE PLACE consistent About header and unique TEAL destination at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:width>=768?900:780});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/index.html');
  const homeHeader=page.locator('header.op5-cosmic');
  await expect(homeHeader).toBeVisible();
  await expect(homeHeader.locator('.op4-name')).toHaveText('ONE PLACE');
  const homeBackground=await homeHeader.evaluate(el=>getComputedStyle(el).backgroundImage);
  await page.locator('.op5-menu-row .op4-menu summary').click();
  const nav=page.getByRole('navigation',{name:'About ONE PLACE'});
  await expect(nav.locator('.op5-menu-caption')).toHaveCount(4);
  await expect(nav.getByRole('link',{name:'TEAL'})).toHaveCount(1);
  await expect(nav.getByRole('link',{name:'TEAL'})).toHaveAttribute('href','teal/');
  await expect(nav.getByRole('link',{name:'Vision',exact:true})).toBeVisible();
  await expect(nav.getByRole('link',{name:'FAQ & Answers'})).toBeVisible();
  await nav.getByRole('link',{name:'Vision'}).click();
  await expect(page).toHaveURL(/index\.html\?about#vision$/);
  await expect(page.locator('header.op5-cosmic')).toBeVisible();
  const aboutBackground=await page.locator('header.op5-cosmic').evaluate(el=>getComputedStyle(el).backgroundImage);
  expect(aboutBackground).toBe(homeBackground);
  await expect(page.locator('#vision')).toBeVisible();
  await expect(page.locator('#teal-philosophy')).toHaveCount(0);
  await expect(page.locator('nav.op4-about-nav a')).toHaveCount(1);
  await expect(page.locator('nav.op4-about-nav a')).toHaveAttribute('href','teal/#teal-101');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
  expect(errors).toEqual([]);
 });
}

test('ONE PLACE About has one TEAL philosophy destination and preserves questions',async({page})=>{
 await page.goto('/index.html?about');
 await expect(page.locator('#faq details')).toHaveCount(4);
 await expect(page.locator('#qa details')).toHaveCount(3);
 await page.locator('.op5-menu-row summary').click();
 await page.getByRole('navigation',{name:'About ONE PLACE'}).getByRole('link',{name:'TEAL'}).click();
 await expect(page).toHaveURL(/\/teal\/$/);
 await expect(page.locator('#teal-101 details.teal101-chapter')).toHaveCount(12);
});


for(const width of [320,390,768,1366,1920]){
 test('Founder v5 artwork and TEAL landing route at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:850});
  await page.goto('/index.html');
  const header=page.locator('header.op5-cosmic');
  await expect(header).toHaveCSS('background-image',width<=700?/earth-1536\\.webp/:/one-place-desktop-panorama\\.svg/);
  await page.locator('.op5-menu-row summary').click();
  await page.getByRole('navigation',{name:'About ONE PLACE'}).getByRole('link',{name:'TEAL',exact:true}).click();
  await expect(page).toHaveURL(/\\/teal\\/$/);
  await expect(page.locator('header.opening')).toBeVisible();
  await expect(page.locator('.teal-wordmark')).toHaveText('TEAL');
  await expect(page.locator('#teal-101 details.teal101-chapter')).toHaveCount(12);
 });
}
test('Desktop panoramic image decodes at the approved dimensions',async({page})=>{
 await page.goto('/');
 const image=await page.evaluate(async()=>{
  const img=new Image();img.src='/teal/assets/one-place-desktop-panorama.svg';
  await img.decode();return [img.naturalWidth,img.naturalHeight];
 });
 expect(image).toEqual([1920,360]);
});
