import { n } from './define-element-C_3bgzm7.js';
import { e } from './query-DQF6X5qW.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

var a=Object.defineProperty;var c=(i,e,r,n)=>{for(var t=void 0,o=i.length-1,l;o>=0;o--)(l=i[o])&&(t=(l(e,r,t))||t);return t&&a(e,r,t),t};function CheckboxMixin(i){let e$1 = class e extends i{constructor(){super(...arguments);this.checked=!1;this.readonly=!1;}handleChange(){if(this.readonly){this.inputElement.checked=this.checked;return}this.checked=this.inputElement.checked;const t=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(t)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked);}render(){return x`
                <input
                    id="input"
                    name=${o(this.name||void 0)}
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.readonly}
                    @change=${this.handleChange}
                />
            `}};return c([n({type:Boolean,reflect:!0})],e$1.prototype,"checked"),c([n({type:String,reflect:!0})],e$1.prototype,"name"),c([n({type:Boolean,reflect:!0})],e$1.prototype,"readonly"),c([e("#input")],e$1.prototype,"inputElement"),e$1}

export { CheckboxMixin as C };
