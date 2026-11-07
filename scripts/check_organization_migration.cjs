'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const script = fs.readFileSync('teal/teal.js', 'utf8');
const canonical = 'https://ouroneplace.github.io/teal/';
const publicLocation = { origin: 'https://ouroneplace.github.io', pathname: '/teal/', search: '?fictional=do-not-share', hash: '#do-not-share' };
function setup(location, navigator = {}) {
  const nodes = Object.fromEntries(['share-status','share-invitation','copy-invitation','manual-copy','invitation-text','share-copy'].map(id => [id, { hidden:true, textContent:'', value:'', events:{}, addEventListener(k,v){this.events[k]=v;},focus(){},select(){} }]));
  nodes['share-copy'].textContent = 'An invitation to practice respect.';
  vm.runInNewContext(script, { document: { getElementById:id=>nodes[id], querySelectorAll:()=>[] }, navigator, location });
  return nodes;
}
(async () => {
  let passed=0;
  for (const pathname of ['/teal/', '/teal/index.html']) {
    let sent;
    const nodes=setup({...publicLocation,pathname}, {share:async data=>{sent=data;}});
    assert.equal(nodes['invitation-text'].value, nodes['share-copy'].textContent+'\n'+canonical);
    await nodes['share-invitation'].events.click();
    assert.equal(sent.url,canonical);
    assert.ok(!JSON.stringify(sent).includes('do-not-share'));
    passed++;
  }
  for (const location of [
    {origin:'http://localhost:8765',pathname:'/teal/'},
    {origin:'https://ouroneplace.github.io.evil.example',pathname:'/teal/'},
    {origin:'http://ouroneplace.github.io',pathname:'/teal/'},
    {origin:'https://ouroneplace.github.io',pathname:'/unpublished/teal/'},
  ]) {
    let copied;
    const nodes=setup(location,{clipboard:{writeText:async text=>{copied=text;}}});
    await nodes['copy-invitation'].events.click();
    assert.equal(copied,nodes['share-copy'].textContent);
    assert.ok(!copied.includes('http'));
    passed++;
  }
  for (const file of ['teal/index.html','teal/letter.html']) {
    assert.ok(fs.readFileSync(file,'utf8').includes('<link rel="canonical" href="'+canonical+'">'));
    passed++;
  }
  console.log('Organization canonical/share checks:',passed,'passed; previews and lookalike hosts never share an address.');
})().catch(e=>{console.error(e);process.exitCode=1;});
