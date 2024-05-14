import './sp-action-button-tPVQtofG.js';
import './sp-action-group-BbnNC7Vs.js';
import './sp-button-Fy_2FMPk.js';
import './sp-dialog-wrapper-_BE1bsVg.js';
import './sp-field-label-C3QRVf2K.js';
import './sp-icon-magnify-yczs9bmB.js';
import './sp-icon-open-in-BsD0OQUS.js';
import './overlay-trigger-DkX_0tFq.js';
import { t as trigger, a as tooltip } from './tooltip-directive-DHP6JSXu.js';
import './sp-dialog-DzawesJV.js';
import './sp-picker-BzPgduwq.js';
import './sp-menu-CUlDsjuI.js';
import './sp-menu-item-C1UX3rOw.js';
import './sp-menu-divider-C2nPYE43.js';
import './sp-popover-BwkBJERl.js';
import './sp-slider-BS6bnhIS.js';
import './sp-radio-U9688P-E.js';
import './sp-radio-group-B_-68lje.js';
import './sp-tooltip-BvooPJH3.js';
import './scale-large-B4_-5eq3.js';
import './sp-accordion-item-CYuN-dWw.js';
import './overlay-story-components-DgPUYyo9.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './lit-element-BL-po2DW.js';
import './sp-icon-corner-triangle300-Cr7f54D_.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-L76-n75s.js';
import './define-element-9Zj84-C8.js';
import './ButtonBase-adwZ7HOt.js';
import './like-anchor-c-omWQV-.js';
import './focusable-CfMGZF2L.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Dr0dVrDu.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-H6qLwJc0.js';
import './RovingTabindex-Dx9AbyW7.js';
import './FocusGroup-B9OwLCq7.js';
import './when-DEJm_QN9.js';
import './sp-underlay-Ye02jNXB.js';
import './DialogBase-BjE-2qON.js';
import './modal.css-Dkp8hmGu.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './custom-tag-Diwq7nXX.js';
import './OpenIn-tSs9OqKP.js';
import './state-DdC_O7Nr.js';
import './directive-Bn5c4u4M.js';
import './strategies-D55DpKq5.js';
import './AbstractOverlay-G-bc58e6.js';
import './platform-DpSwcmux.js';
import './slottable-request-event-DXuuyGoq.js';
import './slottable-request-directive-KFtRYWgP.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './sp-divider-BpFfGzVw.js';
import './divider.css-Y7Qapv-N.js';
import './sp-close-button-FXF4gEEu.js';
import './spectrum-icon-cross.css-DAq7WwgI.js';
import './sp-icon-cross500-D7FFi1Q9.js';
import './Cross500-HJNUUNvY.js';
import './sp-button-group-Dtho_kG8.js';
import './sp-icon-alert-GYTZvYm3.js';
import './AlertDialog-D-R6aPVf.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './Picker-sbrTRXP-.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './sp-icon-chevron100-BVn8JicT.js';
import './Chevron100-2ZEB0c-t.js';
import './MatchMedia-pSNe9kbs.js';
import './DependencyManger-Dpkh1Bse.js';
import './style-map-DtKTc8KS.js';
import './spectrum-icon-checkmark.css-B4Pvgr0C.js';
import './Popover-BxK5qKxD.js';
import './LanguageResolution-BeoILyI5.js';
import './NumberFormatter-D4LOw21s.js';
import './streaming-listener-BPAf_aKW.js';
import './repeat-D5JakrYV.js';
import './FieldGroup-DBgSOjqE.js';
import './manage-help-text-83_bseGo.js';
import './Overlay-C74Q9IX1.js';
import './VirtualTrigger-CAvKqDm5.js';
import './query-assigned-elements-C9WOp2R6.js';

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
const congifured = (args) => template(args);
congifured.swc_vrt = {
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
const __namedExportsOrder = ['Default', 'congifured', 'insertionOptions'];

export { Default, __namedExportsOrder, congifured, overlayDirective_stories as default, insertionOptions };
