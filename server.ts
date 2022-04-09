// const http = require('http');
import {createServer} from 'http';
import { createWriteStream, writeFileSync } from 'fs';
import {parse} from 'querystring'

createServer((req, res) => {
  console.log(req.url);
  if(req.url === '/set-cookie') {
    res.setHeader('Set-Cookie', 'name=value;path=/');
    res.end('Cookie set');
  }else if(req.url === '/set-cookie1') {
    res.setHeader('Set-Cookie', 'name=sss;key=value; SameSite=None; Secure');
    res.end('Cookie set');
  }else if(req.url === '/upload') {
    console.log(req.headers);
    // plan 1
    // let data: Uint8Array[] = [];
    // req.on('data', chunk => {
    //   data.push(chunk);
    // });
    // req.on('end', () => {
    //   const realData = Buffer.concat(data);
    //   writeFileSync('./upload.jpg', realData);
    //   res.end(realData);
    // })
    // plan 2 (best practice)
    req.pipe(createWriteStream('./upload.jpg'));
    res.end('uploaded');
  }
  else {
    res.end('Hello');
  }
}).listen(2022);