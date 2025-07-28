"use strict";var i=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var m=(l,r,o,t)=>{for(var e=t>1?void 0:t?u(r,o):r,s=l.length-1,p;s>=0;s--)(p=l[s])&&(e=(t?p(r,o,e):p(e))||e);return t&&e&&i(r,o,e),e};import{html as c,SpectrumElement as d}from"@spectrum-web-components/base";import{property as a}from"@spectrum-web-components/base/src/decorators.js";import n from"./table-cell.css.js";export class TableCell extends d{constructor(){super(...arguments);this.role="gridcell"}static get styles(){return[n]}render(){return c`
            <slot></slot>
        `}}m([a({reflect:!0})],TableCell.prototype,"role",2);
//# sourceMappingURL=TableCell.js.map
