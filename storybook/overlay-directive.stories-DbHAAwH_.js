import './sp-action-button-DsNjWZwM.js';
import './sp-action-group-B13QDRfi.js';
import './sp-button-B9ZHODJ3.js';
import './sp-dialog-wrapper-CExSOkXt.js';
import './sp-field-label-BIZFvuFw.js';
import './sp-icon-magnify-D5t0pL7C.js';
import './sp-icon-open-in-CH04_5e_.js';
import './overlay-trigger-DwDaLntS.js';
import { t as trigger, a as tooltip } from './tooltip-directive-CdAaP-Dx.js';
import './sp-dialog-CU3adQ2V.js';
import './sp-picker-B0I3ctI1.js';
import './sp-menu-C8v97wTb.js';
import './sp-menu-item-8u7lqO6f.js';
import './sp-menu-divider-CCA3Ih_f.js';
import './sp-popover-8oM61WIR.js';
import './sp-slider-D-scyyvc.js';
import './sp-radio-DPg9U0eL.js';
import './sp-radio-group-B2YbMxRq.js';
import './sp-tooltip-CuYNrF2w.js';
import './scale-large-DVrligW2.js';
import './sp-accordion-item-BoZCfqvi.js';
import './overlay-story-components-ZMqy5D5b.js';
import { x } from './lit-html-COgVUehj.js';
import { r } from './state-Bu2qBYzT.js';
import { s } from './lit-element-BL-po2DW.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-icon-corner-triangle300-BFQa-tNZ.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-Fm5B4nA1.js';
import './define-element-DfDMCiEa.js';
import './ButtonBase-C7Ofi_KG.js';
import './like-anchor-BYGSHbJ7.js';
import './focusable-DH4iFM4s.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BtuI5sqC.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-Cgw04SVn.js';
import './RovingTabindex-CoaPJLDZ.js';
import './FocusGroup-BxawWWgQ.js';
import './when-DEJm_QN9.js';
import './sp-underlay-CnrPcC1Q.js';
import './DialogBase-DxwNP_Qw.js';
import './modal.css-BQfDEsFe.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './custom-tag-Diwq7nXX.js';
import './OpenIn-tSs9OqKP.js';
import './strategies-6QgzTA9E.js';
import './AbstractOverlay-DBN9Pvzh.js';
import './platform-DpSwcmux.js';
import './slottable-request-event-DXuuyGoq.js';
import './slottable-request-directive-BvrOiskA.js';
import './directive-Bn5c4u4M.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './sp-divider-C4qqgprH.js';
import './divider.css-B2ErksQK.js';
import './sp-close-button-CIIV381x.js';
import './spectrum-icon-cross.css-BlifuMyY.js';
import './sp-icon-cross500-BK3u0Nvh.js';
import './Cross500-HJNUUNvY.js';
import './sp-button-group-BteaL6t5.js';
import './sp-icon-alert-BytVFlW2.js';
import './AlertDialog-BOt99ko7.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './Picker-BgAa-DDJ.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './sp-icon-chevron100-rjktYDjS.js';
import './Chevron100-2ZEB0c-t.js';
import './MatchMedia-pSNe9kbs.js';
import './DependencyManger-Dpkh1Bse.js';
import './style-map-DtKTc8KS.js';
import './spectrum-icon-checkmark.css-aJBgz3nt.js';
import './Popover-BDIzwbib.js';
import './LanguageResolution-BeoILyI5.js';
import './NumberFormatter-D4LOw21s.js';
import './streaming-listener-BPAf_aKW.js';
import './repeat-D5JakrYV.js';
import './FieldGroup-JXDIHljt.js';
import './manage-help-text-83_bseGo.js';
import './Overlay-CQ3Uc8eJ.js';
import './VirtualTrigger-DJFH9-uf.js';
import './query-assigned-elements-C9WOp2R6.js';

var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0 ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
  return result;
};
const storyStyles = x`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
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
        }

        #styled-div {
            background-color: var(--styled-div-background-color, blue);
            color: white;
            padding: 4px 10px;
            margin-bottom: 10px;
        }

        #inner-trigger {
            display: inline-block;
        }
    </style>
`;
var overlayDirective_stories = {
  title: "Overlay Directive",
  argTypes: {
    offset: { control: "number" },
    placement: {
      control: {
        type: "inline-radio",
        options: [
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "left",
          "left-start",
          "left-end",
          "right",
          "right-start",
          "right-end",
          "auto",
          "auto-start",
          "auto-end",
          "none"
        ]
      }
    },
    type: {
      control: {
        type: "inline-radio",
        options: ["modal", "replace", "inline"]
      }
    },
    colorStop: {
      control: {
        type: "inline-radio",
        options: ["light", "dark"]
      }
    },
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      description: "Whether the second accordion item is open.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    }
  },
  args: {
    placement: "bottom",
    offset: 0,
    colorStop: "light",
    triggerOn: "click",
    open: false
  }
};
const template = ({
  placement,
  offset,
  open,
  triggerOn,
  insertionOptions: insertionOptions2
}) => {
  const renderTooltip = () => x`
        Click to open a popover.
    `;
  const renderPopover = () => x`
        <sp-popover placement="${o(placement)}" tip>
            <sp-dialog no-divider>
                <div class="options-popover-content">
                    <sp-slider
                        value="5"
                        step="0.5"
                        min="0"
                        max="20"
                        label="Awesomeness"
                    ></sp-slider>
                    <div id="styled-div">
                        The background of this div should be blue
                    </div>
                    <sp-button
                        ${tooltip(
    () => x`
                                Click to open another popover.
                            `
  )}
                        ${trigger(
    () => x`
                                <sp-popover placement="bottom" tip open>
                                    <sp-dialog size="s" no-divider>
                                        <div class="options-popover-content">
                                            Another Popover
                                        </div>
                                    </sp-dialog>
                                </sp-popover>
                            `,
    {
      triggerInteraction: "click",
      overlayOptions: {
        placement: "bottom"
      }
    }
  )}
                    >
                        Press Me
                    </sp-button>
                </div>
            </sp-dialog>
        </sp-popover>
    `;
  return x`
        ${storyStyles}
        <sp-button
            variant="primary"
            ${tooltip(renderTooltip)}
            ${trigger(renderPopover, {
    open,
    triggerInteraction: triggerOn,
    overlayOptions: {
      placement,
      offset
    },
    insertionOptions: insertionOptions2
  })}
        >
            Show Popover
        </sp-button>
    `;
};
const Default = ({ open } = {}) => {
  const renderPopover = () => x`
        <sp-popover>
            <sp-dialog no-divider>Popover content goes here</sp-dialog>
        </sp-popover>
    `;
  const options = typeof open !== "undefined" ? { open } : void 0;
  return x`
        <sp-button ${trigger(renderPopover, options)}>Open Popover</sp-button>
    `;
};
Default.swc_vrt = {
  skip: true
};
const configured = (args) => template(args);
configured.swc_vrt = {
  skip: true
};
const insertionOptions = (args = {}) => x`
    ${template(args)}
    <div id="other-element"></div>
`;
insertionOptions.args = {
  insertionOptions: {
    el: () => document.querySelector("#other-element"),
    where: "afterbegin"
  }
};
insertionOptions.swc_vrt = {
  skip: true
};
class ManagedOverlayTrigger extends s {
  constructor() {
    super(...arguments);
    this.isRenderOverlay = false;
    this.isOpenState = false;
  }
  render() {
    return x`
            <sp-button
                @click=${() => {
      this.isRenderOverlay = !this.isRenderOverlay;
    }}
            >
                Toggle Overlay Render Button
            </sp-button>

            <sp-button
                @click=${() => {
      this.isRenderOverlay = true;
      this.isOpenState = true;
    }}
            >
                Create Overlay Render Button And Open Overlay
            </sp-button>

            ${this.isRenderOverlay ? this.renderOverlayButton() : x``}
        `;
  }
  renderOverlayButton() {
    return x`
            <sp-button
                ?selected=${this.isOpenState}
                ${trigger(
      () => x`
                        <sp-popover
                            @sp-opened=${(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }
        console.log("sp-opened");
        this.isOpenState = true;
      }}
                            @sp-closed=${(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }
        console.log("sp-closed");
        this.isOpenState = false;
      }}
                        >
                            <h1>My Test Popover</h1>
                        </sp-popover>
                    `,
      {
        triggerInteraction: "click",
        overlayOptions: { placement: "bottom-end" },
        open: this.isOpenState
      }
    )}
            >
                Toggle Popover
            </sp-button>
        `;
  }
}
__decorateClass([
  r()
], ManagedOverlayTrigger.prototype, "isRenderOverlay");
__decorateClass([
  r()
], ManagedOverlayTrigger.prototype, "isOpenState");
customElements.define("managed-overlay-trigger", ManagedOverlayTrigger);
const managedOverlayTrigger = () => x`
    <managed-overlay-trigger></managed-overlay-trigger>
`;
managedOverlayTrigger.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['Default', 'configured', 'insertionOptions', 'managedOverlayTrigger'];

export { Default, __namedExportsOrder, configured, overlayDirective_stories as default, insertionOptions, managedOverlayTrigger };
