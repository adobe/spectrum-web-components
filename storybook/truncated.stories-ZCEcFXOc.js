import './sp-overlay-DzkklhP1.js';
import './sp-tooltip-BpGkeKe1.js';
import { i as i$1 } from './lit-element-BulMEkr1.js';
import { S as SpectrumElement, n } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';
import { r } from './state-DrummH0c.js';
import { e } from './query-DQF6X5qW.js';
import { n as n$1 } from './query-assigned-nodes-DAYI4epk.js';
import { o } from './query-assigned-elements-C9WOp2R6.js';
import './Overlay-Dz9m2EV-.js';
import './ElementResolution-B9KteuX8.js';
import './random-id-BST1Puzz.js';
import './AbstractOverlay-CPSq4yHG.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './VirtualTrigger-CpG-Ut2t.js';
import './strategies-BipNjU_G.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './platform-r3Lf9REX.js';
import './slottable-request-event-DXuuyGoq.js';
import './if-defined-DDJGFaN4.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './base-u8Z1Hrsd.js';
import './DependencyManger-Dpkh1Bse.js';

const i=i$1`
    :host{min-width:0;max-width:100%;white-space:nowrap;text-overflow:ellipsis;display:inline-block;overflow:hidden}
`;

var d=Object.defineProperty;var s=(l,o,e,r)=>{for(var t=void 0,a=l.length-1,n;a>=0;a--)(n=l[a])&&(t=(n(o,e,t))||t);return t&&d(o,e,t),t};class Truncated extends SpectrumElement{constructor(){super(...arguments);this.placement="top-start";this.successMessage="Copied to clipboard";this.hasCopied=!1;this.fullText="";this.overflowing=!1;this.resizeObserver=new ResizeObserver(()=>{this.measureOverflow();});this.mutationObserver=new MutationObserver(()=>{this.copyText();});}static get styles(){return [i]}get hasCustomOverflow(){return this.slottedOverflow.length>0}render(){return x`
            <span id="content" @click=${this.handleClick}>
                <slot></slot>
            </span>
            ${this.renderTooltip()}
        `}renderTooltip(){return this.overflowing?x`
            <sp-overlay
                id="overlay"
                .triggerElement=${this}
                .triggerInteraction=${"hover"}
                type="hint"
                placement=${this.placement}
            >
                <sp-tooltip name="tooltip">
                    ${this.hasCopied?this.successMessage:x`
                              <slot
                                  name="overflow"
                                  @slotchange=${this.handleOverflowSlotchange}
                              >
                                  ${this.fullText}
                              </slot>
                          `}
                </sp-tooltip>
            </sp-overlay>
        `:x`
                <slot
                    name="overflow"
                    style="display: none"
                    @slotchange=${this.handleOverflowSlotchange}
                ></slot>
            `}firstUpdated(e){this.resizeObserver.observe(this),this.resizeObserver.observe(this.content),this.copyText(),this.measureOverflow();}updated(e){super.updated(e),e.has("hasCopied")&&this.hasCopied&&this.overlayEl&&(this.overlayEl.open=!0);}handleOverflowSlotchange(){this.mutationObserver.disconnect(),this.hasCustomOverflow||this.mutationObserver.observe(this.content,{subtree:!0,childList:!0,characterData:!0});}handleClick(){if(!this.overflowing)return;const e=this.slottedContent.map(r=>{var t;return (t=r.textContent)!=null?t:""}).join("").trim();navigator.clipboard.writeText(e),this.hasCopied=!0,setTimeout(()=>{this.hasCopied=!1;},6e3);}measureOverflow(){this.overflowing=this.content.offsetWidth>this.clientWidth+1;}copyText(){this.hasCustomOverflow||(this.fullText=this.slottedContent.map(e=>{var r;return (r=e.textContent)!=null?r:""}).join(""));}}s([n()],Truncated.prototype,"placement"),s([n({type:String,attribute:"success-message"})],Truncated.prototype,"successMessage"),s([r()],Truncated.prototype,"hasCopied"),s([r()],Truncated.prototype,"fullText"),s([r()],Truncated.prototype,"overflowing"),s([e("#content")],Truncated.prototype,"content"),s([e("#overlay")],Truncated.prototype,"overlayEl"),s([n$1({flatten:!0})],Truncated.prototype,"slottedContent"),s([o({slot:"overflow",flatten:!0})],Truncated.prototype,"slottedOverflow");

customElements.define("sp-truncated",Truncated);

const Dog = "data:image/jpeg;base64,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";
var truncated_stories = {
  title: "Truncated",
  component: "sp-truncated"
};
const Default = () => {
  return x`
        <p
            style="width: 200px; color: #000; border: solid 1px #ccc; overflow: hidden; resize: both;"
        >
            <sp-truncated>
                This is a
                <strong>very long</strong>
                🦋 sentence that 🦋 should be truncated
            </sp-truncated>
            <sp-truncated>
                ThisIsAVeryLongWordThatShouldBeTruncated
            </sp-truncated>
            <sp-truncated>
                We can even
                <img src=${Dog} alt="kitten" />
                truncate around a picture
            </sp-truncated>
            <sp-truncated>
                Custom overflow content can also be provided for the tooltip
                <span slot="overflow">
                    <span style="font-size: 24px;">Like this!</span>
                </span>
            </sp-truncated>
            <sp-truncated placement="right">
                Alternative placements can be specified
            </sp-truncated>
            <sp-truncated>Should have no tooltip</sp-truncated>
        </p>
    `;
};
const __namedExportsOrder = ['Default'];

export { Default, __namedExportsOrder, truncated_stories as default };
