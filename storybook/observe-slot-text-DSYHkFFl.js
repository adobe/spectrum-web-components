import { t as t$1 } from './mutation-controller-D2lT1xZk.js';
import { n } from './define-element-ByMWMcVd.js';
import { n as n$1 } from './query-assigned-nodes-DAYI4epk.js';

var g=Object.defineProperty;var u=(c,e,s,o)=>{for(var t=void 0,l=c.length-1,a;l>=0;l--)(a=c[l])&&(t=(a(e,s,t))||t);return t&&g(e,s,t),t};const p=Symbol("assignedNodes");function ObserveSlotText(c,e,s=[]){var l;const o=a=>f=>a.matches(f);class t extends c{constructor(...n){super(n);this.slotHasContent=!1;new t$1(this,{config:{characterData:!0,subtree:!0},callback:d=>{for(const r of d)if(r.type==="characterData"){this.manageTextObservedSlot();return}}});}manageTextObservedSlot(){if(!this[p])return;const n=[...this[p]].filter(d=>{const r=d;return r.tagName?!s.some(o(r)):r.textContent?r.textContent.trim():!1});this.slotHasContent=n.length>0;}update(n){if(!this.hasUpdated){const{childNodes:d}=this,r=[...d].filter(m=>{const i=m;return i.tagName?s.some(o(i))?!1:e?i.getAttribute("slot")===e:!i.hasAttribute("slot"):i.textContent?i.textContent.trim():!1});this.slotHasContent=r.length>0;}super.update(n);}firstUpdated(n){super.firstUpdated(n),this.updateComplete.then(()=>{this.manageTextObservedSlot();});}}return l=p,u([n({type:Boolean,attribute:!1})],t.prototype,"slotHasContent"),u([n$1({slot:e,flatten:!0})],t.prototype,l),t}

export { ObserveSlotText as O };
