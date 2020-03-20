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
    "revision": "af758d127d5e1d262f9064d45d4cca51"
  },
  {
    "url": "index.html",
    "revision": "3d682dc110ef4cd0d071721659666edd"
  },
  {
    "url": "inline-entry.0-027b9b2b.js",
    "revision": "5bb892d68f639617bd905fd03b9a21c1"
  },
  {
    "url": "inline-entry.0-73eedab9.js",
    "revision": "90a64e3eab38a019c8669513dc1fb57b"
  },
  {
    "url": "legacy/focus-visible-c7f80765.js",
    "revision": "de449b04172ec2aeb92019078e29c0f0"
  },
  {
    "url": "legacy/inline-entry.0-02244601.js",
    "revision": "d9af3aa17a3591dd7bdb51e6e2bba05b"
  },
  {
    "url": "legacy/inline-entry.0-7fb3b0e2.js",
    "revision": "17def4feacf605bdfac4e0d107d1f742"
  },
  {
    "url": "legacy/lit-html-9bfe3b51.js",
    "revision": "5c539f5b28099e45aa5246095cad9611"
  },
  {
    "url": "legacy/storybook-9dc97b03.js",
    "revision": "4ce411166d788b9bf9b568cd6cf62990"
  },
  {
    "url": "legacy/storybook-c6a377c7.js",
    "revision": "3af0dd5bda3cd025c696c7dc317c8e50"
  },
  {
    "url": "lit-html-2a7d0a80.js",
    "revision": "5a9663365f6d368d0b32fadf74b5083c"
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
    "url": "storybook-41472cde.js",
    "revision": "a9b332b8e8bb8da5a15e62f479523de1"
  },
  {
    "url": "storybook-b723b69c.js",
    "revision": "f2044a3d9b932c7b4438149381a9f190"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
