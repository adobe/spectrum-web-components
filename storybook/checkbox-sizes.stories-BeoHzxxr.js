import './sp-checkbox-D-RY7RtY.js';
import { x } from './lit-html-COgVUehj.js';
import './CheckboxMixin-C0rQDnaR.js';
import './define-element-Bun2ZgR-.js';
import './lit-element-BulMEkr1.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './if-defined-DDJGFaN4.js';
import './sp-icon-checkmark300-yoX2NWOi.js';
import './custom-tag-B5IH9PTE.js';
import './Checkmark300-CQLndXBK.js';
import './IconBase-luFyVpTn.js';
import './state-a9qXQZw8.js';
import './spectrum-icon-checkmark.css-Df67pkTu.js';
import './sp-icon-dash300-swYwWzN0.js';
import './Dash300-BPmLOKTF.js';
import './spectrum-icon-dash.css-lElR_d7u.js';
import './sizedMixin-BPhwmt-S.js';

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
