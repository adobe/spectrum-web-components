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
    "revision": "8f5bb99f8a4bcbf60d4b9899a4333899"
  },
  {
    "url": "index.html",
    "revision": "6c23d3f1ce992d6fe7224330cfbdbe0d"
  },
  {
    "url": "inline-entry.0-a3d04e7b.js",
    "revision": "cce60b761b471d3ab6492b347856b70d"
  },
  {
    "url": "inline-entry.0-e9f55b88.js",
    "revision": "3e2e502b104e42bd4ad9b46d976feb4e"
  },
  {
    "url": "legacy/focus-visible-6574220c.js",
    "revision": "fe43681c50e1766060f9e69f5e9ecb2b"
  },
  {
    "url": "legacy/inline-entry.0-5010400e.js",
    "revision": "70bfc9cc1ae236ecaa9cc636d2206fb3"
  },
  {
    "url": "legacy/inline-entry.0-bf00dcea.js",
    "revision": "b425a771aff6c057703349ffecef859c"
  },
  {
    "url": "legacy/lit-html-14d333ae.js",
    "revision": "3dfb5860a2b120b490d033e2d81b1ef0"
  },
  {
    "url": "legacy/storybook-472ebcc0.js",
    "revision": "cfe40145b588e72594d6033940d22002"
  },
  {
    "url": "legacy/storybook-d9cb74a0.js",
    "revision": "9689ca95f53c0f9db8f9161698c89e82"
  },
  {
    "url": "lit-html-f5bc11f1.js",
    "revision": "bcadad9b360ac941ef19880b9361e447"
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
    "url": "polyfills/regenerator-runtime.9090ed1c23690e3072c21a7873cad285.js",
    "revision": "9af9d9e480dfccc420d30729e319b821"
  },
  {
    "url": "polyfills/systemjs.6dfbfd8f2c3e558918ed74d133a6757a.js",
    "revision": "683aabfb9b006607885b83e45e9a1768"
  },
  {
    "url": "polyfills/webcomponents.6954abecfe8b165751e6bc9b0af6c639.js",
    "revision": "894a294495257c3d389efa3e1bd9bde7"
  },
  {
    "url": "storybook-3385f28a.js",
    "revision": "28c4bc2d0230bad66c5ecda7a8ca55d2"
  },
  {
    "url": "storybook-6e6fde52.js",
    "revision": "7f91d24dc7aab37c168828f1145aacd7"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
