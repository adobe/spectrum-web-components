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
    "url": "action-button.stories-92ffdfa1.js",
    "revision": "1a40fa9577d8ecccba51ac4f6083af3a"
  },
  {
    "url": "action-menu.stories-69a4e14e.js",
    "revision": "3fdf52dc8bf9a1e9f71bbbe666a9152a"
  },
  {
    "url": "actionbar.stories-66ea0465.js",
    "revision": "e6401622a5591c0f7a48c0dfea2bc04c"
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
    "url": "button.stories-6908770d.js",
    "revision": "342f64ad874b904b08288e98f2294fb3"
  },
  {
    "url": "card.stories-d7a5495f.js",
    "revision": "b7fadd96bc6ed79cc86e39e2947c8198"
  },
  {
    "url": "checkbox-base-936b0f3a.js",
    "revision": "c3a12e9ffce27b3ee7592de16b34f344"
  },
  {
    "url": "checkbox.stories-88bf60fc.js",
    "revision": "cc2bc1c0ed6fe303062271a778540e47"
  },
  {
    "url": "circleloader.stories-38c7b31a.js",
    "revision": "d1ca41cb1820cb35a349a343a6177da1"
  },
  {
    "url": "dropdown.stories-8a35455d.js",
    "revision": "00820e6a948f164654d319d601846f7f"
  },
  {
    "url": "dropzone.stories-5bfc9321.js",
    "revision": "041334251d545cf28aa9c970ffb5cb8e"
  },
  {
    "url": "focus-visible-7f07070e.js",
    "revision": "6a4e56cde425bc2710e4cc205a97f467"
  },
  {
    "url": "focusable-03c6e0e8.js",
    "revision": "4da817013bc0ff678e54d56450080ba3"
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
    "revision": "800fc152603695a1270952db6b9e726a"
  },
  {
    "url": "illustrated-message.stories-3b10a669.js",
    "revision": "2148ff2da5886b9cfe131d1a386e1593"
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
    "url": "index-39ef8d49.js",
    "revision": "f7d69980c76e5cd8322bb20e3dce5c1c"
  },
  {
    "url": "index-5581c7af.js",
    "revision": "31502942719d7694c7c14398158421c9"
  },
  {
    "url": "index-6a7dd94f.js",
    "revision": "fb3e8a8d559f3d79d875184a30b26461"
  },
  {
    "url": "index-71082d44.js",
    "revision": "72cc5be920d045d1b444bebeeffeb742"
  },
  {
    "url": "index-7747dc9d.js",
    "revision": "1b1f4741888709c8bee317831735d1c9"
  },
  {
    "url": "index-7dda8932.js",
    "revision": "7faaa325128f9de4e418a51984de14ed"
  },
  {
    "url": "index-80f41d19.js",
    "revision": "c8d95787f46a169e5bbc33543ca291e2"
  },
  {
    "url": "index-98b98505.js",
    "revision": "c46f7d76609a9248412e4568c8d26e4f"
  },
  {
    "url": "index-c8da9539.js",
    "revision": "02de683df6112d06e00ee335307633ae"
  },
  {
    "url": "index-d58ab459.js",
    "revision": "6ff2fb27d8c00aee3c9ba4d4863ab685"
  },
  {
    "url": "index-deac856c.js",
    "revision": "c63c07dc7c54dff3b8dceb57a5f4ab4d"
  },
  {
    "url": "index-f7d5c74c.js",
    "revision": "e79931dd4c865da0d5344b9a21ad5150"
  },
  {
    "url": "index.html",
    "revision": "fc29a281b95c188081dee5499c11a46a"
  },
  {
    "url": "inline-entry.0-1171ba2a.js",
    "revision": "c4dfab85cd518e543d6fe32b1628c88c"
  },
  {
    "url": "legacy/action-button.stories-4311c22c.js",
    "revision": "e6248a84759331b7abd69b9610d90adc"
  },
  {
    "url": "legacy/action-menu.stories-1369a7e2.js",
    "revision": "f1b84a3f4c6f8289d3a2ea95337556a5"
  },
  {
    "url": "legacy/actionbar.stories-24e6f701.js",
    "revision": "370f52fad0c8c15af269ebda4593f118"
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
    "url": "legacy/button.stories-3f01de37.js",
    "revision": "0ac9ffea4408661e817e6706e42e9493"
  },
  {
    "url": "legacy/card.stories-2094796a.js",
    "revision": "01face9b07bb3132c1597f97f9e2f023"
  },
  {
    "url": "legacy/checkbox-base-cae83a29.js",
    "revision": "a4885fd711bd0dacf42b1c3dc7fbcfe2"
  },
  {
    "url": "legacy/checkbox.stories-6eff7668.js",
    "revision": "cd594265b1288b9b2435bea315d87277"
  },
  {
    "url": "legacy/circleloader.stories-d659829d.js",
    "revision": "ed36273d1ac6daffcf021eb335395c6c"
  },
  {
    "url": "legacy/dropdown.stories-5dfc4b46.js",
    "revision": "f79dbed0173cc7a7e79202e759dbaff9"
  },
  {
    "url": "legacy/dropzone.stories-d3b73356.js",
    "revision": "4b3a823e788413fda436cd5a6484ef13"
  },
  {
    "url": "legacy/focus-visible-6c56a372.js",
    "revision": "b60dd19319244f8911f64ee32a27217f"
  },
  {
    "url": "legacy/focusable-b4d7f760.js",
    "revision": "4067f55db5b01a5b76d0637580a45bfa"
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
    "url": "legacy/index-1325d295.js",
    "revision": "a87b0c8a590b14275c196349c50abf7a"
  },
  {
    "url": "legacy/index-16160cf2.js",
    "revision": "3f155d58e114619dcf05fe0ca7d7b3d1"
  },
  {
    "url": "legacy/index-1ef93d4f.js",
    "revision": "fd1164b2100e843b9dd616bce2b0f8ac"
  },
  {
    "url": "legacy/index-5395dec6.js",
    "revision": "5c8244f40d6c58e5b74a9885b82942c1"
  },
  {
    "url": "legacy/index-640efe7a.js",
    "revision": "b2833734ae07fba62c4155a37c8847c5"
  },
  {
    "url": "legacy/index-7ca959ce.js",
    "revision": "39a111ecd5947c6b9afafc5cacfb8dfd"
  },
  {
    "url": "legacy/index-841de535.js",
    "revision": "9e5ea8dd69a6977aed8e20d028951a66"
  },
  {
    "url": "legacy/index-8889a3b5.js",
    "revision": "9696b6e3474e925e5745f5df3eb87469"
  },
  {
    "url": "legacy/index-8da462b0.js",
    "revision": "5c001175bb4ac94b4b8069b2a2cd4d77"
  },
  {
    "url": "legacy/index-a31e4f22.js",
    "revision": "433a66fbd0036ff2b98903c776c0a186"
  },
  {
    "url": "legacy/index-bce0eed7.js",
    "revision": "c2ba1905458b25506f8674214b6bb6a9"
  },
  {
    "url": "legacy/index-c2245d11.js",
    "revision": "f8b05517f229a28da6e63748dccd4074"
  },
  {
    "url": "legacy/inline-entry.0-e2f1a31f.js",
    "revision": "e9dbcf2f7052d2c6de37eff76c7011bd"
  },
  {
    "url": "legacy/link.stories-e87ff32c.js",
    "revision": "f310f252b605df0c8ee0d327a21e60f4"
  },
  {
    "url": "legacy/lit-element-02beee92.js",
    "revision": "155b37c8f78fd57cb3ad331b5b8ef548"
  },
  {
    "url": "legacy/menu.stories-222a491e.js",
    "revision": "cca50b2cad9950236eb62f5acbf306c7"
  },
  {
    "url": "legacy/observe-slot-text-0a9e1768.js",
    "revision": "f128fcfb60f15316637dde574a0b77b9"
  },
  {
    "url": "legacy/overlay.stories-926a49c8.js",
    "revision": "78376d597370b1b80af4b56dfc85efe8"
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
    "url": "legacy/radio.stories-b94d8c45.js",
    "revision": "a0e4651243685a2b17d078815c442cff"
  },
  {
    "url": "legacy/search.stories-6cd22555.js",
    "revision": "c9e0ac0b04aca19fae628ced07e93441"
  },
  {
    "url": "legacy/sidenav.stories-1504b601.js",
    "revision": "17607ae9090decb10c54c3d34e589f08"
  },
  {
    "url": "legacy/slider.stories-795c60b3.js",
    "revision": "202dd8eda33712d1a8ca18603c7ac6c0"
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
    "url": "legacy/switch.stories-1837017b.js",
    "revision": "577f1df705082db03c45e01af58fbeb6"
  },
  {
    "url": "legacy/tabs.stories-482cd1f5.js",
    "revision": "2ee1b5d562c9589e2b083c55b7283583"
  },
  {
    "url": "legacy/textarea.stories-db4265ea.js",
    "revision": "a3eaacfab9b7f1ccb02c3bf7dde79983"
  },
  {
    "url": "legacy/textfield.stories-3cad246c.js",
    "revision": "c6beda10304917b61fa8a386db80ccfd"
  },
  {
    "url": "legacy/theme.stories-ac8a0335.js",
    "revision": "9add45121dc23f854bd0c0037e0ef016"
  },
  {
    "url": "legacy/toast.stories-ed34cb64.js",
    "revision": "096af725cd208691841ed83da750f01c"
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
    "url": "link.stories-3096c79e.js",
    "revision": "291039c1de8e96abbf849e3a8eaffada"
  },
  {
    "url": "lit-element-45614e86.js",
    "revision": "0cef472702aff0b266ebbbca7ac59da8"
  },
  {
    "url": "menu.stories-22ad655b.js",
    "revision": "541eb94bb1f5da3002e00621608aa67d"
  },
  {
    "url": "observe-slot-text-5194cee4.js",
    "revision": "1a06a2bbfd38b40f3331174ad07eceab"
  },
  {
    "url": "overlay.stories-38cbfd46.js",
    "revision": "ca6cd4587a481a08850373734d9cde1d"
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
    "url": "radio.stories-488f5feb.js",
    "revision": "70de180adc7ce6b89cb20218baec760f"
  },
  {
    "url": "search.stories-99e833d0.js",
    "revision": "8dd7087e6869238b889511667f2f02f3"
  },
  {
    "url": "sidenav.stories-b3adca3f.js",
    "revision": "7f48cf85ef94235bb1ed7b3e2371966c"
  },
  {
    "url": "slider.stories-c15acf3b.js",
    "revision": "a734751cc67cc3ec87d46baf2eb00dcf"
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
    "url": "switch.stories-7234adcd.js",
    "revision": "281503e2328bb9818a56c5e8d15d1d28"
  },
  {
    "url": "tabs.stories-3f2581eb.js",
    "revision": "12b837a3458b4b39f05a06592817aa1b"
  },
  {
    "url": "textarea.stories-79d3439e.js",
    "revision": "7ce21bdefc42418150f74b0d97fed8bd"
  },
  {
    "url": "textfield.stories-15ea4e0f.js",
    "revision": "394f50f5ecb5a85af0c04110f1d636f8"
  },
  {
    "url": "theme.stories-2e0d8d72.js",
    "revision": "116924ac1a6a3c9877c09322fde809c1"
  },
  {
    "url": "toast.stories-c63e6838.js",
    "revision": "9bc1064927e72e1ac8d186b5f320461d"
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
