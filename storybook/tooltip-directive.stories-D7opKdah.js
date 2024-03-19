import { a as tooltip } from './tooltip-directive-BsY09fpt.js';
import './sp-icon-alert-FVCBnC1q.js';
import './sp-icon-checkmark-xo6mkwQn.js';
import './sp-icon-info-YVdkX6w6.js';
import './sp-icon-edit-ZazLFymR.js';
import './sp-button-dfYWkmHE.js';
import './sp-action-button-5SXoTk2c.js';
import './overlay-trigger-9ncbARvw.js';
import { x } from './lit-html-GmIhAbMP.js';
import './directive-C1gRZbRe.js';
import './sp-overlay-B7_vJw1R.js';
import './define-element-lju0qz2P.js';
import './lit-element-xBOPiTek.js';
import './ElementResolution-TTOqkMM7.js';
import './random-id-M2k-wjyE.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './platform-c1C9ET3y.js';
import './slottable-request-event-SQgFLN7g.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './query-JMOstM_r.js';
import './state-UPADzOvr.js';
import './if-defined-pV6JZKXB.js';
import './style-map-ak5mT6xX.js';
import './slottable-request-directive-Lv19myUx.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './custom-tag-JXLWq-Sj.js';
import './IconBase-YN3-eQCN.js';
import './Checkmark-ae3T4lCi.js';
import './Info-J8X0NVRu.js';
import './Edit-G5NAbE7j.js';
import './ButtonBase-HA5NNgN2.js';
import './like-anchor-a_wuYSt2.js';
import './focusable-wnRI1QCz.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-HaH5WFZ0.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './sizedMixin-VwrJiqSW.js';
import './when-kvvOyHr2.js';
import './sp-icon-corner-triangle300-AQVMZnzI.js';
import './CornerTriangle300-scOUseNi.js';
import './custom-tag-z2Xx81l9.js';

var tooltipDirective_stories = {
  component: "sp-tooltip",
  title: "Tooltip Directive"
};
const Default = ({
  open,
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
      open,
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
