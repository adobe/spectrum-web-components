/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "focus-visible-7f07070e.js",
    "revision": "6a4e56cde425bc2710e4cc205a97f467"
  },
  {
    "url": "iframe.html",
    "revision": "5bde2c939c41218a9af38f1bd3d865e9"
  },
  {
    "url": "index.html",
    "revision": "3d682dc110ef4cd0d071721659666edd"
  },
  {
    "url": "inline-entry.0-73eedab9.js",
    "revision": "90a64e3eab38a019c8669513dc1fb57b"
  },
  {
    "url": "inline-entry.0-b7a50ea0.js",
    "revision": "c5daf03b6925b897c765352f7f1efaed"
  },
  {
    "url": "legacy/focus-visible-9f6cb534.js",
    "revision": "ba0787c1522ac0c565eb7dd54b0f48c0"
  },
  {
    "url": "legacy/inline-entry.0-7fb3b0e2.js",
    "revision": "17def4feacf605bdfac4e0d107d1f742"
  },
  {
    "url": "legacy/inline-entry.0-890cc4d6.js",
    "revision": "8d3230b194ac21ec5d60bc61f50de472"
  },
  {
    "url": "legacy/lit-html-7827e195.js",
    "revision": "22d8c058068c38c8de632bef245cf7c3"
  },
  {
    "url": "legacy/storybook-2f9513ae.js",
    "revision": "1677be802b58fb32d4402b43d38edb6f"
  },
  {
    "url": "legacy/storybook-9dc97b03.js",
    "revision": "4ce411166d788b9bf9b568cd6cf62990"
  },
  {
    "url": "lit-html-426aeb1f.js",
    "revision": "e694e26ce2f2cadb00285d2d60ee4a73"
  },
  {
    "url": "polyfills/core-js.577a5602a7262d6256830802d4aaab43.js",
    "revision": "ccf205728fe514f8276191669b5ea48d"
  },
  {
    "url": "polyfills/custom-elements-es5-adapter.84b300ee818dce8b351c7cc7c100bcf7.js",
    "revision": "cff507bc95ad1d6bf1a415cc9c8852b0"
  },
  {
    "url": "polyfills/dynamic-import.b745cfc9384367cc18b42bbef2bbdcd9.js",
    "revision": "ed55766050be285197b8f511eacedb62"
  },
  {
    "url": "polyfills/fetch.191258a74d74243758f52065f3d0962a.js",
    "revision": "fcdc4efda1fe1b52f814e36273ff745d"
  },
  {
    "url": "polyfills/regenerator-runtime.92d44da139046113cb3739b173605787.js",
    "revision": "3aa324bcf8f59cd0eebf46796948aafa"
  },
  {
    "url": "polyfills/systemjs.6dfbfd8f2c3e558918ed74d133a6757a.js",
    "revision": "683aabfb9b006607885b83e45e9a1768"
  },
  {
    "url": "polyfills/webcomponents.d406f4685fdfb412c61f23b3ae18f2dc.js",
    "revision": "b1db7cb76380495a55ff4f65a9648f0e"
  },
  {
    "url": "storybook-1813304e.js",
    "revision": "951ff74227d06dd68756d4b26e786227"
  },
  {
    "url": "storybook-41472cde.js",
    "revision": "a9b332b8e8bb8da5a15e62f479523de1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
