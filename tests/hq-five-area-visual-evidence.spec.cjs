const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const path=require('node:path');
const evidenceDir=path.join('test-results','hq-rc01-visual-evidence');
fs.mkdirSync(evidenceDir,{recursive:true});
const pages=[
 {key:'wellness',href:'/one-place/health-wellness.html'},
 {key:'digital-safety',href:'/one-place/digital-safety-practice.html'},
 {key:'support-skills',href:'/one-place/support-skills-safety.html'},
 {key:'careers',href:'/one-place/career-readiness-planner.html'},
 {key:'business',href:'/one-place/business-idea-reality-check.html'}
];
const variants=[
 {name:'phone-320',width:320,largeText:false},
 {name:'phone-390',width:390,largeText:false},
 {name:'desktop-1366',width:1366,largeText:false},
 {name:'desktop-1920',width:1920,largeText:false},
 {name:'phone-320-text-200',width:320,largeText:true},
 {name:'phone-390-text-200',width:390,largeText:true}
];
for(const item of pages){
 test('HQ RC-01 visual evidence at six viewports: '+item.key,async({page})=>{
  test.setTimeout(120000);
  const errors=[],rows=[];
  page.on('pageerror',err=>errors.push(err.message));
  for(const variant of variants){
   await page.setViewportSize({width:variant.width,height:860});
   const response=await page.goto(item.href,{waitUntil:'load'});
   expect(response?.status(),'page '+item.href).toBe(200);
   if(variant.largeText)await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
   await page.evaluate(async()=>{
    await document.fonts.ready;
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
   });
   await expect(page.locator('h1')).toBeVisible();
   const layout=await page.evaluate(()=>{
    const h=document.querySelector('h1').getBoundingClientRect();
    const m=document.querySelector('main').getBoundingClientRect();
    // Detect whole-word breaks hidden by a passing horizontal-overflow check.
    const splitHeadingWords=[];
    const heading=document.querySelector('h1');
    for(const node of heading.childNodes){
     if(node.nodeType!==Node.TEXT_NODE)continue;
     for(const match of (node.textContent||'').matchAll(/[A-Za-z]{3,}/g)){
      const range=document.createRange();
      range.setStart(node,match.index);
      range.setEnd(node,match.index+match[0].length);
      if([...range.getClientRects()].filter(rect=>rect.width>0.5).length>1)
       splitHeadingWords.push(match[0]);
     }
    }
    // Navigation words should remain intact at enlarged text sizes too.
    const splitNavigationWords=[];
    for(const link of document.querySelectorAll('.top nav a')){
     for(const node of link.childNodes){
      if(node.nodeType!==Node.TEXT_NODE)continue;
      for(const match of (node.textContent||'').matchAll(/[A-Za-z]{3,}/g)){
       const wordRange=document.createRange();
       wordRange.setStart(node,match.index);
       wordRange.setEnd(node,match.index+match[0].length);
       if([...wordRange.getClientRects()].filter(rect=>rect.width>0.5).length>1)
        splitNavigationWords.push(match[0]);
      }
     }
    }
    const visibleSections=[...document.querySelectorAll('main section')].filter(el=>el.getClientRects().length>0).length;
    return {
     viewport:innerWidth,
     document:document.documentElement.scrollWidth,
     body:document.body.scrollWidth,
     h1:{left:h.left,right:h.right,width:h.width,height:h.height},
     main:{left:m.left,right:m.right,width:m.width,height:m.height},
     sections:visibleSections,
     splitHeadingWords,
     splitNavigationWords,
     rootFontPx:parseFloat(getComputedStyle(document.documentElement).fontSize),
     bodyFontPx:parseFloat(getComputedStyle(document.body).fontSize),
     title:document.title,
     robots:document.querySelector('meta[name="robots"]')?.content||''
    };
   });
   const screenshot=item.key+'-'+variant.name+'.png';
   await page.screenshot({path:path.join(evidenceDir,screenshot),fullPage:true,animations:'disabled'});
   expect(Math.max(layout.document,layout.body),item.key+' '+variant.name+' full-page reflow '+JSON.stringify(layout)).toBeLessThanOrEqual(layout.viewport+1);
   expect(layout.h1.left,item.key+' '+variant.name+' heading left').toBeGreaterThanOrEqual(-1);
   expect(layout.h1.right,item.key+' '+variant.name+' heading right').toBeLessThanOrEqual(layout.viewport+1);
   expect(layout.main.left,item.key+' '+variant.name+' main left').toBeGreaterThanOrEqual(-1);
   expect(layout.main.right,item.key+' '+variant.name+' main right').toBeLessThanOrEqual(layout.viewport+1);
   expect(layout.sections,item.key+' '+variant.name+' visible sections').toBeGreaterThan(0);
   expect(layout.splitHeadingWords,item.key+' '+variant.name+' heading must not split words').toEqual([]);
   expect(layout.splitNavigationWords,item.key+' '+variant.name+' navigation words must not split').toEqual([]);
   if(variant.largeText)expect(layout.rootFontPx,item.key+' enlarged root text').toBeGreaterThanOrEqual(31);
   await page.keyboard.press('Tab');
   expect(await page.evaluate(()=>document.activeElement?.getAttribute('href')),item.key+' '+variant.name+' first keyboard stop').toBe('#main');
   rows.push({variant:variant.name,layout,screenshot});
  }
  expect(errors,'uncaught browser errors for '+item.key).toEqual([]);
  fs.writeFileSync(path.join(evidenceDir,item.key+'.json'),JSON.stringify({
   sourceHeadSha:process.env.RC_SOURCE_HEAD_SHA||'unknown',
   checkoutSha:process.env.GITHUB_SHA||'local',
   page:item.href,
   evidence:'synthetic browser screenshots only, not real-device or manual accessibility acceptance',
   rows
  },null,2));
 });
}
