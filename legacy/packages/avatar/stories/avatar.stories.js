"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/avatar/sp-avatar.js";
import { avatar } from "./images";
export default {
  component: "sp-avatar",
  title: "Avatar",
  argTypes: {
    disabled: { control: "boolean" },
    label: { control: "text" },
    src: { control: "text" }
  },
  args: {
    disabled: false,
    label: "Place dog",
    src: avatar
  }
};
const Template = ({
  label = "Place Dog",
  src = avatar,
  size = 100
} = {}) => {
  return html`
        <sp-avatar label=${label} src=${src} size=${size}></sp-avatar>
    `;
};
const Link = ({
  disabled: disabled2 = false,
  label = "Place Dog",
  src = avatar,
  size = 100
} = {}) => {
  return html`
        <sp-avatar
            href="https://opensource.adobe.com/spectrum-web-components"
            ?disabled=${disabled2}
            label=${label}
            src=${src}
            size=${size}
        ></sp-avatar>
    `;
};
export const size50 = (args = {}) => Template({ ...args, size: 50 });
export const size75 = (args = {}) => Template({ ...args, size: 75 });
export const size100 = (args = {}) => Template({ ...args, size: 100 });
export const size200 = (args = {}) => Template({ ...args, size: 200 });
export const size300 = (args = {}) => Template({ ...args, size: 300 });
export const size400 = (args = {}) => Template({ ...args, size: 400 });
export const size500 = (args = {}) => Template({ ...args, size: 500 });
export const size600 = (args = {}) => Template({ ...args, size: 600 });
export const size700 = (args = {}) => Template({ ...args, size: 700 });
export const linked = (args = {}) => Link(args);
export const disabled = (args = {}) => Link(args);
disabled.args = { disabled: true };
//# sourceMappingURL=avatar.stories.js.map
