console.log('service_worker');

self.addEventListener('install', (event) => {
  console.log('installed');
});

self.addEventListener('fetch', (event) => {
  console.log('fetch in service_worker', event.request.url);
  event.waitUntil(
    Promise.resolve(1).then(() => {
      if (event.request.url.includes('/api/default')) {
        event.respondWith(new Response('mock response'));
      }
    })
  );
});
