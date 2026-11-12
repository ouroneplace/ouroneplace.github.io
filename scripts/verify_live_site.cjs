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
   const page=await context.newPage();const errors=[],missing=[],thirdPartyHosts=[],thirdPartyWrites=[],siteWrites=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('response',r=>{const u=new URL(r.url());if(u.origin===origin&&r.status()>=400&&u.pathname!=='/favicon.ico')missing.push(r.status()+' '+r.url());});
   page.on('request',r=>{const u=r.url();if(u.startsWith('data:')||u.startsWith('blob:'))return;const host=new URL(u).hostname;const local=new URL(u).origin===origin;const write=!['GET','HEAD'].includes(r.method());if(!local)thirdPartyHosts.push(host);if(write){if(local)siteWrites.push(r.method()+' '+u);else thirdPartyWrites.push(host);}});
   async function visible(locator){await locator.waitFor({state:'visible',timeout:15000});}
   async function goto(path){
    let status=0,finalUrl='';
    for(let attempt=1;attempt<=3;attempt++){
     const r=await page.goto(origin+path,{waitUntil:'load'});
     status=r?.status()||0;finalUrl=page.url();
     if(r?.ok() || (!r && page.url()===origin+path)){
      // Playwright returns null for valid same-document hash navigations.
      await visible(page.locator('h1').first());return;
     }
     if(attempt<3)await new Promise(resolve=>setTimeout(resolve,400*attempt));
    }
    throw new Error('Live route unsuccessful: '+path+' HTTP '+status+' final URL '+finalUrl);
   }
   async function reflow(){
    await page.waitForLoadState('load');
    await page.evaluate(async()=>{await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
    const layout=await page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth,overflow:[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,id:e.id,right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width})).filter(e=>e.right>innerWidth+1).slice(0,15)}));
    if(Math.max(layout.document,layout.body)>layout.width+1){await page.screenshot({path:output+'/overflow-'+width+'.png',fullPage:true});throw new Error('Horizontal overflow at '+page.url()+' '+JSON.stringify(layout));}
   }
   await goto('/');assert.match(await page.title(),/^ONE PLACE/);
   assert.equal(await page.locator('.grid > a.tile').count(),21,'18 original areas + 3 learning cards');
   assert.equal(await page.locator('.grid > .tile.pending').count(),3,'3 intentionally inactive Pending cards');
   await reflow();
   await page.screenshot({path:output+'/one-place-'+width+'.png',fullPage:true});
   const areas=await page.locator('.grid > a.tile[href*="?area="]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
   assert.equal(areas.length,18,'18 original life areas');
   const solutions=[];
   for(const route of areas){
    await goto('/'+route);
    const areaName=new URL(route,origin).searchParams.get('area');
    if(areaName==='Money & Bills'){
     // Founder-approved Money Center replaces the old four generic catalog cards.
     assert.equal(new URL(page.url()).pathname,'/one-place/money-center.html');
     assert.equal(await page.locator('#tools .card').count(),4,'Money Center has four working tool cards');
     assert.equal(await page.locator('#situation').count(),1,'Money Center has a real situation selector');
     for(const name of ['Open bill planner','Open debt guide','Compare prices','Start checkup']){
      assert.equal(await page.getByRole('link',{name,exact:true}).count(),1,'Missing Money Center tool: '+name);
     }
    }else{
     assert.equal(await page.locator('.offers > a.offer').count(),4,areaName+' has four working paths');
     solutions.push(...await page.locator('.offers > a.offer').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href'))));
    }
    await reflow();
   }
   assert.equal(new Set(solutions).size,68,'17 catalog categories with four distinct paths, plus dedicated Money Center');
   for(const route of solutions){await goto('/'+route);await reflow();}
   for(let n=1;n<=10;n++){
    await goto('/lessons/'+String(n).padStart(2,'0')+'/');await reflow();
    assert.equal(await page.getByRole('navigation',{name:'One Place and lessons'}).count(),1);
    await page.getByRole('link',{name:'One Place Home',exact:true}).click();
    await visible(page.getByRole('heading',{name:'Explore every part of life',exact:true}));
   }
   // v4.1 uses first-class homepage category cards, not the retired navigation bar.
   for(const [name,path] of [['Life Simulator','/simulator/01/'],['Human Literacy','/human-literacy/'],['Our Humanity','/one-place/our-humanity.html']]){
    await goto('/');
    await page.locator('.grid > a.new-card').filter({hasText:name}).click();
    await visible(page.locator('h1').first());
    assert.equal(new URL(page.url()).pathname,path);
    await reflow();
    await page.getByRole('link',{name:/One Place Home/i}).first().click();
    await visible(page.getByRole('heading',{name:'Explore every part of life'}));
   }
   // The complete TEAL philosophy is reached from the new About dropdown.
   await goto('/');
   await page.locator('.op4-menu summary').click();
   await page.getByRole('navigation',{name:'About ONE PLACE'}).getByRole('link',{name:'TEAL',exact:true}).click();
   await visible(page.locator('#teal-101'));
   assert.equal(new URL(page.url()).pathname,'/teal/');
   assert.equal(await page.locator('#teal-101 details.teal101-chapter').count(),12);
   await reflow();
   await page.getByRole('link',{name:/One Place Home/i}).first().click();
   await visible(page.getByRole('heading',{name:'Explore every part of life'}));
   // Follow each approved life-area journey into its real first-party tool.
   for(const [index,path] of [[0,'/one-place/money-bills.html'],[2,'/one-place/family-handoff.html']]){
    await goto('/');
    await page.locator('.grid > a.tile[href*="?area="]').nth(index).click();
    if(index===0){
     assert.equal(new URL(page.url()).pathname,'/one-place/money-center.html');
     await page.getByRole('link',{name:'Open bill planner',exact:true}).click();
    }else{
     await page.locator('[data-care-pilot-link]').click();
    }
    await visible(page.locator('h1').first());
    assert.equal(new URL(page.url()).pathname,path);
    await reflow();
    await page.getByRole('link',{name:/One Place Home/i}).first().click();
    await visible(page.getByRole('heading',{name:'Explore every part of life'}));
   }
   await goto('/simulator/01/');await page.locator('#yourReply').fill('Please leave me alone.');await page.locator('#send').click();await visible(page.locator('#completionTitle'));
   await goto('/teal/');assert.equal(await page.getByRole('link',{name:'GitHub issue tracker',exact:true}).getAttribute('href'),'https://github.com/ouroneplace/ouroneplace.github.io/issues');const share=await page.locator('#invitation-text').inputValue();assert.ok(share.includes(origin+'/teal/'));assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),origin+'/teal/');
   await goto('/one-place/money-bills.html');await page.locator('#sample').click();await page.locator('#cash').fill('450');await page.locator('#tab-plan').click();await visible(page.locator('#panel-plan'));await reflow();
   const download=page.waitForEvent('download');await page.locator('#exportTop').click();await (await download).saveAs(output+'/fictional-money-plan-'+width+'.txt');
   await goto('/one-place/family-handoff.html');await page.locator('#sample').click();await page.getByRole('tab',{name:'1. Household',exact:true}).click();await page.locator('#person').fill('Fictional household');await reflow();
   assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);assert.deepEqual(siteWrites,[]);
   // Lesson media is loaded from Descript. Its third-party analytics/advertising
   // requests are reported, never hidden or misrepresented as first-party writes.
   result.widths.push({width,areas:18,working_category_links:21,pending_cards:3,solutions:72,money_center_tools:4,legacy_catalog_links:68,lessons:10,teal101_chapters:12,major_navigation:'PASS',simulator:'PASS',tools:'PASS',canonical:'PASS',reflow:'PASS',first_party_server_writes:0,third_party_request_count:thirdPartyHosts.length,third_party_domains:[...new Set(thirdPartyHosts)].sort(),third_party_write_count:thirdPartyWrites.length,third_party_write_domains:[...new Set(thirdPartyWrites)].sort()});
   await context.close();
  }
  const context=await browser.newContext();const request=context.request;
  const videoFiles=fs.readdirSync('media').filter(name=>name.toLowerCase().endsWith('.mp4'));assert.ok(videoFiles.length>0,'Shipped lesson videos missing');
  for(const filename of videoFiles){
   const path='/media/'+encodeURIComponent(filename);
   const response=await request.get(origin+path,{headers:{Range:'bytes=0-511'}});assert.equal(response.status(),206,path+' byte-range support');
   const bytes=await response.body();assert.equal(bytes.length,512);
   const expected=Buffer.alloc(512),fd=fs.openSync('media/'+filename,'r');try{assert.equal(fs.readSync(fd,expected,0,512,0),512);}finally{fs.closeSync(fd);}assert.deepEqual(bytes,expected,path+' content preservation');
  }
  result.videos_checked=videoFiles.length;
  result.third_party_media_notice='Hosted Descript videos may initiate marketing and analytics requests; these are not ONE PLACE first-party writes. Review third-party privacy separately.';
  await context.close();result.video_ranges='PASS';result.status='PASS';
 }catch(e){result.status='FAIL';result.errors.push(e.stack||String(e));process.exitCode=1;}
 finally{await browser.close();fs.writeFileSync(output+'/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));}
})();
