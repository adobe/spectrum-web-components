import './sp-action-button-zOTvHmVo.js';
import './sp-action-group-sE69i9qK.js';
import './sp-button-Jx9C1QJR.js';
import './sp-dialog-wrapper-D0398DBK.js';
import './sp-field-label-Ch5xsMdL.js';
import './sp-icon-magnify-DdRfx8DE.js';
import './sp-icon-open-in-DThC77z9.js';
import './overlay-trigger-CL4xZdEC.js';
import { t as trigger } from './overlay-trigger-directive-BPVYkEni.js';
import './sp-dialog-CONxNJkg.js';
import './sp-picker-BeUD08n7.js';
import './sp-menu-D_v7PNrL.js';
import './sp-menu-item-CGctvWP9.js';
import './sp-menu-divider-DfVUzcBg.js';
import './sp-popover-BX8AK4Iy.js';
import './sp-slider-Bo2y0q0E.js';
import './sp-radio-CIhTa8f7.js';
import './sp-radio-group-jTMw_8Ol.js';
import './sp-tooltip-3SQwOpOw.js';
import './scale-large-qK6gFUG-.js';
import './sp-accordion-item-68PM5d0r.js';
import './overlay-story-components-CEDXEUzn.js';
import { t as tooltip } from './tooltip-directive-B5eQdUn9.js';
import { x } from './lit-html-COgVUehj.js';
import { r } from './state-DrGS5Kkk.js';
import { s } from './lit-element-BulMEkr1.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-icon-corner-triangle300-BndhYbNS.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './IconBase-CmREmoFq.js';
import './define-element-B3-QvDZd.js';
import './ButtonBase-DFBdS0ya.js';
import './like-anchor-YCQdykQc.js';
import './focusable-CRwO5NCP.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BVY5OzXy.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-Bh0Au8rG.js';
import './RovingTabindex-BIFuw_W7.js';
import './FocusGroup-CQTGJWkN.js';
import './PendingState-BeXRKpss.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sp-underlay-C4bkS1w-.js';
import './DialogBase-BJymsXhO.js';
import './modal.css-fEtfRe6E.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './custom-tag-Diwq7nXX.js';
import './Magnify-C5ml_uGy.js';
import './OpenIn-B4CGxe-k.js';
import './sp-overlay-EGgM3rGi.js';
import './Overlay-BQ6S2Tgo.js';
import './VirtualTrigger-CbtiJp0Q.js';
import './platform-r3Lf9REX.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './slottable-request-directive-BvrOiskA.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './sp-divider-D8rzt-Po.js';
import './divider.css-CtZfV7_5.js';
import './sp-close-button-BIBdPV-e.js';
import './spectrum-icon-cross.css-CaX-pCP6.js';
import './sp-icon-cross500-Cn6RmLUH.js';
import './Cross500-Cv8kebkP.js';
import './sp-button-group-BL2_DFr_.js';
import './sp-icon-alert-BbDxiD8e.js';
import './AlertDialog-BtPIEJ49.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './Picker-CF-OcCRv.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './sp-icon-chevron100-BDtqmJ8W.js';
import './Chevron100-OyV1wQMZ.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './spectrum-icon-checkmark.css-CQ7hyD1X.js';
import './Popover-TVm2JsJD.js';
import './LanguageResolution-BeoILyI5.js';
import './NumberFormatter-BGiO5zHN.js';
import './streaming-listener-CmIYw2xv.js';
import './repeat-D5JakrYV.js';
import './FieldGroup-B-ra1MEv.js';
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
