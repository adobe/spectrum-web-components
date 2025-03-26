import { t as tooltip } from './tooltip-directive-vVsGwryG.js';
import './sp-icon-alert-C9LsQVsg.js';
import './sp-icon-checkmark-RPiWpi4g.js';
import './sp-icon-info-DEG2O5LL.js';
import './sp-icon-edit-BOixh7Kk.js';
import './sp-button-7UsB7th2.js';
import './sp-action-button-PAnKUsuA.js';
import './overlay-trigger-C5VD46th.js';
import { x } from './lit-html-COgVUehj.js';
import './overlay-trigger-directive-CugSPkvJ.js';
import './Overlay-JLImRQEv.js';
import './ElementResolution-B9KteuX8.js';
import './random-id-BST1Puzz.js';
import './VirtualTrigger-OIs6mMoi.js';
import './define-element-Bun2ZgR-.js';
import './lit-element-BulMEkr1.js';
import './first-focusable-in-BK_DAWOm.js';
import './focusable-selectors-CUZEb4r9.js';
import './platform-r3Lf9REX.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './state-a9qXQZw8.js';
import './if-defined-DDJGFaN4.js';
import './style-map-DtKTc8KS.js';
import './directive-Bn5c4u4M.js';
import './slottable-request-directive-BvrOiskA.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-luFyVpTn.js';
import './Checkmark-D8WZ4StE.js';
import './Info-Bopt2bd0.js';
import './InfoCircle-DLqulD5C.js';
import './Edit-prqhnpZR.js';
import './ButtonBase-CsEYgJMd.js';
import './like-anchor-BaNwPfYf.js';
import './focusable-y67P8eQI.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-B-N3zGRD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './PendingState-E3cyhDnE.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-BPhwmt-S.js';
import './sp-icon-corner-triangle300-DK57Of1v.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './sp-overlay-CZ8spV_x.js';

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
