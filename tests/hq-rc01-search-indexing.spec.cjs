const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const path=require('node:path');

const releasePages=[
 'one-place/digital-safety-practice.html',
 'one-place/support-skills-safety.html',
 'one-place/career-readiness-planner.html',
 'one-place/business-idea-reality-check.html'
];

test('the four new public learning pages have explicitly chosen search visibility',()=>{
 for(const pathname of releasePages){
  const html=fs.readFileSync(pathname,'utf8');
  expect((html.match(/<meta\s+name="robots"/g)||[]).length,pathname+' robots meta exactly once').toBe(1);
  expect(html,pathname+' indexable release policy').toContain('<meta name="robots" content="index,follow">');
  expect(html,pathname+' must not carry preview noindex').not.toMatch(/<meta\s+name="robots"\s+content="[^"]*noindex/i);
 }
 const homepage=fs.readFileSync('index.html','utf8');
 expect(homepage).toContain('Read the complete 30-question One Place FAQ');
 expect(homepage).toContain('<meta name="robots" content="index,follow">');
});
for(const width of [320,1366]){
 test('indexable learning page metadata is present in rendered DOM at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:800});
  for(const pathname of releasePages){
   await page.goto('/'+pathname);
   await expect(page.locator('h1')).toBeVisible();
   await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow');
   const existing=await page.evaluate(()=>({viewport:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(existing.html,existing.body),pathname+' mobile reflow').toBeLessThanOrEqual(existing.viewport+1);
  }
  await page.goto('/one-place/faq.html');
  await expect(page.locator('details')).toHaveCount(30);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow');
 });
}
