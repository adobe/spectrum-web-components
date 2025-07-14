"use strict";var a=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var c=(i,e,r,n)=>{for(var t=n>1?void 0:n?p(e,r):e,o=i.length-1,l;o>=0;o--)(l=i[o])&&(t=(n?l(e,r,t):l(t))||t);return n&&t&&a(e,r,t),t};import{html as u}from"@spectrum-web-components/base";import{property as h,query as s}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as d}from"@spectrum-web-components/base/src/directives.js";export function CheckboxMixin(i){class e extends i{constructor(){super(...arguments);this.checked=!1;this.readonly=!1}handleChange(){if(this.readonly){this.inputElement.checked=this.checked;return}this.checked=this.inputElement.checked;const t=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(t)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked)}render(){return u`
                <input
                    id="input"
                    name=${d(this.name||void 0)}
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.readonly}
                    @change=${this.handleChange}
                />
            `}}return c([h({type:Boolean,reflect:!0})],e.prototype,"checked",2),c([h({type:String,reflect:!0})],e.prototype,"name",2),c([h({type:Boolean,reflect:!0})],e.prototype,"readonly",2),c([s("#input")],e.prototype,"inputElement",2),e}
//# sourceMappingURL=CheckboxMixin.js.map
