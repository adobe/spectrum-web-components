import './sp-tooltip-BNkRcoiQ.js';
import './sp-icon-alert-CefcIj5Q.js';
import './sp-icon-checkmark-CRFWtJmu.js';
import './sp-icon-info-CXjSVEKU.js';
import './sp-icon-edit-DzGqDRmq.js';
import './sp-button-CX7ULUAA.js';
import './sp-field-label-d2_767OQ.js';
import './sp-textfield-C8pD4Ep_.js';
import './sp-action-button-iWpE67KY.js';
import './sp-overlay-4Ek5aQtO.js';
import { x, T } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './lit-element-BL-po2DW.js';
import './focusable-selectors-CUZEb4r9.js';
import './DependencyManger-Dpkh1Bse.js';
import './define-element-ByMWMcVd.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
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
import './sizedMixin-C1lD98vT.js';
import './when-DEJm_QN9.js';
import './random-id-BST1Puzz.js';
import './custom-tag-B5IH9PTE.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './Textfield-D4Mirr1j.js';
import './manage-help-text-83_bseGo.js';
import './spectrum-icon-checkmark.css-B-kvSI14.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-DGkVCdxP.js';
import './sp-icon-corner-triangle300-Bb6QuQiQ.js';
import './CornerTriangle300-B7hvHiLM.js';
import './Overlay-XiWpq8_A.js';
import './AbstractOverlay-KZBKCVUI.js';
import './first-focusable-in-BK_DAWOm.js';
import './VirtualTrigger-53larCeg.js';
import './strategies-DXHXcebL.js';
import './platform-DpSwcmux.js';
import './slottable-request-event-DXuuyGoq.js';
import './query-assigned-elements-C9WOp2R6.js';
import './style-map-DtKTc8KS.js';

const iconOptions = {
  "": () => x``,
  negative: () => x`
            <sp-icon-alert slot="icon"></sp-icon-alert>
        `,
  positive: () => x`
            <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
        `,
  info: () => x`
            <sp-icon-info slot="icon"></sp-icon-info>
        `
};
var tooltip_stories = {
  component: "sp-tooltip",
  title: "Tooltip"
};
const Default = ({
  open,
  placement,
  variant,
  text
}) => {
  return x`
        <sp-tooltip ?open=${open} placement=${placement} variant=${variant}>
            ${text}
        </sp-tooltip>
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
const wIcon = ({
  open,
  placement,
  variant,
  text
}) => {
  return x`
        <sp-tooltip ?open=${open} placement=${placement} variant=${variant}>
            ${!!variant ? iconOptions[variant]() : T} ${text}
        </sp-tooltip>
    `;
};
wIcon.args = {
  open: true,
  placement: "top",
  text: "Tooltip",
  variant: "negative"
};
wIcon.argTypes = {
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
const overlayStyles = x`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator > div {
            display: contents;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            gap: 24px;
        }

        sp-button:nth-of-type(1) {
            margin-top: 24px;
        }
    </style>
`;
const overlaid = (openPlacement) => {
  return x`
        ${overlayStyles}
        ${[
    ["bottom", ""],
    ["left", "negative"],
    ["right", "positive"],
    ["top", "info"],
    ["top-start", ""]
  ].map(([placement, variant]) => {
    return x`
                <sp-button id="trigger-${placement}" label="${placement} test">
                    Hover for ${variant ? variant : "tooltip"} on the
                    ${placement}
                </sp-button>
                <sp-overlay
                    trigger="trigger-${placement}@hover"
                    type="hint"
                    placement=${placement}
                    open=${o(
      openPlacement === placement ? "hover" : void 0
    )}
                >
                    <sp-tooltip variant=${variant} placement=${placement}>
                        ${placement}
                    </sp-tooltip>
                </sp-overlay>
            `;
  })}
    `;
};
const overlaidTop = () => overlaid("top");
const overlaidRight = () => overlaid("right");
const overlaidBottom = () => overlaid("bottom");
const overlaidLeft = () => overlaid("left");
const overlaidTopStart = () => overlaid("top-start");
const selfManaged = ({
  placement,
  open,
  offset,
  delayed,
  disabled
}) => x`
    ${overlayStyles}
    <sp-action-button class="self-managed">
        This is a button.
        <sp-tooltip
            self-managed
            placement=${placement}
            offset=${offset}
            ?delayed=${delayed}
            ?disabled=${disabled}
            ?open=${open}
        >
            Add paragraph text by dragging the Text tool on the canvas to use
            this feature
        </sp-tooltip>
    </sp-action-button>
`;
selfManaged.args = {
  placement: "top",
  open: true,
  offset: 6,
  delayed: false,
  disabled: false
};
selfManaged.argTypes = {
  delayed: {
    name: "delayed",
    type: { name: "boolean", required: false },
    description: "Whether to manage the tooltip with the warmup timer"
  },
  disabled: {
    name: "disabled",
    type: { name: "boolean", required: false },
    description: "Whether the Tooltip is active and can be displayed"
  },
  offset: {
    name: "offset",
    type: { name: "number", required: false },
    description: "The pixel distance from the parent element to place the tooltip"
  },
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
  }
};
const selfManagedIconOnly = () => x`
    ${overlayStyles}
    <sp-action-button class="self-managed">
        <sp-icon-edit slot="icon"></sp-icon-edit>
        <sp-tooltip self-managed>This is a tooltip.</sp-tooltip>
    </sp-action-button>
    <hr />

    <sp-action-button class="self-managed">
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
`;
const selfManagedFieldLabel = () => x`
    <div style="display: inline-flex; flex-direction: column;">
        <sp-field-label for="input">
            <sp-icon-edit></sp-icon-edit>
            <sp-tooltip self-managed>Edit</sp-tooltip>
        </sp-field-label>
        <sp-textfield id="input"></sp-textfield>
    </div>
`;
const draggable = () => {
  const handleDragStart = (event) => {
    var _a;
    (_a = event.dataTransfer) == null ? void 0 : _a.setDragImage(
      event.target,
      event.offsetX,
      event.offsetY
    );
  };
  return x`
        <sp-button>
            A simple button that should not be included in the DragImage
        </sp-button>
        <div
            draggable="true"
            id="draggableElement"
            @dragstart=${handleDragStart}
            style="margin-top: 16px; cursor: move; padding: 24px; border: red 1px solid;"
        >
            <p>Click and drag me to show DragImage</p>
            <sp-action-button>
                Action Button with self managed tooltip
                <sp-tooltip self-managed placement="bottom">
                    My Tooltip
                </sp-tooltip>
            </sp-action-button>
        </div>
    `;
};
draggable.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['Default', 'wIcon', 'overlaidTop', 'overlaidRight', 'overlaidBottom', 'overlaidLeft', 'overlaidTopStart', 'selfManaged', 'selfManagedIconOnly', 'selfManagedFieldLabel', 'draggable'];

export { Default, __namedExportsOrder, tooltip_stories as default, draggable, overlaidBottom, overlaidLeft, overlaidRight, overlaidTop, overlaidTopStart, selfManaged, selfManagedFieldLabel, selfManagedIconOnly, wIcon };
