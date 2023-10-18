import { M as ManageHelpText } from './manage-help-text-39f4c7ea.js';
import { i } from './lit-element-9354aa77.js';
import { x } from './lit-html-126adc72.js';
import { n as n$1, S as SpectrumElement } from './define-element-e64f5ea4.js';

const o=i`
:host{--spectrum-fieldgroup-margin:var(--spectrum-spacing-300);--spectrum-fieldgroup-readonly-delimiter:","}.spectrum-FieldGroup--toplabel{flex-direction:column}.spectrum-FieldGroup--sidelabel{flex-direction:row}.group{display:flex;flex-flow:column wrap}:host([vertical]) .group{flex-direction:column}:host([horizontal]) .group{flex-direction:row}:host([horizontal]) .group slot:not([name])::slotted(:not(:last-child)){margin-inline-end:var(--spectrum-fieldgroup-margin)}:host([horizontal]) .group .spectrum-HelpText{flex-basis:100%}:host([dir=rtl]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=rtl]) slot:not([name])::slotted(:not(:last-child)){margin:0 0 0 var(--spectrum-fieldgroup-margin)}:host([dir=ltr]:not([vertical])) slot:not([name])::slotted(:not(:last-child)),:host([horizontal][dir=ltr]) slot:not([name])::slotted(:not(:last-child)){margin:0 var(--spectrum-fieldgroup-margin) 0 0}
`;var m = o;

var n=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var l=(o,r,t,a)=>{for(var e=a>1?void 0:a?u(r,t):r,s=o.length-1,p;s>=0;s--)(p=o[s])&&(e=(a?p(r,t,e):p(e))||e);return a&&e&&n(r,t,e),e};class FieldGroup extends ManageHelpText(SpectrumElement,{mode:"external"}){constructor(){super(...arguments);this.horizontal=!1;this.invalid=!1;this.label="";this.vertical=!1;}static get styles(){return [m]}handleSlotchange(){}render(){return x`
            <div class="group" role="presentation">
                <slot @slotchange=${this.handleSlotchange}></slot>
            </div>
            ${this.renderHelpText(this.invalid)}
        `}updated(t){super.updated(t),t.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"));}}l([n$1({type:Boolean,reflect:!0})],FieldGroup.prototype,"horizontal",2),l([n$1({type:Boolean,reflect:!0})],FieldGroup.prototype,"invalid",2),l([n$1()],FieldGroup.prototype,"label",2),l([n$1({type:Boolean,reflect:!0})],FieldGroup.prototype,"vertical",2);

export { FieldGroup as F };
