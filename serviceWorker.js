const staticCache = "site-static-v2";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/manifest.json",
  "/app.js",
  "/assets/boxshot.png",
  "/assets/device-pile-in.png",
  "/assets/IN-en-20200817-popsignuptwoweeks-perspective_alpha_website_small.png",
  "/assets/mobile-0819.png",
  "/assets/netflixFavicon.png",
  "/assets/netflix192.png",
  "/assets/netflix512.png",
  "/assets/netflixlogo.png",
  "/assets/tv.png",
  "/assets/video-devices-in.m4v",
  "/assets/video-tv-in-0819.m4v",
  "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCache).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return cacheRes || fetch(e.request);
    })
  );
});
