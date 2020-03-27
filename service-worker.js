var cacheName = 'kthoom';
var urlsToCache = [
  '.',
  'code/bitjs/archive/archive.js',
  'code/bitjs/file/sniffer.js',
  'code/bitjs/image/webp-shim/webp-shim.js',
  'code/book-binder.js',
  'code/book-events.js',
  'code/book-viewer.js',
  'code/book.js',
  'code/comic-book-binder.js',
  'code/epub-book-binder.js',
  'code/event-emitter.js',
  'code/helpers.js',
  'code/kthoom-google.js',
  'code/kthoom-ipfs.js',
  'code/kthoom.css',
  'code/kthoom.js',
  'code/menu.js',
  'code/page.js',
  'code/reading-stack.js',
  'code/traceur/traceur.js',
  'images/logo-192.png',
  'images/logo.png',
  'images/logo.svg',
  'index.html',
  'kthoom.webmanifest',
  'service-worker.js',
  'code/epub-book-binder.js',
  'code/comic-book-binder.js'
];

self.addEventListener('install', async event => {
  console.log('install event')
  event.waitUntil(
    caches.open(cacheName)
    .then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );

});

self.addEventListener('fetch', async e => {
  console.log('[Service Worker] Fetched resource ' + e.request.url);

  e.respondWith(
    caches.match(e.request).then((r) => {
      //              console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          //              console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});