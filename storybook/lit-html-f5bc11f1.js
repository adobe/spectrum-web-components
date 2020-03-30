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
const e=new WeakMap,t=t=>"function"==typeof t&&e.has(t),n="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},i={},o={},r=`{{lit-${String(Math.random()).slice(2)}}}`,l=`\x3c!--${r}--\x3e`,a=new RegExp(`${r}|${l}`);class d{constructor(e,t){this.parts=[],this.element=t;const n=[],s=[],i=document.createTreeWalker(t.content,133,null,!1);let o=0,l=-1,d=0;const{strings:h,values:{length:m}}=e;for(;d<m;){const e=i.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let s=0;for(let e=0;e<n;e++)c(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=h[d],n=p.exec(t)[2],s=n.toLowerCase()+"$lit$",i=e.getAttribute(s);e.removeAttribute(s);const o=i.split(a);this.parts.push({type:"attribute",index:l,name:n,strings:o}),d+=o.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(r)>=0){const s=e.parentNode,i=t.split(a),o=i.length-1;for(let t=0;t<o;t++){let n,o=i[t];if(""===o)n=u();else{const e=p.exec(o);null!==e&&c(e[2],"$lit$")&&(o=o.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),n=document.createTextNode(o)}s.insertBefore(n,e),this.parts.push({type:"node",index:++l})}""===i[o]?(s.insertBefore(u(),e),n.push(e)):e.data=i[o],d+=o}}else if(8===e.nodeType)if(e.data===r){const t=e.parentNode;null!==e.previousSibling&&l!==o||(l++,t.insertBefore(u(),e)),o=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(n.push(e),l--),d++}else{let t=-1;for(;-1!==(t=e.data.indexOf(r,t+1));)this.parts.push({type:"node",index:-1}),d++}}else i.currentNode=s.pop()}for(const e of n)e.parentNode.removeChild(e)}}const c=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},h=e=>-1!==e.index,u=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class m{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],s=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let o,r=0,l=0,a=i.nextNode();for(;r<s.length;)if(o=s[r],h(o)){for(;l<o.index;)l++,"TEMPLATE"===a.nodeName&&(t.push(a),i.currentNode=a.content),null===(a=i.nextNode())&&(i.currentNode=t.pop(),a=i.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return n&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const g=` ${r} `;class f{constructor(e,t,n,s){this.strings=e,this.values=t,this.type=n,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let s=0;s<e;s++){const e=this.strings[s],i=e.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===e.indexOf("--\x3e",i+1);const o=p.exec(e);t+=null===o?e+(n?g:l):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+r}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}class _ extends f{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const e=super.getTemplateElement(),t=e.content,n=t.firstChild;return t.removeChild(n),((e,t,n=null,s=null)=>{for(;t!==n;){const n=t.nextSibling;e.insertBefore(t,s),t=n}})(t,n.firstChild),e}}
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
 */const v=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class y{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new w(this)}_getValue(){const e=this.strings,t=e.length-1;let n="";for(let s=0;s<t;s++){n+=e[s];const t=this.parts[s];if(void 0!==t){const e=t.value;if(v(e)||!x(e))n+="string"==typeof e?e:String(e);else for(const t of e)n+="string"==typeof t?t:String(t)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===i||v(e)&&e===this.value||(this.value=e,t(e)||(this.committer.dirty=!0))}commit(){for(;t(this.value);){const e=this.value;this.value=i,e(this)}this.value!==i&&this.committer.commit()}}class N{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(u()),this.endNode=e.appendChild(u())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=u()),e.__insert(this.endNode=u())}insertAfterPart(e){e.__insert(this.startNode=u()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}const e=this.__pendingValue;e!==i&&(v(e)?e!==this.value&&this.__commitText(e):e instanceof f?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===o?(this.value=o,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof m&&this.value.template===t)this.value.update(e.values);else{const n=new m(t,e.processor,this.options),s=n._clone();n.update(e.values),this.__commitNode(s),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,s=0;for(const i of e)n=t[s],void 0===n&&(n=new N(this.options),t.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(t[s-1])),n.setValue(i),n.commit(),s++;s<t.length&&(t.length=s,this.clear(n&&n.endNode))}clear(e=this.startNode){s(this.startNode.parentNode,e.nextSibling,this.endNode)}}class S{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=i}}class T extends y{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new b(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class b extends w{}let E=!1;(()=>{try{const e={get capture(){return E=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class V{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=i,e(this)}if(this.__pendingValue===i)return;const e=this.__pendingValue,n=this.value,s=null==e||null!=n&&(e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive),o=null!=e&&(null==n||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=C(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=i}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const C=e=>e&&(E?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
 */;const A=new class{handleAttributeExpressions(e,t,n,s){const i=t[0];if("."===i){return new T(e,t.slice(1),n).parts}return"@"===i?[new V(e,t.slice(1),s.eventContext)]:"?"===i?[new S(e,t.slice(1),n)]:new y(e,t,n).parts}handleTextExpression(e){return new N(e)}};
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
 */function $(e){let t=k.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},k.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const s=e.strings.join(r);return n=t.keyString.get(s),void 0===n&&(n=new d(e,e.getTemplateElement()),t.keyString.set(s,n)),t.stringsArray.set(e.strings,n),n}const k=new Map,M=new WeakMap,L=(e,t,n)=>{let i=M.get(t);void 0===i&&(s(t,t.firstChild),M.set(t,i=new N(Object.assign({templateFactory:$},n))),i.appendInto(t)),i.setValue(e),i.commit()};
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
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const W=(e,...t)=>new f(e,t,"html",A),B=(e,...t)=>new _(e,t,"svg",A)
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
 */;function H(e,t){const{element:{content:n},parts:s}=e,i=document.createTreeWalker(n,133,null,!1);let o=F(s),r=s[o],l=-1,a=0;const d=[];let c=null;for(;i.nextNode();){l++;const e=i.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(d.push(e),null===c&&(c=e)),null!==c&&a++;void 0!==r&&r.index===l;)r.index=null!==c?-1:r.index-a,o=F(s,o),r=s[o]}d.forEach(e=>e.parentNode.removeChild(e))}const P=e=>{let t=11===e.nodeType?0:1;const n=document.createTreeWalker(e,133,null,!1);for(;n.nextNode();)t++;return t},F=(e,t=-1)=>{for(let n=t+1;n<e.length;n++){const t=e[n];if(h(t))return n}return-1};
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
const I=(e,t)=>`${e}--${t}`;let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),j=!1);const O=e=>t=>{const n=I(t.type,e);let s=k.get(n);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},k.set(n,s));let i=s.stringsArray.get(t.strings);if(void 0!==i)return i;const o=t.strings.join(r);if(i=s.keyString.get(o),void 0===i){const n=t.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(n,e),i=new d(t,n),s.keyString.set(o,i)}return s.stringsArray.set(t.strings,i),i},q=["html","svg"],D=new Set,R=(e,t,n)=>{D.add(e);const s=n?n.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:o}=i;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,e);const r=document.createElement("style");for(let e=0;e<o;e++){const t=i[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{q.forEach(t=>{const n=k.get(I(t,e));void 0!==n&&n.keyString.forEach(e=>{const{element:{content:t}}=e,n=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{n.add(e)}),H(e,n)})})})(e);const l=s.content;n?function(e,t,n=null){const{element:{content:s},parts:i}=e;if(null==n)return void s.appendChild(t);const o=document.createTreeWalker(s,133,null,!1);let r=F(i),l=0,a=-1;for(;o.nextNode();){for(a++,o.currentNode===n&&(l=P(t),n.parentNode.insertBefore(t,n));-1!==r&&i[r].index===a;){if(l>0){for(;-1!==r;)i[r].index+=l,r=F(i,r);return}r=F(i,r)}}}(n,r,l.firstChild):l.insertBefore(r,l.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const a=l.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==a)t.insertBefore(a.cloneNode(!0),t.firstChild);else if(n){l.insertBefore(r,l.firstChild);const e=new Set;e.add(r),H(n,e)}},z=(e,t,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const i=n.scopeName,o=M.has(t),r=j&&11===t.nodeType&&!!t.host,l=r&&!D.has(i),a=l?document.createDocumentFragment():t;if(L(e,a,Object.assign({templateFactory:O(i)},n)),l){const e=M.get(a);M.delete(a);const n=e.value instanceof m?e.value.template:void 0;R(i,a,n),s(t,t.firstChild),t.appendChild(a),M.set(t,e)}!o&&r&&window.ShadyCSS.styleElement(t.host)},G=new WeakMap,J=(K=e=>t=>{const n=G.get(t);if(void 0===e&&t instanceof w){if(void 0!==n||!G.has(t)){const e=t.committer.name;t.committer.element.removeAttribute(e)}}else e!==n&&t.setValue(e);G.set(t,e)},(...t)=>{const n=K(...t);return e.set(n,!0),n});var K;export{f as T,z as a,W as h,J as i,o as n,L as r,B as s};
//# sourceMappingURL=lit-html-f5bc11f1.js.map
