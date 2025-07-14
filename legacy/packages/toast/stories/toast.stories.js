"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/toast/sp-toast.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
const toast = ({
  variant = "",
  open = true,
  content = "",
  timeout = 0,
  iconLabel = ""
}) => html`
    <sp-toast
        variant=${variant}
        ?open=${open}
        timeout=${ifDefined(timeout)}
        .iconLabel=${iconLabel}
    >
        ${content}
        <sp-button
            slot="action"
            static-color="white"
            variant="secondary"
            treatment="outline"
        >
            Undo
        </sp-button>
    </sp-toast>
`;
export default {
  component: "sp-toast",
  title: "Toast",
  args: {
    content: "This is a toast message.",
    open: true
  },
  argTypes: {
    content: {
      name: "content",
      type: { name: "string", required: false },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" }
      }
    },
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      }
    },
    variant: {
      name: "variant",
      options: ["", "negative", "positive", "info", "error", "warning"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" }
      },
      control: {
        type: "select"
      }
    },
    timeout: {
      name: "timeout",
      type: { name: "number", required: false },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: null }
      }
    },
    iconLabel: {
      name: "iconLabel",
      type: { name: "string", required: false },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" }
      }
    }
  }
};
export const Default = ({
  variant,
  open,
  content,
  timeout,
  iconLabel
}) => {
  return toast({ variant, open, content, timeout, iconLabel });
};
const variantDemo = ({
  variant,
  open,
  content,
  timeout,
  iconLabel
}) => {
  return toast({ variant, open, content, timeout, iconLabel });
};
export const Positive = (args) => variantDemo({ ...args, variant: "positive" });
export const Negative = (args) => variantDemo({ ...args, variant: "negative" });
export const Info = (args) => variantDemo({ ...args, variant: "info" });
export const Wrapping = (args) => variantDemo({
  ...args,
  variant: "info",
  content: "A new version of Lightroom Classic is now available. Use the Update button below to start using the new version."
});
const overlayStyles = html`
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
        }

        overlay-trigger {
            flex: none;
            margin: 24px 0;
        }

        .self-managed:nth-child(3) {
            margin-left: 50px;
        }
    </style>
`;
const overlaid = (openPlacement) => {
  return html`
        ${overlayStyles}
        ${[
    ["bottom", ""],
    ["left", "negative"],
    ["right", "positive"],
    ["top", "info"]
  ].map(([placement, variant]) => {
    return html`
                <overlay-trigger
                    placement=${placement}
                    open=${ifDefined(
      openPlacement === placement ? "click" : void 0
    )}
                >
                    <sp-button label="${placement} test" slot="trigger">
                        Click for ${variant ? variant : "toast"} on the
                        ${placement}
                    </sp-button>
                    <sp-toast slot="click-content" variant=${variant}>
                        ${placement}
                    </sp-toast>
                </overlay-trigger>
            `;
  })}
    `;
};
export const overlaidTop = () => overlaid("top");
export const overlaidRight = () => overlaid("right");
export const overlaidBottom = () => overlaid("bottom");
export const overlaidLeft = () => overlaid("left");
export const overlay = (args) => {
  return html`
        <style>
            sp-toast {
                position: fixed;
                bottom: 1em;
                left: 1em;
            }
        </style>
        <sp-button id="overlay">Toggle Toast overlay</sp-button>
        <sp-overlay trigger="overlay@click" type="auto" open>
            ${variantDemo({ ...args, variant: "positive" })}
        </sp-overlay>
    `;
};
//# sourceMappingURL=toast.stories.js.map
