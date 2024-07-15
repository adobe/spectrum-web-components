import { a as tooltip } from './tooltip-directive-Bay2H_wb.js';
import './sp-icon-alert-ENkod3pK.js';
import './sp-icon-checkmark-BCuTLe4y.js';
import './sp-icon-info-yjwfijAs.js';
import './sp-icon-edit-DI-6Rr-B.js';
import './sp-button-BKAPrKbL.js';
import './sp-action-button-goT3a6ga.js';
import './overlay-trigger-B24B5U9x.js';
import { x } from './lit-html-COgVUehj.js';
import './strategies-DO994H4L.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './AbstractOverlay-DGkDfmvo.js';
import './define-element-Cg7S_Nvo.js';
import './lit-element-BL-po2DW.js';
import './platform-DpSwcmux.js';
import './slottable-request-event-DXuuyGoq.js';
import './slottable-request-directive-KFtRYWgP.js';
import './directive-Bn5c4u4M.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './if-defined-DDJGFaN4.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-C8frIgMv.js';
import './Checkmark-FReycAe-.js';
import './Info-CGVxk8Iv.js';
import './Edit-CCpN7dze.js';
import './ButtonBase-DQebF_98.js';
import './like-anchor-DX5I66Td.js';
import './focusable-C5h4CSZb.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Dl5hWaOm.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-sqnytUIU.js';
import './when-DEJm_QN9.js';
import './sp-icon-corner-triangle300-DLHcMdbF.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './state-CK9f3Zm-.js';

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
