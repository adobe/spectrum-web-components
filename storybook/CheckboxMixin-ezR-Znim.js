import { n } from './define-element-2O4ZhTAw.js';
import { i } from './query-JMOstM_r.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';

var a=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var c=(i,e,r,n)=>{for(var t=n>1?void 0:n?p(e,r):e,o=i.length-1,l;o>=0;o--)(l=i[o])&&(t=(n?l(e,r,t):l(t))||t);return n&&t&&a(e,r,t),t};function CheckboxMixin(i$1){class e extends i$1{constructor(){super(...arguments);this.checked=!1;this.readonly=!1;}handleChange(){if(this.readonly){this.inputElement.checked=this.checked;return}this.checked=this.inputElement.checked;const t=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(t)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked);}render(){return x`
                <input
                    id="input"
                    name=${l(this.name||void 0)}
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.readonly}
                    @change=${this.handleChange}
                />
            `}}return c([n({type:Boolean,reflect:!0})],e.prototype,"checked",2),c([n({type:String,reflect:!0})],e.prototype,"name",2),c([n({type:Boolean,reflect:!0})],e.prototype,"readonly",2),c([i("#input")],e.prototype,"inputElement",2),e}

export { CheckboxMixin as C };
