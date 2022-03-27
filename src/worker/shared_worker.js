const ports = []
onconnect = function(e) {
  console.log('connected');
  const list = [];
  var port = e.ports[0];
  ports.push(e)
  console.log(e, 'xxxx', ports)
  

  port.addEventListener('message', function(e) {
    console.log('worker recive', e.data);
    list.push(e.data);
    port.postMessage(list);
  });

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
  console.log('after start', e.ports)

  port.addEventListener('close', function(e) {
    console.log('close port', e)
  })
}