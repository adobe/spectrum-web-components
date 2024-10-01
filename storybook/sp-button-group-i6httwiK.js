import { i as i$1 } from './lit-element-BulMEkr1.js';
import { S as SizedMixin } from './sizedMixin-BzkTbMb8.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';

const o=i$1`
    :host{--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-300);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host([size=s]){--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-200);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-200)}:host([size=l]),:host,:host([size=xl]){--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-300);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host{gap:var(--mod-buttongroup-spacing-horizontal,var(--spectrum-buttongroup-spacing-horizontal));justify-content:var(--mod-buttongroup-justify-content,normal);flex-wrap:wrap;display:flex}::slotted(*){flex-shrink:0}:host([vertical]){gap:var(--mod-buttongroup-spacing-vertical,var(--spectrum-buttongroup-spacing-vertical));flex-direction:column;display:inline-flex}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}
`;

var i=Object.defineProperty;var a=(o,t,r,s)=>{for(var e=void 0,l=o.length-1,n;l>=0;l--)(n=o[l])&&(e=(n(t,r,e))||e);return e&&i(t,r,e),e};class ButtonGroup extends SizedMixin(SpectrumElement,{noDefaultSize:!0}){constructor(){super(...arguments);this.vertical=!1;}static get styles(){return [o]}handleSlotchange({target:r}){r.assignedElements().forEach(e=>{e.size=this.size;});}render(){return x`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}}a([n({type:Boolean,reflect:!0})],ButtonGroup.prototype,"vertical");

defineElement("sp-button-group",ButtonGroup);
