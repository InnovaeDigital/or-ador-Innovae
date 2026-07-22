const CACHE_NAME = "innovae-site-cache-v8";
const ASSETS = [
  "/",
  "/index.html",
  "/portfolio.html",
  "/instagram.html",
  "/cliente.html",
  "/manifest.webmanifest",
  "/assets/logo-innovae.png",
  "/assets/app-icon.svg",
  "/assets/analytics.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
