import { i } from './lit-element-BulMEkr1.js';
import { S as SizedMixin } from './sizedMixin-D4VoaNlz.js';
import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-2VgsDjbW.js';
import { x } from './lit-html-COgVUehj.js';
import { e } from './query-DQF6X5qW.js';

const o=i`
    :host{gap:var(--mod-buttongroup-spacing-horizontal,var(--spectrum-buttongroup-spacing-horizontal));justify-content:normal;justify-content:var(--mod-buttongroup-justify-content,normal);flex-wrap:wrap;display:flex}::slotted(*){flex-shrink:0}:host([vertical]){gap:var(--mod-buttongroup-spacing-vertical,var(--spectrum-buttongroup-spacing-vertical));flex-direction:column;display:inline-flex}:host{--spectrum-buttongroup-spacing-horizontal:var(--system-button-group-spacing-horizontal);--spectrum-buttongroup-spacing-vertical:var(--system-button-group-spacing-vertical)}:host([size=s]){--spectrum-buttongroup-spacing-horizontal:var(--system-button-group-size-s-spacing-horizontal);--spectrum-buttongroup-spacing-vertical:var(--system-button-group-size-s-spacing-vertical)}:host{--spectrum-buttongroup-spacing-horizontal:var(--system-button-group-size-m-spacing-horizontal);--spectrum-buttongroup-spacing-vertical:var(--system-button-group-size-m-spacing-vertical)}:host([size=l]){--spectrum-buttongroup-spacing-horizontal:var(--system-button-group-size-l-spacing-horizontal);--spectrum-buttongroup-spacing-vertical:var(--system-button-group-size-l-spacing-vertical)}:host([size=xl]){--spectrum-buttongroup-spacing-horizontal:var(--system-button-group-size-xl-spacing-horizontal);--spectrum-buttongroup-spacing-vertical:var(--system-button-group-size-xl-spacing-vertical)}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}
`;

var a=Object.defineProperty;var n=(s,r,e,l)=>{for(var t=void 0,o=s.length-1,i;o>=0;o--)(i=s[o])&&(t=(i(r,e,t))||t);return t&&a(r,e,t),t};class ButtonGroup extends SizedMixin(SpectrumElement,{noDefaultSize:!0}){constructor(){super(...arguments);this.vertical=!1;}static get styles(){return [o]}updated(e){super.updated(e),e.has("size")&&this.manageChildrenSize(this.slotElement);}handleSlotchange({target:e}){this.manageChildrenSize(e);}manageChildrenSize(e){e.assignedElements().forEach(t=>{t.size=this.size;});}render(){return x`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}}n([n$1({type:Boolean,reflect:!0})],ButtonGroup.prototype,"vertical"),n([e("slot")],ButtonGroup.prototype,"slotElement");

defineElement("sp-button-group",ButtonGroup);
