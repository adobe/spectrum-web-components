"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  html,
  nothing,
  SpectrumElement
} from "@spectrum-web-components/base";
import { state } from "@spectrum-web-components/base/src/decorators.js";
import { spreadProps } from "../../../test/lit-helpers.js";
import "@spectrum-web-components/action-group/sp-action-group.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-properties.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-info.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-all-tags.js";
export default {
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
  return html`
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
        ${!!args.selects ? html`
                  <div>Selected:</div>
              ` : nothing}
    `;
};
export const selectsSingle = (args) => template(args);
selectsSingle.args = {
  compact: true,
  emphasized: true,
  selects: "single"
};
export const selectsMultiple = (args) => template(args);
selectsMultiple.args = {
  compact: true,
  emphasized: true,
  selects: "multiple"
};
export const justified = (args) => template(args);
justified.args = {
  compact: true,
  emphasized: true,
  justified: true,
  selects: void 0
};
export const vertical = (args) => template(args);
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
    return html`
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
  state()
], ActionGroupTooltips.prototype, "alignment", 2);
customElements.define("action-group-tooltips", ActionGroupTooltips);
export const controlled = () => html`
    <action-group-tooltips></action-group-tooltips>
`;
//# sourceMappingURL=action-group-tooltip.stories.js.map
