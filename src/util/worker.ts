const { port } = new SharedWorker('src/worker/shared_worker.js', { name: 'zwtest' });

port.start();

export default port;