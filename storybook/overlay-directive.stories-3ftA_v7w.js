import './sp-action-button-DQC3w3vC.js';
import './sp-action-group-W7xJ_nXi.js';
import './sp-button-BmJ8gt0Z.js';
import './sp-dialog-wrapper-Czbm5TRL.js';
import './sp-field-label-Cf_nvrkT.js';
import './sp-icon-magnify-_GUW8YFm.js';
import './sp-icon-open-in-UFi3TJNT.js';
import './overlay-trigger-UC0lZxuK.js';
import { t as trigger, a as tooltip } from './tooltip-directive-D6b15KGb.js';
import './sp-dialog-EHeq_Di1.js';
import './sp-picker-MyfGeuIK.js';
import './sp-menu-Bi5ZsR-Z.js';
import './sp-menu-item-KlLN_ToV.js';
import './sp-menu-divider-B0WEfwsh.js';
import './sp-popover-Ico2SJk-.js';
import './sp-slider-viasVaFt.js';
import './sp-radio-BYF-cvA2.js';
import './sp-radio-group-BWM9nSHP.js';
import './sp-tooltip-B_vYfZ6z.js';
import './scale-large-DByMUZUK.js';
import './sp-accordion-item-DayMgf2t.js';
import './overlay-story-components-Bqy3BxLg.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './lit-element-BL-po2DW.js';
import './sp-icon-corner-triangle300-DVd-V7my.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-C1z7UsT5.js';
import './define-element-ByMWMcVd.js';
import './ButtonBase-CjmqgWAT.js';
import './like-anchor-3x3vwb8N.js';
import './focusable-CUJIQEAB.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DLXbbJr-.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-C1lD98vT.js';
import './RovingTabindex-Dx9AbyW7.js';
import './FocusGroup-B9OwLCq7.js';
import './when-DEJm_QN9.js';
import './sp-underlay-D7zhKn8t.js';
import './DialogBase-DuFveaJY.js';
import './modal.css-Dkp8hmGu.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './custom-tag-Diwq7nXX.js';
import './OpenIn-tSs9OqKP.js';
import './state-DGkVCdxP.js';
import './directive-Bn5c4u4M.js';
import './strategies-LVmDxAdp.js';
import './AbstractOverlay-BmdjRMJl.js';
import './platform-DpSwcmux.js';
import './slottable-request-event-DXuuyGoq.js';
import './slottable-request-directive-KFtRYWgP.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './sp-divider-asUB-RW9.js';
import './divider.css-Y7Qapv-N.js';
import './sp-close-button-F_CqGl_E.js';
import './spectrum-icon-cross.css-QYryUXt1.js';
import './sp-icon-cross500-hbjCQNCW.js';
import './Cross500-HJNUUNvY.js';
import './sp-button-group-Bhumsiq0.js';
import './sp-icon-alert-ClrE4xtp.js';
import './AlertDialog-DQXOZKhw.js';
import './resize-controller-BJKfu6ft.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './class-map-DdRvesrq.js';
import './Picker-C2X8FAZ-.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './sp-icon-chevron100-CvWYkNtC.js';
import './Chevron100-2ZEB0c-t.js';
import './MatchMedia-pSNe9kbs.js';
import './DependencyManger-Dpkh1Bse.js';
import './style-map-DtKTc8KS.js';
import './spectrum-icon-checkmark.css-B6wBbQoF.js';
import './Popover-D7EtKebK.js';
import './LanguageResolution-BeoILyI5.js';
import './NumberFormatter-D4LOw21s.js';
import './streaming-listener-BPAf_aKW.js';
import './repeat-D5JakrYV.js';
import './FieldGroup-lPwapUF5.js';
import './manage-help-text-83_bseGo.js';
import './Overlay-Bunm4wxf.js';
import './VirtualTrigger-Cyjxfq5s.js';
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
