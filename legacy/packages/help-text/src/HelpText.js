"use strict";var c=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var n=(i,t,l,r)=>{for(var e=r>1?void 0:r?u(t,l):t,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=(r?s(t,l,e):s(e))||e);return r&&e&&c(t,l,e),e};import{html as o,nothing as m,SizedMixin as d,SpectrumElement as v}from"@spectrum-web-components/base";import{property as p}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";import f from"./help-text.css.js";export class HelpText extends d(v,{noDefaultSize:!0}){constructor(){super(...arguments);this.icon=!1;this.variant="neutral"}static get styles(){return[f]}render(){return o`
            ${this.variant==="negative"&&this.icon?o`
                      <sp-icon-alert class="icon"></sp-icon-alert>
                  `:m}
            <div class="text"><slot></slot></div>
        `}}n([p({type:Boolean,reflect:!0})],HelpText.prototype,"icon",2),n([p({reflect:!0})],HelpText.prototype,"variant",2);
//# sourceMappingURL=HelpText.js.map
