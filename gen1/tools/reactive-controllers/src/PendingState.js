"use strict";import{html as r}from"lit";import"@spectrum-web-components/progress-circle/sp-progress-circle.js";export class PendingStateController{constructor(e){this.cachedAriaLabel=null;this.host=e,this.host.addController(this)}renderPendingState(){return this.host.pending?r`
          <sp-progress-circle
            id="loader"
            size="s"
            indeterminate
            class="progress-circle"
            role="presentation"
          ></sp-progress-circle>
        `:r``}updateAriaLabel(){const{pending:e,disabled:n,pendingLabel:i}=this.host,a=this.host.getAttribute("aria-label");function o(l,t,s){return!l&&t!==s||l!==t&&t!==s}o(this.cachedAriaLabel,a,i)&&(this.cachedAriaLabel=a),e&&!n?this.host.setAttribute("aria-label",i||"Pending"):this.cachedAriaLabel?this.host.setAttribute("aria-label",this.cachedAriaLabel):this.host.removeAttribute("aria-label")}hostConnected(){this.cachedAriaLabel||(this.cachedAriaLabel=this.host.getAttribute("aria-label")),this.updateAriaLabel()}hostUpdated(){this.updateAriaLabel()}}
//# sourceMappingURL=PendingState.js.map
