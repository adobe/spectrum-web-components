import { C as ColorController } from './ColorController-Bu_aAN4W.js';
import { a as TextfieldBase } from './Textfield-DWd10G-B.js';
import { x } from './lit-html-COgVUehj.js';
import { n as n$1 } from './define-element-2VgsDjbW.js';

var u=Object.defineProperty;var n=(o,l,r,t)=>{for(var e=void 0,i=o.length-1,s;i>=0;i--)(s=o[i])&&(e=(s(l,r,e))||e);return e&&u(l,r,e),e};class ColorField extends TextfieldBase{constructor(){super();this.viewColor=!1;this._value="";this.colorController=new ColorController(this);}static get styles(){return [...super.styles]}set value(r){if(r===this.value)return;const t=this._value;this._value=r,this.requestUpdate("value",t);}get value(){return this._value}renderColorHandle(){return this.viewColor&&this.valid?x`
                  <sp-color-handle
                      size="m"
                      color="${this.colorController.getColor("srgb").toString()}"
                  ></sp-color-handle>
              `:x``}getColorValue(){return this.valid?this.colorController.getColor("srgb").toString():""}render(){return this.viewColor&&import('./sp-color-handle-C6VS3PXE.js'),x`
            ${super.render()} ${this.renderColorHandle()}
        `}checkValidity(){let r=super.checkValidity();return this.value?(this.valid=r=this.colorController.validateColorString(this.value).isValid,this.invalid=!r,this.valid&&(this.colorController.color=this.value)):this.valid=this.invalid=!1,r}}n([n$1({type:Boolean,attribute:"view-color"})],ColorField.prototype,"viewColor");

customElements.define("sp-color-field",ColorField);

const ColorFieldMarkup = ({
  label = "Color Field",
  quiet = false,
  size = "m",
  readonly = false,
  disabled = false,
  viewColor = false,
  value = ""
} = {}) => {
  return x`
        <sp-color-field
            label=${label}
            size=${size}
            value=${value}
            ?view-color=${viewColor}
            ?quiet=${quiet}
            ?readonly=${readonly}
            ?disabled=${disabled}
        ></sp-color-field>
    `;
};

export { ColorFieldMarkup as C };
