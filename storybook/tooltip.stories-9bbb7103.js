import './sp-tooltip-c485c478.js';
import './sp-icon-alert-d34893d7.js';
import './sp-icon-checkmark-06397d4b.js';
import './sp-icon-info-132b9a4b.js';
import './sp-icon-edit-23d1bac7.js';
import './sp-button-d4cd36d2.js';
import './sp-field-label-05f39d18.js';
import './sp-textfield-3b3fc1b7.js';
import './sp-action-button-91f1b102.js';
import './sp-overlay-d157f34b.js';
import { x, A } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';
import './lit-element-9354aa77.js';
import './focusable-selectors-252ae36e.js';
import './define-element-43d4edd5.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './custom-tag-b5526d41.js';
import './IconBase-fb970ebf.js';
import './Checkmark-87ba3c87.js';
import './Info-d70f219e.js';
import './Edit-e6e8ae2a.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './sizedMixin-281e4c72.js';
import './custom-tag-c228386e.js';
import './condition-attribute-with-id-62869347.js';
import './ElementResolution-b58a0825.js';
import './Textfield-a0f64496.js';
import './manage-help-text-39f4c7ea.js';
import './spectrum-icon-checkmark.css-c19acd0f.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-0afa7555.js';
import './sp-icon-corner-triangle300-48f3695d.js';
import './CornerTriangle300-488cc3d0.js';
import './platform-a32a5617.js';
import './VirtualTrigger-6d9954e6.js';
import './first-focusable-in-184a26e2.js';
import './style-map-156e3c36.js';

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
  delayed
}) => x`
    ${overlayStyles}
    <sp-action-button class="self-managed">
        This is a button.
        <sp-tooltip
            self-managed
            placement=${placement}
            offset=${offset}
            ?delayed=${delayed}
            open=${open}
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
  delayed: false
};
selfManaged.argTypes = {
  delayed: {
    name: "delayed",
    type: { name: "boolean", required: false },
    description: "Whether to manage the tooltip with the warmup timer"
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
const __namedExportsOrder = ['Default', 'wIcon', 'overlaidTop', 'overlaidRight', 'overlaidBottom', 'overlaidLeft', 'overlaidTopStart', 'selfManaged', 'selfManagedIconOnly', 'selfManagedFieldLabel'];

export { Default, __namedExportsOrder, tooltip_stories as default, overlaidBottom, overlaidLeft, overlaidRight, overlaidTop, overlaidTopStart, selfManaged, selfManagedFieldLabel, selfManagedIconOnly, wIcon };
