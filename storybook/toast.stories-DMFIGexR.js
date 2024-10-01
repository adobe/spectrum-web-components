import './sp-close-button-lUq7Iv6y.js';
import './sp-icon-alert-Cbypiip7.js';
import './sp-icon-info-qYYy7dF4.js';
import './sp-icon-checkmark-circle-Byi1eUQm.js';
import { F as FocusVisiblePolyfillMixin } from './focus-visible-D29Av9Xb.js';
import { i } from './lit-element-BulMEkr1.js';
import { x } from './lit-html-COgVUehj.js';
import { n, S as SpectrumElement, d as defineElement } from './define-element-C_3bgzm7.js';
import './sp-button-BTMm_ibC.js';
import './sp-overlay-DzkklhP1.js';
import './overlay-trigger-CSFKciRj.js';
import { o as o$1 } from './if-defined-DDJGFaN4.js';
import './spectrum-icon-cross.css-NFfmPqwL.js';
import './ButtonBase-Euqk2NbC.js';
import './like-anchor-B3Uz3TFY.js';
import './focusable-w-VMKDtH.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './sp-icon-cross500-CGrmdtVu.js';
import './Cross500-HJNUUNvY.js';
import './sizedMixin-BzkTbMb8.js';
import './custom-tag-Diwq7nXX.js';
import './Info-CGVxk8Iv.js';
import './CheckmarkCircle-DkBM2WW_.js';
import './PendingState-BK9ivzsq.js';
import './get-label-from-slot-Cg6mfN40.js';
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
import './query-assigned-elements-C9WOp2R6.js';
import './state-DrummH0c.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';

const o=i`
    :host{--spectrum-toast-font-weight:var(--spectrum-regular-font-weight);--spectrum-toast-font-size:var(--spectrum-font-size-100);--spectrum-toast-corner-radius:var(--spectrum-corner-radius-100);--spectrum-toast-block-size:var(--spectrum-toast-height);--spectrum-toast-max-inline-size:var(--spectrum-toast-maximum-width);--spectrum-toast-border-width:var(--spectrum-border-width-100);--spectrum-toast-line-height:var(--spectrum-line-height-100);--spectrum-toast-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-toast-spacing-icon-to-text:var(--spectrum-text-to-visual-100);--spectrum-toast-spacing-start-edge-to-text-and-icon:var(--spectrum-spacing-300);--spectrum-toast-spacing-text-and-action-button-to-divider:var(--spectrum-spacing-300);--spectrum-toast-spacing-top-edge-to-divider:var(--spectrum-spacing-100);--spectrum-toast-spacing-bottom-edge-to-divider:var(--spectrum-spacing-100);--spectrum-toast-spacing-top-edge-to-icon:var(--spectrum-toast-top-to-workflow-icon);--spectrum-toast-spacing-text-to-action-button-horizontal:var(--spectrum-spacing-300);--spectrum-toast-spacing-close-button:var(--spectrum-spacing-100);--spectrum-toast-spacing-block-start:var(--spectrum-spacing-100);--spectrum-toast-spacing-block-end:var(--spectrum-spacing-100);--spectrum-toast-spacing-top-edge-to-text:var(--spectrum-toast-top-to-text);--spectrum-toast-spacing-bottom-edge-to-text:var(--spectrum-toast-bottom-to-text);--spectrum-toast-negative-background-color-default:var(--spectrum-negative-background-color-default);--spectrum-toast-positive-background-color-default:var(--spectrum-positive-background-color-default);--spectrum-toast-informative-background-color-default:var(--spectrum-informative-background-color-default);--spectrum-toast-text-and-icon-color:var(--spectrum-white);--spectrum-toast-divider-color:var(--spectrum-transparent-white-300)}@media (forced-colors:active){:host{--highcontrast-toast-border-color:ButtonText;border:var(--mod-toast-border-width,var(--spectrum-toast-border-width))solid var(--highcontrast-toast-border-color,transparent)}}:host{box-sizing:border-box;min-block-size:var(--mod-toast-block-size,var(--spectrum-toast-block-size));max-inline-size:var(--mod-toast-max-inline-size,var(--spectrum-toast-max-inline-size));border-radius:var(--mod-toast-corner-radius,var(--spectrum-toast-corner-radius));font-size:var(--mod-toast-font-size,var(--spectrum-toast-font-size));font-weight:var(--mod-toast-font-weight,var(--spectrum-toast-font-weight));-webkit-font-smoothing:antialiased;background-color:var(--highcontrast-toast-background-color-default,var(--mod-toast-background-color-default,var(--spectrum-toast-background-color-default)));color:var(--highcontrast-toast-background-color-default,var(--mod-toast-background-color-default,var(--spectrum-toast-background-color-default)));overflow-wrap:anywhere;flex-direction:row;align-items:stretch;padding-inline-start:var(--mod-toast-spacing-start-edge-to-text-and-icon,var(--spectrum-toast-spacing-start-edge-to-text-and-icon));display:inline-flex}:host([variant=negative]){background-color:var(--highcontrast-toast-negative-background-color-default,var(--mod-toast-negative-background-color-default,var(--spectrum-toast-negative-background-color-default)))}:host([variant=negative]),:host([variant=negative]) .closeButton:focus-visible:not(:active){color:var(--highcontrast-toast-negative-background-color-default,var(--mod-toast-negative-background-color-default,var(--spectrum-toast-negative-background-color-default)))}:host([variant=info]){background-color:var(--highcontrast-toast-informative-background-color-default,var(--mod-toast-informative-background-color-default,var(--spectrum-toast-informative-background-color-default)))}:host([variant=info]),:host([variant=info]) .closeButton:focus-visible:not(:active){color:var(--highcontrast-toast-informative-background-color-default,var(--mod-toast-informative-background-color-default,var(--spectrum-toast-informative-background-color-default)))}:host([variant=positive]){background-color:var(--highcontrast-toast-positive-background-color-default,var(--mod-toast-positive-background-color-default,var(--spectrum-toast-positive-background-color-default)))}:host([variant=positive]),:host([variant=positive]) .closeButton:focus-visible:not(:active){color:var(--highcontrast-toast-positive-background-color-default,var(--mod-toast-positive-background-color-default,var(--spectrum-toast-positive-background-color-default)))}.type{flex-grow:0;flex-shrink:0;margin-block-start:var(--mod-toast-spacing-top-edge-to-icon,var(--spectrum-toast-spacing-top-edge-to-icon));margin-inline-start:0;margin-inline-end:var(--mod-toast-spacing-icon-to-text,var(--spectrum-toast-spacing-icon-to-text))}.content,.type{color:var(--highcontrast-toast-text-and-icon-color,var(--mod-toast-text-and-icon-color,var(--spectrum-toast-text-and-icon-color)))}.content{box-sizing:border-box;line-height:var(--mod-toast-line-height,var(--spectrum-toast-line-height));text-align:start;flex:auto;padding-block-start:calc(var(--mod-toast-spacing-top-edge-to-text,var(--spectrum-toast-spacing-top-edge-to-text)) - var(--mod-toast-spacing-block-start,var(--spectrum-toast-spacing-block-start)));padding-block-end:calc(var(--mod-toast-spacing-bottom-edge-to-text,var(--spectrum-toast-spacing-bottom-edge-to-text)) - var(--mod-toast-spacing-block-end,var(--spectrum-toast-spacing-block-end)));padding-inline-start:0;padding-inline-end:var(--mod-toast-spacing-text-to-action-button-horizontal,var(--spectrum-toast-spacing-text-to-action-button-horizontal));display:inline-block}.content:lang(ja),.content:lang(ko),.content:lang(zh){line-height:var(--mod-toast-line-height-cjk,var(--spectrum-toast-line-height-cjk))}.buttons{border-inline-start-color:var(--mod-toast-divider-color,var(--spectrum-toast-divider-color));flex:none;align-items:flex-start;margin-block-start:var(--mod-toast-spacing-top-edge-to-divider,var(--spectrum-toast-spacing-top-edge-to-divider));margin-block-end:var(--mod-toast-spacing-bottom-edge-to-divider,var(--spectrum-toast-spacing-bottom-edge-to-divider));padding-inline-end:var(--mod-toast-spacing-close-button,var(--spectrum-toast-spacing-close-button));display:flex}.buttons .spectrum-CloseButton{align-self:flex-start}.body{flex-wrap:wrap;flex:auto;align-self:center;align-items:center;padding-block-start:var(--mod-toast-spacing-block-start,var(--spectrum-toast-spacing-block-start));padding-block-end:var(--mod-toast-spacing-block-end,var(--spectrum-toast-spacing-block-end));display:flex}.body ::slotted([slot=action]){margin-inline-start:auto;margin-inline-end:var(--mod-toast-spacing-text-and-action-button-to-divider,var(--spectrum-toast-spacing-text-and-action-button-to-divider))}.body ::slotted([slot=action]:dir(rtl)),:host([dir=rtl]) .body ::slotted([slot=action]){margin-inline-end:var(--mod-toast-spacing-text-and-action-button-to-divider,var(--spectrum-toast-spacing-text-and-action-button-to-divider))}.body+.buttons{border-inline-start-style:solid;border-inline-start-width:1px;padding-inline-start:var(--mod-toast-spacing-close-button,var(--spectrum-toast-spacing-close-button))}:host{--spectrum-toast-background-color-default:var(--system-spectrum-toast-background-color-default)}:host{--spectrum-overlay-animation-distance:var(--spectrum-spacing-100);--spectrum-overlay-animation-duration:var(--spectrum-animation-duration-100);opacity:0;pointer-events:none;transition:transform var(--spectrum-overlay-animation-duration)ease-in-out,opacity var(--spectrum-overlay-animation-duration)ease-in-out,visibility 0s linear var(--spectrum-overlay-animation-duration);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;visibility:visible;transition-delay:0s}
`;

var c=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var r=(a,i,t,o)=>{for(var e=o>1?void 0:o?p(i,t):i,s=a.length-1,u;s>=0;s--)(u=a[s])&&(e=(o?u(i,t,e):u(e))||e);return o&&e&&c(i,t,e),e};const toastVariants=["negative","positive","info","error","warning"];class Toast extends FocusVisiblePolyfillMixin(SpectrumElement){constructor(){super(...arguments);this.open=!1;this._timeout=null;this._variant="";this.countdownStart=0;this.nextCount=-1;this.doCountdown=t=>{this.countdownStart||(this.countdownStart=performance.now()),t-this.countdownStart>this._timeout?(this.shouldClose(),this.countdownStart=0):this.countdown();};this.countdown=()=>{cancelAnimationFrame(this.nextCount),this.nextCount=requestAnimationFrame(this.doCountdown);};this.holdCountdown=()=>{this.stopCountdown(),this.addEventListener("focusout",this.resumeCountdown);};this.resumeCountdown=()=>{this.removeEventListener("focusout",this.holdCountdown),this.countdown();};}static get styles(){return [o]}set timeout(t){const e=typeof t!==null&&t>0?Math.max(6e3,t):null,s=this.timeout;e&&this.countdownStart&&(this.countdownStart=performance.now()),this._timeout=e,this.requestUpdate("timeout",s);}get timeout(){return this._timeout}set variant(t){if(t===this.variant)return;const o=this.variant;toastVariants.includes(t)?(this.setAttribute("variant",t),this._variant=t):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",o);}get variant(){return this._variant}renderIcon(t){switch(t){case"info":return x`
                    <sp-icon-info
                        label="Information"
                        class="type"
                    ></sp-icon-info>
                `;case"negative":case"error":case"warning":return x`
                    <sp-icon-alert label="Error" class="type"></sp-icon-alert>
                `;case"positive":case"success":return x`
                    <sp-icon-checkmark-circle
                        label="Success"
                        class="type"
                    ></sp-icon-checkmark-circle>
                `;default:return x``}}startCountdown(){this.countdown(),this.addEventListener("focusin",this.holdCountdown);}stopCountdown(){cancelAnimationFrame(this.nextCount),this.countdownStart=0;}shouldClose(){this.dispatchEvent(new CustomEvent("close",{composed:!0,bubbles:!0,cancelable:!0}))&&this.close();}close(){this.open=!1;}render(){return x`
            ${this.renderIcon(this.variant)}
            <div class="body" role="alert">
                <div class="content">
                    <slot></slot>
                </div>
                <slot name="action"></slot>
            </div>
            <div class="buttons">
                <sp-close-button
                    @click=${this.shouldClose}
                    label="Close"
                    static="white"
                ></sp-close-button>
            </div>
        `}updated(t){super.updated(t),t.has("open")&&(this.open?this.timeout&&this.startCountdown():this.timeout&&this.stopCountdown()),t.has("timeout")&&(this.timeout!==null&&this.open?this.startCountdown():this.stopCountdown());}}r([n({type:Boolean,reflect:!0})],Toast.prototype,"open",2),r([n({type:Number})],Toast.prototype,"timeout",1),r([n({type:String})],Toast.prototype,"variant",1);

defineElement("sp-toast",Toast);

const toast = ({
  variant = "",
  open = true,
  content = ""
}) => x`
    <sp-toast
        variant=${variant}
        ?open=${open}
    >
        ${content}
        <sp-button
            slot="action"
            static="white"
            variant="secondary"
            treatment="outline"
        >
            Undo
        </sp-button>
    </sp-toast>
`;
var toast_stories = {
  component: "sp-toast",
  title: "Toast",
  args: {
    content: "This is a toast message.",
    open: true
  },
  argTypes: {
    content: {
      name: "content",
      type: { name: "string", required: false },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" }
      },
      control: "text"
    },
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      description: "Whether the toast is open.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    }
  }
};
const Default = ({
  variant,
  open,
  content
}) => {
  return toast({ variant, open, content });
};
const variantDemo = ({
  variant,
  open,
  content
}) => {
  return toast({ variant, open, content });
};
const Positive = (args) => variantDemo({ ...args, variant: "positive" });
const Negative = (args) => variantDemo({ ...args, variant: "negative" });
const Info = (args) => variantDemo({ ...args, variant: "info" });
const Wrapping = (args) => variantDemo({
  ...args,
  variant: "info",
  content: "A new version of Lightroom Classic is now available. Use the Update button below to start using the new version."
});
const overlayStyles = x`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator > div {
            display: contents;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
            margin: 24px 0;
        }

        .self-managed:nth-child(3) {
            margin-left: 50px;
        }
    </style>
`;
const overlaid = (openPlacement) => {
  return x`
        ${overlayStyles}
        ${[
    ["bottom", ""],
    ["left", "negative"],
    ["right", "positive"],
    ["top", "info"]
  ].map(([placement, variant]) => {
    return x`
                <overlay-trigger
                    placement=${placement}
                    open=${o$1(
      openPlacement === placement ? "click" : void 0
    )}
                >
                    <sp-button label="${placement} test" slot="trigger">
                        Click for ${variant ? variant : "toast"} on the
                        ${placement}
                    </sp-button>
                    <sp-toast slot="click-content" variant=${variant}>
                        ${placement}
                    </sp-toast>
                </overlay-trigger>
            `;
  })}
    `;
};
const overlaidTop = () => overlaid("top");
const overlaidRight = () => overlaid("right");
const overlaidBottom = () => overlaid("bottom");
const overlaidLeft = () => overlaid("left");
const overlay = (args) => {
  return x`
        <style>
            sp-toast {
                position: fixed;
                bottom: 1em;
                left: 1em;
            }
        </style>
        <sp-button id="overlay">Toggle Toast overlay</sp-button>
        <sp-overlay trigger="overlay@click" type="auto" open>
            ${variantDemo({ ...args, variant: "positive" })}
        </sp-overlay>
    `;
};
const __namedExportsOrder = ['Default', 'Positive', 'Negative', 'Info', 'Wrapping', 'overlaidTop', 'overlaidRight', 'overlaidBottom', 'overlaidLeft', 'overlay'];

export { Default, Info, Negative, Positive, Wrapping, __namedExportsOrder, toast_stories as default, overlaidBottom, overlaidLeft, overlaidRight, overlaidTop, overlay };
