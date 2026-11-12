const { test, expect } = require('@playwright/test');

for (let lesson = 1; lesson <= 10; lesson++) {
  const number = String(lesson).padStart(2, '0');
  test(`lesson ${number}: library navigation, feedback, quiz, completion, restart and home`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/human-literacy/');
    await page.getByRole('link', { name: `Start Lesson ${number}`, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/lessons/${number}/`));
    await expect(page.locator('h1')).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (let intro = 0; intro < 3 && await page.locator('button.option').count() === 0; intro++) {
      await page.locator('#app > button.action').first().click();
    }
    for (let scene = 0; scene < 3; scene++) {
      const next = page.getByRole('button', { name: scene === 2 ? 'Continue to Remember It' : 'Next situation', exact: true });
      await expect(next).toBeDisabled();
      const choices = page.locator('button.option');
      expect(await choices.count()).toBe(3);
      for (let choice = 0; choice < 3; choice++) {
        await choices.nth(choice).click();
        await expect(page.locator('.feedback').last()).toBeVisible();
      }
      await expect(next).toBeEnabled();
      await next.click();
    }
    for (const answer of [1, 2, 0]) {
      const submit = page.getByRole('button', { name: 'Submit answer', exact: true });
      await expect(submit).toBeDisabled();
      await page.locator('button.option').nth(answer).click();
      await expect(submit).toBeEnabled();
      await submit.click();
    }
    await expect(page.locator('.summary')).toContainText('(3 answered)');
    if (lesson === 1) await expect(page.locator('.summary')).toContainText('3 of 3 correct');
    await page.locator('#app > button.action').first().click();
    await page.getByRole('button', { name: 'Practice lesson again', exact: true }).click();
    await expect(page.getByRole('button', { name: '← Back', exact: true })).toBeDisabled();
    await page.getByRole('button', { name: '⌂ Home', exact: true }).click();
    await expect(page).toHaveTitle(/ONE PLACE/);
    // v4: the homepage now presents Human Literacy as a first-class category card.
    await page.locator('.grid > a.new-card').filter({ hasText: 'Human Literacy' }).click();
    await expect(page).toHaveURL(/\/human-literacy\/$/);
    await expect(page.getByRole('link', { name: 'Start Lesson 10', exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('Lessons 01–10: centered headers and stage titles, centered video players, responsive widths', async ({ page }) => {
  test.setTimeout(120000); // Thirty viewport/lesson combinations need more than the default 30 seconds.
  // Geometry checks do not need a networked video to load; prevent slow third-party embeds.
  await page.route('https://share.descript.com/**', route => route.abort('failed'));
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 850 });
    for (let n = 1; n <= 10; n++) {
      const lesson = String(n).padStart(2, '0');
      await page.goto('/lessons/' + lesson + '/');
      const layout = await page.evaluate(() => {
        const brand = document.querySelector('.brand');
        const heading = document.querySelector('.lesson-heading');
        const stageHeading = document.querySelector('#app > h1');
        const frame = document.querySelector('.lesson-video-gate');
        const section = document.querySelector('.video-lesson');
        const close = (a, b) => Math.abs(a - b) <= 3;
        return {
          brandCentered: getComputedStyle(brand).textAlign === 'center',
          titleCentered: getComputedStyle(heading).textAlign === 'center',
          stageCentered: getComputedStyle(stageHeading).textAlign === 'center',
          headingFlexCentered: !heading.querySelector('strong') || getComputedStyle(heading).alignItems === 'center',
          playerCentered: !frame || close(
            frame.getBoundingClientRect().left + frame.getBoundingClientRect().width / 2,
            section.getBoundingClientRect().left + section.getBoundingClientRect().width / 2
          ),
          noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth
        };
      });
      expect(layout, `Lesson ${lesson}, viewport ${width}px`).toEqual({
        brandCentered: true,
        titleCentered: true,
        stageCentered: true,
        headingFlexCentered: true,
        playerCentered: true,
        noHorizontalOverflow: true
      });
    }
  }
});

test('All lessons: navigation explains itself without redundant text', async ({ page }) => {
  for (let n = 1; n <= 10; n++) {
    const lesson = String(n).padStart(2, '0');
    await page.goto('/lessons/' + lesson + '/');
    await expect(page.getByRole('button', { name: '← Back', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: '⌂ Home', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Forward →', exact: true })).toBeVisible();
    await expect(page.getByText('Navigation lets you review or skip pages.', { exact: false })).toHaveCount(0);
  }
});

test('Lessons 01–10: every See It player has exactly one standard external video link', async ({ page }) => {
  for (let n = 1; n <= 10; n++) {
    const lesson = String(n).padStart(2, '0');
    await page.goto('/lessons/' + lesson + '/');
    await expect(page.locator('.video-lesson iframe.lesson-video-frame')).toHaveCount(0);
    await expect(page.getByRole('button',{name:'Play Lesson Video',exact:true})).toBeVisible();
    await expect(page.locator('.video-lesson a')).toHaveCount(1);
    await expect(page.locator('.video-lesson a')).toHaveText('Open Lesson ' + n + ' video in a new tab');
    await expect(page.getByText('Watch original MP4 if the video player is unavailable')).toHaveCount(0);
  }
});

const embeddedVideos = [
  { lesson: '01', share: 'jmGClFW0etJ', mp4: null },
  { lesson: '02', share: '8GyMmS5Oixd', mp4: null },
  { lesson: '03', share: 'OVaHB0aypFw', mp4: null },
  { lesson: '04', share: 'f17fyNgzbZM', mp4: null },
  { lesson: '05', share: 'CZsVq0YNMTq', mp4: null },
  { lesson: '06', share: 'hEnvP1RZFon', mp4: null },
  { lesson: '07', share: 'LfvHoksdBOl', mp4: null },
  { lesson: '08', share: 'LhyDGOcpa2v', mp4: null },
  { lesson: '09', share: 'SA7a2B7Yo0l', mp4: null },
  { lesson: '10', share: '6RV8mLe8v2W', mp4: null }
];
for (const { lesson, share, mp4 } of embeddedVideos) {
  test(`lesson ${lesson}: large embedded video and five-stage flow`, async ({ page }) => {
    await page.route('https://share.descript.com/**', route => route.abort('failed'));
    await page.goto('/lessons/' + lesson + '/');
    await expect(page.getByRole('heading', { name: 'See It', exact: true })).toBeVisible();
    await expect(page.locator('.video-lesson iframe.lesson-video-frame')).toHaveCount(0);
    await page.getByRole('button',{name:'Play Lesson Video',exact:true}).click();
    await expect(page.locator('.video-lesson iframe.lesson-video-frame'))
      .toHaveAttribute('src', 'https://share.descript.com/embed/' + share);
    await expect(page.getByRole('link', { name: 'Open Lesson ' + Number(lesson) + ' video in a new tab' }))
      .toHaveAttribute('href', 'https://share.descript.com/view/' + share);
    if (mp4) {
      await expect(page.getByRole('link', { name: 'Watch original MP4 if the video player is unavailable' }))
        .toHaveAttribute('href', new RegExp('/media/' + mp4 + '$'));
    }
    await page.getByRole('button', { name: 'Continue to Understand It' }).click();
    await expect(page.getByRole('heading', { name: 'Understand It' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue to Practice' }).click();
    await expect(page.locator('button.option')).toHaveCount(3);
  });
}

test('HL-119: unanswered Remember It cannot be bypassed with Forward', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/lessons/01/');
  await page.getByRole('button', { name: 'Continue to Understand It' }).click();
  await page.getByRole('button', { name: 'Continue to Practice' }).click();
  for (let scene = 0; scene < 3; scene++) {
    const options = page.locator('button.option');
    for (let choice = 0; choice < 3; choice++) await options.nth(choice).click();
    await page.getByRole('button', { name: scene === 2 ? 'Continue to Remember It' : 'Next situation', exact: true }).click();
  }
  const forward = page.getByRole('button', { name: 'Forward →', exact: true });
  const submit = page.getByRole('button', { name: 'Submit answer', exact: true });
  await expect(forward).toBeDisabled();
  await expect(submit).toBeDisabled();
  await page.locator('button.option').nth(1).click();
  await expect(forward).toBeDisabled();
  await submit.click();
  await expect(forward).toBeDisabled();
  await page.getByRole('button', { name: '← Back', exact: true }).click();
  await expect(forward).toBeEnabled();
  await forward.click();
  await expect(forward).toBeDisabled();
  for (const answer of [2, 0]) {
    await page.locator('button.option').nth(answer).click();
    await page.getByRole('button', { name: 'Submit answer', exact: true }).click();
  }
  await expect(page.locator('.summary')).toContainText('3 of 3 correct');
  await page.getByRole('button', { name: 'Continue to Live It' }).click();
  await expect(page.locator('h1')).toContainText('Take the skill into real life');
  expect(errors).toEqual([]);
});


