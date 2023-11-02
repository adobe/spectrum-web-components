import './sp-checkbox-8e354a72.js';
import { x } from './lit-html-126adc72.js';
import './CheckboxBase-694e006f.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './define-element-43d4edd5.js';
import './lit-element-9354aa77.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-icon-checkmark300-36db3994.js';
import './Checkmark300-0ba007ba.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './spectrum-icon-checkmark.css-c19acd0f.js';
import './sp-icon-dash300-58f80cc7.js';
import './Dash300-2d8f97df.js';
import './spectrum-icon-dash.css-7fdeaf11.js';
import './sizedMixin-281e4c72.js';

var checkboxSizes_stories = {
  component: "sp-checkbox",
  title: "Checkbox/Sizes",
  argTypes: {
    onClick: { action: "click" },
    onChange: { action: "change" }
  }
};
const checkbox = ({
  size,
  checked,
  indeterminate,
  onClick,
  onChange
}) => {
  return x`
        <sp-checkbox
            size=${size}
            ?checked=${checked}
            ?indeterminate=${indeterminate}
            @click="${onClick}"
            @change="${onChange}"
        >
            Checkbox
        </sp-checkbox>
    `;
};
const s = (args) => checkbox({ ...args, size: "s" });
const sChecked = (args) => checkbox({ ...args, size: "s", checked: true });
const sIndeterminate = (args) => checkbox({ ...args, size: "s", indeterminate: true });
const m = (args) => checkbox({ ...args, size: "m" });
const mChecked = (args) => checkbox({ ...args, size: "m", checked: true });
const mIndeterminate = (args) => checkbox({ ...args, size: "m", indeterminate: true });
const l = (args) => checkbox({ ...args, size: "l" });
const lChecked = (args) => checkbox({ ...args, size: "l", checked: true });
const lIndeterminate = (args) => checkbox({ ...args, size: "l", indeterminate: true });
const XL = (args) => checkbox({ ...args, size: "xl" });
const XLChecked = (args) => checkbox({ ...args, size: "xl", checked: true });
const XLIndeterminate = (args) => checkbox({ ...args, size: "xl", indeterminate: true });
const __namedExportsOrder = ['s', 'sChecked', 'sIndeterminate', 'm', 'mChecked', 'mIndeterminate', 'l', 'lChecked', 'lIndeterminate', 'XL', 'XLChecked', 'XLIndeterminate'];

export { XL, XLChecked, XLIndeterminate, __namedExportsOrder, checkboxSizes_stories as default, l, lChecked, lIndeterminate, m, mChecked, mIndeterminate, s, sChecked, sIndeterminate };
