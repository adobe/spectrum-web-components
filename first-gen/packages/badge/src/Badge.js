"use strict";var u=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var a=(o,r,e,i)=>{for(var t=i>1?void 0:i?p(r,e):r,s=o.length-1,n;s>=0;s--)(n=o[s])&&(t=(i?n(r,e,t):n(t))||t);return i&&t&&u(r,e,t),t};import{html as l,nothing as d,SizedMixin as f,SpectrumElement as m}from"@spectrum-web-components/base";import{property as c}from"@spectrum-web-components/base/src/decorators.js";import{ObserveSlotText as h}from"@spectrum-web-components/shared/src/observe-slot-text.js";import{ObserveSlotPresence as b}from"@spectrum-web-components/shared/src/observe-slot-presence.js";import x from"./badge.css.js";export const BADGE_VARIANTS=["accent","neutral","informative","positive","negative","notice","fuchsia","indigo","magenta","purple","seafoam","yellow","gray","red","orange","chartreuse","celery","green","cyan","blue"],FIXED_VALUES=["inline-start","inline-end","block-start","block-end"];export class Badge extends f(h(b(m,'[slot="icon"]'),""),{noDefaultSize:!0}){constructor(){super(...arguments);this.variant="informative"}static get styles(){return[x]}get fixed(){return this._fixed}set fixed(e){if(e===this.fixed)return;const i=this.fixed;this._fixed=e,e?this.setAttribute("fixed",e):this.removeAttribute("fixed"),this.requestUpdate("fixed",i)}get hasIcon(){return this.slotContentIsPresent}render(){return l`
            ${this.hasIcon?l`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                      ></slot>
                  `:d}
            <div class="label">
                <slot></slot>
            </div>
        `}}a([c({reflect:!0})],Badge.prototype,"fixed",1),a([c({type:String,reflect:!0})],Badge.prototype,"variant",2);
//# sourceMappingURL=Badge.js.map
