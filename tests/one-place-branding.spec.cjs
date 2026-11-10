const { test, expect } = require('@playwright/test');

// OP-104 v4 preserves all 18 original area routes and 72 service paths
// while moving discovery, TEAL, team and public record links to honest destinations.
for (const width of [1366, 320]) {
 test('ONE PLACE v4: 18 original areas and 72 solutions remain usable at '+width+'px',async({page})=>{
  test.setTimeout(120000);
  await page.setViewportSize({width,height:844});
  const errors=[], failures=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(new URL(r.url()).origin==='http://127.0.0.1:8765'&&r.status()>=400)failures.push(r.url())});
  await page.goto('/');
  await expect(page).toHaveTitle(/^ONE PLACE/);
  await expect(page.getByRole('heading',{name:'Explore every part of life'})).toBeVisible();
  await expect(page.locator('.grid > a.tile')).toHaveCount(21);
  await expect(page.locator('.grid > .tile.pending')).toHaveCount(3);
  const areas=await page.locator('.grid > a.tile[href*="?area="]').evaluateAll(els=>els.map(el=>el.getAttribute('href')));
  expect(areas).toHaveLength(18);
  const solutions=[];
  for(const area of areas){
   await page.goto('/'+area);
   await expect(page.locator('.offers > a.offer')).toHaveCount(4);
   solutions.push(...await page.locator('.offers > a.offer').evaluateAll(els=>els.map(el=>el.getAttribute('href'))));
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  expect(new Set(solutions).size).toBe(72);
  for(const solution of solutions){
   await page.goto('/'+solution);
   await expect(page.getByRole('heading',{level:1})).toBeVisible();
   await expect(page.getByRole('link',{name:'One Place home',exact:true})).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  expect(errors).toEqual([]);expect(failures).toEqual([]);
 });

 test('ONE PLACE v4: learning cards and About navigation work at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:844});
  const cards=[['Human Literacy',/\/human-literacy\/$/],['Our Humanity',/\/one-place\/our-humanity\.html$/],['Life Simulator',/\/simulator\/01\/$/]];
  for(const [name,url] of cards){
   await page.goto('/');
   await page.locator('.grid > a.new-card').filter({hasText:name}).click();
   await expect(page).toHaveURL(url);
   await expect(page.getByRole('heading',{level:1})).toBeVisible();
  }
  await page.goto('/');
  await page.locator('.op4-menu summary').click();
  await page.getByRole('navigation',{name:'About ONE PLACE'}).getByRole('link',{name:'TEAL Philosophy'}).click();
  await expect(page).toHaveURL(/index\.html\?about#teal-philosophy$/);
  await expect(page.locator('#teal-philosophy')).toContainText('Trinity Equals Amazing Love');
  await expect(page.locator('#version')).toContainText('Homepage version 4.2.0');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 });
}

test('ONE PLACE: legacy catalog queries and learning bookmarks keep destinations',async({page})=>{
 for(const query of ['?area=Money%20%26%20Bills','?service=s001','?team','?impact']){
  await page.goto('/one-place/index.html'+query);
  await expect(page).toHaveURL('http://127.0.0.1:8765/index.html'+query);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
 }
 await page.goto('/#choose');
 await expect(page).toHaveURL(/\/human-literacy\/index\.html#choose$/);
 await expect(page.getByRole('heading',{name:'Choose a lesson'})).toBeFocused();
 await expect(page.getByRole('link',{name:/^Start Lesson \d{2}$/})).toHaveCount(10);
});

test('ONE PLACE: every lesson returns home and to library',async({page})=>{
 for(let i=1;i<=10;i++){
  await page.goto('/lessons/'+String(i).padStart(2,'0')+'/');
  await expect(page).toHaveTitle(/ONE PLACE/);
  const nav=page.getByRole('navigation',{name:'One Place and lessons'});
  await nav.getByRole('link',{name:'All Lessons',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Choose a lesson'})).toBeVisible();
  await page.getByRole('link',{name:'← One Place Home',exact:true}).click();
  await expect(page).toHaveTitle(/^ONE PLACE/);
 }
});

test('ONE PLACE v4: keyboard skip and category card reach useful content',async({page})=>{
 await page.goto('/');
 await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Skip to content',exact:true})).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.locator('main')).toBeFocused();
 await page.locator('.grid > a.tile').first().focus();
 await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/area=Money/);
 await expect(page.getByRole('heading',{level:1})).toBeVisible();
});

test('ONE PLACE: fictional tool edits remain local, no tracking or accounts',async({page})=>{
 const outbound=[],writes=[];
 page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:8765/')&&!r.url().startsWith('blob:'))outbound.push(r.url());if(!['GET','HEAD'].includes(r.method()))writes.push(r.url())});
 await page.goto('/');
 await expect(page.locator('input[type=password],input[type=email]')).toHaveCount(0);
 await page.locator('.grid > a.tile').first().click();
 await page.locator('[data-money-pilot-link]').click();
 await page.locator('#sample').click();
 await page.locator('#cash').fill('450');
 await page.locator('#tab-plan').click();
 await expect(page.locator('#panel-plan')).toBeVisible();
 await page.getByRole('link',{name:'One Place Home',exact:true}).click();
 await page.locator('.grid > a.tile').nth(2).click();
 await page.locator('[data-care-pilot-link]').click();
 await page.locator('#sample').click();
 await page.getByRole('tab',{name:'1. Household',exact:true}).click();
 await page.locator('#person').fill('Fictional person');
 expect(await page.evaluate(()=>Object.keys(localStorage))).toEqual([]);
 expect(outbound).toEqual([]);expect(writes).toEqual([]);
});

for(const prefix of ['Human-literacy-online','One-Place']){
 test('ONE PLACE v4: relative destinations survive project prefix '+prefix,async({page})=>{
  const mount='/'+prefix+'/';
  await page.route('http://127.0.0.1:8765/**',route=>{
   const url=new URL(route.request().url());
   if(url.pathname.startsWith(mount)){url.pathname='/'+url.pathname.slice(mount.length);return route.continue({url:url.href})}
   return route.abort();
  });
  await page.goto(mount);
  await page.locator('.grid > a.new-card').filter({hasText:'Human Literacy'}).click();
  await expect(page).toHaveURL(new RegExp(mount+'human-literacy/'));
  await page.getByRole('link',{name:'Start Lesson 01',exact:true}).click();
  await expect(page).toHaveURL(new RegExp(mount+'lessons/01/'));
  await page.getByRole('navigation',{name:'One Place and lessons'}).getByRole('link',{name:'One Place Home',exact:true}).click();
  await expect(page).toHaveURL(new RegExp(mount+'index\\.html$'));
  await page.locator('.grid > a.tile').first().click();
  await page.locator('[data-money-pilot-link]').click();
  await expect(page).toHaveURL(new RegExp(mount+'one-place/money-bills\\.html$'));
 });
}

test('ONE PLACE v4: public story and update information are honest',async({page})=>{
 await page.goto('/index.html?about#story');
 await expect(page.locator('#story')).toContainText('Human Literacy and TEAL');
 await expect(page.locator('#team')).toContainText('one human founder');
 await expect(page.locator('#version')).toContainText('November 9, 2026');
 await expect(page.locator('#record')).toContainText('Unknown numbers are not zero');
});
