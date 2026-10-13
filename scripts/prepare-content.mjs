import {readdir,readFile,writeFile} from 'node:fs/promises';
const files=(await readdir('site-archive/pages')).filter(f=>f.endsWith('.md'));
const captures=await Promise.all(files.map(f=>readFile('site-archive/pages/'+f,'utf8')));
const contact=captures.find(raw=>raw.includes('source: https://hytalent.in/contact-us/'))||'';
const codes=[...contact.matchAll(/^- (.+?)(\+\d+)\s*$/gm)].map(m=>({country:m[1].trim(),code:m[2]}));
const compact=captures.map(raw=>{
  const popup=raw.indexOf('\nContact Us\n\nPlease prove you are human');
  if(popup!==-1)raw=raw.slice(0,popup);
  const registration=raw.search(/\n### Register Now\s*\n\s*Please prove you are human/);
  if(registration!==-1)raw=raw.slice(0,registration);
  return raw.trim();
});
await writeFile('src/content-pages.json',JSON.stringify(compact,null,2)+'\n');
await writeFile('src/country-codes.json',JSON.stringify(codes,null,2)+'\n');
console.log('Prepared '+compact.length+' content pages and '+codes.length+' country choices.');

