"use strict";var c=Object.defineProperty;var n=Object.getOwnPropertyDescriptor;var d=(o,r,t,l)=>{for(var e=l>1?void 0:l?n(r,t):r,i=o.length-1,a;i>=0;i--)(a=o[i])&&(e=(l?a(r,t,e):a(e))||e);return l&&e&&c(r,t,e),e};import{html as h,SpectrumElement as p}from"@spectrum-web-components/base";import{property as s}from"@spectrum-web-components/base/src/decorators.js";import m from"./table-head.css.js";export class TableHead extends p{constructor(){super(...arguments);this.role="row"}static get styles(){return[m]}handleSorted({target:t}){[...this.children].forEach(e=>{e!==t&&(e.sortDirection=void 0)})}handleChange({target:t}){this.selected=t.checkbox.checked||t.checkbox.indeterminate}render(){return h`
            <slot
                @sorted=${this.handleSorted}
                @change=${this.handleChange}
            ></slot>
        `}}d([s({reflect:!0})],TableHead.prototype,"role",2),d([s({type:Boolean,reflect:!0})],TableHead.prototype,"selected",2);
//# sourceMappingURL=TableHead.js.map
