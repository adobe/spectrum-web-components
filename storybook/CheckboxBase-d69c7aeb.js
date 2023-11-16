import { F as Focusable } from './focusable-df7b829e.js';
import { x } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';
import { n } from './define-element-467f3dc4.js';
import { i } from './query-d0113d5a.js';

var h=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var c=(l,t,n,i)=>{for(var e=i>1?void 0:i?d(t,n):t,r=l.length-1,p;r>=0;r--)(p=l[r])&&(e=(i?p(t,n,e):p(e))||e);return i&&e&&h(t,n,e),e};class CheckboxBase extends Focusable{constructor(){super(...arguments);this.checked=!1;this.readonly=!1;}get focusElement(){return this.inputElement}handleChange(){if(this.readonly){this.inputElement.checked=this.checked;return}this.checked=this.inputElement.checked;const n=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(n)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked);}render(){return x`
            <input
                name=${l(this.name||void 0)}
                id="input"
                type="checkbox"
                .checked=${this.checked}
                @change=${this.handleChange}
            />
        `}}c([n({type:Boolean,reflect:!0})],CheckboxBase.prototype,"checked",2),c([n({type:Boolean,reflect:!0})],CheckboxBase.prototype,"readonly",2),c([n({type:String,reflect:!0})],CheckboxBase.prototype,"name",2),c([i("#input")],CheckboxBase.prototype,"inputElement",2);

export { CheckboxBase as C };
