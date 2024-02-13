import { M as ManageHelpText } from './manage-help-text-kfeeNmRL.js';
import { i } from './lit-element-xBOPiTek.js';
import { x } from './lit-html-GmIhAbMP.js';
import { n, S as SpectrumElement } from './define-element-UHExAFdK.js';

const o=i`
:host{--spectrum-fieldgroup-margin:var(--spectrum-spacing-300);--spectrum-fieldgroup-readonly-delimiter:","}.spectrum-FieldGroup--toplabel{flex-direction:column}.spectrum-FieldGroup--sidelabel{flex-direction:row}.group{display:flex;flex-flow:column wrap}:host([vertical]) .group{flex-direction:column}:host([horizontal]) .group{flex-direction:row}:host([horizontal]) .group slot:not([name])::slotted(:not(:last-child)){margin-inline-end:var(--spectrum-fieldgroup-margin)}:host([horizontal]) .group .spectrum-HelpText{flex-basis:100%}:host([dir=rtl]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=rtl]) slot:not([name])::slotted(:not(:last-child)){margin:0 0 0 var(--spectrum-fieldgroup-margin)}:host([dir=ltr]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=ltr]) slot:not([name])::slotted(:not(:last-child)){margin:0 var(--spectrum-fieldgroup-margin) 0 0}
`;var b = o;

var d=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var l=(o,r,e,a)=>{for(var t=a>1?void 0:a?u(r,e):r,s=o.length-1,p;s>=0;s--)(p=o[s])&&(t=(a?p(r,e,t):p(t))||t);return a&&t&&d(r,e,t),t};class FieldGroup extends ManageHelpText(SpectrumElement,{mode:"external"}){constructor(){super(...arguments);this.horizontal=!1;this.invalid=!1;this.label="";this.vertical=!1;}static get styles(){return [b]}handleSlotchange(){}render(){return x`
            <div class="group" role="presentation">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
            ${this.renderHelpText(this.invalid)}
        `}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","group");}updated(e){super.updated(e),e.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"));}}l([n({type:Boolean,reflect:!0})],FieldGroup.prototype,"horizontal",2),l([n({type:Boolean,reflect:!0})],FieldGroup.prototype,"invalid",2),l([n()],FieldGroup.prototype,"label",2),l([n({type:Boolean,reflect:!0})],FieldGroup.prototype,"vertical",2);

export { FieldGroup as F };
