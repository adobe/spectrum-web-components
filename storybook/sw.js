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
    "url": "action-button.stories-1c1e420f.js",
    "revision": "2704ce1f9183f0c706720b4a2708d7bd"
  },
  {
    "url": "action-menu.stories-0b6d013c.js",
    "revision": "9c856429484d9c4a7e4fd804cf423350"
  },
  {
    "url": "actionbar.stories-a2f04512.js",
    "revision": "630d8f762277c90e9c29fe8000ff60bb"
  },
  {
    "url": "avatar.stories-786ef4b4.js",
    "revision": "7eb83e5c970685cc43eb56e06821ed0a"
  },
  {
    "url": "banner.stories-d551ce55.js",
    "revision": "37c9577fdf806a18c631d264809c3e19"
  },
  {
    "url": "button.stories-90a66541.js",
    "revision": "b1558002395024f0bae32ce60d177530"
  },
  {
    "url": "card.stories-d7a5495f.js",
    "revision": "b7fadd96bc6ed79cc86e39e2947c8198"
  },
  {
    "url": "checkbox-base-6ecca498.js",
    "revision": "e97d59c472b9b53888ad45500e71cbf0"
  },
  {
    "url": "checkbox.stories-7f877d7e.js",
    "revision": "94706a87c5c424ac7a1ec42b4fc98eb0"
  },
  {
    "url": "circleloader.stories-38c7b31a.js",
    "revision": "d1ca41cb1820cb35a349a343a6177da1"
  },
  {
    "url": "dropdown.stories-a6c95206.js",
    "revision": "8492a4f5a4d0882bd64d559ee2cb27aa"
  },
  {
    "url": "dropzone.stories-76123b61.js",
    "revision": "f9eeee706dd787b3379a2aaf42cbd085"
  },
  {
    "url": "focus-visible-7f07070e.js",
    "revision": "6a4e56cde425bc2710e4cc205a97f467"
  },
  {
    "url": "focusable-b12aa67a.js",
    "revision": "5156eb16a54bf4c69dc4f9fb08fcbff2"
  },
  {
    "url": "icon.stories-dd98fd8f.js",
    "revision": "c430fe2b8826be33eca7df70c066748b"
  },
  {
    "url": "icons.stories-6d7c912e.js",
    "revision": "06ca77ef306182d9f249a54fe2eab6c1"
  },
  {
    "url": "iconset-svg-5d368e15.js",
    "revision": "02736a20b2f914dbd6dd6a58eee61dba"
  },
  {
    "url": "if-defined-b94f78ef.js",
    "revision": "c9dbfdbd0ab02ceda7dfd5c9bc5fcc08"
  },
  {
    "url": "iframe.html",
    "revision": "90c7fcc81aaae6408af6e69584d5fd12"
  },
  {
    "url": "illustrated-message.stories-3b10a669.js",
    "revision": "2148ff2da5886b9cfe131d1a386e1593"
  },
  {
    "url": "index-0a4961e4.js",
    "revision": "258a4809516177f0d3bda323fba7bc68"
  },
  {
    "url": "index-16394ca3.js",
    "revision": "9b1c7a8d7f3d32ab463755687624e92d"
  },
  {
    "url": "index-1a77ad04.js",
    "revision": "3609dc1927fb02526014e42f338afdb1"
  },
  {
    "url": "index-2268ac09.js",
    "revision": "5bd89b9806f13a991986215fe8b0628d"
  },
  {
    "url": "index-22b96bdd.js",
    "revision": "0ed8147dc3402cd2d8a4d375ca2598a8"
  },
  {
    "url": "index-4a36ac47.js",
    "revision": "4428888aaa84f772b46c45b6b0b2525b"
  },
  {
    "url": "index-592237ae.js",
    "revision": "e8595d7bf5653ae72bfd1186c0cad55b"
  },
  {
    "url": "index-6a7dd94f.js",
    "revision": "fb3e8a8d559f3d79d875184a30b26461"
  },
  {
    "url": "index-6ffc8a58.js",
    "revision": "1cbc3d15d61575e4d391a24f930177de"
  },
  {
    "url": "index-7dda8932.js",
    "revision": "7faaa325128f9de4e418a51984de14ed"
  },
  {
    "url": "index-a18ca6b2.js",
    "revision": "dab49cd392fe89006500ba30a69774a8"
  },
  {
    "url": "index-d58ab459.js",
    "revision": "6ff2fb27d8c00aee3c9ba4d4863ab685"
  },
  {
    "url": "index-e4452e6e.js",
    "revision": "5f5dd1a1df90b8746945f4a1514aa6ff"
  },
  {
    "url": "index-fbb632ee.js",
    "revision": "ea9096c8010243aec3382a9d89df7c2f"
  },
  {
    "url": "index.html",
    "revision": "fc29a281b95c188081dee5499c11a46a"
  },
  {
    "url": "inline-entry.0-f69cf042.js",
    "revision": "6cb5f6d1fc6236878fa5d25008c100fb"
  },
  {
    "url": "legacy/action-button.stories-c515bd69.js",
    "revision": "dad74c63cb8b2b10a3ee5e34027c74dd"
  },
  {
    "url": "legacy/action-menu.stories-1b3d4ade.js",
    "revision": "921738185d0408294371a46af029c6b1"
  },
  {
    "url": "legacy/actionbar.stories-1e0977e8.js",
    "revision": "9c5ac61b7dc18e1861967fdca38c5dd4"
  },
  {
    "url": "legacy/avatar.stories-cf4f13bd.js",
    "revision": "7e7d7fdd5dcf260015e04fb285b3b5a1"
  },
  {
    "url": "legacy/banner.stories-59f40e2d.js",
    "revision": "5688a908c36d26724f015f7dfd90bb3c"
  },
  {
    "url": "legacy/button.stories-c3ee68bb.js",
    "revision": "7a15817243e80b03b440c464e34849ad"
  },
  {
    "url": "legacy/card.stories-2094796a.js",
    "revision": "01face9b07bb3132c1597f97f9e2f023"
  },
  {
    "url": "legacy/checkbox-base-836d0de9.js",
    "revision": "065934ebb47203674546bc2cf85f9253"
  },
  {
    "url": "legacy/checkbox.stories-8636662e.js",
    "revision": "68816d8957d3ee0e0e04b1891619401f"
  },
  {
    "url": "legacy/circleloader.stories-d659829d.js",
    "revision": "ed36273d1ac6daffcf021eb335395c6c"
  },
  {
    "url": "legacy/dropdown.stories-b11185e1.js",
    "revision": "b48edc29772baf471042ab793841afbd"
  },
  {
    "url": "legacy/dropzone.stories-8c856e05.js",
    "revision": "28b1c30781d0ec10f63e1839a5fe3526"
  },
  {
    "url": "legacy/focus-visible-6c56a372.js",
    "revision": "b60dd19319244f8911f64ee32a27217f"
  },
  {
    "url": "legacy/focusable-4eab47af.js",
    "revision": "4795d6a5934de237ce11ec04e9416fa7"
  },
  {
    "url": "legacy/icon.stories-25cdd8a9.js",
    "revision": "d89c50de7e390cd1c79d8438b1c8d405"
  },
  {
    "url": "legacy/icons.stories-105ea7f9.js",
    "revision": "d74cdff7df5ae5b1947033c38bf7acd0"
  },
  {
    "url": "legacy/iconset-svg-8781c76c.js",
    "revision": "78e5dc91930b5fcf235c42abdb5499a6"
  },
  {
    "url": "legacy/if-defined-9f986fc4.js",
    "revision": "3d2c1f19fae930bbe6ff9dbcfea8e8b3"
  },
  {
    "url": "legacy/illustrated-message.stories-121aad8a.js",
    "revision": "092e03a3f5adea7948035ab6fb5cb6f3"
  },
  {
    "url": "legacy/index-08d4a98b.js",
    "revision": "e9d0aeaaeef428260500308ec0cbb1ed"
  },
  {
    "url": "legacy/index-110a4fc3.js",
    "revision": "f4f3da4ff3eb35c31ea9e471b0908366"
  },
  {
    "url": "legacy/index-1ef93d4f.js",
    "revision": "fd1164b2100e843b9dd616bce2b0f8ac"
  },
  {
    "url": "legacy/index-383ee2c3.js",
    "revision": "7caf1208549fec8c3713c06c75ec3a7b"
  },
  {
    "url": "legacy/index-45429b5b.js",
    "revision": "988ee41efe32a996a93e1959044e2f88"
  },
  {
    "url": "legacy/index-4b7bdaed.js",
    "revision": "d83c9ca4abb9ed7b8c1a40034c0e3cf2"
  },
  {
    "url": "legacy/index-6437adec.js",
    "revision": "792b6835a39624678f5bf99d3804093c"
  },
  {
    "url": "legacy/index-72412263.js",
    "revision": "8880b03dde1d3f39a65d82fc4489700e"
  },
  {
    "url": "legacy/index-84a7c799.js",
    "revision": "eafa40edd9d2251904849c8529e7eec7"
  },
  {
    "url": "legacy/index-8889a3b5.js",
    "revision": "9696b6e3474e925e5745f5df3eb87469"
  },
  {
    "url": "legacy/index-a31e4f22.js",
    "revision": "433a66fbd0036ff2b98903c776c0a186"
  },
  {
    "url": "legacy/index-aec7560d.js",
    "revision": "56661ebc221b7ea293f74558267e346a"
  },
  {
    "url": "legacy/index-bed75786.js",
    "revision": "e7ed78af3f715d0424c8570f210c34bc"
  },
  {
    "url": "legacy/index-d598c1f9.js",
    "revision": "53f422b6d04a4b36f31ba26542afa86b"
  },
  {
    "url": "legacy/inline-entry.0-54d0b03a.js",
    "revision": "4a6ada92525380a8f5bfe6b1c91bdfc3"
  },
  {
    "url": "legacy/link.stories-80305446.js",
    "revision": "b09f7d0db6d51ffbee6f0d0945033f9b"
  },
  {
    "url": "legacy/lit-element-02beee92.js",
    "revision": "155b37c8f78fd57cb3ad331b5b8ef548"
  },
  {
    "url": "legacy/menu.stories-6ecc3588.js",
    "revision": "9e39b4480926de442e67fb21e55fe3f9"
  },
  {
    "url": "legacy/observe-slot-text-0a9e1768.js",
    "revision": "f128fcfb60f15316637dde574a0b77b9"
  },
  {
    "url": "legacy/overlay.stories-391d0279.js",
    "revision": "db6e4d8c7cbe6b3f868692e9b2751a55"
  },
  {
    "url": "legacy/popover.stories-a1c88499.js",
    "revision": "c350a8ba90e75a8b8892cbb029af2df4"
  },
  {
    "url": "legacy/preview-53711b0a.js",
    "revision": "5e4e8eb8742ffe9d90fc7e237d70fe0a"
  },
  {
    "url": "legacy/radio.stories-79947c1e.js",
    "revision": "a8118a3aae5c97662c91efc9ab67fcc1"
  },
  {
    "url": "legacy/search.stories-f85492fd.js",
    "revision": "9b6d1d0e91f25cbfd8ed057f170b9ef0"
  },
  {
    "url": "legacy/sidenav.stories-afd93e8c.js",
    "revision": "bba06043cb66aa856163ad2db8c17b70"
  },
  {
    "url": "legacy/slider.stories-b27d4ec8.js",
    "revision": "f14d90ef46a7e61166ca13896fd7da92"
  },
  {
    "url": "legacy/spectrum-icon-alert-small.css-e88625d3.js",
    "revision": "5a9bea98f143207b77437b6d22f818fd"
  },
  {
    "url": "legacy/spectrum-icon-checkmark-small.css-a04852c7.js",
    "revision": "cb65512c6744a2246e50a2dc72695263"
  },
  {
    "url": "legacy/status-light.stories-ba2531e1.js",
    "revision": "4ef7d4cc7089a2618225ae385462e2f2"
  },
  {
    "url": "legacy/switch.stories-2dbdd7b2.js",
    "revision": "f6d0308642f1b541281cbc718a396905"
  },
  {
    "url": "legacy/tabs.stories-804812c9.js",
    "revision": "b822468159eaefb63b7b3e4cadc22e07"
  },
  {
    "url": "legacy/textarea.stories-b7281d7d.js",
    "revision": "c98b772f51aa408920d4d8e68b6ccf75"
  },
  {
    "url": "legacy/textfield.stories-2ac175f9.js",
    "revision": "d04574da64a3cfabf53321287d9535e8"
  },
  {
    "url": "legacy/theme.stories-b4204e21.js",
    "revision": "9d8042091c73d2aa036bd2427f9523a0"
  },
  {
    "url": "legacy/toast.stories-58520cbf.js",
    "revision": "bce2dd41b73d03025219e340ab9b297e"
  },
  {
    "url": "legacy/tooltip.stories-ef040c4d.js",
    "revision": "ceaf8e1475916b18c3305af5434a1281"
  },
  {
    "url": "legacy/tslib.es6-dba2d4a0.js",
    "revision": "733ddea328a03716ebdd7e4a77db52cb"
  },
  {
    "url": "link.stories-25a193fd.js",
    "revision": "c1ceab6fe9cbb3b11420c70c9c035c9b"
  },
  {
    "url": "lit-element-45614e86.js",
    "revision": "0cef472702aff0b266ebbbca7ac59da8"
  },
  {
    "url": "menu.stories-4ca8c102.js",
    "revision": "99787c4cdb0e481fec99d493066aa6f2"
  },
  {
    "url": "observe-slot-text-5194cee4.js",
    "revision": "1a06a2bbfd38b40f3331174ad07eceab"
  },
  {
    "url": "overlay.stories-3a43641a.js",
    "revision": "52d112bc70937d2cdc8d78de710f3ce0"
  },
  {
    "url": "polyfills/core-js.b2c7423344f27be9129697050c5c57bd.js",
    "revision": "b6a3ab68f3000b5041b3b699f115b619"
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
    "url": "polyfills/fetch.e0fa1d30ce1c9b23c0898a2e34c3fe3b.js",
    "revision": "16a2d81480a8b178ad740f425229fe34"
  },
  {
    "url": "polyfills/regenerator-runtime.323cb013cc2a9c88ff67ee256cbf5942.js",
    "revision": "076165f8bec91d0f16c0b51615ef95a4"
  },
  {
    "url": "polyfills/systemjs.6dfbfd8f2c3e558918ed74d133a6757a.js",
    "revision": "683aabfb9b006607885b83e45e9a1768"
  },
  {
    "url": "polyfills/webcomponents.dae9f79d9d6992b6582e204c3dd953d3.js",
    "revision": "fe4a22f36087db029cd3f476a1935410"
  },
  {
    "url": "popover.stories-da8b0adb.js",
    "revision": "aa4909b0bc4006843c35d0ce1e4c83b4"
  },
  {
    "url": "preview-f794bb5d.js",
    "revision": "af684315b5cc32d9c8e8c013d5f3aede"
  },
  {
    "url": "radio.stories-74b7149c.js",
    "revision": "f4cb2dc48248deeb495a08d5da85e177"
  },
  {
    "url": "search.stories-3eb06c49.js",
    "revision": "13d26822ebb1d15e273159c1b8809ea2"
  },
  {
    "url": "sidenav.stories-ee03c5ba.js",
    "revision": "0212808aa710848c9e7232198333f559"
  },
  {
    "url": "slider.stories-ee5b5fca.js",
    "revision": "eb774bb2dd09df876dfd985e796aba93"
  },
  {
    "url": "spectrum-icon-alert-small.css-b909ec33.js",
    "revision": "cdd529243a32148b4a1b9a7b1e09f036"
  },
  {
    "url": "spectrum-icon-checkmark-small.css-0cf26621.js",
    "revision": "0a74cee1be1b9611ba26fe617bb532c5"
  },
  {
    "url": "status-light.stories-690a34d8.js",
    "revision": "6dff422915f991a5d149272b70deaa82"
  },
  {
    "url": "switch.stories-72f9ec87.js",
    "revision": "197fdbcb162abf89acb955146ca01b20"
  },
  {
    "url": "tabs.stories-8554b9b1.js",
    "revision": "e897e3d960898e390518af725b627e73"
  },
  {
    "url": "textarea.stories-d6c943b9.js",
    "revision": "51fb05230749a6980d13356b27c27c3d"
  },
  {
    "url": "textfield.stories-2363a0b7.js",
    "revision": "e0d324a2261f6caab5412095fa8a0e37"
  },
  {
    "url": "theme.stories-30722bb4.js",
    "revision": "c75b16016f0dc01c60fd6e5de71e490b"
  },
  {
    "url": "toast.stories-1c41c56f.js",
    "revision": "e41a9a99e9f165df99bddfb2404b8ab1"
  },
  {
    "url": "tooltip.stories-09f76cbc.js",
    "revision": "99fceafdc8c14f86d6db46b624c955fd"
  },
  {
    "url": "tslib.es6-d9c764b6.js",
    "revision": "171bcd9d0c5b3584d4ccd5b1d4dd934c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
