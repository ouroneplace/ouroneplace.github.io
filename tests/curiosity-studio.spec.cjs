const {test,expect}=require('@playwright/test');
const url='/one-place/curiosity-studio.html';

test('Curiosity Studio is discoverable from Our Humanity and returns to it',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/one-place/our-humanity.html');
  await page.getByRole('link',{name:/Explore the Curiosity Studio/}).click();
  await expect(page).toHaveURL(/\/one-place\/curiosity-studio\.html$/);
  await expect(page.getByRole('heading',{name:/Wonder, just because/i})).toBeVisible();
  await expect(page.locator('#light')).toBeVisible();
  await expect(page.locator('#symmetry')).toBeAttached();
  await page.getByRole('link',{name:'Return to Our Humanity'}).click();
  await expect(page).toHaveURL(/\/one-place\/our-humanity\.html#wonder$/);
  expect(errors).toEqual([]);
});

test('Curiosity Studio light mixing has accessible numeric feedback and preset controls',async({page})=>{
  await page.goto(url);
  const result=page.locator('#light-output');
  await expect(result).toHaveText('Yellow · RGB(255, 255, 0)');
  await expect(page.locator('#light-preview')).toHaveAttribute('role','img');
  await expect(page.locator('#light-preview')).toHaveAttribute('aria-label',/Yellow screen-light sample/);
  await page.getByRole('button',{name:'Cyan',exact:true}).click();
  await expect(result).toHaveText('Cyan · RGB(0, 255, 255)');
  await expect(page.locator('#red')).toHaveValue('0');
  await expect(page.locator('#green')).toHaveValue('255');
  await expect(page.locator('#blue')).toHaveValue('255');
  await page.getByRole('button',{name:'White',exact:true}).click();
  await expect(result).toHaveText('White · RGB(255, 255, 255)');
  await page.getByRole('button',{name:'All off'}).click();
  await expect(result).toHaveText('All lights off · RGB(0, 0, 0)');
  await page.locator('#red').focus();
  await page.keyboard.press('End');
  await expect(result).toHaveText('Red · RGB(255, 0, 0)');
  await page.locator('#green').focus();
  await page.keyboard.press('End');
  await expect(result).toHaveText('Yellow · RGB(255, 255, 0)');
});

test('Curiosity Studio pattern builder supports keyboard, color, reset and surprise',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);
  const label=page.locator('#pattern-output');
  const art=page.locator('#pattern-art');
  await expect(label).toContainText('6 repeating petals');
  await expect(art.locator('ellipse')).toHaveCount(6);
  await expect(page.locator('#pattern-svg')).toHaveAttribute('role','img');
  await page.locator('#petals').focus();
  await page.keyboard.press('Home');
  await expect(page.locator('#petals')).toHaveValue('3');
  await expect(art.locator('ellipse')).toHaveCount(3);
  await expect(label).toContainText('120°');
  await page.keyboard.press('End');
  await expect(page.locator('#petals')).toHaveValue('12');
  await expect(art.locator('ellipse')).toHaveCount(12);
  await expect(label).toContainText('30°');
  await page.getByLabel('Pattern color').selectOption('indigo');
  await expect(label).toContainText('Midnight indigo');
  await expect(page.locator('#pattern-graphic-title')).toContainText('midnight indigo');
  await page.getByRole('button',{name:'Reset'}).click();
  await expect(label).toHaveText('6 repeating petals · Ocean teal · 60° between petals');
  await page.getByRole('button',{name:'Surprise me'}).click();
  const n=Number(await page.locator('#petals').inputValue());
  expect(n).toBeGreaterThanOrEqual(3);
  expect(n).toBeLessThanOrEqual(12);
  await expect(art.locator('ellipse')).toHaveCount(n);
  expect(errors).toEqual([]);
});

for(const width of [320,390,768,1366]){
 test('Curiosity Studio fits '+width+'px without horizontal overflow',async({page})=>{
  await page.setViewportSize({width,height:800});
  await page.goto(url);
  await expect(page.getByRole('heading',{name:/Wonder, just because/i})).toBeVisible();
  const geometry=await page.evaluate(()=>({body:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
  expect(geometry.body).toBeLessThanOrEqual(geometry.viewport+1);
  await expect(page.locator('#light-output')).toBeVisible();
  await expect(page.locator('#pattern-output')).toBeAttached();
 });
}


test('Curiosity Studio makes external resources optional and clearly distinguishes them',async({page})=>{
  await page.goto(url);
  await expect(page.getByText('Those sites may display donation or sign-in requests',{exact:false})).toBeVisible();
  const outside=page.locator('section.learning a[target="_blank"]');
  await expect(outside).toHaveCount(2);
  await expect(outside.nth(0)).toHaveAttribute('rel','noopener noreferrer');
  await expect(outside.nth(1)).toHaveAttribute('rel','noopener noreferrer');
});

test('Curiosity Studio: no automatic third-party requests or browser storage',async({page})=>{
 const requests=[];
 page.on('request',req=>requests.push(req.url()));
 await page.goto(url);
 await page.getByRole('button',{name:'Magenta'}).click();
 await page.getByRole('button',{name:'Surprise me'}).click();
 expect(requests.every(x=>new URL(x).hostname==='127.0.0.1')).toBeTruthy();
 const storage=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}));
 expect(storage).toEqual({local:0,session:0});
 await expect(page.getByRole('link',{name:'One Place Home'})).toHaveAttribute('href','../index.html');
});