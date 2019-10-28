console.log('serviceWorker server is here...');

const CACHE_NAME = 'typing-school-v01';

const CACHE_URLS_INIT = [
  '/',
  '/public/main.css',
  '/public/favicon.ico',
  '/public/js/worker.js',
  '/public/js/bundle.js',
  '/public/manifest.json',
  '/public/404.html'
];

const CACHE_URL_LAZY_LOAD = [
  '/api?language=en&mode=200',
  '/api?language=en&mode=1000',
  '/api?language=si&mode=200',
  '/api?language=si&mode=1000'
];

self.addEventListener('install', (event) => {
  console.log('serviceWorker is installing...', 'let\'s add to cache', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(CACHE_URLS_INIT).then(() => {
        cache.addAll(CACHE_URL_LAZY_LOAD)
        .then(() => console.log('urls loaded to cache:', CACHE_URL_LAZY_LOAD));
        console.log('urls loaded to cache:', CACHE_URLS_INIT);
      })
      .catch((error) => console.log('addCacheRespsonse ERROR:', error));
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('serviceWorker server here: is activating...', 'let\'s delete old caches');
  caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
      .map((cacheName) => {
        caches.delete(cacheName);
      })
    );
  });
});

self.addEventListener('fetch', (event) => {
  console.log('serviceWorker server here: is fetching...', event.request.url);
  // if (event.request.url.substr(0, 4) === 'http') {}
  event.respondWith(caches.match(event.request)
  .then((response) => {
    if (response !== undefined) {
      console.log('serviceWorker here: serving cached files...', event.request.url);
      return response;
    } else {
      return fetch(event.request)
      .then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseClone = response.clone();
        console.log('serviceWorker here: saving fetch response to cache...', event.request.url);

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
      })
      .catch(function () {
        return caches.match('/public/404.html');
      });
    }
  }));
});
