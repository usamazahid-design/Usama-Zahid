const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'usamazahid_25-oct-2026_page-has-links-to-brok_2026-10-25_12-27-12.csv');
const content = fs.readFileSync(csvPath, 'utf16le');

const rows = [];
let cur = '';
let inQuotes = false;

for (let i = 0; i < content.length; i++) {
  const c = content[i];
  if (c === '"') {
    inQuotes = !inQuotes;
    cur += c;
  } else if (c === '\n' && !inQuotes) {
    rows.push(cur.trim());
    cur = '';
  } else {
    cur += c;
  }
}
if (cur) rows.push(cur.trim());

console.log('Total parsed rows:', rows.length);

const results = [];

rows.slice(1).forEach((r) => {
  const cols = r.split('\t').map((s) => s.replace(/^"|"$/g, '').trim());
  const pr = cols[0];
  const pageUrl = cols[1];
  const pageTitle = cols[2];
  const internalBroken = cols[8];
  const externalBroken = cols[11];

  if (internalBroken || externalBroken) {
    results.push({
      pageUrl,
      internalBroken: internalBroken ? internalBroken.split(/[\r\n]+/).filter(Boolean) : [],
      externalBroken: externalBroken ? externalBroken.split(/[\r\n]+/).filter(Boolean) : [],
    });
  }
});

console.log('Total pages with broken links:', results.length);
results.forEach((res, idx) => {
  console.log(`[${idx + 1}] Source: ${res.pageUrl}`);
  if (res.internalBroken.length > 0) {
    console.log('   Internal Broken:');
    res.internalBroken.forEach((link) => console.log('     -> ' + link));
  }
  if (res.externalBroken.length > 0) {
    console.log('   External Broken:');
    res.externalBroken.forEach((link) => console.log('     -> ' + link));
  }
});
