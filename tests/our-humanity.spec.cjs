const { test, expect } = require('@playwright/test');
const path = '/one-place/our-humanity.html';

test('Our Humanity has a visible first-class navigation menu entry on the draft homepage',async({page})=>{
  await page.goto('/index.html');
  const nav=page.getByRole('navigation',{name:'One Place navigation'});
  const link=nav.getByRole('link',{name:'Our Humanity',exact:true});
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href','one-place/our-humanity.html');
  await link.click();
  await expect(page).toHaveURL(/\/one-place\/our-humanity\.html$/);
  await expect(page.getByRole('heading',{name:/Come as you are/})).toBeVisible();
});

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

test('Our Humanity: collapsed cards stay compact beside expanded cards', async ({page}) => {
  await page.setViewportSize({width:1366,height:768});
  await page.goto(path);
  const first=page.locator('#self details.subject').nth(0);
  const second=page.locator('#self details.subject').nth(1);
  await expect(first).toHaveAttribute('open','');
  await expect(second).not.toHaveAttribute('open','');
  const tall=await first.boundingBox();
  const compact=await second.boundingBox();
  expect(compact.height).toBeLessThan(tall.height);
  await first.locator('summary').click();
  const closed=await first.boundingBox();
  expect(closed.height).toBeLessThan(tall.height);
});



test('Our Humanity: Curiosity invite remains outside the first topic summary',async({page})=>{
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(path);
  const wonder=page.locator('section#wonder');
  const invitation=wonder.locator(':scope > p.studio-invite');
  await expect(invitation).toBeVisible();
  await expect(invitation.getByRole('link',{name:/Explore the Curiosity Studio/})).toHaveAttribute('href','curiosity-studio.html');
  const firstSummary=wonder.locator('details.subject').first().locator('summary');
  await expect(firstSummary).toHaveText('Music, art and imagination＋');
  await expect(firstSummary.getByRole('link')).toHaveCount(0);
  await expect(wonder.locator('details.subject')).toHaveCount(5);
  await firstSummary.click();
  await expect(wonder.locator('details.subject').first()).not.toHaveAttribute('open','');
  await firstSummary.click();
  await expect(wonder.locator('details.subject').first()).toHaveAttribute('open','');
  await invitation.getByRole('link',{name:/Explore the Curiosity Studio/}).click();
  await expect(page).toHaveURL(/\/one-place\/curiosity-studio\.html$/);
  expect(errors).toEqual([]);
});

test('Our Humanity: choice-based welcome moments are useful without a score', async ({page}) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(path);
  const doors=page.locator('.moment-door');
  await expect(doors).toHaveCount(4);
  await expect(page.getByRole('link',{name:'Try a short experience'})).toHaveAttribute('href','#begin');
  await expect(page.locator('#moment-title')).toHaveText('A message goes unanswered.');
  await expect(page.locator('#moment-choices button')).toHaveCount(3);
  await expect(doors.nth(0)).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#moment-result')).toBeHidden();
  await page.locator('#moment-choices button').first().click();
  await expect(page.locator('#moment-result')).toBeVisible();
  await expect(page.locator('#moment-result')).toContainText('no reply alone cannot tell you');
  await expect(page.locator('#moment-choices button').first()).toHaveAttribute('aria-pressed','true');
  await doors.nth(1).click();
  await expect(page.locator('#moment-title')).toHaveText('“You never listen.”');
  await expect(page.locator('#moment-result')).toBeHidden();
  await expect(doors.nth(0)).toHaveAttribute('aria-pressed','false');
  await expect(doors.nth(1)).toHaveAttribute('aria-pressed','true');
  await page.locator('#moment-choices button').nth(1).click();
  await expect(page.locator('#moment-result')).toContainText('specific conversation');
  await doors.nth(2).click();
  await expect(page.locator('#moment-title')).toHaveText('There is too much to carry.');
  await expect(page.locator('#moment-deeper')).toHaveAttribute('href','family-handoff.html');
  await page.locator('#moment-choices button').nth(2).click();
  await expect(page.locator('#moment-result')).toContainText('professional, community or public assistance');
  await doors.nth(3).click();
  await expect(page.locator('#moment-title')).toHaveText('Notice something ordinary.');
  await expect(page.locator('#moment-deeper')).toHaveAttribute('href','curiosity-studio.html');
  await page.locator('#moment-choices button').first().click();
  await expect(page.locator('#moment-result')).toContainText('enjoy careful observation');
  expect(errors).toEqual([]);
});

test('Our Humanity: keyboard access to welcome experience and privacy', async ({page}) => {
  const requests=[];
  page.on('request',req=>requests.push(req.url()));
  await page.goto(path);
  const wonder=page.locator('button[data-moment="wonder"]');
  await wonder.focus();
  await page.keyboard.press('Enter');
  await expect(wonder).toHaveAttribute('aria-pressed','true');
  await page.locator('#moment-choices button').first().focus();
  await page.keyboard.press('Space');
  await expect(page.locator('#moment-result')).toBeVisible();
  await expect(page.locator('#moment-result')).toHaveAttribute('aria-live','polite');
  expect(requests.every(url=>new URL(url).hostname==='127.0.0.1')).toBeTruthy();
  const storage=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}));
  expect(storage).toEqual({local:0,session:0});
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
