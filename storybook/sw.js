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
    "url": "action-button.stories-d0bc4b1a.js",
    "revision": "2da713ed676427bf22f6176445fb2ab6"
  },
  {
    "url": "action-menu.stories-91b93eb4.js",
    "revision": "eea3a01cef79f99511d2b41f59c2588a"
  },
  {
    "url": "actionbar.stories-3cf7343c.js",
    "revision": "e400b1ede896a1ea49067b4d35119ab9"
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
    "url": "button.stories-685d749b.js",
    "revision": "27329afc0c98ed3af691517d4bba5b2d"
  },
  {
    "url": "card.stories-fbf4a2a3.js",
    "revision": "66fac3cc0cf3d49f63c06fe215efc18e"
  },
  {
    "url": "checkbox-base-8b59021f.js",
    "revision": "ef038c8fbb7807a88be6580397253268"
  },
  {
    "url": "checkbox.stories-c3f632d8.js",
    "revision": "81007cea762499fb25686e25f3276220"
  },
  {
    "url": "circleloader.stories-0a7b03e0.js",
    "revision": "80aaf39054f4430c786b74938a8dc5a9"
  },
  {
    "url": "dropdown.stories-e6a8e3a4.js",
    "revision": "7ec06f5dbf7eabfd5d64e2c47a43d14a"
  },
  {
    "url": "dropzone.stories-fdc3b23c.js",
    "revision": "10e35dad469303a506d1773e6b65c5f5"
  },
  {
    "url": "focus-visible-7f07070e.js",
    "revision": "6a4e56cde425bc2710e4cc205a97f467"
  },
  {
    "url": "focusable-f94b9d2d.js",
    "revision": "4ac9ae5f36f902d1803c43b577d17895"
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
    "revision": "660ed39532d174f440045e1f7506ffa4"
  },
  {
    "url": "illustrated-message.stories-ac1a622d.js",
    "revision": "14c2ec3d85367b5ba3321f3b476bf8df"
  },
  {
    "url": "index-1ecf9978.js",
    "revision": "ca59a125d4be16f02f28376c6cbbe4d9"
  },
  {
    "url": "index-2d8e1478.js",
    "revision": "2df0331dc52fae8d9d384a8efc6ec125"
  },
  {
    "url": "index-52afbc92.js",
    "revision": "2f2dba361fa0aacec8adc21102e72730"
  },
  {
    "url": "index-52b69810.js",
    "revision": "383e638987628d7ed36b011666b229b2"
  },
  {
    "url": "index-71d657ab.js",
    "revision": "d29a477469ecfadb0f9e29707d58f7ce"
  },
  {
    "url": "index-87e2c303.js",
    "revision": "ce95083c9d9031c8b9f9f899f7b65b4c"
  },
  {
    "url": "index-954d341a.js",
    "revision": "09460d42dfc6d0c763d587515b53b64b"
  },
  {
    "url": "index-a0f0b1d0.js",
    "revision": "1eb6063f6d9ee6eba63334726ca759e0"
  },
  {
    "url": "index-ac41ecc9.js",
    "revision": "4c1a2adee5eff1f909da2fc70f682c84"
  },
  {
    "url": "index-cf4249fd.js",
    "revision": "2c162829d143619e7ffc363c362bb467"
  },
  {
    "url": "index-da10f6c3.js",
    "revision": "9d4245e646bf5320f33a21003c7d06b1"
  },
  {
    "url": "index-e0e40925.js",
    "revision": "bcb668f2a903e4c56411cd443dfb9ad2"
  },
  {
    "url": "index-e3ca916a.js",
    "revision": "5c91d2a6fbded9de5962fe13aaae2a09"
  },
  {
    "url": "index-ff290bf9.js",
    "revision": "cdf899a95653f449286cd1927e75cd0f"
  },
  {
    "url": "index.html",
    "revision": "fc29a281b95c188081dee5499c11a46a"
  },
  {
    "url": "inline-entry.0-87dbbdb3.js",
    "revision": "7b102e41aa49a85fce1573a8b3811161"
  },
  {
    "url": "legacy/action-button.stories-fc24c167.js",
    "revision": "2fdd13347c29b2a15e70305a813ea49e"
  },
  {
    "url": "legacy/action-menu.stories-e86089a2.js",
    "revision": "fcabd9a5e8acaf82d9c27efa31304af5"
  },
  {
    "url": "legacy/actionbar.stories-d3ff07c2.js",
    "revision": "bf0991af70b1c31aa635c542d7fc43bb"
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
    "url": "legacy/button.stories-e372a8c5.js",
    "revision": "0b1b8683753912d4cc62b70d09418526"
  },
  {
    "url": "legacy/card.stories-0ac795a9.js",
    "revision": "7833f470189883451efd4d53af8c4c59"
  },
  {
    "url": "legacy/checkbox-base-95b96915.js",
    "revision": "3b938c661b385ec2886c41864684a45b"
  },
  {
    "url": "legacy/checkbox.stories-4083d898.js",
    "revision": "64ae9f565742c0879de6bd4a83787c3a"
  },
  {
    "url": "legacy/circleloader.stories-99685ae7.js",
    "revision": "71f0849270967ce1938e508c61017580"
  },
  {
    "url": "legacy/dropdown.stories-dc371a57.js",
    "revision": "b5abc1b0450355f3e856031bbce28775"
  },
  {
    "url": "legacy/dropzone.stories-6c0b7919.js",
    "revision": "61e3ea1821ff4fb05e3ef31adf1bb45c"
  },
  {
    "url": "legacy/focus-visible-81edd565.js",
    "revision": "1c54d3b69a063282c9fdde93c0af2aa4"
  },
  {
    "url": "legacy/focusable-a4d9afcd.js",
    "revision": "87a1e6cf7aaff26695c4cc415824c701"
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
    "url": "legacy/index-251fbde4.js",
    "revision": "b7ae77b78b9313605b3d2b11bb7d9bd9"
  },
  {
    "url": "legacy/index-431de81c.js",
    "revision": "4fd254ca86fe0c7ab414183239b5bce5"
  },
  {
    "url": "legacy/index-55231bed.js",
    "revision": "3c4f71299c86355779b055f24adc059a"
  },
  {
    "url": "legacy/index-6e751ed4.js",
    "revision": "fc8baab8a1eadc635994b531a084c57f"
  },
  {
    "url": "legacy/index-736aa322.js",
    "revision": "cb52fa57baa2e5c69bd24cbbe107509c"
  },
  {
    "url": "legacy/index-8b497f13.js",
    "revision": "a250b93109760031913396819ebb5293"
  },
  {
    "url": "legacy/index-c2c4d3a1.js",
    "revision": "a7e6f4490cc844a9038f3c5a80756676"
  },
  {
    "url": "legacy/index-db9fc176.js",
    "revision": "a7f7ce5b650b68b3b8e8eb4e19391900"
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
    "url": "legacy/index-f8cf0c29.js",
    "revision": "582090a278f4cf57420fe4a3462789d1"
  },
  {
    "url": "legacy/index-f99cb61f.js",
    "revision": "ab3fedf770f04f14968519e696d65f82"
  },
  {
    "url": "legacy/index-ff00d9d2.js",
    "revision": "f28af2c1ebee6f18d209378f12914f67"
  },
  {
    "url": "legacy/inline-entry.0-502ecc71.js",
    "revision": "6de59767881ae2284fd0a68094e5ca9a"
  },
  {
    "url": "legacy/link.stories-cfc801ea.js",
    "revision": "d12f4a14b3ac29c53baf4f4943cc805e"
  },
  {
    "url": "legacy/lit-element-12678eac.js",
    "revision": "551f6ede510bca461ced899281c183e8"
  },
  {
    "url": "legacy/menu.stories-d976a0dc.js",
    "revision": "ba5253144e755e640bb8b49aef93f9ff"
  },
  {
    "url": "legacy/observe-slot-text-d9887db2.js",
    "revision": "0793872619985712fe5cdb2a948bcf7c"
  },
  {
    "url": "legacy/overlay.stories-223c8f49.js",
    "revision": "c75c1353d95976b5ae877bd0431f5c32"
  },
  {
    "url": "legacy/popover.stories-0aca7123.js",
    "revision": "293a04afee6bcd14bce01c29975bdbd3"
  },
  {
    "url": "legacy/preview-436c9a36.js",
    "revision": "8bdf1b70fc129014ae18ed575d51cae1"
  },
  {
    "url": "legacy/radio.stories-19e0d17b.js",
    "revision": "8699d50a2599030221acf30036588b42"
  },
  {
    "url": "legacy/search.stories-fd6d5ddc.js",
    "revision": "fcf22a611cb3d8f279753fa6c3b98e76"
  },
  {
    "url": "legacy/sidenav.stories-4ea3d1b9.js",
    "revision": "5f6bfd95dd5796d20f4bbce1dd644970"
  },
  {
    "url": "legacy/slider.stories-5c7219e2.js",
    "revision": "81dd861d58feed7075d57cb58fab866b"
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
    "url": "legacy/switch.stories-bcfe368b.js",
    "revision": "266e3dbebf5eb1bf94b1133ec5f5faa0"
  },
  {
    "url": "legacy/tabs.stories-b75dac13.js",
    "revision": "93fbec8d64003079d14055755de5b9d0"
  },
  {
    "url": "legacy/textarea.stories-e0d2430a.js",
    "revision": "871271f991647a1b8e59d3806ee15f8c"
  },
  {
    "url": "legacy/textfield.stories-f69578da.js",
    "revision": "9d3d0725dc8ecdc0b0506166fa1cf118"
  },
  {
    "url": "legacy/theme.stories-c86ea873.js",
    "revision": "a7920e431c93ba088815e2112b456548"
  },
  {
    "url": "legacy/toast.stories-932cc390.js",
    "revision": "5156ff1e03022c7a39c414f611ffa1a0"
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
    "url": "link.stories-aab15305.js",
    "revision": "d53e64f16d468d65027ab39f1466a889"
  },
  {
    "url": "lit-element-089a5717.js",
    "revision": "1174116367bb8fcf84f23193ed7e80f8"
  },
  {
    "url": "menu.stories-b53abd12.js",
    "revision": "75c2560d66157fe7a76af25ea7c3bbc9"
  },
  {
    "url": "observe-slot-text-5194cee4.js",
    "revision": "1a06a2bbfd38b40f3331174ad07eceab"
  },
  {
    "url": "overlay.stories-f3b15175.js",
    "revision": "bc8bd51cff7d2999fa636d1b6efc75f9"
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
    "url": "preview-86eb3c4d.js",
    "revision": "b31bad9a108d0e254a5251150ea41581"
  },
  {
    "url": "radio.stories-bb3a0daa.js",
    "revision": "6499e1e3740d3fe5c64f9336af1bd09b"
  },
  {
    "url": "search.stories-c009acac.js",
    "revision": "a3800673f2c6ba069fb165e16bb8d4ca"
  },
  {
    "url": "sidenav.stories-3e6db56f.js",
    "revision": "86061cec25a9c04f154f044837ca3812"
  },
  {
    "url": "slider.stories-a39f6fc9.js",
    "revision": "746310c9b8e05bcfbc254fb12ee27ca4"
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
    "url": "switch.stories-347917ec.js",
    "revision": "1a7a5b3eec859d5059631a93e6605ed0"
  },
  {
    "url": "tabs.stories-a388871e.js",
    "revision": "e2e4ec3b46dd4206f93bc65c1f13b99e"
  },
  {
    "url": "textarea.stories-184c5210.js",
    "revision": "941a56cf2219d91443a0e67f83057c63"
  },
  {
    "url": "textfield.stories-24966f15.js",
    "revision": "a62d53d65dc10e67076396286c68634a"
  },
  {
    "url": "theme.stories-39bd6257.js",
    "revision": "34e61d70b8529d04c66c4d16270d4359"
  },
  {
    "url": "toast.stories-b0048280.js",
    "revision": "f361ea49541431b3baff531c97fc0f26"
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
