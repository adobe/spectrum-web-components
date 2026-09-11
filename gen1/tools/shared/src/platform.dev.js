"use strict";
function testUserAgent(re) {
  return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator.userAgent) : false;
}
function testPlatform(re) {
  return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator.platform) : false;
}
export function isMac() {
  return testPlatform(/^Mac/);
}
export function isIPhone() {
  return testPlatform(/^iPhone/);
}
export function isIPad() {
  return testPlatform(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}
export function isIOS() {
  return isIPhone() || isIPad();
}
export function isAppleDevice() {
  return isMac() || isIOS();
}
export function isWebKit() {
  return testUserAgent(/AppleWebKit/) && !isChrome();
}
export function isChrome() {
  return testUserAgent(/Chrome/);
}
export function isFirefox() {
  return testUserAgent(/Firefox/) && !isSeamonkey();
}
export function isSeamonkey() {
  return testUserAgent(/Seamonkey/);
}
export function isAndroid() {
  return testUserAgent(/Android/);
}
//# sourceMappingURL=platform.dev.js.map
