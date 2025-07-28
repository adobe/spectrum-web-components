"use strict";
import "@spectrum-web-components/switch/sp-switch.js";
import { html } from "@spectrum-web-components/base";
import { spreadProps } from "../../../test/lit-helpers.js";
export default {
  component: "sp-switch",
  title: "Switch",
  argTypes: {
    size: {
      name: "size",
      type: { name: "string", required: false },
      description: "The size at which to display the Switch element",
      table: {
        type: { summary: '"s" | "m" | "l" | "xl"' },
        defaultValue: { summary: "m" }
      },
      control: {
        type: "text"
      }
    }
  },
  args: {
    size: "m"
  }
};
function renderSwitch(args) {
  return html`
        <sp-switch ${spreadProps(args)}>Switch</sp-switch>
    `;
}
export const Default = (args) => renderSwitch(args);
export const Checked = () => {
  return html`
        <sp-switch checked>Switch</sp-switch>
    `;
};
export const Sizes = () => {
  return html`
        <div style="display: flex; align-items: center; gap: 8px;">
            <sp-switch size="s">Small</sp-switch>
            <sp-switch size="m">Medium</sp-switch>
            <sp-switch size="l">Large</sp-switch>
            <sp-switch size="xl">Extra-Large</sp-switch>
        </div>
    `;
};
export const readonly = () => {
  return html`
        <sp-switch checked readonly>Switch</sp-switch>
    `;
};
export const emphasized = () => {
  return html`
        <sp-switch emphasized>Switch</sp-switch>
    `;
};
export const emphasizedChecked = () => {
  return html`
        <sp-switch emphasized checked>Switch</sp-switch>
    `;
};
export const Autofocus = () => {
  return html`
        <sp-switch autofocus>Switch</sp-switch>
    `;
};
export const Disabled = () => {
  return html`
        <sp-switch disabled>Switch</sp-switch>
    `;
};
export const disabledChecked = () => {
  return html`
        <sp-switch disabled checked>Switch</sp-switch>
    `;
};
//# sourceMappingURL=switch.stories.js.map
