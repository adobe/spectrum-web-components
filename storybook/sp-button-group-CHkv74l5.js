import { i } from './lit-element-BulMEkr1.js';
import { S as SizedMixin } from './sizedMixin-DUWGHsWj.js';
import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-C4UuMSqY.js';
import { x } from './lit-html-COgVUehj.js';
import { e } from './query-DQF6X5qW.js';

const o=i`
    :host{--spectrum-buttongroup-spacing:var(--mod-buttongroup-spacing,var(--mod-buttongroup-spacing-horizontal,var(--spectrum-spacing-300)));--spectrum-buttongroup-display:flex;--spectrum-buttongroup-flex-direction:row;--spectrum-buttongroup-justify-content:var(--mod-buttongroup-justify-content,normal)}:host([size=s]){--spectrum-buttongroup-spacing:var(--mod-buttongroup-spacing,var(--mod-buttongroup-spacing-horizontal,var(--spectrum-spacing-200)))}:host([vertical]){--mod-buttongroup-spacing:var(--mod-buttongroup-spacing-vertical);--spectrum-buttongroup-display:inline-flex;--spectrum-buttongroup-flex-direction:column}:host{display:var(--spectrum-buttongroup-display);flex-direction:var(--spectrum-buttongroup-flex-direction);gap:var(--spectrum-buttongroup-spacing);justify-content:var(--spectrum-buttongroup-justify-content);flex-wrap:wrap}::slotted(*){flex-shrink:0}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}
`;

var a=Object.defineProperty;var n=(s,r,e,l)=>{for(var t=void 0,o=s.length-1,i;o>=0;o--)(i=s[o])&&(t=(i(r,e,t))||t);return t&&a(r,e,t),t};class ButtonGroup extends SizedMixin(SpectrumElement,{noDefaultSize:!0}){constructor(){super(...arguments);this.vertical=!1;}static get styles(){return [o]}updated(e){super.updated(e),e.has("size")&&this.manageChildrenSize(this.slotElement);}handleSlotchange({target:e}){this.manageChildrenSize(e);}manageChildrenSize(e){e.assignedElements().forEach(t=>{t.size=this.size;});}render(){return x`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}}n([n$1({type:Boolean,reflect:!0})],ButtonGroup.prototype,"vertical"),n([e("slot")],ButtonGroup.prototype,"slotElement");

defineElement("sp-button-group",ButtonGroup);
