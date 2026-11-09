const {test,expect}=require('@playwright/test');

// Approved TEAL-101 public reading edition, using source text from founder-approved v1.1.
// The source fingerprint covers the unchanged twelve-section Markdown in the private master.
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
 await expect(page.getByRole('navigation',{name:'About ONE PLACE'}).getByRole('link',{name:/TEAL-101.*All 12 Sections/})).toHaveAttribute('href','teal/#teal-101');
 expect(errors).toEqual([]);
});

test('Founder-approved TEAL-101 offers all twelve source-ordered philosophy sections without archival appendices',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/teal/');
 const root=page.locator('#teal-101');
 await expect(root).toBeAttached();
 await expect(root).toHaveAttribute('data-source-sha256','63ff2e6435251b780d544113cca1e09c85d3cd73214ee0cc1d830f9da87f2bb0');
 await expect(root.getByRole('heading',{level:2})).toContainText('Trinity Equals');
 const chapters=root.locator('details.teal101-chapter');
 await expect(chapters).toHaveCount(12);
 await expect(chapters.first()).toHaveAttribute('open','');
 await expect(chapters.nth(1)).not.toHaveAttribute('open','');
 const titles=await chapters.locator('summary').allTextContents();
 expect(titles.map(x=>x.trim())).toEqual(expect.arrayContaining([
   expect.stringContaining('Identity, Purpose, and Foundation'),
   expect.stringContaining('The Three Respects'),
   expect.stringContaining('The Founding History of TEAL'),
   expect.stringContaining('Final Reconciliation, Unfinished Definitions')
 ]));
 await chapters.last().locator('summary').click();
 await expect(chapters.last()).toHaveAttribute('open','');
 await expect(chapters.last()).toContainText('An aspiration for the world we may choose to build.');
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
 await page.goto('/index.html?about#teal-philosophy');
 const section=page.locator('#teal-philosophy');
 await expect(section.getByRole('link',{name:/complete approved TEAL-101 philosophy/i})).toHaveAttribute('href','teal/#teal-101');
 await section.getByRole('link',{name:/complete approved TEAL-101 philosophy/i}).click();
 await expect(page).toHaveURL(/\/teal\/#teal-101$/);
 await expect(page.locator('#teal-101')).toBeVisible();
});
