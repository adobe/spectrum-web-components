import { a as TextfieldBase } from './Textfield-CNzGwBlh.js';
import { T as TinyColor } from './index-DII9xnLW.js';
import { x } from './lit-html-COgVUehj.js';
import { n } from './define-element-C_3bgzm7.js';

var c=Object.defineProperty;var u=(l,t,e,i)=>{for(var r=void 0,o=l.length-1,s;o>=0;o--)(s=l[o])&&(r=(s(t,e,r))||r);return r&&c(t,e,r),r};class ColorField extends TextfieldBase{constructor(){super(...arguments);this.viewColor=!1;this._value="";this.cachedColor=null;this.cachedTinyColor=null;}static get styles(){return [...super.styles]}set value(e){if(e===this.value)return;const i=this._value;this._value=e,this.requestUpdate("value",i);}get value(){return this._value}getColorValue(){if(!this.value)return "";if(!this.cachedColor||this.cachedColor!==this.value){const e=new TinyColor(this.value);this.cachedColor=e.isValid?e.toRgbString():"";}return this.cachedColor}renderColorHandle(){return this.viewColor?x`
                  <sp-color-handle
                      size="m"
                      color="${this.getColorValue()}"
                  ></sp-color-handle>
              `:x``}render(){return this.viewColor&&import('./sp-color-handle-yIzFs7zJ.js'),x`
            ${super.render()} ${this.renderColorHandle()}
        `}checkValidity(){let e=super.checkValidity();return this.value&&((!this.cachedTinyColor||this.cachedTinyColor.originalInput!==this.value)&&(this.cachedTinyColor=new TinyColor(this.value)),this.valid=e=this.cachedTinyColor.isValid,this.invalid=!e),e}}u([n({type:Boolean,attribute:"view-color"})],ColorField.prototype,"viewColor");

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
