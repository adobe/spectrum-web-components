import { s as spreadProps } from './lit-helpers-DFCD1oU3.js';
import './sp-action-group-BuA30sND.js';
import './sp-action-button-BGmiWspi.js';
import './overlay-trigger-CSFKciRj.js';
import './sp-tooltip-BpGkeKe1.js';
import './sp-icon-view-all-tags-BKdAO445.js';
import './sp-icon-info-qYYy7dF4.js';
import { r } from './state-DrummH0c.js';
import { x, T } from './lit-html-COgVUehj.js';
import { S as SpectrumElement } from './define-element-C_3bgzm7.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './mutation-controller-D2lT1xZk.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-BzkTbMb8.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-icon-corner-triangle300-Df1iqVxq.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-BIYWpr2G.js';
import './ButtonBase-Euqk2NbC.js';
import './like-anchor-B3Uz3TFY.js';
import './if-defined-DDJGFaN4.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C6K935AT.js';
import './query-assigned-nodes-DAYI4epk.js';
import './focusable-selectors-CUZEb4r9.js';
import './DependencyManger-Dpkh1Bse.js';
import './ViewAllTags-CXAQ2MQ6.js';
import './custom-tag-Diwq7nXX.js';
import './Info-CGVxk8Iv.js';

var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0 ;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(target, key, result) ) || result;
  if (result) __defProp(target, key, result);
  return result;
};
var actionGroupTooltip_stories = {
  title: "Action Group/Tooltips",
  component: "sp-action-group",
  args: {
    compact: false,
    emphasized: false,
    justified: false,
    quiet: false,
    vertical: false,
    selects: "none",
    size: "m"
  },
  argTypes: {
    compact: {
      name: "compact",
      description: "Visually joins the buttons together to clarify their relationship to one another.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    emphasized: {
      name: "emphasized",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    justified: {
      name: "justified",
      description: "Aligns the action group items to use all the available space on that line.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    quiet: {
      name: "quiet",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    vertical: {
      name: "vertical",
      description: "Changes the orientation of the action group.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    selects: {
      name: "selects",
      description: "Whether the elements selects its children and how many it can select at a time.",
      table: {
        defaultValue: { summary: "" }
      },
      control: {
        type: "inline-radio",
        options: ["none", "single", "multiple"]
      }
    },
    size: {
      name: "size",
      description: "The size at which to display the action group.",
      type: { name: "string", required: true },
      table: {
        type: { summary: '"s" | "m" | "l" | "xl"' },
        defaultValue: { summary: "m" }
      },
      control: {
        type: "select",
        options: ["s", "m", "l", "xl"]
      }
    }
  }
};
const template = (args) => {
  requestAnimationFrame(() => {
    const group = document.querySelector("sp-action-group");
    const selectedDiv = group.nextElementSibling;
    if (selectedDiv) {
      selectedDiv.textContent = `Selected: ${JSON.stringify(
        group.selected
      )}`;
    }
  });
  return x`
        <sp-action-group
            label="Favorite Color"
            ...=${spreadProps(args)}
            @change=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = `Selected: ${JSON.stringify(
      target.selected
    )}`;
  }}
        >
            <overlay-trigger>
                <sp-action-button slot="trigger">Red</sp-action-button>
                <sp-tooltip slot="hover-content">
                    This is a cool color.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Green</sp-action-button>
                <sp-tooltip slot="hover-content">
                    You wouldn't be wrong.
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger" value="blue" selected>
                    Blue
                </sp-action-button>
                <sp-tooltip slot="hover-content">The sky in spring.</sp-tooltip>
            </overlay-trigger>
            <overlay-trigger>
                <sp-action-button slot="trigger">Yellow</sp-action-button>
                <sp-tooltip slot="hover-content">The sun at noon.</sp-tooltip>
            </overlay-trigger>
        </sp-action-group>
        ${!!args.selects ? x`
                  <div>Selected:</div>
              ` : T}
    `;
};
const selectsSingle = (args) => template(args);
selectsSingle.args = {
  compact: true,
  emphasized: true,
  selects: "single"
};
const selectsMultiple = (args) => template(args);
selectsMultiple.args = {
  compact: true,
  emphasized: true,
  selects: "multiple"
};
const justified = (args) => template(args);
justified.args = {
  compact: true,
  emphasized: true,
  justified: true,
  selects: void 0
};
const vertical = (args) => template(args);
vertical.args = {
  compact: true,
  emphasized: true,
  vertical: true,
  selects: void 0
};
class ActionGroupTooltips extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.alignment = "left";
  }
  render() {
    return x`
            <sp-action-group quiet>
                <sp-action-button
                    quiet
                    value="left"
                    ?selected=${this.alignment === "left"}
                    @click=${() => {
      this.alignment = "left";
    }}
                >
                    <sp-icon slot="icon">
                        <svg
                            role="img"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                            id="STextAlignLeft18N-icon"
                            width="18"
                            height="18"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <rect
                                fill-rule="evenodd"
                                x="2"
                                y="14"
                                width="12"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="2"
                                y="2"
                                width="15"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="2"
                                y="6"
                                width="12"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="2"
                                y="10"
                                width="15"
                                height="2"
                                rx="0.5"
                            ></rect>
                        </svg>
                    </sp-icon>
                    <sp-tooltip self-managed placement="bottom">
                        Left align
                    </sp-tooltip>
                </sp-action-button>
                <sp-action-button
                    quiet
                    value="center"
                    ?selected=${this.alignment === "center"}
                    @click=${() => {
      this.alignment = "center";
    }}
                >
                    <sp-icon slot="icon">
                        <svg
                            role="img"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                            id="STextAlignCenter18N-icon"
                            width="18"
                            height="18"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <rect
                                fill-rule="evenodd"
                                x="4"
                                y="14"
                                width="10"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="1"
                                y="10"
                                width="16"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="1"
                                y="2"
                                width="16"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="4"
                                y="6"
                                width="10"
                                height="2"
                                rx="0.5"
                            ></rect>
                        </svg>
                    </sp-icon>
                    <sp-tooltip self-managed placement="bottom">
                        Center align
                    </sp-tooltip>
                </sp-action-button>
                <sp-action-button
                    quiet
                    value="right"
                    ?selected=${this.alignment === "right"}
                    @click=${() => {
      this.alignment = "right";
    }}
                >
                    <sp-icon slot="icon">
                        <svg
                            role="img"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                            id="STextAlignRight18N-icon"
                            width="18"
                            height="18"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <rect
                                fill-rule="evenodd"
                                x="4"
                                y="14"
                                width="12"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="1"
                                y="2"
                                width="15"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="4"
                                y="6"
                                width="12"
                                height="2"
                                rx="0.5"
                            ></rect>
                            <rect
                                fill-rule="evenodd"
                                x="1"
                                y="10"
                                width="15"
                                height="2"
                                rx="0.5"
                            ></rect>
                        </svg>
                    </sp-icon>
                    <sp-tooltip self-managed placement="bottom">
                        Right align
                    </sp-tooltip>
                </sp-action-button>
            </sp-action-group>
        `;
  }
}
__decorateClass([
  r()
], ActionGroupTooltips.prototype, "alignment");
customElements.define("action-group-tooltips", ActionGroupTooltips);
const controlled = () => x`
    <action-group-tooltips></action-group-tooltips>
`;
const __namedExportsOrder = ['selectsSingle', 'selectsMultiple', 'justified', 'vertical', 'controlled'];

export { __namedExportsOrder, controlled, actionGroupTooltip_stories as default, justified, selectsMultiple, selectsSingle, vertical };
