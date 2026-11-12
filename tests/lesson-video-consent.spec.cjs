const { test, expect } = require('@playwright/test');

// Consent is a real action boundary: no third-party request is made just by opening
// a lesson. Play activates the existing Descript URL without changing lesson stages.
const shares=['jmGClFW0etJ','8GyMmS5Oixd','OVaHB0aypFw','f17fyNgzbZM','CZsVq0YNMTq','hEnvP1RZFon','LfvHoksdBOl','LhyDGOcpa2v','SA7a2B7Yo0l','6RV8mLe8v2W'];
for(const width of [320,1366]){
 for(let n=1;n<=10;n++){
  const lesson=String(n).padStart(2,'0'),share=shares[n-1];
  test('Lesson '+lesson+' loads no external video until play at '+width+'px',async({page})=>{
   const requested=[];
   page.on('request',request=>{
    if(/^https?:/.test(request.url())&&!['127.0.0.1','localhost'].includes(new URL(request.url()).hostname))requested.push(request.url());
   });
   await page.route('https://share.descript.com/**',route=>route.abort('failed'));
   await page.setViewportSize({width,height:760});
   await page.goto('/lessons/'+lesson+'/');
   await expect(page.getByRole('heading',{name:'See It',exact:true})).toBeVisible();
   const gate=page.locator('.lesson-video-gate');
   await expect(gate).toBeVisible();
   await expect(page.locator('iframe.lesson-video-frame')).toHaveCount(0);
   await expect(page.getByText('This video is hosted by Descript.',{exact:false})).toBeVisible();
   await page.waitForTimeout(120);
   expect(requested,'Third-party request before Play Lesson Video').toEqual([]);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   const play=page.getByRole('button',{name:'Play Lesson Video',exact:true});
   await expect(play).toBeVisible();
   await play.focus();await page.keyboard.press('Enter');
   await expect(play).toHaveCount(0);
   await expect(page.locator('iframe.lesson-video-frame')).toHaveAttribute('src','https://share.descript.com/embed/'+share);
   await expect.poll(()=>requested.some(u=>u.startsWith('https://share.descript.com/embed/'))).toBe(true);
   await expect(page.getByRole('link',{name:'Open Lesson '+n+' video in a new tab',exact:true})).toHaveAttribute('href','https://share.descript.com/view/'+share);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.getByRole('button',{name:'Continue to Understand It',exact:true}).click();
   await expect(page.getByRole('heading',{name:'Understand It',exact:true})).toBeVisible();
   await page.getByRole('button',{name:'← Back',exact:true}).click();
   await expect(page.getByRole('heading',{name:'See It',exact:true})).toBeVisible();
   await expect(page.locator('iframe.lesson-video-frame')).toHaveCount(0);
  });
 }
}
