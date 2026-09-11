"use strict";var m=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var r=(n,s,e,c)=>{for(var i=c>1?void 0:c?u(s,e):s,l=n.length-1,o;l>=0;l--)(o=n[l])&&(i=(c?o(s,e,i):o(i))||i);return c&&i&&m(s,e,i),i};import{html as t,nothing as p,SizedMixin as h,SpectrumElement as d}from"@spectrum-web-components/base";import{property as a}from"@spectrum-web-components/base/src/decorators.js";import k from"@spectrum-web-components/icon/src/spectrum-icon-checkmark.css.js";import b from"@spectrum-web-components/icon/src/spectrum-icon-dash.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-checkmark75.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-checkmark200.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-checkmark300.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash75.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash100.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash200.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-dash300.js";import f from"./checkbox.css.js";import{CheckboxMixin as I}from"./CheckboxMixin.js";const v={s:()=>t`
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
    `},y={s:()=>t`
      <sp-icon-dash75
        id="partial-checkmark"
        class="spectrum-Icon spectrum-UIIcon-Dash75"
      ></sp-icon-dash75>
    `,m:()=>t`
      <sp-icon-dash100
        id="partial-checkmark"
        class="spectrum-Icon spectrum-UIIcon-Dash100"
      ></sp-icon-dash100>
    `,l:()=>t`
      <sp-icon-dash200
        id="partial-checkmark"
        class="spectrum-Icon spectrum-UIIcon-Dash200"
      ></sp-icon-dash200>
    `,xl:()=>t`
      <sp-icon-dash300
        id="partial-checkmark"
        class="spectrum-Icon spectrum-UIIcon-Dash300"
      ></sp-icon-dash300>
    `};export class Checkbox extends h(I(d),{noDefaultSize:!0}){constructor(){super(...arguments);this.disabled=!1;this.indeterminate=!1;this.invalid=!1;this.emphasized=!1;this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.hasAttribute("autofocus")&&this.updateComplete.then(()=>{this.focus()})}static get styles(){return[f,k,b]}click(){var e;this.disabled||(e=this.inputElement)==null||e.click()}handleChange(){this.indeterminate=!1,super.handleChange()}render(){return t`
      ${super.render()}
      <span id="box">
        ${this.checked?v[this.size]():p}
        ${this.indeterminate?y[this.size]():p}
      </span>
      <label id="label" for="input"><slot></slot></label>
    `}updated(e){super.updated(e),e.has("disabled")&&(typeof e.get("disabled")!="undefined"||this.disabled)&&(this.disabled?(this.inputElement.tabIndex=this.tabIndex,this.tabIndex=-1):(this.tabIndex=this.inputElement.tabIndex,this.inputElement.removeAttribute("tabindex")),this.inputElement.disabled=this.disabled),e.has("indeterminate")&&(this.inputElement.indeterminate=this.indeterminate),e.has("invalid")&&(this.invalid?this.inputElement.setAttribute("aria-invalid","true"):this.inputElement.removeAttribute("aria-invalid"))}}Checkbox.shadowRootOptions={...d.shadowRootOptions,delegatesFocus:!0},r([a({type:Boolean,reflect:!0})],Checkbox.prototype,"disabled",2),r([a({type:Boolean,reflect:!0})],Checkbox.prototype,"indeterminate",2),r([a({type:Boolean,reflect:!0})],Checkbox.prototype,"invalid",2),r([a({type:Boolean,reflect:!0})],Checkbox.prototype,"emphasized",2),r([a({reflect:!0,type:Number,attribute:"tabindex"})],Checkbox.prototype,"tabIndex",2);
//# sourceMappingURL=Checkbox.js.map
