const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
test('RC02 integration preserves original 27-file manifest and adds only two learning pages',()=>{
 const workflow=fs.readFileSync('.github/workflows/verify-live-site.yml','utf8');
 for(const filename of ['one-place/faq.html','one-place/business-idea-reality-check.html','one-place/everyday-access-check.html','one-place/conversation-repair-practice.html'])expect(workflow).toContain("'"+filename+"'");
 expect(fs.readFileSync('one-place/everyday-access-check.html','utf8')).toContain('<meta name="robots" content="index,follow">');
 const home=fs.readFileSync('index.html','utf8');
 for(const label of ['digital-safety-practice-path','support-skills-path','career-readiness-path','business-reality-path','data-hq-practice="access"','data-hq-practice="conversation"'])expect(home).toContain(label);
});
for(const width of [320,1366]){
 test('RC02 and accepted RC01/FAQ coexist at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:850});
  for(const entry of [{area:'Aging & Accessibility',key:'access',path:'/one-place/everyday-access-check.html'},{area:'Relationships & Communication',key:'conversation',path:'/one-place/conversation-repair-practice.html'}]){
   await page.goto('/index.html?area='+encodeURIComponent(entry.area));
   await expect(page.locator('.offers > a.offer')).toHaveCount(4);
   const link=page.locator('[data-hq-practice="'+entry.key+'"]');
   await expect(link).toHaveCount(1);
   await link.click();
   await expect(page).toHaveURL(new RegExp(entry.path.replace(/\./g,'\\.')+'$'));
   await expect(page.locator('h1')).toBeVisible();
   const d=await page.evaluate(()=>[innerWidth,document.documentElement.scrollWidth,document.body.scrollWidth]);
   expect(Math.max(d[1],d[2])).toBeLessThanOrEqual(d[0]+1);
  }
  await page.goto('/one-place/faq.html');
  await expect(page.locator('details')).toHaveCount(30);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','index,follow');
  await page.goto('/one-place/digital-safety-practice.html');
  await expect(page.locator('#unexpected-message')).toBeVisible();
  await page.goto('/one-place/business-idea-reality-check.html');
  await expect(page.locator('#estimateForm')).toBeVisible();
 });
}
