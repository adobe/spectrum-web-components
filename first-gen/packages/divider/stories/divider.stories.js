"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/divider/sp-divider.js";
import "./typography-decorator.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-right.js";
export default {
  title: "Divider",
  decorators: [
    (story) => html`
            <typography-decorator .story=${story()}></typography-decorator>
        `
  ]
};
export const large = () => {
  return html`
        <h2 class="spectrum-Heading spectrum-Heading--sizeM">Large</h2>
        <sp-divider size="l"></sp-divider>
        <p class="spectrum-Body">Page or Section Titles.</p>
    `;
};
export const medium = () => {
  return html`
        <h3 class="spectrum-Heading spectrum-Heading--sizeS">Medium</h3>
        <sp-divider size="m"></sp-divider>
        <p class="spectrum-Body">
            Divide subsections, or divide different groups of elements (between
            panels, rails, etc.)
        </p>
    `;
};
export const small = () => {
  return html`
        <h4 class="spectrum-Heading spectrum-Heading--sizeXS">Small</h4>
        <sp-divider size="s"></sp-divider>
        <p class="spectrum-Body">
            Divide like-elements (tables, tool groups, elements within a panel,
            etc.)
        </p>
    `;
};
export const verticalSmall = () => {
  return html`
        <div style="height: var(--spectrum-spacing-500, 32px); display: flex;">
            <sp-action-button quiet>
                <sp-icon-align-left slot="icon"></sp-icon-align-left>
            </sp-action-button>
            <sp-divider
                vertical
                size="s"
                style="height: auto; align-self: stretch;"
            ></sp-divider>
            <sp-action-button quiet>
                <sp-icon-align-right slot="icon"></sp-icon-align-right>
            </sp-action-button>
        </div>
    `;
};
export const verticalMedium = () => {
  return html`
        <div style="height: var(--spectrum-spacing-500, 32px); display: flex;">
            <sp-action-button quiet>
                <sp-icon-align-left slot="icon"></sp-icon-align-left>
            </sp-action-button>
            <sp-divider
                size="m"
                vertical
                style="height: auto; align-self: stretch;"
            ></sp-divider>
            <sp-action-button quiet>
                <sp-icon-align-right slot="icon"></sp-icon-align-right>
            </sp-action-button>
        </div>
    `;
};
export const verticalLarge = () => {
  return html`
        <div style="height: var(--spectrum-spacing-500, 32px); display: flex;">
            <sp-action-button quiet>
                <sp-icon-align-left slot="icon"></sp-icon-align-left>
            </sp-action-button>
            <sp-divider
                size="l"
                vertical
                style="height: auto; align-self: stretch;"
            ></sp-divider>
            <sp-action-button quiet>
                <sp-icon-align-right slot="icon"></sp-icon-align-right>
            </sp-action-button>
        </div>
    `;
};
//# sourceMappingURL=divider.stories.js.map
