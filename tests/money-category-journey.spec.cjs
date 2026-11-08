const {test,expect}=require('@playwright/test');

for(const width of [320,390,1366]){
  test('Money & Bills starts with five practical situations at '+width+'px',async({page})=>{
    const errors=[];const unwanted=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('request',req=>{
      const u=new URL(req.url());
      if(u.hostname!=='127.0.0.1' && u.hostname!=='localhost')unwanted.push(req.url());
    });
    await page.setViewportSize({width,height:844});
    await page.goto('/index.html?area=Money%20%26%20Bills');
    await expect(page.getByRole('heading',{name:'Money & Bills',exact:true})).toBeVisible();
    await expect(page.getByRole('heading',{name:'What do you need help with today?'})).toBeVisible();
    const choices=page.locator('#money-task-options button');
    await expect(choices).toHaveCount(5);
    await expect(page.locator('.offers > a.offer')).toHaveCount(4);
    await expect(page.locator('#areaKit')).toHaveCount(0);
    await expect(page.locator('.money-pilot')).toHaveCount(0);
    await expect(page.getByRole('heading',{name:'Other ways to explore Money & Bills'})).toBeVisible();
    await expect(page.locator('.offers > a.offer').nth(3)).toContainText('Not available');
    await expect(page.locator('#money-path-caution')).toContainText('eviction or court notice');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    const cases=[
      {button:/I cannot cover an essential bill/,heading:'Start with the bill and its deadline',href:'index.html?service=s001',secondary:'https://211.org/get-help/i-need-help-paying-my-bills'},
      {button:/My bills arrive before my next paycheck/,heading:'See what comes due before money arrives',href:'one-place/money-bills.html'},
      {button:/A creditor or debt collector contacted me/,heading:'Check who contacted you and what they claim',href:'one-place/debt-creditor-guide.html'},
      {button:/I received court papers about a debt/,heading:'Read the court notice and act on the deadline',href:'https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-im-sued-by-a-debt-collector-or-creditor-en-334/',warning:'default judgment'},
      {button:/I want to make a monthly spending plan/,heading:'Start with a simple monthly picture',href:'index.html?service=s003'}
    ];
    for(const example of cases){
      const button=page.getByRole('button',{name:example.button});
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed','true');
      await expect(page.getByRole('heading',{name:example.heading,exact:true})).toBeVisible();
      await expect(page.locator('#money-path-steps li')).toHaveCount(3);
      await expect(page.locator('#money-path-primary')).toHaveAttribute('href',example.href);
      if(example.secondary)await expect(page.locator('#money-path-secondary')).toHaveAttribute('href',example.secondary);
      if(example.warning)await expect(page.locator('#money-path-caution')).toContainText(example.warning);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    }
    await expect(page.locator('#money-path-primary')).toContainText('Budget Studio');
    await expect(page.locator('.offers > a.offer')).toHaveCount(4);
    expect(await page.evaluate(()=>Object.keys(localStorage))).toEqual([]);
    expect(unwanted).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('Money & Bills buttons work with keyboard and direct destination links',async({page})=>{
  await page.goto('/index.html?area=Money%20%26%20Bills');
  const bills=page.getByRole('button',{name:/My bills arrive before my next paycheck/});
  await bills.focus();await page.keyboard.press('Enter');
  await expect(bills).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#money-path-primary')).toHaveAttribute('href','one-place/money-bills.html');
  await page.locator('#money-path-primary').click();
  await expect(page).toHaveURL(/\/one-place\/money-bills\.html$/);
  await expect(page.getByRole('heading',{name:/Know what comes due/})).toBeVisible();

  await page.goto('/index.html?area=Money%20%26%20Bills');
  await page.getByRole('button',{name:/A creditor or debt collector contacted me/}).click();
  await page.locator('#money-path-primary').click();
  await expect(page).toHaveURL(/\/one-place\/debt-creditor-guide\.html$/);
  await expect(page.getByRole('heading',{name:'Debt & Creditor Guide'})).toBeVisible();
});
