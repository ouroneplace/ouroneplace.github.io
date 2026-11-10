const {test,expect}=require('@playwright/test');

// TEAL-101 v2 public adaptation: twelve human-centered letter chapters.
// The founder-approved private v1.1 remains historically preserved; the public v2 manuscript is tracked separately.
test('ONE PLACE uses the existing original TEAL cosmic emblem asset in the centered homepage header',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 const logo=page.locator('.op4-source-symbol');
 await expect(logo).toBeVisible();
 const style=await logo.evaluate(el=>({image:getComputedStyle(el).backgroundImage,role:el.getAttribute('role'),alt:el.getAttribute('aria-label')}));
 expect(style.image).toContain('/teal/assets/earth-1536.webp');
 expect(style.role).toBe('img');
 expect(style.alt).toContain('TEAL');
 await expect(page.locator('.op4-header .op4-name')).toHaveText('ONE PLACE');
 await expect(page.locator('.op4-header svg')).toHaveCount(0);
 await page.locator('.op4-menu summary').click();
 await expect(page.getByRole('navigation',{name:'About ONE PLACE'}).getByRole('link',{name:'TEAL Philosophy & all 12 sections'})).toHaveAttribute('href','teal/#teal-101');
 expect(errors).toEqual([]);
});

test('TEAL-101 v2 preserves twelve complete human-centered letter chapters without archival appendices',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/teal/');
 const root=page.locator('#teal-101');
 await expect(root).toBeAttached();
 await expect(root).toHaveAttribute('data-edition','v2.0.0');
 await expect(root).toHaveAttribute('data-source-path','docs/teal/TEAL-101-letter-to-us-v2.md');
 await expect(root.getByRole('heading',{level:2})).toContainText('A Love That');
 await expect(root.locator('.teal101-intro')).toContainText('You do not have to believe a word of this');
 const chapters=root.locator('details.teal101-chapter');
 await expect(chapters).toHaveCount(12);
 await expect(chapters.first()).toHaveAttribute('open','');
 await expect(chapters.nth(1)).not.toHaveAttribute('open','');
 const titles=await chapters.locator('summary').allTextContents();
 expect(titles.map(x=>x.trim())).toEqual(expect.arrayContaining([
   expect.stringContaining('Before Anything Else, You Matter'),
   expect.stringContaining('The Love You Give Must Include You'),
   expect.stringContaining('The Human Behind the Dream'),
   expect.stringContaining('The Promise We Can Make')
 ]));
 await chapters.last().locator('summary').click();
 await expect(chapters.last()).toHaveAttribute('open','');
 await expect(chapters.last()).toContainText('You deserve the same love you are trying to give the world.');
 expect((await chapters.locator('.teal101-copy').allTextContents()).every(x=>x.trim().length>500)).toBe(true);
 await expect(root).not.toContainText(/Na.vi|Avatar|Pandora|Eywa/i);
 await expect(root).toContainText('This is a founder-directed, AI-assisted public revision');
 await expect(root).not.toContainText('APPENDIX A — Source and version record');
 await expect(root).not.toContainText('Publication authorization: NOT GRANTED');
 expect(errors).toEqual([]);
});

for(const width of [320,390,768,1366]){
 test('TEAL-101 full philosophy and ONE PLACE identity avoid horizontal overflow at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:width>=768?768:720});
  await page.goto('/');
  await expect(page.locator('.op4-source-symbol')).toBeVisible();
  let x=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
  expect(x.scroll).toBeLessThanOrEqual(x.width+2);
  await page.goto('/teal/#teal-101');
  await expect(page.locator('#teal-101')).toBeVisible();
  await expect(page.locator('#teal-101-section-01')).toHaveAttribute('open','');
  x=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
  expect(x.scroll).toBeLessThanOrEqual(x.width+2);
 });
}

test('ONE PLACE About includes a working route to TEAL-101 on the original TEAL page',async({page})=>{
 await page.goto('/index.html?about');
 const section=page.locator('nav.op4-about-nav');
 await expect(section.getByRole('link',{name:/Explore TEAL/})).toHaveAttribute('href','teal/#teal-101');
 await section.getByRole('link',{name:/Explore TEAL/}).click();
 await expect(page).toHaveURL(/\/teal\/#teal-101$/);
 await expect(page.locator('#teal-101')).toBeVisible();
});

test('TEAL-101 v2 continuous letter is accessible, complete, and reachable without scripts',async({page})=>{
 await page.goto('/teal/#teal-101');
 const link=page.getByRole('link',{name:'Read all twelve chapters as one continuous letter'});
 await expect(link).toHaveAttribute('href','teal-101-letter.html');
 await link.click();
 await expect(page).toHaveURL(/\/teal\/teal-101-letter\.html$/);
 await expect(page.getByRole('heading',{level:1})).toContainText('A Love That');
 const chapters=page.locator('.teal101-reading section');
 await expect(chapters).toHaveCount(12);
 await expect(chapters.first()).toContainText('You are somebody even when nobody needs anything from you');
 await expect(chapters.last()).toContainText('You deserve the same love you are trying to give the world');
 expect(await page.locator('script')).toHaveCount(0);
 await expect(page.locator('body')).not.toContainText(/Na.vi|Avatar|Pandora|Eywa/i);
 for(const width of [320,390,1366]){
   await page.setViewportSize({width,height:800});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
 }
});
