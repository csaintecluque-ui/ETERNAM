/* Eternam PWA — cache hors ligne de l'appli (le jeu lui-même est stocké dans IndexedDB). */
const VERSION = 'eternam-v4';
const ASSETS = [
  './', 'index.html', 'manifest.webmanifest',
  'icons/favicon.svg', 'icons/eternam-icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png',
  'vendor/fflate.js', 'vendor/js-dos/js-dos.js', 'vendor/js-dos/js-dos.css',
  'vendor/js-dos/emulators/emulators.js', 'vendor/js-dos/emulators/wdosbox.js', 'vendor/js-dos/emulators/wdosbox.wasm',
  'vendor/js-dos/emulators/wlibzip.js', 'vendor/js-dos/emulators/wlibzip.wasm'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // Page principale : réseau d'abord (mises à jour immédiates), cache si hors ligne.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return res;
    }).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => req.mode === 'navigate' ? caches.match('index.html') : Response.error()))
  );
});
