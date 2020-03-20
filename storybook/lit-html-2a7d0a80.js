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
var e=new WeakMap,t=t=>"function"==typeof t&&e.has(t),n="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,n=null,i=null)=>{for(;t!==n;){var s=t.nextSibling;e.insertBefore(t,i),t=s}},s=(e,t,n=null)=>{for(;t!==n;){var i=t.nextSibling;e.removeChild(t),t=i}},r={},a={},o=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${o}--\x3e`,d=new RegExp(`${o}|${l}`),h="$lit$";class u{constructor(e,t){this.parts=[],this.element=t;for(var n=[],i=[],s=document.createTreeWalker(t.content,133,null,!1),r=0,a=-1,l=0,{strings:u,values:{length:v}}=e;l<v;){var g=s.nextNode();if(null!==g){if(a++,1===g.nodeType){if(g.hasAttributes()){for(var f=g.attributes,{length:_}=f,x=0,y=0;y<_;y++)p(f[y].name,h)&&x++;for(;x-- >0;){var w=u[l],N=m.exec(w)[2],S=N.toLowerCase()+h,T=g.getAttribute(S);g.removeAttribute(S);var b=T.split(d);this.parts.push({type:"attribute",index:a,name:N,strings:b}),l+=b.length-1}}"TEMPLATE"===g.tagName&&(i.push(g),s.currentNode=g.content)}else if(3===g.nodeType){var E=g.data;if(E.indexOf(o)>=0){for(var V=g.parentNode,C=E.split(d),A=C.length-1,k=0;k<A;k++){var M=void 0,L=C[k];if(""===L)M=c();else{var W=m.exec(L);null!==W&&p(W[2],h)&&(L=L.slice(0,W.index)+W[1]+W[2].slice(0,-h.length)+W[3]),M=document.createTextNode(L)}V.insertBefore(M,g),this.parts.push({type:"node",index:++a})}""===C[A]?(V.insertBefore(c(),g),n.push(g)):g.data=C[A],l+=A}}else if(8===g.nodeType)if(g.data===o){var $=g.parentNode;null!==g.previousSibling&&a!==r||(a++,$.insertBefore(c(),g)),r=a,this.parts.push({type:"node",index:a}),null===g.nextSibling?g.data="":(n.push(g),a--),l++}else for(var B=-1;-1!==(B=g.data.indexOf(o,B+1));)this.parts.push({type:"node",index:-1}),l++}else s.currentNode=i.pop()}for(var H of n)H.parentNode.removeChild(H)}}var p=(e,t)=>{var n=e.length-t.length;return n>=0&&e.slice(n)===t},v=e=>-1!==e.index,c=()=>document.createComment(""),m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class g{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){var t=0;for(var n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(var i of this.__parts)void 0!==i&&i.commit()}_clone(){for(var e,t=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],s=this.template.parts,r=document.createTreeWalker(t,133,null,!1),a=0,o=0,l=r.nextNode();a<s.length;)if(e=s[a],v(e)){for(;o<e.index;)o++,"TEMPLATE"===l.nodeName&&(i.push(l),r.currentNode=l.content),null===(l=r.nextNode())&&(r.currentNode=i.pop(),l=r.nextNode());if("node"===e.type){var d=this.processor.handleTextExpression(this.options);d.insertAfterNode(l.previousSibling),this.__parts.push(d)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,e.name,e.strings,this.options));a++}else this.__parts.push(void 0),a++;return n&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */var f=` ${o} `;class _{constructor(e,t,n,i){this.strings=e,this.values=t,this.type=n,this.processor=i}getHTML(){for(var e=this.strings.length-1,t="",n=!1,i=0;i<e;i++){var s=this.strings[i],r=s.lastIndexOf("\x3c!--");n=(r>-1||n)&&-1===s.indexOf("--\x3e",r+1);var a=m.exec(s);t+=null===a?s+(n?f:l):s.substr(0,a.index)+a[1]+a[2]+h+a[3]+o}return t+=this.strings[e]}getTemplateElement(){var e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}class x extends _{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){var e=super.getTemplateElement(),t=e.content,n=t.firstChild;return t.removeChild(n),i(t,n.firstChild),e}}
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
 */var y=e=>null===e||!("object"==typeof e||"function"==typeof e),w=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class N{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(var i=0;i<n.length-1;i++)this.parts[i]=this._createPart()}_createPart(){return new S(this)}_getValue(){for(var e=this.strings,t=e.length-1,n="",i=0;i<t;i++){n+=e[i];var s=this.parts[i];if(void 0!==s){var r=s.value;if(y(r)||!w(r))n+="string"==typeof r?r:String(r);else for(var a of r)n+="string"==typeof a?a:String(a)}}return n+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===r||y(e)&&e===this.value||(this.value=e,t(e)||(this.committer.dirty=!0))}commit(){for(;t(this.value);){var e=this.value;this.value=r,e(this)}this.value!==r&&this.committer.commit()}}class T{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null!==this.startNode.parentNode){for(;t(this.__pendingValue);){var e=this.__pendingValue;this.__pendingValue=r,e(this)}var n=this.__pendingValue;n!==r&&(y(n)?n!==this.value&&this.__commitText(n):n instanceof _?this.__commitTemplateResult(n):n instanceof Node?this.__commitNode(n):w(n)?this.__commitIterable(n):n===a?(this.value=a,this.clear()):this.__commitText(n))}}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){var t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){var t=this.options.templateFactory(e);if(this.value instanceof g&&this.value.template===t)this.value.update(e.values);else{var n=new g(t,e.processor,this.options),i=n._clone();n.update(e.values),this.__commitNode(i),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());var t,n=this.value,i=0;for(var s of e)void 0===(t=n[i])&&(t=new T(this.options),n.push(t),0===i?t.appendIntoPart(this):t.insertAfterPart(n[i-1])),t.setValue(s),t.commit(),i++;i<n.length&&(n.length=i,this.clear(t&&t.endNode))}clear(e=this.startNode){s(this.startNode.parentNode,e.nextSibling,this.endNode)}}class b{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){var e=this.__pendingValue;this.__pendingValue=r,e(this)}if(this.__pendingValue!==r){var n=!!this.__pendingValue;this.value!==n&&(n?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=n),this.__pendingValue=r}}}class E extends N{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new V(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class V extends S{}var C=!1;(()=>{try{var e={get capture(){return C=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class A{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){var e=this.__pendingValue;this.__pendingValue=r,e(this)}if(this.__pendingValue!==r){var n=this.__pendingValue,i=this.value,s=null==n||null!=i&&(n.capture!==i.capture||n.once!==i.once||n.passive!==i.passive),a=null!=n&&(null==i||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),a&&(this.__options=k(n),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=n,this.__pendingValue=r}}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}var k=e=>e&&(C?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);
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
 */var M=new class{handleAttributeExpressions(e,t,n,i){var s=t[0];return"."===s?new E(e,t.slice(1),n).parts:"@"===s?[new A(e,t.slice(1),i.eventContext)]:"?"===s?[new b(e,t.slice(1),n)]:new N(e,t,n).parts}handleTextExpression(e){return new T(e)}};
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
 */function L(e){var t=W.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},W.set(e.type,t));var n=t.stringsArray.get(e.strings);if(void 0!==n)return n;var i=e.strings.join(o);return void 0===(n=t.keyString.get(i))&&(n=new u(e,e.getTemplateElement()),t.keyString.set(i,n)),t.stringsArray.set(e.strings,n),n}var W=new Map,$=new WeakMap,B=(e,t,n)=>{var i=$.get(t);void 0===i&&(s(t,t.firstChild),$.set(t,i=new T(Object.assign({templateFactory:L},n))),i.appendInto(t)),i.setValue(e),i.commit()};
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");var H=(e,...t)=>new _(e,t,"html",M),P=(e,...t)=>new x(e,t,"svg",M),F=133;function I(e,t){for(var{element:{content:n},parts:i}=e,s=document.createTreeWalker(n,F,null,!1),r=O(i),a=i[r],o=-1,l=0,d=[],h=null;s.nextNode();){o++;var u=s.currentNode;for(u.previousSibling===h&&(h=null),t.has(u)&&(d.push(u),null===h&&(h=u)),null!==h&&l++;void 0!==a&&a.index===o;)a.index=null!==h?-1:a.index-l,a=i[r=O(i,r)]}d.forEach(e=>e.parentNode.removeChild(e))}var j=e=>{for(var t=11===e.nodeType?0:1,n=document.createTreeWalker(e,F,null,!1);n.nextNode();)t++;return t},O=(e,t=-1)=>{for(var n=t+1;n<e.length;n++){var i=e[n];if(v(i))return n}return-1};
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
var q=(e,t)=>`${e}--${t}`,D=!0;void 0===window.ShadyCSS?D=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),D=!1);var R,z=e=>t=>{var n=q(t.type,e),i=W.get(n);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},W.set(n,i));var s=i.stringsArray.get(t.strings);if(void 0!==s)return s;var r=t.strings.join(o);if(void 0===(s=i.keyString.get(r))){var a=t.getTemplateElement();D&&window.ShadyCSS.prepareTemplateDom(a,e),s=new u(t,a),i.keyString.set(r,s)}return i.stringsArray.set(t.strings,s),s},G=["html","svg"],J=new Set,K=(e,t,n)=>{J.add(e);var i=n?n.element:document.createElement("template"),s=t.querySelectorAll("style"),{length:r}=s;if(0!==r){for(var a=document.createElement("style"),o=0;o<r;o++){var l=s[o];l.parentNode.removeChild(l),a.textContent+=l.textContent}(e=>{G.forEach(t=>{var n=W.get(q(t,e));void 0!==n&&n.keyString.forEach(e=>{var{element:{content:t}}=e,n=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{n.add(e)}),I(e,n)})})})(e);var d=i.content;n?function(e,t,n=null){var{element:{content:i},parts:s}=e;if(null!=n)for(var r=document.createTreeWalker(i,F,null,!1),a=O(s),o=0,l=-1;r.nextNode();){for(l++,r.currentNode===n&&(o=j(t),n.parentNode.insertBefore(t,n));-1!==a&&s[a].index===l;){if(o>0){for(;-1!==a;)s[a].index+=o,a=O(s,a);return}a=O(s,a)}}else i.appendChild(t)}(n,a,d.firstChild):d.insertBefore(a,d.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);var h=d.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==h)t.insertBefore(h.cloneNode(!0),t.firstChild);else if(n){d.insertBefore(a,d.firstChild);var u=new Set;u.add(a),I(n,u)}}else window.ShadyCSS.prepareTemplateStyles(i,e)},Q=(e,t,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");var i=n.scopeName,r=$.has(t),a=D&&11===t.nodeType&&!!t.host,o=a&&!J.has(i),l=o?document.createDocumentFragment():t;if(B(e,l,Object.assign({templateFactory:z(i)},n)),o){var d=$.get(l);$.delete(l);var h=d.value instanceof g?d.value.template:void 0;K(i,l,h),s(t,t.firstChild),t.appendChild(l),$.set(t,d)}!r&&a&&window.ShadyCSS.styleElement(t.host)},U=new WeakMap,X=(R=e=>t=>{var n=U.get(t);if(void 0===e&&t instanceof S){if(void 0!==n||!U.has(t)){var i=t.committer.name;t.committer.element.removeAttribute(i)}}else e!==n&&t.setValue(e);U.set(t,e)},(...t)=>{var n=R(...t);return e.set(n,!0),n});export{_ as T,B as a,H as h,X as i,a as n,Q as r,P as s};
//# sourceMappingURL=lit-html-2a7d0a80.js.map
