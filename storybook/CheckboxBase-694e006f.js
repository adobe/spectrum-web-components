import { F as Focusable } from './focusable-d03021f6.js';
import { x } from './lit-html-126adc72.js';
import { n } from './define-element-43d4edd5.js';
import { i } from './query-d0113d5a.js';

var u=Object.defineProperty;var s=Object.getOwnPropertyDescriptor;var l=(i,t,c,n)=>{for(var e=n>1?void 0:n?s(t,c):t,p=i.length-1,r;p>=0;p--)(r=i[p])&&(e=(n?r(t,c,e):r(e))||e);return n&&e&&u(t,c,e),e};class CheckboxBase extends Focusable{constructor(){super(...arguments);this.checked=!1;this.readonly=!1;}get focusElement(){return this.inputElement}handleChange(){if(this.readonly){this.inputElement.checked=this.checked;return}this.checked=this.inputElement.checked;const c=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(c)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked);}render(){return x`
            <input
                id="input"
                type="checkbox"
                .checked=${this.checked}
                @change=${this.handleChange}
            />
        `}}l([n({type:Boolean,reflect:!0})],CheckboxBase.prototype,"checked",2),l([n({type:Boolean,reflect:!0})],CheckboxBase.prototype,"readonly",2),l([i("#input")],CheckboxBase.prototype,"inputElement",2);

export { CheckboxBase as C };
