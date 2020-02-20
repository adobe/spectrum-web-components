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
    "url": "action-button.stories-528e5fb0.js",
    "revision": "06f78ff912c68854b61c44b44dd55d10"
  },
  {
    "url": "action-menu.stories-37b3fd50.js",
    "revision": "8ca33d51ddaec9f88539049f9b694043"
  },
  {
    "url": "actionbar.stories-2ad05ed0.js",
    "revision": "3a3b1988e3016efba5acaa8c874ba41c"
  },
  {
    "url": "avatar.stories-537b588d.js",
    "revision": "054e2162a6b808476a48ca46f088f337"
  },
  {
    "url": "banner.stories-136205ea.js",
    "revision": "cf1db6ce09404b3bd0fc927f5aa27843"
  },
  {
    "url": "button.stories-4b3008f6.js",
    "revision": "ace3e0821751a2c520de5e625a6f20f2"
  },
  {
    "url": "card.stories-3c9b96a1.js",
    "revision": "9c6581c4e11425dbcd036f6793952bc7"
  },
  {
    "url": "checkbox-base-97c86c8c.js",
    "revision": "70272926ceed3083707f8080c89edaa3"
  },
  {
    "url": "checkbox.stories-6693fce9.js",
    "revision": "f5bf19661c7a3b778a0d1bf66ab35082"
  },
  {
    "url": "circleloader.stories-0a7b03e0.js",
    "revision": "80aaf39054f4430c786b74938a8dc5a9"
  },
  {
    "url": "dropdown.stories-b7623482.js",
    "revision": "54bf88b222cca3c04e7e5552b0072ade"
  },
  {
    "url": "dropzone.stories-ead0f84a.js",
    "revision": "1c7aa86ea091da897335a1f955049c9b"
  },
  {
    "url": "focus-visible-7f07070e.js",
    "revision": "6a4e56cde425bc2710e4cc205a97f467"
  },
  {
    "url": "focusable-f84f80fc.js",
    "revision": "b94668e99ec50067ec7f0b27aa8bf665"
  },
  {
    "url": "icon.stories-d4c7c7d0.js",
    "revision": "98414a590fe0f7ec143310e6eff998af"
  },
  {
    "url": "icons.stories-da86dfe4.js",
    "revision": "d90391e17c1747cee19f20becc7797cb"
  },
  {
    "url": "iconset-svg-7745673b.js",
    "revision": "c9504574f3d7c842520efb3946a2ae3e"
  },
  {
    "url": "if-defined-f9b5fa5b.js",
    "revision": "6226ba524ceb0c2d6e253a286a633df7"
  },
  {
    "url": "iframe.html",
    "revision": "2bfafc79c703f587fa9e81dcf4af2bc9"
  },
  {
    "url": "illustrated-message.stories-ac1a622d.js",
    "revision": "14c2ec3d85367b5ba3321f3b476bf8df"
  },
  {
    "url": "index-14f0b3e5.js",
    "revision": "6aa1d391c15f88f537015a9bfd6af562"
  },
  {
    "url": "index-160e7101.js",
    "revision": "6e05d46cfae9941752602e34e260dc71"
  },
  {
    "url": "index-16f3b7d2.js",
    "revision": "28f9d079a591bf3b7d525ecf7ce22f46"
  },
  {
    "url": "index-33bfe3e9.js",
    "revision": "71fa7dc084f0ad0d976d3cf6f971040d"
  },
  {
    "url": "index-3b69cd23.js",
    "revision": "2b1af7c9f689ba61090bd6175f1e94a7"
  },
  {
    "url": "index-41afc42f.js",
    "revision": "3186527d076d4d6be0e67d09d94286ee"
  },
  {
    "url": "index-5fc9a695.js",
    "revision": "ebf18cd38179947c4e3409f1989d242d"
  },
  {
    "url": "index-71d657ab.js",
    "revision": "d29a477469ecfadb0f9e29707d58f7ce"
  },
  {
    "url": "index-784f6851.js",
    "revision": "a5991555b07bef5f2c7224284aebf6ed"
  },
  {
    "url": "index-87e2c303.js",
    "revision": "ce95083c9d9031c8b9f9f899f7b65b4c"
  },
  {
    "url": "index-9862025a.js",
    "revision": "cd83ceebf66ff7da98f2b3d4d9aac2be"
  },
  {
    "url": "index-a0f0b1d0.js",
    "revision": "1eb6063f6d9ee6eba63334726ca759e0"
  },
  {
    "url": "index-d19d6838.js",
    "revision": "6ebaa6e046f643e676df154fae677810"
  },
  {
    "url": "index-da10f6c3.js",
    "revision": "9d4245e646bf5320f33a21003c7d06b1"
  },
  {
    "url": "index-ddc4b59d.js",
    "revision": "de5d4b162447c94a6cf51202e0e007d7"
  },
  {
    "url": "index-e0e40925.js",
    "revision": "bcb668f2a903e4c56411cd443dfb9ad2"
  },
  {
    "url": "index-fcda0df5.js",
    "revision": "b9a93f6eb610b670e5e0bf349e05dae5"
  },
  {
    "url": "index.html",
    "revision": "fc29a281b95c188081dee5499c11a46a"
  },
  {
    "url": "inline-entry.0-b6901b47.js",
    "revision": "9835ab47d06f2b17ffdcc7d518521bee"
  },
  {
    "url": "legacy/action-button.stories-ce25b2fd.js",
    "revision": "8ea956a4e57fea437eb45904fc9a7017"
  },
  {
    "url": "legacy/action-menu.stories-6c79c911.js",
    "revision": "e39c3fe2a60aff086d4233f896ec8039"
  },
  {
    "url": "legacy/actionbar.stories-e6fde39f.js",
    "revision": "231e2e38b0397a7357df1b32b7f0e97e"
  },
  {
    "url": "legacy/avatar.stories-3cb713e4.js",
    "revision": "06928e2abef3aa004de43eaf09d7a8cf"
  },
  {
    "url": "legacy/banner.stories-07d0741d.js",
    "revision": "482951971d46c16ed2dcf06ad83af6b4"
  },
  {
    "url": "legacy/button.stories-faec0694.js",
    "revision": "0fdc138554a3e36a6b7a5301b6f8effe"
  },
  {
    "url": "legacy/card.stories-89a431d8.js",
    "revision": "fe1d5b75f5405b0db3164653f1333906"
  },
  {
    "url": "legacy/checkbox-base-047e3d8c.js",
    "revision": "eac0805361b27b2815ec1bc384220a4c"
  },
  {
    "url": "legacy/checkbox.stories-5138e811.js",
    "revision": "f97fd1c0ad7f416ab9f24368facda43b"
  },
  {
    "url": "legacy/circleloader.stories-99685ae7.js",
    "revision": "71f0849270967ce1938e508c61017580"
  },
  {
    "url": "legacy/dropdown.stories-75b65713.js",
    "revision": "9659c604ded0ea678b9e96e207110b5f"
  },
  {
    "url": "legacy/dropzone.stories-e087ab59.js",
    "revision": "85dfddd98846bb6489c9654cac986c20"
  },
  {
    "url": "legacy/focus-visible-81edd565.js",
    "revision": "1c54d3b69a063282c9fdde93c0af2aa4"
  },
  {
    "url": "legacy/focusable-ab32921b.js",
    "revision": "65403487a876025cc3637b21d0f4aade"
  },
  {
    "url": "legacy/icon.stories-b2bc69ea.js",
    "revision": "4b5d353110ed7e5b6597857dcf58be7c"
  },
  {
    "url": "legacy/icons.stories-5fb9a51d.js",
    "revision": "41bceeb987724bdfc8396282cb95b22a"
  },
  {
    "url": "legacy/iconset-svg-469263e3.js",
    "revision": "52f11f0cb44fa40ea59946e658f0fa87"
  },
  {
    "url": "legacy/if-defined-f00fff49.js",
    "revision": "af48710edb3a6c3755313073416ee560"
  },
  {
    "url": "legacy/illustrated-message.stories-2af246d3.js",
    "revision": "3449599aa0838d8c82aa6e15152f9581"
  },
  {
    "url": "legacy/index-0fb43bbe.js",
    "revision": "243678755e3a45cc85481d2f6e7430bc"
  },
  {
    "url": "legacy/index-3a453698.js",
    "revision": "a911580f935c17bac43c6d8929aa812f"
  },
  {
    "url": "legacy/index-42c9f5ad.js",
    "revision": "33197fa71ef0daf4635fc276faddd5a1"
  },
  {
    "url": "legacy/index-45b7eff8.js",
    "revision": "90fff2c07a785f1eb5104766f8a687cf"
  },
  {
    "url": "legacy/index-55231bed.js",
    "revision": "3c4f71299c86355779b055f24adc059a"
  },
  {
    "url": "legacy/index-60499120.js",
    "revision": "e6406b672bdb6bd81c2586c2ddec7f51"
  },
  {
    "url": "legacy/index-777892dd.js",
    "revision": "a08e4a2126d56f363d8c541c24b3b00e"
  },
  {
    "url": "legacy/index-8161cbe0.js",
    "revision": "1f599f4d97361858aea12a1462a1504d"
  },
  {
    "url": "legacy/index-b8ab6f42.js",
    "revision": "b97c6f91d13ac864fa29cc93f838f54d"
  },
  {
    "url": "legacy/index-c897ee27.js",
    "revision": "75b40be8035e237cb6751a3cdfc237a4"
  },
  {
    "url": "legacy/index-c9de8347.js",
    "revision": "43cb84928e7845542458e619289f4dad"
  },
  {
    "url": "legacy/index-d22a2607.js",
    "revision": "5257604f0384d5ad5cfff22d4d1ba065"
  },
  {
    "url": "legacy/index-d5fdd674.js",
    "revision": "7aef51859c33a6ec7d46f8c131bb045d"
  },
  {
    "url": "legacy/index-ddf19499.js",
    "revision": "cbbeb7b9c023b68ab2aabf35e5248299"
  },
  {
    "url": "legacy/index-e0f1b491.js",
    "revision": "785f706995aa3ddf427bfa7ece7d3445"
  },
  {
    "url": "legacy/index-ea65cf5a.js",
    "revision": "2df8339ed294ef670d0b00c9247778ea"
  },
  {
    "url": "legacy/index-f99cb61f.js",
    "revision": "ab3fedf770f04f14968519e696d65f82"
  },
  {
    "url": "legacy/inline-entry.0-b5c0aa9e.js",
    "revision": "e88ef2eade65c09b33642113d01ebfa7"
  },
  {
    "url": "legacy/link.stories-4a6d3572.js",
    "revision": "4307f4a1006df34d446a843eaa0121ac"
  },
  {
    "url": "legacy/lit-element-12678eac.js",
    "revision": "551f6ede510bca461ced899281c183e8"
  },
  {
    "url": "legacy/menu-item.stories-2abdfb1c.js",
    "revision": "846efcbc9fe785ba7c4e99459716a26b"
  },
  {
    "url": "legacy/menu.stories-de4f9571.js",
    "revision": "b84f3f45b92546513067be8e24bcaf7c"
  },
  {
    "url": "legacy/observe-slot-text-d9887db2.js",
    "revision": "0793872619985712fe5cdb2a948bcf7c"
  },
  {
    "url": "legacy/overlay.stories-7ac03de7.js",
    "revision": "2985da8eb6edfd2833431aa9f2651796"
  },
  {
    "url": "legacy/popover.stories-0aca7123.js",
    "revision": "293a04afee6bcd14bce01c29975bdbd3"
  },
  {
    "url": "legacy/preview-0bd31d50.js",
    "revision": "2151f52d4fcd99ec775cad52a233bf2c"
  },
  {
    "url": "legacy/radio.stories-3b1e66e0.js",
    "revision": "f7cf60b0580fcc0344032c753f40788d"
  },
  {
    "url": "legacy/search.stories-c361954c.js",
    "revision": "7a2ed581070426bf6d58967bcc8805cb"
  },
  {
    "url": "legacy/sidenav.stories-c54e475a.js",
    "revision": "0e93172c7f1d264e38a49bf058cf76ea"
  },
  {
    "url": "legacy/slider.stories-80229f48.js",
    "revision": "80d3bd1c4c1e6db13602f77900e914b8"
  },
  {
    "url": "legacy/spectrum-icon-alert-small.css-65ef656e.js",
    "revision": "0396e5271bd20f2f85da442a532de391"
  },
  {
    "url": "legacy/spectrum-icon-checkmark-small.css-c376b745.js",
    "revision": "1a1d733df2592dfe014b9807292cf47b"
  },
  {
    "url": "legacy/status-light.stories-b82f4e4b.js",
    "revision": "b983fa8f8e467fdf20738188fe4e5638"
  },
  {
    "url": "legacy/switch.stories-2cc433ce.js",
    "revision": "1b1a7cd0383528f689c80a1d55b178bf"
  },
  {
    "url": "legacy/tabs.stories-9f07a48b.js",
    "revision": "82bd8d9e09c7891b5b57c9002f93d6f6"
  },
  {
    "url": "legacy/textarea.stories-dd71cf59.js",
    "revision": "3029fa2a91ef49fa6232d9e34a9d86ae"
  },
  {
    "url": "legacy/textfield.stories-4cc26097.js",
    "revision": "7d0d25e6bc9a6ae670723b8496e0e69e"
  },
  {
    "url": "legacy/theme.stories-94482534.js",
    "revision": "15d77f98b704846006d51bbc9fbcb5df"
  },
  {
    "url": "legacy/toast.stories-8daa5401.js",
    "revision": "0e7facbf33d83d622fc051a365db4b89"
  },
  {
    "url": "legacy/tooltip.stories-52bffc41.js",
    "revision": "f4d1647113da5854255415b07367410b"
  },
  {
    "url": "legacy/tslib.es6-818760f0.js",
    "revision": "dcf028ad6c38e959d31e3c3044cdb1ce"
  },
  {
    "url": "link.stories-47c45548.js",
    "revision": "280cdf0460e2bfc3059289eee7aa15d7"
  },
  {
    "url": "lit-element-089a5717.js",
    "revision": "1174116367bb8fcf84f23193ed7e80f8"
  },
  {
    "url": "menu-item.stories-fe647951.js",
    "revision": "75a83a1ac03ccf6e91f9215116017dbd"
  },
  {
    "url": "menu.stories-8c85812b.js",
    "revision": "c05af41addce442766b6555120181d1c"
  },
  {
    "url": "observe-slot-text-5194cee4.js",
    "revision": "1a06a2bbfd38b40f3331174ad07eceab"
  },
  {
    "url": "overlay.stories-5ccc338c.js",
    "revision": "e4096f8c5a1e11ac27d7c81a1bfeaf74"
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
    "url": "popover.stories-f49eb9af.js",
    "revision": "f9f382783c5a8c29c97afd71f0c0a704"
  },
  {
    "url": "preview-f538910d.js",
    "revision": "d379e112699468a1089389bae02781d4"
  },
  {
    "url": "radio.stories-37322339.js",
    "revision": "41761793b2e198e75bb0291b08d368e7"
  },
  {
    "url": "search.stories-489fcbab.js",
    "revision": "288063245a0024b939ccee8adeb1a46b"
  },
  {
    "url": "sidenav.stories-d67bcdb4.js",
    "revision": "635148ed25cfc2c4a6a85f9a34d1a6c5"
  },
  {
    "url": "slider.stories-f35bc279.js",
    "revision": "0974df6867e33e1a7f024c7a1a3bb4d5"
  },
  {
    "url": "spectrum-icon-alert-small.css-52aaded2.js",
    "revision": "4536809a195adf987688b45ba8a7d88d"
  },
  {
    "url": "spectrum-icon-checkmark-small.css-32c1abfd.js",
    "revision": "f32753d23ab6fa78881ee394d960db72"
  },
  {
    "url": "status-light.stories-c5760691.js",
    "revision": "edf21f6812b1098f9971af744fdda4a4"
  },
  {
    "url": "switch.stories-c9722bee.js",
    "revision": "3ff6f28e8b0edfe061509dadb4c84d10"
  },
  {
    "url": "tabs.stories-9c6c3bfe.js",
    "revision": "2dfb661d75c2cebd16536e952c651fa8"
  },
  {
    "url": "textarea.stories-4ce9c46d.js",
    "revision": "fc66751ec3edfbcd476d154a4a3fc155"
  },
  {
    "url": "textfield.stories-318f2850.js",
    "revision": "5856f3b519e2f48dbf707e4a4d290acf"
  },
  {
    "url": "theme.stories-b1b91adf.js",
    "revision": "3f3ef437cfc86dced3dc6a33a28bbf91"
  },
  {
    "url": "toast.stories-d64765dd.js",
    "revision": "97bbbc0fec7d7a60ec2c81dd737058a2"
  },
  {
    "url": "tooltip.stories-f2209d97.js",
    "revision": "3e30758648c200c00431045a69b19697"
  },
  {
    "url": "tslib.es6-d9c764b6.js",
    "revision": "171bcd9d0c5b3584d4ccd5b1d4dd934c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
