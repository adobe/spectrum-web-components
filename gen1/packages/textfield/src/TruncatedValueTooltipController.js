"use strict";import{html as a,nothing as l}from"@spectrum-web-components/base";export const truncatedValueTooltipUpdatedSymbol=Symbol("truncated value tooltip updated");export class TruncatedValueTooltipController{constructor(e){this._isTruncated=!1;this._tooltipDepsLoaded=!1;this._resizeObserver=null;this._observerInitialized=!1;this.host=e,this.host.addController(this)}get inputElementIsTruncated(){const e=this.host;return!e.inputElement||e.multiline||e.type==="password"?!1:e.inputElement.scrollWidth>e.inputElement.clientWidth+1}refreshTruncationState(){const e=this.host,t=this.inputElementIsTruncated;if(e.focused&&this._isTruncated&&!t||t===this._isTruncated)return!1;const i=this._isTruncated;return this._isTruncated=t,Promise.resolve().then(()=>{this.host.requestUpdate(truncatedValueTooltipUpdatedSymbol,i)}),t}refresh(){return this.refreshTruncationState()}async ensureTooltipDeps(){this._tooltipDepsLoaded||(await Promise.all([import("@spectrum-web-components/overlay/sp-overlay.js"),import("@spectrum-web-components/tooltip/sp-tooltip.js")]),this._tooltipDepsLoaded=!0,Promise.resolve().then(()=>{this.host.requestUpdate(truncatedValueTooltipUpdatedSymbol,!1)}))}render(){const e=this.host;return!this._isTruncated||e.disabled||!e.inputElement||e.type==="password"?l:this._tooltipDepsLoaded?a`
      <sp-overlay
        id="truncated-value-tooltip"
        aria-hidden="true"
        .describeTrigger=${"none"}
        .triggerElement=${e.inputElement}
        .triggerInteraction=${"hover"}
        type="hint"
        .placement=${e.truncatedValueTooltipPlacement}
      >
        <sp-tooltip
          aria-hidden="true"
          placement=${e.truncatedValueTooltipPlacement}
        >
          ${e.displayValue}
        </sp-tooltip>
      </sp-overlay>
    `:(this.ensureTooltipDeps(),l)}syncTooltipText(e){var o,s;const t=(o=this.host.shadowRoot)==null?void 0:o.querySelector("#truncated-value-tooltip sp-tooltip");if(!t)return;const i=(s=Array.from(t.childNodes).find(r=>{var n;return r.nodeType===Node.TEXT_NODE&&!!((n=r.textContent)!=null?n:"").trim().length}))!=null?s:Array.from(t.childNodes).find(r=>r.nodeType===Node.TEXT_NODE);i&&(i.textContent=e)}hostConnected(){this._observerInitialized||this.host.requestUpdate()}hostUpdated(){const e=this.host;e.multiline||this._observerInitialized||e.inputElement&&(this._observerInitialized=!0,this._resizeObserver=new ResizeObserver(()=>{this.refreshTruncationState()}),this._resizeObserver.observe(this.host),this._resizeObserver.observe(e.inputElement),this.refreshTruncationState())}hostDisconnected(){this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._observerInitialized=!1,this._isTruncated=!1}}
//# sourceMappingURL=TruncatedValueTooltipController.js.map
