"use strict";var d=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var s=(l,o,e,r)=>{for(var t=r>1?void 0:r?m(o,e):o,a=l.length-1,n;a>=0;a--)(n=l[a])&&(t=(r?n(o,e,t):n(t))||t);return r&&t&&d(o,e,t),t};import{html as i,SpectrumElement as u}from"@spectrum-web-components/base";import"@spectrum-web-components/overlay/sp-overlay.js";import"@spectrum-web-components/tooltip/sp-tooltip.js";import{property as h,query as v,queryAssignedElements as c,queryAssignedNodes as f,state as p}from"@spectrum-web-components/base/src/decorators.js";import y from"./truncated.css.js";export class Truncated extends u{constructor(){super(...arguments);this.placement="top-start";this.successMessage="Copied to clipboard";this.hasCopied=!1;this.fullText="";this.overflowing=!1;this.resizeObserver=new ResizeObserver(()=>{this.measureOverflow()});this.mutationObserver=new MutationObserver(()=>{this.copyText()})}static get styles(){return[y]}get hasCustomOverflow(){return this.slottedOverflow.length>0}render(){return i`
            <span id="content" @click=${this.handleClick}>
                <slot></slot>
            </span>
            ${this.renderTooltip()}
        `}renderTooltip(){return this.overflowing?i`
            <sp-overlay
                id="overlay"
                .triggerElement=${this}
                .triggerInteraction=${"hover"}
                type="hint"
                placement=${this.placement}
            >
                <sp-tooltip name="tooltip">
                    ${this.hasCopied?this.successMessage:i`
                              <slot
                                  name="overflow"
                                  @slotchange=${this.handleOverflowSlotchange}
                              >
                                  ${this.fullText}
                              </slot>
                          `}
                </sp-tooltip>
            </sp-overlay>
        `:i`
                <slot
                    name="overflow"
                    style="display: none"
                    @slotchange=${this.handleOverflowSlotchange}
                ></slot>
            `}firstUpdated(e){this.resizeObserver.observe(this),this.resizeObserver.observe(this.content),this.copyText(),this.measureOverflow()}updated(e){super.updated(e),e.has("hasCopied")&&this.hasCopied&&this.overlayEl&&(this.overlayEl.open=!0)}handleOverflowSlotchange(){this.mutationObserver.disconnect(),this.hasCustomOverflow||this.mutationObserver.observe(this.content,{subtree:!0,childList:!0,characterData:!0})}handleClick(){if(!this.overflowing)return;const e=this.slottedContent.map(r=>{var t;return(t=r.textContent)!=null?t:""}).join("").trim();navigator.clipboard.writeText(e),this.hasCopied=!0,setTimeout(()=>{this.hasCopied=!1},6e3)}measureOverflow(){this.overflowing=this.content.offsetWidth>this.clientWidth+1}copyText(){this.hasCustomOverflow||(this.fullText=this.slottedContent.map(e=>{var r;return(r=e.textContent)!=null?r:""}).join(""))}}s([h()],Truncated.prototype,"placement",2),s([h({type:String,attribute:"success-message"})],Truncated.prototype,"successMessage",2),s([p()],Truncated.prototype,"hasCopied",2),s([p()],Truncated.prototype,"fullText",2),s([p()],Truncated.prototype,"overflowing",2),s([v("#content")],Truncated.prototype,"content",2),s([v("#overlay")],Truncated.prototype,"overlayEl",2),s([f({flatten:!0})],Truncated.prototype,"slottedContent",2),s([c({slot:"overflow",flatten:!0})],Truncated.prototype,"slottedOverflow",2);
//# sourceMappingURL=Truncated.js.map
