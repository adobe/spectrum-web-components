"use strict";
import "@spectrum-web-components/popover/sp-popover.js";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import "@spectrum-web-components/dialog/sp-dialog.js";
import "@spectrum-web-components/button/sp-button.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { isOverlayOpen } from "../../overlay/stories/index.js";
import "../../overlay/stories/index.js";
export default {
  component: "sp-popover",
  title: "Popover",
  argTypes: {
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      description: "Whether the popover is open or not.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: "boolean"
    },
    placement: {
      name: "placement",
      type: { name: "string", required: false },
      description: "The placement of the popover content in relation to the tip",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "none" }
      },
      control: "text"
    },
    tip: {
      name: "tip",
      description: "Whether the popover has a tip.",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: "boolean"
    }
  },
  args: {
    open: true,
    placement: "none",
    tip: false
  }
};
export const Default = ({ content }) => {
  return html`
        <div style="color: var(--spectrum-gray-800)">
            <sp-popover variant="default" open style="max-width: 320px">
                <div style="font-size: 14px; padding: 10px">${content}</div>
            </sp-popover>
        </div>
    `;
};
Default.args = {
  content: "The quick brown fox jumps over the lazy dog"
};
Default.argTypes = {
  content: {
    name: "content",
    type: { name: "string", required: false },
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "" }
    },
    control: "text"
  }
};
const Template = ({ tip, placement, open }) => {
  return html`
        <div
            style="color: var(--spectrum-gray-800); position: relative; display: contents"
        >
            <sp-popover
                placement=${placement}
                ?open=${open}
                style=" max-width: 320px"
                .tip="${tip}"
            >
                <sp-dialog size="s">
                    <h2 slot="heading">Popover Title</h2>
                    Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly
                    caramels. Icing soufflé chupa chups donut cheesecake.
                    Jelly-o chocolate cake sweet roll cake danish candy biscuit
                    halvah
                </sp-dialog>
            </sp-popover>
        </div>
    `;
};
export const dialogTop = (args) => Template(args);
dialogTop.args = {
  tip: true,
  placement: "top"
};
export const dialogRight = (args) => Template(args);
dialogRight.args = {
  tip: true,
  placement: "right"
};
export const dialogBottom = (args) => Template(args);
dialogBottom.args = {
  tip: true,
  placement: "bottom"
};
export const dialogLeft = (args) => Template(args);
dialogLeft.args = {
  tip: true,
  placement: "left"
};
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
    </style>
`;
const overlaid = (openPlacement) => {
  return html`
        ${overlayStyles}
        ${["bottom", "left", "right", "top"].map(
    (placement) => {
      return html`
                    <overlay-trigger
                        placement="${placement}-start"
                        open=${ifDefined(
        openPlacement === placement ? "click" : void 0
      )}
                    >
                        <sp-button
                            label="${placement}-start test"
                            slot="trigger"
                        >
                            Click for ${placement}-start popover
                        </sp-button>
                        <sp-popover tip slot="click-content">
                            <sp-dialog style="--mod-dialog-min-inline-size: 0;">
                                <h2 slot="heading">
                                    Popover ${placement}-start
                                </h2>
                                This popover is on the ${placement}-start of its
                                button.
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                `;
    }
  )}
    `;
};
export const overlaidTop = () => overlaid("top");
overlaidTop.decorators = [isOverlayOpen];
export const overlaidRight = () => overlaid("right");
overlaidRight.decorators = [isOverlayOpen];
export const overlaidBottom = () => overlaid("bottom");
overlaidBottom.decorators = [isOverlayOpen];
export const overlaidLeft = () => overlaid("left");
overlaidLeft.decorators = [isOverlayOpen];
//# sourceMappingURL=popover.stories.js.map
