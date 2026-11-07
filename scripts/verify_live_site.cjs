// Authorized migration smoke tests against the actual public organization website.
// Fictional inputs only. No sign-in, voice, external-resource visits or server writes.
'use strict';
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const origin = 'https://ouroneplace.github.io';
const output = 'live-site-report';
fs.mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'chromium'});
 const result={origin,source_sha:process.env.GITHUB_SHA||'unknown',checked:new Date().toISOString(),widths:[],errors:[]};
 try {
  for(const width of [1366,320]) {
   const context=await browser.newContext({viewport:{width,height:844}});
   const page=await context.newPage();const errors=[],missing=[],outbound=[],writes=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{const u=new URL(r.url());if(u.origin===origin&&r.status()>=400&&u.pathname!=='/favicon.ico')missing.push(r.status()+' '+r.url());});
   page.on('request',r=>{if(!r.url().startsWith(origin+'/')&&!r.url().startsWith('data:')&&!r.url().startsWith('blob:'))outbound.push(r.url());if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());});
   async function visible(locator){await locator.waitFor({state:'visible',timeout:15000});}
   async function goto(path){const r=await page.goto(origin+path,{waitUntil:'domcontentloaded'});assert.ok(r&&r.ok(),path);await visible(page.locator('h1').first());}
   async function reflow(){assert.ok(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)<=innerWidth+1),'Horizontal overflow at '+page.url()+' width '+width);}
   await goto('/');assert.match(await page.title(),/^ONE PLACE/);
   assert.equal(await page.locator('.grid > a.tile').count(),18);await reflow();
   await page.screenshot({path:output+'/one-place-'+width+'.png',fullPage:true});
   const areas=await page.locator('.grid > a.tile').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
   const solutions=[];
   for(const route of areas){await goto('/'+route);assert.equal(await page.locator('.offers > a.offer').count(),4);solutions.push(...await page.locator('.offers > a.offer').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href'))));await reflow();}
   assert.equal(new Set(solutions).size,72);
   for(const route of solutions){await goto('/'+route);await reflow();}
   for(let n=1;n<=10;n++){
    await goto('/lessons/'+String(n).padStart(2,'0')+'/');await reflow();
    assert.equal(await page.getByRole('navigation',{name:'One Place and lessons'}).count(),1);
    await page.getByRole('link',{name:'One Place Home',exact:true}).click();
    await visible(page.getByRole('heading',{name:'Explore every part of life',exact:true}));
   }
   for(const [name,path] of [['Life Simulator','/simulator/01/'],['TEAL foundation (draft)','/teal/'],['Learning home','/human-literacy/'],['Money & Bills','/one-place/money-bills.html'],['Family & Caregiving','/one-place/family-handoff.html']]){
    await goto('/');await page.getByRole('navigation',{name:'One Place navigation'}).getByRole('link',{name,exact:true}).click();await visible(page.locator('h1').first());assert.equal(new URL(page.url()).pathname,path);await reflow();await page.getByRole('link',{name:/One Place Home/i}).first().click();await visible(page.getByRole('heading',{name:'Explore every part of life'}));
   }
   await goto('/simulator/01/');await page.locator('#yourReply').fill('Please leave me alone.');await page.locator('#send').click();await visible(page.locator('#completionTitle'));
   await goto('/teal/');const share=await page.locator('#invitation-text').inputValue();assert.ok(share.includes(origin+'/teal/'));assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),origin+'/teal/');
   await goto('/one-place/money-bills.html');await page.locator('#sample').click();await page.locator('#cash').fill('450');await page.locator('#tab-plan').click();await visible(page.locator('#panel-plan'));await reflow();
   const download=page.waitForEvent('download');await page.locator('#exportTop').click();await (await download).saveAs(output+'/fictional-money-plan-'+width+'.txt');
   await goto('/one-place/family-handoff.html');await page.locator('#sample').click();await page.getByRole('tab',{name:'1. Household',exact:true}).click();await page.locator('#person').fill('Fictional household');await reflow();
   assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);assert.deepEqual(outbound,[]);assert.deepEqual(writes,[]);
   result.widths.push({width,areas:18,solutions:72,lessons:10,major_navigation:'PASS',simulator:'PASS',tools:'PASS',canonical:'PASS',reflow:'PASS',outbound_requests:0,server_writes:0});
   await context.close();
  }
  const context=await browser.newContext();const request=context.request;
  for(const path of ['/media/Lesson_01_FINAL_REVIEW_114s.mp4','/media/lesson02.mp4']){
   const response=await request.get(origin+path,{headers:{Range:'bytes=0-511'}});assert.equal(response.status(),206,path+' byte-range support');assert.equal((await response.body()).length,512);
  }
  await context.close();result.video_ranges='PASS';result.status='PASS';
 }catch(e){result.status='FAIL';result.errors.push(e.stack||String(e));process.exitCode=1;}
 finally{await browser.close();fs.writeFileSync(output+'/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));}
})();
