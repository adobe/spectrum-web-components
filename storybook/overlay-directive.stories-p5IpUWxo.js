import './sp-action-button-5SXoTk2c.js';
import './sp-action-group-_eIEFPTE.js';
import './sp-button-dfYWkmHE.js';
import './sp-dialog-wrapper-47agkVUd.js';
import './sp-field-label-BRa7XgBa.js';
import './sp-icon-magnify-HuJDvTSr.js';
import './sp-icon-open-in-luHxVvi2.js';
import './overlay-trigger-9ncbARvw.js';
import { t as trigger, a as tooltip } from './tooltip-directive-BsY09fpt.js';
import './sp-dialog-1fHocsR9.js';
import './sp-picker-AIZWEV-o.js';
import './sp-menu-yyR1trsN.js';
import './sp-menu-item-dzr3-vzb.js';
import './sp-menu-divider-GnA2SRvx.js';
import './sp-popover-JsdyhxsS.js';
import './sp-slider-TY_7Wn9_.js';
import './sp-radio--o5Z8n0d.js';
import './sp-radio-group-P2WWDObv.js';
import './sp-tooltip-uCLyzpRN.js';
import './scale-large-vz7XNucI.js';
import './sp-accordion-item-XTXGhpLq.js';
import './overlay-story-components-ST_TaKcQ.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import './lit-element-xBOPiTek.js';
import './sp-icon-corner-triangle300-AQVMZnzI.js';
import './CornerTriangle300-scOUseNi.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-YN3-eQCN.js';
import './define-element-lju0qz2P.js';
import './ButtonBase-HA5NNgN2.js';
import './like-anchor-a_wuYSt2.js';
import './focusable-wnRI1QCz.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-HaH5WFZ0.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './base-STdhtiz1.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './query-JMOstM_r.js';
import './sizedMixin-VwrJiqSW.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './when-kvvOyHr2.js';
import './sp-underlay-G8FhBDeQ.js';
import './DialogBase-hNQ-fxh0.js';
import './modal.css-JF8KQ-ZN.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './custom-tag-JXLWq-Sj.js';
import './OpenIn-9plKOhZS.js';
import './state-UPADzOvr.js';
import './directive-C1gRZbRe.js';
import './sp-overlay-B7_vJw1R.js';
import './random-id-M2k-wjyE.js';
import './platform-c1C9ET3y.js';
import './slottable-request-event-SQgFLN7g.js';
import './style-map-ak5mT6xX.js';
import './slottable-request-directive-Lv19myUx.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './sp-divider-jhXT_WtI.js';
import './divider.css-J1TsgOfe.js';
import './sp-close-button-JNwUg8gE.js';
import './spectrum-icon-cross.css-8PYVteVZ.js';
import './sp-icon-cross500-2e8t4Utt.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-P3ltpV_H.js';
import './sp-icon-alert-FVCBnC1q.js';
import './AlertDialog-5MQ60UU8.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './Picker-_l2TKksC.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './sp-icon-chevron100-hP_myJxP.js';
import './Chevron100-ok1mOHjI.js';
import './MatchMedia-SMh19R1m.js';
import './spectrum-icon-checkmark.css-EqJn5hpL.js';
import './Popover-vSC8_z_g.js';
import './LanguageResolution-433GhF-m.js';
import './import-mabg3nA1.js';
import './streaming-listener-99YRN1c8.js';
import './repeat-ry-ySa1b.js';
import './FieldGroup-yR_f4fgR.js';
import './manage-help-text-kfeeNmRL.js';

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
        <sp-popover placement="${l(placement)}" tip>
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
