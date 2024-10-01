import { t as t$1 } from './mutation-controller-D2lT1xZk.js';
import { n } from './define-element-C_3bgzm7.js';
import { n as n$1 } from './query-assigned-nodes-DAYI4epk.js';

var h=Object.defineProperty;var u=(c,e,s,o)=>{for(var t=void 0,a=c.length-1,i;a>=0;a--)(i=c[a])&&(t=(i(e,s,t))||t);return t&&h(e,s,t),t};const p=Symbol("assignedNodes");function ObserveSlotText(c,e,s=[]){var a,i;const o=f=>m=>f.matches(m);class t extends(i=c,a=p,i){constructor(...n){super(n);this.slotHasContent=!1;new t$1(this,{config:{characterData:!0,subtree:!0},callback:d=>{for(const r of d)if(r.type==="characterData"){this.manageTextObservedSlot();return}}});}manageTextObservedSlot(){if(!this[p])return;const n=[...this[p]].filter(d=>{const r=d;return r.tagName?!s.some(o(r)):r.textContent?r.textContent.trim():!1});this.slotHasContent=n.length>0;}update(n){if(!this.hasUpdated){const{childNodes:d}=this,r=[...d].filter(g=>{const l=g;return l.tagName?s.some(o(l))?!1:e?l.getAttribute("slot")===e:!l.hasAttribute("slot"):l.textContent?l.textContent.trim():!1});this.slotHasContent=r.length>0;}super.update(n);}firstUpdated(n){super.firstUpdated(n),this.updateComplete.then(()=>{this.manageTextObservedSlot();});}}return u([n({type:Boolean,attribute:!1})],t.prototype,"slotHasContent"),u([n$1({slot:e,flatten:!0})],t.prototype,a),t}

export { ObserveSlotText as O };
