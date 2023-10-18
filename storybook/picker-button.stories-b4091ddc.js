import { a as argTypes, T as Template } from './sp-picker-button-3d886ce1.js';
import './sp-icon-add-ecb4ae3c.js';
import { x } from './lit-html-126adc72.js';
import './if-defined-ae83b405.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './define-element-e64f5ea4.js';
import './lit-element-9354aa77.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './base-511c8c11.js';
import './sizedMixin-43fe982f.js';
import './query-d0113d5a.js';
import './sp-icon-chevron100-232e7a83.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './observe-slot-presence-ae37a9bc.js';
import './spectrum-icon-chevron.css-6d5a7762.js';
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
