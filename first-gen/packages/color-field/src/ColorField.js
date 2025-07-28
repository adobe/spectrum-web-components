"use strict";var u=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var n=(o,l,r,t)=>{for(var e=t>1?void 0:t?d(l,r):l,i=o.length-1,s;i>=0;i--)(s=o[i])&&(e=(t?s(l,r,e):s(e))||e);return t&&e&&u(l,r,e),e};import{html as a}from"@spectrum-web-components/base";import{property as v}from"@spectrum-web-components/base/src/decorators.js";import{ColorController as p}from"@spectrum-web-components/reactive-controllers/src/ColorController.js";import{TextfieldBase as h}from"@spectrum-web-components/textfield";import c from"./color-field.css.js";export class ColorField extends h{constructor(){super();this.viewColor=!1;this._value="";this.colorController=new p(this)}static get styles(){return[...super.styles,c]}set value(r){if(r===this.value)return;const t=this._value;this._value=r,this.requestUpdate("value",t)}get value(){return this._value}renderColorHandle(){return this.viewColor&&this.valid?a`
                  <sp-color-handle
                      size="m"
                      color="${this.colorController.getColor("srgb").toString()}"
                  ></sp-color-handle>
              `:a``}getColorValue(){return this.valid?this.colorController.getColor("srgb").toString():""}render(){return this.viewColor&&import("@spectrum-web-components/color-handle/sp-color-handle.js"),a`
            ${super.render()} ${this.renderColorHandle()}
        `}checkValidity(){let r=super.checkValidity();return this.value?(this.valid=r=this.colorController.validateColorString(this.value).isValid,this.invalid=!r,this.valid&&(this.colorController.color=this.value)):this.valid=this.invalid=!1,r}}n([v({type:Boolean,attribute:"view-color"})],ColorField.prototype,"viewColor",2);
//# sourceMappingURL=ColorField.js.map
