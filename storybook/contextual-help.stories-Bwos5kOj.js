import { s as spreadProps } from './lit-helpers-DFCD1oU3.js';
import './sp-link-DslkogVS.js';
import './sp-action-button-BGmiWspi.js';
import './sp-overlay-DzkklhP1.js';
import './sp-icon-info-outline-5w6c2dMG.js';
import { r as removeSlottableRequest } from './slottable-request-event-DXuuyGoq.js';
import { M as MatchMediaController, I as IS_MOBILE } from './MatchMedia-SZ42m4IA.js';
import { i as i$1 } from './lit-element-BulMEkr1.js';
import { S as SpectrumElement, n } from './define-element-C_3bgzm7.js';
import { x, j } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './like-anchor-B3Uz3TFY.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-icon-corner-triangle300-Df1iqVxq.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './ButtonBase-Euqk2NbC.js';
import './observe-slot-text-C6K935AT.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './sizedMixin-BzkTbMb8.js';
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
import './query-assigned-elements-C9WOp2R6.js';
import './state-DrummH0c.js';
import './style-map-DtKTc8KS.js';
import './InfoOutline-ip7UHYHN.js';
import './custom-tag-Diwq7nXX.js';

const argTypes = {
  open: {
    name: "open",
    type: { name: "boolean", required: false },
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  variant: {
    name: "variant",
    type: { name: "string", required: false },
    table: {
      defaultValue: { summary: "info" }
    },
    control: {
      labels: {
        info: "Info",
        help: "Help"
      },
      type: "select"
    },
    options: ["info", "help"]
  },
  label: {
    name: "label",
    type: { name: "string", required: false },
    table: {
      type: { summary: "label" },
      defaultValue: { summary: "Informations" }
    },
    control: "text"
  },
  offset: {
    name: "offset",
    type: { name: "number", required: false },
    table: {
      type: { summary: "offset" },
      defaultValue: { summary: 0 }
    },
    control: "number"
  },
  placement: {
    name: "placement",
    type: { name: "string", required: false },
    description: "The placement of the popover content in relation to the button",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "bottom-start" }
    },
    control: {
      type: "select",
      labels: {
        top: "top",
        "top-start": "top-start",
        "top-end": "top-end",
        right: "right",
        "right-start": "right-start",
        "right-end": "right-end",
        bottom: "bottom",
        "bottom-start": "bottom-start",
        "bottom-end": "bottom-end",
        left: "left",
        "left-start": "left-start",
        "left-end": "left-end"
      }
    },
    options: [
      "top",
      "top-start",
      "top-end",
      "right",
      "right-start",
      "right-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end"
    ]
  }
};

const e=i$1`
    :host{--spectrum-contextual-help-padding:var(--spectrum-spacing-400);--spectrum-contextual-help-content-spacing:var(--spectrum-spacing-100);--spectrum-contextual-help-link-spacing:var(--spectrum-spacing-300);--spectrum-contextual-help-heading-size:var(--spectrum-contextual-help-title-size);--spectrum-contextual-help-heading-color:var(--spectrum-heading-color);--spectrum-contextual-help-body-color:var(--spectrum-body-color)}.popover{min-inline-size:var(--mod-spectrum-contextual-help-minimum-width,var(--spectrum-contextual-help-minimum-width));padding-block:var(--mod-spectrum-contextual-help-padding,var(--spectrum-contextual-help-padding));padding-inline:var(--mod-spectrum-contextual-help-padding,var(--spectrum-contextual-help-padding));font-size:var(--mod-spectrum-contextual-help-body-size,var(--spectrum-contextual-help-body-size));color:var(--highcontrast-contextual-help-body-color,var(--mod-contextual-help-body-color,var(--spectrum-contextual-help-body-color)));position:relative}.popover ::slotted([slot=heading]),.popover .body{margin:0}.popover ::slotted([slot=heading]){font-size:var(--mod-spectrum-contextual-help-heading-size,var(--spectrum-contextual-help-heading-size));color:var(--highcontrast-contextual-help-heading-color,var(--mod-contextual-help-heading-color,var(--spectrum-contextual-help-heading-color)));margin-block-end:var(--mod-spectrum-contextual-help-content-spacing,var(--spectrum-contextual-help-content-spacing))}::slotted([slot=link]){margin-block-start:var(--mod-spectrum-contextual-help-link-spacing,var(--spectrum-contextual-help-link-spacing))}@media (forced-colors:active){:host{--highcontrast-contextual-help-heading-color:CanvasText;--highcontrast-contextual-help-body-color:CanvasText}}:host{display:inline-block}::slotted([slot=link]){display:block}
`;

var u=Object.defineProperty;var i=(n,s,e,o)=>{for(var t=void 0,a=n.length-1,p;a>=0;a--)(p=n[a])&&(t=(p(s,e,t))||t);return t&&u(s,e,t),t};class ContextualHelp extends SpectrumElement{constructor(){super(...arguments);this.isMobile=new MatchMediaController(this,IS_MOBILE);this.variant="info";this.placement="bottom-start";this.offset=0;this.open=!1;}static get styles(){return [e]}get buttonAriaLabel(){return this.label?this.label:this.variant==="help"?"Help":"Informations"}renderOverlayContent(){return this.isMobile.matches?(import('./sp-dialog-base-B6ucNQF5.js'),import('./sp-dialog-jhL1CbyX.js'),x`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s">
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `):(import('./sp-popover-BH6yktMg.js'),x`
                <sp-popover class="popover">
                    <section>
                        <slot name="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </section>
                </sp-popover>
            `)}handleSlottableRequest(e){if(e.stopPropagation(),e.data===removeSlottableRequest){this.open=!1,j(void 0,e.target);return}this.open=!0;const o=this.renderOverlayContent();j(o,e.target);}render(){const e=this.isMobile.matches?void 0:this.placement;return x`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label=${this.buttonAriaLabel}
                .active=${this.open}
            >
                ${this.variant==="help"?x`
                          <sp-icon-help-outline
                              slot="icon"
                          ></sp-icon-help-outline>
                      `:x`
                          <sp-icon-info-outline
                              slot="icon"
                          ></sp-icon-info-outline>
                      `}
            </sp-action-button>
            <sp-overlay
                trigger="trigger@click"
                placement=${o(e)}
                type=${this.isMobile.matches?"modal":"auto"}
                receives-focus="true"
                .offset=${this.offset}
                @slottable-request=${this.handleSlottableRequest}
                ?open=${this.open}
            ></sp-overlay>
        `}}i([n()],ContextualHelp.prototype,"label"),i([n()],ContextualHelp.prototype,"variant"),i([n({reflect:!0})],ContextualHelp.prototype,"placement"),i([n({type:Number})],ContextualHelp.prototype,"offset"),i([n({type:Boolean})],ContextualHelp.prototype,"open");

customElements.define("sp-contextual-help",ContextualHelp);

const ContextualHelpMarkup = (args = {}) => {
  return x`
        <sp-contextual-help
            ${spreadProps(args)}
            placement=${o(args.placement)}
        >
            <h2 slot="heading">Permission required</h2>
            Your admin must grant you permission before you can create a
            segment.
            <sp-link
                slot="link"
                href="https://opensource.adobe.com/spectrum-web-components/"
            >
                Request permission
            </sp-link>
        </sp-contextual-help>
    `;
};

const Template = ContextualHelpMarkup;

var contextualHelp_stories = {
  title: "Contextual Help",
  component: "sp-contextual-help",
  args: {
    label: "",
    variant: "info",
    placement: void 0
  },
  argTypes
};
const Default = (args) => Template(args);
Default.args = {
  open: true
};
const Help = (args) => Template(args);
Help.args = {
  variant: "help",
  open: true
};
const CustomPlacement = (args) => {
  return x`
        <div
            style="width: 100%; height: 500px; display: flex; align-items: center; justify-content: center"
        >
            ${Template(args)}
        </div>
    `;
};
CustomPlacement.args = {
  placement: "top",
  open: true
};
const __namedExportsOrder = ['Default', 'Help', 'CustomPlacement'];

export { CustomPlacement, Default, Help, __namedExportsOrder, contextualHelp_stories as default };
