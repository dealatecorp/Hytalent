import fs from 'node:fs/promises';
import path from 'node:path';
import opentype from 'opentype.js';

// Clean vector reconstruction from the supplied HYtalent identity reference.
// Lettering is outlined at build time, so no bitmap or runtime font is needed.
export async function createBrandLogo(root) {
  const load = async file => { const bytes = await fs.readFile(file); return opentype.parse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)); };
  const bold = await load('C:/Windows/Fonts/arialbd.ttf');
  const regular = await load('C:/Windows/Fonts/arial.ttf');
  const word = 'HYtalent', tagline = 'LEARNING AND DEVELOPMENT SOLUTIONS';
  const wordScale = 224 / bold.getAdvanceWidth(word, 48);
  const lineScale = 270 / regular.getAdvanceWidth(tagline, 11);
  const mark = '<path fill="#335b8e" d="M2 4h7v12l20 14v12h-7v-9L9 24v18H2z"/><path fill="#4cae66" d="M14 4h7v9l13 9V4h7v38h-7V30L14 16z"/>';
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276 64" role="img" aria-labelledby="brand-title"><title id="brand-title">HYtalent Learning and Development Solutions</title>'
    + '<g transform="translate(0 1)">' + mark + '</g>'
    + '<path fill="#335b8e" transform="translate(49 44) scale(' + wordScale + ' 1)" d="' + bold.getPath(word, 0, 0, 48).toPathData(2) + '"/>'
    + '<path fill="#17272a" transform="translate(2 60) scale(' + lineScale + ' 1)" d="' + regular.getPath(tagline, 0, 0, 11).toPathData(2) + '"/></svg>';
  await fs.mkdir(path.join(root, 'public/logos'), { recursive: true });
  await fs.writeFile(path.join(root, 'public/logos/hytalent.svg'), svg);
  await fs.writeFile(path.join(root, 'public/logos/hytalent-crisp.svg'), svg);
  const light = svg.replace('<path fill="#335b8e" transform=', '<path fill="#f0efdb" transform=').replace('<path fill="#17272a" transform=', '<path fill="#f0efdb" transform=');
  await fs.writeFile(path.join(root, 'public/logos/hytalent-crisp-light.svg'), light);
  await fs.writeFile(path.join(root, 'public/favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44"><title>HYtalent</title>' + mark + '</svg>');
}

if (process.argv[1]?.endsWith('create-brand-logo.mjs')) await createBrandLogo(process.cwd());
