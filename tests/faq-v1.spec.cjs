const {test,expect}=require('@playwright/test');

for(const width of [320,390,1366]){
 test('Approved One Place FAQ preserves all 30 answers and readable layout at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:850});
  await page.goto('/index.html?about#faq');
  const link=page.getByRole('link',{name:/complete 30-question One Place FAQ/});
  await expect(link).toHaveAttribute('href','one-place/faq.html');
  await link.click();
  await expect(page).toHaveURL(/\/one-place\/faq\.html$/);
  await expect(page.getByRole('heading',{name:'Frequently Asked Questions'})).toBeVisible();
  await expect(page.locator('details')).toHaveCount(30);
  await expect(page.locator('#essentials + details')).toHaveCount(1);
  await expect(page.locator('section[aria-labelledby="essentials"] details')).toHaveCount(10);
  await expect(page.locator('section:not([aria-labelledby="essentials"]) details')).toHaveCount(20);
  await expect(page.getByText('One Place is an independent, human-led project created by one founder', {exact:false})).toHaveCount(1);
  await page.getByText('What is One Place?', {exact:true}).click();
  await expect(page.getByText('One Place is a free educational website', {exact:false})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
  expect(errors).toEqual([]);
 });
}

test('FAQ links point to existing internal paths and preserve accessibility',async({page,request})=>{
 await page.goto('/one-place/faq.html');
 for(const href of ['../index.html','../teal/','../human-literacy/','money-center.html','family-handoff.html','housing-utilities.html']){
  const target=await page.locator('a[href="'+href+'"]').first().getAttribute('href');
  expect(target).toBe(href);
  const url=new URL(href,page.url());
  const response=await request.get(url.pathname);
  expect(response.status(),href).toBe(200);
 }
 await expect(page.locator('a.skip')).toHaveAttribute('href','#content');
 await expect(page.locator('summary')).toHaveCount(30);
 await expect(page.locator('a[target="_blank"]')).toHaveCount(2);
 await expect(page.locator('a[target="_blank"]:not([rel~="noopener"])')).toHaveCount(0);
});
