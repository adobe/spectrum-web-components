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
    "url": "action-button.stories-680ed6ba.js",
    "revision": "a9c8d3a38b18e55e41cc146c0d9b2664"
  },
  {
    "url": "action-menu.stories-876d2ffc.js",
    "revision": "966e4882ac154a28dc0b294aa3b9f802"
  },
  {
    "url": "actionbar.stories-520a0ed0.js",
    "revision": "b48fbaf643723efa4bf61d96425802b8"
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
    "url": "button.stories-561bbce3.js",
    "revision": "8b974680e389de5c7dd84e64ab003b36"
  },
  {
    "url": "card.stories-68e0aa23.js",
    "revision": "91cd57035bb4fbc5cfc8cf814c90ea2d"
  },
  {
    "url": "checkbox-base-e706c42c.js",
    "revision": "734008c2a662b3eef0266271be39b0fc"
  },
  {
    "url": "checkbox.stories-6b10e179.js",
    "revision": "b50d5c37bfbde630a749dae350c57dc2"
  },
  {
    "url": "circleloader.stories-91af29be.js",
    "revision": "59a4f275e202d0812829b927f2bd1c85"
  },
  {
    "url": "dropdown.stories-118a2727.js",
    "revision": "11e3b588adf69be1c18e3fcf1869d686"
  },
  {
    "url": "dropzone.stories-5726a686.js",
    "revision": "f89f734b0f3796ee7525161a985df625"
  },
  {
    "url": "focus-visible-7f07070e.js",
    "revision": "6a4e56cde425bc2710e4cc205a97f467"
  },
  {
    "url": "focusable-5c74bfe6.js",
    "revision": "4804d5996c90a3cdd18a927c4aa2a98c"
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
    "revision": "14c4e9249ba7d0c01b4533cd00c1b928"
  },
  {
    "url": "illustrated-message.stories-16e60917.js",
    "revision": "9fb41eb1906756a8b651b32af0f854ea"
  },
  {
    "url": "index-0340288f.js",
    "revision": "77491dbb73eb1783c5c654e90d81c0a7"
  },
  {
    "url": "index-047233f1.js",
    "revision": "ba2a1b11fcd0e9a76aa6c74204f8b859"
  },
  {
    "url": "index-08ca6137.js",
    "revision": "a27779c105fc1e2ac404fd4c53ee49e5"
  },
  {
    "url": "index-15652ce1.js",
    "revision": "8ce20db99b36f33b0568468e7f7b7ecc"
  },
  {
    "url": "index-1e0c2eab.js",
    "revision": "3a679d0010906025f5d2ec3843a1bca1"
  },
  {
    "url": "index-26954003.js",
    "revision": "5fe55a18974c837d21a5e12eb47f7f37"
  },
  {
    "url": "index-5dbc81e6.js",
    "revision": "baa27633b3f74ebcd3f02a32a55de2d9"
  },
  {
    "url": "index-7465a914.js",
    "revision": "1d5a418a19ea3793962cffe5736a2727"
  },
  {
    "url": "index-8cb2e63e.js",
    "revision": "a615ff6d39e98b862bfa115ac5e57243"
  },
  {
    "url": "index-8f3c13c7.js",
    "revision": "e846d0ea3a41ae0b7a2bc63704d200e6"
  },
  {
    "url": "index-9d9ec6e0.js",
    "revision": "dc0a0d10754ff5d8be1cee185c22d35e"
  },
  {
    "url": "index-bbf04b40.js",
    "revision": "28e4ae21c8ad17ccb1f5e4579f7b37ae"
  },
  {
    "url": "index-ef29cfa1.js",
    "revision": "0486b4517441854eefcfb5903e4ace93"
  },
  {
    "url": "index-f7741c8a.js",
    "revision": "df563d63507188af48bcc50b9c480fd7"
  },
  {
    "url": "index.html",
    "revision": "605b1c94a48abdd0d0a8dc987e313e84"
  },
  {
    "url": "inline-entry.0-4ea25074.js",
    "revision": "701d6fd6c3eeb85924d67646cb9ef9f4"
  },
  {
    "url": "legacy/_rollupPluginBabelHelpers-dd1c7cf9.js",
    "revision": "33eab2e503aec6aaae5912132fcbeabc"
  },
  {
    "url": "legacy/action-button.stories-1428fb51.js",
    "revision": "064cca09c989561a64df117c958214a3"
  },
  {
    "url": "legacy/action-menu.stories-02dce013.js",
    "revision": "6b8ba32a69db6ce348fb983fcc2eb312"
  },
  {
    "url": "legacy/actionbar.stories-6bee5e84.js",
    "revision": "5a8e6129bdc8a35fb1ae4eeff9f9633b"
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
    "url": "legacy/button.stories-4715c501.js",
    "revision": "4bd4a9b100cc4c53c4ca5792dfc1f63c"
  },
  {
    "url": "legacy/card.stories-e7a448e3.js",
    "revision": "1f248fc505f47168d863b58c20201acb"
  },
  {
    "url": "legacy/checkbox-base-8fe0bc88.js",
    "revision": "3f88a666c5f931177b9e5a24a4c89442"
  },
  {
    "url": "legacy/checkbox.stories-00c3a2ce.js",
    "revision": "5573f50cd497b79c0782d69fb5d83eae"
  },
  {
    "url": "legacy/circleloader.stories-8e300af9.js",
    "revision": "58076aeaca39510015168a04837a656e"
  },
  {
    "url": "legacy/dropdown.stories-d97e2aa5.js",
    "revision": "9e06ee2fbdc0e1d223637b9e9f29eaaf"
  },
  {
    "url": "legacy/dropzone.stories-111e480b.js",
    "revision": "b99f751d5f99238f7fd914291e6397ef"
  },
  {
    "url": "legacy/focus-visible-4cd58afd.js",
    "revision": "568bd4156abf6cc7712701a38c88c9a2"
  },
  {
    "url": "legacy/focusable-1687b6ec.js",
    "revision": "dc77fe1e81e8c4eb30a88fc19be43f74"
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
    "url": "legacy/index-13915a13.js",
    "revision": "115b7d18cbf5d34b1fe9aca10fb90959"
  },
  {
    "url": "legacy/index-151dad20.js",
    "revision": "65cd9a8b33cd7da89394f1389f263f5b"
  },
  {
    "url": "legacy/index-1630b18c.js",
    "revision": "cd851295b32243b8ce27ff4b6acea259"
  },
  {
    "url": "legacy/index-19234dc7.js",
    "revision": "ffabe539e91dc3e77c69bded67a3aeae"
  },
  {
    "url": "legacy/index-2d277eab.js",
    "revision": "8e15c81a7b24248994f5322f6287d7d6"
  },
  {
    "url": "legacy/index-4ca68bc5.js",
    "revision": "36517e75679df61c4594364189db7b5a"
  },
  {
    "url": "legacy/index-58377a4e.js",
    "revision": "afecee2bd0fd21063588d855ffb34195"
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
    "url": "legacy/index-71477891.js",
    "revision": "3577994995405757243f5d3194a850c0"
  },
  {
    "url": "legacy/index-a6a262ed.js",
    "revision": "f23c4e9ba57d5d7646c093aa130244c0"
  },
  {
    "url": "legacy/index-bd94fa3c.js",
    "revision": "fa1b7f58f4a1410f9cb36cefbc5343b1"
  },
  {
    "url": "legacy/index-e717bb07.js",
    "revision": "8ea06885aa69008a327d4ca123e6bfcd"
  },
  {
    "url": "legacy/index-f2e8c508.js",
    "revision": "915f2647e4647a956c1a53a3368ca5fd"
  },
  {
    "url": "legacy/inline-entry.0-9f99db40.js",
    "revision": "7f18742f4cbba88dcbf1da15478c18eb"
  },
  {
    "url": "legacy/link.stories-1237179f.js",
    "revision": "f9f910fba8cfcb95174bbea33795857e"
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
    "url": "legacy/menu.stories-d4a1dd6e.js",
    "revision": "a25d7a18f0d2ff9e1c525e1a89a43abb"
  },
  {
    "url": "legacy/observe-slot-text-569de70c.js",
    "revision": "660d664881a5a2cff4ba8f915f678f29"
  },
  {
    "url": "legacy/overlay.stories-a5b1f574.js",
    "revision": "0e05658a0ceebeaad92222fa6ec5d9f7"
  },
  {
    "url": "legacy/popover.stories-3b4bad38.js",
    "revision": "9480bd39cf9eab6a785bee8997a47852"
  },
  {
    "url": "legacy/preview-a0a114c9.js",
    "revision": "e9a8ff514766375fcc11ed7cb33c9f4e"
  },
  {
    "url": "legacy/radio.stories-60168e09.js",
    "revision": "b4ffdf815163d183d87c59813b1f26f3"
  },
  {
    "url": "legacy/search.stories-a547a8a8.js",
    "revision": "c53b2e02ce5cd819da9c8468e0fc35b3"
  },
  {
    "url": "legacy/sidenav.stories-de6ed63b.js",
    "revision": "5f39626f51933c87059a26d72b140b6b"
  },
  {
    "url": "legacy/slider.stories-cfe01d06.js",
    "revision": "2011e6d9e82175c46f0305018508c658"
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
    "url": "legacy/switch.stories-180096bb.js",
    "revision": "ced88324aac25300b97e64ded8a7df5c"
  },
  {
    "url": "legacy/tabs.stories-436871c8.js",
    "revision": "2f7742e1fae0a1fb0df2d1bbec957aa5"
  },
  {
    "url": "legacy/textarea.stories-107b1e7d.js",
    "revision": "97a5a1c86ba4a98084ae8f23f38a301b"
  },
  {
    "url": "legacy/textfield.stories-d4a1a73f.js",
    "revision": "cca86654c795163d97847035a3037c0e"
  },
  {
    "url": "legacy/theme.stories-26a58d94.js",
    "revision": "c3e652cbdca6745d027f4e498ce85a3e"
  },
  {
    "url": "legacy/toast.stories-01230341.js",
    "revision": "d159d4c8bfd1ab5f5ca6e3710e509ff5"
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
    "url": "link.stories-f712bafa.js",
    "revision": "4bf497f88699811877c621ff62c3716a"
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
    "url": "menu.stories-3b701888.js",
    "revision": "c6305321ff03f1aa5d22ad4d666f0c67"
  },
  {
    "url": "observe-slot-text-5194cee4.js",
    "revision": "1a06a2bbfd38b40f3331174ad07eceab"
  },
  {
    "url": "overlay.stories-a446a8fd.js",
    "revision": "d90b8f83d1afe992c21aca0c9c80458c"
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
    "url": "preview-060b457c.js",
    "revision": "fe2317f2610fc787e758f1ede9c2cf64"
  },
  {
    "url": "radio.stories-572ce686.js",
    "revision": "64d1c049d4c761c59890a4179e3b848a"
  },
  {
    "url": "search.stories-1e50f1a8.js",
    "revision": "b9bcae356c6a9ea9e47af6bfae7cbfb4"
  },
  {
    "url": "sidenav.stories-7592d753.js",
    "revision": "4313ec8abd40109b005d58656fd2dca3"
  },
  {
    "url": "slider.stories-9bf77689.js",
    "revision": "c4892621e8d18c8dfb9a8bb0a122654a"
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
    "url": "switch.stories-3555993a.js",
    "revision": "e777eacbd7426ab06bee4634953d3068"
  },
  {
    "url": "tabs.stories-793a6b22.js",
    "revision": "e3f6aeebe4bba54c25689b6e60d27c00"
  },
  {
    "url": "textarea.stories-14c0371e.js",
    "revision": "d3199017a9a1c73f76d83a66c1b28558"
  },
  {
    "url": "textfield.stories-6721ad93.js",
    "revision": "5ec64b6e512c6f18281976c398fe6816"
  },
  {
    "url": "theme.stories-8d3b9dc2.js",
    "revision": "4ac6037f75d7624ca3809770ed9a9b7b"
  },
  {
    "url": "toast.stories-170ad372.js",
    "revision": "3ca86f58ea7ce8d18284e223c72e4c8a"
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
