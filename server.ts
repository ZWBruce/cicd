const http = require('http');

http.createServer((req, res) => {
  console.log(req.url);
  if(req.url === '/set-cookie') {
    res.setHeader('Set-Cookie', 'name=value;path=/');
    res.end('Cookie set');
  }else if(req.url === '/set-cookie1') {
    res.setHeader('Set-Cookie', 'name=sss;key=value; SameSite=None; Secure');
    res.end('Cookie set');
  }else {
    res.end('Hello');
  }
}).listen(2022);