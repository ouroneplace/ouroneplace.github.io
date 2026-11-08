const {test,expect}=require('@playwright/test');
const url='/one-place/home-skills.html';
test('Housing: Home Skills is obvious on the category page and inside the housing guide',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/index.html?area=Housing%20%26%20Utilities');
  await expect(page.locator('.offers > a.offer')).toHaveCount(4);
  await page.getByRole('link',{name:/Open Home Skills Academy/}).click();
  await expect(page).toHaveURL(/\/one-place\/home-skills\.html$/);
  await expect(page.getByRole('heading',{name:/Know your home/})).toBeVisible();
  await page.getByRole('link',{name:'← Housing & Utilities'}).click();
  await expect(page).toHaveURL(/\/one-place\/housing-utilities\.html$/);
  await expect(page.getByRole('link',{name:/Explore Home Skills Academy/})).toBeVisible();
  expect(errors).toEqual([]);
});

test('Home Skills: 36 real guides, 8 areas and safety classifications',async({page})=>{
  await page.goto(url);
  await expect(page.locator('details.skill')).toHaveCount(36);
  await expect(page.locator('button[data-area]')).toHaveCount(9);
  await expect(page.locator('details.skill[data-level="Expert needed"]')).toHaveCount(5);
  await expect(page.getByText('These 36 starting lessons')).toBeVisible();
  await expect(page.getByText('Renters may need landlord permission',{exact:false})).toBeVisible();
  await expect(page.locator('#match-count')).toHaveText('36 lessons available');
  const ids=await page.locator('details.skill').evaluateAll(nodes=>nodes.map(n=>n.id));
  expect(new Set(ids).size).toBe(36);
  const all=await page.locator('details.skill').count();
  expect(all).toBe(36);
});

test('Home Skills: search, filters and honest zero-result feedback',async({page})=>{
  await page.goto(url);
  const search=page.getByRole('searchbox',{name:'Search a task, room, or issue'});
  await search.fill('toilet');
  await expect(page.locator('details.skill:visible')).toHaveCount(2);
  await expect(page.locator('#match-count')).toContainText('2 of 36 lessons shown');
  await search.fill('');
  await page.locator('button[data-area="Outside & Yard"]').click();
  await expect(page.locator('details.skill:visible')).toHaveCount(6);
  await expect(page.locator('button[data-area="Outside & Yard"]')).toHaveAttribute('aria-pressed','true');
  await page.locator('details.skill:visible').first().locator('summary').click();
  await expect(page.locator('details.skill:visible').first().locator('.steps li')).toHaveCount(4);
  await expect(page.locator('details.skill:visible').first().locator('.stop')).toBeVisible();
  await page.locator('button[data-area="all"]').click();
  await search.fill('zzzznothingmatchzzz');
  await expect(page.locator('details.skill:visible')).toHaveCount(0);
  await expect(page.locator('#match-count')).toContainText('Try another room or search term');
  await search.fill('toilet');
  await expect(page.locator('details.skill:visible')).toHaveCount(2);
});

test('Home Skills: user can read every skill without interaction and cited sources are optional',async({page})=>{
  await page.goto(url);
  for(const i of [0,5,15,20,27,31,35]){
    const lesson=page.locator('details.skill').nth(i);
    await lesson.locator('summary').click();
    await expect(lesson.locator('.steps li')).toHaveCount(4);
    await expect(lesson.locator('.kit')).toBeVisible();
    await expect(lesson.locator('.good')).toBeVisible();
    await expect(lesson.locator('.stop')).toBeVisible();
    await expect(lesson.locator('a.reference')).toHaveAttribute('target','_blank');
    await expect(lesson.locator('a.reference')).toHaveAttribute('rel','noopener noreferrer');
  }
});

for(const width of [320,390,768,1366]){
  test('Home Skills: responsive and keyboard-friendly at '+width+'px',async({page})=>{
    await page.setViewportSize({width,height:800});
    await page.goto(url);
    await expect(page.getByRole('heading',{name:/Know your home/})).toBeVisible();
    const sizes=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
    expect(sizes.scroll).toBeLessThanOrEqual(sizes.viewport+1);
    const first=page.locator('details.skill').first().locator('summary');
    await first.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('details.skill').first()).toHaveAttribute('open','');
  });
}

test('Home Skills: no hidden form collection or browser storage',async({page})=>{
  const requests=[];page.on('request',req=>requests.push(req.url()));
  await page.goto(url);
  await page.locator('#search').fill('water');
  await page.locator('button[data-area="all"]').click();
  expect(requests.every(x=>new URL(x).hostname==='127.0.0.1')).toBeTruthy();
  expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
  await expect(page.getByRole('link',{name:'One Place Home'})).toHaveAttribute('href','../index.html');
});
