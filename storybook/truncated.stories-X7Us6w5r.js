import './sp-overlay-8v49LtLr.js';
import './sp-tooltip-pBZPzNfV.js';
import { i as i$1 } from './lit-element-xBOPiTek.js';
import { S as SpectrumElement, n } from './define-element-tO8-r1bu.js';
import { x } from './lit-html-GmIhAbMP.js';
import { t } from './state-W6so4P5i.js';
import { i as i$2 } from './query-JMOstM_r.js';
import { o } from './query-assigned-nodes-jGvx5qKR.js';
import { l } from './query-assigned-elements-1m6Cs7Ix.js';
import './ElementResolution-TTOqkMM7.js';
import './random-id-M2k-wjyE.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './platform-c1C9ET3y.js';
import './slottable-request-event-SQgFLN7g.js';
import './if-defined-pV6JZKXB.js';
import './style-map-ak5mT6xX.js';
import './directive-C1gRZbRe.js';
import './DependencyManger-0SYmL--C.js';
import './base-STdhtiz1.js';

const i=i$1`
    :host{white-space:nowrap;text-overflow:ellipsis;min-width:0;max-width:100%;display:inline-block;overflow:hidden}
`;var y = i;

var d=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var s=(l,o,e,r)=>{for(var t=r>1?void 0:r?m(o,e):o,a=l.length-1,n;a>=0;a--)(n=l[a])&&(t=(r?n(o,e,t):n(t))||t);return r&&t&&d(o,e,t),t};class Truncated extends SpectrumElement{constructor(){super(...arguments);this.placement="top-start";this.successMessage="Copied to clipboard";this.hasCopied=!1;this.fullText="";this.overflowing=!1;this.resizeObserver=new ResizeObserver(()=>{this.measureOverflow();});this.mutationObserver=new MutationObserver(()=>{this.copyText();});}static get styles(){return [y]}get hasCustomOverflow(){return this.slottedOverflow.length>0}render(){return x`
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
            `}firstUpdated(e){this.resizeObserver.observe(this),this.resizeObserver.observe(this.content),this.copyText(),this.measureOverflow();}updated(e){super.updated(e),e.has("hasCopied")&&this.hasCopied&&this.overlayEl&&(this.overlayEl.open=!0);}handleOverflowSlotchange(){this.mutationObserver.disconnect(),this.hasCustomOverflow||this.mutationObserver.observe(this.content,{subtree:!0,childList:!0,characterData:!0});}handleClick(){if(!this.overflowing)return;const e=this.slottedContent.map(r=>{var t;return (t=r.textContent)!=null?t:""}).join("").trim();navigator.clipboard.writeText(e),this.hasCopied=!0,setTimeout(()=>{this.hasCopied=!1;},6e3);}measureOverflow(){this.overflowing=this.content.offsetWidth>this.clientWidth+1;}copyText(){this.hasCustomOverflow||(this.fullText=this.slottedContent.map(e=>{var r;return (r=e.textContent)!=null?r:""}).join(""));}}s([n()],Truncated.prototype,"placement",2),s([n({type:String,attribute:"success-message"})],Truncated.prototype,"successMessage",2),s([t()],Truncated.prototype,"hasCopied",2),s([t()],Truncated.prototype,"fullText",2),s([t()],Truncated.prototype,"overflowing",2),s([i$2("#content")],Truncated.prototype,"content",2),s([i$2("#overlay")],Truncated.prototype,"overlayEl",2),s([o({flatten:!0})],Truncated.prototype,"slottedContent",2),s([l({slot:"overflow",flatten:!0})],Truncated.prototype,"slottedOverflow",2);

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
