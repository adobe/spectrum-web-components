function e(e,t,s,i,n,r,a){try{var o=e[r](a),l=o.value}catch(e){return void s(e)}o.done?t(l):Promise.resolve(l).then(i,n)}function t(t){return function(){var s=this,i=arguments;return new Promise((function(n,r){var a=t.apply(s,i);function o(t){e(a,n,r,o,l,"next",t)}function l(t){e(a,n,r,o,l,"throw",t)}o(void 0)}))}}function s(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function i(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,i)}return s}function n(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var r=new WeakMap,a=e=>(...t)=>{var s=e(...t);return r.set(s,!0),s},o=e=>"function"==typeof e&&r.has(e),l=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,h=(e,t,s=null,i=null)=>{for(;t!==s;){var n=t.nextSibling;e.insertBefore(t,i),t=n}},u=(e,t,s=null)=>{for(;t!==s;){var i=t.nextSibling;e.removeChild(t),t=i}},d={},p={},c=`{{lit-${String(Math.random()).slice(2)}}}`,v=`\x3c!--${c}--\x3e`,m=new RegExp(`${c}|${v}`),_="$lit$";class g{constructor(e,t){this.parts=[],this.element=t;for(var s=[],i=[],n=document.createTreeWalker(t.content,133,null,!1),r=0,a=-1,o=0,{strings:l,values:{length:h}}=e;o<h;){var u=n.nextNode();if(null!==u){if(a++,1===u.nodeType){if(u.hasAttributes()){for(var d=u.attributes,{length:p}=d,v=0,g=0;g<p;g++)f(d[g].name,_)&&v++;for(;v-- >0;){var x=l[o],N=b.exec(x)[2],w=N.toLowerCase()+_,V=u.getAttribute(w);u.removeAttribute(w);var T=V.split(m);this.parts.push({type:"attribute",index:a,name:N,strings:T}),o+=T.length-1}}"TEMPLATE"===u.tagName&&(i.push(u),n.currentNode=u.content)}else if(3===u.nodeType){var E=u.data;if(E.indexOf(c)>=0){for(var P=u.parentNode,A=E.split(m),O=A.length-1,S=0;S<O;S++){var C=void 0,j=A[S];if(""===j)C=y();else{var M=b.exec(j);null!==M&&f(M[2],_)&&(j=j.slice(0,M.index)+M[1]+M[2].slice(0,-_.length)+M[3]),C=document.createTextNode(j)}P.insertBefore(C,u),this.parts.push({type:"node",index:++a})}""===A[O]?(P.insertBefore(y(),u),s.push(u)):u.data=A[O],o+=O}}else if(8===u.nodeType)if(u.data===c){var L=u.parentNode;null!==u.previousSibling&&a!==r||(a++,L.insertBefore(y(),u)),r=a,this.parts.push({type:"node",index:a}),null===u.nextSibling?u.data="":(s.push(u),a--),o++}else for(var k=-1;-1!==(k=u.data.indexOf(c,k+1));)this.parts.push({type:"node",index:-1}),o++}else n.currentNode=i.pop()}for(var H of s)H.parentNode.removeChild(H)}}var f=(e,t)=>{var s=e.length-t.length;return s>=0&&e.slice(s)===t},x=e=>-1!==e.index,y=()=>document.createComment(""),b=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class N{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){var t=0;for(var s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(var i of this.__parts)void 0!==i&&i.commit()}_clone(){for(var e,t=l?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,n=document.createTreeWalker(t,133,null,!1),r=0,a=0,o=n.nextNode();r<i.length;)if(e=i[r],x(e)){for(;a<e.index;)a++,"TEMPLATE"===o.nodeName&&(s.push(o),n.currentNode=o.content),null===(o=n.nextNode())&&(n.currentNode=s.pop(),o=n.nextNode());if("node"===e.type){var h=this.processor.handleTextExpression(this.options);h.insertAfterNode(o.previousSibling),this.__parts.push(h)}else this.__parts.push(...this.processor.handleAttributeExpressions(o,e.name,e.strings,this.options));r++}else this.__parts.push(void 0),r++;return l&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var w=` ${c} `;class V{constructor(e,t,s,i){this.strings=e,this.values=t,this.type=s,this.processor=i}getHTML(){for(var e=this.strings.length-1,t="",s=!1,i=0;i<e;i++){var n=this.strings[i],r=n.lastIndexOf("\x3c!--");s=(r>-1||s)&&-1===n.indexOf("--\x3e",r+1);var a=b.exec(n);t+=null===a?n+(s?w:v):n.substr(0,a.index)+a[1]+a[2]+_+a[3]+c}return t+=this.strings[e]}getTemplateElement(){var e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}class T extends V{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){var e=super.getTemplateElement(),t=e.content,s=t.firstChild;return t.removeChild(s),h(t,s.firstChild),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var E=e=>null===e||!("object"==typeof e||"function"==typeof e),P=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class A{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(var i=0;i<s.length-1;i++)this.parts[i]=this._createPart()}_createPart(){return new O(this)}_getValue(){for(var e=this.strings,t=e.length-1,s="",i=0;i<t;i++){s+=e[i];var n=this.parts[i];if(void 0!==n){var r=n.value;if(E(r)||!P(r))s+="string"==typeof r?r:String(r);else for(var a of r)s+="string"==typeof a?a:String(a)}}return s+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class O{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===d||E(e)&&e===this.value||(this.value=e,o(e)||(this.committer.dirty=!0))}commit(){for(;o(this.value);){var e=this.value;this.value=d,e(this)}this.value!==d&&this.committer.commit()}}class S{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(y()),this.endNode=e.appendChild(y())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=y()),e.__insert(this.endNode=y())}insertAfterPart(e){e.__insert(this.startNode=y()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;o(this.__pendingValue);){var e=this.__pendingValue;this.__pendingValue=d,e(this)}var t=this.__pendingValue;t!==d&&(E(t)?t!==this.value&&this.__commitText(t):t instanceof V?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):P(t)?this.__commitIterable(t):t===p?(this.value=p,this.clear()):this.__commitText(t))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){var t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){var t=this.options.templateFactory(e);if(this.value instanceof N&&this.value.template===t)this.value.update(e.values);else{var s=new N(t,e.processor,this.options),i=s._clone();s.update(e.values),this.__commitNode(i),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());var t,s=this.value,i=0;for(var n of e)void 0===(t=s[i])&&(t=new S(this.options),s.push(t),0===i?t.appendIntoPart(this):t.insertAfterPart(s[i-1])),t.setValue(n),t.commit(),i++;i<s.length&&(s.length=i,this.clear(t&&t.endNode))}clear(e=this.startNode){u(this.startNode.parentNode,e.nextSibling,this.endNode)}}class C{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;o(this.__pendingValue);){var e=this.__pendingValue;this.__pendingValue=d,e(this)}if(this.__pendingValue!==d){var t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=d}}}class j extends A{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new M(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class M extends O{}var L=!1;try{var k={get capture(){return L=!0,!1}};window.addEventListener("test",k,k),window.removeEventListener("test",k,k)}catch(e){}class H{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;o(this.__pendingValue);){var e=this.__pendingValue;this.__pendingValue=d,e(this)}if(this.__pendingValue!==d){var t=this.__pendingValue,s=this.value,i=null==t||null!=s&&(t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive),n=null!=t&&(null==s||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=I(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=d}}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}var I=e=>e&&(L?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class ${handleAttributeExpressions(e,t,s,i){var n=t[0];return"."===n?new j(e,t.slice(1),s).parts:"@"===n?[new H(e,t.slice(1),i.eventContext)]:"?"===n?[new C(e,t.slice(1),s)]:new A(e,t,s).parts}handleTextExpression(e){return new S(e)}}var B=new $;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function F(e){var t=D.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},D.set(e.type,t));var s=t.stringsArray.get(e.strings);if(void 0!==s)return s;var i=e.strings.join(c);return void 0===(s=t.keyString.get(i))&&(s=new g(e,e.getTemplateElement()),t.keyString.set(i,s)),t.stringsArray.set(e.strings,s),s}var D=new Map,W=new WeakMap,R=(e,t,s)=>{var i=W.get(t);void 0===i&&(u(t,t.firstChild),W.set(t,i=new S(Object.assign({templateFactory:F},s))),i.appendInto(t)),i.setValue(e),i.commit()};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");var z=(e,...t)=>new V(e,t,"html",B),G=(e,...t)=>new T(e,t,"svg",B),q=Object.freeze({__proto__:null,html:z,svg:G,DefaultTemplateProcessor:$,defaultTemplateProcessor:B,directive:a,isDirective:o,removeNodes:u,reparentNodes:h,noChange:d,nothing:p,AttributeCommitter:A,AttributePart:O,BooleanAttributePart:C,EventPart:H,isIterable:P,isPrimitive:E,NodePart:S,PropertyCommitter:j,PropertyPart:M,parts:W,render:R,templateCaches:D,templateFactory:F,TemplateInstance:N,SVGTemplateResult:T,TemplateResult:V,createMarker:y,isTemplatePartActive:x,Template:g});export{O as A,g as T,n as _,t as a,N as b,u as c,V as d,a as e,z as h,x as i,q as l,c as m,p as n,W as p,R as r,G as s,D as t};
//# sourceMappingURL=lit-html-6898710b.js.map
