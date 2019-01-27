/* following tutorial from 
https://bitsofco.de/setting-up-a-basic-service-worker/
to set-up a basic service worker*/

//set name for the current cache
let cacheName = 'v1';

//degfault files to always cache
let cacheFiles = [
    './',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
    'index.html',
    'restaurant.html'   
]
//install Service Worker
self.addEventListener('install', e => {
    console.log('Service Worker Installed!');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(
    	// Open the cache
        caches.open(cacheName)
        .then(cache => {
	    	// Add all the default files to the cache
            return cache.addAll(cacheFiles);
            console.log('ServiceWorker added all cacheFiles to the cache!');
	    })
	); // end e.waitUntil
});

//Activate Service Worker
self.addEventListener('activate', e => {
    console.log('ServiceWorker Activated');
    e.waitUntil(
    	// Get all the cache keys (cacheName)
        caches.keys()
        .then(cacheName => {
			return Promise.all(cacheNames.map(thisCacheName => {
				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {
					// Delete that cached file
					console.log('ServiceWorker Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	); // end e.waitUntil

});

//Fetch 
self.addEventListener('fetch', e => {
    console.log('ServiceWorker Fetch', e.request.url);
    // event.respondWidth Responds to the fetch event
    e.respondWith(
        // Check in cache for the request being made
        caches.match(e.request)
          .then(response => {
            // Return the cached version or fetch and cache
            return response || fetch(e.request);
        })
    );
});