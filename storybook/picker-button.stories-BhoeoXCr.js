import { a as argTypes, T as Template } from './index-CEtrQPzt.js';
import './sp-picker-button-D5Mjwhlx.js';
import './sp-icon-add-CkRHIkNK.js';
import { x } from './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './ButtonBase-DcuiXj8E.js';
import './like-anchor-BBONMzyI.js';
import './define-element-2VgsDjbW.js';
import './lit-element-BulMEkr1.js';
import './focusable-D81tHnNY.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Mz9mFVuX.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sp-icon-chevron100-CWW9sooh.js';
import './custom-tag-B5IH9PTE.js';
import './Chevron100-OyV1wQMZ.js';
import './IconBase-BC0FCRBc.js';
import './state-ChcedIDn.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './sizedMixin-D4VoaNlz.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './custom-tag-Diwq7nXX.js';
import './Add-BU-Fkq1o.js';

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
const quiet = (args) => Template(args);
quiet.args = { label: true, quiet: true };
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
const __namedExportsOrder = ['active', 'customIcon', 'invalid', 'quiet', 'label', 'labelCustom', 'open', 'positionLeft', 'positionRight', 'rounded', 'roundedLabel'];

export { __namedExportsOrder, active, customIcon, pickerButton_stories as default, invalid, label, labelCustom, open, positionLeft, positionRight, quiet, rounded, roundedLabel };
