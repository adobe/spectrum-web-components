"use strict";import{html as s}from"lit";import"@spectrum-web-components/progress-circle/sp-progress-circle.js";export class PendingStateController{constructor(e){this.cachedAriaLabel=null;this.host=e,this.host.addController(this)}renderPendingState(){const e=this.host.pendingLabel||"Pending";return this.host.pending?s`
                  <sp-progress-circle
                      id="loader"
                      size="s"
                      indeterminate
                      aria-valuetext=${e}
                      class="progress-circle"
                  ></sp-progress-circle>
              `:s``}updateAriaLabel(){const{pending:e,disabled:t,pendingLabel:i}=this.host,a=this.host.getAttribute("aria-label");e&&!t&&a!==i?(this.cachedAriaLabel=a,this.host.setAttribute("aria-label",i||"Pending")):(!e||t)&&(this.cachedAriaLabel?this.host.setAttribute("aria-label",this.cachedAriaLabel):e||this.host.removeAttribute("aria-label"))}hostConnected(){this.cachedAriaLabel||(this.cachedAriaLabel=this.host.getAttribute("aria-label")),this.updateAriaLabel()}hostUpdated(){this.updateAriaLabel()}}
//# sourceMappingURL=PendingState.js.map
