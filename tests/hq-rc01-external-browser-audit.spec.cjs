const {test,expect}=require('@playwright/test');
const fs=require('node:fs'),path=require('node:path');
const dir=path.join('test-results','hq-rc01-external-browser-evidence');
fs.mkdirSync(dir,{recursive:true});
const resources=[
 ['cisa','/one-place/digital-safety-practice.html','https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-4-Easy-Ways-Stay-Safe-Online-Tip-Sheet.pdf',/secure our world|4 easy ways|multi.factor/i],
 ['careeronestop','/one-place/career-readiness-planner.html','https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/top-portion-of-resume.aspx',/resume|résumé|job search|summary/i],
 ['ftc','/one-place/digital-safety-practice.html','https://reportfraud.ftc.gov/',/report fraud|reportfraud|report a scam/i]
];
test('three official links: safe local clicks, external browser outcomes are non-gating',async({browser,baseURL})=>{
 test.setTimeout(175000);
 const records=[];
 for(const [key,source,href,hint] of resources){
  const context=await browser.newContext({acceptDownloads:true,viewport:{width:1366,height:800}});
  const opener=await context.newPage();
  const observed={key,source,officialUrl:href,sourceHeadSha:process.env.RC_SOURCE_HEAD_SHA||'local',observedAt:new Date().toISOString(),statuses:[],localLinkVerified:false,outcome:'not_observed',realVisitorUsabilityCertified:false};
  try{
   const local=await opener.goto(new URL(source,baseURL).href,{waitUntil:'domcontentloaded'});
   expect(local?.status()).toBe(200);
   const link=opener.locator('a[href="'+href+'"]');
   await expect(link).toHaveCount(1);
   await expect(link).toBeVisible();
   expect(await link.getAttribute('target')).toBe('_blank');
   const rel=(await link.getAttribute('rel')||'').split(/\s+/);
   expect(rel).toContain('noopener');
   expect(rel).toContain('noreferrer');
   observed.localLinkVerified=true;
   context.on('response',r=>{
    try{
     if(!r.request().isNavigationRequest())return;
     const u=new URL(r.url());
     if(u.protocol==='https:')observed.statuses.push({host:u.hostname,status:r.status()});
    }catch{}
   });
   const popWait=opener.waitForEvent('popup',{timeout:9000}).catch(()=>null);
   const downloadWait=opener.waitForEvent('download',{timeout:9000}).catch(()=>null);
   await link.click({timeout:15000});
   const [popup,download]=await Promise.all([popWait,downloadWait]);
   observed.popup=Boolean(popup);observed.download=Boolean(download);
   if(popup){
    await popup.waitForLoadState('domcontentloaded',{timeout:15000}).catch(()=>{});
    observed.finalHost=(()=>{try{return new URL(popup.url()).hostname}catch{return 'unknown'}})();
    const title=await popup.title().catch(()=>'');
    const text=await popup.locator('body').innerText({timeout:5000}).catch(()=>'');
    observed.visibleCharacters=text.trim().length;
    observed.topicTextObserved=hint.test(title+' '+text.slice(0,3000));
   }
   if(observed.statuses.some(x=>x.status>=400))observed.outcome='automated_http_rejection_inconclusive_for_visitors';
   else if(download)observed.outcome='browser_download_started_pdf_readability_unverified';
   else if(popup&&observed.statuses.some(x=>x.status>=200&&x.status<400)&&observed.visibleCharacters>=80&&observed.topicTextObserved)
    observed.outcome='browser_document_content_observed_not_accessibility_certified';
   else observed.outcome='browser_attempt_inconclusive';
  }catch(e){
   if(!observed.localLinkVerified)throw e;
   observed.outcome='browser_attempt_inconclusive';
   observed.browserErrorClass=String(e?.name||'Error').slice(0,80);
  }finally{
   records.push(observed);
   fs.writeFileSync(path.join(dir,'results.json'),JSON.stringify({
    sourceHeadSha:process.env.RC_SOURCE_HEAD_SHA||'local',
    scope:'Synthetic CI Chromium; no submissions; 403/502/PDF/JS restrictions do not prove real visitor failure; offsite observations non-gating',
    records
   },null,2));
   console.log('External browser observation:',key,observed.outcome);
   await context.close();
  }
 }
 expect(records.filter(r=>r.localLinkVerified)).toHaveLength(3);
});
