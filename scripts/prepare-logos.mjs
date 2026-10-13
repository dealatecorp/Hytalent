import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import tracer from 'imagetracerjs';
import { createBrandLogo } from './create-brand-logo.mjs';

const root = process.cwd();
const manifest = JSON.parse(await fs.readFile(path.join(root, 'src/media-manifest.json'), 'utf8'));
const clients = await fs.readFile(path.join(root, 'site-archive/pages/our-clients.md'), 'utf8');
const urls = [...clients.matchAll(/!\[\]\(([^)]+)\)/g)].map(match => match[1]);
await fs.mkdir(path.join(root, 'public/logos'), { recursive: true });
async function vectorize(input, name, brand = false) {
  let image = sharp(input).flatten({ background: '#ffffff' });
  if (brand) image = image.trim({ background: '#ffffff', threshold: 18 });
  const { data, info } = await image.resize({ width: brand ? 720 : 420 }).median(3).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let svg = tracer.imagedataToSVG({ width: info.width, height: info.height, data: new Uint8ClampedArray(data) }, {
    numberofcolors: brand ? 5 : 12, colorsampling: 1, colorquantcycles: 3,
    ...(brand ? { pal: [{r:255,g:255,b:255,a:255},{r:51,g:88,b:139,a:255},{r:78,g:174,b:101,a:255},{r:31,g:34,b:35,a:255},{r:145,g:157,b:165,a:255}] } : {}),
    ltres: 1, qtres: 1, pathomit: 8, roundcoords: 1, scale: 1, viewbox: true,
    desc: false, blurradius: 0,
  });
  svg = svg.replace(/<path\b[^>]*fill="rgb\((\d+),(\d+),(\d+)\)"[^>]*\/>/g, (tag, r, g, b) => Math.min(+r, +g, +b) >= 250 ? '' : tag);
  if (/<image\b|data:image/i.test(svg)) throw new Error('Raster content in vector output');
  svg = svg.replace(/<svg([^>]*)>/, '<svg$1><title>' + name + '</title>');
  await fs.writeFile(path.join(root, 'public/logos', name + '.svg'), svg);
  return { src: '/logos/' + name + '.svg', width: info.width, height: info.height };
}
const vectors = {};
for (const url of urls) {
  const name = path.basename(new URL(url).pathname).replace(/\.[^.]+$/, '').replace(/-\d+x\d+$/, '').toLowerCase();
  vectors[url] = await vectorize(path.join(root, 'public', manifest[url].src), name);
}
await createBrandLogo(root);
await fs.writeFile(path.join(root, 'src/logo-manifest.json'), JSON.stringify(vectors, null, 2) + '\n');
console.log('Prepared original HYtalent identity and ' + Object.keys(vectors).length + ' client logos as path-only SVGs.');
