const CACHE_NAME = "epl-v5";

const urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/klasemen.html",
  "/pages/saved.html",
  "/pages/team.html",
  "/img/epl.png",
  "/img/icon-192.png",
  "/img/icon-512.png",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/jquery.min.js",
  "/js/nav.js",
  "/js/main.js",
  "/js/api.js",
  "/js/data.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/notification.js"
];

const base_url = 'https://api.football-data.org/v2';

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
	if (event.request.url.indexOf(base_url) > -1) {
		event.respondWith(
			(async () => {
				const cache = await caches.open(CACHE_NAME);
				const res = await fetch(event.request);
				cache.put(event.request.url, res.clone());
				return res;
			})()
		);
	} else {
		event.respondWith(
			(async () => {
				return (
					(await caches.match(event.request.url, {
						ignoreSearch: true,
					})) || (await fetch(event.request))
				);
			})()
		);
	}
});

self.addEventListener('push', (event) => {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	let options = {
		body: body,
		icon: 'img/epl.png',
		badge: 'img/epl.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		},
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});