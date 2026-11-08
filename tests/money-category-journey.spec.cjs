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
    await expect(page.locator('#money-more')).not.toHaveAttribute('open',/.+/);
    await expect(page.locator('#money-more summary')).toContainText('Other Money & Bills resources (4)');
    await expect(page.locator('#areaKit')).toHaveCount(0);
    await expect(page.locator('.money-pilot')).toHaveCount(0);
    await expect(page.locator('main > #oneplacePublicMetrics')).toBeVisible();
    expect(await page.evaluate(()=>document.getElementById('main').lastElementChild.id)).toBe('oneplacePublicMetrics');
    await expect(page.locator('.offers > a.offer').nth(3)).toContainText('Not available');
    await expect(page.locator('.money-task-urgency')).toContainText('court, eviction or shutoff');
    await expect(page.getByRole('heading',{name:'Choose your situation'})).toBeVisible();
    await expect(page.locator('#money-path-primary')).toBeHidden();
    await expect(page.locator('#money-task-options button[aria-pressed="true"]')).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    const cases=[
      {button:/I cannot cover an essential bill/,heading:'Start with the bill and its deadline',href:'https://211.org/get-help/i-need-help-paying-my-bills',secondary:'one-place/money-bills.html',call:true},
      {button:/My bills arrive before my next paycheck/,heading:'See what comes due before money arrives',href:'one-place/money-bills.html',call:true},
      {button:/A creditor or debt collector contacted me/,heading:'Check who contacted you and what they claim',href:'one-place/debt-creditor-guide.html'},
      {button:/I received court papers about a debt/,heading:'Read the court notice and act on the deadline',href:'https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-im-sued-by-a-debt-collector-or-creditor-en-334/',secondary:'https://www.lsc.gov/about-lsc/what-legal-aid/i-need-legal-help',warning:'default judgment'},
      {button:/I want to make a monthly spending plan/,heading:'Start with a simple monthly picture',href:'https://consumer.gov/your-money/budget-worksheet',secondary:'https://consumer.gov/your-money/making-budget'}
    ];
    for(const example of cases){
      const button=page.getByRole('button',{name:example.button});
      await button.click();
      await expect(button).toHaveAttribute('aria-pressed','true');
      await expect(page.getByRole('heading',{name:example.heading,exact:true})).toBeVisible();
      await expect(page.locator('#money-path-first')).toBeVisible();
      await expect(page.locator('#money-path-steps li')).toHaveCount(2);
      await expect(page.locator('#money-extra-steps')).not.toHaveAttribute('open','');
      if(example.call){await expect(page.locator('#money-call-help')).toBeVisible();await page.locator('#money-call-help summary').click();await expect(page.locator('#money-call-script')).not.toBeEmpty();}else{await expect(page.locator('#money-call-help')).toBeHidden();}
      await expect(page.locator('#money-path-primary')).toHaveAttribute('href',example.href);
      if(example.secondary)await expect(page.locator('#money-path-secondary')).toHaveAttribute('href',example.secondary);
      if(example.warning)await expect(page.locator('#money-path-caution')).toContainText(example.warning);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    }
    await expect(page.locator('#money-path-primary')).toContainText('simple budget worksheet');
    await expect(page.locator('#money-path-secondary')).toContainText('How to make a budget');
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


test('Money & Bills essential-bill and creditor pages give meaningful, scoped guidance',async({page})=>{
 await page.goto('/index.html?service=s001');
 await expect(page.getByRole('heading',{name:'Start with the notice, then contact the provider'})).toBeVisible();
 await expect(page.locator('#helpContent ol li')).toHaveCount(3);
 await expect(page.locator('#aside a[target="_blank"]')).toHaveAttribute('href','https://211.org/get-help/i-need-help-paying-my-bills');
 await expect(page.locator('#helpContent .notice')).toContainText('eviction papers');
 await expect(page.locator('.money-pilot')).toHaveCount(0);

 await page.goto('/index.html?service=s002');
 await expect(page.locator('#debtGuideInvite')).toBeVisible();
 await expect(page.getByRole('heading',{name:'Start by reviewing the notice and your response options'})).toBeVisible();
 await expect(page.locator('#helpContent ol li')).toHaveCount(3);
 await expect(page.locator('#aside a[target="_blank"]')).toHaveAttribute('href','https://www.consumerfinance.gov/consumer-tools/debt-collection/know-your-rights-when-a-debt-collector-calls/');
 await expect(page.locator('.money-pilot')).toHaveCount(0);
 await expect(page.locator('#solutionKit')).toHaveCount(0);
 await page.locator('#debtGuideInvite a').click();
 await expect(page).toHaveURL(/\/one-place\/debt-creditor-guide\.html$/);
 await expect(page.getByRole('heading',{name:'Debt & Creditor Guide'})).toBeVisible();
});



test('Money & Bills mobile shows the selected answer, then lets visitor change choice',async({page})=>{
 await page.setViewportSize({width:320,height:640});
 await page.goto('/index.html?area=Money%20%26%20Bills');
 const button=page.getByRole('button',{name:/I received court papers about a debt/});
 await button.click();
 await expect(button).toHaveAttribute('aria-pressed','true');
 await expect(page.getByRole('heading',{name:'Read the court notice and act on the deadline'})).toBeVisible();
 const visible=await page.locator('#money-path-heading').evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.top<window.innerHeight;});
 expect(visible).toBe(true);
 await page.getByRole('button',{name:'Choose another situation'}).click();
 const current=await button.evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.top<window.innerHeight;});
 expect(current).toBe(true);
 await page.locator('#money-more summary').click();
 await expect(page.locator('#money-more')).toHaveAttribute('open','');
 await expect(page.locator('.offers > a.offer')).toHaveCount(4);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});


test('Money & Bills budgeting resource serves individual consumers, not financial practitioners',async({page})=>{
  await page.goto('/index.html?area=Money%20%26%20Bills');
  await page.getByRole('button',{name:/I want to make a monthly spending plan/}).click();
  await expect(page.locator('#money-path-primary')).toHaveAttribute('href','https://consumer.gov/your-money/budget-worksheet');
  await expect(page.locator('#money-path-secondary')).toHaveAttribute('href','https://consumer.gov/your-money/making-budget');
  await expect(page.locator('#money-path-summary')).toContainText('for individuals');
  await expect(page.locator('#money-path-primary')).not.toHaveAttribute('href',/\/educator-tools\/|\/tools-and-resources\//);
  await expect(page.locator('#money-path-primary')).not.toHaveAttribute('href',/\/consumer-tools\/educator-tool\/your-money-your-goals\/toolkit\//);
});
