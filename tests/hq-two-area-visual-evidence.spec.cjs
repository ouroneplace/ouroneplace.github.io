// HQ synthetic visual evidence for the two-area *draft* integration.
// Chromium screenshots and semantic checks do not certify a human visual or screen-reader review.
const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const enabled = process.env.HQ_CAPTURE_VISUALS === 'true';
const dir = path.join(process.cwd(), 'hq-visual-evidence');
const head = process.env.HQ_REVIEW_HEAD || 'local-unverified-head';
const pages = [
  { area: 'Aging & Accessibility', name: 'access', file: '/one-place/everyday-access-check.html' },
  { area: 'Relationships & Communication', name: 'conversation', file: '/one-place/conversation-repair-practice.html' }
];

async function assertReflow(page) {
  const dimensions = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }));
  expect(Math.max(dimensions.document, dimensions.body), JSON.stringify(dimensions))
    .toBeLessThanOrEqual(dimensions.viewport + 1);
  return dimensions;
}

async function capture(page, label, evidence) {
  const dimensions = await assertReflow(page);
  const headings = await page.locator('h1').allTextContents();
  const filename = label + '.png';
  if (enabled) {
    fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, filename), fullPage: true, animations: 'disabled' });
  }
  evidence.push({ file: enabled ? filename : null, label, dimensions, headings, synthetic: true });
}

test('HQ draft visual evidence: two area paths at required viewport widths and 200% text', async ({ page }) => {
  const evidence = [];
  for (const width of [320, 390, 1366, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const item of pages) {
      await page.goto('/index.html?area=' + encodeURIComponent(item.area));
      await expect(page.locator('.offers > a.offer')).toHaveCount(4);
      const entry = page.locator('[data-hq-practice="' + item.name + '"]');
      await expect(entry).toHaveCount(1);
      await capture(page, width + '-' + item.name + '-area', evidence);
      await entry.click();
      await expect(page).toHaveURL(new RegExp(item.file.replace(/\./g, '\\.') + '$'));
      await capture(page, width + '-' + item.name + '-lesson', evidence);

      if (width === 390) {
        if (item.name === 'access') {
          await page.locator('#barrier').selectOption('movement');
          await page.locator('#place').selectOption('home');
          await page.locator('#support').selectOption('ask');
          await page.getByRole('button', { name: 'Review my access plan' }).click();
          await expect(page.locator('#reviewed')).toBeVisible();
        } else {
          const first = page.locator('form[data-step="0"]');
          await first.locator('input[value="0"]').check();
          await first.getByRole('button', { name: 'Reflect on move 1' }).click();
          await page.locator('#draft').fill('Could we review the kitchen plan together tomorrow?');
        }
        await capture(page, width + '-' + item.name + '-synthetic-practice', evidence);
      }

      if (width === 320) {
        await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
        await capture(page, width + '-' + item.name + '-200-percent-text', evidence);
      }
    }
  }
  if (enabled) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'viewport-evidence.json'),
      JSON.stringify({ source: 'Playwright Chromium, fictional input only',
        head, evidence, limitations: [
          'Automated headless Chromium, not human visual sign-off',
          'Not a real phone or a native screen-reader output',
          'No personal data, network uploads or outside websites exercised',
          'Screenshots can differ from other browsers and operating systems'
        ] }, null, 2) + '\n');
  }
});

test.describe('HQ visual evidence with JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false });

  test('static fallback remains genuinely readable at narrow width', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    const evidence = [];
    await page.goto('/one-place/everyday-access-check.html');
    await expect(page.locator('#noJsHelp')).toBeVisible();
    await capture(page, '320-access-no-javascript', evidence);

    await page.goto('/one-place/conversation-repair-practice.html');
    const disclosure = page.locator('#staticExample');
    await disclosure.locator('summary').click();
    await expect(disclosure.getByText('Complete sample message:')).toBeVisible();
    await capture(page, '320-conversation-no-javascript', evidence);

    if (enabled) {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'no-javascript-evidence.json'),
        JSON.stringify({ head, evidence, synthetic: true,
          limitations: ['Browser simulation only; no native screen-reader result'] }, null, 2) + '\n');
    }
  });
});
