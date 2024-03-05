import { r as react_default, b as __export30, c as __export28, d as __export23, e as __export31, f as __export19, g as __export27, n as newStyled, W as WithTooltip, T as TooltipNote, F as Form, I as Icons, h as getControlId } from './WithTooltip-V3YHNWJZ-jNaKoEC8.js';
import { i as init_define_process_env_NODE_PATH, _ as __export } from './chunk-Y45DR3KI-1BKxHGlv.js';
import { i as isObject_default, b as isSymbol_default, r as root_default } from './index-nLQZPpQB.js';
import './index-zsGAirFT.js';
import './index-PiJ8i7Ux.js';

function u(){return (u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);}return e}).apply(this,arguments)}function c(e,r){if(null==e)return {};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r.indexOf(t=a[n])>=0||(o[t]=e[t]);return o}function i(e){var t=__export30(e),n=__export30(function(e){t.current&&t.current(e);});return t.current=e,n.current}var s=function(e,r,t){return void 0===r&&(r=0),void 0===t&&(t=1),e>t?t:e<r?r:e},f=function(e){return "touches"in e},v=function(e){return e&&e.ownerDocument.defaultView||self},d=function(e,r,t){var n=e.getBoundingClientRect(),o=f(r)?function(e,r){for(var t=0;t<e.length;t++)if(e[t].identifier===r)return e[t];return e[0]}(r.touches,t):r;return {left:s((o.pageX-(n.left+v(e).pageXOffset))/n.width),top:s((o.pageY-(n.top+v(e).pageYOffset))/n.height)}},h=function(e){!f(e)&&e.preventDefault();},m=react_default.memo(function(o){var a=o.onMove,l=o.onKey,s=c(o,["onMove","onKey"]),m=__export30(null),g=i(a),p=i(l),b=__export30(null),_=__export30(!1),x=__export28(function(){var e=function(e){h(e),(f(e)?e.touches.length>0:e.buttons>0)&&m.current?g(d(m.current,e,b.current)):t(!1);},r=function(){return t(!1)};function t(t){var n=_.current,o=v(m.current),a=t?o.addEventListener:o.removeEventListener;a(n?"touchmove":"mousemove",e),a(n?"touchend":"mouseup",r);}return [function(e){var r=e.nativeEvent,n=m.current;if(n&&(h(r),!function(e,r){return r&&!f(e)}(r,_.current)&&n)){if(f(r)){_.current=!0;var o=r.changedTouches||[];o.length&&(b.current=o[0].identifier);}n.focus(),g(d(n,r,b.current)),t(!0);}},function(e){var r=e.which||e.keyCode;r<37||r>40||(e.preventDefault(),p({left:39===r?.05:37===r?-.05:0,top:40===r?.05:38===r?-.05:0}));},t]},[p,g]),C=x[0],E=x[1],H=x[2];return __export23(function(){return H},[H]),react_default.createElement("div",u({},s,{onTouchStart:C,onMouseDown:C,className:"react-colorful__interactive",ref:m,onKeyDown:E,tabIndex:0,role:"slider"}))}),g=function(e){return e.filter(Boolean).join(" ")},p=function(r){var t=r.color,n=r.left,o=r.top,a=void 0===o?.5:o,l=g(["react-colorful__pointer",r.className]);return react_default.createElement("div",{className:l,style:{top:100*a+"%",left:100*n+"%"}},react_default.createElement("div",{className:"react-colorful__pointer-fill",style:{backgroundColor:t}}))},b=function(e,r,t){return void 0===r&&(r=0),void 0===t&&(t=Math.pow(10,r)),Math.round(t*e)/t},_={grad:.9,turn:360,rad:360/(2*Math.PI)},x=function(e){return L(C(e))},C=function(e){return "#"===e[0]&&(e=e.substring(1)),e.length<6?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:4===e.length?b(parseInt(e[3]+e[3],16)/255,2):1}:{r:parseInt(e.substring(0,2),16),g:parseInt(e.substring(2,4),16),b:parseInt(e.substring(4,6),16),a:8===e.length?b(parseInt(e.substring(6,8),16)/255,2):1}},E=function(e,r){return void 0===r&&(r="deg"),Number(e)*(_[r]||1)},H=function(e){var r=/hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?N({h:E(r[1],r[2]),s:Number(r[3]),l:Number(r[4]),a:void 0===r[5]?1:Number(r[5])/(r[6]?100:1)}):{h:0,s:0,v:0,a:1}},N=function(e){var r=e.s,t=e.l;return {h:e.h,s:(r*=(t<50?t:100-t)/100)>0?2*r/(t+r)*100:0,v:t+r,a:e.a}},w=function(e){return K(I(e))},y=function(e){var r=e.s,t=e.v,n=e.a,o=(200-r)*t/100;return {h:b(e.h),s:b(o>0&&o<200?r*t/100/(o<=100?o:200-o)*100:0),l:b(o/2),a:b(n,2)}},q=function(e){var r=y(e);return "hsl("+r.h+", "+r.s+"%, "+r.l+"%)"},k=function(e){var r=y(e);return "hsla("+r.h+", "+r.s+"%, "+r.l+"%, "+r.a+")"},I=function(e){var r=e.h,t=e.s,n=e.v,o=e.a;r=r/360*6,t/=100,n/=100;var a=Math.floor(r),l=n*(1-t),u=n*(1-(r-a)*t),c=n*(1-(1-r+a)*t),i=a%6;return {r:b(255*[n,u,l,l,c,n][i]),g:b(255*[c,n,n,u,l,l][i]),b:b(255*[l,l,c,n,n,u][i]),a:b(o,2)}},z=function(e){var r=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?L({r:Number(r[1])/(r[2]?100/255:1),g:Number(r[3])/(r[4]?100/255:1),b:Number(r[5])/(r[6]?100/255:1),a:void 0===r[7]?1:Number(r[7])/(r[8]?100:1)}):{h:0,s:0,v:0,a:1}},D=function(e){var r=e.toString(16);return r.length<2?"0"+r:r},K=function(e){var r=e.r,t=e.g,n=e.b,o=e.a,a=o<1?D(b(255*o)):"";return "#"+D(r)+D(t)+D(n)+a},L=function(e){var r=e.r,t=e.g,n=e.b,o=e.a,a=Math.max(r,t,n),l=a-Math.min(r,t,n),u=l?a===r?(t-n)/l:a===t?2+(n-r)/l:4+(r-t)/l:0;return {h:b(60*(u<0?u+6:u)),s:b(a?l/a*100:0),v:b(a/255*100),a:o}},S=react_default.memo(function(r){var t=r.hue,n=r.onChange,o=g(["react-colorful__hue",r.className]);return react_default.createElement("div",{className:o},react_default.createElement(m,{onMove:function(e){n({h:360*e.left});},onKey:function(e){n({h:s(t+360*e.left,0,360)});},"aria-label":"Hue","aria-valuenow":b(t),"aria-valuemax":"360","aria-valuemin":"0"},react_default.createElement(p,{className:"react-colorful__hue-pointer",left:t/360,color:q({h:t,s:100,v:100,a:1})})))}),T=react_default.memo(function(r){var t=r.hsva,n=r.onChange,o={backgroundColor:q({h:t.h,s:100,v:100,a:1})};return react_default.createElement("div",{className:"react-colorful__saturation",style:o},react_default.createElement(m,{onMove:function(e){n({s:100*e.left,v:100-100*e.top});},onKey:function(e){n({s:s(t.s+100*e.left,0,100),v:s(t.v-100*e.top,0,100)});},"aria-label":"Color","aria-valuetext":"Saturation "+b(t.s)+"%, Brightness "+b(t.v)+"%"},react_default.createElement(p,{className:"react-colorful__saturation-pointer",top:1-t.v/100,left:t.s/100,color:q(t)})))}),F=function(e,r){if(e===r)return !0;for(var t in e)if(e[t]!==r[t])return !1;return !0},P=function(e,r){return e.replace(/\s/g,"")===r.replace(/\s/g,"")},X=function(e,r){return e.toLowerCase()===r.toLowerCase()||F(C(e),C(r))};function Y(e,t,l){var u=i(l),c=__export31(function(){return e.toHsva(t)}),s=c[0],f=c[1],v=__export30({color:t,hsva:s});__export23(function(){if(!e.equal(t,v.current.color)){var r=e.toHsva(t);v.current={hsva:r,color:t},f(r);}},[t,e]),__export23(function(){var r;F(s,v.current.hsva)||e.equal(r=e.fromHsva(s),v.current.color)||(v.current={hsva:s,color:r},u(r));},[s,e,u]);var d=__export19(function(e){f(function(r){return Object.assign({},r,e)});},[]);return [s,d]}var V="undefined"!=typeof window?__export27:__export23,$=function(){return ("undefined"!=typeof __webpack_nonce__?__webpack_nonce__:void 0)},J=new Map,Q=function(e){V(function(){var r=e.current?e.current.ownerDocument:document;if(void 0!==r&&!J.has(r)){var t=r.createElement("style");t.innerHTML='.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>\')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}',J.set(r,t);var n=$();n&&t.setAttribute("nonce",n),r.head.appendChild(t);}},[]);},U=function(t){var n=t.className,o=t.colorModel,a=t.color,l=void 0===a?o.defaultColor:a,i=t.onChange,s=c(t,["className","colorModel","color","onChange"]),f=__export30(null);Q(f);var v=Y(o,l,i),d=v[0],h=v[1],m=g(["react-colorful",n]);return react_default.createElement("div",u({},s,{ref:f,className:m}),react_default.createElement(T,{hsva:d,onChange:h}),react_default.createElement(S,{hue:d.h,onChange:h,className:"react-colorful__last-control"}))},W={defaultColor:"000",toHsva:x,fromHsva:function(e){return w({h:e.h,s:e.s,v:e.v,a:1})},equal:X},Z=function(r){return react_default.createElement(U,u({},r,{colorModel:W}))},ee=function(r){var t=r.className,n=r.hsva,o=r.onChange,a={backgroundImage:"linear-gradient(90deg, "+k(Object.assign({},n,{a:0}))+", "+k(Object.assign({},n,{a:1}))+")"},l=g(["react-colorful__alpha",t]),u=b(100*n.a);return react_default.createElement("div",{className:l},react_default.createElement("div",{className:"react-colorful__alpha-gradient",style:a}),react_default.createElement(m,{onMove:function(e){o({a:e.left});},onKey:function(e){o({a:s(n.a+e.left)});},"aria-label":"Alpha","aria-valuetext":u+"%","aria-valuenow":u,"aria-valuemin":"0","aria-valuemax":"100"},react_default.createElement(p,{className:"react-colorful__alpha-pointer",left:n.a,color:k(n)})))},re=function(t){var n=t.className,o=t.colorModel,a=t.color,l=void 0===a?o.defaultColor:a,i=t.onChange,s=c(t,["className","colorModel","color","onChange"]),f=__export30(null);Q(f);var v=Y(o,l,i),d=v[0],h=v[1],m=g(["react-colorful",n]);return react_default.createElement("div",u({},s,{ref:f,className:m}),react_default.createElement(T,{hsva:d,onChange:h}),react_default.createElement(S,{hue:d.h,onChange:h}),react_default.createElement(ee,{hsva:d,onChange:h,className:"react-colorful__last-control"}))},le={defaultColor:"hsla(0, 0%, 0%, 1)",toHsva:H,fromHsva:k,equal:P},ue=function(r){return react_default.createElement(re,u({},r,{colorModel:le}))},Ee={defaultColor:"rgba(0, 0, 0, 1)",toHsva:z,fromHsva:function(e){var r=I(e);return "rgba("+r.r+", "+r.g+", "+r.b+", "+r.a+")"},equal:P},He=function(r){return react_default.createElement(re,u({},r,{colorModel:Ee}))};

// node_modules/color-convert/index.js
init_define_process_env_NODE_PATH();

// node_modules/color-convert/route.js
var route_exports = {};
__export(route_exports, {
  default: () => route_default
});
init_define_process_env_NODE_PATH();

// node_modules/color-convert/conversions.js
var conversions_exports = {};
__export(conversions_exports, {
  default: () => conversions_default
});
init_define_process_env_NODE_PATH();

// node_modules/color-convert/node_modules/color-name/index.js
var color_name_exports = {};
__export(color_name_exports, {
  default: () => color_name_default
});
init_define_process_env_NODE_PATH();
var exports = {};
var module = {
  get exports() {
    return exports;
  },
  set exports(value) {
    exports = value;
  }
};
module.exports = {
  "aliceblue": [240, 248, 255],
  "antiquewhite": [250, 235, 215],
  "aqua": [0, 255, 255],
  "aquamarine": [127, 255, 212],
  "azure": [240, 255, 255],
  "beige": [245, 245, 220],
  "bisque": [255, 228, 196],
  "black": [0, 0, 0],
  "blanchedalmond": [255, 235, 205],
  "blue": [0, 0, 255],
  "blueviolet": [138, 43, 226],
  "brown": [165, 42, 42],
  "burlywood": [222, 184, 135],
  "cadetblue": [95, 158, 160],
  "chartreuse": [127, 255, 0],
  "chocolate": [210, 105, 30],
  "coral": [255, 127, 80],
  "cornflowerblue": [100, 149, 237],
  "cornsilk": [255, 248, 220],
  "crimson": [220, 20, 60],
  "cyan": [0, 255, 255],
  "darkblue": [0, 0, 139],
  "darkcyan": [0, 139, 139],
  "darkgoldenrod": [184, 134, 11],
  "darkgray": [169, 169, 169],
  "darkgreen": [0, 100, 0],
  "darkgrey": [169, 169, 169],
  "darkkhaki": [189, 183, 107],
  "darkmagenta": [139, 0, 139],
  "darkolivegreen": [85, 107, 47],
  "darkorange": [255, 140, 0],
  "darkorchid": [153, 50, 204],
  "darkred": [139, 0, 0],
  "darksalmon": [233, 150, 122],
  "darkseagreen": [143, 188, 143],
  "darkslateblue": [72, 61, 139],
  "darkslategray": [47, 79, 79],
  "darkslategrey": [47, 79, 79],
  "darkturquoise": [0, 206, 209],
  "darkviolet": [148, 0, 211],
  "deeppink": [255, 20, 147],
  "deepskyblue": [0, 191, 255],
  "dimgray": [105, 105, 105],
  "dimgrey": [105, 105, 105],
  "dodgerblue": [30, 144, 255],
  "firebrick": [178, 34, 34],
  "floralwhite": [255, 250, 240],
  "forestgreen": [34, 139, 34],
  "fuchsia": [255, 0, 255],
  "gainsboro": [220, 220, 220],
  "ghostwhite": [248, 248, 255],
  "gold": [255, 215, 0],
  "goldenrod": [218, 165, 32],
  "gray": [128, 128, 128],
  "green": [0, 128, 0],
  "greenyellow": [173, 255, 47],
  "grey": [128, 128, 128],
  "honeydew": [240, 255, 240],
  "hotpink": [255, 105, 180],
  "indianred": [205, 92, 92],
  "indigo": [75, 0, 130],
  "ivory": [255, 255, 240],
  "khaki": [240, 230, 140],
  "lavender": [230, 230, 250],
  "lavenderblush": [255, 240, 245],
  "lawngreen": [124, 252, 0],
  "lemonchiffon": [255, 250, 205],
  "lightblue": [173, 216, 230],
  "lightcoral": [240, 128, 128],
  "lightcyan": [224, 255, 255],
  "lightgoldenrodyellow": [250, 250, 210],
  "lightgray": [211, 211, 211],
  "lightgreen": [144, 238, 144],
  "lightgrey": [211, 211, 211],
  "lightpink": [255, 182, 193],
  "lightsalmon": [255, 160, 122],
  "lightseagreen": [32, 178, 170],
  "lightskyblue": [135, 206, 250],
  "lightslategray": [119, 136, 153],
  "lightslategrey": [119, 136, 153],
  "lightsteelblue": [176, 196, 222],
  "lightyellow": [255, 255, 224],
  "lime": [0, 255, 0],
  "limegreen": [50, 205, 50],
  "linen": [250, 240, 230],
  "magenta": [255, 0, 255],
  "maroon": [128, 0, 0],
  "mediumaquamarine": [102, 205, 170],
  "mediumblue": [0, 0, 205],
  "mediumorchid": [186, 85, 211],
  "mediumpurple": [147, 112, 219],
  "mediumseagreen": [60, 179, 113],
  "mediumslateblue": [123, 104, 238],
  "mediumspringgreen": [0, 250, 154],
  "mediumturquoise": [72, 209, 204],
  "mediumvioletred": [199, 21, 133],
  "midnightblue": [25, 25, 112],
  "mintcream": [245, 255, 250],
  "mistyrose": [255, 228, 225],
  "moccasin": [255, 228, 181],
  "navajowhite": [255, 222, 173],
  "navy": [0, 0, 128],
  "oldlace": [253, 245, 230],
  "olive": [128, 128, 0],
  "olivedrab": [107, 142, 35],
  "orange": [255, 165, 0],
  "orangered": [255, 69, 0],
  "orchid": [218, 112, 214],
  "palegoldenrod": [238, 232, 170],
  "palegreen": [152, 251, 152],
  "paleturquoise": [175, 238, 238],
  "palevioletred": [219, 112, 147],
  "papayawhip": [255, 239, 213],
  "peachpuff": [255, 218, 185],
  "peru": [205, 133, 63],
  "pink": [255, 192, 203],
  "plum": [221, 160, 221],
  "powderblue": [176, 224, 230],
  "purple": [128, 0, 128],
  "rebeccapurple": [102, 51, 153],
  "red": [255, 0, 0],
  "rosybrown": [188, 143, 143],
  "royalblue": [65, 105, 225],
  "saddlebrown": [139, 69, 19],
  "salmon": [250, 128, 114],
  "sandybrown": [244, 164, 96],
  "seagreen": [46, 139, 87],
  "seashell": [255, 245, 238],
  "sienna": [160, 82, 45],
  "silver": [192, 192, 192],
  "skyblue": [135, 206, 235],
  "slateblue": [106, 90, 205],
  "slategray": [112, 128, 144],
  "slategrey": [112, 128, 144],
  "snow": [255, 250, 250],
  "springgreen": [0, 255, 127],
  "steelblue": [70, 130, 180],
  "tan": [210, 180, 140],
  "teal": [0, 128, 128],
  "thistle": [216, 191, 216],
  "tomato": [255, 99, 71],
  "turquoise": [64, 224, 208],
  "violet": [238, 130, 238],
  "wheat": [245, 222, 179],
  "white": [255, 255, 255],
  "whitesmoke": [245, 245, 245],
  "yellow": [255, 255, 0],
  "yellowgreen": [154, 205, 50]
};
var color_name_default = module.exports;

// node_modules/color-convert/conversions.js
function $$cjs_default$$(requiredModule) {
  var Object2 = (typeof window !== "undefined" && window || typeof self !== "undefined" && self || typeof global !== "undefined" && global || typeof globalThis !== "undefined" && globalThis || {}).Object;
  var specifiers = Object2.create(null);
  var hasNamedExports = false;
  var hasDefaultExport = false;
  Object2.defineProperty(specifiers, "__esModule", {
    value: true,
    enumerable: false,
    configurable: true
  });
  if (requiredModule) {
    var names = Object2.getOwnPropertyNames(requiredModule);
    names.forEach(function(k) {
      if (k === "default") {
        hasDefaultExport = true;
      } else if (!hasNamedExports && k != "__esModule") {
        try {
          hasNamedExports = requiredModule[k] != null;
        } catch (err) {
        }
      }
      Object2.defineProperty(specifiers, k, {
        get: function() {
          return requiredModule[k];
        },
        enumerable: true,
        configurable: false
      });
    });
    if (Object2.getOwnPropertySymbols) {
      var symbols = Object2.getOwnPropertySymbols(requiredModule);
      symbols.forEach(function(k) {
        Object2.defineProperty(specifiers, k, {
          get: function() {
            return requiredModule[k];
          },
          enumerable: false,
          configurable: false
        });
      });
    }
    Object2.preventExtensions(specifiers);
    Object2.seal(specifiers);
    if (Object2.freeze) {
      Object2.freeze(specifiers);
    }
  }
  if (hasNamedExports) {
    return specifiers;
  }
  if (hasDefaultExport) {
    if (Object2.isExtensible(specifiers.default) && !("default" in specifiers.default)) {
      Object2.defineProperty(specifiers.default, "default", {
        value: specifiers.default,
        configurable: false,
        enumerable: false
      });
    }
    return specifiers.default;
  }
  return specifiers;
}
var global = typeof window !== "undefined" && window || typeof self !== "undefined" && self || typeof global !== "undefined" && global || typeof globalThis !== "undefined" && globalThis || {};
var exports2 = {};
var module2 = {
  get exports() {
    return exports2;
  },
  set exports(value) {
    exports2 = value;
  }
};
var cssKeywords = $$cjs_default$$(typeof color_name_exports !== "undefined" ? color_name_exports : {});
var reverseKeywords = {};
for (key in cssKeywords) {
  if (cssKeywords.hasOwnProperty(key)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
}
var key;
var convert = module2.exports = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  lch: { channels: 3, labels: "lch" },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
};
for (model in convert) {
  if (convert.hasOwnProperty(model)) {
    if (!("channels" in convert[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert[model].labels.length !== convert[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    channels = convert[model].channels;
    labels = convert[model].labels;
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], "channels", { value: channels });
    Object.defineProperty(convert[model], "labels", { value: labels });
  }
}
var channels;
var labels;
var model;
convert.rgb.hsl = function(rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  var delta = max - min;
  var h;
  var s;
  var l;
  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  l = (min + max) / 2;
  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }
  return [h, s * 100, l * 100];
};
convert.rgb.hsv = function(rgb) {
  var rdif;
  var gdif;
  var bdif;
  var h;
  var s;
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var v = Math.max(r, g, b);
  var diff = v - Math.min(r, g, b);
  var diffc = function(c) {
    return (v - c) / 6 / diff + 1 / 2;
  };
  if (diff === 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);
    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return [
    h * 360,
    s * 100,
    v * 100
  ];
};
convert.rgb.hwb = function(rgb) {
  var r = rgb[0];
  var g = rgb[1];
  var b = rgb[2];
  var h = convert.rgb.hsl(rgb)[0];
  var w = 1 / 255 * Math.min(r, Math.min(g, b));
  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
  return [h, w * 100, b * 100];
};
convert.rgb.cmyk = function(rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var c;
  var m;
  var y;
  var k;
  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
};
function comparativeDistance(x, y) {
  return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
}
convert.rgb.keyword = function(rgb) {
  var reversed = reverseKeywords[rgb];
  if (reversed) {
    return reversed;
  }
  var currentClosestDistance = Infinity;
  var currentClosestKeyword;
  for (var keyword in cssKeywords) {
    if (cssKeywords.hasOwnProperty(keyword)) {
      var value = cssKeywords[keyword];
      var distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
  }
  return currentClosestKeyword;
};
convert.keyword.rgb = function(keyword) {
  return cssKeywords[keyword];
};
convert.rgb.xyz = function(rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  return [x * 100, y * 100, z * 100];
};
convert.rgb.lab = function(rgb) {
  var xyz = convert.rgb.xyz(rgb);
  var x = xyz[0];
  var y = xyz[1];
  var z = xyz[2];
  var l;
  var a;
  var b;
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  l = 116 * y - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);
  return [l, a, b];
};
convert.hsl.rgb = function(hsl) {
  var h = hsl[0] / 360;
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var t1;
  var t2;
  var t3;
  var rgb;
  var val;
  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }
  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }
  t1 = 2 * l - t2;
  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * -(i - 1);
    if (t3 < 0) {
      t3++;
    }
    if (t3 > 1) {
      t3--;
    }
    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }
    rgb[i] = val * 255;
  }
  return rgb;
};
convert.hsl.hsv = function(hsl) {
  var h = hsl[0];
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var smin = s;
  var lmin = Math.max(l, 0.01);
  var sv;
  var v;
  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  v = (l + s) / 2;
  sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
  return [h, sv * 100, v * 100];
};
convert.hsv.rgb = function(hsv) {
  var h = hsv[0] / 60;
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var hi = Math.floor(h) % 6;
  var f = h - Math.floor(h);
  var p = 255 * v * (1 - s);
  var q = 255 * v * (1 - s * f);
  var t = 255 * v * (1 - s * (1 - f));
  v *= 255;
  switch (hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
};
convert.hsv.hsl = function(hsv) {
  var h = hsv[0];
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var vmin = Math.max(v, 0.01);
  var lmin;
  var sl;
  var l;
  l = (2 - s) * v;
  lmin = (2 - s) * vmin;
  sl = s * vmin;
  sl /= lmin <= 1 ? lmin : 2 - lmin;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
};
convert.hwb.rgb = function(hwb) {
  var h = hwb[0] / 360;
  var wh = hwb[1] / 100;
  var bl = hwb[2] / 100;
  var ratio = wh + bl;
  var i;
  var v;
  var f;
  var n;
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }
  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 1) !== 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);
  var r;
  var g;
  var b;
  switch (i) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;
    case 1:
      r = n;
      g = v;
      b = wh;
      break;
    case 2:
      r = wh;
      g = v;
      b = n;
      break;
    case 3:
      r = wh;
      g = n;
      b = v;
      break;
    case 4:
      r = n;
      g = wh;
      b = v;
      break;
    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }
  return [r * 255, g * 255, b * 255];
};
convert.cmyk.rgb = function(cmyk) {
  var c = cmyk[0] / 100;
  var m = cmyk[1] / 100;
  var y = cmyk[2] / 100;
  var k = cmyk[3] / 100;
  var r;
  var g;
  var b;
  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
};
convert.xyz.rgb = function(xyz) {
  var x = xyz[0] / 100;
  var y = xyz[1] / 100;
  var z = xyz[2] / 100;
  var r;
  var g;
  var b;
  r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  b = x * 0.0557 + y * -0.204 + z * 1.057;
  r = r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
  g = g > 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
  b = b > 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);
  return [r * 255, g * 255, b * 255];
};
convert.xyz.lab = function(xyz) {
  var x = xyz[0];
  var y = xyz[1];
  var z = xyz[2];
  var l;
  var a;
  var b;
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  l = 116 * y - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);
  return [l, a, b];
};
convert.lab.xyz = function(lab) {
  var l = lab[0];
  var a = lab[1];
  var b = lab[2];
  var x;
  var y;
  var z;
  y = (l + 16) / 116;
  x = a / 500 + y;
  z = y - b / 200;
  var y2 = Math.pow(y, 3);
  var x2 = Math.pow(x, 3);
  var z2 = Math.pow(z, 3);
  y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
  x *= 95.047;
  y *= 100;
  z *= 108.883;
  return [x, y, z];
};
convert.lab.lch = function(lab) {
  var l = lab[0];
  var a = lab[1];
  var b = lab[2];
  var hr;
  var h;
  var c;
  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
};
convert.lch.lab = function(lch) {
  var l = lch[0];
  var c = lch[1];
  var h = lch[2];
  var a;
  var b;
  var hr;
  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
};
convert.rgb.ansi16 = function(args) {
  var r = args[0];
  var g = args[1];
  var b = args[2];
  var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];
  value = Math.round(value / 50);
  if (value === 0) {
    return 30;
  }
  var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
  if (value === 2) {
    ansi += 60;
  }
  return ansi;
};
convert.hsv.ansi16 = function(args) {
  return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};
convert.rgb.ansi256 = function(args) {
  var r = args[0];
  var g = args[1];
  var b = args[2];
  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }
    if (r > 248) {
      return 231;
    }
    return Math.round((r - 8) / 247 * 24) + 232;
  }
  var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
  return ansi;
};
convert.ansi16.rgb = function(args) {
  var color = args % 10;
  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5;
    }
    color = color / 10.5 * 255;
    return [color, color, color];
  }
  var mult = (~~(args > 50) + 1) * 0.5;
  var r = (color & 1) * mult * 255;
  var g = (color >> 1 & 1) * mult * 255;
  var b = (color >> 2 & 1) * mult * 255;
  return [r, g, b];
};
convert.ansi256.rgb = function(args) {
  if (args >= 232) {
    var c = (args - 232) * 10 + 8;
    return [c, c, c];
  }
  args -= 16;
  var rem;
  var r = Math.floor(args / 36) / 5 * 255;
  var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
  var b = rem % 6 / 5 * 255;
  return [r, g, b];
};
convert.rgb.hex = function(args) {
  var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
  var string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
};
convert.hex.rgb = function(args) {
  var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) {
    return [0, 0, 0];
  }
  var colorString = match[0];
  if (match[0].length === 3) {
    colorString = colorString.split("").map(function(char) {
      return char + char;
    }).join("");
  }
  var integer = parseInt(colorString, 16);
  var r = integer >> 16 & 255;
  var g = integer >> 8 & 255;
  var b = integer & 255;
  return [r, g, b];
};
convert.rgb.hcg = function(rgb) {
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var max = Math.max(Math.max(r, g), b);
  var min = Math.min(Math.min(r, g), b);
  var chroma = max - min;
  var grayscale;
  var hue;
  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }
  if (chroma <= 0) {
    hue = 0;
  } else if (max === r) {
    hue = (g - b) / chroma % 6;
  } else if (max === g) {
    hue = 2 + (b - r) / chroma;
  } else {
    hue = 4 + (r - g) / chroma + 4;
  }
  hue /= 6;
  hue %= 1;
  return [hue * 360, chroma * 100, grayscale * 100];
};
convert.hsl.hcg = function(hsl) {
  var s = hsl[1] / 100;
  var l = hsl[2] / 100;
  var c = 1;
  var f = 0;
  if (l < 0.5) {
    c = 2 * s * l;
  } else {
    c = 2 * s * (1 - l);
  }
  if (c < 1) {
    f = (l - 0.5 * c) / (1 - c);
  }
  return [hsl[0], c * 100, f * 100];
};
convert.hsv.hcg = function(hsv) {
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var c = s * v;
  var f = 0;
  if (c < 1) {
    f = (v - c) / (1 - c);
  }
  return [hsv[0], c * 100, f * 100];
};
convert.hcg.rgb = function(hcg) {
  var h = hcg[0] / 360;
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  if (c === 0) {
    return [g * 255, g * 255, g * 255];
  }
  var pure = [0, 0, 0];
  var hi = h % 1 * 6;
  var v = hi % 1;
  var w = 1 - v;
  var mg = 0;
  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1;
      pure[1] = v;
      pure[2] = 0;
      break;
    case 1:
      pure[0] = w;
      pure[1] = 1;
      pure[2] = 0;
      break;
    case 2:
      pure[0] = 0;
      pure[1] = 1;
      pure[2] = v;
      break;
    case 3:
      pure[0] = 0;
      pure[1] = w;
      pure[2] = 1;
      break;
    case 4:
      pure[0] = v;
      pure[1] = 0;
      pure[2] = 1;
      break;
    default:
      pure[0] = 1;
      pure[1] = 0;
      pure[2] = w;
  }
  mg = (1 - c) * g;
  return [
    (c * pure[0] + mg) * 255,
    (c * pure[1] + mg) * 255,
    (c * pure[2] + mg) * 255
  ];
};
convert.hcg.hsv = function(hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var v = c + g * (1 - c);
  var f = 0;
  if (v > 0) {
    f = c / v;
  }
  return [hcg[0], f * 100, v * 100];
};
convert.hcg.hsl = function(hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var l = g * (1 - c) + 0.5 * c;
  var s = 0;
  if (l > 0 && l < 0.5) {
    s = c / (2 * l);
  } else if (l >= 0.5 && l < 1) {
    s = c / (2 * (1 - l));
  }
  return [hcg[0], s * 100, l * 100];
};
convert.hcg.hwb = function(hcg) {
  var c = hcg[1] / 100;
  var g = hcg[2] / 100;
  var v = c + g * (1 - c);
  return [hcg[0], (v - c) * 100, (1 - v) * 100];
};
convert.hwb.hcg = function(hwb) {
  var w = hwb[1] / 100;
  var b = hwb[2] / 100;
  var v = 1 - b;
  var c = v - w;
  var g = 0;
  if (c < 1) {
    g = (v - c) / (1 - c);
  }
  return [hwb[0], c * 100, g * 100];
};
convert.apple.rgb = function(apple) {
  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};
convert.rgb.apple = function(rgb) {
  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};
convert.gray.rgb = function(args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};
convert.gray.hsl = convert.gray.hsv = function(args) {
  return [0, 0, args[0]];
};
convert.gray.hwb = function(gray) {
  return [0, 100, gray[0]];
};
convert.gray.cmyk = function(gray) {
  return [0, 0, 0, gray[0]];
};
convert.gray.lab = function(gray) {
  return [gray[0], 0, 0];
};
convert.gray.hex = function(gray) {
  var val = Math.round(gray[0] / 100 * 255) & 255;
  var integer = (val << 16) + (val << 8) + val;
  var string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
};
convert.rgb.gray = function(rgb) {
  var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return [val / 255 * 100];
};
var conversions_default = module2.exports;

// node_modules/color-convert/route.js
function $$cjs_default$$2(requiredModule) {
  var Object2 = (typeof window !== "undefined" && window || typeof self !== "undefined" && self || typeof global2 !== "undefined" && global2 || typeof globalThis !== "undefined" && globalThis || {}).Object;
  var specifiers = Object2.create(null);
  var hasNamedExports = false;
  var hasDefaultExport = false;
  Object2.defineProperty(specifiers, "__esModule", {
    value: true,
    enumerable: false,
    configurable: true
  });
  if (requiredModule) {
    var names = Object2.getOwnPropertyNames(requiredModule);
    names.forEach(function(k) {
      if (k === "default") {
        hasDefaultExport = true;
      } else if (!hasNamedExports && k != "__esModule") {
        try {
          hasNamedExports = requiredModule[k] != null;
        } catch (err) {
        }
      }
      Object2.defineProperty(specifiers, k, {
        get: function() {
          return requiredModule[k];
        },
        enumerable: true,
        configurable: false
      });
    });
    if (Object2.getOwnPropertySymbols) {
      var symbols = Object2.getOwnPropertySymbols(requiredModule);
      symbols.forEach(function(k) {
        Object2.defineProperty(specifiers, k, {
          get: function() {
            return requiredModule[k];
          },
          enumerable: false,
          configurable: false
        });
      });
    }
    Object2.preventExtensions(specifiers);
    Object2.seal(specifiers);
    if (Object2.freeze) {
      Object2.freeze(specifiers);
    }
  }
  if (hasNamedExports) {
    return specifiers;
  }
  if (hasDefaultExport) {
    if (Object2.isExtensible(specifiers.default) && !("default" in specifiers.default)) {
      Object2.defineProperty(specifiers.default, "default", {
        value: specifiers.default,
        configurable: false,
        enumerable: false
      });
    }
    return specifiers.default;
  }
  return specifiers;
}
var global2 = typeof window !== "undefined" && window || typeof self !== "undefined" && self || typeof global2 !== "undefined" && global2 || typeof globalThis !== "undefined" && globalThis || {};
var exports3 = {};
var module3 = {
  get exports() {
    return exports3;
  },
  set exports(value) {
    exports3 = value;
  }
};
var conversions = $$cjs_default$$2(typeof conversions_exports !== "undefined" ? conversions_exports : {});
function buildGraph() {
  var graph = {};
  var models2 = Object.keys(conversions);
  for (var len = models2.length, i = 0; i < len; i++) {
    graph[models2[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  }
  return graph;
}
function deriveBFS(fromModel) {
  var graph = buildGraph();
  var queue = [fromModel];
  graph[fromModel].distance = 0;
  while (queue.length) {
    var current = queue.pop();
    var adjacents = Object.keys(conversions[current]);
    for (var len = adjacents.length, i = 0; i < len; i++) {
      var adjacent = adjacents[i];
      var node = graph[adjacent];
      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue.unshift(adjacent);
      }
    }
  }
  return graph;
}
function link(from, to) {
  return function(args) {
    return to(from(args));
  };
}
function wrapConversion(toModel, graph) {
  var path = [graph[toModel].parent, toModel];
  var fn = conversions[graph[toModel].parent][toModel];
  var cur = graph[toModel].parent;
  while (graph[cur].parent) {
    path.unshift(graph[cur].parent);
    fn = link(conversions[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }
  fn.conversion = path;
  return fn;
}
module3.exports = function(fromModel) {
  var graph = deriveBFS(fromModel);
  var conversion = {};
  var models2 = Object.keys(graph);
  for (var len = models2.length, i = 0; i < len; i++) {
    var toModel = models2[i];
    var node = graph[toModel];
    if (node.parent === null) {
      continue;
    }
    conversion[toModel] = wrapConversion(toModel, graph);
  }
  return conversion;
};
var route_default = module3.exports;

// node_modules/color-convert/index.js
function $$cjs_default$$3(requiredModule) {
  var Object2 = (typeof window !== "undefined" && window || typeof self !== "undefined" && self || typeof global3 !== "undefined" && global3 || typeof globalThis !== "undefined" && globalThis || {}).Object;
  var specifiers = Object2.create(null);
  var hasNamedExports = false;
  var hasDefaultExport = false;
  Object2.defineProperty(specifiers, "__esModule", {
    value: true,
    enumerable: false,
    configurable: true
  });
  if (requiredModule) {
    var names = Object2.getOwnPropertyNames(requiredModule);
    names.forEach(function(k) {
      if (k === "default") {
        hasDefaultExport = true;
      } else if (!hasNamedExports && k != "__esModule") {
        try {
          hasNamedExports = requiredModule[k] != null;
        } catch (err) {
        }
      }
      Object2.defineProperty(specifiers, k, {
        get: function() {
          return requiredModule[k];
        },
        enumerable: true,
        configurable: false
      });
    });
    if (Object2.getOwnPropertySymbols) {
      var symbols = Object2.getOwnPropertySymbols(requiredModule);
      symbols.forEach(function(k) {
        Object2.defineProperty(specifiers, k, {
          get: function() {
            return requiredModule[k];
          },
          enumerable: false,
          configurable: false
        });
      });
    }
    Object2.preventExtensions(specifiers);
    Object2.seal(specifiers);
    if (Object2.freeze) {
      Object2.freeze(specifiers);
    }
  }
  if (hasNamedExports) {
    return specifiers;
  }
  if (hasDefaultExport) {
    if (Object2.isExtensible(specifiers.default) && !("default" in specifiers.default)) {
      Object2.defineProperty(specifiers.default, "default", {
        value: specifiers.default,
        configurable: false,
        enumerable: false
      });
    }
    return specifiers.default;
  }
  return specifiers;
}
var global3 = typeof window !== "undefined" && window || typeof self !== "undefined" && self || typeof global3 !== "undefined" && global3 || typeof globalThis !== "undefined" && globalThis || {};
var exports4 = {};
var module4 = {
  get exports() {
    return exports4;
  },
  set exports(value) {
    exports4 = value;
  }
};
var conversions2 = $$cjs_default$$3(typeof conversions_exports !== "undefined" ? conversions_exports : {});
var route = $$cjs_default$$3(typeof route_exports !== "undefined" ? route_exports : {});
var convert2 = {};
var models = Object.keys(conversions2);
function wrapRaw(fn) {
  var wrappedFn = function(args) {
    if (args === void 0 || args === null) {
      return args;
    }
    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments);
    }
    return fn(args);
  };
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
function wrapRounded(fn) {
  var wrappedFn = function(args) {
    if (args === void 0 || args === null) {
      return args;
    }
    if (arguments.length > 1) {
      args = Array.prototype.slice.call(arguments);
    }
    var result = fn(args);
    if (typeof result === "object") {
      for (var len = result.length, i = 0; i < len; i++) {
        result[i] = Math.round(result[i]);
      }
    }
    return result;
  };
  if ("conversion" in fn) {
    wrappedFn.conversion = fn.conversion;
  }
  return wrappedFn;
}
models.forEach(function(fromModel) {
  convert2[fromModel] = {};
  Object.defineProperty(convert2[fromModel], "channels", { value: conversions2[fromModel].channels });
  Object.defineProperty(convert2[fromModel], "labels", { value: conversions2[fromModel].labels });
  var routes = route(fromModel);
  var routeModels = Object.keys(routes);
  routeModels.forEach(function(toModel) {
    var fn = routes[toModel];
    convert2[fromModel][toModel] = wrapRounded(fn);
    convert2[fromModel][toModel].raw = wrapRaw(fn);
  });
});
module4.exports = convert2;
var color_convert_default = module4.exports;

// node_modules/lodash-es/throttle.js
init_define_process_env_NODE_PATH();

// node_modules/lodash-es/debounce.js
init_define_process_env_NODE_PATH();

// node_modules/lodash-es/now.js
init_define_process_env_NODE_PATH();
var now = function() {
  return root_default.Date.now();
};
var now_default = now;

// node_modules/lodash-es/toNumber.js
init_define_process_env_NODE_PATH();

// node_modules/lodash-es/_baseTrim.js
init_define_process_env_NODE_PATH();

// node_modules/lodash-es/_trimmedEndIndex.js
init_define_process_env_NODE_PATH();
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var trimmedEndIndex_default = trimmedEndIndex;

// node_modules/lodash-es/_baseTrim.js
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
}
var baseTrim_default = baseTrim;

// node_modules/lodash-es/toNumber.js
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol_default(value)) {
    return NAN;
  }
  if (isObject_default(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject_default(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim_default(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_default = toNumber;

// node_modules/lodash-es/debounce.js
var FUNC_ERROR_TEXT = "Expected a function";
var nativeMax = Math.max;
var nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber_default(wait) || 0;
  if (isObject_default(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber_default(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now_default();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now_default());
  }
  function debounced() {
    var time = now_default(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var debounce_default = debounce;

// node_modules/lodash-es/throttle.js
var FUNC_ERROR_TEXT2 = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT2);
  }
  if (isObject_default(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce_default(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
var throttle_default = throttle;

var Wrapper=newStyled.div({position:"relative",maxWidth:250}),PickerTooltip=newStyled(WithTooltip)({position:"absolute",zIndex:1,top:4,left:4}),TooltipContent=newStyled.div({width:200,margin:5,".react-colorful__saturation":{borderRadius:"4px 4px 0 0"},".react-colorful__hue":{boxShadow:"inset 0 0 0 1px rgb(0 0 0 / 5%)"},".react-colorful__last-control":{borderRadius:"0 0 4px 4px"}}),Note=newStyled(TooltipNote)(({theme})=>({fontFamily:theme.typography.fonts.base})),Swatches=newStyled.div({display:"grid",gridTemplateColumns:"repeat(9, 16px)",gap:6,padding:3,marginTop:5,width:200}),SwatchColor=newStyled.div(({theme,active})=>({width:16,height:16,boxShadow:active?`${theme.appBorderColor} 0 0 0 1px inset, ${theme.textMutedColor}50 0 0 0 4px`:`${theme.appBorderColor} 0 0 0 1px inset`,borderRadius:theme.appBorderRadius})),swatchBackground=`url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,Swatch=({value,active,onClick,style,...props})=>{let backgroundImage=`linear-gradient(${value}, ${value}), ${swatchBackground}, linear-gradient(#fff, #fff)`;return react_default.createElement(SwatchColor,{...props,active,onClick,style:{...style,backgroundImage}})},Input=newStyled(Form.Input)(({theme})=>({width:"100%",paddingLeft:30,paddingRight:30,boxSizing:"border-box",fontFamily:theme.typography.fonts.base})),ToggleIcon=newStyled(Icons)(({theme})=>({position:"absolute",zIndex:1,top:6,right:7,width:20,height:20,padding:4,boxSizing:"border-box",cursor:"pointer",color:theme.input.color})),ColorSpace=(ColorSpace2=>(ColorSpace2.RGB="rgb",ColorSpace2.HSL="hsl",ColorSpace2.HEX="hex",ColorSpace2))(ColorSpace||{}),COLOR_SPACES=Object.values(ColorSpace),COLOR_REGEXP=/\(([0-9]+),\s*([0-9]+)%?,\s*([0-9]+)%?,?\s*([0-9.]+)?\)/,RGB_REGEXP=/^\s*rgba?\(([0-9]+),\s*([0-9]+),\s*([0-9]+),?\s*([0-9.]+)?\)\s*$/i,HSL_REGEXP=/^\s*hsla?\(([0-9]+),\s*([0-9]+)%,\s*([0-9]+)%,?\s*([0-9.]+)?\)\s*$/i,HEX_REGEXP=/^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i,SHORTHEX_REGEXP=/^\s*#?([0-9a-f]{3})\s*$/i,ColorPicker={hex:Z,rgb:He,hsl:ue},fallbackColor={hex:"transparent",rgb:"rgba(0, 0, 0, 0)",hsl:"hsla(0, 0%, 0%, 0)"},stringToArgs=value=>{let match=value?.match(COLOR_REGEXP);if(!match)return [0,0,0,1];let[,x,y,z,a=1]=match;return [x,y,z,a].map(Number)},parseValue=value=>{if(!value)return;let valid=!0;if(RGB_REGEXP.test(value)){let[r,g,b,a]=stringToArgs(value),[h,s,l]=color_convert_default.rgb.hsl([r,g,b])||[0,0,0];return {valid,value,keyword:color_convert_default.rgb.keyword([r,g,b]),colorSpace:"rgb",rgb:value,hsl:`hsla(${h}, ${s}%, ${l}%, ${a})`,hex:`#${color_convert_default.rgb.hex([r,g,b]).toLowerCase()}`}}if(HSL_REGEXP.test(value)){let[h,s,l,a]=stringToArgs(value),[r,g,b]=color_convert_default.hsl.rgb([h,s,l])||[0,0,0];return {valid,value,keyword:color_convert_default.hsl.keyword([h,s,l]),colorSpace:"hsl",rgb:`rgba(${r}, ${g}, ${b}, ${a})`,hsl:value,hex:`#${color_convert_default.hsl.hex([h,s,l]).toLowerCase()}`}}let plain=value.replace("#",""),rgb=color_convert_default.keyword.rgb(plain)||color_convert_default.hex.rgb(plain),hsl=color_convert_default.rgb.hsl(rgb),mapped=value;if(/[^#a-f0-9]/i.test(value)?mapped=plain:HEX_REGEXP.test(value)&&(mapped=`#${plain}`),mapped.startsWith("#"))valid=HEX_REGEXP.test(mapped);else try{color_convert_default.keyword.hex(mapped);}catch{valid=!1;}return {valid,value:mapped,keyword:color_convert_default.rgb.keyword(rgb),colorSpace:"hex",rgb:`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`,hsl:`hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, 1)`,hex:mapped}},getRealValue=(value,color,colorSpace)=>{if(!value||!color?.valid)return fallbackColor[colorSpace];if(colorSpace!=="hex")return color?.[colorSpace]||fallbackColor[colorSpace];if(!color.hex.startsWith("#"))try{return `#${color_convert_default.keyword.hex(color.hex)}`}catch{return fallbackColor.hex}let short=color.hex.match(SHORTHEX_REGEXP);if(!short)return HEX_REGEXP.test(color.hex)?color.hex:fallbackColor.hex;let[r,g,b]=short[1].split("");return `#${r}${r}${g}${g}${b}${b}`},useColorInput=(initialValue,onChange)=>{let[value,setValue]=__export31(initialValue||""),[color,setColor]=__export31(()=>parseValue(value)),[colorSpace,setColorSpace]=__export31(color?.colorSpace||"hex");__export23(()=>{let nextValue=initialValue||"",nextColor=parseValue(nextValue);setValue(nextValue),setColor(nextColor),setColorSpace(nextColor?.colorSpace||"hex");},[initialValue]);let realValue=__export28(()=>getRealValue(value,color,colorSpace).toLowerCase(),[value,color,colorSpace]),updateValue=__export19(update=>{let parsed=parseValue(update),v=parsed?.value||update||"";setValue(v),v===""&&(setColor(void 0),onChange(void 0)),parsed&&(setColor(parsed),setColorSpace(parsed.colorSpace),onChange(parsed.value));},[onChange]),cycleColorSpace=__export19(()=>{let next=COLOR_SPACES.indexOf(colorSpace)+1;next>=COLOR_SPACES.length&&(next=0),setColorSpace(COLOR_SPACES[next]);let update=color?.[COLOR_SPACES[next]]||"";setValue(update),onChange(update);},[color,colorSpace,onChange]);return {value,realValue,updateValue,color,colorSpace,cycleColorSpace}},id=value=>value.replace(/\s*/,"").toLowerCase(),usePresets=(presetColors,currentColor,colorSpace)=>{let[selectedColors,setSelectedColors]=__export31(currentColor?.valid?[currentColor]:[]);__export23(()=>{currentColor===void 0&&setSelectedColors([]);},[currentColor]);let presets=__export28(()=>(presetColors||[]).map(preset=>typeof preset=="string"?parseValue(preset):preset.title?{...parseValue(preset.color),keyword:preset.title}:parseValue(preset.color)).concat(selectedColors).filter(Boolean).slice(-27),[presetColors,selectedColors]),addPreset=__export19(color=>{color?.valid&&(presets.some(preset=>id(preset[colorSpace])===id(color[colorSpace]))||setSelectedColors(arr=>arr.concat(color)));},[colorSpace,presets]);return {presets,addPreset}},ColorControl=({name,value:initialValue,onChange,onFocus,onBlur,presetColors,startOpen=!1})=>{let throttledOnChange=__export19(throttle_default(onChange,200),[onChange]),{value,realValue,updateValue,color,colorSpace,cycleColorSpace}=useColorInput(initialValue,throttledOnChange),{presets,addPreset}=usePresets(presetColors,color,colorSpace),Picker=ColorPicker[colorSpace];return react_default.createElement(Wrapper,null,react_default.createElement(PickerTooltip,{startOpen,closeOnOutsideClick:!0,onVisibleChange:()=>addPreset(color),tooltip:react_default.createElement(TooltipContent,null,react_default.createElement(Picker,{color:realValue==="transparent"?"#000000":realValue,onChange:updateValue,onFocus,onBlur}),presets.length>0&&react_default.createElement(Swatches,null,presets.map((preset,index)=>react_default.createElement(WithTooltip,{key:`${preset.value}-${index}`,hasChrome:!1,tooltip:react_default.createElement(Note,{note:preset.keyword||preset.value})},react_default.createElement(Swatch,{value:preset[colorSpace],active:color&&id(preset[colorSpace])===id(color[colorSpace]),onClick:()=>updateValue(preset.value)})))))},react_default.createElement(Swatch,{value:realValue,style:{margin:4}})),react_default.createElement(Input,{id:getControlId(name),value,onChange:e=>updateValue(e.target.value),onFocus:e=>e.target.select(),placeholder:"Choose color..."}),value?react_default.createElement(ToggleIcon,{icon:"markup",onClick:cycleColorSpace}):null)},Color_default=ColorControl;

export { ColorControl, Color_default as default };
