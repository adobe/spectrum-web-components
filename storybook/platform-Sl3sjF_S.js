function n(o){return typeof window!="undefined"&&window.navigator!=null?o.test(window.navigator.userAgent):!1}function e(o){return typeof window!="undefined"&&window.navigator!=null?o.test(window.navigator.platform):!1}function isMac(){return e(/^Mac/)}function isIPhone(){return e(/^iPhone/)}function isIPad(){return e(/^iPad/)||isMac()&&navigator.maxTouchPoints>1}function isIOS(){return isIPhone()||isIPad()}function isAndroid(){return n(/Android/)}

export { isAndroid as a, isIOS as b, isIPhone as i };
