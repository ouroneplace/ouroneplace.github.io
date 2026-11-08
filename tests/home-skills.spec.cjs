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
  await page.locator('#compare-lessons').check();
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
  await expect(page.locator('#skill-26 a.reference')).toHaveAttribute('href',/cpsc.gov\/Newsroom\/News-Releases\/2012\/CPSC-Issues-Safety-Tips-For-Rotary-Power-Mowers/);
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
 await expect(page.locator('.skill-visual')).toHaveCount(36);
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


test('Home Skills: beginner home-care schedule opens correct lessons after conflicting filters',async({page})=>{
 await page.setViewportSize({width:320,height:800});
 await page.goto(url);
 const schedule=page.locator('#care-schedule');
 await expect(schedule).toBeVisible();
 await expect(schedule.locator('details.schedule-group')).toHaveCount(5);
 const links=schedule.locator('button[data-show-skill]');
 await expect(links).toHaveCount(13);
 const ids=await links.evaluateAll(nodes=>nodes.map(node=>node.getAttribute('data-show-skill')));
 expect(new Set(ids).size).toBe(13);
 for(const id of ids)await expect(page.locator('#skill-'+id)).toHaveCount(1);
 await page.locator('#search').fill('zzzz-no-match');
 await page.locator('button[data-area="Know Your Limits"]').click();
 await page.locator('#schedule-monthly summary').click();
 await schedule.getByRole('button',{name:/Open lesson: Test smoke alarms/}).click();
 await expect(page.locator('#search')).toHaveValue('');
 await expect(page.locator('button[data-area="all"]')).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#skill-28')).toHaveAttribute('open','');
 await expect(page.locator('#skill-28 summary')).toBeFocused();
 const size=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
 expect(size.scroll).toBeLessThanOrEqual(size.viewport+1);
});


test('Home Skills: previously illustrated eight remain valid after library expansion',async({page})=>{
 await page.goto(url);
 await expect(page.locator('.skill-visual')).toHaveCount(36);
 await expect(page.locator('.skill-check')).toHaveCount(36);
 const illustrated=['4','6','8','11','13','16','19','24'];
 for(const id of illustrated){
   const lesson=page.locator('#skill-'+id);
   await expect(lesson.locator('.skill-visual')).toHaveCount(1);
   await expect(lesson.locator('svg[role="img"] title')).not.toBeEmpty();
   await expect(lesson.locator('svg[role="img"] desc')).not.toBeEmpty();
   await expect(lesson.locator('.skill-check button')).toHaveCount(3);
   await expect(lesson.locator('.skill-check .check-feedback')).toContainText('not a safety certification');
 }
 await expect(page.locator('#skill-4 a.reference')).toHaveAttribute('href',/producthelp\.whirlpool\.com/);
 await expect(page.locator('#skill-13 a.reference')).toHaveAttribute('href',/repair\.geappliances\.com/);
 await expect(page.locator('[data-show-skill]')).toHaveCount(49);
});

test('Home Skills: practice answers explain unsafe choices without storing scores',async({page})=>{
 await page.setViewportSize({width:320,height:780});
 await page.goto(url);
 const lesson=page.locator('#skill-16');
 await lesson.locator('summary').click();
 const answers=lesson.locator('.skill-check button');
 await answers.nth(0).click();
 await expect(answers.nth(0)).toHaveAttribute('aria-pressed','true');
 await expect(lesson.locator('.check-feedback')).toContainText('Not quite');
 await answers.nth(2).click();
 await expect(answers.nth(0)).toHaveAttribute('aria-pressed','false');
 await expect(answers.nth(2)).toHaveAttribute('aria-pressed','true');
 await expect(lesson.locator('.check-feedback')).toContainText('Good reasoning');
 await page.reload();
 await lesson.locator('summary').click();
 await expect(lesson.locator('.check-feedback')).toContainText('Choose an answer');
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
 const size=await page.evaluate(()=>({vp:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
 expect(size.scroll).toBeLessThanOrEqual(size.vp+1);
});

test('Home Skills: new visual shortcuts open model-specific lessons after contradictory filters',async({page})=>{
 await page.goto(url);
 await page.locator('#search').fill('no-such-topic');
 await page.locator('button[data-area="Know Your Limits"]').click();
 await page.getByRole('button',{name:'Washer hoses',exact:true}).click();
 await expect(page.locator('#skill-13')).toHaveAttribute('open','');
 await expect(page.locator('#search')).toHaveValue('');
 await expect(page.locator('button[data-area="all"]')).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#skill-13 svg title')).toHaveText('Washing machine supply hose inspection points schematic');
});


test('Home Skills: twelve illustrations and twelve optional checks remain distinct',async({page})=>{
 await page.goto(url);
 await expect(page.locator('.skill-visual')).toHaveCount(36);
 await expect(page.locator('.skill-check')).toHaveCount(36);
 const ids=[4,6,7,8,11,12,13,16,18,19,24,28];
 for(const id of ids){
  const lesson=page.locator('#skill-'+id);
  await expect(lesson.locator('svg[role="img"] title')).not.toBeEmpty();
  await expect(lesson.locator('svg[role="img"] desc')).not.toBeEmpty();
  await expect(lesson.locator('.skill-check button')).toHaveCount(3);
 }
 await expect(page.locator('.visual-actions button')).toHaveCount(36);
 await expect(page.locator('[data-show-skill]')).toHaveCount(49);
 await expect(page.locator('#skill-18 a.reference')).toHaveAttribute('href','https://www.cpsc.gov/s3fs-public/5032.pdf');
});
test('Home Skills: safety checks correct unsafe answers and show no lasting score',async({page})=>{
 await page.setViewportSize({width:320,height:800});
 await page.goto(url);
 await page.locator('#skill-7 summary').click();
 await page.locator('#skill-7 .skill-check button').first().click();
 await expect(page.locator('#skill-7 .check-feedback')).toContainText('Not quite.');
 await page.locator('#skill-7 .skill-check button').nth(1).click();
 await expect(page.locator('#skill-7 .check-feedback')).toContainText('Good reasoning.');
 await page.getByRole('button',{name:'Smoke alarm test',exact:true}).click();
 await expect(page.locator('#skill-28')).toHaveAttribute('open','');
 await page.locator('#skill-28 .skill-check button').nth(1).click();
 await expect(page.locator('#skill-28 .check-feedback')).toContainText('Good reasoning.');
 const x=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,local:localStorage.length,session:sessionStorage.length}));
 expect(x.scroll).toBeLessThanOrEqual(x.viewport+1);expect(x.local).toBe(0);expect(x.session).toBe(0);
});
test('Home Skills: dryer vent concept diagram can be enlarged using keyboard at 320px',async({page})=>{
 await page.setViewportSize({width:320,height:780});await page.goto(url);
 await page.getByRole('button',{name:'Dryer vent pathway',exact:true}).focus();await page.keyboard.press('Enter');
 const f=page.locator('#skill-12 figure.skill-visual');await expect(f).toBeVisible();
 await f.getByRole('button',{name:'Enlarge diagram'}).click();await expect(f).toHaveAttribute('data-zoom','true');
 await f.getByRole('button',{name:'Fit diagram to screen'}).click();await expect(f).toHaveAttribute('data-zoom','false');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
});

test('Home Skills: all 36 lessons teach why and warn of a task-specific mistake',async({page})=>{
 await page.goto(url);
 await expect(page.locator('details.skill')).toHaveCount(36);
 await expect(page.locator('details.skill .lesson-why')).toHaveCount(36);
 await expect(page.locator('details.skill .lesson-pitfall')).toHaveCount(36);
 const whyTexts=await page.locator('.lesson-why').allTextContents();
 const mistakeTexts=await page.locator('.lesson-pitfall').allTextContents();
 expect(new Set(whyTexts).size).toBe(36);
 expect(new Set(mistakeTexts).size).toBe(36);
 for(const id of [1,7,18,28,32,33,34,35,36]){
  const card=page.locator('#skill-'+id);
  await card.locator('summary').click();
  await expect(card.locator('.lesson-why')).toBeVisible();
  await expect(card.locator('.lesson-pitfall')).toBeVisible();
 }
});
test('Home Skills: why and mistake explanations remain readable on 320px phone',async({page})=>{
 await page.setViewportSize({width:320,height:780});
 await page.goto(url);
 await page.locator('#skill-33 summary').click();
 await expect(page.locator('#skill-33 .lesson-pitfall')).toContainText('suspected gas leak');
 const rect=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
 expect(rect.scroll).toBeLessThanOrEqual(rect.client+1);
});

test('Home Skills: 16 original diagrams and 16 optional understanding checks',async({page})=>{
 await page.goto(url);
 await expect(page.locator('details.skill')).toHaveCount(36);
 await expect(page.locator('.skill-visual')).toHaveCount(36);
 await expect(page.locator('.skill-check')).toHaveCount(36);
 await expect(page.locator('.visual-actions button')).toHaveCount(36);
 await expect(page.locator('[data-show-skill]')).toHaveCount(49);
 for(const id of [9,10,23,31]){
  const card=page.locator('#skill-'+id);
  await expect(card.locator('svg[role="img"] title')).not.toBeEmpty();
  await expect(card.locator('svg[role="img"] desc')).not.toBeEmpty();
  await expect(card.locator('.skill-check button')).toHaveCount(3);
  await expect(card.locator('.lesson-why')).toHaveCount(1);
  await expect(card.locator('.lesson-pitfall')).toHaveCount(1);
 }
 await expect(page.locator('#skill-9 a.reference')).toHaveAttribute('href','https://www.lowes.com/n/how-to/clear-clogged-drain');
 await expect(page.locator('#skill-23 a.reference')).toHaveAttribute('href','https://www.epa.gov/watersense/fix-leak-week');
});

test('Home Skills: leaking hose and caulk exercises explain safe stop conditions',async({page})=>{
 await page.setViewportSize({width:320,height:780});
 await page.goto(url);
 await page.getByRole('button',{name:'Caulk joint',exact:true}).click();
 const caulk=page.locator('#skill-10');
 await expect(caulk).toHaveAttribute('open','');
 await caulk.locator('button[data-answer="0"]').click();
 await expect(caulk.locator('.check-feedback')).toContainText('Not quite.');
 await caulk.locator('button[data-answer="2"]').click();
 await expect(caulk.locator('.check-feedback')).toContainText('Good reasoning.');
 await page.locator('#search').fill('a-term-that-does-not-match');
 await page.locator('button[data-area="Kitchen"]').click();
 await page.getByRole('button',{name:'Garden hose washer',exact:true}).click();
 const hose=page.locator('#skill-23');
 await expect(hose).toHaveAttribute('open','');
 await expect(page.locator('#search')).toHaveValue('');
 await expect(page.locator('button[data-area="all"]')).toHaveAttribute('aria-pressed','true');
 await hose.locator('button[data-answer="0"]').click();
 await expect(hose.locator('.check-feedback')).toContainText('Good reasoning.');
 const layout=await page.evaluate(()=>({vp:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,local:localStorage.length,session:sessionStorage.length}));
 expect(layout.scroll).toBeLessThanOrEqual(layout.vp+1);expect(layout.local).toBe(0);expect(layout.session).toBe(0);
});


test('Home Skills: twenty original diagrams and non-scored checks cover four domains',async({page})=>{
 await page.goto(url);
 await expect(page.locator('details.skill')).toHaveCount(36);
 await expect(page.locator('.skill-visual')).toHaveCount(36);
 await expect(page.locator('.skill-check')).toHaveCount(36);
 await expect(page.locator('.visual-actions button')).toHaveCount(36);
 await expect(page.locator('[data-show-skill]')).toHaveCount(49);
 const expected=[2,5,20,26];
 for(const id of expected){
  const card=page.locator('#skill-'+id);
  await expect(card.locator('svg[role="img"] title')).not.toBeEmpty();
  await expect(card.locator('svg[role="img"] desc')).not.toBeEmpty();
  await expect(card.locator('.skill-check button')).toHaveCount(3);
  await expect(card.locator('.lesson-why')).toHaveCount(1);
  await expect(card.locator('.lesson-pitfall')).toHaveCount(1);
 }
 await expect(page.locator('#skill-2 a.reference')).toHaveAttribute('href','https://www.energystar.gov/products/refrigerators');
 await expect(page.locator('#skill-5 a.reference')).toHaveAttribute('href',/contentId=18983/);
 await expect(page.locator('#skill-20 a.reference')).toHaveAttribute('href','https://www.energystar.gov/products/smart_thermostats');
 await expect(page.locator('#skill-26 a.reference')).toHaveAttribute('href',/CPSC-Issues-Safety-Tips-For-Rotary-Power-Mowers/);
});
test('Home Skills: charcoal-filter and mower safety teach no-exposure decisions',async({page})=>{
 await page.setViewportSize({width:320,height:780});
 await page.goto(url);
 await page.locator('#search').fill('filter');
 await page.locator('button[data-area="Know Your Limits"]').click();
 await page.getByRole('button',{name:'Range-hood filters',exact:true}).click();
 const hood=page.locator('#skill-5');
 await expect(hood).toHaveAttribute('open','');
 await hood.locator('.skill-check button').nth(1).click();
 await expect(hood.locator('.check-feedback')).toContainText('Not quite.');
 await hood.locator('.skill-check button').nth(0).click();
 await expect(hood.locator('.check-feedback')).toContainText('Good reasoning.');
 await page.getByRole('button',{name:'Mower safety',exact:true}).click();
 const mower=page.locator('#skill-26');
 await expect(mower).toHaveAttribute('open','');
 await mower.locator('.skill-check button').nth(1).click();
 await expect(mower.locator('.check-feedback')).toContainText('Good reasoning.');
 const size=await page.evaluate(()=>({vp:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,local:localStorage.length,session:sessionStorage.length}));
 expect(size.scroll).toBeLessThanOrEqual(size.vp+1);
 expect(size.local).toBe(0);expect(size.session).toBe(0);
});
test('Home Skills: thermostat and refrigerator images enlarge without page overflow',async({page})=>{
 await page.setViewportSize({width:320,height:760});await page.goto(url);
 for(const [id,name] of [[20,'Thermostat schedules'],[2,'Fridge door seals']]){
  await page.getByRole('button',{name,exact:true}).click();
  const visual=page.locator('#skill-'+id+' .skill-visual');
  await visual.getByRole('button',{name:'Enlarge diagram'}).click();
  await expect(visual).toHaveAttribute('data-zoom','true');
  await visual.getByRole('button',{name:'Fit diagram to screen'}).click();
  await expect(visual).toHaveAttribute('data-zoom','false');
 }
 const width=await page.evaluate(()=>({vp:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
 expect(width.scroll).toBeLessThanOrEqual(width.vp+1);
});


test('Home Skills: 28 independent diagrams and 28 practice explanations cover safety and upkeep',async({page})=>{
 await page.goto(url);
 await expect(page.locator('details.skill')).toHaveCount(36);
 await expect(page.locator('.skill-visual')).toHaveCount(36);
 await expect(page.locator('.skill-check')).toHaveCount(36);
 await expect(page.locator('.visual-actions button')).toHaveCount(36);
 await expect(page.locator('[data-show-skill]')).toHaveCount(49);
 const ids=[1,3,14,17,21,25,29,30];
 for(const id of ids){
  const lesson=page.locator('#skill-'+id);
  await expect(lesson.locator('svg[role="img"] title')).not.toBeEmpty();
  await expect(lesson.locator('svg[role="img"] desc')).not.toBeEmpty();
  await expect(lesson.locator('.skill-check button')).toHaveCount(3);
  await expect(lesson.locator('.lesson-why')).toHaveCount(1);
  await expect(lesson.locator('.lesson-pitfall')).toHaveCount(1);
 }
 await expect(page.locator('#skill-3 a.reference')).toHaveAttribute('href','https://www.energystar.gov/products/refrigerators');
 await expect(page.locator('#skill-30 a.reference')).toHaveAttribute('href','https://www.cdc.gov/prepare-your-health/take-action/personal-needs.html');
});

test('Home Skills: CO evacuation and lead-dust questions correct unsafe choices at 320px',async({page})=>{
 await page.setViewportSize({width:320,height:780});
 await page.goto(url);
 await page.locator('#search').fill('no-matching-topic');
 await page.locator('button[data-area="Kitchen"]').click();
 await page.getByRole('button',{name:'CO alarm safety',exact:true}).click();
 await expect(page.locator('#search')).toHaveValue('');
 await expect(page.locator('#skill-29')).toHaveAttribute('open','');
 await page.locator('#skill-29 .skill-check button').first().click();
 await expect(page.locator('#skill-29 .check-feedback')).toContainText('Not quite.');
 await page.locator('#skill-29 .skill-check button').nth(1).click();
 await expect(page.locator('#skill-29 .check-feedback')).toContainText('Good reasoning.');
 await page.getByRole('button',{name:'Drywall nail holes',exact:true}).click();
 await page.locator('#skill-17 .skill-check button').nth(1).click();
 await expect(page.locator('#skill-17 .check-feedback')).toContainText('Good reasoning.');
 const state=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,local:localStorage.length,session:sessionStorage.length}));
 expect(state.scroll).toBeLessThanOrEqual(state.client+1);
 expect(state.local).toBe(0);expect(state.session).toBe(0);
});

test('Home Skills: all 36 visual shortcuts navigate to matching distinct lessons',async({page})=>{
 await page.goto(url);
 const buttons=page.locator('.visual-actions button[data-show-skill]');
 const ids=await buttons.evaluateAll(nodes=>nodes.map(n=>n.getAttribute('data-show-skill')));
 expect(ids.length).toBe(36);expect(new Set(ids).size).toBe(36);
 for(const id of ids){
  const card=page.locator('#skill-'+id);
  await expect(card).toHaveCount(1);
  await expect(card.locator('figure.skill-visual')).toHaveCount(1);
  await expect(card.locator('section.skill-check')).toHaveCount(1);
 }
 await page.setViewportSize({width:320,height:780});
 await page.getByRole('button',{name:'Fridge coils',exact:true}).click();
 const fig=page.locator('#skill-3 .skill-visual');
 await expect(fig).toBeVisible();
 await fig.getByRole('button',{name:'Enlarge diagram'}).click();
 await expect(fig).toHaveAttribute('data-zoom','true');
 await fig.getByRole('button',{name:'Fit diagram to screen'}).click();
 await expect(fig).toHaveAttribute('data-zoom','false');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
});


test('Home Skills: all 36 lessons have distinct diagrams, explanations and stop guidance',async({page})=>{
 await page.goto(url);
 const cards=page.locator('details.skill');
 await expect(cards).toHaveCount(36);
 await expect(page.locator('.skill-visual')).toHaveCount(36);
 await expect(page.locator('.skill-check')).toHaveCount(36);
 await expect(page.locator('.visual-actions button')).toHaveCount(36);
 await expect(page.locator('[data-show-skill]')).toHaveCount(49);
 const figureIds=await page.locator('.skill-visual svg title').evaluateAll(nodes=>nodes.map(n=>n.id));
 expect(new Set(figureIds).size).toBe(36);
 for(let id=1;id<=36;id++){
  const card=page.locator('#skill-'+id);
  await expect(card.locator('.skill-visual svg[role="img"] title')).not.toBeEmpty();
  await expect(card.locator('.skill-visual svg[role="img"] desc')).not.toBeEmpty();
  await expect(card.locator('.skill-check button[data-answer]')).toHaveCount(3);
  await expect(card.locator('.lesson-why')).toHaveCount(1);
  await expect(card.locator('.lesson-pitfall')).toHaveCount(1);
  await expect(card.locator('.stop')).toHaveCount(1);
 }
});
test('Home Skills: hazardous repair lessons reinforce no-DIY stop boundaries',async({page})=>{
 await page.goto(url);
 for(const id of [32,33,34,35,36]){
  const card=page.locator('#skill-'+id);
  await expect(card.locator('summary .tier.expert')).toContainText('Expert needed');
  await expect(card.locator('h3')).toContainText('Recognize the hazard');
  await expect(card.locator('.stop')).not.toBeEmpty();
  const correct=card.locator('.skill-check button[data-correct="true"]');
  await expect(correct).toHaveCount(1);
 }
 await page.setViewportSize({width:320,height:780});
 await page.getByRole('button',{name:'Gas emergency',exact:true}).click();
 await expect(page.locator('#skill-33')).toHaveAttribute('open','');
 await page.locator('#skill-33 .skill-check button').nth(0).click();
 await expect(page.locator('#skill-33 .check-feedback')).toContainText('Not quite.');
 await page.locator('#skill-33 .skill-check button').nth(1).click();
 await expect(page.locator('#skill-33 .check-feedback')).toContainText('Good reasoning.');
 const width=await page.evaluate(()=>({vp:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,local:localStorage.length,session:sessionStorage.length}));
 expect(width.scroll).toBeLessThanOrEqual(width.vp+1);expect(width.local).toBe(0);expect(width.session).toBe(0);
});
test('Home Skills: all visual shortcuts target one real illustrated lesson',async({page})=>{
 await page.goto(url);
 const ids=await page.locator('.visual-actions button[data-show-skill]').evaluateAll(ns=>ns.map(n=>n.dataset.showSkill));
 expect(ids).toHaveLength(36);expect(new Set(ids).size).toBe(36);
 for(const id of ids){await expect(page.locator('#skill-'+id+' figure.skill-visual')).toHaveCount(1);}
 await page.setViewportSize({width:320,height:780});
 await page.locator('#search').fill('unrelated-no-result');
 await page.locator('button[data-area="Kitchen"]').click();
 await page.getByRole('button',{name:'Structural and spring',exact:true}).click();
 await expect(page.locator('#search')).toHaveValue('');
 await expect(page.locator('#skill-36')).toHaveAttribute('open','');
 const zoom=page.locator('#skill-36 figure.skill-visual');
 await zoom.getByRole('button',{name:'Enlarge diagram'}).click();
 await expect(zoom).toHaveAttribute('data-zoom','true');
 await zoom.getByRole('button',{name:'Fit diagram to screen'}).click();
 await expect(zoom).toHaveAttribute('data-zoom','false');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
});


test('Home Skills: searchable, ordered and scroll-contained picture shortcuts at 320px',async({page})=>{
 await page.setViewportSize({width:320,height:780});
 await page.goto(url);
 const visual=page.locator('.visual-starters');
 const items=visual.locator('.visual-actions button[data-show-skill]');
 await expect(items).toHaveCount(36);
 const order=await items.evaluateAll(ns=>ns.map(n=>Number(n.dataset.showSkill)));
 expect(order).toEqual(Array.from({length:36},(_,i)=>i+1));
 const content=await page.locator('.visual-actions').evaluate(n=>({visible:n.clientHeight,total:n.scrollHeight}));
 expect(content.total).toBeGreaterThan(content.visible);
 await page.locator('#visual-search').fill('carbon monoxide');
 await expect(visual.locator('#visual-count')).toContainText('1 of 36');
 await expect(items.filter({visible:true})).toHaveCount(1);
 await page.getByRole('button',{name:'CO alarm safety',exact:true}).click();
 await expect(page.locator('#skill-29')).toHaveAttribute('open','');
 await page.locator('#visual-search').fill('no-example-by-this-name');
 await expect(visual.locator('#visual-count')).toContainText('No picture lessons found');
 await page.getByRole('button',{name:'Clear picture search'}).click();
 await expect(page.locator('#visual-search')).toHaveValue('');
 await expect(items.filter({visible:true})).toHaveCount(36);
 await page.locator('#visual-search').fill('kitchen');
 await expect(items.filter({visible:true})).toHaveCount(5);
 const width=await page.evaluate(()=>({vp:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,local:localStorage.length,session:sessionStorage.length}));
 expect(width.scroll).toBeLessThanOrEqual(width.vp+1);
 expect(width.local).toBe(0);expect(width.session).toBe(0);
});


test('Home Skills: focus reading is default, with explicit compare option',async({page})=>{
 await page.setViewportSize({width:1366,height:860});await page.goto(url);
 const compare=page.locator('#compare-lessons'),catalog=page.locator('#catalog');
 await expect(compare).not.toBeChecked();
 await page.locator('#skill-1 summary').click();
 await expect(page.locator('#skill-1')).toHaveAttribute('open','');
 await expect(page.locator('#skill-1')).toHaveCSS('grid-column-start','1');
 await page.locator('#skill-2 summary').click();
 await expect(page.locator('#skill-1')).not.toHaveAttribute('open','');
 await expect(page.locator('#skill-2')).toHaveAttribute('open','');
 await expect(page.locator('#open-count')).toHaveText('1 lesson open');
 await compare.check();
 await expect(catalog).toHaveClass(/compare-mode/);
 await page.locator('#skill-1 summary').click();
 await expect(page.locator('#open-count')).toHaveText('2 lessons open');
 await compare.uncheck();
 await expect(catalog).not.toHaveClass(/compare-mode/);
 await expect(page.locator('details.skill[open]')).toHaveCount(1);
 await page.getByRole('button',{name:'Close open lessons'}).click();
 await expect(page.locator('#open-count')).toHaveText('No lessons open');
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
});

test('Home Skills: focused reading, diagrams and references avoid redundant notices at 320px',async({page})=>{
 await page.setViewportSize({width:320,height:800});await page.goto(url);
 await expect(page.locator('p.source-note')).toHaveCount(0);
 await expect(page.locator('a.reference')).toHaveCount(36);
 await expect(page.locator('.warning').first()).toContainText('not proof');
 await page.locator('#skill-9 summary').click();
 await expect(page.locator('#skill-9')).toHaveAttribute('open','');
 await page.locator('#skill-10 summary').click();
 await expect(page.locator('#skill-9')).not.toHaveAttribute('open','');
 await expect(page.locator('#skill-10')).toHaveAttribute('open','');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
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
