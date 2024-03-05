import './sp-tooltip-3RhM_h5g.js';
import './sp-icon-alert-IfxTE-S5.js';
import './sp-icon-checkmark-eZp_JT5L.js';
import './sp-icon-info-Pxwb2KYu.js';
import './sp-icon-edit-LAQa2Ir4.js';
import './sp-button-St5-WM_S.js';
import './sp-field-label-Tiv8xbEr.js';
import './sp-textfield-oI1hDHZL.js';
import './sp-action-button-yK8oK-HS.js';
import './sp-overlay--D_vkN8z.js';
import { x, A } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import './lit-element-xBOPiTek.js';
import './focusable-selectors-VCrFWGqo.js';
import './define-element-z6bXN_P5.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './state-qeP24jco.js';
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
import './sizedMixin-IBQibr2z.js';
import './when-kvvOyHr2.js';
import './custom-tag-z2Xx81l9.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './Textfield-ynBlbbxQ.js';
import './manage-help-text-kfeeNmRL.js';
import './spectrum-icon-checkmark.css-F44WP9wj.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './sp-icon-corner-triangle300-oci86m4p.js';
import './CornerTriangle300-scOUseNi.js';
import './random-id-M2k-wjyE.js';
import './first-focusable-in-LZ7hcu4z.js';
import './platform-c1C9ET3y.js';
import './style-map-ak5mT6xX.js';

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
            ${!!variant ? iconOptions[variant]() : A} ${text}
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
                    open=${l(
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
