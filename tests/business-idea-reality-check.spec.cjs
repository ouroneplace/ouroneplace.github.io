const {test,expect}=require('@playwright/test');

const scenarios=[
 {key:'service',price:'50.00',cost:'15.00',fixed:'350.00',units:'12',margin:'35.00',breakEven:'At least 10 sales',balance:'70.00'},
 {key:'craft',price:'18.00',cost:'9.00',fixed:'90.00',units:'8',margin:'9.00',breakEven:'At least 10 sales',balance:'-18.00'},
 {key:'teaching',price:'35.00',cost:'2.00',fixed:'120.00',units:'6',margin:'33.00',breakEven:'At least 4 sales',balance:'78.00'}
];
for(const data of scenarios){
 test('Business reality: fictional '+data.key+' scenario calculates break-even, edits and review',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/one-place/business-idea-reality-check.html#calculate');
  await page.locator('[data-example="'+data.key+'"]').click();
  await expect(page.locator('#estimateForm input:enabled, #estimateForm textarea:enabled')).toHaveCount(6);
  await expect(page.locator('#price')).toHaveValue(data.price);
  await expect(page.locator('#unitCost')).toHaveValue(data.cost);
  await expect(page.locator('#fixedCost')).toHaveValue(data.fixed);
  await expect(page.locator('#units')).toHaveValue(data.units);
  await expect(page.locator('#price')).toBeFocused();
  await expect(page.locator('#result')).toBeHidden();
  await expect(page.locator('#saveEstimate')).toBeDisabled();
  await page.locator('#calculateBtn').click();
  await expect(page.locator('#result')).toContainText('Contribution per sale: '+data.margin);
  await expect(page.locator('#result')).toContainText(data.breakEven);
  await expect(page.locator('#result')).toContainText('Monthly balance after ENTERED costs: '+data.balance);
  await expect(page.locator('#saveEstimate')).toBeEnabled();
  await page.locator('#units').fill('0');
  await expect(page.locator('#result')).toBeHidden();
  await expect(page.locator('#saveEstimate')).toBeDisabled();
  await page.locator('#calculateBtn').click();
  await expect(page.locator('#result')).toContainText('Estimated sales per month: 0');
  expect(errors).toEqual([]);
 });
}

for(const width of [320,390,1366,1920]){
 test('Business reality: responsive first-party guide and tool at '+width+'px',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:850});
  await page.goto('/one-place/business-idea-reality-check.html');
  await expect(page.getByRole('heading',{name:'Business Idea Reality Check',exact:true,level:1})).toBeVisible();
  await expect(page.locator('.tip')).toHaveCount(4);
  await expect(page.getByRole('form',{name:'Business idea cost check'})).toHaveCount(1);
  await expect(page.locator('[data-example]')).toHaveCount(3);
  for(const target of ['calculate','next']){
   await page.goto('/one-place/business-idea-reality-check.html#'+target);
   await expect(page.locator('#'+target)).toBeVisible();
   const sizes=await page.evaluate(()=>({window:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
   expect(Math.max(sizes.html,sizes.body),'Overflow '+width+': '+JSON.stringify(sizes)).toBeLessThanOrEqual(width+1);
  }
  expect(errors).toEqual([]);
 });
}

test('Business reality: does not fabricate a result when required numbers are absent or invalid',async({page})=>{
 await page.goto('/one-place/business-idea-reality-check.html#calculate');
 const status=page.locator('#estimateStatus');
 await page.locator('#calculateBtn').click();
 await expect(status).toContainText('Price per sale must be a nonnegative amount');
 await expect(page.locator('#price')).toBeFocused();
 await expect(page.locator('#result')).toBeHidden();
 const inputs=[['price','-1','Price per sale'],['price','0','Price per sale'],['price','1.234','Price per sale'],
 ['unitCost','x','Variable cost per sale'],['fixedCost','-4','Monthly fixed cost'],
 ['units','1.5','Monthly sales'],['units','1000001','at most 1,000,000']];
 for(const [id,value,message] of inputs){
  await page.locator('#price').fill('10.00');
  await page.locator('#unitCost').fill('2.00');
  await page.locator('#fixedCost').fill('5.00');
  await page.locator('#units').fill('3');
  await page.locator('#'+id).fill(value);
  await page.locator('#calculateBtn').click();
  await expect(status).toContainText(message);
  await expect(page.locator('#'+id)).toBeFocused();
  await expect(page.locator('#result')).toBeHidden();
  await expect(page.locator('#saveEstimate')).toBeDisabled();
 }
});

for(const scenario of [
 {p:'10.00',v:'10.00',f:'50.00',units:'5',expected:'No number of sales can cover'},
 {p:'10.00',v:'10.00',f:'0',units:'5',expected:'Revenue and entered costs match at all sales volumes'},
 {p:'10.00',v:'12.00',f:'50.00',units:'5',expected:'Each sale loses money'},
 {p:'39.99',v:'20.00',f:'100.00',units:'5',expected:'At least 6 sales'}
]){
 test('Business reality: handles edge break-even '+scenario.p+'/'+scenario.v+'/'+scenario.f,async({page})=>{
  await page.goto('/one-place/business-idea-reality-check.html');
  for(const [id,value] of [['price',scenario.p],['unitCost',scenario.v],['fixedCost',scenario.f],['units',scenario.units]]){
   await page.locator('#'+id).fill(value);
  }
  await page.locator('#calculateBtn').click();
  await expect(page.locator('#result')).toContainText(scenario.expected);
 });
}

test('Business reality: user-entered drafts protected from accidental replacement and clear',async({page})=>{
 await page.goto('/one-place/business-idea-reality-check.html');
 await page.locator('#price').fill('21.00');
 await page.locator('#unitCost').fill('8.00');
 await page.locator('#fixedCost').fill('10.00');
 await page.locator('#units').fill('4');
 await page.locator('#customerQuestion').fill('Ask first without committing to purchases');
 page.once('dialog',async d=>{expect(d.message()).toContain('Replace your current fields');await d.dismiss();});
 await page.locator('[data-example="craft"]').click();
 await expect(page.locator('#price')).toHaveValue('21.00');
 await expect(page.locator('#customerQuestion')).toHaveValue('Ask first without committing to purchases');
 page.once('dialog',d=>d.accept());
 await page.locator('[data-example="service"]').click();
 await expect(page.locator('#price')).toHaveValue('50.00');
 await page.locator('#calculateBtn').click();
 page.once('dialog',d=>d.dismiss());
 await page.locator('#clearEstimate').click();
 await expect(page.locator('#price')).toHaveValue('50.00');
 await expect(page.locator('#result')).toBeVisible();
 page.once('dialog',d=>d.accept());
 await page.locator('#clearEstimate').click();
 await expect(page.locator('#price')).toHaveValue('');
 await expect(page.locator('#result')).toBeHidden();
 await expect(page.locator('#saveEstimate')).toBeDisabled();
});

test('Business reality: consent required for local download, and exported file matches reviewed data',async({page})=>{
 const downloads=[];page.on('download',d=>downloads.push(d));
 await page.goto('/one-place/business-idea-reality-check.html');
 await page.locator('[data-example="service"]').click();
 await page.locator('#calculateBtn').click();
 page.once('dialog',d=>d.dismiss());
 await page.locator('#saveEstimate').click();
 await expect(page.locator('#estimateStatus')).toContainText('Download canceled');
 expect(downloads).toHaveLength(0);
 page.once('dialog',d=>d.accept());
 const promise=page.waitForEvent('download');
 await page.locator('#saveEstimate').click();
 const file=await promise;
 expect(file.suggestedFilename()).toBe('one-place-business-idea-estimate.txt');
 const pieces=[];for await(const piece of await file.createReadStream())pieces.push(piece);
 const raw=Buffer.concat(pieces).toString('utf8');
 expect(raw).toContain('At least 10 sales per month');
 expect(raw).toContain('Monthly balance after ENTERED costs: 70.00');
 expect(raw).toContain('WARNING: This balance excludes any costs not entered');
});

test('Business reality: 320px + 200 percent text and keyboard form actions reflow',async({page})=>{
 await page.setViewportSize({width:320,height:740});
 await page.goto('/one-place/business-idea-reality-check.html#calculate');
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 const button=page.locator('[data-example="teaching"]');
 await button.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#price')).toBeFocused();
 await page.locator('#calculateBtn').focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#result')).toContainText('At least 4 sales');
 const dim=await page.evaluate(()=>({window:innerWidth,html:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 expect(Math.max(dim.html,dim.body),'At enlarged text: '+JSON.stringify(dim)).toBeLessThanOrEqual(dim.window+1);
});

test('Business reality: no-JavaScript users still get complete learning and source links',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});
 try{
  const page=await context.newPage();
  await page.goto('/one-place/business-idea-reality-check.html');
  await expect(page.getByRole('heading',{name:'Business Idea Reality Check',level:1})).toBeVisible();
  await expect(page.locator('.tip:visible')).toHaveCount(4);
  await expect(page.locator('.examples')).toBeHidden();
  await expect(page.locator('#calculateBtn')).toBeDisabled();
  await expect(page.locator('#clearEstimate')).toBeDisabled();
  await expect(page.locator('#estimateForm input:disabled, #estimateForm textarea:disabled')).toHaveCount(6);
  await expect(page.locator('#estimateForm input:enabled, #estimateForm textarea:enabled')).toHaveCount(0);
  await expect(page.locator('noscript p')).toContainText('The calculator fields and buttons are disabled');
  await expect(page.locator('.sources a')).toHaveCount(3);
 }finally{await context.close();}
});

test('Business reality: user notes are treated as plain text with no storage or outbound writes',async({page})=>{
 const writes=[],thirdParty=[];
 page.on('request',r=>{
  if(!/^https?:/.test(r.url()))return;
  if(!['GET','HEAD'].includes(r.method()))writes.push(r.url());
  const url=new URL(r.url());
  if(!['127.0.0.1','localhost'].includes(url.hostname))thirdParty.push(r.url());
 });
 await page.goto('/one-place/business-idea-reality-check.html');
 const unsafe='<img src=x onerror="window.businessUnsafe=true">';
 await page.locator('[data-example="service"]').click();
 await page.locator('#customerQuestion').fill(unsafe);
 await page.locator('#calculateBtn').click();
 await expect(page.locator('#result')).toContainText(unsafe);
 await expect(page.locator('#result img')).toHaveCount(0);
 expect(await page.evaluate(()=>window.businessUnsafe)).toBeUndefined();
 expect(writes).toEqual([]);expect(thirdParty).toEqual([]);
 expect(await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}))).toEqual({local:[],session:[]});
 await page.reload();
 await expect(page.locator('#result')).toBeHidden();
 await expect(page.locator('#saveEstimate')).toBeDisabled();
});

test('Business reality: link exists only within Business area, original four catalog cards preserved',async({page})=>{
 await page.goto('/index.html?area=Business%20%26%20Entrepreneurship');
 await expect(page.getByRole('heading',{name:'Business & Entrepreneurship',exact:true,level:1})).toBeVisible();
 await expect(page.locator('.offers > a.offer')).toHaveCount(4);
 await page.getByRole('link',{name:'Open the Business Idea Reality Check'}).click();
 await expect(page).toHaveURL(/\/one-place\/business-idea-reality-check\.html$/);
 await page.getByRole('link',{name:'Business & Entrepreneurship'}).first().click();
 await expect(page).toHaveURL(/area=Business/);
 await page.goto('/index.html?area=Work%20%26%20Careers');
 await expect(page.locator('#business-reality-path')).toHaveCount(0);
});

test('Business reality: official sources are safe, clearly scoped to U.S. and not loaded automatically',async({page})=>{
 await page.goto('/one-place/business-idea-reality-check.html');
 const links=page.locator('.sources a');
 await expect(links).toHaveCount(3);
 for(const link of await links.all()){
  await expect(link).toHaveAttribute('target','_blank');
  await expect(link).toHaveAttribute('rel',/noopener noreferrer/);
  await expect(link).toContainText('(U.S., external)');
 }
});
