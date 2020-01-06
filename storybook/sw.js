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
    "url": "action-button.stories-57c7502d.js",
    "revision": "57956c2183d16bfe997dcd8612d9adc9"
  },
  {
    "url": "action-menu.stories-6dbd3f65.js",
    "revision": "c4f0722dc31f0a9bea77d21da1637580"
  },
  {
    "url": "actionbar.stories-d3ad19da.js",
    "revision": "b194bb0ac695674c306d1a9a877f1f65"
  },
  {
    "url": "avatar.stories-1cdfd603.js",
    "revision": "bb34d6f594cce4c3a26c223769cf5aa5"
  },
  {
    "url": "banner.stories-c921c4d4.js",
    "revision": "73fbed38d78e4998d5b0ddab1223325b"
  },
  {
    "url": "button.stories-29fa54c0.js",
    "revision": "fc3fd82ec7078e47aa43b2c862620c27"
  },
  {
    "url": "card.stories-68e0aa23.js",
    "revision": "91cd57035bb4fbc5cfc8cf814c90ea2d"
  },
  {
    "url": "checkbox-base-304c25ad.js",
    "revision": "07f80f9f6bb9e8c8cd08cc2b8f3ab26b"
  },
  {
    "url": "checkbox.stories-c5a757f0.js",
    "revision": "9e68a19f1832f426e68f5d2deaab44f8"
  },
  {
    "url": "circleloader.stories-91af29be.js",
    "revision": "59a4f275e202d0812829b927f2bd1c85"
  },
  {
    "url": "dropdown.stories-dd67740c.js",
    "revision": "73fd4b8fea900c03e9d4ebc6a7d960bf"
  },
  {
    "url": "dropzone.stories-dc6b5762.js",
    "revision": "9c920f1b0053cb543751245bc18ca1e4"
  },
  {
    "url": "focus-visible-7f07070e.js",
    "revision": "6a4e56cde425bc2710e4cc205a97f467"
  },
  {
    "url": "focusable-ee5c66f3.js",
    "revision": "1b11cec3e266c6be362a5284c5f5d533"
  },
  {
    "url": "icon.stories-fdb31273.js",
    "revision": "c1297b338fd87a0c4bd3ac46509762a2"
  },
  {
    "url": "icons.stories-a6b48549.js",
    "revision": "0dde6ec5e722565b00478a4207efe318"
  },
  {
    "url": "iconset-svg-cf078571.js",
    "revision": "21742f1328a5d55b8aeca86eaa5ee4b7"
  },
  {
    "url": "if-defined-a4bc040d.js",
    "revision": "552890fd69c01640e06624b239b573d5"
  },
  {
    "url": "iframe.html",
    "revision": "eb0e1e3635657f9264a6b8276b6d5ec1"
  },
  {
    "url": "illustrated-message.stories-16e60917.js",
    "revision": "9fb41eb1906756a8b651b32af0f854ea"
  },
  {
    "url": "index-047233f1.js",
    "revision": "ba2a1b11fcd0e9a76aa6c74204f8b859"
  },
  {
    "url": "index-1dd7cf0f.js",
    "revision": "4928ae8340110c2d53cd6046118268aa"
  },
  {
    "url": "index-1e0c2eab.js",
    "revision": "3a679d0010906025f5d2ec3843a1bca1"
  },
  {
    "url": "index-342758fe.js",
    "revision": "74e977f5c39e5f4dc162413d7ad13b53"
  },
  {
    "url": "index-7484fd97.js",
    "revision": "1854503e10b88d7b420812ad493aa9a5"
  },
  {
    "url": "index-7e76b33c.js",
    "revision": "6015baa16a5499a31974b7aef4e54dd3"
  },
  {
    "url": "index-85338889.js",
    "revision": "39e2c4a68e736d468a73bfd2a9021907"
  },
  {
    "url": "index-8cb2e63e.js",
    "revision": "a615ff6d39e98b862bfa115ac5e57243"
  },
  {
    "url": "index-8f46dbd8.js",
    "revision": "add08a7bd48bb95f6155bbbaa8b9c1e4"
  },
  {
    "url": "index-99c7e48a.js",
    "revision": "ea5a697386b05d53558bdeaf692d34a2"
  },
  {
    "url": "index-9d1add8f.js",
    "revision": "aaf3a46098b255f078917c35fb27db93"
  },
  {
    "url": "index-9d9ec6e0.js",
    "revision": "dc0a0d10754ff5d8be1cee185c22d35e"
  },
  {
    "url": "index-9f88e87c.js",
    "revision": "0c8debfade836aa068e393888c6df84d"
  },
  {
    "url": "index-ae948762.js",
    "revision": "696eb5209a63ab810db1cc8166da0883"
  },
  {
    "url": "index.html",
    "revision": "605b1c94a48abdd0d0a8dc987e313e84"
  },
  {
    "url": "inline-entry.0-c5c23ec7.js",
    "revision": "21cdf0237250d54681c5cb4d853a5d1d"
  },
  {
    "url": "legacy/_rollupPluginBabelHelpers-dd1c7cf9.js",
    "revision": "33eab2e503aec6aaae5912132fcbeabc"
  },
  {
    "url": "legacy/action-button.stories-5b1f84b2.js",
    "revision": "a56ab0ac57aa955c2cb2a95036f654f0"
  },
  {
    "url": "legacy/action-menu.stories-6950c8a9.js",
    "revision": "756fa53e8f02274e564922e3f048bcc1"
  },
  {
    "url": "legacy/actionbar.stories-502824a3.js",
    "revision": "69f48b9e3c1a7098801e3d6ecbb02eb1"
  },
  {
    "url": "legacy/avatar.stories-66ce04e4.js",
    "revision": "32a0915da302f30fe841a984761ab5b9"
  },
  {
    "url": "legacy/banner.stories-48ee20d1.js",
    "revision": "a83f404ee7424146576b1197124de08e"
  },
  {
    "url": "legacy/button.stories-f5a48696.js",
    "revision": "31ff23e25de1c5bed0663f75781ae9fd"
  },
  {
    "url": "legacy/card.stories-e7a448e3.js",
    "revision": "1f248fc505f47168d863b58c20201acb"
  },
  {
    "url": "legacy/checkbox-base-ca81f198.js",
    "revision": "0b8f50c390a0eb1104b1258cad2f9a0e"
  },
  {
    "url": "legacy/checkbox.stories-f986230e.js",
    "revision": "5d6a3f4dcf168801bfbc4fc1952afaf7"
  },
  {
    "url": "legacy/circleloader.stories-8e300af9.js",
    "revision": "58076aeaca39510015168a04837a656e"
  },
  {
    "url": "legacy/dropdown.stories-e271dbd5.js",
    "revision": "d07ad3d7eaac00c7bdf5aa4c6980a774"
  },
  {
    "url": "legacy/dropzone.stories-7eacc1ba.js",
    "revision": "de17760128a2bdc60187a0fc9c5bfdde"
  },
  {
    "url": "legacy/focus-visible-4cd58afd.js",
    "revision": "568bd4156abf6cc7712701a38c88c9a2"
  },
  {
    "url": "legacy/focusable-41626d58.js",
    "revision": "fbdc7eee990a573bbf26412c1ff61915"
  },
  {
    "url": "legacy/icon.stories-f5ff268a.js",
    "revision": "b1f6968bc7918d452114ace9fb2652cd"
  },
  {
    "url": "legacy/icons.stories-c7c79f86.js",
    "revision": "a72354e3a038cb98e848b6f297e9a583"
  },
  {
    "url": "legacy/iconset-svg-dca806c8.js",
    "revision": "a071b6f65bdae1be6add671a0fcc4ba0"
  },
  {
    "url": "legacy/if-defined-20449433.js",
    "revision": "d05a0979a2b9c941d3b3269cf60f32f5"
  },
  {
    "url": "legacy/illustrated-message.stories-89965d6e.js",
    "revision": "c88f8d4381463b8162b99a7907b49f5f"
  },
  {
    "url": "legacy/index-19234dc7.js",
    "revision": "ffabe539e91dc3e77c69bded67a3aeae"
  },
  {
    "url": "legacy/index-59e6a6b8.js",
    "revision": "3e26920855c7c66940f31cdc161fe228"
  },
  {
    "url": "legacy/index-65bdc5a4.js",
    "revision": "c925fe525d7a1e284a4652d0cafc9f06"
  },
  {
    "url": "legacy/index-6bb06c6a.js",
    "revision": "942ba4a4a53b14ef0cbb37ed231c33ce"
  },
  {
    "url": "legacy/index-6cf5744b.js",
    "revision": "d8d6cf2a3220810782b1aad8a4c1b313"
  },
  {
    "url": "legacy/index-72443ead.js",
    "revision": "0b82c2c902bedb7055aada4542626926"
  },
  {
    "url": "legacy/index-81133a3c.js",
    "revision": "f25409acf6ca5dface8715a93d5a9edd"
  },
  {
    "url": "legacy/index-a66de84b.js",
    "revision": "52c71d6645ee721edef17363703cc386"
  },
  {
    "url": "legacy/index-b3312fbd.js",
    "revision": "62ad02c690890e7a0aea55a1f322297a"
  },
  {
    "url": "legacy/index-bf6cccd2.js",
    "revision": "991f33a69d718c46d4621ccd0da6c82a"
  },
  {
    "url": "legacy/index-e717bb07.js",
    "revision": "8ea06885aa69008a327d4ca123e6bfcd"
  },
  {
    "url": "legacy/index-ea98d69a.js",
    "revision": "5aa820234499a8337746046389850be5"
  },
  {
    "url": "legacy/index-f1208ac6.js",
    "revision": "bf3d789f3487985531451c619104830d"
  },
  {
    "url": "legacy/index-ff3f7269.js",
    "revision": "e1bc199be329a9169b2fd3883327a96f"
  },
  {
    "url": "legacy/inline-entry.0-6001fa2f.js",
    "revision": "07c399034af654f4ac6d5a88bf2fc06a"
  },
  {
    "url": "legacy/link.stories-41ff85fc.js",
    "revision": "8446ea0c6212514979137be7a1f6601c"
  },
  {
    "url": "legacy/lit-element-d4673852.js",
    "revision": "b800631b7b579a586ec3489af9874d26"
  },
  {
    "url": "legacy/lit-html-c3c4c85b.js",
    "revision": "0837918a05489e7a343c18b5b1b8f439"
  },
  {
    "url": "legacy/menu.stories-0f338255.js",
    "revision": "f916e0a3c473ba326264076caa8895dd"
  },
  {
    "url": "legacy/observe-slot-text-569de70c.js",
    "revision": "660d664881a5a2cff4ba8f915f678f29"
  },
  {
    "url": "legacy/overlay-root.stories-82f9a277.js",
    "revision": "05c9475a560f0c59643ee8ff2911ccb2"
  },
  {
    "url": "legacy/popover.stories-3b4bad38.js",
    "revision": "9480bd39cf9eab6a785bee8997a47852"
  },
  {
    "url": "legacy/preview-a8f476dc.js",
    "revision": "12ae75ef4e7c2ce37355dd8f0573b066"
  },
  {
    "url": "legacy/radio.stories-e969d146.js",
    "revision": "2fcc1585194dda851d7854203f6ea722"
  },
  {
    "url": "legacy/search.stories-b5d18d23.js",
    "revision": "f0ad504ecb760f403a433032efc07ed0"
  },
  {
    "url": "legacy/sidenav.stories-df43ba22.js",
    "revision": "37da657bf7590cc669c180d0f43be47e"
  },
  {
    "url": "legacy/slider.stories-5b955881.js",
    "revision": "6829a1efe37a86edd335785a30760fb7"
  },
  {
    "url": "legacy/spectrum-icon-alert-small.css-3d2f3cb8.js",
    "revision": "57fc98ec6a95ff9b2b715b2bf9937512"
  },
  {
    "url": "legacy/spectrum-icon-checkmark-small.css-397ebde3.js",
    "revision": "4e4e26a7c7286f6f50d6fc49576218b5"
  },
  {
    "url": "legacy/status-light.stories-a2b28ecc.js",
    "revision": "81dc5b48185ad32cdd8d466789636992"
  },
  {
    "url": "legacy/switch.stories-25cd4095.js",
    "revision": "f5c045580b34609c4ccef495d4ad5b03"
  },
  {
    "url": "legacy/tabs.stories-4d10b6a2.js",
    "revision": "495c71f273ec5c885f29dee40be7cfe0"
  },
  {
    "url": "legacy/textarea.stories-036d381d.js",
    "revision": "ad65bb8e2d3dd2b4e266ba5cc4170353"
  },
  {
    "url": "legacy/textfield.stories-d2613df2.js",
    "revision": "87b0998fde3bf4166a629eaed490347d"
  },
  {
    "url": "legacy/theme.stories-88419ea4.js",
    "revision": "6af2ddd84fe765faca6dccbadedd5675"
  },
  {
    "url": "legacy/toast.stories-bce9c76e.js",
    "revision": "90342fb931b158e139d40411dc61062e"
  },
  {
    "url": "legacy/tooltip.stories-a142ca2b.js",
    "revision": "64e6636fc1e87104b9fcd146e99a733c"
  },
  {
    "url": "legacy/tslib.es6-42b07a6d.js",
    "revision": "70e3958ac551b83f4282f779ad677877"
  },
  {
    "url": "link.stories-eb366809.js",
    "revision": "f7fd4cd993775049e8902e6a0e79f2cd"
  },
  {
    "url": "lit-element-81619d09.js",
    "revision": "72d7e590217ae535be79954f577f6214"
  },
  {
    "url": "lit-html-6898710b.js",
    "revision": "5aee31243d965666822ace620ad7590e"
  },
  {
    "url": "menu.stories-e584826b.js",
    "revision": "8694fd0648b71052cf170b390b61bf66"
  },
  {
    "url": "observe-slot-text-5194cee4.js",
    "revision": "1a06a2bbfd38b40f3331174ad07eceab"
  },
  {
    "url": "overlay-root.stories-a23e18d5.js",
    "revision": "72fce8d384876f202b7e4832c790a2fe"
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
    "url": "popover.stories-826be139.js",
    "revision": "1d0f562398cc35d16912725207cc9e24"
  },
  {
    "url": "preview-1b8e9cee.js",
    "revision": "e32ab6ec6a44199ffbc597d849b6a32a"
  },
  {
    "url": "radio.stories-7697e1da.js",
    "revision": "a6c5a11599eef3840d8e3d3940298ac3"
  },
  {
    "url": "search.stories-e3f5b93d.js",
    "revision": "28ad888cacea3d01f7c527d1a3a712fb"
  },
  {
    "url": "sidenav.stories-be5bd1cc.js",
    "revision": "0bd59e4277ddf46c032012a0b77289a0"
  },
  {
    "url": "slider.stories-816391a8.js",
    "revision": "0e7a235cfa9dd0a8c743939d315f45eb"
  },
  {
    "url": "spectrum-icon-alert-small.css-eb5bae9d.js",
    "revision": "6b6c1fb822d0925de767f0785774f225"
  },
  {
    "url": "spectrum-icon-checkmark-small.css-de150c91.js",
    "revision": "3439c42adc9e537adc99cdc981ac3872"
  },
  {
    "url": "status-light.stories-7922d3fa.js",
    "revision": "0b06b10f72b76de78a780b59939b0eb5"
  },
  {
    "url": "switch.stories-387082f7.js",
    "revision": "a14aed7cafee99f69e330b2df9fa26f9"
  },
  {
    "url": "tabs.stories-e675c0da.js",
    "revision": "d6a46bce462e7ac0c671067ea6b6dc9e"
  },
  {
    "url": "textarea.stories-d2439804.js",
    "revision": "ba739383ea873a9ee63bd5dd921afcc5"
  },
  {
    "url": "textfield.stories-3b244bff.js",
    "revision": "40eb2449cda93d544567fc6f3b7dba45"
  },
  {
    "url": "theme.stories-fd87fc5f.js",
    "revision": "64f3a7ae4675af3b919945547296dead"
  },
  {
    "url": "toast.stories-e46feccc.js",
    "revision": "460f0ba41becdc4ce424679d5b0c1e46"
  },
  {
    "url": "tooltip.stories-8dc254aa.js",
    "revision": "38af7c5cba2cf8e394282ef3756609a5"
  },
  {
    "url": "tslib.es6-d9c764b6.js",
    "revision": "171bcd9d0c5b3584d4ccd5b1d4dd934c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
