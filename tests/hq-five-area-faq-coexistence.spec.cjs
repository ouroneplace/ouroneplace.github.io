const {test,expect}=require('@playwright/test');const fs=require('node:fs');
test('FAQ remains in released-page byte manifest and combined live smoke',()=>{
 const wf=fs.readFileSync('.github/workflows/verify-live-site.yml','utf8');
 const live=fs.readFileSync('scripts/verify_live_site.cjs','utf8');
 const home=fs.readFileSync('index.html','utf8');
 for(const path of ['one-place/faq.html','one-place/digital-safety-practice.html','one-place/support-skills-safety.html','one-place/career-readiness-planner.html','one-place/business-idea-reality-check.html']) {
  expect(wf.split("'"+path+"'").length-1,path).toBe(1);
 }
 expect(home).toContain('Read the complete 30-question One Place FAQ');
 expect(live).toContain("await goto('/index.html?about#faq')");
 expect(live).toContain('faq_questions:30');
 expect(live).toContain('faq_essentials:10');
 for(const path of ['digital-safety-practice.html','support-skills-safety.html','career-readiness-planner.html','business-idea-reality-check.html'])
  expect(live).toContain("await goto('/one-place/"+path+"')");
});
for(const width of [320,1366]) {
 test('RC-01 new links and approved FAQ coexist at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:850});
  await page.goto('/index.html?about#faq');
  await page.getByRole('link',{name:/complete 30-question One Place FAQ/}).click();
  await expect(page).toHaveURL(/\/one-place\/faq\.html$/);
  await expect(page.locator('details')).toHaveCount(30);
  await expect(page.locator('section[aria-labelledby="essentials"] details')).toHaveCount(10);
  for(const [area,id,file] of [
    ['Technology & Digital Safety','digital-safety-practice-path','digital-safety-practice.html'],
    ['Mental Health & Safety','support-skills-path','support-skills-safety.html'],
    ['Work & Careers','career-readiness-path','career-readiness-planner.html'],
    ['Business & Entrepreneurship','business-reality-path','business-idea-reality-check.html']]) {
   await page.goto('/index.html?area='+encodeURIComponent(area));
   const link=page.locator('#'+id+' a[href="one-place/'+file+'"]');
   await expect(link).toBeVisible();
   await link.click();
   expect(new URL(page.url()).pathname).toBe('/one-place/'+file);
   await expect(page.locator('h1')).toBeVisible();
   expect(await page.evaluate(()=>Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)<=innerWidth+1)).toBe(true);
  }
  await page.goto('/');
  await expect(page.locator('.grid > a.tile[href*="?area="]')).toHaveCount(18);
 });
}
