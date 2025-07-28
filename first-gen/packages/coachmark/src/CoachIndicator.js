"use strict";var u=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var c=(l,t,i,r)=>{for(var e=r>1?void 0:r?a(t,i):t,s=l.length-1,o;s>=0;s--)(o=l[s])&&(e=(r?o(t,i,e):o(e))||e);return r&&e&&u(t,i,e),e};import{html as m,SpectrumElement as d}from"@spectrum-web-components/base";import{property as p}from"@spectrum-web-components/base/src/decorators.js";import n from"./coach-indicator.css.js";export class CoachIndicator extends d{constructor(){super(...arguments);this.quiet=!1}static get styles(){return[n]}render(){return m`
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        `}}c([p({type:Boolean,reflect:!0})],CoachIndicator.prototype,"quiet",2),c([p({reflect:!0,attribute:"static-color"})],CoachIndicator.prototype,"staticColor",2);
//# sourceMappingURL=CoachIndicator.js.map
