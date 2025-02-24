import { t as tooltip } from './tooltip-directive-CHRyWDvl.js';
import './sp-icon-alert-DAp49GVT.js';
import './sp-icon-checkmark-BzrKkYiv.js';
import './sp-icon-info-CgwagcUB.js';
import './sp-icon-edit-CKaSlRIB.js';
import './sp-button-CCjeFkWT.js';
import './sp-action-button-D_6IfCJA.js';
import './overlay-trigger-tb2QtMKq.js';
import { x } from './lit-html-COgVUehj.js';
import './overlay-trigger-directive-C_AvSDqK.js';
import './strategies-C2YlNyU5.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './AbstractOverlay-Brp4Of0B.js';
import './define-element-B7NoFsQI.js';
import './lit-element-BulMEkr1.js';
import './platform-r3Lf9REX.js';
import './slottable-request-event-DXuuyGoq.js';
import './slottable-request-directive-BvrOiskA.js';
import './directive-Bn5c4u4M.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './if-defined-DDJGFaN4.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './Checkmark-D8WZ4StE.js';
import './Info-Bopt2bd0.js';
import './InfoCircle-DLqulD5C.js';
import './Edit-prqhnpZR.js';
import './ButtonBase-CVCDQq4P.js';
import './like-anchor-BQR4wmj8.js';
import './focusable-CtU8nZTr.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DVS1yx82.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-D1EWknyv.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-SWvQmBKY.js';
import './sp-icon-corner-triangle300-xPP9NKCs.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';

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
