import './sp-checkbox-CiSLK57I.js';
import { x } from './lit-html-COgVUehj.js';
import './CheckboxMixin-5_qLyCai.js';
import './define-element-ByMWMcVd.js';
import './lit-element-BL-po2DW.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './if-defined-DDJGFaN4.js';
import './sp-icon-checkmark300-cQK7VcRi.js';
import './Checkmark300-Cv25Kwxj.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-C1z7UsT5.js';
import './spectrum-icon-checkmark.css-B6wBbQoF.js';
import './sp-icon-dash300-BYKwgJQz.js';
import './Dash300-DagFK8mn.js';
import './spectrum-icon-dash.css-ClCpXr2r.js';
import './sizedMixin-C1lD98vT.js';

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
