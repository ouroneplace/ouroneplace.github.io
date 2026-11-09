const { test, expect } = require('@playwright/test');

// Silent approved lesson videos are optional for completing the structured
// text lesson. This does not claim a visual-description transcript exists.
for (const lesson of ['01', '02']) {
  test('HL-119: lesson ' + lesson + ' remains usable if its silent video cannot load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width: 320, height: 700 });
    await page.route('**/*.mp4', route => route.abort('failed'));
    await page.goto('/lessons/' + lesson + '/');
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });

    await expect(page.getByRole('heading', { name: 'See It', exact: true })).toBeVisible();
    const continueButton = page.getByRole('button', { name: 'Continue to Understand It', exact: true });
    await expect(continueButton).toBeEnabled();
    await continueButton.focus();
    await page.keyboard.press('Enter');

    await expect(page.getByRole('heading', { name: 'Understand It', exact: true })).toBeVisible();
    await expect(page.getByText('You sent a message', { exact: false }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue to Practice' })).toBeEnabled();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    await page.getByRole('button', { name: 'Continue to Practice' }).click();
    await expect(page.locator('button.option')).toHaveCount(3);
    expect(errors).toEqual([]);
  });
}

test('HL-119: lesson 03 remains usable without its private review MP4', async ({ page }) => {
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/media/lesson03.mp4', route => route.abort('failed'));
  await page.goto('/lessons/03/');
  await expect(page.locator('.video-lesson')).toBeHidden();
  const video=page.locator('video');
  await expect(video.locator('source')).toHaveAttribute('src','../../media/lesson03.mp4');
  await expect(page.getByRole('heading',{name:'Notice the feeling before choosing'})).toBeVisible();
  await page.getByRole('button',{name:'Start interactive practice'}).click();
  await expect(page.locator('button.option')).toHaveCount(3);
  expect(errors).toEqual([]);
});

test('HL-119: lesson 03 video controls are attached only after media metadata arrives', async ({ page }) => {
  await page.route('**/media/lesson03.mp4',route=>route.abort('failed'));
  await page.goto('/lessons/03/');
  await expect(page.locator('.video-lesson')).toBeHidden();
  // Simulate metadata readiness to verify the local-media branch without
  // putting the founder's video into this publicly readable repository.
  await page.locator('video').evaluate(v=>v.dispatchEvent(new Event('loadedmetadata')));
  await expect(page.locator('.video-lesson')).toBeVisible();
  await expect(page.getByRole('group',{name:'Video playback and download options'})).toBeVisible();
  await expect(page.locator('video')).toHaveAttribute('controls','');
});
