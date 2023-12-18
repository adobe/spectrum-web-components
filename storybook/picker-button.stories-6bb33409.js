import { a as argTypes, T as Template } from './sp-picker-button-cd4f6d7d.js';
import './sp-icon-add-f0d59875.js';
import { x } from './lit-html-126adc72.js';
import './if-defined-ae83b405.js';
import './ButtonBase-dba358cb.js';
import './like-anchor-8f97823d.js';
import './define-element-7dc6a572.js';
import './lit-element-9354aa77.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-769cbc70.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-d63886c3.js';
import './base-511c8c11.js';
import './sizedMixin-3d08a58f.js';
import './query-d0113d5a.js';
import './sp-icon-chevron100-19c0ec20.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './observe-slot-presence-ae37a9bc.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './Add-6d65de87.js';
import './custom-tag-b5526d41.js';

var pickerButton_stories = {
  title: "Picker Button",
  component: "sp-picker-button",
  ...argTypes
};
const active = (args) => Template(args);
active.args = { active: true };
const customIcon = (args) => Template(args);
customIcon.args = {
  icon: x`
        <sp-icon-add
            slot="icon"
            class="spectrum-PickerButton-icon spectrum-Icon"
        ></sp-icon-add>
    `
};
const invalid = (args) => Template(args);
invalid.args = { invalid: true };
const label = (args) => Template(args);
label.args = { label: true };
const labelCustom = (args) => Template(args);
labelCustom.args = { label: "Some" };
const open = (args) => Template(args);
open.args = { open: true };
const positionLeft = (args) => Template(args);
positionLeft.args = { position: "left" };
const positionRight = (args) => Template(args);
positionRight.args = { position: "right" };
const rounded = (args) => Template(args);
rounded.args = { rounded: true };
const roundedLabel = (args) => Template(args);
roundedLabel.args = {
  label: true,
  rounded: true
};
const __namedExportsOrder = ['active', 'customIcon', 'invalid', 'label', 'labelCustom', 'open', 'positionLeft', 'positionRight', 'rounded', 'roundedLabel'];

export { __namedExportsOrder, active, customIcon, pickerButton_stories as default, invalid, label, labelCustom, open, positionLeft, positionRight, rounded, roundedLabel };
