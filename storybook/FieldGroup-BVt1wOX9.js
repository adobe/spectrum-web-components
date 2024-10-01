import { M as ManageHelpText } from './manage-help-text-83_bseGo.js';
import { i } from './lit-element-BulMEkr1.js';
import { x } from './lit-html-COgVUehj.js';
import { n, S as SpectrumElement } from './define-element-C_3bgzm7.js';

const o=i`
    .group{--spectrum-fieldgroup-margin:var(--spectrum-spacing-300);--spectrum-fieldgroup-readonly-delimiter:",";flex-flow:column wrap;display:flex}.spectrum-FieldGroup--toplabel{flex-direction:column}.spectrum-FieldGroup--sidelabel{flex-direction:row}.group{flex-flow:column wrap;display:flex}:host([vertical]) .group{flex-direction:column}:host([horizontal]) .group{flex-direction:row}:host([horizontal]) .group slot:not([name])::slotted(:not(:last-child)){margin-inline-end:var(--spectrum-fieldgroup-margin)}:host([horizontal]) .group .spectrum-HelpText{flex-basis:100%}:host([horizontal][dir=rtl]) slot:not([name])::slotted(:not(:last-child)),:host([dir=rtl]:not([vertical])) slot:not([name])::slotted(:not(:last-child)){margin:0 0 0 var(--spectrum-fieldgroup-margin)}:host([horizontal][dir=ltr]) slot:not([name])::slotted(:not(:last-child)),:host([dir=ltr]:not([vertical])) slot:not([name])::slotted(:not(:last-child)){margin:0 var(--spectrum-fieldgroup-margin)0 0}
`;

var d=Object.defineProperty;var l=(o,r,e,a)=>{for(var t=void 0,s=o.length-1,p;s>=0;s--)(p=o[s])&&(t=(p(r,e,t))||t);return t&&d(r,e,t),t};class FieldGroup extends ManageHelpText(SpectrumElement,{mode:"external"}){constructor(){super(...arguments);this.horizontal=!1;this.invalid=!1;this.label="";this.vertical=!1;}static get styles(){return [o]}handleSlotchange(){}render(){return x`
            <div class="group" role="presentation">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
            ${this.renderHelpText(this.invalid)}
        `}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","group");}updated(e){super.updated(e),e.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"));}}l([n({type:Boolean,reflect:!0})],FieldGroup.prototype,"horizontal"),l([n({type:Boolean,reflect:!0})],FieldGroup.prototype,"invalid"),l([n()],FieldGroup.prototype,"label"),l([n({type:Boolean,reflect:!0})],FieldGroup.prototype,"vertical");

export { FieldGroup as F };
