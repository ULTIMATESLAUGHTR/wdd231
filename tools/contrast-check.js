const fs = require('fs');
const path = require('path');

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(h => h+h).join('');
  const r = parseInt(hex.substr(0,2),16)/255;
  const g = parseInt(hex.substr(2,2),16)/255;
  const b = parseInt(hex.substr(4,2),16)/255;
  return {r,g,b};
}

function lumChannel(c){
  return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
}

function luminance(hex){
  const {r,g,b} = hexToRgb(hex);
  return 0.2126*lumChannel(r) + 0.7152*lumChannel(g) + 0.0722*lumChannel(b);
}

function contrast(hex1, hex2){
  const L1 = luminance(hex1);
  const L2 = luminance(hex2);
  const lighter = Math.max(L1,L2);
  const darker = Math.min(L1,L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseVars(cssPath){
  const text = fs.readFileSync(cssPath,'utf8');
  const rootMatch = text.match(/:root\s*\{([\s\S]*?)\}/m);
  const vars = {};
  if (!rootMatch) return vars;
  const body = rootMatch[1];
  const re = /--([a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g;
  let m;
  while((m=re.exec(body))!==null){
    vars[m[1]] = m[2].trim();
  }
  return vars;
}

const smallCss = path.resolve(__dirname, '..', 'course-home-page', 'styles', 'small.css');
const largeCss = path.resolve(__dirname, '..', 'course-home-page', 'styles', 'large.css');
const smallVars = parseVars(smallCss);
const largeVars = parseVars(largeCss);

// prefer small.css vars, fallback to large.css
const vars = Object.assign({}, largeVars, smallVars);

function resolveColor(token){
  if(!token) return null;
  token = token.trim();
  if(token.startsWith('var(')){
    const name = token.replace(/var\((--[a-zA-Z0-9-_]+)\)/,'$1').replace('--','');
    return vars[name] || null;
  }
  return token;
}

const pairs = [
  {name: 'nav link text on nav background', text: 'var(--primary-bg-color)', bg: 'var(--secondary-color)'},
  {name: 'header-title text on header bg', text: 'var(--primary-bg-color)', bg: 'var(--secondary-color)'},
  {name: 'filter-btn default text on background', text: 'var(--secondary-color)', bg: 'var(--secondary-bg-color)'},
  {name: 'filter-btn hover text on background', text: 'var(--primary-bg-color)', bg: 'var(--primary-color)'},
  {name: 'footer text on footer bg', text: 'var(--primary-bg-color)', bg: 'var(--secondary-color)'},
  {name: 'course-item text on background', text: 'var(--secondary-color)', bg: 'var(--primary-bg-color)'},
  {name: 'student-photo-title text on bg', text: 'var(--primary-bg-color)', bg: 'var(--primary-color)'}
];

console.log('Resolved CSS variables (sample):');
for(const k of ['primary-color','secondary-color','primary-bg-color','secondary-bg-color','accent-color']){
  console.log(`--${k}: ${vars[k]}`);
}

console.log('\nContrast report (ratio, passes AA 4.5):');
let failCount = 0;
for(const p of pairs){
  const t = resolveColor(p.text);
  const b = resolveColor(p.bg);
  if(!t || !b){
    console.log(`${p.name}: missing variable (${p.text} or ${p.bg})`);
    continue;
  }
  // strip possible whitespace and fallback comments
  const tHex = t.replace(/\s*!important/,'').trim();
  const bHex = b.replace(/\s*!important/,'').trim();
  const ratio = contrast(tHex, bHex);
  const pass = ratio >= 4.5;
  if(!pass) failCount++;
  console.log(`${p.name}: ${tHex} on ${bHex} -> ${ratio.toFixed(2)} :1 -> ${pass? 'PASS':'FAIL'}`);
}

process.exit(failCount>0?1:0);
