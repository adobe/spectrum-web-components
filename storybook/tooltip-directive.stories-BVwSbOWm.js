import { t as tooltip } from './tooltip-directive-B5eQdUn9.js';
import './sp-icon-alert-BbDxiD8e.js';
import './sp-icon-checkmark-CddmjqKE.js';
import './sp-icon-info-D_z3GpKi.js';
import './sp-icon-edit-DPuFZyao.js';
import './sp-button-Jx9C1QJR.js';
import './sp-action-button-zOTvHmVo.js';
import './overlay-trigger-CL4xZdEC.js';
import { x } from './lit-html-COgVUehj.js';
import './overlay-trigger-directive-BPVYkEni.js';
import './Overlay-BQ6S2Tgo.js';
import './ElementResolution-B9KteuX8.js';
import './random-id-BST1Puzz.js';
import './VirtualTrigger-CbtiJp0Q.js';
import './define-element-B3-QvDZd.js';
import './lit-element-BulMEkr1.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './platform-r3Lf9REX.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './state-DrGS5Kkk.js';
import './if-defined-DDJGFaN4.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './slottable-request-directive-BvrOiskA.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-CmREmoFq.js';
import './Checkmark-D8WZ4StE.js';
import './Info-Bopt2bd0.js';
import './InfoCircle-DLqulD5C.js';
import './Edit-prqhnpZR.js';
import './ButtonBase-DFBdS0ya.js';
import './like-anchor-YCQdykQc.js';
import './focusable-CRwO5NCP.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BVY5OzXy.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './PendingState-BeXRKpss.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-Bh0Au8rG.js';
import './sp-icon-corner-triangle300-BndhYbNS.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './sp-overlay-EGgM3rGi.js';

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
Default.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
const __namedExportsOrder = ['Default'];

export { Default, __namedExportsOrder, tooltipDirective_stories as default };
