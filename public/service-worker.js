
const CACHE_NAME = 'silabalink-cache-v8';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/manifest.json',
  '/favicon.ico',
  '/icons/apple-touch-icon.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/es_dictionary.json'
  // Los assets principales de la app están ahora precacheados.
  // El resto de peticiones (como los scripts de la CDN) se cachearán dinámicamente.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Estrategia: Cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Not in cache - go to network
        return fetch(event.request).then(
          networkResponse => {
            // Check if we received a valid response from the network
            if(!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // We only cache GET requests.
                if (event.request.method === 'GET') {
                    cache.put(event.request, responseToCache);
                }
              });

            return networkResponse;
          }
        );
      })
    );
});


self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Si una caché no está en nuestra lista blanca (porque es una versión vieja), la borramos
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});