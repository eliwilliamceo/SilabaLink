
const CACHE_NAME = 'silabalink-cache-v5';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/manifest.json'
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
  // Estrategia: Cache, falling back to network
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la respuesta está en la caché, la retornamos
        if (response) {
          return response;
        }

        // Si no, vamos a la red
        return fetch(event.request).then(
          response => {
            // Validamos que la respuesta de red sea correcta antes de cachearla
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonamos la respuesta para poder retornarla y guardarla en caché
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
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