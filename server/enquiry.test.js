import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {createEnquiryHandler} from './enquiry.js';

const valid=()=>({name:'Test Visitor',email:'visitor@example.test',phone:'1234567890',country:'+91',program:'Time Management',message:'A test enquiry that must never reach an external recipient.',website:'',startedAt:Date.now()-5000});
async function fixture(t,options){
  const handler=createEnquiryHandler(options);
  const server=createServer(handler);
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>{server.closeAllConnections();server.close();});
  const url='http://127.0.0.1:'+server.address().port+'/api/enquiry';
  return (body=valid(),headers={})=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
}
test('success requires SMTP acceptance; reply-to and recipient are controlled',async t=>{
  let message;
  const post=await fixture(t,{transport:{sendMail:async value=>{message=value;return {accepted:['admin@hytalent.in']};}},env:{SMTP_FROM:'sender@example.test'}});
  const response=await post();
  assert.equal(response.status,202);
  assert.equal(message.to,'admin@hytalent.in');
  assert.equal(message.replyTo.address,'visitor@example.test');
  assert.match((await response.json()).message,/accepted for delivery/);
});
test('missing SMTP reports unavailable instead of fake success',async t=>{
  const post=await fixture(t,{env:{}});
  assert.equal((await post()).status,503);
});
test('validation, honeypot and origin checks prevent sending',async t=>{
  let calls=0;
  const post=await fixture(t,{transport:{sendMail:async()=>{calls++;return {accepted:['admin@hytalent.in']};}}});
  assert.equal((await post({...valid(),email:'invalid'})).status,400);
  assert.equal((await post({...valid(),website:'spam'})).status,400);
  assert.equal((await post(valid(),{Origin:'https://unrelated.example'})).status,403);
  assert.equal(calls,0);
});
test('provider rejection preserves a recoverable error',async t=>{
  const post=await fixture(t,{transport:{sendMail:async()=>({accepted:[]})}});
  assert.equal((await post()).status,502);
});
test('rate limit bounds repeated submission attempts',async t=>{
  const post=await fixture(t,{env:{}});
  for(let i=0;i<5;i++)assert.equal((await post()).status,503);
  assert.equal((await post()).status,429);
});

