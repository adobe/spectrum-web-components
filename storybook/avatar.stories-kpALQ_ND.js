import './sp-avatar-6ztSzXp7.js';
import { a as avatar } from './images-CoOs26Rf.js';
import { x } from './lit-html-COgVUehj.js';
import './like-anchor-B3Uz3TFY.js';
import './define-element-C_3bgzm7.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';

var avatar_stories = {
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
  return x`
        <sp-avatar label=${label} src=${src} size=${size}></sp-avatar>
    `;
};
const Link = ({
  disabled: disabled2 = false,
  label = "Place Dog",
  src = avatar,
  size = 100
} = {}) => {
  return x`
        <sp-avatar
            href="https://opensource.adobe.com/spectrum-web-components"
            ?disabled=${disabled2}
            label=${label}
            src=${src}
            size=${size}
        ></sp-avatar>
    `;
};
const size50 = (args = {}) => Template({ ...args, size: 50 });
const size75 = (args = {}) => Template({ ...args, size: 75 });
const size100 = (args = {}) => Template({ ...args, size: 100 });
const size200 = (args = {}) => Template({ ...args, size: 200 });
const size300 = (args = {}) => Template({ ...args, size: 300 });
const size400 = (args = {}) => Template({ ...args, size: 400 });
const size500 = (args = {}) => Template({ ...args, size: 500 });
const size600 = (args = {}) => Template({ ...args, size: 600 });
const size700 = (args = {}) => Template({ ...args, size: 700 });
const linked = (args = {}) => Link(args);
const disabled = (args = {}) => Link(args);
disabled.args = { disabled: true };
const __namedExportsOrder = ['size50', 'size75', 'size100', 'size200', 'size300', 'size400', 'size500', 'size600', 'size700', 'linked', 'disabled'];

export { __namedExportsOrder, avatar_stories as default, disabled, linked, size100, size200, size300, size400, size50, size500, size600, size700, size75 };
