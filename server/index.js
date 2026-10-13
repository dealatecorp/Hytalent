import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import {createEnquiryHandler} from './enquiry.js';
try{process.loadEnvFile('.env');}catch(error){if(error.code!=='ENOENT')throw error;}
const root=resolve('dist'),enquiry=createEnquiryHandler();
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json','.woff2':'font/woff2'};
createServer(async(req,res)=>{
  if(req.url.split('?')[0]==='/api/enquiry'){await enquiry(req,res);return;}
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=resolve(root,'.'+pathname);
    if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    if((await stat(file)).isDirectory())file=resolve(file,'index.html');
    const bytes=await readFile(file);
    res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':pathname.startsWith('/media/')||pathname.startsWith('/assets/')?'public, max-age=31536000, immutable':'no-cache'});
    res.end(req.method==='HEAD'?undefined:bytes);
  }catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(resolve(root,'index.html')));}
}).listen(Number(process.env.PORT||4174),process.env.HOST||'127.0.0.1',()=>console.log('HYtalent server ready on port '+(process.env.PORT||4174)));

