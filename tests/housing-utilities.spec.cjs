const { test, expect } = require('@playwright/test');
const guide = '/one-place/housing-utilities.html';

test('Housing & Utilities: four catalog offerings lead to actual, free experiences',async({page})=>{
  const errs=[];page.on('pageerror',e=>errs.push(e.message));
  await page.goto('/index.html?area=Housing%20%26%20Utilities');
  await expect(page.getByRole('heading',{level:1,name:'Housing & Utilities',exact:true})).toBeVisible();
  await expect(page.getByRole('heading',{name:/Our own free action kit/})).toHaveCount(0);
  const offers=page.locator('.offer');
  await expect(offers).toHaveCount(4);
  const paths=['assist','safety','maintenance','plan'];
  for(let i=0;i<4;i++){
    await expect(offers.nth(i)).toHaveAttribute('href','one-place/housing-utilities.html#'+paths[i]);
  }
  await expect(page.getByText('FUTURE SERVICE')).toHaveCount(0);
  await offers.nth(0).click();
  await expect(page).toHaveURL(/\/one-place\/housing-utilities\.html#assist$/);
  await expect(page.getByRole('heading',{name:/A safer home/})).toBeVisible();
  await page.getByRole('link',{name:'Housing & Utilities',exact:true}).first().click();
  await expect(page).toHaveURL(/\/index\.html\?area=Housing%20%26%20Utilities$/);
  expect(errs).toEqual([]);
});

test('Housing & Utilities: old four service URLs resolve to their new working views',async({page})=>{
  for(const [id,anchor] of [['s005','assist'],['s006','safety'],['s007','maintenance'],['s008','plan']]){
    await page.goto('/index.html?service='+id);
    await expect(page).toHaveURL(new RegExp('/one-place/housing-utilities\\.html#'+anchor+'$'));
  }
});

test('Housing & Utilities: homepage category finds the implemented maintenance planner',async({page})=>{
 await page.goto('/index.html');
 await page.locator('.grid > a.tile').nth(1).click();
 await expect(page.getByRole('heading',{level:1,name:'Housing & Utilities'})).toBeVisible();
 await page.getByRole('link',{name:/Home Maintenance Planner/}).click();
 await expect(page).toHaveURL(/\/one-place\/housing-utilities\.html#maintenance$/);
});

test('Housing & Utilities: five situations show distinct guidance, sources, and uncertainty',async({page})=>{
  const errs=[];page.on('pageerror',e=>errs.push(e.message));
  await page.goto(guide);
  const buttons=page.locator('#scenario-buttons button');
  await expect(buttons).toHaveCount(5);
  await expect(buttons.nth(0)).toHaveAttribute('aria-pressed','true');
  const expected=[
    ['rent','Behind on rent or facing eviction','Eviction laws and deadlines'],
    ['utilities','Utility bill or shutoff concerns','Do not assume a shutoff'],
    ['shelter','I need somewhere safe to stay','no real-time bed availability'],
    ['repair','Home repairs or unsafe conditions','Do not withhold rent'],
    ['search','Looking for affordable housing','program availability varies']
  ];
  for(const [key,title,caution] of expected){
    const b=page.locator('button[data-scenario="'+key+'"]');
    await b.click();
    await expect(b).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('#scenario-title')).toHaveText(title);
    await expect(page.locator('#scenario-steps li')).toHaveCount(3);
    await expect(page.locator('#scenario-caution')).toContainText(caution,{ignoreCase:true});
    await expect(page.locator('#scenario-resources a')).toHaveCount(key==='rent'?3:2);
    await expect(page.locator('#scenario-script')).not.toBeEmpty();
  }
  await page.locator('button[data-scenario="shelter"]').click();
  await expect(page.locator('#scenario-resources a').first()).toHaveAttribute('href','https://www.hud.gov/FindShelter');
  await expect(page.getByText('Some sites may show donation or sign-in requests',{exact:false})).toBeVisible();
  await expect(buttons.nth(0)).toHaveAttribute('aria-pressed','false');
  expect(errs).toEqual([]);
});

test('Housing & Utilities: generated plans use scenario-specific sources',async({page})=>{
  await page.goto(guide);
  await page.locator('button[data-scenario="shelter"]').click();
  await page.getByRole('button',{name:'Make my next-step plan'}).click();
  await expect(page.locator('#plan-text')).toHaveValue(/https:\/\/www\.hud\.gov\/FindShelter/);
  await expect(page.locator('#plan-text')).not.toHaveValue(/https:\/\/www\.usa\.gov\/home-repair-programs/);
  await page.locator('button[data-scenario="repair"]').click();
  await expect(page.locator('#plan-stale')).toBeVisible();
  await page.getByRole('button',{name:'Make my next-step plan'}).click();
  await expect(page.locator('#plan-text')).toHaveValue(/https:\/\/www\.usa\.gov\/home-repair-programs/);
  await expect(page.locator('#plan-text')).not.toHaveValue(/https:\/\/www\.hud\.gov\/FindShelter/);
});

test('Housing & Utilities: safety checklist counts only reviewed items',async({page})=>{
  await page.goto(guide);
  const count=page.locator('#safety-count');
  await expect(count).toHaveText('0 of 5 items reviewed');
  await page.locator('#safe1').check();
  await page.locator('#safe4').check();
  await expect(count).toHaveText('2 of 5 items reviewed');
  await page.locator('#safe1').uncheck();
  await expect(count).toHaveText('1 of 5 items reviewed');
  await expect(page.getByText('Never run generators',{exact:false})).toBeVisible();
});

test('Housing & Utilities: edit, add, remove, and reset maintenance tasks',async({page})=>{
  await page.goto(guide);
  const rows=page.locator('#task-list .taskrow');
  await expect(rows).toHaveCount(3);
  const ids=await page.locator('#task-list input').evaluateAll(nodes=>nodes.map(x=>x.id));
  expect(new Set(ids).size).toBe(ids.length);
  await rows.first().locator('input').first().fill('Fictional smoke-alarm task');
  await page.getByRole('button',{name:'Add task'}).click();
  await expect(rows).toHaveCount(4);
  await rows.last().locator('input').first().fill('Check fictional window seal');
  await rows.last().locator('input').nth(1).fill('Every season');
  await rows.last().getByRole('button',{name:/Remove maintenance task/}).click();
  await expect(rows).toHaveCount(3);
  await page.getByRole('button',{name:'Restore example tasks'}).click();
  await expect(rows).toHaveCount(3);
  await expect(rows.first().locator('input').first()).toHaveValue('Test smoke alarms');
});

test('Housing & Utilities: save and reopen maintenance tasks on another visit without a server',async({page})=>{
  await page.goto(guide);
  const rows=page.locator('#task-list .taskrow');
  await rows.first().locator('input').first().fill('Fictional annual window review');
  await rows.first().locator('input').nth(1).fill('Yearly');
  const [file]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Save task list'}).click()]);
  expect(file.suggestedFilename()).toBe('one-place-housing-maintenance-list.json');
  const reader=await file.createReadStream(),chunks=[];
  for await(const part of reader)chunks.push(part);
  const payload=Buffer.concat(chunks).toString('utf8');
  const saved=JSON.parse(payload);
  expect(saved.format).toBe('one-place-housing-maintenance-v1');
  expect(saved.tasks[0]).toEqual({task:'Fictional annual window review',when:'Yearly'});

  await page.reload();
  await expect(rows.first().locator('input').first()).toHaveValue('Test smoke alarms');
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('#task-open').setInputFiles({name:'my-tasks.json',mimeType:'application/json',buffer:Buffer.from(payload)});
  await expect(rows.first().locator('input').first()).toHaveValue('Fictional annual window review');
  await expect(rows.first().locator('input').nth(1)).toHaveValue('Yearly');
  await expect(page.locator('#task-status')).toContainText('Nothing was uploaded');

  await page.locator('#task-open').setInputFiles({name:'wrong.json',mimeType:'application/json',
    buffer:Buffer.from('{"format":"wrong","tasks":[]}')});
  await expect(page.locator('#task-status')).toContainText('existing tasks were preserved');
  await expect(rows.first().locator('input').first()).toHaveValue('Fictional annual window review');
});

test('Housing & Utilities: editable plan and safe TXT export preserve user changes',async({page})=>{
  const errs=[];page.on('pageerror',e=>errs.push(e.message));
  await page.goto(guide);
  await page.locator('button[data-scenario="utilities"]').click();
  await page.locator('#safe1').check();
  const rows=page.locator('#task-list .taskrow');
  await rows.first().locator('input').first().fill('Fictional air-filter review');
  await page.getByRole('button',{name:'Make my next-step plan'}).click();
  const plan=page.locator('#plan-text');
  await expect(plan).toHaveValue(/Utility bill or shutoff concerns/);
  await expect(plan).toHaveValue(/https:\/\/www\.usa\.gov\/help-with-energy-bills/);
  await expect(plan).not.toHaveValue(/https:\/\/www\.usa\.gov\/home-repair-programs/);
  await expect(plan).toHaveValue(/1 of 5 checklist items reviewed/);
  await expect(plan).toHaveValue(/Fictional air-filter review/);
  await plan.fill('My edited fictional next action\nCall a verified provider.');
  const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Download TXT'}).click()]);
  expect(download.suggestedFilename()).toBe('one-place-housing-next-step-plan.txt');
  const stream=await download.createReadStream(),chunks=[];
  for await (const piece of stream)chunks.push(piece);
  expect(Buffer.concat(chunks).toString('utf8')).toBe('My edited fictional next action\nCall a verified provider.');
  await page.getByRole('button',{name:'Clear plan'}).click();
  await expect(plan).toHaveValue('');
  await expect(page.getByRole('button',{name:'Download TXT'})).toBeDisabled();
  await expect(page.getByRole('button',{name:'Print'})).toBeDisabled();
  expect(errs).toEqual([]);
});

test('Housing & Utilities: changing inputs warns that the plan needs refreshing and protects edits',async({page})=>{
  await page.goto(guide);
  await page.getByRole('button',{name:'Make my next-step plan'}).click();
  const plan=page.locator('#plan-text'),notice=page.locator('#plan-stale');
  await expect(notice).toBeHidden();
  await page.locator('#task-list .taskrow').first().locator('input').first().fill('Fictional updated task');
  await expect(notice).toBeVisible();
  await expect(plan).not.toHaveValue(/Fictional updated task/);
  await page.getByRole('button',{name:'Make my next-step plan'}).click();
  await expect(plan).toHaveValue(/Fictional updated task/);
  await expect(notice).toBeHidden();

  await plan.fill('Important fictional manual edits to protect');
  await page.locator('button[data-scenario="repair"]').click();
  await expect(notice).toBeVisible();
  page.once('dialog',dialog=>dialog.dismiss());
  await page.getByRole('button',{name:'Make my next-step plan'}).click();
  await expect(plan).toHaveValue('Important fictional manual edits to protect');
  page.once('dialog',dialog=>dialog.accept());
  await page.getByRole('button',{name:'Make my next-step plan'}).click();
  await expect(plan).toHaveValue(/Home repairs or unsafe conditions/);
  await expect(notice).toBeHidden();
  await page.getByRole('button',{name:'Clear plan'}).click();
  await expect(notice).toBeHidden();
});

test('Housing & Utilities: print the edited plan, not the whole workspace',async({page})=>{
  await page.goto(guide);
  await page.getByRole('button',{name:'Make my next-step plan'}).click();
  await page.locator('#plan-text').fill('Fictional edited print plan');
  await page.evaluate(()=>{window.__printed=0;window.print=()=>{window.__printed++}});
  await page.getByRole('button',{name:'Print'}).click();
  await expect(page.locator('#print-copy')).toHaveText('Fictional edited print plan');
  expect(await page.evaluate(()=>window.__printed)).toBe(1);
});

for(const width of [320,390,768,1366]){
 test('Housing & Utilities: no sideways overflow at '+width+' pixels',async({page})=>{
  await page.setViewportSize({width,height:780});
  await page.goto(guide);
  await expect(page.getByRole('heading',{name:/A safer home/})).toBeVisible();
  const dims=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
  expect(dims.page).toBeLessThanOrEqual(dims.viewport+1);
  await expect(page.locator('#assist')).toBeAttached();
  await expect(page.locator('#safety')).toBeAttached();
  await expect(page.locator('#maintenance')).toBeAttached();
  await expect(page.locator('#plan')).toBeAttached();
 });
}

test('Housing & Utilities: no tracking, third-party requests, or browser storage',async({page})=>{
  const urls=[];page.on('request',r=>urls.push(r.url()));
  await page.goto(guide);
  await page.locator('button[data-scenario="repair"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#scenario-title')).toHaveText('Home repairs or unsafe conditions');
  await page.getByRole('button',{name:'Make my next-step plan'}).click();
  expect(urls.every(url=>new URL(url).hostname==='127.0.0.1')).toBeTruthy();
  expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
  await expect(page.locator('#scenario-resources a').first()).toHaveAttribute('rel','noopener noreferrer');
});


test('Housing seasonal presets append safe editable tasks without replacing existing work',async({page})=>{
 await page.setViewportSize({width:320,height:780});
 await page.goto('/one-place/housing-utilities.html#maintenance');
 const rows=page.locator('#task-list .taskrow');
 await expect(rows).toHaveCount(3);
 await rows.first().locator('input').first().fill('My custom task');
 await page.getByRole('button',{name:'Spring checks'}).click();
 await expect(rows).toHaveCount(6);
 await expect(rows.first().locator('input').first()).toHaveValue('My custom task');
 await expect(page.locator('#season-status')).toContainText('3 spring tasks added');
 await page.getByRole('button',{name:'Spring checks'}).click();
 await expect(rows).toHaveCount(6);
 await expect(page.locator('#season-status')).toContainText('0 spring tasks added');
 await page.getByRole('button',{name:'Fall checks'}).click();
 await expect(rows).toHaveCount(9);
 await page.getByRole('button',{name:'Winter checks'}).click();
 await expect(rows).toHaveCount(12);
 await page.getByRole('button',{name:'Summer checks'}).click();
 await expect(rows).toHaveCount(12);
 await expect(page.locator('#season-status')).toContainText('12-task limit reached');
 await expect(page).not.toHaveURL(/index\.html/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)).toBe(true);
 await page.getByRole('button',{name:'Restore example tasks'}).click();
 await expect(rows).toHaveCount(3);
});
