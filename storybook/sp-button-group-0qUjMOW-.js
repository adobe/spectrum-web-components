import { i as i$1 } from './lit-element-xBOPiTek.js';
import { S as SizedMixin } from './sizedMixin-IBQibr2z.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-z6bXN_P5.js';
import { x } from './lit-html-GmIhAbMP.js';

const o=i$1`
    :host([size=s]){--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-200);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-200)}:host,:host([size=l]),:host([size=xl]){--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-300);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host{gap:var(--mod-buttongroup-spacing-horizontal,var(--spectrum-buttongroup-spacing-horizontal));justify-content:var(--mod-buttongroup-justify-content,normal);flex-wrap:wrap;display:flex}::slotted(*){flex-shrink:0}:host([vertical]){gap:var(--mod-buttongroup-spacing-vertical,var(--spectrum-buttongroup-spacing-vertical));flex-direction:column;display:inline-flex}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}
`;var S = o;

var i=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var a=(o,t,r,s)=>{for(var e=s>1?void 0:s?m(t,r):t,l=o.length-1,n;l>=0;l--)(n=o[l])&&(e=(s?n(t,r,e):n(e))||e);return s&&e&&i(t,r,e),e};class ButtonGroup extends SizedMixin(SpectrumElement,{noDefaultSize:!0}){constructor(){super(...arguments);this.vertical=!1;}static get styles(){return [S]}handleSlotchange({target:r}){r.assignedElements().forEach(e=>{e.size=this.size;});}render(){return x`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `}}a([n({type:Boolean,reflect:!0})],ButtonGroup.prototype,"vertical",2);

defineElement("sp-button-group",ButtonGroup);
