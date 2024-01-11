import { a as argTypes, T as Template } from './sp-picker-button-vBHnXPVl.js';
import './sp-icon-add-O5kRsp_7.js';
import { x } from './lit-html-GmIhAbMP.js';
import './if-defined-pV6JZKXB.js';
import './ButtonBase-nL2qW8Lw.js';
import './like-anchor-PHkAP_YZ.js';
import './define-element-IUrhCXKn.js';
import './lit-element-xBOPiTek.js';
import './focusable-zbBPTVfi.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-CVZsl2bC.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-mXMsr4SG.js';
import './base-STdhtiz1.js';
import './sizedMixin-qrvMoaCA.js';
import './query-JMOstM_r.js';
import './sp-icon-chevron100-tD6SrTfS.js';
import './Chevron100-WZwzwvjg.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_gvXsC2f.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './Add-7SikBJL4.js';
import './custom-tag-JXLWq-Sj.js';

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
