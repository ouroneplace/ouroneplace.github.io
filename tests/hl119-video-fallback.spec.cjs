const { test, expect } = require('@playwright/test');

// Current HL-119/B10 behavior: all ten approved videos use Descript embeds.
// Block the actual video host, not legacy local MP4 requests, and verify that
// the independent text learning path still works. This does not prove playback,
// captions, visual descriptions or a genuinely independent video backup.
for (let n = 1; n <= 10; n++) {
  const lesson = String(n).padStart(2, '0');
  test('HL-119: Lesson ' + lesson + ' remains usable if Descript cannot load, at 320px / 200% text', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    await page.setViewportSize({ width: 320, height: 700 });
    await page.route('https://share.descript.com/**', route => route.abort('failed'));
    await page.goto('/lessons/' + lesson + '/');
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });

    const reflow = async label => {
      const metrics = await page.evaluate(() => ({
        width: window.innerWidth,
        pageWidth: document.documentElement.scrollWidth,
      }));
      expect(metrics.pageWidth, 'Lesson ' + lesson + ' / ' + label).toBeLessThanOrEqual(metrics.width);
    };

    await expect(page.getByRole('heading', { name: 'See It', exact: true })).toBeVisible();
    await expect(page.locator('.video-lesson iframe.lesson-video-frame')).toHaveCount(1);
    const externalLink = page.getByRole('link', {
      name: 'Open Lesson ' + n + ' video in a new tab', exact: true,
    });
    await expect(externalLink).toHaveAttribute('href', /^https:\/\/share\.descript\.com\/view\//);
    await expect(page.locator('.video-lesson a')).toHaveCount(1);
    await reflow('blocked video');

    const continueButton = page.getByRole('button', {
      name: 'Continue to Understand It', exact: true,
    });
    await expect(continueButton).toBeEnabled();
    await continueButton.focus();
    await page.keyboard.press('Enter');

    await expect(page.getByRole('heading', { name: 'Understand It', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue to Practice', exact: true })).toBeEnabled();
    await reflow('Understand It');
    await page.getByRole('button', { name: 'Continue to Practice', exact: true }).click();

    await expect(page.locator('button.option')).toHaveCount(3);
    await expect(page.getByRole('navigation', { name: 'One Place and lessons' })
      .getByRole('link', { name: 'All Lessons' })).toBeVisible();
    await reflow('Practice');
    expect(pageErrors).toEqual([]);
  });
}
