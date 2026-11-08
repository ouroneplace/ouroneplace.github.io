const {test,expect}=require('@playwright/test');

// OP-104 baseline: compact desktop screens should fit a focused task when practical.
// A decision-support category may scroll when preserving readable, accessible choices
// requires more space. Always keep its first decision visible in the initial viewport.
const desktopRoutes=[
  ['One Place home','/one-place/'],
  ['Family & Caregiving area','/one-place/index.html?area=Family%20%26%20Caregiving'],
  ['Money & Bills tool overview','/one-place/money-bills.html'],
  ['Family Handoff tool first view','/one-place/family-handoff.html'],
  ['Human Literacy Explore','/human-literacy/'],
  ['Human Literacy Lessons','/human-literacy/#lessons'],
];

for(const size of [{width:1920,height:1080},{width:1366,height:768}]){
  test.describe(`desktop ${size.width}x${size.height}`,()=>{
    test.use({viewport:size});
    for(const [name,route] of desktopRoutes){
      test(`${name} fits first task without page scrolling`,async({page})=>{
        await page.goto(route);
        await expect(page.locator('body')).toBeVisible();
        const metrics=await page.evaluate(()=>({
          scroll:Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),
          height:window.innerHeight,
          contentWidth:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),
          width:window.innerWidth
        }));
        expect(metrics.scroll,`${name} document scrollHeight=${metrics.scroll}, viewport=${metrics.height}`).toBeLessThanOrEqual(metrics.height+3);
        expect(metrics.contentWidth,`${name} width=${metrics.contentWidth}, viewport=${metrics.width}`).toBeLessThanOrEqual(metrics.width+3);
      });
    }
  });
}

// A useful decision is more important than artificially squeezing all 5 paths
// and the four historical catalog options into a single desktop viewport.
for(const size of [{width:1920,height:1080},{width:1366,height:768}]){
  test('Money & Bills starts with an actionable choice at '+size.width+'px',async({page})=>{
    await page.setViewportSize(size);
    await page.goto('/one-place/index.html?area=Money%20%26%20Bills');
    const title=page.getByRole('heading',{name:'What do you need help with today?'});
    const first=page.getByRole('button',{name:/I cannot cover an essential bill/});
    await expect(title).toBeVisible();
    await expect(first).toBeVisible();
    const titleBox=await title.boundingBox();
    const firstBox=await first.boundingBox();
    expect(titleBox.y+titleBox.height).toBeLessThan(size.height);
    expect(firstBox.y+firstBox.height).toBeLessThan(size.height);
    await expect(page.locator('#money-task-options button')).toHaveCount(5);
    await expect(page.locator('.offers > a.offer')).toHaveCount(0);
    expect(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth))).toBeLessThanOrEqual(size.width+3);
  });
}

for(const width of [320,390]){
  test(`mobile ${width}: content remains available with no horizontal clipping`,async({page})=>{
    await page.setViewportSize({width,height:844});
    for(const route of ['/one-place/','/one-place/index.html?area=Money%20%26%20Bills','/one-place/money-bills.html','/','/teal/']){
      await page.goto(route);
      const m=await page.evaluate(()=>({scroll:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),width:window.innerWidth}));
      expect(m.scroll,`${route} mobile horizontal overflow`).toBeLessThanOrEqual(m.width+3);
    }
  });
}

test('all ten lessons expose distinct global destinations',async({page})=>{
  for(let i=1;i<=10;i++){
    await page.goto(`/lessons/${String(i).padStart(2,'0')}/`);
    const nav=page.getByRole('navigation',{name:'One Place and lessons'});
    await expect(nav.getByRole('link',{name:'One Place Home'})).toBeVisible();
    await expect(nav.getByRole('link',{name:'All Lessons'})).toBeVisible();
    await expect(nav.getByRole('link',{name:'One Place Home'})).toHaveAttribute('href','../../index.html');
    await expect(nav.getByRole('link',{name:'All Lessons'})).toHaveAttribute('href','../../human-literacy/index.html#lessons');
  }
});
test('TEAL entrance, message and simple reading offer One Place exit',async({page})=>{
  await page.goto('/teal/');
  await expect(page.getByRole('link',{name:'One Place Home'}).first()).toBeVisible();
  await page.locator('#message-title').scrollIntoViewIfNeeded();
  await expect(page.locator('.site-nav').getByRole('link',{name:'One Place Home'})).toBeVisible();
  await page.goto('/teal/letter.html');
  await expect(page.locator('.reading-header').getByRole('link',{name:'One Place Home'})).toBeVisible();
});

test('OP-104 compact desktop grouped learning links retain 44px targets',async({page})=>{
  await page.setViewportSize({width:1366,height:768});
  await page.goto('/one-place/');
  const nav=page.getByRole('navigation',{name:'One Place navigation'});
  const group=nav.getByRole('group',{name:'Human Literacy: learning'});
  await expect(group).toBeVisible();
  for(const link of await nav.getByRole('link').all()){
    const box=await link.boundingBox();
    expect(box, 'Every learning or TEAL link remains visible').not.toBeNull();
    expect(box.height, 'Readable 44px tap target').toBeGreaterThanOrEqual(44);
  }
});
