import { n as n$1 } from './define-element-e64f5ea4.js';
import { o } from './base-511c8c11.js';

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;const e=null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));function l(n){const{slot:l,selector:t}=null!=n?n:{};return o({descriptor:o=>({get(){var o;const r="slot"+(l?`[name=${l}]`:":not([name])"),i=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(r),s=null!=i?e(i,n):[];return t?s.filter((o=>o.matches(t))):s},enumerable:!0,configurable:!0})})}

var a=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var m=(n,i,s,t)=>{for(var e=t>1?void 0:t?u(i,s):i,l=n.length-1,o;l>=0;l--)(o=n[l])&&(e=(t?o(i,s,e):o(e))||e);return t&&e&&a(i,s,e),e};const ElementSizes={xxs:"xxs",xs:"xs",s:"s",m:"m",l:"l",xl:"xl",xxl:"xxl"};function SizedMixin(n,{validSizes:i=["s","m","l","xl"],noDefaultSize:s,defaultSize:t="m"}={}){class e extends n{constructor(){super(...arguments);this._size=t;}get size(){return this._size||t}set size(r){const c=s?null:t,z=r&&r.toLocaleLowerCase(),x=i.includes(z)?z:c;if(x&&this.setAttribute("size",x),this._size===x)return;const p=this._size;this._size=x,this.requestUpdate("size",p);}update(r){!this.hasAttribute("size")&&!s&&this.setAttribute("size",this.size),super.update(r);}}return m([n$1({type:String,reflect:!0})],e.prototype,"size",1),e}

export { ElementSizes as E, SizedMixin as S, l };
