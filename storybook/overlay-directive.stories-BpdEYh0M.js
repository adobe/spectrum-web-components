import './sp-action-button-PAnKUsuA.js';
import './sp-action-group-rAGuj7aO.js';
import './sp-button-7UsB7th2.js';
import './sp-dialog-wrapper-BkCBZk77.js';
import './sp-field-label-fJh5myzn.js';
import './sp-icon-magnify-0_l9zCrI.js';
import './sp-icon-open-in-CSkmNzqf.js';
import './overlay-trigger-C5VD46th.js';
import { t as trigger } from './overlay-trigger-directive-CugSPkvJ.js';
import './sp-dialog-BL8303L7.js';
import './sp-picker-lpoY1_cp.js';
import './sp-menu-C8gwerW7.js';
import './sp-menu-item-BvCt6i1i.js';
import './sp-menu-divider-DO09jjiJ.js';
import './sp-popover-B102U_Ct.js';
import './sp-slider-CsKugCpS.js';
import './sp-radio-BDYmRq4h.js';
import './sp-radio-group-LYpsZO-u.js';
import './sp-tooltip-B0L-sfep.js';
import './scale-large-4766aQML.js';
import './sp-accordion-item-C5GVaGdm.js';
import './overlay-story-components-Ga2fjBeU.js';
import { t as tooltip } from './tooltip-directive-vVsGwryG.js';
import { x } from './lit-html-COgVUehj.js';
import { r } from './state-a9qXQZw8.js';
import { s } from './lit-element-BulMEkr1.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-icon-corner-triangle300-DK57Of1v.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './IconBase-luFyVpTn.js';
import './define-element-Bun2ZgR-.js';
import './ButtonBase-CsEYgJMd.js';
import './like-anchor-BaNwPfYf.js';
import './focusable-y67P8eQI.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-B-N3zGRD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-BPhwmt-S.js';
import './RovingTabindex-BIFuw_W7.js';
import './FocusGroup-CQTGJWkN.js';
import './PendingState-E3cyhDnE.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sp-underlay-BPAUVGZw.js';
import './DialogBase-DqVUX5QK.js';
import './modal.css-fEtfRe6E.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './custom-tag-Diwq7nXX.js';
import './Magnify-C5ml_uGy.js';
import './OpenIn-B4CGxe-k.js';
import './sp-overlay-CZ8spV_x.js';
import './Overlay-JLImRQEv.js';
import './VirtualTrigger-OIs6mMoi.js';
import './platform-r3Lf9REX.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './slottable-request-directive-BvrOiskA.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './sp-button-group-CE41M4aF.js';
import './sp-close-button-lSGl90iz.js';
import './spectrum-icon-cross.css-BnEt-gNk.js';
import './sp-icon-cross500-YCeW9dRQ.js';
import './Cross500-Cv8kebkP.js';
import './sp-divider-3kMtD0vw.js';
import './divider.css-CtZfV7_5.js';
import './sp-icon-alert-C9LsQVsg.js';
import './AlertDialog-HG6NuEhI.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './Picker-CxuFZEXv.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './sp-icon-chevron100-6ixyTd8T.js';
import './Chevron100-OyV1wQMZ.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './spectrum-icon-checkmark.css-Df67pkTu.js';
import './Popover-C-ExIAey.js';
import './LanguageResolution-BeoILyI5.js';
import './NumberFormatter-BGiO5zHN.js';
import './streaming-listener-CmIYw2xv.js';
import './repeat-D5JakrYV.js';
import './FieldGroup-Dt7eAgMG.js';
import './manage-help-text-CQxj8H8g.js';
import './when-DEJm_QN9.js';

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
Default.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
const configured = (args) => template(args);
configured.swc_vrt = {
  skip: true
};
configured.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
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
insertionOptions.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
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
managedOverlayTrigger.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
const __namedExportsOrder = ['Default', 'configured', 'insertionOptions', 'managedOverlayTrigger'];

export { Default, __namedExportsOrder, configured, overlayDirective_stories as default, insertionOptions, managedOverlayTrigger };
