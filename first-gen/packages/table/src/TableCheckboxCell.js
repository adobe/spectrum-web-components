"use strict";var d=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var e=(s,r,l,c)=>{for(var t=c>1?void 0:c?a(r,l):r,p=s.length-1,o;p>=0;p--)(o=s[p])&&(t=(c?o(r,l,t):o(t))||t);return c&&t&&d(r,l,t),t};import{html as u,SpectrumElement as m}from"@spectrum-web-components/base";import"@spectrum-web-components/checkbox/sp-checkbox.js";import{property as i,query as n}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as f}from"@spectrum-web-components/base/src/directives.js";import h from"./table-checkbox-cell.css.js";export class TableCheckboxCell extends m{constructor(){super(...arguments);this.headCell=!1;this.role="gridcell";this.indeterminate=!1;this.checked=!1;this.disabled=!1;this.selectsSingle=!1;this.emphasized=!1}static get styles(){return[h]}click(){this.checkbox.click()}render(){return u`
            <sp-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled}
                ?emphasized=${this.emphasized}
                aria-hidden=${f(this.selectsSingle)}
                class="checkbox"
            ></sp-checkbox>
        `}}e([i({type:Boolean,reflect:!0,attribute:"head-cell"})],TableCheckboxCell.prototype,"headCell",2),e([i({reflect:!0})],TableCheckboxCell.prototype,"role",2),e([n(".checkbox")],TableCheckboxCell.prototype,"checkbox",2),e([i({type:Boolean})],TableCheckboxCell.prototype,"indeterminate",2),e([i({type:Boolean})],TableCheckboxCell.prototype,"checked",2),e([i({type:Boolean})],TableCheckboxCell.prototype,"disabled",2),e([i({type:Boolean,reflect:!0,attribute:"selects-single"})],TableCheckboxCell.prototype,"selectsSingle",2),e([i({type:Boolean,reflect:!0})],TableCheckboxCell.prototype,"emphasized",2);
//# sourceMappingURL=TableCheckboxCell.js.map
