const {test,expect}=require('@playwright/test');

// HQ integration only: existing catalog must stay intact, two practical area links must work.
const cases=[
 {area:'Aging & Accessibility',key:'access',route:'/one-place/everyday-access-check.html',title:'Everyday Access Check'},
 {area:'Relationships & Communication',key:'conversation',route:'/one-place/conversation-repair-practice.html',title:'Conversation Repair Practice'}
];
for(const width of [320,390,1366,1920]){
 test('HQ two-area navigation preserves four offerings and usable link at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:860});
  await page.goto('/index.html?area='+encodeURIComponent(cases[0].area));
  for(const item of cases){
   await page.goto('/index.html?area='+encodeURIComponent(item.area));
   await expect(page.getByRole('heading',{level:1,name:item.area,exact:true})).toBeVisible();
   await expect(page.locator('.offers > a.offer')).toHaveCount(4);
   const link=page.locator('[data-hq-practice="'+item.key+'"]');
   await expect(link).toHaveCount(1);
   await expect(link).toHaveAttribute('href',item.route.slice(1));
   await link.click();
   await expect(page).toHaveURL(new RegExp(item.route.replace(/\\./g,'\\.')+'$'));
   await expect(page.getByRole('heading',{level:1,name:item.title,exact:true})).toBeVisible();
   const dims=await page.evaluate(()=>({viewport:innerWidth,doc:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(dims.doc,dims.body)).toBeLessThanOrEqual(dims.viewport+1);
   await page.goBack();
   await expect(page.locator('.offers > a.offer')).toHaveCount(4);
  }
 });
}
test('HQ Aging area opens reviewed access plan and edit invalidates it',async({page})=>{
 await page.goto('/index.html?area=Aging%20%26%20Accessibility');
 await page.locator('[data-hq-practice="access"]').click();
 await page.locator('#barrier').selectOption('movement');
 await page.locator('#place').selectOption('home');
 await page.locator('#support').selectOption('ask');
 await page.getByRole('button',{name:'Review my access plan'}).click();
 await expect(page.locator('#reviewed')).toBeVisible();
 await page.locator('#place').selectOption('appointment');
 await expect(page.locator('#reviewed')).toBeHidden();
});
test('HQ Relationships area opens editable fictional conversation practice',async({page})=>{
 await page.goto('/index.html?area=Relationships%20%26%20Communication');
 await page.locator('[data-hq-practice="conversation"]').click();
 const form=page.locator('form[data-step="0"]');
 await form.locator('input[value="0"]').check();
 await form.getByRole('button',{name:'Reflect on move 1'}).click();
 await expect(page.locator('#feedback1')).toContainText('observable information');
 await page.locator('#draft').fill('May we discuss the shared counter tomorrow?');
 await expect(page.locator('#draft')).toHaveValue('May we discuss the shared counter tomorrow?');
});
test('HQ homepage still lists exactly 18 life areas, no added catalog offers',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.grid > a.tile[href*="?area="]')).toHaveCount(18);
 await expect(page.locator('.grid > a.tile')).toHaveCount(21);
});
