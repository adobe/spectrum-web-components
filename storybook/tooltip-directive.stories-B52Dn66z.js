import { t as tooltip } from './tooltip-directive-BEDzO_ft.js';
import './sp-icon-alert-CxSW5wvV.js';
import './sp-icon-checkmark-CzM1Aw1i.js';
import './sp-icon-info-B9eN5jxr.js';
import './sp-icon-edit-DjJi4hJJ.js';
import './sp-button-fZ-frECV.js';
import './sp-action-button-rDyKsJf5.js';
import './overlay-trigger-DBkNselg.js';
import { x } from './lit-html-COgVUehj.js';
import './overlay-trigger-directive-DRRvcmDB.js';
import './strategies-BDwAOr-e.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './AbstractOverlay-Cr3eDEqw.js';
import './define-element-xyi5NDDf.js';
import './lit-element-BulMEkr1.js';
import './platform-r3Lf9REX.js';
import './slottable-request-event-DXuuyGoq.js';
import './slottable-request-directive-BvrOiskA.js';
import './directive-Bn5c4u4M.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './if-defined-DDJGFaN4.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-5vvO1gxM.js';
import './state-DzluJiIq.js';
import './Checkmark-D8WZ4StE.js';
import './Info-Bopt2bd0.js';
import './InfoCircle-DLqulD5C.js';
import './Edit-prqhnpZR.js';
import './ButtonBase-C-5TBDaE.js';
import './like-anchor-Dgva6KsU.js';
import './focusable-DcHsG7Zg.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-64cbqGrA.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-C4z4_Svo.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-CTLIe6if.js';
import './sp-icon-corner-triangle300-BqR5xB2E.js';
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
const __namedExportsOrder = ['Default'];

export { Default, __namedExportsOrder, tooltipDirective_stories as default };
