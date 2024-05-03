import { a as tooltip } from './tooltip-directive-BBS2qpVq.js';
import './sp-icon-alert-CefcIj5Q.js';
import './sp-icon-checkmark-CRFWtJmu.js';
import './sp-icon-info-CXjSVEKU.js';
import './sp-icon-edit-DzGqDRmq.js';
import './sp-button-CX7ULUAA.js';
import './sp-action-button-iWpE67KY.js';
import './overlay-trigger-D3l8Z6rV.js';
import { x } from './lit-html-COgVUehj.js';
import './directive-Bn5c4u4M.js';
import './strategies-DXHXcebL.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './AbstractOverlay-KZBKCVUI.js';
import './define-element-ByMWMcVd.js';
import './lit-element-BL-po2DW.js';
import './platform-DpSwcmux.js';
import './slottable-request-event-DXuuyGoq.js';
import './slottable-request-directive-BLJyk_Ve.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './if-defined-DDJGFaN4.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-qDHHH3Ln.js';
import './Checkmark-FReycAe-.js';
import './Info-CGVxk8Iv.js';
import './Edit-CCpN7dze.js';
import './ButtonBase-DVG8snfH.js';
import './like-anchor-3x3vwb8N.js';
import './focusable-CCdy673g.js';
import './focus-visible-xZLLtEay.js';
import './observe-slot-text-DSYHkFFl.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-C1lD98vT.js';
import './when-DEJm_QN9.js';
import './sp-icon-corner-triangle300-Bb6QuQiQ.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './state-DGkVCdxP.js';

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
