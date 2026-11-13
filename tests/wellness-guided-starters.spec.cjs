const {test,expect}=require('@playwright/test');

const examples=[
 ['rest','Sleep and rest','After putting my phone aside in the evening','Make my surroundings a little quieter or more comfortable','Take a comfortable pause without trying to force sleep'],
 ['movement','Gentle movement','After a usual rest break','Choose a brief movement break that fits my abilities and care advice','Rest or ask my care team which movement would fit'],
 ['food','Food and hydration','Before planning a meal','Check one food choice against any dietary guidance I follow','Write down a food or fluid question for my care team'],
 ['care','Daily care organization','After checking today’s calendar','Write down one question or follow-up task for my next care contact','Make a short reminder and return to it later']
];

for(const [key,topic,cue,step,fallback] of examples){
 test('Wellness Routine Builder example '+key+' produces a truthful editable plan',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/one-place/health-wellness.html#habits');
  const example=page.locator('[data-routine-example="'+key+'"]');
  await expect(example).toBeVisible();
  await example.click();
  await expect(page.locator('#habitTopic')).toHaveValue(topic);
  await expect(page.locator('#habitCue')).toHaveValue(cue);
  await expect(page.locator('#habitAction')).toHaveValue(step);
  await expect(page.locator('#habitFallback')).toHaveValue(fallback);
  await expect(page.locator('#habitCue')).toBeFocused();
  await expect(page.locator('#habitStatus')).toContainText('Fictional example loaded');
  await expect(page.locator('#habitResult')).toBeHidden();
  await page.locator('#makeHabit').click();
  await expect(page.locator('#habitResult')).toContainText(cue);
  await expect(page.locator('#habitResult')).toContainText(fallback);
  await page.locator('#habitAction').fill('My own safe adjustment');
  await expect(page.locator('#habitResult')).toBeHidden();
  await page.locator('#makeHabit').click();
  await expect(page.locator('#habitResult')).toContainText('My own safe adjustment');
  expect(errors).toEqual([]);
 });
}

test('Wellness examples do not overwrite an unfinished personal routine without confirmation',async({page})=>{
 await page.goto('/one-place/health-wellness.html#habits');
 await page.locator('#habitTopic').selectOption('Daily care organization');
 await page.locator('#habitCue').fill('My existing cue');
 await page.locator('#habitAction').fill('My existing small step');
 page.once('dialog',async dialog=>{expect(dialog.message()).toContain('Replace your current routine');await dialog.dismiss();});
 await page.locator('[data-routine-example="rest"]').click();
 await expect(page.locator('#habitCue')).toHaveValue('My existing cue');
 await expect(page.locator('#habitAction')).toHaveValue('My existing small step');
 await expect(page.locator('#habitTopic')).toHaveValue('Daily care organization');
 page.once('dialog',async dialog=>{expect(dialog.type()).toBe('confirm');await dialog.accept();});
 await page.locator('[data-routine-example="food"]').click();
 await expect(page.locator('#habitCue')).toHaveValue('Before planning a meal');
 await expect(page.locator('#habitTopic')).toHaveValue('Food and hydration');
 await page.locator('#resetHabit').click();
 await expect(page.locator('#habitCue')).toHaveValue('');
 await expect(page.locator('#habitAction')).toHaveValue('');
 await expect(page.locator('#habitFallback')).toHaveValue('');
 await expect(page.locator('#habitResult')).toBeHidden();
});

test('Wellness starters are keyboard usable and reflow at narrow and enlarged text widths',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,1366,1920]){
  await page.setViewportSize({width,height:840});
  await page.goto('/one-place/health-wellness.html#habits');
  await expect(page.getByRole('group',{name:'Load a fictional wellness routine example'}).getByRole('button')).toHaveCount(4);
  const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
  expect(dimensions.scroll,'Overflow at '+width).toBeLessThanOrEqual(width+1);
 }
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/health-wellness.html#habits');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const example=page.locator('[data-routine-example="care"]');
 await example.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#habitCue')).toBeFocused();
 await expect(page.locator('#habitCue')).toHaveValue('After checking today’s calendar');
 const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(dimensions.scroll,dimensions.body),'At 320px + 200% text: '+JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.width+1);
 expect(errors).toEqual([]);
});

test('Wellness guidance stays useful without JavaScript and does not show inert example controls',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto('/one-place/health-wellness.html#habits');
  await expect(page.locator('.example-starters')).toBeHidden();
  await expect(page.getByText(/With JavaScript off, consider a reminder/)).toBeVisible();
  await expect(page.getByRole('heading',{name:'Wellness Routine Builder'})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }finally{await context.close();}
});

test('Wellness examples remain private, require deliberate creation, and use safe official reference links',async({page})=>{
 const writes=[],external=[];
 page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  const url=new URL(r.url());
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.method()+' '+r.url());
  if(!['127.0.0.1','localhost'].includes(url.hostname))external.push(r.url());
 });
 await page.goto('/one-place/health-wellness.html#habits');
 await page.locator('[data-routine-example="movement"]').click();
 await expect(page.locator('#habitResult')).toBeHidden();
 await page.locator('#makeHabit').click();
 await expect(page.locator('#habitResult')).toBeVisible();
 expect(writes).toEqual([]);
 expect(external).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 for(const href of ['https://medlineplus.gov/healthyliving.html','https://www.cdc.gov/disability-and-health/conditions/physical-activity.html']){
  const link=page.locator('#habits a[href="'+href+'"]');
  await expect(link).toHaveCount(1);
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
 }
 await page.reload();
 await expect(page.locator('#habitResult')).toBeHidden();
 await expect(page.locator('#habitCue')).toHaveValue('');
 await expect(page.locator('#habitAction')).toHaveValue('');
});
