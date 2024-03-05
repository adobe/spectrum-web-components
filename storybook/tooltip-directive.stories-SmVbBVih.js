import { t as tooltip } from './tooltip-directive-t0YCZSg3.js';
import './sp-icon-alert-IfxTE-S5.js';
import './sp-icon-checkmark-eZp_JT5L.js';
import './sp-icon-info-Pxwb2KYu.js';
import './sp-icon-edit-LAQa2Ir4.js';
import './sp-button-St5-WM_S.js';
import './sp-action-button-yK8oK-HS.js';
import './overlay-trigger-1hsX4oto.js';
import { x } from './lit-html-GmIhAbMP.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './sp-overlay--D_vkN8z.js';
import './define-element-z6bXN_P5.js';
import './lit-element-xBOPiTek.js';
import './ElementResolution-TTOqkMM7.js';
import './random-id-M2k-wjyE.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './platform-c1C9ET3y.js';
import './sizedMixin-IBQibr2z.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './state-qeP24jco.js';
import './if-defined-pV6JZKXB.js';
import './style-map-ak5mT6xX.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-1lzddWrP.js';
import './Checkmark-ae3T4lCi.js';
import './Info-J8X0NVRu.js';
import './Edit-G5NAbE7j.js';
import './ButtonBase-xfo9cPrz.js';
import './like-anchor-iRdC2T2x.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-MDYPopbw.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-qh-rhz36.js';
import './when-kvvOyHr2.js';
import './sp-icon-corner-triangle300-oci86m4p.js';
import './CornerTriangle300-scOUseNi.js';
import './custom-tag-z2Xx81l9.js';

var tooltipDirective_stories = {
  component: "sp-tooltip",
  title: "Tooltip Directive"
};
const Default = ({
  placement,
  text,
  variant
}) => {
  return x`
        <sp-button
            ${tooltip(
    () => x`
                        ${text || "Tooltip"}
                    `,
    {
      overlayOptions: { placement },
      variant
    }
  )}
        >
            Hover me
        </sp-button>
    `;
};
Default.args = {
  open: true,
  placement: "top",
  variant: "",
  text: "Tooltip"
};
Default.argTypes = {
  open: {
    name: "open",
    type: { name: "boolean", required: false },
    description: "Whether the tooltip is open.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  placement: {
    name: "placement",
    type: { name: "string", required: false },
    description: "The placement of the tooltip in relation to its parent",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "top" }
    },
    control: {
      type: "inline-radio",
      options: [
        "auto",
        "auto-start",
        "auto-end",
        "top",
        "bottom",
        "right",
        "left",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "right-start",
        "right-end",
        "left-start",
        "left-end",
        "none"
      ]
    }
  },
  text: {
    name: "text",
    type: { name: "string", required: false },
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "" }
    },
    control: "text"
  },
  variant: {
    name: "variant",
    type: { name: "string", required: false },
    description: "The style of the tooltip.",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "" }
    },
    control: {
      type: "inline-radio",
      options: ["info", "positive", "negative", ""]
    }
  }
};
Default.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['Default'];

export { Default, __namedExportsOrder, tooltipDirective_stories as default };
