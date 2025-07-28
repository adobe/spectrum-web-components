"use strict";var d=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var r=(n,s,e,c)=>{for(var i=c>1?void 0:c?m(s,e):s,l=n.length-1,o;l>=0;l--)(o=n[l])&&(i=(c?o(s,e,i):o(i))||i);return c&&i&&d(s,e,i),i};import{html as t,SizedMixin as u,SpectrumElement as p}from"@spectrum-web-components/base";import{property as a}from"@spectrum-web-components/base/src/decorators.js";import{CheckboxMixin as h}from"./CheckboxMixin.js";import k from"./checkbox.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-checkmark75.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-checkmark200.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-checkmark300.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash75.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash100.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash200.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash300.js";import b from"@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js";import f from"@spectrum-web-components/icon/src/spectrum-icon-dash.css.js";const I={s:()=>t`
            <sp-icon-checkmark75
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark75"
            ></sp-icon-checkmark75>
        `,m:()=>t`
            <sp-icon-checkmark100
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark100"
            ></sp-icon-checkmark100>
        `,l:()=>t`
            <sp-icon-checkmark200
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark200"
            ></sp-icon-checkmark200>
        `,xl:()=>t`
            <sp-icon-checkmark300
                id="checkmark"
                class="spectrum-Icon spectrum-UIIcon-Checkmark300"
            ></sp-icon-checkmark300>
        `},v={s:()=>t`
            <sp-icon-dash75
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash75"
            ></sp-icon-dash75>
        `,m:()=>t`
            <sp-icon-dash100
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash100"
            ></sp-icon-dash100>
        `,l:()=>t`
            <sp-icon-dash200
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash200"
            ></sp-icon-dash200>
        `,xl:()=>t`
            <sp-icon-dash300
                id="partialCheckmark"
                class="spectrum-Icon spectrum-UIIcon-Dash300"
            ></sp-icon-dash300>
        `};export class Checkbox extends u(h(p),{noDefaultSize:!0}){constructor(){super(...arguments);this.disabled=!1;this.indeterminate=!1;this.invalid=!1;this.emphasized=!1;this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.hasAttribute("autofocus")&&this.updateComplete.then(()=>{this.focus()})}static get styles(){return[k,b,f]}click(){var e;this.disabled||(e=this.inputElement)==null||e.click()}handleChange(){this.indeterminate=!1,super.handleChange()}render(){return t`
            ${super.render()}
            <span id="box">
                ${this.checked?I[this.size]():t``}
                ${this.indeterminate?v[this.size]():t``}
            </span>
            <label id="label" for="input"><slot></slot></label>
        `}updated(e){super.updated(e),e.has("disabled")&&(typeof e.get("disabled")!="undefined"||this.disabled)&&(this.disabled?(this.inputElement.tabIndex=this.tabIndex,this.tabIndex=-1):(this.tabIndex=this.inputElement.tabIndex,this.inputElement.removeAttribute("tabindex")),this.inputElement.disabled=this.disabled),e.has("indeterminate")&&(this.inputElement.indeterminate=this.indeterminate),e.has("invalid")&&(this.invalid?this.inputElement.setAttribute("aria-invalid","true"):this.inputElement.removeAttribute("aria-invalid"))}}Checkbox.shadowRootOptions={...p.shadowRootOptions,delegatesFocus:!0},r([a({type:Boolean,reflect:!0})],Checkbox.prototype,"disabled",2),r([a({type:Boolean,reflect:!0})],Checkbox.prototype,"indeterminate",2),r([a({type:Boolean,reflect:!0})],Checkbox.prototype,"invalid",2),r([a({type:Boolean,reflect:!0})],Checkbox.prototype,"emphasized",2),r([a({reflect:!0,type:Number,attribute:"tabindex"})],Checkbox.prototype,"tabIndex",2);
//# sourceMappingURL=Checkbox.js.map
