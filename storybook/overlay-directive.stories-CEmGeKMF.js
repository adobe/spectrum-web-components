import './sp-action-button-yK8oK-HS.js';
import './sp-action-group-djPkcn0t.js';
import './sp-button-St5-WM_S.js';
import './sp-dialog-wrapper-HOjwSlrC.js';
import './sp-field-label-Tiv8xbEr.js';
import './sp-icon-magnify-q4Fy0HZ6.js';
import './sp-icon-open-in-D6JQdAOI.js';
import './overlay-trigger-1hsX4oto.js';
import { t as tooltip, a as trigger } from './tooltip-directive-t0YCZSg3.js';
import './sp-dialog-1nENGXfj.js';
import './sp-picker-X3zj5G13.js';
import './sp-menu-vKm9EXYM.js';
import './sp-menu-item-N-0TaoiF.js';
import './sp-menu-divider-oQzf6Djb.js';
import './sp-popover-K6nK-Hu0.js';
import './sp-slider-fLDgQcy7.js';
import './sp-radio-6qO9zReo.js';
import './sp-radio-group-5hPFJJX9.js';
import './sp-tooltip-3RhM_h5g.js';
import './scale-large-i3r96c9D.js';
import './sp-accordion-item-iaA6o3mD.js';
import './overlay-story-components-Z_cpGXH2.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import './lit-element-xBOPiTek.js';
import './sp-icon-corner-triangle300-oci86m4p.js';
import './CornerTriangle300-scOUseNi.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
import './define-element-z6bXN_P5.js';
import './ButtonBase-xfo9cPrz.js';
import './like-anchor-iRdC2T2x.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-MDYPopbw.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-qh-rhz36.js';
import './base-STdhtiz1.js';
import './sizedMixin-IBQibr2z.js';
import './query-JMOstM_r.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './when-kvvOyHr2.js';
import './sp-underlay-LbN_7iY5.js';
import './DialogBase-gCl-8cu-.js';
import './modal.css-JF8KQ-ZN.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './custom-tag-JXLWq-Sj.js';
import './OpenIn-9plKOhZS.js';
import './state-qeP24jco.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './sp-overlay--D_vkN8z.js';
import './random-id-M2k-wjyE.js';
import './platform-c1C9ET3y.js';
import './style-map-ak5mT6xX.js';
import './sp-divider-WftRh8OU.js';
import './divider.css-J1TsgOfe.js';
import './sp-close-button-F0_4B7Dg.js';
import './spectrum-icon-cross.css-NAMb6F9U.js';
import './sp-icon-cross500-MLi7bA4s.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-0qUjMOW-.js';
import './sp-icon-alert-IfxTE-S5.js';
import './AlertDialog-0O57hEy-.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './Picker-dv2kmg-i.js';
import './spectrum-icon-chevron.css-i0thkS8X.js';
import './sp-icon-chevron100-uB3eMtQr.js';
import './Chevron100-ok1mOHjI.js';
import './MatchMedia-SMh19R1m.js';
import './spectrum-icon-checkmark.css-F44WP9wj.js';
import './Popover-ZO_2BJ88.js';
import './LanguageResolution-433GhF-m.js';
import './import-mabg3nA1.js';
import './streaming-listener-99YRN1c8.js';
import './repeat-ry-ySa1b.js';
import './FieldGroup-FlGYWq9k.js';
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
    }
  },
  args: {
    placement: "bottom",
    offset: 0,
    colorStop: "light",
    triggerOn: "click"
  }
};
const template = ({
  placement,
  offset,
  triggerOn,
  insertionOptions
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
    triggerInteraction: triggerOn,
    overlayOptions: {
      placement,
      offset
    },
    insertionOptions
  })}
        >
            Show Popover
        </sp-button>
    `;
};
const Default = (args) => template(args);
Default.swc_vrt = {
  skip: true
};
const elsewhere = (args = {}) => x`
    ${template(args)}
    <div id="other-element"></div>
`;
elsewhere.args = {
  insertionOptions: {
    el: () => document.querySelector("#other-element"),
    where: "afterbegin"
  }
};
elsewhere.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['Default', 'elsewhere'];

export { Default, __namedExportsOrder, overlayDirective_stories as default, elsewhere };
