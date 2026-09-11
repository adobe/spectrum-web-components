"use strict";var d=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var l=(a,t,o,r)=>{for(var e=r>1?void 0:r?A(t,o):t,s=a.length-1,i;s>=0;s--)(i=a[s])&&(e=(r?i(t,o,e):i(e))||e);return r&&e&&d(t,o,e),e};import{html as n,nothing as S}from"@spectrum-web-components/base";import{property as V}from"@spectrum-web-components/base/src/decorators.js";import{BadgeBase as m}from"./Badge.base.js";import c from"./badge.css.js";import{BADGE_VARIANTS_COLOR_S1 as u,BADGE_VARIANTS_S1 as p,FIXED_VALUES as y}from"./Badge.types.js";export const BADGE_VARIANTS=p,FIXED_VALUES=y;export class Badge extends m{constructor(){super(...arguments);this.variant="informative"}static get styles(){return[c]}render(){return n`
      ${this.hasIcon?n`
            <slot name="icon" ?icon-only=${!this.slotHasContent}></slot>
          `:S}
      <div class="label">
        <slot></slot>
      </div>
    `}}Badge.VARIANTS_COLOR=u,Badge.VARIANTS=p,l([V({type:String,reflect:!0})],Badge.prototype,"variant",2);
//# sourceMappingURL=Badge.js.map
