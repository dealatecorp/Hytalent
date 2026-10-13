import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const archive = await Promise.all((await readdir('site-archive/pages')).filter(f => f.endsWith('.md')).map(f => readFile('site-archive/pages/'+f, 'utf8')));
const source = [...archive, await readFile('src/site-data.js', 'utf8')].join('\n');
const urls = [...new Set(source.match(/https:\/\/hytalent\.in\/wp-content\/uploads\/[^\s)"'<>]+\.(?:jpe?g|png|webp)/gi) || [])];
await mkdir('public/media', { recursive: true });
const manifest = {}, failed = [], upgraded = [], sourceSizes = [];
let cursor = 0;
async function imageAt(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error('HTTP '+response.status);
  const bytes=Buffer.from(await response.arrayBuffer());
  const metadata=await sharp(bytes).metadata();
  return {bytes,metadata,url};
}
async function worker() {
  while (cursor < urls.length) {
    const url=urls[cursor++];
    try {
      let image=await imageAt(url);
      const capturedWidth=image.metadata.width,capturedHeight=image.metadata.height;
      // WordPress thumbnails encode the crop size; verify the associated original,
      // keeping the captured file if there is no larger valid image.
      const original=url.replace(/-\d+x\d+(?=\.(?:jpe?g|png|webp)$)/i,'');
      if(original!==url){
        try{const candidate=await imageAt(original);if(candidate.metadata.width*candidate.metadata.height>image.metadata.width*image.metadata.height)image=candidate;}
        catch{/* The captured file remains a verified fallback. */}
      }
      const {bytes,metadata}=image;
      const swapped=[5,6,7,8].includes(metadata.orientation);
      const width=swapped?metadata.height:metadata.width,height=swapped?metadata.width:metadata.height;
      const id=createHash('sha256').update(url).update(bytes).digest('hex').slice(0,16);
      const extension=new URL(image.url).pathname.match(/\.(jpe?g|png|webp)$/i)[1].toLowerCase();
      const originalPath='/media/'+id+'-original.'+extension;
      // Preserve the exact downloaded bytes for the full-size photo/lightbox.
      await writeFile('public'+originalPath,bytes);
      const widths=[640,1280,1920].filter(w=>w<width);
      for(const target of widths)await sharp(bytes).rotate().resize({width:target,withoutEnlargement:true}).webp({lossless:true}).toFile('public/media/'+id+'-'+target+'.webp');
      manifest[url]={src:originalPath,srcSet:[...widths.map(w=>'/media/'+id+'-'+w+'.webp '+w+'w'),originalPath+' '+width+'w'].join(', '),width,height,source:image.url,capturedWidth,capturedHeight};
      if(image.url!==url)upgraded.push({captured:url,original:image.url,from:[capturedWidth,capturedHeight],to:[width,height]});
      sourceSizes.push({url:image.url,width,height});
    }catch(error){failed.push({url,error:error.message});}
  }
}
await Promise.all(Array.from({length:5},worker));
await writeFile('src/media-manifest.json',JSON.stringify(manifest,null,2)+'\n');
await writeFile('site-archive/MEDIA-STATUS.json',JSON.stringify({downloaded:Object.keys(manifest).length,upgraded,sourceSizes,failed},null,2)+'\n');
console.log('Prepared '+Object.keys(manifest).length+' original-quality local images; '+upgraded.length+' resolution upgrades; '+failed.length+' unavailable.');

