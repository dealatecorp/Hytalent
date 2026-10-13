import nodemailer from 'nodemailer';

export function createEnquiryHandler({env=process.env, transport, now=Date.now}={}) {
  const attempts=new Map();
  const configured=Boolean(transport || (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASSWORD && env.SMTP_FROM));
  const mailer=transport || (configured?nodemailer.createTransport({
    host:env.SMTP_HOST,port:Number(env.SMTP_PORT||587),secure:env.SMTP_SECURE==='true',
    requireTLS:env.SMTP_SECURE!=='true',auth:{user:env.SMTP_USER,pass:env.SMTP_PASSWORD},
    connectionTimeout:10000,greetingTimeout:10000,socketTimeout:15000,
    disableFileAccess:true,disableUrlAccess:true,
  }):null);
  const reply=(res,status,message)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify({message}));};
  return async function enquiry(req,res,next) {
    if(req.url.split('?')[0]!=='/api/enquiry'){next?.();return;}
    if(req.method!=='POST'){res.setHeader('Allow','POST');reply(res,405,'Use the enquiry form to send a message.');return;}
    if(req.headers.origin){try{if(new URL(req.headers.origin).host!==req.headers.host){reply(res,403,'Please send your enquiry from this website.');return;}}catch{reply(res,403,'Please send your enquiry from this website.');return;}}
    if(!String(req.headers['content-type']).startsWith('application/json')){reply(res,415,'The enquiry could not be read. Please reload and try again.');return;}
    const time=now(),ip=req.socket.remoteAddress||'unknown';
    for(const [key,value] of attempts)if(time-value.start>3600000)attempts.delete(key);
    const record=attempts.get(ip)||{start:time,count:0};
    if(record.count>=5){reply(res,429,'Too many enquiries were attempted. Please try again later or contact us by email.');return;}
    record.count++;attempts.set(ip,record);
    let body='',size=0;
    try{
      for await(const chunk of req){size+=chunk.length;if(size>20000){reply(res,413,'Please shorten your message to 5,000 characters.');return;}body+=chunk.toString();}
      const data=JSON.parse(body);
      const limits={name:120,email:254,phone:25,country:8,program:200,message:5000,website:200};
      for(const [key,max] of Object.entries(limits)){if(typeof data[key]!=='string'||data[key].length>max){reply(res,400,'Check the form fields and try again.');return;}data[key]=data[key].trim();}
      if(data.website || !Number.isFinite(data.startedAt) || time-data.startedAt<1500 || time-data.startedAt>86400000){reply(res,400,'Please review your details and try again.');return;}
      if(!data.name||!data.message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)||/[\r\n]/.test(data.email)||! /^\+\d{1,5}$/.test(data.country)||(data.phone.match(/\d/g)||[]).length<5||!/^[\d\s()+-]+$/.test(data.phone)){reply(res,400,'Enter a name, valid email, phone number and message.');return;}
      if(!configured){reply(res,503,'Online sending is currently unavailable. Please use the email option below or call HYtalent.');return;}
      const name=data.name.replace(/[\r\n]/g,' ');
      const result=await mailer.sendMail({
        from:env.SMTP_FROM||'HYtalent <test@example.test>',
        to:'admin@hytalent.in',replyTo:{name,address:data.email},
        subject:'HYtalent enquiry'+(data.program?' — '+data.program.replace(/[\r\n]/g,' '):''),
        text:['Name: '+name,'Email: '+data.email,'Phone: '+data.country+' '+data.phone,'Program: '+(data.program||'General enquiry'),'',data.message].join('\n'),
      });
      if(!result.accepted?.length){reply(res,502,'The email service could not accept your enquiry. Please try again or use email.');return;}
      reply(res,202,'Your enquiry was accepted for delivery. HYtalent can reply to the email address you provided.');
    }catch(error){reply(res,error instanceof SyntaxError?400:502,error instanceof SyntaxError?'The enquiry could not be read. Please try again.':'We could not send your enquiry. Your details remain here; please try again or use email.');}
  };
}

