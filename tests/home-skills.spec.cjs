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

test('Home Skills: starter toolkit and close-open-lessons control',async({page})=>{
  await page.goto(url);
  const toolkit=page.locator('#begin-tools');
  await expect(toolkit).toBeVisible();
  await toolkit.locator('summary').click();
  await expect(toolkit).toHaveAttribute('open','');
  await expect(toolkit).toContainText('Manufacturer manual');
  const close=page.getByRole('button',{name:'Close open lessons'});
  await expect(close).toBeDisabled();
  await page.locator('#skill-1 summary').click();
  await page.locator('#skill-2 summary').click();
  await expect(close).toBeEnabled();
  await expect(page.locator('#open-count')).toHaveText('2 lessons open');
  await close.click();
  await expect(page.locator('details.skill[open]')).toHaveCount(0);
  await expect(close).toBeDisabled();
  await expect(page.locator('#open-count')).toHaveText('No lessons open');
});

test('Home Skills: expert-only hazard guidance never invites DIY, verified direct references',async({page})=>{
  await page.goto(url);
  const expert=page.locator('details.skill[data-level="Expert needed"]');
  await expect(expert).toHaveCount(5);
  for(let i=0;i<5;i++){
    await expert.nth(i).locator('summary').click();
    await expect(expert.nth(i).locator('h3')).toHaveText('Recognize the hazard — do not attempt the repair');
  }
  await expect(page.locator('#skill-16 a.reference')).toHaveAttribute('href','https://www.energy.gov/cmei/scep/wap/articles/job-aid-11-1-install-weatherstripping-exterior-door');
  await expect(page.locator('#skill-8 a.reference')).toHaveAttribute('href','https://www.energy.gov/cmei/scep/wap/articles/job-aid-24-2-install-low-flow-faucet-aerator');
  await expect(page.locator('#skill-26 a.reference')).toHaveAttribute('href',/extension.umn.edu/);
  await expect(page.locator('#skill-27 a.reference')).toHaveAttribute('href',/extension.psu.edu/);
});

test('Home Skills: open lessons hidden by filters are identified clearly',async({page})=>{
  await page.goto(url);
  await page.locator('#skill-1 summary').click();
  await page.locator('#skill-2 summary').click();
  await expect(page.locator('#open-count')).toHaveText('2 lessons open');
  await page.locator('button[data-area="Laundry"]').click();
  await expect(page.locator('details.skill:visible')).toHaveCount(3);
  await expect(page.locator('#open-count')).toHaveText('2 lessons open (0 in current results; 2 hidden by filters)');
  await page.getByRole('button',{name:'Close open lessons'}).click();
  await expect(page.locator('#open-count')).toHaveText('No lessons open');
  await page.locator('button[data-area="all"]').click();
  await expect(page.locator('details.skill[open]')).toHaveCount(0);
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

test('Home Skills: four original diagrams teach specific parts with accessible descriptions',async({page})=>{
 await page.goto(url);
 await expect(page.locator('.skill-visual')).toHaveCount(4);
 const sample=[
  ['6','Simple toilet tank dye test schematic','How the toilet dye test works'],
  ['8','Exploded faucet aerator parts schematic','Recognize the faucet aerator parts'],
  ['19','HVAC filter airflow direction schematic','Follow the direction of airflow'],
  ['24','Home roof drainage and foundation schematic','Where rainwater should go']
 ];
 for(const [id,diagramTitle,caption] of sample){
  const lesson=page.locator('#skill-'+id);
  await lesson.locator('summary').click();
  await expect(lesson.locator('figure.skill-visual')).toBeVisible();
  await expect(lesson.locator('svg[role="img"] title')).toHaveText(diagramTitle);
  await expect(lesson.locator('svg desc')).not.toBeEmpty();
  await expect(lesson.locator('figcaption strong')).toHaveText(caption);
  await expect(lesson.locator('figcaption')).toContainText('Simplified illustration');
  await expect(lesson.locator('a.reference')).toHaveAttribute('rel','noopener noreferrer');
 }
 await expect(page.locator('#skill-19 a.reference')).toHaveAttribute('href','https://basc.pnnl.gov/diy-guides/replace-air-filter-located-furnace-or-central-heat-pump-air-filter-slot');
 await expect(page.locator('#skill-24 a.reference')).toHaveAttribute('href','https://bsesc.energy.gov/energy-basics/stormwater-gutters-downspouts');
});

test('Home Skills: original diagrams can be enlarged and inspected at phone width',async({page})=>{
 await page.setViewportSize({width:320,height:780});
 await page.goto(url);
 await page.getByRole('button',{name:'HVAC filter airflow'}).click();
 const figure=page.locator('#skill-19 figure.skill-visual');
 const enlarge=figure.getByRole('button',{name:'Enlarge diagram'});
 await expect(enlarge).toBeVisible();
 await enlarge.click();
 await expect(figure).toHaveAttribute('data-zoom','true');
 await expect(figure.getByRole('button',{name:'Fit diagram to screen'})).toHaveAttribute('aria-pressed','true');
 const sizes=await figure.evaluate(el=>({inner:el.clientWidth,scroll:el.scrollWidth}));
 expect(sizes.scroll).toBeGreaterThan(sizes.inner);
 const pageSize=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
 expect(pageSize.scroll).toBeLessThanOrEqual(pageSize.viewport+1);
 const fit=figure.getByRole('button',{name:'Fit diagram to screen'});
 await fit.click();
 await expect(figure).toHaveAttribute('data-zoom','false');
 await expect(figure.getByRole('button',{name:'Enlarge diagram'})).toHaveAttribute('aria-pressed','false');
});

test('Home Skills: illustration shortcuts reveal lessons even after a conflicting search/filter',async({page})=>{
 await page.goto(url);
 const search=page.locator('#search');
 await search.fill('roof');
 await page.locator('button[data-area="Know Your Limits"]').click();
 await expect(page.locator('details.skill:visible')).toHaveCount(1);
 const btn=page.getByRole('button',{name:'Faucet aerator',exact:true});
 await btn.focus();
 await page.keyboard.press('Enter');
 await expect(search).toHaveValue('');
 await expect(page.locator('button[data-area="all"]')).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#skill-8')).toBeVisible();
 await expect(page.locator('#skill-8')).toHaveAttribute('open','');
 await expect(page.locator('#skill-8 summary')).toBeFocused();
 await expect(page.locator('#skill-8 figure.skill-visual')).toBeVisible();
 await expect(page.locator('#open-count')).toContainText('1 lesson open');
});

test('Home Skills: user can read every skill without interaction and cited sources are optional',async({page})=>{
  await page.goto(url);
  for(const i of [0,5,15,20,27,31,35]){
    const lesson=page.locator('details.skill').nth(i);
    await lesson.locator('summary').click();
    const stepCount=await lesson.locator('.steps li').count();
    expect(stepCount).toBeGreaterThanOrEqual(3);
    expect(stepCount).toBeLessThanOrEqual(4);
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
  await expect(page.getByRole('link',{name:'One Place Home',exact:true})).toHaveAttribute('href','../index.html');
});
