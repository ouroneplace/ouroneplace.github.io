const { test, expect } = require('@playwright/test');
const path = '/one-place/our-humanity.html';

test('Our Humanity: entry from One Place home and return navigation', async ({page}) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/index.html');
  const entry = page.getByRole('link', { name: /Discover our humanity/i });
  await expect(entry).toBeVisible();
  await entry.click();
  await expect(page).toHaveURL(/\/one-place\/our-humanity\.html$/);
  await expect(page.getByRole('heading', { name: /Come as you are/i })).toBeVisible();
  await expect(page.getByRole('navigation', {name:'Our Humanity navigation'})).toBeVisible();
  await page.getByRole('link',{name:'Return to One Place Home'}).click();
  await expect(page).toHaveURL(/\/index\.html$/);
  expect(errors).toEqual([]);
});

test('Our Humanity: directory links use explicit HTML files for extracted previews', async ({page}) => {
  await page.goto(path);
  const nav = page.getByRole('navigation', {name:'Our Humanity navigation'});
  await expect(nav.getByRole('link',{name:'Human Literacy'})).toHaveAttribute('href','../human-literacy/index.html');
  await expect(nav.getByRole('link',{name:'Explore TEAL'})).toHaveAttribute('href','../teal/index.html');
  await nav.getByRole('link',{name:'Explore TEAL'}).click();
  await expect(page).toHaveURL(/\/teal\/index\.html$/);
  await page.goto(path);
  await page.getByRole('navigation',{name:'Our Humanity navigation'}).getByRole('link',{name:'Human Literacy'}).click();
  await expect(page).toHaveURL(/\/human-literacy\/index\.html$/);
});

test('Our Humanity: five rooms, 28 subjects, four practice situations and honest sourcing', async ({page}) => {
  await page.goto(path);
  await expect(page.locator('section.room')).toHaveCount(5);
  await expect(page.locator('details.subject')).toHaveCount(28);
  await expect(page.locator('.practice-card')).toHaveCount(4);
  await expect(page.locator('.sources li')).toHaveCount(13);
  await expect(page.getByText('No account. No scores.',{exact:false})).toBeVisible();
  await expect(page.getByText('Founder-review editorial synthesis',{exact:false})).toHaveCount(1);
  const card=page.locator('details.subject').nth(1);
  await expect(card).not.toHaveAttribute('open','');
  await card.locator('summary').click();
  await expect(card).toHaveAttribute('open','');
  await expect(card.locator('.more')).toBeVisible();
  await page.getByRole('button',{name:/Surprise me/i}).click();
  await expect(page.locator('details.subject[open]').first()).toBeAttached();
  await expect(page.locator('#surprise-status')).not.toBeEmpty();
  const option=page.locator('.practice-card').first().locator('details.option').first();
  await option.locator('summary').click();
  await expect(option).toHaveAttribute('open','');
});

for (const width of [320,390,768,1366]) {
  test('Our Humanity: no sideways overflow at '+width+'px', async ({page}) => {
    await page.setViewportSize({width,height:800});
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    const sizes=await page.evaluate(() => ({
      content: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth
    }));
    expect(sizes.content).toBeLessThanOrEqual(sizes.viewport+1);
    await expect(page.getByRole('link',{name:'One Place Home',exact:true})).toBeVisible();
  });
}

test('Our Humanity: keyboard and privacy-by-default smoke test', async ({page}) => {
  const requests=[];
  page.on('request',req => requests.push(req.url()));
  await page.goto(path);
  // Source links are opt-in. Loading this static page must not contact a third party.
  expect(requests.every(url => new URL(url).hostname==='127.0.0.1')).toBeTruthy();
  const stored=await page.evaluate(() => ({local:localStorage.length,session:sessionStorage.length}));
  expect(stored).toEqual({local:0,session:0});
  await page.getByRole('button',{name:/Surprise me/i}).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#surprise-status')).not.toBeEmpty();
  await expect(page.getByRole('link',{name:'One Place Home',exact:true})).toHaveAttribute('href','../index.html');
});
