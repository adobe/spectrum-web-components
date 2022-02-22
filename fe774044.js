import{S as t,i as e,T as o,r}from"./1a00b51e.js";function i(t,e){var o={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(o[r[i]]=t[r[i]])}return o}function c(t,e,o,r){var i,c=arguments.length,s=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(c<3?i(s):c>3?i(e,o,s):i(e,o))||s);return c>3&&s&&Object.defineProperty(e,o,s),s}var s,a;const n={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},l=(t,e)=>e!==t&&(e==e||t==t),u={attribute:!0,type:String,converter:n,reflect:!1,hasChanged:l};class d extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,o)=>{const r=this._$Eh(o,e);void 0!==r&&(this._$Eu.set(r,o),t.push(r))})),t}static createProperty(t,e=u){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const o="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,o,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,o){return{get(){return this[e]},set(r){const i=this[t];this[e]=r,this.requestUpdate(t,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||u}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of e)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)o.unshift(t(e))}else void 0!==e&&o.push(t(e));return o}static _$Eh(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,o;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(o=t.hostConnected)||void 0===o||o.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const o=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return e(o,this.constructor.elementStyles),o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$Eg(t,e,o=u){var r,i;const c=this.constructor._$Eh(t,o);if(void 0!==c&&!0===o.reflect){const s=(null!==(i=null===(r=o.converter)||void 0===r?void 0:r.toAttribute)&&void 0!==i?i:n.toAttribute)(e,o.type);this._$Ei=t,null==s?this.removeAttribute(c):this.setAttribute(c,s),this._$Ei=null}}_$AK(t,e){var o,r,i;const c=this.constructor,s=c._$Eu.get(t);if(void 0!==s&&this._$Ei!==s){const t=c.getPropertyOptions(s),a=t.converter,l=null!==(i=null!==(r=null===(o=a)||void 0===o?void 0:o.fromAttribute)&&void 0!==r?r:"function"==typeof a?a:null)&&void 0!==i?i:n.fromAttribute;this._$Ei=s,this[s]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,o){let r=!0;void 0!==t&&(((o=o||this.constructor.getPropertyOptions(t)).hasChanged||l)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,o))):r=!1),!this.isUpdatePending&&r&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(o)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(o)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}var m,p;d.finalized=!0,d.elementProperties=new Map,d.elementStyles=[],d.shadowRootOptions={mode:"open"},null===(s=globalThis.reactiveElementPolyfillSupport)||void 0===s||s.call(globalThis,{ReactiveElement:d}),(null!==(a=globalThis.reactiveElementVersions)&&void 0!==a?a:globalThis.reactiveElementVersions=[]).push("1.0.0");const b=globalThis.trustedTypes,h=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,v=`lit$${(Math.random()+"").slice(9)}$`,g="?"+v,x=`<${g}>`,f=document,y=(t="")=>f.createComment(t),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,w=Array.isArray,z=t=>{var e;return w(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])},q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,A=/>/g,I=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,C=/'/g,E=/"/g,T=/^(?:script|style|textarea)$/i,$=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),_=$(1),U=$(2),L=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),F=new WeakMap,H=(t,e,o)=>{var r,i;const c=null!==(r=null==o?void 0:o.renderBefore)&&void 0!==r?r:e;let s=c._$litPart$;if(void 0===s){const t=null!==(i=null==o?void 0:o.renderBefore)&&void 0!==i?i:null;c._$litPart$=s=new D(e.insertBefore(y(),t),t,void 0,null!=o?o:{})}return s._$AI(t),s},P=f.createTreeWalker(f,129,null,!1),R=(t,e)=>{const o=t.length-1,r=[];let i,c=2===e?"<svg>":"",s=q;for(let e=0;e<o;e++){const o=t[e];let a,n,l=-1,u=0;for(;u<o.length&&(s.lastIndex=u,n=s.exec(o),null!==n);)u=s.lastIndex,s===q?"!--"===n[1]?s=B:void 0!==n[1]?s=A:void 0!==n[2]?(T.test(n[2])&&(i=RegExp("</"+n[2],"g")),s=I):void 0!==n[3]&&(s=I):s===I?">"===n[0]?(s=null!=i?i:q,l=-1):void 0===n[1]?l=-2:(l=s.lastIndex-n[2].length,a=n[1],s=void 0===n[3]?I:'"'===n[3]?E:C):s===E||s===C?s=I:s===B||s===A?s=q:(s=I,i=void 0);const d=s===I&&t[e+1].startsWith("/>")?" ":"";c+=s===q?o+x:l>=0?(r.push(a),o.slice(0,l)+"$lit$"+o.slice(l)+v+d):o+v+(-2===l?(r.push(void 0),e):d)}const a=c+(t[o]||"<?>")+(2===e?"</svg>":"");return[void 0!==h?h.createHTML(a):a,r]};class M{constructor({strings:t,_$litType$:e},o){let r;this.parts=[];let i=0,c=0;const s=t.length-1,a=this.parts,[n,l]=R(t,e);if(this.el=M.createElement(n,o),P.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=P.nextNode())&&a.length<s;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(v)){const o=l[c++];if(t.push(e),void 0!==o){const t=r.getAttribute(o.toLowerCase()+"$lit$").split(v),e=/([.?@])?(.*)/.exec(o);a.push({type:1,index:i,name:e[2],strings:t,ctor:"."===e[1]?j:"?"===e[1]?G:"@"===e[1]?K:N})}else a.push({type:6,index:i})}for(const e of t)r.removeAttribute(e)}if(T.test(r.tagName)){const t=r.textContent.split(v),e=t.length-1;if(e>0){r.textContent=b?b.emptyScript:"";for(let o=0;o<e;o++)r.append(t[o],y()),P.nextNode(),a.push({type:2,index:++i});r.append(t[e],y())}}}else if(8===r.nodeType)if(r.data===g)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=r.data.indexOf(v,t+1));)a.push({type:7,index:i}),t+=v.length-1}i++}}static createElement(t,e){const o=f.createElement("template");return o.innerHTML=t,o}}function W(t,e,o=t,r){var i,c,s,a;if(e===L)return e;let n=void 0!==r?null===(i=o._$Cl)||void 0===i?void 0:i[r]:o._$Cu;const l=k(e)?void 0:e._$litDirective$;return(null==n?void 0:n.constructor)!==l&&(null===(c=null==n?void 0:n._$AO)||void 0===c||c.call(n,!1),void 0===l?n=void 0:(n=new l(t),n._$AT(t,o,r)),void 0!==r?(null!==(s=(a=o)._$Cl)&&void 0!==s?s:a._$Cl=[])[r]=n:o._$Cu=n),void 0!==n&&(e=W(t,n._$AS(t,e.values),n,r)),e}class O{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:o},parts:r}=this._$AD,i=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:f).importNode(o,!0);P.currentNode=i;let c=P.nextNode(),s=0,a=0,n=r[0];for(;void 0!==n;){if(s===n.index){let e;2===n.type?e=new D(c,c.nextSibling,this,t):1===n.type?e=new n.ctor(c,n.name,n.strings,this,t):6===n.type&&(e=new V(c,this,t)),this.v.push(e),n=r[++a]}s!==(null==n?void 0:n.index)&&(c=P.nextNode(),s++)}return i}m(t){let e=0;for(const o of this.v)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class D{constructor(t,e,o,r){var i;this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=r,this._$Cg=null===(i=null==r?void 0:r.isConnected)||void 0===i||i}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),k(t)?t===S||null==t||""===t?(this._$AH!==S&&this._$AR(),this._$AH=S):t!==this._$AH&&t!==L&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):z(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==S&&k(this._$AH)?this._$AA.nextSibling.data=t:this.S(f.createTextNode(t)),this._$AH=t}T(t){var e;const{values:o,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=M.createElement(r.h,this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===i)this._$AH.m(o);else{const t=new O(i,this),e=t.p(this.options);t.m(o),this.S(e),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new M(t)),e}M(t){w(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,r=0;for(const i of t)r===e.length?e.push(o=new D(this.A(y()),this.A(y()),this,this.options)):o=e[r],o._$AI(i),r++;r<e.length&&(this._$AR(o&&o._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var o;for(null===(o=this._$AP)||void 0===o||o.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class N{constructor(t,e,o,r,i){this.type=1,this._$AH=S,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=S}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,o,r){const i=this.strings;let c=!1;if(void 0===i)t=W(this,t,e,0),c=!k(t)||t!==this._$AH&&t!==L,c&&(this._$AH=t);else{const r=t;let s,a;for(t=i[0],s=0;s<i.length-1;s++)a=W(this,r[o+s],e,s),a===L&&(a=this._$AH[s]),c||(c=!k(a)||a!==this._$AH[s]),a===S?t=S:t!==S&&(t+=(null!=a?a:"")+i[s+1]),this._$AH[s]=a}c&&!r&&this.k(t)}k(t){t===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class j extends N{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===S?void 0:t}}class G extends N{constructor(){super(...arguments),this.type=4}k(t){t&&t!==S?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class K extends N{constructor(t,e,o,r,i){super(t,e,o,r,i),this.type=5}_$AI(t,e=this){var o;if((t=null!==(o=W(this,t,e,0))&&void 0!==o?o:S)===L)return;const r=this._$AH,i=t===S&&r!==S||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,c=t!==S&&(r===S||i);i&&this.element.removeEventListener(this.name,this,r),c&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,o;"function"==typeof this._$AH?this._$AH.call(null!==(o=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==o?o:this.element,t):this._$AH.handleEvent(t)}}class V{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const Y={P:"$lit$",V:v,L:g,I:1,N:R,R:O,D:z,j:W,H:D,O:N,F:G,B:K,W:j,Z:V};var X,Q,Z;null===(m=globalThis.litHtmlPolyfillSupport)||void 0===m||m.call(globalThis,M,D),(null!==(p=globalThis.litHtmlVersions)&&void 0!==p?p:globalThis.litHtmlVersions=[]).push("2.0.0");class J extends d{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const o=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=o.firstChild),o}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=H(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return L}}J.finalized=!0,J._$litElement$=!0,null===(X=globalThis.litElementHydrateSupport)||void 0===X||X.call(globalThis,{LitElement:J}),null===(Q=globalThis.litElementPolyfillSupport)||void 0===Q||Q.call(globalThis,{LitElement:J}),(null!==(Z=globalThis.litElementVersions)&&void 0!==Z?Z:globalThis.litElementVersions=[]).push("3.0.0");const tt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(o){o.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}};function et(t){return(e,o)=>void 0!==o?((t,e,o)=>{e.constructor.createProperty(o,t)})(t,e,o):tt(t,e)}const ot=({finisher:t,descriptor:e})=>(o,r)=>{var i;if(void 0===r){const r=null!==(i=o.originalKey)&&void 0!==i?i:o.key,c=null!=e?{kind:"method",placement:"prototype",key:r,descriptor:e(o.key)}:{...o,key:r};return null!=t&&(c.finisher=function(e){t(e,r)}),c}{const i=o.constructor;void 0!==e&&Object.defineProperty(o,r,e(r)),null==t||t(i,r)}};function rt(t,e){return ot({descriptor:o=>{const r={get(){var e,o;return null!==(o=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==o?o:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof o?Symbol():"__"+o;r.get=function(){var o,r;return void 0===this[e]&&(this[e]=null!==(r=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(t))&&void 0!==r?r:null),this[e]}}return r}})}function it(t="",e=!1,o=""){return ot({descriptor:r=>({get(){var r,i,c;const s="slot"+(t?`[name=${t}]`:":not([name])");let a=null!==(c=null===(i=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(s))||void 0===i?void 0:i.assignedNodes({flatten:e}))&&void 0!==c?c:[];return o&&(a=a.filter((t=>t.nodeType===Node.ELEMENT_NODE&&t.matches(o)))),a},enumerable:!0,configurable:!0})})}const ct=new Set;new MutationObserver((()=>{const t="rtl"===document.documentElement.dir?document.documentElement.dir:"ltr";ct.forEach((e=>{e.setAttribute("dir",t)}))})).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});class st extends(function(t){class e extends t{constructor(){super(...arguments),this.dir="ltr"}get isLTR(){return"ltr"===this.dir}hasVisibleFocusInTree(){const t=this.getRootNode().activeElement;if(!t)return!1;try{return t.matches(":focus-visible")||t.matches(".focus-visible")}catch(e){return t.matches(".focus-visible")}}connectedCallback(){if(!this.hasAttribute("dir")){let e=this.assignedSlot||this.parentNode;for(;e!==document.documentElement&&(void 0===(t=e).startManagingContentDirection&&"SP-THEME"!==t.tagName);)e=e.assignedSlot||e.parentNode||e.host;if(this.dir="rtl"===e.dir?e.dir:this.dir||"ltr",e===document.documentElement)ct.add(this);else{const{localName:t}=e;t.search("-")>-1&&!customElements.get(t)?customElements.whenDefined(t).then((()=>{e.startManagingContentDirection(this)})):e.startManagingContentDirection(this)}this._dirParent=e}var t;super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._dirParent&&(this._dirParent===document.documentElement?ct.delete(this):this._dirParent.stopManagingContentDirection(this),this.removeAttribute("dir"))}}return c([et({reflect:!0})],e.prototype,"dir",void 0),e}(J)){}function at(t,{validSizes:e=["s","m","l","xl"],noDefaultSize:o,defaultSize:r="m"}={}){class i extends t{constructor(){super(...arguments),this._size=r}get size(){return this._size||r}set size(t){const i=o?null:r,c=t?t.toLocaleLowerCase():t,s=e.includes(c)?c:i;if(s&&this.setAttribute("size",s),this._size===s)return;const a=this._size;this._size=s,this.requestUpdate("size",a)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("size")||o||this.setAttribute("size",this.size)}}return c([et({type:String,reflect:!0})],i.prototype,"size",null),i}customElements.define("sp-theme",o);const nt=t=>null!=t?t:S,lt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ut=t=>(...e)=>({_$litDirective$:t,values:e});class dt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const mt=ut(class extends dt{constructor(t){var e;if(super(t),t.type!==lt.ATTRIBUTE||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var o,r;if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.et=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(o=this.et)||void 0===o?void 0:o.has(t))&&this.st.add(t);return this.render(e)}const i=t.element.classList;this.st.forEach((t=>{t in e||(i.remove(t),this.st.delete(t))}));for(const t in e){const o=!!e[t];o===this.st.has(t)||(null===(r=this.et)||void 0===r?void 0:r.has(t))||(o?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return L}});var pt=r`#button{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-appearance:button;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}#button:focus{outline:0}#button::-moz-focus-inner{border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}#button:disabled{cursor:default}:host([dir=ltr]) #button{padding-left:var(
--spectrum-picker-textonly-padding-left
);padding-right:var(--spectrum-picker-textonly-padding-right)}:host([dir=rtl]) #button{padding-left:var(--spectrum-picker-textonly-padding-right);padding-right:var(
--spectrum-picker-textonly-padding-left
)}#button{align-items:center;border-radius:var(--spectrum-picker-texticon-border-radius);border-style:solid;border-width:var(--spectrum-picker-texticon-border-size);display:flex;height:var(--spectrum-picker-texticon-height);justify-content:center;margin:0;min-width:var(--spectrum-picker-texticon-min-width);padding-bottom:0;padding-top:0;transition:background-color var(--spectrum-global-animation-duration-100,.13s),box-shadow var(--spectrum-global-animation-duration-100,.13s),border-color var(--spectrum-global-animation-duration-100,.13s);width:var(--spectrum-picker-texticon-width)}#button:disabled,:host([disabled]) #button{border-width:var(
--spectrum-picker-texticon-disabled-border-size
);cursor:default}:host([dir=ltr]) #button .icon{margin-right:var(
--spectrum-picker-texticon-icon-gap
)}:host([dir=rtl]) #button .icon{margin-left:var(
--spectrum-picker-texticon-icon-gap
)}.icon{flex-shrink:0}:host([dir=ltr]) #button #label+.icon{margin-left:var(
--spectrum-picker-texticon-icon-gap
)}:host([dir=rtl]) #button #label+.icon{margin-right:var(
--spectrum-picker-texticon-icon-gap
)}:host([size=s]){--spectrum-picker-texticon-border-size:var(
--spectrum-picker-s-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-texticon-text-size:var(
--spectrum-picker-s-texticon-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-picker-texticon-icon-gap:var(
--spectrum-picker-s-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-picker-texticon-placeholder-font-style:var(
--spectrum-picker-s-texticon-placeholder-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-picker-texticon-placeholder-font-weight:var(
--spectrum-picker-s-texticon-placeholder-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-picker-texticon-error-icon-margin-left:var(
--spectrum-picker-s-texticon-error-icon-margin-left,var(--spectrum-global-dimension-size-100)
);--spectrum-picker-texticon-ui-icon-gap:var(
--spectrum-picker-s-texticon-ui-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-picker-texticon-popover-max-width:var(
--spectrum-picker-s-texticon-popover-max-width,var(--spectrum-global-dimension-size-1800)
);--spectrum-picker-texticon-height:var(
--spectrum-picker-s-texticon-height,var(--spectrum-global-dimension-size-300)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-s-texticon-min-width,var(--spectrum-global-dimension-size-450)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-s-texticon-width,var(--spectrum-global-dimension-size-2000)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-s-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-s-textonly-padding-left,var(--spectrum-global-dimension-size-115)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-s-textonly-padding-right,var(--spectrum-global-dimension-size-115)
)}:host([size=m]){--spectrum-picker-texticon-border-size:var(
--spectrum-picker-m-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-texticon-text-size:var(
--spectrum-picker-m-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-picker-texticon-icon-gap:var(
--spectrum-picker-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-picker-texticon-placeholder-font-style:var(
--spectrum-picker-m-texticon-placeholder-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-picker-texticon-placeholder-font-weight:var(
--spectrum-picker-m-texticon-placeholder-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-picker-texticon-error-icon-margin-left:var(
--spectrum-picker-m-texticon-error-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-picker-texticon-ui-icon-gap:var(
--spectrum-picker-m-texticon-ui-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-picker-texticon-popover-max-width:var(
--spectrum-picker-m-texticon-popover-max-width,var(--spectrum-global-dimension-size-2400)
);--spectrum-picker-texticon-height:var(
--spectrum-picker-m-texticon-height,var(--spectrum-global-dimension-size-400)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-m-texticon-min-width,var(--spectrum-global-dimension-size-600)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-m-texticon-width,var(--spectrum-global-dimension-size-2400)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-m-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-m-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-m-textonly-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([size=l]){--spectrum-picker-texticon-border-size:var(
--spectrum-picker-l-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-texticon-text-size:var(
--spectrum-picker-l-texticon-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-picker-texticon-icon-gap:var(
--spectrum-picker-l-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-picker-texticon-placeholder-font-style:var(
--spectrum-picker-l-texticon-placeholder-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-picker-texticon-placeholder-font-weight:var(
--spectrum-picker-l-texticon-placeholder-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-picker-texticon-error-icon-margin-left:var(
--spectrum-picker-l-texticon-error-icon-margin-left,var(--spectrum-global-dimension-size-185)
);--spectrum-picker-texticon-ui-icon-gap:var(
--spectrum-picker-l-texticon-ui-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-picker-texticon-popover-max-width:var(
--spectrum-picker-l-texticon-popover-max-width,var(--spectrum-global-dimension-size-3000)
);--spectrum-picker-texticon-height:var(
--spectrum-picker-l-texticon-height,var(--spectrum-global-dimension-size-500)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-l-texticon-min-width,var(--spectrum-global-dimension-size-750)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-l-texticon-width,var(--spectrum-global-dimension-size-2500)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-l-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-l-textonly-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-l-textonly-padding-right,var(--spectrum-global-dimension-size-185)
)}:host([size=xl]){--spectrum-picker-texticon-border-size:var(
--spectrum-picker-xl-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-picker-texticon-text-size:var(
--spectrum-picker-xl-texticon-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-picker-texticon-icon-gap:var(
--spectrum-picker-xl-texticon-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-picker-texticon-placeholder-font-style:var(
--spectrum-picker-xl-texticon-placeholder-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-picker-texticon-placeholder-font-weight:var(
--spectrum-picker-xl-texticon-placeholder-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-picker-texticon-error-icon-margin-left:var(
--spectrum-picker-xl-texticon-error-icon-margin-left,var(--spectrum-global-dimension-size-225)
);--spectrum-picker-texticon-ui-icon-gap:var(
--spectrum-picker-xl-texticon-ui-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-picker-texticon-popover-max-width:var(
--spectrum-picker-xl-texticon-popover-max-width,var(--spectrum-global-dimension-size-3600)
);--spectrum-picker-texticon-height:var(
--spectrum-picker-xl-texticon-height,var(--spectrum-global-dimension-size-600)
);--spectrum-picker-texticon-min-width:var(
--spectrum-picker-xl-texticon-min-width,var(--spectrum-global-dimension-size-900)
);--spectrum-picker-texticon-width:var(
--spectrum-picker-xl-texticon-width,var(--spectrum-global-dimension-size-3000)
);--spectrum-picker-texticon-border-radius:var(
--spectrum-picker-xl-texticon-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-picker-textonly-padding-left:var(
--spectrum-picker-xl-textonly-padding-left,var(--spectrum-global-dimension-size-225)
);--spectrum-picker-textonly-padding-right:var(
--spectrum-picker-xl-textonly-padding-right,var(--spectrum-global-dimension-size-225)
)}:host{--spectrum-picker-texticon-min-width:var(
--spectrum-global-dimension-size-400
);--spectrum-picker-texticon-disabled-border-size:0;--spectrum-picker-texticon-popover-max-width:var(
--spectrum-global-dimension-size-3000
);--spectrum-picker-texticon-width:var(
--spectrum-global-dimension-size-2400
);--spectrum-picker-texticon-border-size-increase-focus:1px}:host([quiet]) #button{--spectrum-picker-texticon-border-size:0;--spectrum-picker-texticon-border-radius:0;--spectrum-picker-textonly-padding-left:0;--spectrum-picker-textonly-padding-right:0}:host([quiet]) #button{min-width:0;width:auto}:host([quiet]) #button:disabled.focus-visible,:host([quiet][disabled]) #button.focus-visible{box-shadow:none}:host([quiet]) #button:disabled:focus-visible,:host([quiet][disabled]) #button:focus-visible{box-shadow:none}:host([dir=ltr]) #label{text-align:left}:host([dir=rtl]) #label{text-align:right}#label{flex:1 1 auto;font-size:var(--spectrum-picker-texticon-text-size);height:calc(var(--spectrum-picker-texticon-height) - var(--spectrum-picker-texticon-border-size)*2);line-height:calc(var(--spectrum-picker-texticon-height) - var(--spectrum-picker-texticon-border-size)*2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#label.placeholder{font-style:var(--spectrum-picker-texticon-placeholder-font-style);font-weight:var(
--spectrum-picker-texticon-placeholder-font-weight
);transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.picker{display:inline-block;flex-shrink:0;position:relative;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-out;vertical-align:top}:host([dir=ltr]) .validation-icon{margin-left:var(
--spectrum-picker-texticon-error-icon-margin-left
)}:host([dir=rtl]) .validation-icon{margin-right:var(
--spectrum-picker-texticon-error-icon-margin-left
)}:host([dir=ltr]) #label~.picker{margin-left:var(
--spectrum-picker-texticon-ui-icon-gap
)}:host([dir=rtl]) #label~.picker{margin-right:var(
--spectrum-picker-texticon-ui-icon-gap
)}#popover{max-width:var(
--spectrum-picker-texticon-popover-max-width
)}:host([dir=ltr]) .spectrum-Picker-popover--quiet{margin-left:calc((var(--spectrum-picker-m-quiet-texticon-popover-offset-x,var(--spectrum-global-dimension-size-150)) + var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)))*-1)}:host([dir=rtl]) .spectrum-Picker-popover--quiet{margin-right:calc((var(--spectrum-picker-m-quiet-texticon-popover-offset-x,var(--spectrum-global-dimension-size-150)) + var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)))*-1)}#button{background-color:var(
--spectrum-picker-m-texticon-background-color,var(--spectrum-alias-component-background-color-default)
);border-color:var(
--spectrum-picker-m-texticon-border-color,var(--spectrum-alias-component-border-color-default)
);color:var(
--spectrum-picker-m-texticon-text-color,var(--spectrum-alias-component-text-color-default)
)}#button:hover{background-color:var(
--spectrum-picker-m-texticon-background-color-hover,var(--spectrum-alias-component-background-color-hover)
);border-color:var(
--spectrum-picker-m-texticon-border-color-hover,var(--spectrum-alias-component-border-color-hover)
);color:var(
--spectrum-picker-m-texticon-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}#button:hover .picker{color:var(
--spectrum-picker-m-texticon-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}#button:active,:host([open]) #button{background-color:var(
--spectrum-picker-m-texticon-background-color-down,var(--spectrum-alias-component-background-color-down)
);border-color:var(
--spectrum-picker-m-texticon-border-color-down,var(--spectrum-alias-component-border-color-down)
)}#button:active.placeholder #label,:host([open]) #button.placeholder #label{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-down,var(--spectrum-alias-placeholder-text-color-down)
)}#button.focus-visible,:host([focused]) #button{background-color:var(
--spectrum-picker-m-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);box-shadow:0 0 0 var(--spectrum-picker-texticon-border-size-increase-focus) var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-picker-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}#button:focus-visible,:host([focused]) #button{background-color:var(
--spectrum-picker-m-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);box-shadow:0 0 0 var(--spectrum-picker-texticon-border-size-increase-focus) var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-picker-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}#button.focus-visible.placeholder,:host([focused]) #button.placeholder{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}#button:focus-visible.placeholder,:host([focused]) #button.placeholder{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([invalid]) #button{border-color:var(
--spectrum-picker-m-texticon-border-color-error,var(--spectrum-semantic-negative-color-default)
)}:host([invalid]) #button .validation-icon{color:var(
--spectrum-picker-m-texticon-validation-icon-color-error,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]) #button:hover{border-color:var(
--spectrum-picker-m-texticon-border-color-error-hover,var(--spectrum-semantic-negative-color-hover)
)}:host([invalid]) #button:active,:host([invalid][open]) #button{border-color:var(
--spectrum-picker-m-texticon-border-color-error-down,var(--spectrum-semantic-negative-color-down)
)}:host([invalid]) #button.focus-visible,:host([invalid][focused]) #button{border-color:var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 var(--spectrum-picker-texticon-border-size-increase-focus) var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([invalid]) #button:focus-visible,:host([invalid][focused]) #button{border-color:var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
);box-shadow:0 0 0 var(--spectrum-picker-texticon-border-size-increase-focus) var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
)}#button:disabled,:host([disabled]) #button{background-color:var(
--spectrum-picker-m-texticon-background-color-disabled,var(--spectrum-alias-component-background-color-disabled)
);color:var(
--spectrum-picker-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}#button:disabled .icon,#button:disabled .picker,#button:disabled .validation-icon,:host([disabled]) #button .icon,:host([disabled]) #button .picker,:host([disabled]) #button .validation-icon{color:var(
--spectrum-picker-m-texticon-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}#button:disabled #label.placeholder,:host([disabled]) #button #label.placeholder{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}.picker{color:var(
--spectrum-picker-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}#label.placeholder{color:var(
--spectrum-picker-m-texticon-placeholder-text-color,var(--spectrum-alias-placeholder-text-color)
)}#label.placeholder:hover{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-hover,var(--spectrum-alias-placeholder-text-color-hover)
)}#label.placeholder:active{color:var(
--spectrum-picker-m-texticon-placeholder-text-color-mouse-focus,var(--spectrum-alias-placeholder-text-color-down)
)}:host([quiet]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color,var(--spectrum-alias-component-background-color-quiet-default)
);border-color:var(
--spectrum-picker-m-quiet-texticon-border-color,var(--spectrum-alias-component-border-color-quiet-default)
);color:var(
--spectrum-picker-m-texticon-text-color,var(--spectrum-alias-component-text-color-default)
)}:host([quiet]) #button:hover{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-hover,var(--spectrum-alias-component-background-color-quiet-hover)
);color:var(
--spectrum-picker-m-texticon-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host([quiet]) #button.focus-visible,:host([quiet][focused]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([quiet]) #button:focus-visible,:host([quiet][focused]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([quiet]) #button.focus-visible.placeholder,:host([quiet][focused]) #button.placeholder{color:var(
--spectrum-picker-m-quiet-texticon-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([quiet]) #button:focus-visible.placeholder,:host([quiet][focused]) #button.placeholder{color:var(
--spectrum-picker-m-quiet-texticon-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([quiet]) #button.focus-visible .picker,:host([quiet][focused]) #button .picker{color:var(
--spectrum-picker-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([quiet]) #button:focus-visible .picker,:host([quiet][focused]) #button .picker{color:var(
--spectrum-picker-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([quiet]) #button:active,:host([quiet][open]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-down,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-picker-m-quiet-texticon-border-color-down,var(--spectrum-alias-component-border-color-quiet-down)
)}:host([quiet]) #button:active.focus-visible,:host([quiet][focused]) #button:active,:host([quiet][open]) #button.focus-visible,:host([quiet][open][focused]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([quiet]) #button:active:focus-visible,:host([quiet][focused]) #button:active,:host([quiet][open]) #button:focus-visible,:host([quiet][open][focused]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([quiet][invalid]) #button.focus-visible,:host([quiet][invalid][focused]) #button{box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([quiet][invalid]) #button:focus-visible,:host([quiet][invalid][focused]) #button{box-shadow:0 2px 0 0 var(
--spectrum-picker-m-texticon-border-color-error-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host([quiet]) #button:disabled,:host([quiet][disabled]) #button{background-color:var(
--spectrum-picker-m-quiet-texticon-background-color-disabled,var(--spectrum-alias-component-background-color-quiet-disabled)
);color:var(
--spectrum-picker-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host{display:inline-flex;max-width:100%;min-width:var(--spectrum-picker-min-width);vertical-align:top;width:var(--spectrum-picker-width)}:host([quiet]){min-width:0;width:auto}:host([size]){--spectrum-picker-width:var(--spectrum-global-dimension-size-2400)}#button{max-width:100%;min-width:100%;width:100%}:host([readonly]) #button{-webkit-user-select:inherit;user-select:inherit}sp-popover{display:none}.picker,.validation-icon{flex-shrink:0}:host([focused]:not([quiet])) #button #label.placeholder{color:var(
--spectrum-picker-placeholder-text-color-key-focus,var(--spectrum-alias-placeholder-text-color-hover)
)}:host([focused]:not([quiet])) #button .picker{color:var(
--spectrum-picker-icon-color-key-focus,var(--spectrum-alias-icon-color-focus)
)}.visually-hidden{clip:rect(0,0,0,0);border:0;-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}:host([dir=ltr]) #label.visually-hidden+.picker{margin-left:auto}:host([dir=rtl]) #label.visually-hidden+.picker{margin-right:auto}`;var bt,ht=r`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronDown500,.spectrum-UIIcon-ChevronDown75{transform:rotate(90deg)}.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronLeft500,.spectrum-UIIcon-ChevronLeft75{transform:rotate(180deg)}.spectrum-UIIcon-ChevronUp100,.spectrum-UIIcon-ChevronUp200,.spectrum-UIIcon-ChevronUp300,.spectrum-UIIcon-ChevronUp400,.spectrum-UIIcon-ChevronUp500,.spectrum-UIIcon-ChevronUp75{transform:rotate(270deg)}.spectrum-UIIcon-ChevronDown75,.spectrum-UIIcon-ChevronLeft75,.spectrum-UIIcon-ChevronRight75,.spectrum-UIIcon-ChevronUp75{height:var(--spectrum-alias-ui-icon-chevron-size-75);width:var(
--spectrum-alias-ui-icon-chevron-size-75
)}.spectrum-UIIcon-ChevronDown100,.spectrum-UIIcon-ChevronLeft100,.spectrum-UIIcon-ChevronRight100,.spectrum-UIIcon-ChevronUp100{height:var(--spectrum-alias-ui-icon-chevron-size-100);width:var(
--spectrum-alias-ui-icon-chevron-size-100
)}.spectrum-UIIcon-ChevronDown200,.spectrum-UIIcon-ChevronLeft200,.spectrum-UIIcon-ChevronRight200,.spectrum-UIIcon-ChevronUp200{height:var(--spectrum-alias-ui-icon-chevron-size-200);width:var(
--spectrum-alias-ui-icon-chevron-size-200
)}.spectrum-UIIcon-ChevronDown300,.spectrum-UIIcon-ChevronLeft300,.spectrum-UIIcon-ChevronRight300,.spectrum-UIIcon-ChevronUp300{height:var(--spectrum-alias-ui-icon-chevron-size-300);width:var(
--spectrum-alias-ui-icon-chevron-size-300
)}.spectrum-UIIcon-ChevronDown400,.spectrum-UIIcon-ChevronLeft400,.spectrum-UIIcon-ChevronRight400,.spectrum-UIIcon-ChevronUp400{height:var(--spectrum-alias-ui-icon-chevron-size-400);width:var(
--spectrum-alias-ui-icon-chevron-size-400
)}.spectrum-UIIcon-ChevronDown500,.spectrum-UIIcon-ChevronLeft500,.spectrum-UIIcon-ChevronRight500,.spectrum-UIIcon-ChevronUp500{height:var(--spectrum-alias-ui-icon-chevron-size-500);width:var(
--spectrum-alias-ui-icon-chevron-size-500
)}`;window,bt=function(){function t(t){var e=!0,o=!1,r=null,i={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function c(t){return!!(t&&t!==document&&"HTML"!==t.nodeName&&"BODY"!==t.nodeName&&"classList"in t&&"contains"in t.classList)}function s(t){t.classList.contains("focus-visible")||(t.classList.add("focus-visible"),t.setAttribute("data-focus-visible-added",""))}function a(t){e=!1}function n(){document.addEventListener("mousemove",l),document.addEventListener("mousedown",l),document.addEventListener("mouseup",l),document.addEventListener("pointermove",l),document.addEventListener("pointerdown",l),document.addEventListener("pointerup",l),document.addEventListener("touchmove",l),document.addEventListener("touchstart",l),document.addEventListener("touchend",l)}function l(t){t.target.nodeName&&"html"===t.target.nodeName.toLowerCase()||(e=!1,document.removeEventListener("mousemove",l),document.removeEventListener("mousedown",l),document.removeEventListener("mouseup",l),document.removeEventListener("pointermove",l),document.removeEventListener("pointerdown",l),document.removeEventListener("pointerup",l),document.removeEventListener("touchmove",l),document.removeEventListener("touchstart",l),document.removeEventListener("touchend",l))}document.addEventListener("keydown",(function(o){o.metaKey||o.altKey||o.ctrlKey||(c(t.activeElement)&&s(t.activeElement),e=!0)}),!0),document.addEventListener("mousedown",a,!0),document.addEventListener("pointerdown",a,!0),document.addEventListener("touchstart",a,!0),document.addEventListener("visibilitychange",(function(t){"hidden"===document.visibilityState&&(o&&(e=!0),n())}),!0),n(),t.addEventListener("focus",(function(t){var o,r,a;c(t.target)&&(e||(o=t.target,r=o.type,"INPUT"===(a=o.tagName)&&i[r]&&!o.readOnly||"TEXTAREA"===a&&!o.readOnly||o.isContentEditable))&&s(t.target)}),!0),t.addEventListener("blur",(function(t){var e;c(t.target)&&(t.target.classList.contains("focus-visible")||t.target.hasAttribute("data-focus-visible-added"))&&(o=!0,window.clearTimeout(r),r=window.setTimeout((function(){o=!1}),100),(e=t.target).hasAttribute("data-focus-visible-added")&&(e.classList.remove("focus-visible"),e.removeAttribute("data-focus-visible-added")))}),!0),t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host?t.host.setAttribute("data-js-focus-visible",""):t.nodeType===Node.DOCUMENT_NODE&&(document.documentElement.classList.add("js-focus-visible"),document.documentElement.setAttribute("data-js-focus-visible",""))}if("undefined"!=typeof window&&"undefined"!=typeof document){var e;window.applyFocusVisiblePolyfill=t;try{e=new CustomEvent("focus-visible-polyfill-ready")}catch(t){(e=document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(e)}"undefined"!=typeof document&&t(document)},"object"==typeof exports&&"undefined"!=typeof module?bt():"function"==typeof define&&define.amd?define(bt):bt();let vt=!0;try{document.body.querySelector(":focus-visible")}catch(t){vt=!1}const gt=t=>{var e;const o=Symbol("endPolyfillCoordination");return e=o,class extends t{constructor(){super(...arguments),this[e]=null}connectedCallback(){super.connectedCallback&&super.connectedCallback(),vt||requestAnimationFrame((()=>{null==this[o]&&(this[o]=(t=>{if(null==t.shadowRoot||t.hasAttribute("data-js-focus-visible"))return()=>{};if(!self.applyFocusVisiblePolyfill){const e=()=>{self.applyFocusVisiblePolyfill&&t.shadowRoot&&self.applyFocusVisiblePolyfill(t.shadowRoot),t.manageAutoFocus&&t.manageAutoFocus()};return self.addEventListener("focus-visible-polyfill-ready",e,{once:!0}),()=>{self.removeEventListener("focus-visible-polyfill-ready",e)}}return self.applyFocusVisiblePolyfill(t.shadowRoot),t.manageAutoFocus&&t.manageAutoFocus(),()=>{}})(this))}))}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),vt||requestAnimationFrame((()=>{null!=this[o]&&(this[o](),this[o]=null)}))}}};class xt extends(gt(st)){constructor(){super(...arguments),this.disabled=!1,this.autofocus=!1,this._tabIndex=0,this.manipulatingTabindex=!1}get tabIndex(){if(this.focusElement===this){const t=this.hasAttribute("tabindex")?Number(this.getAttribute("tabindex")):NaN;return isNaN(t)?-1:t}const t=parseFloat(this.hasAttribute("tabindex")&&this.getAttribute("tabindex")||"0");return this.disabled||t<0?-1:this.focusElement?this.focusElement.tabIndex:t}set tabIndex(t){if(this.manipulatingTabindex)this.manipulatingTabindex=!1;else if(this.focusElement!==this){if(-1===t?this.addEventListener("pointerdown",this.onPointerdownManagementOfTabIndex):(this.manipulatingTabindex=!0,this.removeEventListener("pointerdown",this.onPointerdownManagementOfTabIndex)),-1===t||this.disabled)return this.setAttribute("tabindex","-1"),this.removeAttribute("focusable"),void(-1!==t&&this.manageFocusElementTabindex(t));this.setAttribute("focusable",""),this.hasAttribute("tabindex")?this.removeAttribute("tabindex"):this.manipulatingTabindex=!1,this.manageFocusElementTabindex(t)}else if(t!==this.tabIndex){this._tabIndex=t;const e=this.disabled?"-1":""+t;this.setAttribute("tabindex",e)}}onPointerdownManagementOfTabIndex(){-1===this.tabIndex&&(this.tabIndex=0,this.focus({preventScroll:!0}))}async manageFocusElementTabindex(t){this.focusElement||await this.updateComplete,null===t?this.focusElement.removeAttribute("tabindex"):this.focusElement.tabIndex=t}get focusElement(){throw new Error("Must implement focusElement getter!")}focus(t){!this.disabled&&this.focusElement&&(this.focusElement!==this?this.focusElement.focus(t):HTMLElement.prototype.focus.apply(this,[t]))}blur(){const t=this.focusElement||this;t!==this?t.blur():HTMLElement.prototype.blur.apply(this)}click(){if(this.disabled)return;const t=this.focusElement||this;t!==this?t.click():HTMLElement.prototype.click.apply(this)}manageAutoFocus(){this.autofocus&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),this.focusElement.focus())}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("tabindex")&&"-1"===this.getAttribute("tabindex")||this.setAttribute("focusable","")}update(t){t.has("disabled")&&this.handleDisabledChanged(this.disabled,t.get("disabled")),super.update(t)}updated(t){super.updated(t),t.has("disabled")&&this.disabled&&this.blur()}async handleDisabledChanged(t,e){const o=()=>this.focusElement!==this&&void 0!==this.focusElement.disabled;t?(this.manipulatingTabindex=!0,this.setAttribute("tabindex","-1"),await this.updateComplete,o()?this.focusElement.disabled=!0:this.setAttribute("aria-disabled","true")):e&&(this.manipulatingTabindex=!0,this.focusElement===this?this.setAttribute("tabindex",""+this._tabIndex):this.removeAttribute("tabindex"),await this.updateComplete,o()?this.focusElement.disabled=!1:this.removeAttribute("aria-disabled"))}connectedCallback(){super.connectedCallback(),this.updateComplete.then((()=>{requestAnimationFrame((()=>{this.manageAutoFocus()}))}))}}c([et({type:Boolean,reflect:!0})],xt.prototype,"disabled",void 0),c([et({type:Boolean})],xt.prototype,"autofocus",void 0),c([et({type:Number})],xt.prototype,"tabIndex",null);const ft=(t,e,o)=>{const r=[],i=[];for(let c=0;c<t.length;++c){const s=t[c];o&&i.push(o(s)||(()=>{}));const a=document.createComment("placeholder for reparented element");r.push(a);const n=s.parentElement||s.getRootNode();n&&n!==s&&n.replaceChild(a,s),e.append(s)}return function(){return function(t,e,o=[]){for(let r=0;r<e.length;++r){const i=e[r],c=t[r],s=c.parentElement||c.getRootNode();o[r]&&o[r](i),s&&s!==c&&s.replaceChild(i,c),delete t[r]}return e}(r,t,i)}};var yt=r`:host{fill:currentColor;color:inherit;display:inline-block;pointer-events:none}:host(:not(:root)){overflow:hidden}@media (forced-colors:active){.spectrum-UIIcon,:host{forced-color-adjust:auto}}:host{--spectrum-icon-size-s:var(
--spectrum-alias-workflow-icon-size-s,var(--spectrum-global-dimension-size-200)
);--spectrum-icon-size-m:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);--spectrum-icon-size-l:var(--spectrum-alias-workflow-icon-size-l);--spectrum-icon-size-xl:var(
--spectrum-alias-workflow-icon-size-xl,var(--spectrum-global-dimension-size-275)
);--spectrum-icon-size-xxl:var(--spectrum-global-dimension-size-400)}:host([size=s]){height:var(
--spectrum-icon-size-s
);width:var(--spectrum-icon-size-s)}:host([size=m]){height:var(
--spectrum-icon-size-m
);width:var(--spectrum-icon-size-m)}:host([size=l]){height:var(
--spectrum-icon-size-l
);width:var(--spectrum-icon-size-l)}:host([size=xl]){height:var(
--spectrum-icon-size-xl
);width:var(--spectrum-icon-size-xl)}:host([size=xxl]){height:var(
--spectrum-icon-size-xxl
);width:var(--spectrum-icon-size-xxl)}:host{height:var(
--spectrum-icon-tshirt-size-height,var(
--spectrum-alias-workflow-icon-size,var(--spectrum-global-dimension-size-225)
)
);width:var(
--spectrum-icon-tshirt-size-width,var(
--spectrum-alias-workflow-icon-size,var(--spectrum-global-dimension-size-225)
)
)}#container{height:100%}::slotted(*),img,svg{height:100%;vertical-align:top;width:100%}`;class kt extends st{static get styles(){return[yt]}render(){return _`<slot></slot>`}}let wt;c([et()],kt.prototype,"label",void 0),c([et({reflect:!0})],kt.prototype,"size",void 0);const zt=function(t,...e){return wt?wt(t,...e):e.reduce(((e,o,r)=>e+o+t[r+1]),t[0])},qt=t=>{wt=t};let Bt;customElements.define("sp-icon-chevron100",class extends kt{render(){return qt(_),zt`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" aria-hidden="true" fill="currentColor"><path d="M3 9.95a.875.875 0 01-.615-1.498L5.88 5 2.385 1.547A.875.875 0 013.615.302L7.74 4.377a.876.876 0 010 1.246L3.615 9.698A.872.872 0 013 9.95z"/></svg>`}});const At=function(t,...e){return Bt?Bt(t,...e):e.reduce(((e,o,r)=>e+o+t[r+1]),t[0])},It=t=>{Bt=t};customElements.define("sp-icon-alert",class extends kt{render(){return It(_),(({width:t=24,height:e=24,hidden:o=!1,title:r="Alert"}={})=>At`<svg xmlns="http://www.w3.org/2000/svg" height="${e}" viewBox="0 0 36 36" width="${t}" aria-hidden="${o?"true":"false"}" role="img" fill="currentColor" aria-label="${r}"><path d="M17.127 2.579L.4 32.512A1 1 0 001.272 34h33.456a1 1 0 00.872-1.488L18.873 2.579a1 1 0 00-1.746 0zM20 29.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5h3a.5.5 0 01.5.5zm0-6a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5h3a.5.5 0 01.5.5z"/></svg>`)({hidden:!this.label,title:this.label})}});function Ct(t){class e extends t{renderAnchor({id:t,className:e,ariaHidden:o,labelledby:r,tabindex:i,anchorContent:c=_`<slot></slot>`}){return _`<a id="${t}" class="${nt(e)}" href="${nt(this.href)}" download="${nt(this.download)}" target="${nt(this.target)}" aria-label="${nt(this.label)}" aria-labelledby="${nt(r)}" aria-hidden="${nt(o?"true":void 0)}" tabindex="${nt(i)}" rel="${nt(this.rel)}">${c}</a>`}}return c([et({reflect:!0})],e.prototype,"download",void 0),c([et()],e.prototype,"label",void 0),c([et({reflect:!0})],e.prototype,"href",void 0),c([et({reflect:!0})],e.prototype,"target",void 0),c([et({reflect:!0})],e.prototype,"rel",void 0),e}customElements.define("sp-icon-checkmark100",class extends kt{render(){return qt(_),zt`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" aria-hidden="true" fill="currentColor"><path d="M3.5 9.5a.999.999 0 01-.774-.368l-2.45-3a1 1 0 111.548-1.264l1.657 2.028 4.68-6.01A1 1 0 019.74 2.114l-5.45 7a1 1 0 01-.777.386z"/></svg>`}});var Et=r`.checkmark{align-self:flex-start;display:none;opacity:1;transform:scale(1)}:host([dir=ltr]) .checkmark{padding-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .checkmark{padding-right:var(
--spectrum-listitem-texticon-icon-gap
)}.checkmark{flex-grow:0;margin-top:calc(var(--spectrum-listitem-texticon-ui-icon-margin-top) - var(--spectrum-listitem-texticon-padding-y) + 1px)}:host([dir=ltr]) .chevron{padding-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .chevron{padding-right:var(
--spectrum-listitem-texticon-icon-gap
)}.chevron{flex-grow:0;margin-top:calc(var(--spectrum-listitem-texticon-ui-icon-margin-top) - var(--spectrum-listitem-texticon-padding-y) + 1px)}:host([dir=ltr]){border-left:var(--spectrum-listitem-texticon-focus-indicator-size) solid transparent}:host([dir=rtl]){border-right:var(--spectrum-listitem-texticon-focus-indicator-size) solid transparent}:host{align-items:center;box-sizing:border-box;cursor:pointer;display:flex;font-size:var(--spectrum-listitem-texticon-text-size);font-style:normal;font-weight:var(--spectrum-listitem-texticon-text-font-weight);margin:0;min-height:var(--spectrum-listitem-texticon-height);padding:var(--spectrum-listitem-texticon-padding-y) var(--spectrum-listitem-texticon-padding-right) var(--spectrum-listitem-texticon-padding-y) var(--spectrum-listitem-texticon-padding-left);position:relative;text-decoration:none}:host(:focus){outline:0}:host([dir=ltr][selected]){padding-right:calc(var(--spectrum-listitem-texticon-padding-right) - var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)))}:host([dir=rtl][selected]){padding-left:calc(var(--spectrum-listitem-texticon-padding-right) - var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)))}:host([selected]) .checkmark{display:block}.icon,::slotted([slot=icon]){align-self:flex-start;flex-shrink:0}:host([dir=ltr]) .icon+#label,:host([dir=ltr]) slot[name=icon]+#label{margin-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .icon+#label,:host([dir=rtl]) slot[name=icon]+#label{margin-right:var(
--spectrum-listitem-texticon-icon-gap
)}.icon+#label,slot[name=icon]+#label{width:calc(100% - var(--spectrum-listitem-texticon-ui-icon-width) - var(--spectrum-listitem-texticon-icon-gap) - var(--spectrum-listitem-textthumbnail-padding-left) - var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)))}:host([no-wrap]) #label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([dir=ltr]) .checkmark,:host([dir=ltr]) .chevron{padding-left:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .checkmark,:host([dir=rtl]) .chevron{padding-right:var(
--spectrum-listitem-texticon-icon-gap
)}:host([dir=rtl]) .chevron{transform:matrix(-1,0,0,1,0,0)}:host{background-color:var(
--spectrum-listitem-m-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-listitem-m-texticon-text-color,var(--spectrum-alias-component-text-color-default)
)}:host([dir=ltr].focus-visible),:host([dir=ltr][focused]){border-left-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host([dir=ltr]:focus-visible),:host([dir=ltr][focused]){border-left-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host([dir=rtl].focus-visible),:host([dir=rtl][focused]){border-right-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host([dir=rtl]:focus-visible),:host([dir=rtl][focused]){border-right-color:var(
--spectrum-listitem-m-texticon-focus-indicator-color,var(--spectrum-alias-border-color-key-focus)
)}:host(.focus-visible),:host([focused]){background-color:var(
--spectrum-listitem-m-texticon-background-color-key-focus,var(--spectrum-alias-background-color-hover-overlay)
);color:var(
--spectrum-listitem-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(:focus-visible),:host([focused]){background-color:var(
--spectrum-listitem-m-texticon-background-color-key-focus,var(--spectrum-alias-background-color-hover-overlay)
);color:var(
--spectrum-listitem-m-texticon-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(.is-highlighted),:host(.is-open),:host(:focus),:host(:hover){background-color:var(
--spectrum-listitem-m-texticon-background-color-hover,var(--spectrum-alias-background-color-hover-overlay)
);color:var(
--spectrum-listitem-m-texticon-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host([selected]){color:var(
--spectrum-listitem-m-texticon-text-color-selected,var(--spectrum-alias-component-text-color-default)
)}:host([selected]) .checkmark{color:var(
--spectrum-listitem-m-texticon-ui-icon-color-selected,var(--spectrum-alias-icon-color-selected)
)}:host(:active),:host([active]){background-color:var(
--spectrum-listitem-m-texticon-background-color-down,var(--spectrum-alias-background-color-hover-overlay)
)}:host([disabled]){background-color:var(
--spectrum-listitem-m-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);background-image:none;color:var(
--spectrum-listitem-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
);cursor:default}#label{flex:1 1 auto;-webkit-hyphens:auto;hyphens:auto;line-height:var(--spectrum-listitem-texticon-label-line-height);overflow-wrap:break-word;width:calc(100% - var(--spectrum-listitem-texticon-ui-icon-width) - var(--spectrum-listitem-texticon-icon-gap))}.spectrum-Menu-itemLabel--wrapping{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([hidden]){display:none}#button{inset:0;position:absolute}::slotted([slot=value]){align-self:start}:host([dir=ltr]) ::slotted([slot=value]){margin-left:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=rtl]) ::slotted([slot=value]){margin-right:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=ltr]) [icon-only]::slotted(:last-of-type){margin-right:auto}:host([dir=rtl]) [icon-only]::slotted(:last-of-type){margin-left:auto}:host([dir=ltr]) ::slotted([slot=icon]){margin-right:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=rtl]) ::slotted([slot=icon]){margin-left:var(--spectrum-listitem-texticon-icon-gap)}:host([dir=rtl]) slot[name=icon]+#label{margin-right:0}:host([dir=ltr]) slot[name=icon]+#label{margin-left:0}`;var Tt=r`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Checkmark50{height:var(--spectrum-alias-ui-icon-checkmark-size-50);width:var(
--spectrum-alias-ui-icon-checkmark-size-50
)}.spectrum-UIIcon-Checkmark75{height:var(--spectrum-alias-ui-icon-checkmark-size-75);width:var(
--spectrum-alias-ui-icon-checkmark-size-75
)}.spectrum-UIIcon-Checkmark100{height:var(--spectrum-alias-ui-icon-checkmark-size-100);width:var(
--spectrum-alias-ui-icon-checkmark-size-100
)}.spectrum-UIIcon-Checkmark200{height:var(--spectrum-alias-ui-icon-checkmark-size-200);width:var(
--spectrum-alias-ui-icon-checkmark-size-200
)}.spectrum-UIIcon-Checkmark300{height:var(--spectrum-alias-ui-icon-checkmark-size-300);width:var(
--spectrum-alias-ui-icon-checkmark-size-300
)}.spectrum-UIIcon-Checkmark400{height:var(--spectrum-alias-ui-icon-checkmark-size-400);width:var(
--spectrum-alias-ui-icon-checkmark-size-400
)}.spectrum-UIIcon-Checkmark500{height:var(--spectrum-alias-ui-icon-checkmark-size-500);width:var(
--spectrum-alias-ui-icon-checkmark-size-500
)}.spectrum-UIIcon-Checkmark600{height:var(--spectrum-alias-ui-icon-checkmark-size-600);width:var(
--spectrum-alias-ui-icon-checkmark-size-600
)}`;class $t extends Event{constructor(){super("sp-menu-item-removed",{bubbles:!0,composed:!0}),this.focused=!1}get item(){return this._item}reset(t){this._item=t}}class _t extends Event{constructor(){super("sp-menu-item-added-or-updated",{bubbles:!0,composed:!0})}set focusRoot(t){this.item.menuData.focusRoot=this.item.menuData.focusRoot||t}set selectionRoot(t){this.item.menuData.selectionRoot=this.item.menuData.selectionRoot||t}get item(){return this._item}set currentAncestorWithSelects(t){this._currentAncestorWithSelects=t}get currentAncestorWithSelects(){return this._currentAncestorWithSelects}reset(t){this._item=t,this._currentAncestorWithSelects=void 0,t.menuData={focusRoot:void 0,selectionRoot:void 0}}}const Ut=new _t,Lt=new $t;class St extends(Ct(xt)){constructor(){super(),this.active=!1,this.focused=!1,this.selected=!1,this._value="",this.noWrap=!1,this.menuData={focusRoot:void 0,selectionRoot:void 0},this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0})}static get styles(){return[Et,Tt]}get value(){return this._value||this.itemText}set value(t){t!==this._value&&(this._value=t||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"))}get itemText(){return(this.textContent||"").trim()}get focusElement(){return this}get itemChildren(){if(this._itemChildren)return this._itemChildren;const t=this.shadowRoot.querySelector('slot[name="icon"]'),e=t?t.assignedElements().map((t=>{const e=t.cloneNode(!0);return e.removeAttribute("slot"),e.classList.toggle("icon"),e})):[],o=this.shadowRoot.querySelector("slot:not([name])"),r=o?o.assignedNodes().map((t=>t.cloneNode(!0))):[];return this._itemChildren={icon:e,content:r},this._itemChildren}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(t){if(this.disabled)return t.preventDefault(),t.stopImmediatePropagation(),t.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let t=!1;return this.anchorElement&&(this.anchorElement.click(),t=!0),t}breakItemChildrenCache(){this._itemChildren=void 0,this.triggerUpdate()}render(){return _`<slot name="icon" @slotchange="${this.breakItemChildrenCache}"></slot><div id="label"><slot id="slot" @slotchange="${this.breakItemChildrenCache}"></slot></div><slot name="value"></slot>${this.selected?_`<sp-icon-checkmark100 id="selected" class="spectrum-UIIcon-Checkmark100 icon checkmark"></sp-icon-checkmark100>`:_``} ${this.href&&this.href.length>0?super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"}):_``}`}handleRemoveActive(){this.active=!1}handlePointerdown(){this.active=!0}firstUpdated(t){super.firstUpdated(t),this.setAttribute("tabindex","-1"),this.addEventListener("pointerdown",this.handlePointerdown),this.hasAttribute("id")||(this.id="sp-menu-item-"+St.instanceCount++)}updateAriaSelected(){const t=this.getAttribute("role");"option"===t?this.setAttribute("aria-selected",this.selected?"true":"false"):"menuitemcheckbox"!==t&&"menuitemradio"!==t||this.setAttribute("aria-checked",this.selected?"true":"false")}setRole(t){this.setAttribute("role",t),this.updateAriaSelected()}updated(t){super.updated(t),t.has("label")&&this.setAttribute("aria-label",this.label||""),t.has("active")&&(this.active?(this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive)):(this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1),t.has("selected")&&this.updateAriaSelected()}connectedCallback(){super.connectedCallback(),Ut.reset(this),this.dispatchEvent(Ut),this._parentElement=this.parentElement}disconnectedCallback(){var t;Lt.reset(this),null===(t=this._parentElement)||void 0===t||t.dispatchEvent(Lt),super.disconnectedCallback()}async triggerUpdate(){await new Promise((t=>requestAnimationFrame(t))),Ut.reset(this),this.dispatchEvent(Ut)}}St.instanceCount=0,c([et({type:Boolean,reflect:!0})],St.prototype,"active",void 0),c([et({type:Boolean,reflect:!0})],St.prototype,"focused",void 0),c([et({type:Boolean,reflect:!0})],St.prototype,"selected",void 0),c([et({type:String})],St.prototype,"value",null),c([et({type:Boolean,reflect:!0,attribute:"no-wrap",hasChanged:()=>!1})],St.prototype,"noWrap",void 0),c([rt(".anchor")],St.prototype,"anchorElement",void 0);var Ft=r`:host{--spectrum-menu-margin-x:var(
--spectrum-global-dimension-size-40
);--spectrum-listitem-texticon-heading-text-size:var(
--spectrum-global-dimension-font-size-50
);--spectrum-listitem-texticon-heading-text-font-weight:400;--spectrum-listitem-texticon-heading-text-transform:uppercase;--spectrum-listitem-texticon-heading-letter-spacing:0.06em;--spectrum-listitem-texticon-heading-margin:var(
--spectrum-global-dimension-size-75
) 0 0 0;--spectrum-listitem-texticon-heading-padding:0 var(--spectrum-global-dimension-size-450) 0 var(--spectrum-global-dimension-size-150);--spectrum-listitem-texticon-padding-y:var(
--spectrum-global-dimension-size-85
);--spectrum-listitem-texticon-selectable-padding-right:calc(var(--spectrum-listitem-texticon-ui-icon-width) + var(--spectrum-listitem-texticon-ui-icon-gap) + var(--spectrum-listitem-texticon-padding-right) - var(
--spectrum-popover-border-size,
var(--spectrum-alias-border-size-thin)
));--spectrum-listitem-texticon-label-line-height:1.3;--spectrum-listitem-texticon-heading-line-height:var(
--spectrum-alias-body-text-line-height,var(--spectrum-global-font-line-height-medium)
)}:host{--spectrum-listitem-texticon-padding-left:var(
--spectrum-listitem-m-texticon-padding-left
);--spectrum-listitem-textthumbnail-padding-left:var(
--spectrum-listitem-m-textthumbnail-padding-left
);--spectrum-listitem-texticon-text-size:var(
--spectrum-listitem-m-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-listitem-texticon-text-font-weight:var(
--spectrum-listitem-m-texticon-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-listitem-texticon-icon-gap:var(
--spectrum-listitem-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-listitem-texticon-divider-size:var(
--spectrum-listitem-m-texticon-divider-size,var(--spectrum-alias-border-size-thick)
);--spectrum-listitem-texticon-divider-padding:var(
--spectrum-listitem-m-texticon-divider-padding,var(--spectrum-global-dimension-static-size-40)
);--spectrum-listitem-texticon-ui-icon-margin-top:var(
--spectrum-listitem-m-texticon-ui-icon-margin-top,var(--spectrum-global-dimension-size-125)
);--spectrum-listitem-texticon-ui-icon-width:var(
--spectrum-listitem-m-texticon-ui-icon-width,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-listitem-texticon-ui-icon-gap:var(
--spectrum-listitem-m-texticon-ui-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-listitem-texticon-padding-right:var(
--spectrum-listitem-m-texticon-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-listitem-texticon-focus-indicator-size:var(
--spectrum-listitem-m-texticon-focus-indicator-size,var(--spectrum-alias-border-size-thick)
);--spectrum-listitem-texticon-height:var(
--spectrum-listitem-m-texticon-height,var(--spectrum-global-dimension-size-400)
)}:host{box-sizing:border-box;display:inline-block;list-style-type:none;margin-bottom:var(
--spectrum-popover-padding-y,var(--spectrum-global-dimension-size-50)
);margin-left:0;margin-right:0;margin-top:var(
--spectrum-popover-padding-y,var(--spectrum-global-dimension-size-50)
);overflow:auto;padding:0}:host([dir=ltr][selects]) ::slotted(sp-menu-item){padding-right:var(
--spectrum-listitem-texticon-selectable-padding-right
)}:host([dir=rtl][selects]) ::slotted(sp-menu-item){padding-left:var(
--spectrum-listitem-texticon-selectable-padding-right
)}:host([dir=ltr][selects]) ::slotted(sp-menu-item[selected]){padding-right:calc(var(--spectrum-listitem-texticon-padding-right) - var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)))}:host([dir=rtl][selects]) ::slotted(sp-menu-item[selected]){padding-left:calc(var(--spectrum-listitem-texticon-padding-right) - var(--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)))}::slotted(sp-menu){display:block}:host{--spectrum-listheading-text-color:var(
--spectrum-global-color-gray-700
)}:host{background-color:var(
--spectrum-listitem-m-texticon-background-color,var(--spectrum-alias-background-color-transparent)
)}:host{--spectrum-listitem-selectable-padding-right:calc(var(--spectrum-global-dimension-size-100) + var(--spectrum-icon-checkmark-medium-width) + var(--spectrum-listitem-icon-gap));width:var(--swc-menu-width)}:host(:focus){outline:0}:host sp-menu{display:block}`;function Ht(t,e){return!!e&&(t===e||t.contains(e))}class Pt extends st{constructor(){super(),this.label="",this.value="",this.valueSeparator=",",this.selected=[],this.selectedItems=[],this.childItemSet=new Set,this.focusedItemIndex=0,this.focusInItemIndex=0,this.selectedItemsMap=new Map,this._willUpdateItems=!1,this._notFirstUpdated=!1,this.cacheUpdated=Promise.resolve(),this.addEventListener("sp-menu-item-added-or-updated",this.onSelectableItemAddedOrUpdated),this.addEventListener("sp-menu-item-added-or-updated",this.onFocusableItemAddedOrUpdated,{capture:!0}),this.addEventListener("sp-menu-item-removed",this.removeChildItem),this.addEventListener("click",this.onClick),this.addEventListener("focusin",this.handleFocusin)}static get styles(){return[Ft]}get childItems(){return this.cachedChildItems||(this.cachedChildItems=this.updateCachedMenuItems()),this.cachedChildItems}updateCachedMenuItems(){this.cachedChildItems=[];const t=this.menuSlot?this.menuSlot.assignedElements({flatten:!0}):[];for(const e of t){const t=e instanceof St?[e]:[...e.querySelectorAll("*")];for(const e of t)this.childItemSet.has(e)&&this.cachedChildItems.push(e)}return this.cachedChildItems}get childRole(){if("listbox"===this.resolvedRole)return"option";switch(this.resolvedSelects){case"single":return"menuitemradio";case"multiple":return"menuitemcheckbox";default:return"menuitem"}}get ownRole(){return"menu"}onFocusableItemAddedOrUpdated(t){var e;t.item.menuData.focusRoot&&(this.tabIndex=-1),t.focusRoot=this,this.addChildItem(t.item),"inherit"===this.selects?(this.resolvedSelects="inherit",this.resolvedRole=(null===(e=t.currentAncestorWithSelects)||void 0===e?void 0:e.getAttribute("role"))||this.getAttribute("role")||void 0):this.selects?(this.resolvedRole=this.getAttribute("role")||void 0,this.resolvedSelects=this.selects,t.currentAncestorWithSelects=this):(this.resolvedRole=this.getAttribute("role")||void 0,this.resolvedSelects="none"===this.resolvedRole?"ignore":"none")}onSelectableItemAddedOrUpdated(t){!("single"===this.resolvedSelects||"multiple"===this.resolvedSelects)&&(this.selects||"ignore"===this.resolvedSelects)||t.item.menuData.selectionRoot||(t.item.setRole(this.childRole),t.selectionRoot=this)}addChildItem(t){this.childItemSet.add(t),this.handleItemsChanged()}async removeChildItem(t){this.childItemSet.delete(t.item),this.cachedChildItems=void 0,t.item.focused&&(this.handleItemsChanged(),await this.updateComplete,this.focus())}focus({preventScroll:t}={}){if(!this.childItems.length||this.childItems.every((t=>t.disabled)))return;if(this.childItems.some((t=>t.menuData.focusRoot!==this)))return void super.focus({preventScroll:t});this.focusMenuItemByOffset(0),super.focus({preventScroll:t});const e=this.querySelector("[selected]");e&&!t&&e.scrollIntoView({block:"nearest"})}onClick(t){if(t.defaultPrevented)return;const e=t.composedPath().find((t=>t instanceof Element&&t.getAttribute("role")===this.childRole));(null==e?void 0:e.href)&&e.href.length||(null==e?void 0:e.menuData.selectionRoot)===this&&(t.preventDefault(),this.selectOrToggleItem(e),this.prepareToCleanUp())}handleFocusin(t){var e;const o=Ht(this,t.relatedTarget);if(o||this.childItems.some((t=>t.menuData.focusRoot!==this)))return;const r=this.getRootNode().activeElement,i=(null===(e=this.childItems[this.focusedItemIndex])||void 0===e?void 0:e.menuData.selectionRoot)||this;if((r!==i||!o)&&(i.focus({preventScroll:!0}),r&&0===this.focusedItemIndex)){const t=this.childItems.findIndex((t=>t===r));t>0&&this.focusMenuItemByOffset(t)}this.startListeningToKeyboard()}startListeningToKeyboard(){this.addEventListener("keydown",this.handleKeydown),this.addEventListener("focusout",this.handleFocusout)}handleFocusout(t){if(Ht(this,t.relatedTarget))t.composedPath()[0].focused=!1;else{if(this.stopListeningToKeyboard(),t.target===this&&this.childItems.some((t=>t.menuData.focusRoot===this))){const t=this.childItems[this.focusedItemIndex];t&&(t.focused=!1)}this.removeAttribute("aria-activedescendant")}}stopListeningToKeyboard(){this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.handleFocusout)}async selectOrToggleItem(t){const e=this.resolvedSelects,o=new Map(this.selectedItemsMap),r=this.selected.slice(),i=this.selectedItems.slice(),c=this.value;if(this.childItems[this.focusedItemIndex].focused=!1,this.focusedItemIndex=this.childItems.indexOf(t),this.forwardFocusVisibleToItem(t),"multiple"===e){this.selectedItemsMap.has(t)?this.selectedItemsMap.delete(t):this.selectedItemsMap.set(t,!0);const e=[],o=[];this.childItemSet.forEach((t=>{t.menuData.selectionRoot===this&&this.selectedItemsMap.has(t)&&(e.push(t.value),o.push(t))})),this.selected=e,this.selectedItems=o,this.value=this.selected.join(this.valueSeparator)}else this.selectedItemsMap.clear(),this.selectedItemsMap.set(t,!0),this.value=t.value,this.selected=[t.value],this.selectedItems=[t];await this.updateComplete;if(!this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0})))return this.selected=r,this.selectedItems=i,this.selectedItemsMap=o,void(this.value=c);if("single"===e){for(const e of o.keys())e!==t&&(e.selected=!1);t.selected=!0}else"multiple"===e&&(t.selected=!t.selected)}handleKeydown(t){var e;const{code:o}=t;if("Tab"===o)return void this.prepareToCleanUp();if("Space"===o||"Enter"===o)return void(null===(e=this.childItems[this.focusedItemIndex])||void 0===e||e.click());if("ArrowDown"!==o&&"ArrowUp"!==o)return;const r=this.childItems[this.focusedItemIndex],i="ArrowDown"===o?1:-1,c=this.focusMenuItemByOffset(i);c!==r&&(t.preventDefault(),c.scrollIntoView({block:"nearest"}))}focusMenuItemByOffset(t){const e=t||1;this.childItems[this.focusedItemIndex].focused=!1,this.focusedItemIndex=(this.childItems.length+this.focusedItemIndex+t)%this.childItems.length;let o=this.childItems[this.focusedItemIndex],r=this.childItems.length;for(;o.disabled&&r;)r-=1,this.focusedItemIndex=(this.childItems.length+this.focusedItemIndex+e)%this.childItems.length,o=this.childItems[this.focusedItemIndex];return(null==o?void 0:o.disabled)||this.forwardFocusVisibleToItem(o),o}prepareToCleanUp(){document.addEventListener("focusout",(()=>{requestAnimationFrame((()=>{const t=this.childItems[this.focusedItemIndex];t&&(t.focused=!1,this.updateSelectedItemIndex())}))}),{once:!0})}updateSelectedItemIndex(){let t=0;const e=new Map,o=[],r=[];let i=this.childItems.length;for(;i;){i-=1;const c=this.childItems[i];c.menuData.selectionRoot===this&&(c.selected&&(t=i,e.set(c,!0),o.unshift(c.value),r.unshift(c)),i!==t&&(c.focused=!1))}r.map(((t,e)=>{e>0&&(t.focused=!1)})),this.selectedItemsMap=e,this.selected=o,this.selectedItems=r,this.value=this.selected.join(this.valueSeparator),this.focusedItemIndex=t,this.focusInItemIndex=t}handleItemsChanged(){if(this.cachedChildItems=void 0,!this._willUpdateItems){let t=()=>{};this.cacheUpdated=new Promise((e=>t=e)),this._willUpdateItems=!0,window.requestAnimationFrame((()=>{void 0===this.cachedChildItems&&(this.updateSelectedItemIndex(),this.updateItemFocus()),this._willUpdateItems=!1,t()}))}}updateItemFocus(){if(0==this.childItems.length)return;const t=this.childItems[this.focusInItemIndex];this.getRootNode().activeElement===t.menuData.focusRoot&&this.forwardFocusVisibleToItem(t)}forwardFocusVisibleToItem(t){t.menuData.focusRoot===this&&(t.focused=this.hasVisibleFocusInTree(),this.setAttribute("aria-activedescendant",t.id),t.menuData.selectionRoot&&t.menuData.selectionRoot!==this&&t.menuData.selectionRoot.focus())}render(){return _`<slot></slot>`}firstUpdated(t){if(super.firstUpdated(t),!this.hasAttribute("tabindex")){const t=this.getAttribute("role");"group"===t?this.tabIndex=-1:"none"!==t&&(this.tabIndex=0)}const e=[new Promise((t=>requestAnimationFrame((()=>t(!0)))))];[...this.children].forEach((t=>{"sp-menu-item"===t.localName&&e.push(t.updateComplete)})),this.childItemsUpdated=Promise.all(e)}updated(t){super.updated(t),t.has("selects")&&this._notFirstUpdated&&this.selectsChanged(),t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label")),this._notFirstUpdated=!0}selectsChanged(){const t=[new Promise((t=>requestAnimationFrame((()=>t(!0)))))];this.childItemSet.forEach((e=>{t.push(e.triggerUpdate())})),this.childItemsUpdated=Promise.all(t)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role",this.ownRole),this.updateComplete.then((()=>this.updateItemFocus()))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.childItemsUpdated,await this.cacheUpdated,t}}c([et({type:String,reflect:!0})],Pt.prototype,"label",void 0),c([et({type:String,reflect:!0})],Pt.prototype,"selects",void 0),c([et({type:String})],Pt.prototype,"value",void 0),c([et({type:String,attribute:"value-separator"})],Pt.prototype,"valueSeparator",void 0),c([et({attribute:!1})],Pt.prototype,"selected",void 0),c([et({attribute:!1})],Pt.prototype,"selectedItems",void 0),c([rt("slot:not([name])")],Pt.prototype,"menuSlot",void 0),customElements.define("sp-menu",Pt);var Rt=r`:host{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-dialog-confirm-background-entry-animation-delay:0ms;--spectrum-dialog-confirm-background-exit-animation-ease:cubic-bezier(0.5,0,1,1);--spectrum-dialog-confirm-background-entry-animation-ease:cubic-bezier(0,0,0.4,1)}:host{bottom:0;left:0;overflow:hidden;position:fixed;right:0;top:0;transition:opacity var(
--spectrum-dialog-confirm-background-exit-animation-duration,var(--spectrum-global-animation-duration-300)
) var(
--spectrum-dialog-confirm-background-exit-animation-ease,var(--spectrum-global-animation-linear)
) var(
--spectrum-dialog-confirm-background-exit-animation-delay,var(--spectrum-global-animation-duration-200)
),visibility 0s linear calc(var(--spectrum-dialog-confirm-background-exit-animation-delay,var(--spectrum-global-animation-duration-200)) + var(--spectrum-dialog-confirm-background-exit-animation-duration,var(--spectrum-global-animation-duration-300)));z-index:1}:host([open]){transition:opacity var(
--spectrum-dialog-confirm-background-entry-animation-duration,var(--spectrum-global-animation-duration-600)
) var(
--spectrum-dialog-confirm-background-entry-animation-ease,var(--spectrum-global-animation-linear)
) var(--spectrum-dialog-confirm-background-entry-animation-delay,0ms)}:host{background:var(
--spectrum-dialog-confirm-overlay-background-color,var(--spectrum-alias-background-color-modal-overlay)
)}`;class Mt extends st{constructor(){super(...arguments),this.open=!1}static get styles(){return[Rt]}render(){return _``}}c([et({type:Boolean,reflect:!0})],Mt.prototype,"open",void 0),customElements.define("sp-underlay",Mt);const Wt=t=>t.querySelector('button:not([tabindex="-1"]), [href]:not([tabindex="-1"]), input:not([tabindex="-1"]), select:not([tabindex="-1"]), textarea:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]), [focusable]:not([tabindex="-1"])');class Ot{constructor(t,e){this.key=Symbol("match-media-key"),this.matches=!1,this.host=t,this.media=window.matchMedia(e),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),t.addController(this)}hostConnected(){this.media.addEventListener("change",this.onChange)}hostDisconnected(){this.media.removeEventListener("change",this.onChange)}onChange(t){this.matches!==t.matches&&(this.matches=t.matches,this.host.requestUpdate(this.key,!this.matches))}}var Dt=r`.modal{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]) .modal{opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-dialog-confirm-exit-animation-delay:0ms;--spectrum-dialog-fullscreen-margin:32px;--spectrum-dialog-max-height:90vh}.modal{border-radius:var(
--spectrum-dialog-confirm-border-radius,var(--spectrum-alias-component-border-radius)
);max-height:var(--spectrum-dialog-max-height);outline:0;overflow:hidden;pointer-events:auto;transform:translateY(var(
--spectrum-dialog-confirm-entry-animation-distance,var(--spectrum-global-dimension-size-250)
));transition:opacity var(
--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)
) cubic-bezier(.5,0,1,1) var(--spectrum-dialog-confirm-exit-animation-delay,0ms),visibility 0s linear calc(var(--spectrum-dialog-confirm-exit-animation-delay,0ms) + var(--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100))),transform 0s linear calc(var(--spectrum-dialog-confirm-exit-animation-delay,0ms) + var(--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)));z-index:2}:host([open]) .modal{transform:translateY(0);transition:transform var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
),opacity var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
)}@media only screen and (max-device-height:350px),only screen and (max-device-width:400px){:host([responsive]) .modal{border-radius:0;height:100%;max-height:100%;max-width:100%;width:100%}}.fullscreen{bottom:var(--spectrum-dialog-fullscreen-margin);left:var(
--spectrum-dialog-fullscreen-margin
);right:var(--spectrum-dialog-fullscreen-margin);top:var(--spectrum-dialog-fullscreen-margin)}.fullscreen,.fullscreenTakeover{max-height:none;max-width:none;position:fixed}.fullscreenTakeover{border:none;border-radius:0;bottom:0;box-sizing:border-box;left:0;right:0;top:0}.fullscreenTakeover,:host([open]) .fullscreenTakeover{transform:none}.modal{background:var(
--spectrum-dialog-confirm-background-color,var(--spectrum-alias-background-color-default)
)}`;var Nt=r`:host([dir=ltr]){left:0}:host([dir=rtl]){right:0}:host{bottom:0;display:flex;justify-content:center;position:fixed;width:100%;z-index:2}@media (max-width:375px){.spectrum-Tray{border-radius:var(--spectrum-tray-border-radius,0)}}.tray{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]) .tray{opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-dialog-confirm-exit-animation-delay:0ms;--spectrum-tray-margin-top:64px}:host([dir=ltr]) .spectrum-Tray-wrapper{left:0}:host([dir=rtl]) .spectrum-Tray-wrapper{right:0}.spectrum-Tray-wrapper{bottom:0;display:flex;justify-content:center;position:fixed;width:100%;z-index:2}.tray{border-radius:var(
--spectrum-tray-full-width-border-radius,var(--spectrum-alias-border-radius-regular)
) var(
--spectrum-tray-full-width-border-radius,var(--spectrum-alias-border-radius-regular)
) var(--spectrum-tray-border-radius,0) var(--spectrum-tray-border-radius,0);max-height:calc(100vh - var(--spectrum-tray-margin-top));max-width:var(--spectrum-tray-max-width,375px);min-height:var(
--spectrum-tray-min-height,var(--spectrum-global-dimension-static-size-800)
);outline:0;overflow:auto;padding:var(--spectrum-tray-padding-y,0) var(
--spectrum-tray-padding-x,var(--spectrum-global-dimension-static-size-100)
);transform:translateY(100%);transition:opacity var(
--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)
) cubic-bezier(.5,0,1,1) var(--spectrum-dialog-confirm-exit-animation-delay,0ms),visibility 0s linear calc(var(--spectrum-dialog-confirm-exit-animation-delay,0ms) + var(--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100))),transform var(
--spectrum-dialog-confirm-exit-animation-duration,var(--spectrum-global-animation-duration-100)
) cubic-bezier(.5,0,1,1) var(--spectrum-dialog-confirm-exit-animation-delay,0ms);width:var(--spectrum-tray-width,100%)}:host([open]) .tray{transform:translateY(0);transition:transform var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
),opacity var(
--spectrum-dialog-confirm-entry-animation-duration,var(--spectrum-global-animation-duration-500)
) cubic-bezier(0,0,.4,1) var(
--spectrum-dialog-confirm-entry-animation-delay,var(--spectrum-global-animation-duration-200)
)}@media (max-width:375px){.tray{border-radius:var(--spectrum-tray-border-radius,0)}}:host{align-items:flex-end;max-height:var(--swc-visual-viewport-height);position:fixed!important}sp-underlay{touch-action:none}.tray{display:inline-flex;overscroll-behavior:contain;padding:var(--spectrum-tray-padding-y,0) var(--spectrum-tray-padding-x,0)}::slotted(.visually-hidden){clip:rect(0,0,0,0);border:0;-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}`;class jt extends st{constructor(){super(...arguments),this.open=!1,this.prefersMotion=new Ot(this,"(prefers-reduced-motion: no-preference)"),this.transitionPromise=Promise.resolve()}static get styles(){return[Dt,Nt]}focus(){const t=Wt(this);t?t.focus():1===this.children.length?this.tray.focus():super.focus()}overlayWillCloseCallback(){return!!this.open&&(this.close(),!0)}close(){this.open=!1,this.prefersMotion.matches||this.dispatchClosed()}dispatchClosed(){this.dispatchEvent(new Event("close",{bubbles:!0}))}handleUnderlayTransitionend(){this.open||(this.dispatchClosed(),this.resolveTransitionPromise())}handleTrayTransitionend(){this.open&&this.resolveTransitionPromise()}update(t){t.has("open")&&void 0!==t.get("open")&&this.prefersMotion.matches&&(this.transitionPromise=new Promise((t=>this.resolveTransitionPromise=t))),super.update(t)}render(){return _`<sp-underlay ?open="${this.open}" @click="${this.close}" @transitionend="${this.handleUnderlayTransitionend}"></sp-underlay><div class="tray modal" tabindex="-1" @transitionend="${this.handleTrayTransitionend}"><slot></slot></div>`}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.transitionPromise,t}}c([et({type:Boolean,reflect:!0})],jt.prototype,"open",void 0),c([rt(".tray")],jt.prototype,"tray",void 0),customElements.define("sp-tray",jt);var Gt=r`:host{--spectrum-overlay-animation-distance:var(
--spectrum-picker-m-texticon-popover-offset-y,var(--spectrum-global-dimension-size-75)
);opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host([placement*=bottom][open]){transform:translateY(var(--spectrum-overlay-animation-distance))}:host([placement*=top][open]){transform:translateY(calc(var(--spectrum-overlay-animation-distance)*-1))}:host([placement*=right][open]){transform:translateX(var(--spectrum-overlay-animation-distance))}:host([placement*=left][open]){transform:translateX(calc(var(--spectrum-overlay-animation-distance)*-1))}:host{--spectrum-popover-target-offset:13px;--spectrum-popover-dialog-padding:30px 29px;--spectrum-popover-dialog-min-width:270px;--spectrum-popover-min-width:var(--spectrum-global-dimension-size-400);--spectrum-popover-min-height:var(--spectrum-global-dimension-size-400)}:host{border-radius:var(
--spectrum-popover-border-radius,var(--spectrum-alias-border-radius-regular)
);border-style:solid;border-width:var(
--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)
);box-sizing:border-box;display:inline-flex;flex-direction:column;min-height:var(
--spectrum-popover-min-height,var(--spectrum-global-dimension-size-400)
);min-width:var(
--spectrum-popover-min-width,var(--spectrum-global-dimension-size-400)
);outline:0;position:absolute}#tip{position:absolute;-webkit-transform:translate(0)}#tip .triangle{stroke-linecap:square;stroke-linejoin:miter;stroke-width:var(
--spectrum-popover-border-size,var(--spectrum-alias-border-size-thin)
)}:host([dialog]){min-width:var(
--spectrum-popover-dialog-min-width
);padding:var(--spectrum-popover-dialog-padding)}:host([placement*=left][tip]){margin-right:var(
--spectrum-popover-target-offset
)}:host([placement*=left]) #tip{left:100%}:host([placement*=right][tip]){margin-left:var(
--spectrum-popover-target-offset
)}:host([placement*=right]) #tip{right:100%;transform:scaleX(-1)}:host([placement*=left]) #tip,:host([placement*=right]) #tip{margin-top:calc(var(--spectrum-global-dimension-size-150)*-1);top:50%}:host([placement*=bottom][tip]){margin-top:var(
--spectrum-popover-target-offset
)}:host([placement*=bottom]) #tip{bottom:100%;transform:scaleY(-1)}:host([placement*=top][tip]){margin-bottom:var(
--spectrum-popover-target-offset
)}:host([placement*=top]) #tip{top:100%}:host([placement*=bottom]) #tip,:host([placement*=top]) #tip{left:50%;margin-left:calc(var(--spectrum-global-dimension-size-150)*-1)}:host{background-color:var(
--spectrum-popover-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-popover-border-color,var(--spectrum-alias-border-color-dark)
);-webkit-clip-path:inset(-30px -30px);clip-path:inset(-30px -30px);filter:drop-shadow(0 1px 4px var(
--spectrum-popover-shadow-color,var(--spectrum-alias-dropshadow-color)
));-webkit-filter:drop-shadow(0 1px 4px var(
--spectrum-popover-shadow-color,var(--spectrum-alias-dropshadow-color)
));will-change:filter}#tip .triangle{fill:var(
--spectrum-popover-background-color,var(--spectrum-global-color-gray-50)
);stroke:var(
--spectrum-popover-border-color,var(--spectrum-alias-border-color-dark)
)}:host{--sp-popover-tip-size:24px}:host([placement*=bottom]),:host([placement*=top]){max-height:calc(100% - var(--spectrum-overlay-animation-distance))}:host([placement*=left]),:host([placement*=right]){max-width:calc(100% - var(--spectrum-overlay-animation-distance))}::slotted(*){overscroll-behavior:contain}.tip{height:calc(var(--sp-popover-tip-size)/2);left:0;position:absolute;width:var(--sp-popover-tip-size)}:host([placement*=right]) #tip{transform:none}:host([placement*=bottom]) #tip{transform:none}:host([placement*=top]) .tip{top:100%}:host([placement*=bottom]) .tip{bottom:100%;transform:scaleY(-1)}:host([placement*=left]) .tip{transform:rotate(-90deg) translateY(-200%);transform-origin:100% 0}:host([placement*=right]) .tip{transform:rotate(90deg);transform-origin:0 0}::slotted(.visually-hidden){clip:rect(0,0,0,0);border:0;-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}`;class Kt extends st{constructor(){super(...arguments),this.dialog=!1,this.open=!1,this.placement="none",this.tip=!1}static get styles(){return[Gt]}renderTip(){return _`<div id="tip"><svg xmlns="http://www.w3.org/svg/2000" class="tip" viewBox="0 0 24 12"><path class="triangle" d="M 0.7071067811865476 0 L 11.414213562373096 10.707106781186548 L 22.121320343559645 0"></path></svg></div>`}connectedCallback(){super.connectedCallback(),this.addEventListener("sp-overlay-query",this.onOverlayQuery)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("sp-overlay-query",this.onOverlayQuery)}onOverlayQuery(t){if(!t.target)return;if(t.target!==this)return;const e=this.shadowRoot.querySelector("#tip");e&&(t.detail.overlayContentTipElement=e)}render(){return _`<slot></slot>${this.tip?this.renderTip():S}`}}c([et({type:Boolean,reflect:!0})],Kt.prototype,"dialog",void 0),c([et({type:Boolean,reflect:!0})],Kt.prototype,"open",void 0),c([et({reflect:!0})],Kt.prototype,"placement",void 0),c([et({type:Boolean,reflect:!0})],Kt.prototype,"tip",void 0),customElements.define("sp-popover",Kt);const Vt=Symbol("slotElementObserver"),Yt=Symbol("startObserving"),Xt=Symbol("slotContentIsPresent");function Qt(t,e){var o;const r=Array.isArray(e)?e:[e];class i extends t{constructor(){super(...arguments),this[o]=new Map,this.managePresenceObservedSlot=()=>{r.forEach((t=>{this[Xt].set(t,!!this.querySelector(t))})),this.requestUpdate()}}get slotContentIsPresent(){if(1===r.length)return this[Xt].get(r[0])||!1;throw new Error("Multiple selectors provided to `ObserveSlotPresence` use `getSlotContentPresence(selector: string)` instead.")}getSlotContentPresence(t){if(this[Xt].has(t))return this[Xt].get(t)||!1;throw new Error("The provided selector `` is not being observed.")}[(o=Xt,Yt)](){this[Vt]||(this[Vt]=new MutationObserver(this.managePresenceObservedSlot)),this[Vt].observe(this,{childList:!0,subtree:!0}),this.managePresenceObservedSlot()}connectedCallback(){super.connectedCallback(),this[Yt]()}disconnectedCallback(){this[Vt].disconnect(),super.disconnectedCallback()}}return i}const Zt=Symbol("slotElementObserver"),Jt=Symbol("assignedNodes"),te=Symbol("startObserving");function ee(t,e){var o;class r extends t{constructor(){super(...arguments),this.slotHasContent=!1}manageTextObservedSlot(){if(!this[Jt])return;const t=[...this[Jt]].filter((t=>!!t.tagName||!!t.textContent&&t.textContent.trim()));this.slotHasContent=t.length>0}firstUpdated(t){super.firstUpdated(t),this.manageTextObservedSlot()}[(o=Jt,te)](){if(!this[Zt]){const t=t=>{for(const e of t)"characterData"===e.type&&this.manageTextObservedSlot()};this[Zt]=new MutationObserver(t)}this[Zt].observe(this,{characterData:!0,subtree:!0})}connectedCallback(){super.connectedCallback(),this[te]()}disconnectedCallback(){this[Zt]&&this[Zt].disconnect(),super.disconnectedCallback()}}return c([et({type:Boolean,attribute:!1})],r.prototype,"slotHasContent",void 0),c([it(e,!0)],r.prototype,o,void 0),r}const oe=async(t,e,o,r)=>{const{Overlay:i}=await import("./ff5d7e74.js");return i.open(t,e,o,r)},re={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};class ie extends(at(xt)){constructor(){super(),this.isMobile=new Ot(this,"(max-width: 700px) and (hover: none) and (pointer: coarse), (max-height: 700px) and (hover: none) and (pointer: coarse)"),this.disabled=!1,this.focused=!1,this.invalid=!1,this.open=!1,this.readonly=!1,this.selects="single",this.menuItems=[],this.placement="bottom-start",this.quiet=!1,this.value="",this.listRole="listbox",this.itemRole="option",this.onKeydown=t=>{this.focused=!0,"ArrowDown"!==t.code&&"ArrowUp"!==t.code||(t.preventDefault(),this.toggle(!0))},this.overlayCloseCallback=()=>{this.open=!1},this._willUpdateItems=!1,this.itemsUpdated=Promise.resolve(),this.menuStatePromise=Promise.resolve(),this.onKeydown=this.onKeydown.bind(this)}get target(){return this.button}get focusElement(){return this.open?this.optionsMenu:this.button}forceFocusVisible(){this.focused=!0}onButtonBlur(){this.focused=!1,this.target.removeEventListener("keydown",this.onKeydown)}onButtonClick(){this.toggle()}focus(t){super.focus(t),!this.disabled&&this.focusElement&&(this.focused=this.hasVisibleFocusInTree())}onHelperFocus(){this.focused=!0,this.button.focus()}onButtonFocus(){this.target.addEventListener("keydown",this.onKeydown)}handleChange(t){t.stopPropagation();const e=t.target,[o]=e.selectedItems;this.setValueFromItem(o,t)}async setValueFromItem(t,e){const o=this.selectedItem,r=this.value;this.selectedItem=t,this.value=t.value,this.open=!1,await this.updateComplete;if(!this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0})))return e&&e.preventDefault(),this.selectedItem.selected=!1,o&&(o.selected=!0),this.selectedItem=o,this.value=r,void(this.open=!0);o&&(o.selected=!1),t.selected=!!this.selects}toggle(t){this.readonly||(this.open=void 0!==t?t:!this.open)}close(){this.readonly||(this.open=!1)}onOverlayClosed(){this.close(),this.restoreChildren&&(this.restoreChildren(),this.restoreChildren=void 0),this.menuStateResolver()}async generatePopover(t){this.popoverFragment||(this.popoverFragment=document.createDocumentFragment()),H(this.renderPopover,this.popoverFragment,{host:this}),this.popover=this.popoverFragment.children[0],this.optionsMenu=this.popover.children[1],t&&console.warn(`Deprecation Notice: You no longer need to provide an sp-menu child to ${this.tagName.toLowerCase()}. Any styling or attributes on the sp-menu will be ignored.`)}async openMenu(){let t=[];const e=this.querySelector("sp-menu");await this.generatePopover(e),t=e?Array.from(e.children):Array.from(this.children).filter((t=>!t.hasAttribute("slot"))),0!==t.length?(this.restoreChildren=ft(t,this.optionsMenu,(()=>t=>{void 0!==t.focused&&(t.focused=!1)})),this.sizePopover(this.popover),this.addEventListener("sp-opened",(async()=>{this.updateMenuItems(),await Promise.all([this.itemsUpdated,this.optionsMenu.updateComplete]),this.menuStateResolver()}),{once:!0}),this.closeOverlay=ce.openOverlay(this,"modal",this.popover,{placement:this.isMobile.matches?"none":this.placement,receivesFocus:"auto"})):this.menuStateResolver()}sizePopover(t){this.isMobile.matches?t.style.setProperty("--swc-menu-width","100%"):this.quiet||t.style.setProperty("min-width",`${this.offsetWidth}px`)}async closeMenu(){if(this.closeOverlay){const t=this.closeOverlay;delete this.closeOverlay,(await t)()}}get selectedItemContent(){return this.selectedItem?this.selectedItem.itemChildren:{icon:[],content:[]}}renderLabelContent(t){return this.value&&this.selectedItem?t:_`<slot name="label">${this.label}</slot>`}get buttonContent(){const t={"visually-hidden":"only"===this.icons&&!!this.value,placeholder:!this.value};return[_`<span id="icon" ?hidden="${"none"===this.icons}">${this.selectedItemContent.icon} </span><span id="label" class="${mt(t)}">${this.renderLabelContent(this.selectedItemContent.content)} </span>${this.invalid?_`<sp-icon-alert class="validation-icon"></sp-icon-alert>`:S}<sp-icon-chevron100 class="picker ${re[this.size]}"></sp-icon-chevron100>`]}render(){return _`<span id="focus-helper" tabindex="${this.focused?"-1":"0"}" @focus="${this.onHelperFocus}"></span> <button aria-haspopup="true" aria-expanded="${this.open?"true":"false"}" aria-labelledby="button icon label" id="button" class="button" @blur="${this.onButtonBlur}" @click="${this.onButtonClick}" @focus="${this.onButtonFocus}" ?disabled="${this.disabled}" tabindex="-1">${this.buttonContent}</button>`}update(t){this.selects&&(this.selects="single"),super.update(t)}get dismissHelper(){return _`<div class="visually-hidden"><button tabindex="-1" arial-label="Dismiss" @click="${this.close}"></button></div>`}get renderPopover(){const t=_`${this.dismissHelper}<sp-menu id="menu" role="${this.listRole}" @change="${this.handleChange}" .selects="${this.selects}"></sp-menu>${this.dismissHelper}`;return this.isMobile.matches?_`<sp-tray id="popover" role="dialog" @sp-menu-item-added-or-updated="${this.updateMenuItems}" @sp-overlay-closed="${this.onOverlayClosed}" .overlayCloseCallback="${this.overlayCloseCallback}">${t}</sp-tray>`:_`<sp-popover id="popover" role="dialog" @sp-menu-item-added-or-updated="${this.updateMenuItems}" @sp-overlay-closed="${this.onOverlayClosed}" .overlayCloseCallback="${this.overlayCloseCallback}">${t}</sp-popover>`}updateMenuItems(t){if(this.open&&"sp-menu-item-removed"===(null==t?void 0:t.type))return;if(this._willUpdateItems)return;this._willUpdateItems=!0,(null==t?void 0:t.item)===this.selectedItem&&this.requestUpdate();let e=()=>{};this.itemsUpdated=new Promise((t=>e=t)),window.requestAnimationFrame((async()=>{this.open?(await this.optionsMenu.updateComplete,this.menuItems=this.optionsMenu.childItems):this.menuItems=[...this.querySelectorAll("sp-menu-item")],this.manageSelection(),e(),this._willUpdateItems=!1}))}updated(t){super.updated(t),t.has("value")&&!t.has("selectedItem")&&this.updateMenuItems(),t.has("disabled")&&this.disabled&&(this.open=!1),t.has("open")&&(this.open||void 0!==t.get("open"))&&(this.menuStatePromise=new Promise((t=>this.menuStateResolver=t)),this.open?this.openMenu():this.closeMenu())}manageSelection(){let t;this.menuItems.forEach((e=>{this.value!==e.value||e.disabled?e.selected=!1:t=e})),t?(t.selected=!!this.selects,this.selectedItem=t):(this.value="",this.selectedItem=void 0),this.open&&this.optionsMenu.updateComplete.then((()=>{this.optionsMenu.updateSelectedItemIndex()}))}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.menuStatePromise,await this.itemsUpdated,t}connectedCallback(){this.updateMenuItems(),this.addEventListener("sp-menu-item-added-or-updated",this.updateMenuItems),this.addEventListener("sp-menu-item-removed",this.updateMenuItems),super.connectedCallback()}disconnectedCallback(){this.open=!1,super.disconnectedCallback()}}ie.openOverlay=async(t,e,o,r)=>await oe(t,e,o,r),c([rt("#button")],ie.prototype,"button",void 0),c([et({type:Boolean,reflect:!0})],ie.prototype,"disabled",void 0),c([et({type:Boolean,reflect:!0})],ie.prototype,"focused",void 0),c([et({type:String,reflect:!0})],ie.prototype,"icons",void 0),c([et({type:Boolean,reflect:!0})],ie.prototype,"invalid",void 0),c([et()],ie.prototype,"label",void 0),c([et({type:Boolean,reflect:!0})],ie.prototype,"open",void 0),c([et({type:Boolean,reflect:!0})],ie.prototype,"readonly",void 0),c([et()],ie.prototype,"placement",void 0),c([et({type:Boolean,reflect:!0})],ie.prototype,"quiet",void 0),c([et({type:String})],ie.prototype,"value",void 0),c([et({attribute:!1})],ie.prototype,"selectedItem",void 0);class ce extends ie{constructor(){super(...arguments),this.onKeydown=t=>{const{code:e}=t;if(this.focused=!0,!e.startsWith("Arrow")||this.readonly)return;if(t.preventDefault(),"ArrowUp"===e||"ArrowDown"===e)return void this.toggle(!0);const o=this.selectedItem?this.menuItems.indexOf(this.selectedItem):-1,r=this.value&&"ArrowRight"!==e?-1:1;let i=o+r;for(;this.menuItems[i]&&this.menuItems[i].disabled;)i+=r;this.menuItems[i]&&!this.menuItems[i].disabled&&(this.value&&i===o||this.setValueFromItem(this.menuItems[i]))}}static get styles(){return[pt,ht]}}customElements.define("sp-picker",ce);class se extends(Ct(ee(Qt(xt,'[slot="icon"]')))){constructor(){super(),this.active=!1,this.type="button",this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0})}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return this.slotHasContent}get focusElement(){return this}get buttonContent(){const t=[_`<div id="label" ?hidden="${!this.hasLabel}"><slot id="slot" @slotchange="${this.manageTextObservedSlot}"></slot></div>`];return this.hasIcon&&t.unshift(_`<slot name="icon" ?icon-only="${!this.hasLabel}"></slot>`),t}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(t){if(this.disabled)return t.preventDefault(),t.stopImmediatePropagation(),t.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let t=!1;if(this.anchorElement)this.anchorElement.click(),t=!0;else if("button"!==this.type){const e=document.createElement("button");e.type=this.type,this.insertAdjacentElement("afterend",e),e.click(),e.remove(),t=!0}return t}renderAnchor(){return _`${this.buttonContent} ${super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"})}`}renderButton(){return _`${this.buttonContent}`}render(){return this.href&&this.href.length>0?this.renderAnchor():this.renderButton()}handleKeydown(t){const{code:e}=t;switch(e){case"Space":t.preventDefault(),void 0===this.href&&(this.addEventListener("keyup",this.handleKeyup),this.active=!0)}}handleKeypress(t){const{code:e}=t;switch(e){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(t){const{code:e}=t;switch(e){case"Space":this.removeEventListener("keyup",this.handleKeyup),this.active=!1,this.click()}}handleRemoveActive(){this.active=!1}handlePointerdown(){this.active=!0}manageAnchor(){this.href&&this.href.length>0?("button"===this.getAttribute("role")&&this.setAttribute("role","link"),this.removeEventListener("click",this.shouldProxyClick)):(this.hasAttribute("role")&&"link"!==this.getAttribute("role")||this.setAttribute("role","button"),this.addEventListener("click",this.shouldProxyClick))}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAnchor(),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.addEventListener("pointerdown",this.handlePointerdown)}updated(t){super.updated(t),t.has("href")&&this.manageAnchor(),t.has("label")&&this.setAttribute("aria-label",this.label||""),t.has("active")&&(this.active?(this.addEventListener("focusout",this.handleRemoveActive),this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive)):(this.removeEventListener("focusout",this.handleRemoveActive),this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1)}}c([et({type:Boolean,reflect:!0})],se.prototype,"active",void 0),c([et({type:String})],se.prototype,"type",void 0),c([rt(".anchor")],se.prototype,"anchorElement",void 0);var ae=r`:host{display:inline-flex;vertical-align:top}:host([dir]){-webkit-appearance:none}:host([disabled]){cursor:auto;pointer-events:none}#button{inset:0;position:absolute}:host:after{pointer-events:none}slot[name=icon]::slotted(img),slot[name=icon]::slotted(svg){fill:currentColor;stroke:currentColor;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}`;class ne extends se{static get styles(){return[ae]}}var le=r`:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);margin:0;overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:0}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host(:disabled){cursor:default}::slotted([slot=icon]){flex-shrink:0;max-height:100%}:host:after{border-radius:calc(var(--spectrum-button-primary-texticon-border-radius) + var(--spectrum-alias-focus-ring-gap,var(--spectrum-global-dimension-static-size-25)));bottom:0;content:"";display:block;left:0;margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-1);position:absolute;right:0;top:0;transition:opacity var(--spectrum-global-animation-duration-100,.13s) ease-out,margin var(--spectrum-global-animation-duration-100,.13s) ease-out}:host(.focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-2)}:host(:focus-visible):after{margin:calc(var(
--spectrum-alias-focus-ring-gap,
var(--spectrum-global-dimension-static-size-25)
)*-2)}#label{align-self:center;justify-self:center;text-align:center}#label:empty{display:none}:host([size=s]){--spectrum-button-primary-textonly-text-padding-bottom:var(
--spectrum-button-s-primary-textonly-text-padding-bottom
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-s-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-s-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-s-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-s-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-s-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-s-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-s-primary-texticon-border-radius,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-s-primary-texticon-padding-left,var(--spectrum-global-dimension-size-125)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-s-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-s-primary-textonly-min-width,var(--spectrum-global-dimension-size-675)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-s-primary-textonly-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-s-primary-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-s-primary-textonly-height,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-text-padding-top:calc(var(
--spectrum-button-s-primary-textonly-text-padding-top,
var(--spectrum-global-dimension-static-size-50)
) - 1px)}:host([size=m]){--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-m-primary-texticon-padding-left
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-m-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-m-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-m-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-m-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-m-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-m-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-m-primary-texticon-border-radius,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-textonly-text-padding-top:var(
--spectrum-button-m-primary-textonly-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-m-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-m-primary-textonly-min-width,var(--spectrum-global-dimension-size-900)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-m-primary-textonly-padding-right,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-m-primary-textonly-padding-left,var(--spectrum-global-dimension-size-200)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-m-primary-textonly-height,var(--spectrum-global-dimension-size-400)
);--spectrum-button-primary-textonly-text-padding-bottom:calc(var(
--spectrum-button-m-primary-textonly-text-padding-bottom,
var(--spectrum-global-dimension-size-115)
) - 1px)}:host([size=l]){--spectrum-button-primary-textonly-text-padding-top:var(
--spectrum-button-l-primary-textonly-text-padding-top
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-l-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-l-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-l-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-l-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-l-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-l-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-l-primary-texticon-border-radius,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-l-primary-texticon-padding-left,var(--spectrum-global-dimension-size-225)
);--spectrum-button-primary-textonly-text-padding-bottom:var(
--spectrum-button-l-primary-textonly-text-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-l-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-l-primary-textonly-min-width,var(--spectrum-global-dimension-size-1125)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-l-primary-textonly-padding-right,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-l-primary-textonly-padding-left,var(--spectrum-global-dimension-size-250)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-l-primary-textonly-height,var(--spectrum-global-dimension-size-500)
)}:host([size=xl]){--spectrum-button-primary-texticon-padding-left:var(
--spectrum-button-xl-primary-texticon-padding-left
);--spectrum-button-primary-texticon-text-size:var(
--spectrum-button-xl-primary-texticon-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-button-primary-texticon-text-font-weight:var(
--spectrum-button-xl-primary-texticon-text-font-weight,var(--spectrum-global-font-weight-bold)
);--spectrum-button-primary-texticon-text-line-height:var(
--spectrum-button-xl-primary-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-button-primary-texticon-icon-gap:var(
--spectrum-button-xl-primary-texticon-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-button-primary-texticon-focus-ring-size:var(
--spectrum-button-xl-primary-texticon-focus-ring-size,var(--spectrum-alias-focus-ring-size)
);--spectrum-button-primary-texticon-border-size:var(
--spectrum-button-xl-primary-texticon-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-texticon-border-radius:var(
--spectrum-button-xl-primary-texticon-border-radius,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-text-padding-top:var(
--spectrum-button-xl-primary-textonly-text-padding-top,var(--spectrum-global-dimension-size-150)
);--spectrum-button-primary-textonly-border-size:var(
--spectrum-button-xl-primary-textonly-border-size,var(--spectrum-alias-border-size-thick)
);--spectrum-button-primary-textonly-min-width:var(
--spectrum-button-xl-primary-textonly-min-width,var(--spectrum-global-dimension-size-1250)
);--spectrum-button-primary-textonly-padding-right:var(
--spectrum-button-xl-primary-textonly-padding-right,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-padding-left:var(
--spectrum-button-xl-primary-textonly-padding-left,var(--spectrum-global-dimension-size-300)
);--spectrum-button-primary-textonly-height:var(
--spectrum-button-xl-primary-textonly-height,var(--spectrum-global-dimension-size-600)
);--spectrum-button-primary-textonly-text-padding-bottom:calc(var(
--spectrum-button-xl-primary-textonly-text-padding-bottom,
var(--spectrum-global-dimension-size-175)
) - 1px)}:host{--spectrum-button-primary-padding-left-adjusted:calc(var(--spectrum-button-primary-texticon-padding-left) - var(--spectrum-button-primary-texticon-border-size));--spectrum-button-primary-textonly-padding-left-adjusted:calc(var(--spectrum-button-primary-textonly-padding-left) - var(--spectrum-button-primary-texticon-border-size));--spectrum-button-primary-textonly-padding-right-adjusted:calc(var(--spectrum-button-primary-textonly-padding-right) - var(--spectrum-button-primary-texticon-border-size))}:host([dir=ltr]){padding-left:var(
--spectrum-button-primary-textonly-padding-left-adjusted
);padding-right:var(
--spectrum-button-primary-textonly-padding-right-adjusted
)}:host([dir=rtl]){padding-left:var(
--spectrum-button-primary-textonly-padding-right-adjusted
);padding-right:var(
--spectrum-button-primary-textonly-padding-left-adjusted
)}:host{border-radius:var(--spectrum-button-primary-texticon-border-radius);border-style:solid;border-width:var(
--spectrum-button-primary-texticon-border-size
);font-size:var(--spectrum-button-primary-texticon-text-size);font-weight:var(--spectrum-button-primary-texticon-text-font-weight);height:auto;min-height:var(--spectrum-button-primary-textonly-height);min-width:var(--spectrum-button-primary-textonly-min-width);padding-bottom:0;padding-top:0}:host(:hover),:host([active]){box-shadow:none}:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc((var(--spectrum-button-primary-textonly-padding-left-adjusted) - var(--spectrum-button-primary-padding-left-adjusted))*-1)}:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc((var(--spectrum-button-primary-textonly-padding-left-adjusted) - var(--spectrum-button-primary-padding-left-adjusted))*-1)}:host([dir=ltr]) slot[name=icon]+#label{padding-left:var(
--spectrum-button-primary-texticon-icon-gap
)}:host([dir=rtl]) slot[name=icon]+#label{padding-right:var(
--spectrum-button-primary-texticon-icon-gap
)}:host([dir=ltr]) slot[name=icon]+#label{padding-right:0}:host([dir=rtl]) slot[name=icon]+#label{padding-left:0}#label{line-height:var(
--spectrum-button-primary-texticon-text-line-height
);padding-bottom:calc(var(--spectrum-button-primary-textonly-text-padding-bottom) - var(--spectrum-button-primary-textonly-border-size));padding-top:calc(var(--spectrum-button-primary-textonly-text-padding-top) - var(--spectrum-button-primary-textonly-border-size))}:host(.focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-texticon-focus-ring-size) var(
--spectrum-button-m-primary-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host(:focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-texticon-focus-ring-size) var(
--spectrum-button-m-primary-texticon-focus-ring-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host([variant=cta]){background-color:var(
--spectrum-button-m-cta-texticon-background-color,var(--spectrum-semantic-cta-background-color-default)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color,var(--spectrum-semantic-cta-background-color-default)
);color:var(
--spectrum-button-m-cta-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=cta]:hover){background-color:var(
--spectrum-button-m-cta-texticon-background-color-hover,var(--spectrum-semantic-cta-background-color-hover)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-hover,var(--spectrum-semantic-cta-background-color-hover)
);color:var(
--spectrum-button-m-cta-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=cta].focus-visible){background-color:var(
--spectrum-button-m-cta-texticon-background-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);color:var(
--spectrum-button-m-cta-texticon-text-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=cta]:focus-visible){background-color:var(
--spectrum-button-m-cta-texticon-background-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-key-focus,var(--spectrum-semantic-cta-background-color-hover)
);color:var(
--spectrum-button-m-cta-texticon-text-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=cta][active]){background-color:var(
--spectrum-button-m-cta-texticon-background-color-down,var(--spectrum-semantic-cta-background-color-down)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-down,var(--spectrum-semantic-cta-background-color-down)
);color:var(
--spectrum-button-m-cta-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=cta]:disabled),:host([variant=cta][disabled]){background-color:var(
--spectrum-button-m-cta-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-cta-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-cta-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=primary]){background-color:var(
--spectrum-button-m-primary-texticon-background-color,var(--spectrum-alias-button-primary-background-color-default)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color,var(--spectrum-alias-button-primary-border-color-default)
);color:var(
--spectrum-button-m-primary-texticon-text-color,var(--spectrum-alias-button-primary-text-color-default)
)}:host([variant=primary]:hover){background-color:var(
--spectrum-button-m-primary-texticon-background-color-hover,var(--spectrum-alias-button-primary-background-color-hover)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-hover,var(--spectrum-alias-button-primary-border-color-hover)
);color:var(
--spectrum-button-m-primary-texticon-text-color-hover,var(--spectrum-alias-button-primary-text-color-hover)
)}:host([variant=primary].focus-visible){background-color:var(
--spectrum-button-m-primary-texticon-background-color-key-focus,var(--spectrum-alias-button-primary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-key-focus,var(--spectrum-alias-button-primary-border-color-key-focus)
);color:var(
--spectrum-button-m-primary-texticon-text-color-key-focus,var(--spectrum-alias-button-primary-text-color-key-focus)
)}:host([variant=primary]:focus-visible){background-color:var(
--spectrum-button-m-primary-texticon-background-color-key-focus,var(--spectrum-alias-button-primary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-key-focus,var(--spectrum-alias-button-primary-border-color-key-focus)
);color:var(
--spectrum-button-m-primary-texticon-text-color-key-focus,var(--spectrum-alias-button-primary-text-color-key-focus)
)}:host([variant=primary][active]){background-color:var(
--spectrum-button-m-primary-texticon-background-color-down,var(--spectrum-alias-button-primary-background-color-down)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-down,var(--spectrum-alias-button-primary-border-color-down)
);color:var(
--spectrum-button-m-primary-texticon-text-color-down,var(--spectrum-alias-button-primary-text-color-down)
)}:host([variant=primary]:disabled),:host([variant=primary][disabled]){background-color:var(
--spectrum-button-m-primary-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=secondary]){background-color:var(
--spectrum-button-m-secondary-texticon-background-color,var(--spectrum-alias-button-secondary-background-color-default)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color,var(--spectrum-alias-button-secondary-border-color-default)
);color:var(
--spectrum-button-m-secondary-texticon-text-color,var(--spectrum-alias-button-secondary-text-color-default)
)}:host([variant=secondary]:hover){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-hover,var(--spectrum-alias-button-secondary-background-color-hover)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-hover,var(--spectrum-alias-button-secondary-border-color-hover)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-hover,var(--spectrum-alias-button-secondary-text-color-hover)
)}:host([variant=secondary].focus-visible){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-key-focus,var(--spectrum-alias-button-secondary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-key-focus,var(--spectrum-alias-button-secondary-border-color-key-focus)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-key-focus,var(--spectrum-alias-button-secondary-text-color-key-focus)
)}:host([variant=secondary]:focus-visible){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-key-focus,var(--spectrum-alias-button-secondary-background-color-key-focus)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-key-focus,var(--spectrum-alias-button-secondary-border-color-key-focus)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-key-focus,var(--spectrum-alias-button-secondary-text-color-key-focus)
)}:host([variant=secondary][active]){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-down,var(--spectrum-alias-button-secondary-background-color-down)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-down,var(--spectrum-alias-button-secondary-border-color-down)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-down,var(--spectrum-alias-button-secondary-text-color-down)
)}:host([variant=secondary]:disabled),:host([variant=secondary][disabled]){background-color:var(
--spectrum-button-m-secondary-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=negative]){background-color:var(
--spectrum-button-m-negative-texticon-background-color,var(--spectrum-alias-button-negative-background-color-default)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color,var(--spectrum-alias-button-negative-border-color-default)
);color:var(
--spectrum-button-m-negative-texticon-text-color,var(--spectrum-alias-button-negative-text-color-default)
)}:host([variant=negative]:hover){background-color:var(
--spectrum-button-m-negative-texticon-background-color-hover,var(--spectrum-alias-button-negative-background-color-hover)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-hover,var(--spectrum-alias-button-negative-border-color-hover)
);color:var(
--spectrum-button-m-negative-texticon-text-color-hover,var(--spectrum-alias-button-negative-text-color-hover)
)}:host([variant=negative].focus-visible){background-color:var(
--spectrum-button-m-negative-texticon-background-color-key-focus,var(--spectrum-alias-button-negative-background-color-key-focus)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-key-focus,var(--spectrum-alias-button-negative-border-color-key-focus)
);color:var(
--spectrum-button-m-negative-texticon-text-color-key-focus,var(--spectrum-alias-button-negative-text-color-key-focus)
)}:host([variant=negative]:focus-visible){background-color:var(
--spectrum-button-m-negative-texticon-background-color-key-focus,var(--spectrum-alias-button-negative-background-color-key-focus)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-key-focus,var(--spectrum-alias-button-negative-border-color-key-focus)
);color:var(
--spectrum-button-m-negative-texticon-text-color-key-focus,var(--spectrum-alias-button-negative-text-color-key-focus)
)}:host([variant=negative][active]){background-color:var(
--spectrum-button-m-negative-texticon-background-color-down,var(--spectrum-alias-button-negative-background-color-down)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-down,var(--spectrum-alias-button-negative-border-color-down)
);color:var(
--spectrum-button-m-negative-texticon-text-color-down,var(--spectrum-alias-button-negative-text-color-down)
)}:host([variant=negative]:disabled),:host([variant=negative][disabled]){background-color:var(
--spectrum-button-m-negative-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-texticon-border-color-disabled,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=overBackground]){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-overbackground-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-hover,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground].focus-visible){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-hover,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground]:focus-visible){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-hover,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-down,var(--spectrum-global-color-static-white)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-down,var(--spectrum-global-color-static-white)
);color:inherit}:host([variant=overBackground]:disabled),:host([variant=overBackground][disabled]){background-color:var(
--spectrum-button-m-primary-overbackground-texticon-background-color-disabled,var(--spectrum-alias-background-color-overbackground-disabled)
);border-color:var(
--spectrum-button-m-primary-overbackground-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-overbackground-texticon-text-color-disabled,var(--spectrum-alias-text-color-overbackground-disabled)
)}:host([variant=overBackground][quiet]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:hover){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet].focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);box-shadow:none;color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);box-shadow:none;color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet][active]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-down,var(--spectrum-alias-background-color-quiet-overbackground-down)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-down,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][quiet]:disabled),:host([variant=overBackground][quiet][disabled]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-disabled,var(--spectrum-alias-text-color-quiet-overbackground-disabled)
)}:host([variant=primary][quiet]){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color,var(--spectrum-global-color-gray-800)
)}:host([variant=primary][quiet]:hover){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-hover,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-hover,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet].focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet]:focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet][active]){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-down,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-down,var(--spectrum-global-color-gray-300)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-down,var(--spectrum-global-color-gray-900)
)}:host([variant=primary][quiet]:disabled),:host([variant=primary][quiet][disabled]){background-color:var(
--spectrum-button-m-primary-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=secondary][quiet]){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color,var(--spectrum-global-color-gray-700)
)}:host([variant=secondary][quiet]:hover){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-hover,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-hover,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet].focus-visible){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet]:focus-visible){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet][active]){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-down,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-down,var(--spectrum-global-color-gray-300)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-down,var(--spectrum-global-color-gray-800)
)}:host([variant=secondary][quiet]:disabled),:host([variant=secondary][quiet][disabled]){background-color:var(
--spectrum-button-m-secondary-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-secondary-quiet-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-secondary-quiet-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([variant=negative][quiet]){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color,var(--spectrum-semantic-negative-text-color-small)
)}:host([variant=negative][quiet]:hover){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-hover,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-hover,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-hover,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet].focus-visible){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet]:focus-visible){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-key-focus,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-key-focus,var(--spectrum-global-color-gray-200)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-key-focus,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet][active]){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-down,var(--spectrum-global-color-gray-300)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-down,var(--spectrum-global-color-gray-300)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-down,var(--spectrum-global-color-red-700)
)}:host([variant=negative][quiet]:disabled),:host([variant=negative][quiet][disabled]){background-color:var(
--spectrum-button-m-negative-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-negative-quiet-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-negative-quiet-texticon-text-color-disabled,var(--spectrum-global-color-gray-500)
)}@media (forced-colors:active){:host{--spectrum-button-m-cta-texticon-background-color:ButtonText;--spectrum-button-m-cta-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-cta-texticon-background-color-down:Highlight;--spectrum-button-m-cta-texticon-background-color-hover:Highlight;--spectrum-button-m-cta-texticon-background-color-key-focus:Highlight;--spectrum-button-m-cta-texticon-border-color:ButtonFace;--spectrum-button-m-cta-texticon-border-color-disabled:GrayText;--spectrum-button-m-cta-texticon-border-color-down:Highlight;--spectrum-button-m-cta-texticon-border-color-hover:Highlight;--spectrum-button-m-cta-texticon-border-color-key-focus:Highlight;--spectrum-button-m-cta-texticon-text-color:ButtonFace;--spectrum-button-m-cta-texticon-text-color-disabled:GrayText;--spectrum-button-m-cta-texticon-text-color-down:Buttonface;--spectrum-button-m-cta-texticon-text-color-hover:Buttonface;--spectrum-button-m-cta-texticon-text-color-key-focus:Buttonface;--spectrum-button-m-negative-quiet-texticon-background-color:ButtonFace;--spectrum-button-m-negative-quiet-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-negative-quiet-texticon-background-color-down:ButtonFace;--spectrum-button-m-negative-quiet-texticon-background-color-hover:ButtonFace;--spectrum-button-m-negative-quiet-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-negative-quiet-texticon-border-color:ButtonText;--spectrum-button-m-negative-quiet-texticon-border-color-disabled:GrayText;--spectrum-button-m-negative-quiet-texticon-border-color-down:Highlight;--spectrum-button-m-negative-quiet-texticon-border-color-hover:Highlight;--spectrum-button-m-negative-quiet-texticon-border-color-key-focus:Highlight;--spectrum-button-m-negative-quiet-texticon-text-color:ButtonText;--spectrum-button-m-negative-quiet-texticon-text-color-disabled:GrayText;--spectrum-button-m-negative-quiet-texticon-text-color-down:ButtonText;--spectrum-button-m-negative-quiet-texticon-text-color-hover:ButtonText;--spectrum-button-m-negative-quiet-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-negative-texticon-background-color:ButtonFace;--spectrum-button-m-negative-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-negative-texticon-background-color-down:ButtonFace;--spectrum-button-m-negative-texticon-background-color-hover:ButtonFace;--spectrum-button-m-negative-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-negative-texticon-border-color:ButtonText;--spectrum-button-m-negative-texticon-border-color-disabled:GrayText;--spectrum-button-m-negative-texticon-border-color-down:Highlight;--spectrum-button-m-negative-texticon-border-color-hover:Highlight;--spectrum-button-m-negative-texticon-border-color-key-focus:Highlight;--spectrum-button-m-negative-texticon-text-color:ButtonText;--spectrum-button-m-negative-texticon-text-color-disabled:GrayText;--spectrum-button-m-negative-texticon-text-color-down:ButtonText;--spectrum-button-m-negative-texticon-text-color-hover:ButtonText;--spectrum-button-m-negative-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-primary-overbackground-texticon-background-color:ButtonFace;--spectrum-button-m-primary-overbackground-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-overbackground-texticon-background-color-down:ButtonFace;--spectrum-button-m-primary-overbackground-texticon-background-color-hover:ButtonFace;--spectrum-button-m-primary-overbackground-texticon-border-color:ButtonText;--spectrum-button-m-primary-overbackground-texticon-border-color-disabled:GrayText;--spectrum-button-m-primary-overbackground-texticon-border-color-down:Highlight;--spectrum-button-m-primary-overbackground-texticon-border-color-hover:Highlight;--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus:Highlight;--spectrum-button-m-primary-overbackground-texticon-text-color:ButtonText;--spectrum-button-m-primary-overbackground-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-quiet-overbackground-texticon-background-color:ButtonFace;--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-down:ButtonFace;--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover:ButtonFace;--spectrum-button-m-primary-quiet-overbackground-texticon-border-color:ButtonText;--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-disabled:GrayText;--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-down:Highlight;--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover:Highlight;--spectrum-button-m-primary-quiet-overbackground-texticon-text-color:ButtonText;--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-down:ButtonText;--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover:ButtonText;--spectrum-button-m-primary-quiet-texticon-background-color:ButtonFace;--spectrum-button-m-primary-quiet-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-quiet-texticon-background-color-down:ButtonFace;--spectrum-button-m-primary-quiet-texticon-background-color-hover:ButtonFace;--spectrum-button-m-primary-quiet-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-primary-quiet-texticon-border-color:ButtonText;--spectrum-button-m-primary-quiet-texticon-border-color-disabled:GrayText;--spectrum-button-m-primary-quiet-texticon-border-color-down:Highlight;--spectrum-button-m-primary-quiet-texticon-border-color-hover:Highlight;--spectrum-button-m-primary-quiet-texticon-border-color-key-focus:Highlight;--spectrum-button-m-primary-quiet-texticon-text-color:ButtonText;--spectrum-button-m-primary-quiet-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-quiet-texticon-text-color-down:ButtonText;--spectrum-button-m-primary-quiet-texticon-text-color-hover:ButtonText;--spectrum-button-m-primary-quiet-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-primary-texticon-background-color:ButtonFace;--spectrum-button-m-primary-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-texticon-background-color-down:ButtonFace;--spectrum-button-m-primary-texticon-background-color-hover:ButtonFace;--spectrum-button-m-primary-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-primary-texticon-border-color:ButtonText;--spectrum-button-m-primary-texticon-border-color-disabled:GrayText;--spectrum-button-m-primary-texticon-border-color-down:Highlight;--spectrum-button-m-primary-texticon-border-color-hover:Highlight;--spectrum-button-m-primary-texticon-border-color-key-focus:Highlight;--spectrum-button-m-primary-texticon-text-color:ButtonText;--spectrum-button-m-primary-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-texticon-text-color-down:ButtonText;--spectrum-button-m-primary-texticon-text-color-hover:ButtonText;--spectrum-button-m-primary-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-secondary-quiet-texticon-background-color:ButtonFace;--spectrum-button-m-secondary-quiet-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-secondary-quiet-texticon-background-color-down:ButtonFace;--spectrum-button-m-secondary-quiet-texticon-background-color-hover:ButtonFace;--spectrum-button-m-secondary-quiet-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-secondary-quiet-texticon-border-color:ButtonText;--spectrum-button-m-secondary-quiet-texticon-border-color-disabled:GrayText;--spectrum-button-m-secondary-quiet-texticon-border-color-down:Highlight;--spectrum-button-m-secondary-quiet-texticon-border-color-hover:Highlight;--spectrum-button-m-secondary-quiet-texticon-border-color-key-focus:Highlight;--spectrum-button-m-secondary-quiet-texticon-text-color:ButtonText;--spectrum-button-m-secondary-quiet-texticon-text-color-disabled:GrayText;--spectrum-button-m-secondary-quiet-texticon-text-color-down:ButtonText;--spectrum-button-m-secondary-quiet-texticon-text-color-hover:ButtonText;--spectrum-button-m-secondary-quiet-texticon-text-color-key-focus:ButtonText;--spectrum-button-m-secondary-texticon-background-color:ButtonFace;--spectrum-button-m-secondary-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-secondary-texticon-background-color-down:ButtonFace;--spectrum-button-m-secondary-texticon-background-color-hover:ButtonFace;--spectrum-button-m-secondary-texticon-background-color-key-focus:ButtonFace;--spectrum-button-m-secondary-texticon-border-color:ButtonText;--spectrum-button-m-secondary-texticon-border-color-disabled:GrayText;--spectrum-button-m-secondary-texticon-border-color-down:Highlight;--spectrum-button-m-secondary-texticon-border-color-hover:Highlight;--spectrum-button-m-secondary-texticon-border-color-key-focus:Highlight;--spectrum-button-m-secondary-texticon-text-color:ButtonText;--spectrum-button-m-secondary-texticon-text-color-disabled:GrayText;--spectrum-button-m-secondary-texticon-text-color-down:ButtonText;--spectrum-button-m-secondary-texticon-text-color-hover:ButtonText;--spectrum-button-m-secondary-texticon-text-color-key-focus:ButtonText}:host(.focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-texticon-focus-ring-size) Highlight}:host(:focus-visible):after,:host([focused]):after{box-shadow:0 0 0 var(--spectrum-button-primary-texticon-focus-ring-size) Highlight}:host{forced-color-adjust:none}:host([variant=overBackground]:hover){color:ButtonText}:host([variant=overBackground].focus-visible){color:ButtonText}:host([variant=overBackground]:focus-visible){color:ButtonText}:host([variant=overBackground][active]){color:ButtonText}}@media (forced-colors:active){.spectrum-LogicButton:after{--spectrum-button-m-primary-texticon-focus-ring-color-key-focus:Highlight;forced-color-adjust:none}.spectrum-LogicButton{--spectrum-button-primary-texticon-focus-ring-size:2;--spectrum-button-m-secondary-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-secondary-texticon-border-color-disabled:GrayText;--spectrum-logicbutton-and-background-color:ButtonFace;--spectrum-logicbutton-and-background-color-disabled:ButtonFace;--spectrum-logicbutton-and-background-color-hover:ButtonFace;--spectrum-logicbutton-and-border-color:ButtonText;--spectrum-logicbutton-and-border-color-disabled:GrayText;--spectrum-logicbutton-and-border-color-hover:Highlight;--spectrum-logicbutton-and-text-color:ButtonText;--spectrum-logicbutton-and-text-color-disabled:GrayText;--spectrum-logicbutton-or-background-color:ButtonFace;--spectrum-logicbutton-or-background-color-hover:ButtonFace;--spectrum-logicbutton-or-border-color:ButtonText;--spectrum-logicbutton-or-border-color-hover:Highlight;--spectrum-logicbutton-or-text-color:ButtonText;forced-color-adjust:none}}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}`;class ue extends(at(ne)){constructor(){super(...arguments),this.variant="cta",this.warning=!1,this.quiet=!1}static get styles(){return[...super.styles,le]}}c([et({reflect:!0})],ue.prototype,"variant",void 0),c([et({type:Boolean,reflect:!0})],ue.prototype,"warning",void 0),c([et({type:Boolean,reflect:!0})],ue.prototype,"quiet",void 0),customElements.define("sp-button",ue);var de=r`:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:0}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host(:disabled){cursor:default}:host{background-color:transparent;border:none;border-radius:100%;margin:0;padding:var(--spectrum-clearbutton-padding)}:host>.icon{margin:0 auto}@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){:host>.icon{margin:0}}:host([size=s]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-s-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-s-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-s-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-s-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-s-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-s-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-s-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-s-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-s-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-height:var(
--spectrum-clearbutton-s-fill-height,var(--spectrum-alias-infieldbutton-full-height-s)
);--spectrum-clearbutton-fill-width:var(
--spectrum-clearbutton-s-fill-width,var(--spectrum-alias-infieldbutton-full-height-s)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-s-padding,var(--spectrum-alias-infieldbutton-padding-s)
)}:host([size=m]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-m-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-m-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-m-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-m-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-m-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-m-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-m-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-m-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-m-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-height:var(
--spectrum-clearbutton-m-fill-height,var(--spectrum-alias-infieldbutton-full-height-m)
);--spectrum-clearbutton-fill-width:var(
--spectrum-clearbutton-m-fill-width,var(--spectrum-alias-infieldbutton-full-height-m)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-m-padding,var(--spectrum-alias-infieldbutton-padding-m)
)}:host([size=l]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-l-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-l-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-l-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-l-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-l-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-l-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-l-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-l-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-l-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-height:var(
--spectrum-clearbutton-l-fill-height,var(--spectrum-alias-infieldbutton-full-height-l)
);--spectrum-clearbutton-fill-width:var(
--spectrum-clearbutton-l-fill-width,var(--spectrum-alias-infieldbutton-full-height-l)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-l-padding,var(--spectrum-alias-infieldbutton-padding-l)
)}:host([size=xl]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-xl-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-xl-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-xl-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-xl-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-xl-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-xl-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-xl-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-xl-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-xl-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-height:var(
--spectrum-clearbutton-xl-fill-height,var(--spectrum-alias-infieldbutton-full-height-xl)
);--spectrum-clearbutton-fill-width:var(
--spectrum-clearbutton-xl-fill-width,var(--spectrum-alias-infieldbutton-full-height-xl)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-xl-padding,var(--spectrum-alias-infieldbutton-padding-xl)
)}.fill{align-items:center;background-color:var(
--spectrum-clearbutton-fill-background-color
);border-radius:100%;display:flex;height:var(--spectrum-clearbutton-fill-height);justify-content:center;width:var(--spectrum-clearbutton-fill-width)}:host{color:var(
--spectrum-clearbutton-m-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
)}:host(:hover){color:var(
--spectrum-clearbutton-fill-uiicon-color
)}:host([active]){color:var(
--spectrum-clearbutton-fill-uiicon-color-down
)}:host(.focus-visible){color:var(
--spectrum-clearbutton-fill-uiicon-color-key-focus
)}:host(:focus-visible){color:var(
--spectrum-clearbutton-fill-uiicon-color-key-focus
)}:host(:disabled),:host([disabled]){color:var(
--spectrum-clearbutton-fill-uiicon-color-disabled
)}:host(:hover) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-hover
)}:host([active]) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-down
)}:host(.focus-visible) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-key-focus
)}:host(:focus-visible) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-key-focus
)}:host(:disabled) .fill,:host([disabled]) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-disabled
)}:host([variant=overBackground]){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:disabled),:host([variant=overBackground][disabled]) .fill{background-color:var(
--spectrum-alias-icon-color-overbackground-disabled,hsla(0,0%,100%,.2)
)}:host([variant=overBackground]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);box-shadow:none;color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-hover,var(--spectrum-alias-background-color-quiet-overbackground-hover)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-hover,var(--spectrum-alias-border-color-transparent)
);box-shadow:none;color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-overbackground-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-down,var(--spectrum-alias-background-color-quiet-overbackground-down)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-down,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:disabled),:host([variant=overBackground][disabled]){background-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-button-m-primary-quiet-overbackground-texticon-text-color-disabled,var(--spectrum-alias-text-color-quiet-overbackground-disabled)
)}@media (forced-colors:active){:host{forced-color-adjust:none}.spectrum-LogicButton:after{--spectrum-button-m-primary-texticon-focus-ring-color-key-focus:Highlight;forced-color-adjust:none}.spectrum-LogicButton{--spectrum-button-primary-texticon-focus-ring-size:2;--spectrum-button-m-secondary-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-secondary-texticon-border-color-disabled:GrayText;--spectrum-logicbutton-and-background-color:ButtonFace;--spectrum-logicbutton-and-background-color-disabled:ButtonFace;--spectrum-logicbutton-and-background-color-hover:ButtonFace;--spectrum-logicbutton-and-border-color:ButtonText;--spectrum-logicbutton-and-border-color-disabled:GrayText;--spectrum-logicbutton-and-border-color-hover:Highlight;--spectrum-logicbutton-and-text-color:ButtonText;--spectrum-logicbutton-and-text-color-disabled:GrayText;--spectrum-logicbutton-or-background-color:ButtonFace;--spectrum-logicbutton-or-background-color-hover:ButtonFace;--spectrum-logicbutton-or-border-color:ButtonText;--spectrum-logicbutton-or-border-color-hover:Highlight;--spectrum-logicbutton-or-text-color:ButtonText;forced-color-adjust:none}}`;customElements.define("sp-icon-cross75",class extends kt{render(){return qt(_),zt`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" aria-hidden="true" fill="currentColor"><path d="M5.188 4l2.14-2.14A.84.84 0 106.141.672L4 2.812 1.86.672A.84.84 0 00.672 1.86L2.812 4 .672 6.14A.84.84 0 101.86 7.328L4 5.188l2.14 2.14A.84.84 0 107.328 6.14z"/></svg>`}});var me=r`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Cross75{height:var(--spectrum-alias-ui-icon-cross-size-75);width:var(
--spectrum-alias-ui-icon-cross-size-75
)}.spectrum-UIIcon-Cross100{height:var(--spectrum-alias-ui-icon-cross-size-100);width:var(
--spectrum-alias-ui-icon-cross-size-100
)}.spectrum-UIIcon-Cross200{height:var(--spectrum-alias-ui-icon-cross-size-200);width:var(
--spectrum-alias-ui-icon-cross-size-200
)}.spectrum-UIIcon-Cross300{height:var(--spectrum-alias-ui-icon-cross-size-300);width:var(
--spectrum-alias-ui-icon-cross-size-300
)}.spectrum-UIIcon-Cross400{height:var(--spectrum-alias-ui-icon-cross-size-400);width:var(
--spectrum-alias-ui-icon-cross-size-400
)}.spectrum-UIIcon-Cross500{height:var(--spectrum-alias-ui-icon-cross-size-500);width:var(
--spectrum-alias-ui-icon-cross-size-500
)}.spectrum-UIIcon-Cross600{height:var(--spectrum-alias-ui-icon-cross-size-600);width:var(
--spectrum-alias-ui-icon-cross-size-600
)}`;class pe extends(at(ne)){constructor(){super(...arguments),this.variant=""}static get styles(){return[...super.styles,de,me]}get buttonContent(){return[_`<sp-icon-cross75 slot="icon" class="icon spectrum-UIIcon-Cross75"></sp-icon-cross75>`]}render(){return _`<div class="fill">${super.render()}</div>`}}c([et({reflect:!0})],pe.prototype,"variant",void 0);var be=r`:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);margin:0;overflow:visible;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:0}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host(:disabled){cursor:default}::slotted([slot=icon]){max-height:100%}#label{align-self:center;justify-self:center;text-align:center}#label:empty{display:none}:host(.spectrum-ActionButton--staticBlack:not([quiet]):disabled){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-disabled,rgba(0,0,0,.25)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):disabled[selected]){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-disabled-selected,transparent
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):disabled:not([selected])){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-disabled,transparent
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled)){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-default,rgba(0,0,0,.4)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):hover){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-hover,rgba(0,0,0,.55)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled)[active]){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-down,rgba(0,0,0,.7)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled).focus-visible){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-key-focus,rgba(0,0,0,.55)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):focus-visible){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-key-focus,rgba(0,0,0,.55)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled).is-keyboardFocused){border-color:var(
--spectrum-alias-actionbutton-staticBlack-border-color-key-focus,rgba(0,0,0,.55)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected])){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-default,transparent
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected]):hover){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-hover,rgba(0,0,0,.25)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected])[active]){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-down,rgba(0,0,0,.4)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected]).focus-visible){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-key-focus,rgba(0,0,0,.25)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected]):focus-visible){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-key-focus,rgba(0,0,0,.25)
)}:host(.spectrum-ActionButton--staticBlack:not([quiet]):not(:disabled):not([selected]).is-keyboardFocused){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-key-focus,rgba(0,0,0,.25)
)}:host(.spectrum-ActionButton--staticBlack[quiet]:disabled){border-color:transparent}:host(.spectrum-ActionButton--staticBlack[quiet]:disabled:not([selected])){background-color:transparent}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled)){border-color:transparent}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected])){background-color:var(
--spectrum-alias-component-background-color-quiet-default,var(--spectrum-alias-background-color-transparent)
)}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected]):hover){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected])[active]){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected]).focus-visible){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected]):focus-visible){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticBlack[quiet]:not(:disabled):not([selected]).is-keyboardFocused){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticBlack:disabled[selected]){background-color:var(
--spectrum-alias-actionbutton-staticBlack-background-color-disabled-selected,rgba(0,0,0,.1)
)}:host(.spectrum-ActionButton--staticBlack:disabled[selected]) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack:disabled[selected]) #label{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack:disabled[selected]) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack:disabled) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack:disabled) #label{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack:disabled) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled)){background-color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled):hover){background-color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled)[active]){background-color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled).focus-visible){background-color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled):focus-visible){background-color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled).is-keyboardFocused){background-color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled)) .spectrum-ActionButton-holdIcon{color:inherit}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled)) #label{color:inherit}:host(.spectrum-ActionButton--staticBlack[selected]:not(:disabled)) ::slotted([slot=icon]){color:inherit}:host(.spectrum-ActionButton--staticBlack) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-ActionButton-static-black-color
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):hover) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):hover) #label{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):hover) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])[active]) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])[active]) #label{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])[active]) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).focus-visible) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):focus-visible) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).focus-visible) #label{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):focus-visible) #label{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]):focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).is-keyboardFocused) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).is-keyboardFocused) #label{color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected]).is-keyboardFocused) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-black,#000
)}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])) #label{color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticBlack:not(:disabled):not([selected])) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-black-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticBlack) #label{color:var(
--spectrum-ActionButton-static-black-color
)}:host(.spectrum-ActionButton--staticBlack) ::slotted([slot=icon]){color:var(
--spectrum-ActionButton-static-black-color
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):disabled){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-disabled,hsla(0,0%,100%,.25)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):disabled[selected]){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-disabled-selected,transparent
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):disabled:not([selected])){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-disabled,transparent
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled)){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-default,hsla(0,0%,100%,.4)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):hover){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-hover,hsla(0,0%,100%,.55)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled)[active]){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-down,hsla(0,0%,100%,.7)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled).focus-visible){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-key-focus,hsla(0,0%,100%,.55)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):focus-visible){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-key-focus,hsla(0,0%,100%,.55)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled).is-keyboardFocused){border-color:var(
--spectrum-alias-actionbutton-staticWhite-border-color-key-focus,hsla(0,0%,100%,.55)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected])){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-default,transparent
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected]):hover){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-hover,hsla(0,0%,100%,.25)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected])[active]){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-down,hsla(0,0%,100%,.4)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected]).focus-visible){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-key-focus,hsla(0,0%,100%,.25)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected]):focus-visible){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-key-focus,hsla(0,0%,100%,.25)
)}:host(.spectrum-ActionButton--staticWhite:not([quiet]):not(:disabled):not([selected]).is-keyboardFocused){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-key-focus,hsla(0,0%,100%,.25)
)}:host(.spectrum-ActionButton--staticWhite[quiet]:disabled){border-color:transparent}:host(.spectrum-ActionButton--staticWhite[quiet]:disabled:not([selected])){background-color:transparent}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled)){border-color:transparent}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected])){background-color:var(
--spectrum-alias-component-background-color-quiet-default,var(--spectrum-alias-background-color-transparent)
)}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected]):hover){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected])[active]){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected]).focus-visible){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected]):focus-visible){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticWhite[quiet]:not(:disabled):not([selected]).is-keyboardFocused){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-25))}:host(.spectrum-ActionButton--staticWhite:disabled[selected]){background-color:var(
--spectrum-alias-actionbutton-staticWhite-background-color-disabled-selected,hsla(0,0%,100%,.1)
)}:host(.spectrum-ActionButton--staticWhite:disabled[selected]) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite:disabled[selected]) #label{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite:disabled[selected]) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite:disabled) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite:disabled) #label{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite:disabled) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-40))}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled)){background-color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled):hover){background-color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled)[active]){background-color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled).focus-visible){background-color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled):focus-visible){background-color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled).is-keyboardFocused){background-color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled)) .spectrum-ActionButton-holdIcon{color:inherit}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled)) #label{color:inherit}:host(.spectrum-ActionButton--staticWhite[selected]:not(:disabled)) ::slotted([slot=icon]){color:inherit}:host(.spectrum-ActionButton--staticWhite) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-ActionButton-static-white-color
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])) .spectrum-ActionButton-holdIcon{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):hover) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):hover) #label{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):hover) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])[active]) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])[active]) #label{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])[active]) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).focus-visible) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):focus-visible) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).focus-visible) #label{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):focus-visible) #label{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]):focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).is-keyboardFocused) .spectrum-ActionButton-holdIcon{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).is-keyboardFocused) #label{color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected]).is-keyboardFocused) ::slotted([slot=icon]){color:var(
--spectrum-global-color-static-white,#fff
)}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])) #label{color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticWhite:not(:disabled):not([selected])) ::slotted([slot=icon]){color:rgba(var(--spectrum-global-color-static-white-rgb),var(--spectrum-global-color-opacity-90))}:host(.spectrum-ActionButton--staticWhite) #label{color:var(
--spectrum-ActionButton-static-white-color
)}:host(.spectrum-ActionButton--staticWhite) ::slotted([slot=icon]){color:var(
--spectrum-ActionButton-static-white-color
)}:host([size=s]){--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-s-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-s-texticon-icon-gap,var(--spectrum-global-dimension-size-85)
);--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-s-texticon-padding-left,var(--spectrum-global-dimension-size-85)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-s-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-s-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-s-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-s-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-s-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-s-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-40)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-s-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-40)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-s-textonly-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-s-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-s-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-s-textonly-height,var(--spectrum-global-dimension-size-300)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-s-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-s-textonly-padding-right,var(--spectrum-global-dimension-size-115)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-s-textonly-padding-left,var(--spectrum-global-dimension-size-115)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-s-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-s-icononly-padding-right,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-s-icononly-padding-left,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-global-dimension-size-300
)}:host([size=m]){--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-m-texticon-padding-left
);--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-m-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-m-texticon-icon-gap,var(--spectrum-global-dimension-size-100)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-m-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-m-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-m-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-m-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-m-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-m-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-m-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-50)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-m-textonly-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-m-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-m-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-actionbutton-m-textonly-min-width,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-m-textonly-height,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-m-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-m-textonly-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-m-textonly-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-m-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-m-icononly-padding-right,var(--spectrum-global-dimension-size-85)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-m-icononly-padding-left,var(--spectrum-global-dimension-size-85)
)}:host([size=l]){--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-l-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-l-texticon-icon-gap,var(--spectrum-global-dimension-size-115)
);--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-l-texticon-padding-left,var(--spectrum-global-dimension-size-160)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-l-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-l-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-l-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-l-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-l-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-l-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-65)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-l-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-65)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-l-textonly-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-l-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-l-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-actionbutton-l-textonly-min-width,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-l-textonly-height,var(--spectrum-global-dimension-size-500)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-l-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-l-textonly-padding-right,var(--spectrum-global-dimension-size-185)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-l-textonly-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-l-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-l-icononly-padding-right,var(--spectrum-global-dimension-size-125)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-l-icononly-padding-left,var(--spectrum-global-dimension-size-125)
)}:host([size=xl]){--spectrum-actionbutton-texticon-border-size:var(
--spectrum-actionbutton-xl-texticon-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-texticon-icon-gap:var(
--spectrum-actionbutton-xl-texticon-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-actionbutton-texticon-padding-left:var(
--spectrum-actionbutton-xl-texticon-padding-left,var(--spectrum-global-dimension-size-185)
);--spectrum-actionbutton-quiet-textonly-border-size:var(
--spectrum-actionbutton-xl-quiet-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-quiet-textonly-text-size:var(
--spectrum-actionbutton-xl-quiet-textonly-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-actionbutton-quiet-textonly-text-font-weight:var(
--spectrum-actionbutton-xl-quiet-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-quiet-textonly-border-radius:var(
--spectrum-actionbutton-xl-quiet-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-border-size:var(
--spectrum-actionbutton-xl-textonly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-textonly-hold-icon-padding-right:var(
--spectrum-actionbutton-xl-textonly-hold-icon-padding-right,var(--spectrum-global-dimension-size-75)
);--spectrum-actionbutton-textonly-hold-icon-padding-bottom:var(
--spectrum-actionbutton-xl-textonly-hold-icon-padding-bottom,var(--spectrum-global-dimension-size-75)
);--spectrum-actionbutton-textonly-text-size:var(
--spectrum-actionbutton-xl-textonly-text-size,var(--spectrum-global-dimension-font-size-300)
);--spectrum-actionbutton-textonly-text-font-weight:var(
--spectrum-actionbutton-xl-textonly-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-actionbutton-textonly-text-line-height:var(
--spectrum-actionbutton-xl-textonly-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-actionbutton-textonly-min-width:var(
--spectrum-actionbutton-xl-textonly-min-width,var(--spectrum-global-dimension-size-400)
);--spectrum-actionbutton-textonly-height:var(
--spectrum-actionbutton-xl-textonly-height,var(--spectrum-global-dimension-size-600)
);--spectrum-actionbutton-textonly-border-radius:var(
--spectrum-actionbutton-xl-textonly-border-radius,var(--spectrum-alias-component-border-radius)
);--spectrum-actionbutton-textonly-padding-right:var(
--spectrum-actionbutton-xl-textonly-padding-right,var(--spectrum-global-dimension-size-225)
);--spectrum-actionbutton-textonly-padding-left:var(
--spectrum-actionbutton-xl-textonly-padding-left,var(--spectrum-global-dimension-size-225)
);--spectrum-actionbutton-icononly-border-size:var(
--spectrum-actionbutton-xl-icononly-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-actionbutton-icononly-padding-right:var(
--spectrum-actionbutton-xl-icononly-padding-right,var(--spectrum-global-dimension-size-160)
);--spectrum-actionbutton-icononly-padding-left:var(
--spectrum-actionbutton-xl-icononly-padding-left,var(--spectrum-global-dimension-size-160)
)}:host{--spectrum-actionbutton-padding-left-adjusted:calc(var(--spectrum-actionbutton-texticon-padding-left) - var(--spectrum-actionbutton-texticon-border-size));--spectrum-actionbutton-textonly-padding-left-adjusted:calc(var(--spectrum-actionbutton-textonly-padding-left) - var(--spectrum-actionbutton-textonly-border-size));--spectrum-actionbutton-textonly-padding-right-adjusted:calc(var(--spectrum-actionbutton-textonly-padding-right) - var(--spectrum-actionbutton-textonly-border-size));--spectrum-actionbutton-icononly-padding-left-adjusted:calc(var(--spectrum-actionbutton-icononly-padding-left) - var(--spectrum-actionbutton-icononly-border-size));--spectrum-actionbutton-icononly-padding-right-adjusted:calc(var(--spectrum-actionbutton-icononly-padding-right) - var(--spectrum-actionbutton-icononly-border-size))}:host([dir=ltr]){padding-left:var(
--spectrum-actionbutton-textonly-padding-left-adjusted
);padding-right:var(--spectrum-actionbutton-textonly-padding-right-adjusted)}:host([dir=rtl]){padding-left:var(--spectrum-actionbutton-textonly-padding-right-adjusted);padding-right:var(
--spectrum-actionbutton-textonly-padding-left-adjusted
)}:host{border-radius:var(--spectrum-actionbutton-textonly-border-radius);border-width:var(--spectrum-actionbutton-textonly-border-size);color:inherit;font-size:var(--spectrum-actionbutton-textonly-text-size);font-weight:var(--spectrum-actionbutton-textonly-text-font-weight);height:var(--spectrum-actionbutton-textonly-height);line-height:var(--spectrum-actionbutton-textonly-text-line-height);min-width:var(--spectrum-actionbutton-textonly-min-width);position:relative}:host([dir=ltr]) ::slotted([slot=icon]){margin-left:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted))*-1)}:host([dir=rtl]) ::slotted([slot=icon]){margin-right:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted))*-1)}:host([dir=ltr]) slot[name=icon]+#label{padding-left:var(
--spectrum-actionbutton-texticon-icon-gap
)}:host([dir=rtl]) slot[name=icon]+#label{padding-right:var(
--spectrum-actionbutton-texticon-icon-gap
)}:host([dir=ltr]) slot[name=icon]+#label{padding-right:0}:host([dir=rtl]) slot[name=icon]+#label{padding-left:0}#hold-affordance+::slotted([slot=icon]),:host([dir]) slot[icon-only] sp-icon,:host([dir]) slot[icon-only]::slotted([slot=icon]){margin-left:calc((var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-icononly-padding-left-adjusted))*-1);margin-right:calc((var(--spectrum-actionbutton-textonly-padding-right-adjusted) - var(--spectrum-actionbutton-icononly-padding-right-adjusted))*-1)}#label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host([dir=ltr]) #hold-affordance{right:var(
--spectrum-actionbutton-textonly-hold-icon-padding-right
)}:host([dir=rtl]) #hold-affordance{left:var(
--spectrum-actionbutton-textonly-hold-icon-padding-right
)}:host([dir=rtl]) #hold-affordance{transform:matrix(-1,0,0,1,0,0)}#hold-affordance{bottom:var(--spectrum-actionbutton-textonly-hold-icon-padding-bottom);position:absolute}:host([quiet]){border-radius:var(--spectrum-actionbutton-quiet-textonly-border-radius);border-width:var(
--spectrum-actionbutton-quiet-textonly-border-size
);font-size:var(--spectrum-actionbutton-quiet-textonly-text-size);font-weight:var(--spectrum-actionbutton-quiet-textonly-text-font-weight)}:host{--spectrum-actionbutton-focus-ring-gap:var(
--spectrum-alias-component-focusring-gap,var(--spectrum-global-dimension-static-size-0)
);--spectrum-actionbutton-focus-ring-size:var(
--spectrum-alias-component-focusring-size,var(--spectrum-global-dimension-static-size-10)
);--spectrum-actionbutton-focus-ring-color:var(
--spectrum-actionbutton-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
);transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host:after{border-radius:calc(var(--spectrum-actionbutton-quiet-textonly-border-radius) + var(--spectrum-actionbutton-focus-ring-gap));bottom:0;content:"";left:0;margin:calc((var(--spectrum-actionbutton-focus-ring-gap) + var(--spectrum-actionbutton-textonly-border-size))*-1);pointer-events:none;position:absolute;right:0;top:0;transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host(.focus-visible){box-shadow:none!important}:host(:focus-visible){box-shadow:none!important}:host(.focus-visible):after{box-shadow:0 0 0 var(--spectrum-actionbutton-focus-ring-size) var(--spectrum-actionbutton-focus-ring-color)}:host(:focus-visible):after{box-shadow:0 0 0 var(--spectrum-actionbutton-focus-ring-size) var(--spectrum-actionbutton-focus-ring-color)}.spectrum-ActionButton--staticWhite{--spectrum-actionbutton-focus-ring-color:var(
--spectrum-global-color-static-white,#fff
)}.spectrum-ActionButton--staticBlack{--spectrum-actionbutton-focus-ring-color:var(
--spectrum-global-color-static-black,#000
)}.spectrum-ActionButton--staticBlack,.spectrum-ActionButton--staticWhite,:host([emphasized][selected]){--spectrum-actionbutton-focus-ring-gap:var(
--spectrum-alias-component-focusring-gap-emphasized,var(--spectrum-global-dimension-static-size-25)
);--spectrum-actionbutton-focus-ring-size:var(
--spectrum-alias-component-focusring-size-emphasized,var(--spectrum-global-dimension-static-size-25)
)}:host{background-color:var(
--spectrum-actionbutton-m-textonly-background-color,var(--spectrum-alias-component-background-color-default)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color,var(--spectrum-alias-component-border-color-default)
);color:var(
--spectrum-actionbutton-m-textonly-text-color,var(--spectrum-alias-component-text-color-default)
)}::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}#hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host(:hover){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-hover,var(--spectrum-alias-component-background-color-hover)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-hover,var(--spectrum-alias-component-border-color-hover)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host(:hover) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}:host(:hover) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}:host(.focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(:focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host(.focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host(:focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host(.focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host(:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host(.focus-visible) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host(:focus-visible) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}:host([active]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-down,var(--spectrum-alias-component-background-color-down)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-down,var(--spectrum-alias-component-border-color-down)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host([active]) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}:host(:disabled),:host([disabled]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-disabled,var(--spectrum-alias-component-background-color-disabled)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-disabled,var(--spectrum-alias-component-border-color-disabled)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host(:disabled) ::slotted([slot=icon]),:host([disabled]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host(:disabled) #hold-affordance,:host([disabled]) #hold-affordance{color:var(
--spectrum-actionbutton-m-textonly-hold-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([selected]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected,var(--spectrum-alias-component-background-color-selected-default)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected,var(--spectrum-alias-component-border-color-selected-default)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected,var(--spectrum-alias-component-text-color-selected-default)
)}:host([selected]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected].focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-key-focus,var(--spectrum-alias-component-background-color-selected-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([selected]:focus-visible){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-key-focus,var(--spectrum-alias-component-background-color-selected-key-focus)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([selected].focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([selected]:focus-visible[active]){border-color:var(
--spectrum-actionbutton-m-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-key-focus)
)}:host([selected].focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected]:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected]:hover){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-hover,var(--spectrum-alias-component-background-color-selected-hover)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-hover,var(--spectrum-alias-component-border-color-selected-hover)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-selected-hover)
)}:host([selected]:hover) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-hover,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected][active]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-down,var(--spectrum-alias-component-background-color-selected-down)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-down,var(--spectrum-alias-component-border-color-selected-down)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-selected-down)
)}:host([selected][active]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-down,var(--spectrum-alias-component-icon-color-selected)
)}:host([selected]:disabled),:host([selected][disabled]){background-color:var(
--spectrum-actionbutton-m-textonly-background-color-selected-disabled,var(--spectrum-alias-component-background-color-disabled)
);border-color:var(
--spectrum-actionbutton-m-textonly-border-color-selected-disabled,var(--spectrum-alias-component-border-color-disabled)
);color:var(
--spectrum-actionbutton-m-textonly-text-color-selected-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([selected]:disabled) ::slotted([slot=icon]),:host([selected][disabled]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-texticon-icon-color-selected-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([emphasized][quiet][selected]),:host([emphasized][selected]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected,var(
--spectrum-alias-component-background-color-emphasized-selected-default
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected,var(--spectrum-alias-component-border-color-emphasized-selected-default)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected,var(--spectrum-alias-component-text-color-emphasized-selected-default)
)}:host([emphasized][quiet][selected]) ::slotted([slot=icon]),:host([emphasized][selected]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected,var(--spectrum-alias-component-icon-color-emphasized-selected-default)
)}:host([emphasized][quiet][selected].focus-visible),:host([emphasized][selected].focus-visible){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-emphasized-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-key-focus,var(
--spectrum-alias-component-border-color-emphasized-selected-key-focus
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected]:focus-visible),:host([emphasized][selected]:focus-visible){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-emphasized-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-key-focus,var(
--spectrum-alias-component-border-color-emphasized-selected-key-focus
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected].focus-visible) ::slotted([slot=icon]),:host([emphasized][selected].focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected]:focus-visible) ::slotted([slot=icon]),:host([emphasized][selected]:focus-visible) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-key-focus,var(--spectrum-alias-component-icon-color-emphasized-selected-key-focus)
)}:host([emphasized][quiet][selected]:hover),:host([emphasized][selected]:hover){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-hover,var(
--spectrum-alias-component-background-color-emphasized-selected-hover
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-hover,var(--spectrum-alias-component-border-color-emphasized-selected-hover)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-emphasized-selected-hover)
)}:host([emphasized][quiet][selected]:hover) ::slotted([slot=icon]),:host([emphasized][selected]:hover) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-hover,var(--spectrum-alias-component-icon-color-emphasized-selected-hover)
)}:host([emphasized][quiet][selected][active]),:host([emphasized][selected][active]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-down,var(
--spectrum-alias-component-background-color-emphasized-selected-down
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-down,var(--spectrum-alias-component-border-color-emphasized-selected-down)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-emphasized-selected-down)
)}:host([emphasized][quiet][selected][active]) ::slotted([slot=icon]),:host([emphasized][selected][active]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-down,var(--spectrum-alias-component-icon-color-emphasized-selected-down)
)}:host([emphasized][quiet][selected]:disabled),:host([emphasized][quiet][selected][disabled]),:host([emphasized][selected]:disabled),:host([emphasized][selected][disabled]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-disabled,var(--spectrum-alias-component-background-color-disabled)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-disabled,var(--spectrum-alias-component-border-color-disabled)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([emphasized][quiet][selected]:disabled) ::slotted([slot=icon]),:host([emphasized][quiet][selected][disabled]) ::slotted([slot=icon]),:host([emphasized][selected]:disabled) ::slotted([slot=icon]),:host([emphasized][selected][disabled]) ::slotted([slot=icon]){color:var(
--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}:host([quiet]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color,var(--spectrum-alias-component-background-color-quiet-default)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color,var(--spectrum-alias-component-border-color-quiet-default)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color,var(--spectrum-alias-component-text-color-default)
)}:host([quiet]:hover){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-hover,var(--spectrum-alias-component-background-color-quiet-hover)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-hover,var(--spectrum-alias-component-border-color-quiet-hover)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-hover,var(--spectrum-alias-component-text-color-hover)
)}:host([quiet].focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-quiet-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host([quiet]:focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-key-focus,var(--spectrum-alias-component-background-color-quiet-key-focus)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus,var(--spectrum-alias-component-border-color-quiet-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-key-focus,var(--spectrum-alias-component-text-color-key-focus)
)}:host([quiet][active]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-down,var(--spectrum-alias-component-background-color-quiet-down)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-down,var(--spectrum-alias-component-border-color-quiet-down)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-down,var(--spectrum-alias-component-text-color-down)
)}:host([quiet]:disabled),:host([quiet][disabled]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-disabled,var(--spectrum-alias-component-background-color-quiet-disabled)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-disabled,var(--spectrum-alias-component-border-color-quiet-disabled)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([quiet][selected]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected,var(--spectrum-alias-component-background-color-selected-default)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected,var(--spectrum-alias-component-border-color-quiet-selected-default)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected,var(--spectrum-alias-component-text-color-selected-default)
)}:host([quiet][selected].focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-quiet-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-quiet-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([quiet][selected]:focus-visible){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-key-focus,var(
--spectrum-alias-component-background-color-quiet-selected-key-focus
)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-key-focus,var(--spectrum-alias-component-border-color-quiet-selected-key-focus)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-key-focus,var(--spectrum-alias-component-text-color-selected-key-focus)
)}:host([quiet][selected]:hover){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-hover,var(--spectrum-alias-component-background-color-quiet-selected-hover)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-hover,var(--spectrum-alias-component-border-color-quiet-selected-hover)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-selected-hover)
)}:host([quiet][selected][active]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-down,var(--spectrum-alias-component-background-color-quiet-selected-down)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-down,var(--spectrum-alias-component-border-color-quiet-selected-down)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-selected-down)
)}:host([quiet][selected]:disabled),:host([quiet][selected][disabled]){background-color:var(
--spectrum-actionbutton-m-quiet-textonly-background-color-selected-disabled,var(--spectrum-alias-component-background-color-quiet-selected-disabled)
);border-color:var(
--spectrum-actionbutton-m-quiet-textonly-border-color-selected-disabled,var(--spectrum-alias-component-border-color-quiet-disabled)
);color:var(
--spectrum-actionbutton-m-quiet-textonly-text-color-selected-disabled,var(--spectrum-alias-component-text-color-disabled)
)}.spectrum-ActionButton--staticBlack,.spectrum-ActionButton--staticWhite{--spectrum-global-color-static-black-rgb:0,0,0;--spectrum-global-color-static-white-rgb:255,255,255;--spectrum-ActionButton-static-black-color:var(
--spectrum-global-color-static-black,#000
);--spectrum-ActionButton-static-white-color:var(
--spectrum-global-color-static-white,#fff
)}:host([selected]) .spectrum-ActionButton--staticBlack,:host([selected]) .spectrum-ActionButton--staticWhite{color:inherit!important}@media (forced-colors:active){:host{--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected:HighlightText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-disabled:GrayText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-down:HighlightText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-hover:HighlightText;--spectrum-actionbutton-m-emphasized-texticon-icon-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected:Highlight;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-disabled:ButtonFace;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-down:Highlight;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-hover:Highlight;--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-key-focus:Highlight;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-disabled:GrayText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-down:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-hover:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-disabled:GrayText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-down:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-hover:HighlightText;--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-quiet-textonly-background-color:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-disabled:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-down:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-hover:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-key-focus:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-selected:Highlight;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-disabled:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-down:Highlight;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-hover:Highlight;--spectrum-actionbutton-m-quiet-textonly-background-color-selected-key-focus:Highlight;--spectrum-actionbutton-m-quiet-textonly-border-color:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-disabled:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-down:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-hover:ButtonFace;--spectrum-actionbutton-m-quiet-textonly-border-color-key-focus:Highlight;--spectrum-actionbutton-m-quiet-textonly-border-color-selected:HighlightText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-disabled:GrayText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-down:HighlightText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-hover:HighlightText;--spectrum-actionbutton-m-quiet-textonly-border-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-disabled:GrayText;--spectrum-actionbutton-m-quiet-textonly-text-color-down:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-hover:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-key-focus:ButtonText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-disabled:GrayText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-down:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-hover:HighlightText;--spectrum-actionbutton-m-quiet-textonly-text-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-texticon-icon-color:ButtonText;--spectrum-actionbutton-m-texticon-icon-color-disabled:GrayText;--spectrum-actionbutton-m-texticon-icon-color-hover:ButtonText;--spectrum-actionbutton-m-texticon-icon-color-key-focus:ButtonText;--spectrum-actionbutton-m-texticon-icon-color-selected:HighlightText;--spectrum-actionbutton-m-texticon-icon-color-selected-disabled:GrayText;--spectrum-actionbutton-m-texticon-icon-color-selected-down:HighlightText;--spectrum-actionbutton-m-texticon-icon-color-selected-hover:HighlightText;--spectrum-actionbutton-m-texticon-icon-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-textonly-background-color:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-disabled:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-down:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-hover:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-key-focus:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-selected:Highlight;--spectrum-actionbutton-m-textonly-background-color-selected-disabled:ButtonFace;--spectrum-actionbutton-m-textonly-background-color-selected-down:Highlight;--spectrum-actionbutton-m-textonly-background-color-selected-hover:Highlight;--spectrum-actionbutton-m-textonly-background-color-selected-key-focus:Highlight;--spectrum-actionbutton-m-textonly-border-color:ButtonText;--spectrum-actionbutton-m-textonly-border-color-disabled:GrayText;--spectrum-actionbutton-m-textonly-border-color-down:ButtonText;--spectrum-actionbutton-m-textonly-border-color-hover:ButtonText;--spectrum-actionbutton-m-textonly-border-color-key-focus:Highlight;--spectrum-actionbutton-m-textonly-border-color-selected:HighlightText;--spectrum-actionbutton-m-textonly-border-color-selected-disabled:GrayText;--spectrum-actionbutton-m-textonly-border-color-selected-down:HighlightText;--spectrum-actionbutton-m-textonly-border-color-selected-hover:HighlightText;--spectrum-actionbutton-m-textonly-border-color-selected-key-focus:HighlightText;--spectrum-actionbutton-m-textonly-hold-icon-color:ButtonText;--spectrum-actionbutton-m-textonly-hold-icon-color-disabled:GrayText;--spectrum-actionbutton-m-textonly-hold-icon-color-down:ButtonText;--spectrum-actionbutton-m-textonly-hold-icon-color-hover:ButtonText;--spectrum-actionbutton-m-textonly-hold-icon-color-key-focus:ButtonText;--spectrum-actionbutton-m-textonly-text-color:ButtonText;--spectrum-actionbutton-m-textonly-text-color-disabled:GrayText;--spectrum-actionbutton-m-textonly-text-color-down:ButtonText;--spectrum-actionbutton-m-textonly-text-color-hover:ButtonText;--spectrum-actionbutton-m-textonly-text-color-key-focus:ButtonText;--spectrum-actionbutton-m-textonly-text-color-selected:HighlightText;--spectrum-actionbutton-m-textonly-text-color-selected-disabled:GrayText;--spectrum-actionbutton-m-textonly-text-color-selected-down:HighlightText;--spectrum-actionbutton-m-textonly-text-color-selected-hover:HighlightText;--spectrum-actionbutton-m-textonly-text-color-selected-key-focus:HighlightText;forced-color-adjust:none}:host([quiet][emphasized]:not(:disabled,[disabled]):hover){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-hover,var(
--spectrum-alias-component-background-color-emphasized-selected-hover
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-hover,var(
--spectrum-alias-component-border-color-emphasized-selected-hover
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-hover,var(--spectrum-alias-component-text-color-emphasized-selected-hover)
)}:host([quiet][emphasized]:not(:disabled,[disabled])[active]){background-color:var(
--spectrum-actionbutton-m-emphasized-textonly-background-color-selected-down,var(
--spectrum-alias-component-background-color-emphasized-selected-down
)
);border-color:var(
--spectrum-actionbutton-m-emphasized-textonly-border-color-selected-down,var(
--spectrum-alias-component-border-color-emphasized-selected-down
)
);color:var(
--spectrum-actionbutton-m-emphasized-textonly-text-color-selected-down,var(--spectrum-alias-component-text-color-emphasized-selected-down)
)}}:host{display:inline-flex;flex-direction:row}:host([disabled]){cursor:auto;pointer-events:none}:host([dir]){-webkit-appearance:none}::slotted([slot=icon]){flex-shrink:0}#button{inset:0;position:absolute}#label{flex-grow:var(--spectrum-actionbutton-label-flex-grow);text-align:var(--spectrum-actionbutton-label-text-align)}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}`;var he=r`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-CornerTriangle75{height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75,var(--spectrum-global-dimension-size-65)
);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75,var(--spectrum-global-dimension-size-65)
)}.spectrum-UIIcon-CornerTriangle100{height:var(--spectrum-alias-ui-icon-cornertriangle-size-100);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}.spectrum-UIIcon-CornerTriangle200{height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200,var(--spectrum-global-dimension-size-75)
);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200,var(--spectrum-global-dimension-size-75)
)}.spectrum-UIIcon-CornerTriangle300{height:var(--spectrum-alias-ui-icon-cornertriangle-size-300);width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}`;customElements.define("sp-icon-corner-triangle300",class extends kt{render(){return qt(_),zt`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 7" aria-hidden="true" fill="currentColor"><path d="M6.683.67a.315.315 0 00-.223.093l-5.7 5.7a.316.316 0 00.224.54h5.7A.316.316 0 007 6.687V.986A.316.316 0 006.684.67z"/></svg>`}});const ve={s:"spectrum-UIIcon-CornerTriangle75",m:"spectrum-UIIcon-CornerTriangle100",l:"spectrum-UIIcon-CornerTriangle200",xl:"spectrum-UIIcon-CornerTriangle300"};let ge;class xe extends(at(se)){constructor(){super(),this.emphasized=!1,this.holdAffordance=!1,this.quiet=!1,this.role="button",this.selected=!1,this.toggles=!1,this._value="",this.onClick=()=>{if(!this.toggles)return;this.selected=!this.selected;this.dispatchEvent(new Event("change",{cancelable:!0}))||(this.selected=!this.selected)},this.addEventListener("click",this.onClick),this.addEventListener("pointerdown",this.onPointerdown)}static get styles(){return[be,he]}get value(){return this._value||this.itemText}set value(t){t!==this._value&&(this._value=t||"",this._value?this.setAttribute("value",this._value):this.removeAttribute("value"))}get itemText(){return(this.textContent||"").trim()}onPointerdown(){this.addEventListener("pointerup",this.onPointerup),this.addEventListener("pointercancel",this.onPointerup),ge=setTimeout((()=>{this.dispatchEvent(new CustomEvent("longpress",{bubbles:!0,composed:!0,detail:{source:"pointer"}}))}),300)}onPointerup(){clearTimeout(ge),this.removeEventListener("pointerup",this.onPointerup),this.removeEventListener("pointercancel",this.onPointerup)}handleKeydown(t){if(!this.holdAffordance)return super.handleKeydown(t);const{code:e,altKey:o}=t;("Space"===e||o&&"ArrowDown"===e)&&(t.preventDefault(),"ArrowDown"===e&&(t.stopPropagation(),t.stopImmediatePropagation()),this.addEventListener("keyup",this.handleKeyup),this.active=!0)}handleKeyup(t){if(!this.holdAffordance)return super.handleKeyup(t);const{code:e,altKey:o}=t;("Space"===e||o&&"ArrowDown"===e)&&(t.stopPropagation(),this.dispatchEvent(new CustomEvent("longpress",{bubbles:!0,composed:!0,detail:{source:"keyboard"}})),this.active=!1)}get buttonContent(){const t=super.buttonContent;return this.holdAffordance&&t.unshift(_`<sp-icon-corner-triangle300 id="hold-affordance" class="${ve[this.size]}"></sp-icon-corner-triangle300>`),t}updated(t){super.updated(t);const e="button"===this.role&&(this.selected||this.toggles);(t.has("selected")||t.has("role"))&&(e?this.setAttribute("aria-pressed",this.selected?"true":"false"):this.removeAttribute("aria-pressed"))}}c([et({type:Boolean,reflect:!0})],xe.prototype,"emphasized",void 0),c([et({type:Boolean,reflect:!0,attribute:"hold-affordance"})],xe.prototype,"holdAffordance",void 0),c([et({type:Boolean,reflect:!0})],xe.prototype,"quiet",void 0),c([et({reflect:!0})],xe.prototype,"role",void 0),c([et({type:Boolean,reflect:!0})],xe.prototype,"selected",void 0),c([et({type:Boolean,reflect:!0})],xe.prototype,"toggles",void 0),c([et({type:String})],xe.prototype,"value",null),customElements.define("sp-action-button",xe);customElements.define("sp-icon-asterisk100",class extends kt{render(){return qt(_),zt`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" aria-hidden="true" fill="currentColor"><path d="M6.575 6.555c.055.056.092.13 0 .2l-1.149.741c-.092.056-.129.019-.166-.074L3.834 4.94 1.963 7c-.019.036-.074.073-.129 0l-.889-.927c-.093-.055-.074-.111 0-.166l2.111-1.76L.648 3.24c-.037 0-.092-.074-.056-.167l.63-1.259a.097.097 0 01.167-.036L3.5 3.148l.13-2.7a.1.1 0 01.081-.111.15.15 0 01.03 0l1.537.2c.093 0 .111.037.093.13l-.723 2.647 2.445-.741c.055-.037.111-.037.148.074l.241 1.37c.018.093 0 .13-.074.13l-2.556.2z"/></svg>`}});var fe=r`@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Asterisk75{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-75,var(--spectrum-global-dimension-static-size-100)
)}.spectrum-UIIcon-Asterisk100{height:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
);width:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
)}.spectrum-UIIcon-Asterisk200{height:var(--spectrum-alias-ui-icon-asterisk-size-200);width:var(
--spectrum-alias-ui-icon-asterisk-size-200
)}.spectrum-UIIcon-Asterisk300{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-300
)}`;var ye=r`:host([size=s]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-s-padding-top,var(--spectrum-global-dimension-size-50)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-s-padding-bottom,var(--spectrum-global-dimension-size-65)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-s-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-s-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-s-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-s-asterisk-gap,var(--spectrum-global-dimension-size-50)
)}:host([size=m]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-m-padding-top,var(--spectrum-global-dimension-size-50)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-m-padding-bottom,var(--spectrum-global-dimension-size-65)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-m-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-m-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-m-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-m-asterisk-gap,var(--spectrum-global-dimension-size-50)
)}:host([size=l]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-l-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-l-padding-bottom,var(--spectrum-global-dimension-size-115)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-l-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-l-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-l-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-l-asterisk-gap,var(--spectrum-global-dimension-size-65)
)}:host([size=xl]){--spectrum-fieldlabel-padding-top:var(
--spectrum-fieldlabel-xl-padding-top,var(--spectrum-global-dimension-size-115)
);--spectrum-fieldlabel-padding-bottom:var(
--spectrum-fieldlabel-xl-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-fieldlabel-text-size:var(
--spectrum-fieldlabel-xl-text-size,var(--spectrum-global-dimension-font-size-200)
);--spectrum-fieldlabel-text-font-weight:var(
--spectrum-fieldlabel-xl-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-fieldlabel-text-line-height:var(
--spectrum-fieldlabel-xl-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-fieldlabel-xl-asterisk-gap,var(--spectrum-global-dimension-size-65)
)}:host{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-smoothing:subpixel-antialiased;box-sizing:border-box;display:block;font-size:var(--spectrum-fieldlabel-text-size);font-weight:var(--spectrum-fieldlabel-text-font-weight);line-height:var(--spectrum-fieldlabel-text-line-height);padding-bottom:var(--spectrum-fieldlabel-padding-bottom);padding-left:0;padding-right:0;padding-top:var(--spectrum-fieldlabel-padding-top);vertical-align:top}:host([dir=ltr]) .required-icon{margin-left:var(
--spectrum-fieldlabel-asterisk-gap
);margin-right:0}:host([dir=rtl]) .required-icon{margin-left:0;margin-right:var(
--spectrum-fieldlabel-asterisk-gap
)}.required-icon{margin-bottom:0;margin-top:0}:host([dir=ltr][side-aligned=start]){padding-left:0;padding-right:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([dir=rtl][side-aligned=start]){padding-left:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
);padding-right:0}:host([side-aligned=start]){display:inline-block;padding-bottom:0;padding-top:var(
--spectrum-fieldlabel-m-side-padding-top,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr][side-aligned=start]) .required-icon{margin-left:var(
--spectrum-fieldlabel-asterisk-gap
);margin-right:0}:host([dir=rtl][side-aligned=start]) .required-icon{margin-left:0;margin-right:var(
--spectrum-fieldlabel-asterisk-gap
)}:host([side-aligned=start]) .required-icon{margin-bottom:0;margin-top:var(
--spectrum-fieldlabel-m-side-asterisk-margin-y,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr][side-aligned=end]){text-align:right}:host([dir=rtl][side-aligned=end]){text-align:left}:host([dir=ltr][side-aligned=end]){padding-left:0;padding-right:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([dir=rtl][side-aligned=end]){padding-left:var(
--spectrum-fieldlabel-m-side-padding-right,var(--spectrum-global-dimension-size-150)
);padding-right:0}:host([side-aligned=end]){display:inline-block;padding-bottom:0;padding-top:var(
--spectrum-fieldlabel-m-side-padding-top,var(--spectrum-global-dimension-size-100)
)}:host{color:var(
--spectrum-fieldlabel-m-text-color,var(--spectrum-alias-label-text-color)
)}:host([disabled]){color:var(
--spectrum-fieldlabel-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([disabled]) .required-icon{color:var(
--spectrum-fieldlabel-m-asterisk-color-disabled,var(--spectrum-alias-text-color-disabled)
)}.required-icon{color:var(
--spectrum-fieldlabel-m-asterisk-color,var(--spectrum-global-color-gray-600)
)}:host([side-aligned=start]) .required-icon{margin-top:0}`;class ke extends(at(st)){constructor(){super(...arguments),this.disabled=!1,this.id="",this.for="",this.required=!1}static get styles(){return[ye,fe]}handleClick(t){if(!this.target||this.disabled||t.defaultPrevented)return;this.target.focus();const e=this.getRootNode(),o=this.target,r=o.getRootNode(),i=r.host;r===e&&o.forceFocusVisible?o.forceFocusVisible():i&&i.forceFocusVisible&&i.forceFocusVisible()}async manageFor(){if(!this.for)return;const t=this.getRootNode(),e=t.querySelector(`#${this.for}`);if(e){if(e.localName.search("-")>0&&await customElements.whenDefined(e.localName),void 0!==e.updateComplete&&await e.updateComplete,this.target=e.focusElement||e,this.target){this.target.getRootNode()===t?this.target.setAttribute("aria-labelledby",this.id):this.target.setAttribute("aria-label",this.labelText)}return Promise.resolve()}}get labelText(){const t=this.slotEl.assignedNodes({flatten:!0});if(!t.length)return"";return t.map((t=>(t.textContent||"").trim())).join(" ")}render(){return _`<label><slot @slotchange="${this.manageFor}"></slot>${this.required?_`<sp-icon-asterisk100 class="required-icon spectrum-UIIcon-Asterisk100"></sp-icon-asterisk100>`:_``}</label>`}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${ke.instanceCount++}`),this.addEventListener("click",this.handleClick)}updated(t){super.updated(t),(t.has("for")||t.has("id"))&&this.manageFor()}}ke.instanceCount=0,c([et({type:Boolean,reflect:!0})],ke.prototype,"disabled",void 0),c([et({type:String})],ke.prototype,"id",void 0),c([et({type:String})],ke.prototype,"for",void 0),c([et({type:Boolean,reflect:!0})],ke.prototype,"required",void 0),c([rt("slot")],ke.prototype,"slotEl",void 0),c([et({type:String,reflect:!0,attribute:"side-aligned"})],ke.prototype,"sideAligned",void 0),customElements.define("sp-field-label",ke),customElements.define("sp-menu-item",St);var we=r`:host([size=s]){--spectrum-link-primary-text-size:var(
--spectrum-link-s-primary-text-size,var(--spectrum-global-dimension-font-size-75)
)}:host([size=m]){--spectrum-link-primary-text-size:var(
--spectrum-link-m-primary-text-size,var(--spectrum-global-dimension-font-size-100)
)}:host([size=l]){--spectrum-link-primary-text-size:var(
--spectrum-link-l-primary-text-size,var(--spectrum-global-dimension-font-size-200)
)}:host([size=xl]){--spectrum-link-primary-text-size:var(
--spectrum-link-xl-primary-text-size,var(--spectrum-global-dimension-font-size-300)
)}a{-webkit-text-decoration-skip:objects;background-color:transparent;cursor:pointer;font-size:var(--spectrum-link-primary-text-size);outline:0;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}a,a.focus-visible{text-decoration:underline}a.focus-visible{-webkit-text-decoration-style:double;text-decoration-style:double}a:focus-visible{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}:host([quiet]) a{text-decoration:none}:host([quiet]) a:hover{text-decoration:underline}a{color:var(
--spectrum-link-m-primary-text-color,var(--spectrum-global-color-blue-600)
)}a:hover{color:var(
--spectrum-link-m-primary-text-color-hover,var(--spectrum-global-color-blue-600)
)}a:active{color:var(
--spectrum-link-m-primary-text-color-down,var(--spectrum-global-color-blue-700)
)}a.focus-visible{color:var(
--spectrum-link-m-primary-text-color-key-focus,var(--spectrum-alias-text-color-key-focus)
)}a:focus-visible{color:var(
--spectrum-link-m-primary-text-color-key-focus,var(--spectrum-alias-text-color-key-focus)
)}:host([variant=secondary]) a{color:inherit}:host([variant=secondary]) a:hover{color:inherit}:host([variant=secondary]) a:active{color:inherit}:host([variant=secondary]) a:focus{color:inherit}:host([over-background]) a{color:var(
--spectrum-link-m-primary-overbackground-text-color,var(--spectrum-alias-text-color-overbackground)
)}:host([over-background]) a:hover{color:var(
--spectrum-link-m-primary-overbackground-text-color-hover,var(--spectrum-alias-text-color-overbackground)
)}:host([over-background]) a:active{color:var(
--spectrum-link-m-primary-overbackground-text-color-down,var(--spectrum-alias-text-color-overbackground)
)}:host([over-background]) a:focus{color:var(
--spectrum-link-m-primary-overbackground-text-color-key-focus,var(--spectrum-alias-text-color-overbackground)
)}@media (forced-colors:active){:host([variant=secondary]) a{color:linktext}:host([variant=secondary]) a:hover{color:linktext}:host([variant=secondary]) a:active{color:linktext}:host([variant=secondary]) a:focus{color:linktext}}:host{display:inline}:host(:focus){outline:0}:host([href]) a.focus-visible{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}:host([href]) a:focus-visible{text-decoration:underline;-webkit-text-decoration-style:double;text-decoration-style:double}`;class ze extends(at(Ct(xt),{noDefaultSize:!0})){static get styles(){return[we]}get focusElement(){return this.anchorElement}render(){return this.renderAnchor({id:"anchor"})}}c([rt("#anchor")],ze.prototype,"anchorElement",void 0),c([et({type:String,reflect:!0})],ze.prototype,"variant",void 0),customElements.define("sp-link",ze);var qe=r`:host([size=s]){--spectrum-divider-height:var(
--spectrum-divider-s-height,var(--spectrum-global-dimension-size-10)
);--spectrum-divider-vertical-height:var(
--spectrum-divider-s-vertical-height,var(--spectrum-global-dimension-size-10)
);--spectrum-divider-vertical-width:var(
--spectrum-divider-s-vertical-width,var(--spectrum-global-dimension-size-10)
)}:host([size=m]){--spectrum-divider-height:var(
--spectrum-divider-m-height,var(--spectrum-global-dimension-size-25)
);--spectrum-divider-vertical-height:var(
--spectrum-divider-m-vertical-height,var(--spectrum-global-dimension-size-25)
);--spectrum-divider-vertical-width:var(
--spectrum-divider-m-vertical-width,var(--spectrum-global-dimension-size-25)
)}:host([size=l]){--spectrum-divider-height:var(
--spectrum-divider-l-height,var(--spectrum-global-dimension-size-50)
);--spectrum-divider-vertical-height:var(
--spectrum-divider-l-vertical-height,var(--spectrum-global-dimension-size-50)
);--spectrum-divider-vertical-width:var(
--spectrum-divider-l-vertical-width,var(--spectrum-global-dimension-size-50)
)}:host{--spectrum-divider-vertical-height:100%}:host{border-width:medium;border:var(--spectrum-divider-height);border-radius:var(--spectrum-divider-height);height:var(--spectrum-divider-height);overflow:visible;width:100%}:host([vertical]){height:var(
--spectrum-divider-vertical-height
);width:var(--spectrum-divider-vertical-width)}:host{--spectrum-divider-l-background-color:var(
--spectrum-global-color-gray-800
);--spectrum-divider-m-background-color:var(
--spectrum-global-color-gray-300
);--spectrum-divider-s-background-color:var(
--spectrum-global-color-gray-300
)}:host([size=l]){background-color:var(
--spectrum-divider-l-background-color,var(--spectrum-global-color-gray-800)
)}:host([size=m]){background-color:var(
--spectrum-divider-m-background-color,var(--spectrum-global-color-gray-300)
)}:host([size=s]){background-color:var(
--spectrum-divider-s-background-color,var(--spectrum-global-color-gray-300)
)}:host{display:block}hr{border:none;margin:0}`;class Be extends(at(st,{validSizes:["s","m","l"]})){constructor(){super(...arguments),this.vertical=!1}render(){return _``}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","separator")}updated(t){super.updated(t),t.has("vertical")&&(this.vertical?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation"))}}Be.styles=[qe],c([et({type:Boolean,reflect:!0})],Be.prototype,"vertical",void 0),customElements.define("sp-divider",Be),customElements.define("sp-clear-button",pe);customElements.define("sp-icon-info",class extends kt{render(){return It(_),(({width:t=24,height:e=24,hidden:o=!1,title:r="Info"}={})=>At`<svg xmlns="http://www.w3.org/2000/svg" height="${e}" viewBox="0 0 36 36" width="${t}" aria-hidden="${o?"true":"false"}" role="img" fill="currentColor" aria-label="${r}"><path d="M18 2a16 16 0 1016 16A16 16 0 0018 2zm-.3 4.3a2.718 2.718 0 012.864 2.824 2.664 2.664 0 01-2.864 2.863 2.705 2.705 0 01-2.864-2.864A2.717 2.717 0 0117.7 6.3zM22 27a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2a1 1 0 011-1h1v-6h-1a1 1 0 01-1-1v-2a1 1 0 011-1h4a1 1 0 011 1v9h1a1 1 0 011 1z"/></svg>`)({hidden:!this.label,title:this.label})}});customElements.define("sp-icon-checkmark-circle",class extends kt{render(){return It(_),(({width:t=24,height:e=24,hidden:o=!1,title:r="Checkmark Circle"}={})=>At`<svg xmlns="http://www.w3.org/2000/svg" height="${e}" viewBox="0 0 36 36" width="${t}" aria-hidden="${o?"true":"false"}" role="img" fill="currentColor" aria-label="${r}"><path d="M18 2a16 16 0 1016 16A16 16 0 0018 2zm10.666 9.08L16.018 27.341a1.206 1.206 0 01-.875.461h-.073a1.2 1.2 0 01-.849-.351l-7.785-7.793a1.2 1.2 0 010-1.7l1.326-1.325a1.2 1.2 0 011.7 0l5.338 5.349L25.314 8.473A1.2 1.2 0 0127 8.263L28.455 9.4a1.2 1.2 0 01.211 1.68z"/></svg>`)({hidden:!this.label,title:this.label})}});var Ae=r`:host{--spectrum-toast-icon-padding-y:var(
--spectrum-global-dimension-size-85
);--spectrum-toast-neutral-content-padding-top:var(
--spectrum-global-dimension-size-65
);--spectrum-toast-content-padding-bottom:var(
--spectrum-global-dimension-size-65
);--spectrum-toast-button-margin-right:var(
--spectrum-global-dimension-size-130
)}:host([dir=ltr]){padding-right:var(
--spectrum-toast-neutral-padding-right,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]){padding-left:var(
--spectrum-toast-neutral-padding-right,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr]){padding-left:var(
--spectrum-toast-neutral-padding-left,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]){padding-right:var(
--spectrum-toast-neutral-padding-left,var(--spectrum-global-dimension-size-200)
)}:host{-webkit-font-smoothing:antialiased;align-items:stretch;border-radius:var(
--spectrum-toast-neutral-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;display:inline-flex;flex-direction:row;font-size:var(
--spectrum-toast-neutral-text-size,var(--spectrum-global-dimension-font-size-100)
);font-weight:var(
--spectrum-toast-neutral-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);padding-bottom:var(
--spectrum-toast-neutral-padding-y,var(--spectrum-global-dimension-size-100)
);padding-top:var(
--spectrum-toast-neutral-padding-y,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr]) .type{margin-right:var(
--spectrum-toast-neutral-icon-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([dir=rtl]) .type{margin-left:var(
--spectrum-toast-neutral-icon-padding-right,var(--spectrum-global-dimension-size-150)
)}:host([dir=ltr]) .type{margin-left:0}:host([dir=rtl]) .type{margin-right:0}.type{flex-grow:0;flex-shrink:0;margin-bottom:var(--spectrum-toast-icon-padding-y);margin-top:var(--spectrum-toast-icon-padding-y)}:host([dir=ltr]) .content{padding-right:var(
--spectrum-toast-neutral-content-padding-right,var(--spectrum-global-dimension-size-200)
)}:host([dir=rtl]) .content{padding-left:var(
--spectrum-toast-neutral-content-padding-right,var(--spectrum-global-dimension-size-200)
)}:host([dir=ltr]) .content{padding-left:0}:host([dir=rtl]) .content{padding-right:0}:host([dir=ltr]) .content{text-align:left}:host([dir=rtl]) .content{text-align:right}.content{box-sizing:border-box;display:inline-block;flex:1 1 auto;font-size:var(
--spectrum-toast-info-text-size,var(--spectrum-global-dimension-font-size-100)
);font-weight:var(
--spectrum-toast-info-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);line-height:var(
--spectrum-toast-info-text-line-height,var(--spectrum-alias-component-text-line-height)
);padding-bottom:var(--spectrum-toast-content-padding-bottom);padding-top:var(
--spectrum-toast-neutral-content-padding-top,var(--spectrum-global-dimension-size-65)
)}.buttons{align-items:flex-start;display:flex;flex:0 0 auto}:host([dir=ltr]) .buttons .spectrum-ClearButton+.spectrum-ClearButton,:host([dir=ltr]) .buttons .spectrum-ClearButton+::slotted([slot=action]),:host([dir=ltr]) .buttons slot[name=action]+.spectrum-ClearButton,:host([dir=ltr]) .buttons slot[name=action]+::slotted([slot=action]){margin-left:var(
--spectrum-toast-neutral-button-gap-x,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) .buttons .spectrum-ClearButton+.spectrum-ClearButton,:host([dir=rtl]) .buttons .spectrum-ClearButton+::slotted([slot=action]),:host([dir=rtl]) .buttons slot[name=action]+.spectrum-ClearButton,:host([dir=rtl]) .buttons slot[name=action]+::slotted([slot=action]){margin-right:var(
--spectrum-toast-neutral-button-gap-x,var(--spectrum-global-dimension-size-100)
)}.body{align-self:center;flex:1 1 auto}:host([dir=ltr]) .body ::slotted([slot=action]){float:right}:host([dir=rtl]) .body ::slotted([slot=action]){float:left}:host([dir=ltr]) .body ::slotted([slot=action]){margin-right:var(
--spectrum-toast-button-margin-right
)}:host([dir=rtl]) .body ::slotted([slot=action]){margin-left:var(
--spectrum-toast-button-margin-right
)}:host([dir=ltr]) .body+.buttons{padding-left:var(
--spectrum-toast-neutral-padding-right,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) .body+.buttons{padding-right:var(
--spectrum-toast-neutral-padding-right,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr]) .body+.buttons{border-left-width:1px}:host([dir=rtl]) .body+.buttons{border-right-width:1px}:host([dir=ltr]) .body+.buttons{border-left-style:solid}:host([dir=rtl]) .body+.buttons{border-right-style:solid}:host{background-color:var(
--spectrum-toast-neutral-background-color,var(--spectrum-semantic-neutral-background-color-default)
);color:var(
--spectrum-toast-neutral-background-color,var(--spectrum-semantic-neutral-background-color-default)
)}.content{color:var(
--spectrum-toast-neutral-text-color,var(--spectrum-global-color-static-white)
)}.type{color:#fff}:host([dir=ltr]) .buttons{border-left-color:hsla(0,0%,100%,.2)}:host([dir=rtl]) .buttons{border-right-color:hsla(0,0%,100%,.2)}:host([variant=error]),:host([variant=negative]){background-color:var(
--spectrum-toast-negative-background-color,var(--spectrum-semantic-negative-background-color)
);color:var(
--spectrum-toast-negative-background-color,var(--spectrum-semantic-negative-background-color)
)}:host([variant=error]) .closeButton.focus-visible:not(:active),:host([variant=negative]) .closeButton.focus-visible:not(:active){color:var(
--spectrum-toast-negative-background-color,var(--spectrum-semantic-negative-background-color)
)}:host([variant=error]) .closeButton:focus-visible:not(:active),:host([variant=negative]) .closeButton:focus-visible:not(:active){color:var(
--spectrum-toast-negative-background-color,var(--spectrum-semantic-negative-background-color)
)}:host([variant=info]){background-color:var(
--spectrum-toast-info-background-color,var(--spectrum-semantic-informative-background-color)
);color:var(
--spectrum-toast-info-background-color,var(--spectrum-semantic-informative-background-color)
)}:host([variant=info]) .closeButton.focus-visible:not(:active){color:var(
--spectrum-toast-info-background-color,var(--spectrum-semantic-informative-background-color)
)}:host([variant=info]) .closeButton:focus-visible:not(:active){color:var(
--spectrum-toast-info-background-color,var(--spectrum-semantic-informative-background-color)
)}:host([variant=positive]),:host([variant=success]){background-color:var(
--spectrum-toast-positive-background-color,var(--spectrum-semantic-positive-background-color)
);color:var(
--spectrum-toast-positive-background-color,var(--spectrum-semantic-positive-background-color)
)}:host([variant=positive]) .closeButton.focus-visible:not(:active),:host([variant=success]) .closeButton.focus-visible:not(:active){color:var(
--spectrum-toast-positive-background-color,var(--spectrum-semantic-positive-background-color)
)}:host([variant=positive]) .closeButton:focus-visible:not(:active),:host([variant=success]) .closeButton:focus-visible:not(:active){color:var(
--spectrum-toast-positive-background-color,var(--spectrum-semantic-positive-background-color)
)}.content{line-height:1.5}:host(:not([open])){display:none}`;const Ie=["negative","positive","info","error","warning"];class Ce extends st{constructor(){super(...arguments),this.open=!1,this._timeout=null,this._variant="",this.countdownStart=0,this.nextCount=-1,this.doCountdown=t=>{this.countdownStart||(this.countdownStart=performance.now()),t-this.countdownStart>this._timeout?(this.shouldClose(),this.countdownStart=0):this.countdown()},this.countdown=()=>{cancelAnimationFrame(this.nextCount),this.nextCount=requestAnimationFrame(this.doCountdown)},this.holdCountdown=()=>{this.stopCountdown(),this.addEventListener("focusout",this.resumeCountdown)},this.resumeCountdown=()=>{this.removeEventListener("focusout",this.holdCountdown),this.countdown()}}static get styles(){return[Ae]}set timeout(t){const e=null!==typeof t&&t>0?Math.max(6e3,t):null,o=this.timeout;e&&this.countdownStart&&(this.countdownStart=performance.now()),this._timeout=e,this.requestUpdate("timeout",o)}get timeout(){return this._timeout}set variant(t){if(t===this.variant)return;const e=this.variant;Ie.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",e)}get variant(){return this._variant}renderIcon(t){switch(t){case"info":return _`<sp-icon-info label="Information" class="type"></sp-icon-info>`;case"negative":case"error":case"warning":return _`<sp-icon-alert label="Error" class="type"></sp-icon-alert>`;case"positive":case"success":return _`<sp-icon-checkmark-circle label="Success" class="type"></sp-icon-checkmark-circle>`;default:return _``}}startCountdown(){this.countdown(),this.addEventListener("focusin",this.holdCountdown)}stopCountdown(){cancelAnimationFrame(this.nextCount),this.countdownStart=0}shouldClose(){this.dispatchEvent(new CustomEvent("close",{composed:!0,bubbles:!0,cancelable:!0}))&&this.close()}close(){this.open=!1}render(){return _`${this.renderIcon(this.variant)}<div class="body" role="alert"><div class="content"><slot></slot></div><slot name="action"></slot></div><div class="buttons"><sp-clear-button label="Close" variant="overBackground" @click="${this.shouldClose}"></sp-clear-button></div>`}updated(t){super.updated(t),t.has("open")&&(this.open?this.timeout&&this.startCountdown():this.timeout&&this.stopCountdown()),t.has("timeout")&&(null!==this.timeout&&this.open?this.startCountdown():this.stopCountdown())}}c([et({type:Boolean,reflect:!0})],Ce.prototype,"open",void 0),c([et({type:Number})],Ce.prototype,"timeout",null),c([et({type:String})],Ce.prototype,"variant",null),customElements.define("sp-toast",Ce);export{ft as A,gt as F,kt as I,Ct as L,Pt as M,ee as O,ie as P,Y as R,st as S,L as T,c as _,ut as a,dt as b,lt as c,it as d,et as e,Wt as f,xt as g,ht as h,rt as i,zt as j,qt as k,nt as l,at as m,J as n,oe as o,Tt as p,Qt as q,me as r,It as s,At as t,Dt as u,U as v,i as w,S as x,_ as y,mt as z};
//# sourceMappingURL=fe774044.js.map
