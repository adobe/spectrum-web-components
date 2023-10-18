import './sp-checkbox-1a2ad388.js';
import './sp-field-group-89e7c2f5.js';
import { x } from './lit-html-126adc72.js';
import './CheckboxBase-dd1db946.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './define-element-e64f5ea4.js';
import './lit-element-9354aa77.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-icon-checkmark300-9608e0ff.js';
import './Checkmark300-0ba007ba.js';
import './custom-tag-c228386e.js';
import './IconBase-d00b1a4e.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './sp-icon-dash300-baefb43f.js';
import './Dash300-2d8f97df.js';
import './spectrum-icon-dash.css-7fdeaf11.js';
import './sizedMixin-43fe982f.js';
import './FieldGroup-10738c40.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './if-defined-ae83b405.js';

var checkbox_stories = {
  component: "sp-checkbox",
  title: "Checkbox"
};
const Default = () => {
  return x`
        <sp-checkbox>Checkbox</sp-checkbox>
    `;
};
const readonly = () => {
  return x`
        <sp-checkbox checked readonly>Checkbox</sp-checkbox>
    `;
};
const Indeterminate = () => {
  return x`
        <sp-checkbox indeterminate>
            Checkbox, indeterminate, not checked
        </sp-checkbox>
        <br />
        <sp-checkbox indeterminate checked>
            Checkbox, indeterminate, checked
        </sp-checkbox>
    `;
};
const Checked = () => {
  return x`
        <sp-checkbox checked>Checkbox</sp-checkbox>
    `;
};
const emphasized = () => {
  return x`
        <sp-checkbox emphasized>Checkbox</sp-checkbox>
    `;
};
const emphasizedIndeterminate = () => {
  return x`
        <sp-checkbox emphasized indeterminate>Checkbox</sp-checkbox>
    `;
};
const emphasizedChecked = () => {
  return x`
        <sp-checkbox emphasized checked>Checkbox</sp-checkbox>
    `;
};
const emphasizedInvalid = () => {
  return x`
        <sp-checkbox emphasized invalid>Checkbox</sp-checkbox>
    `;
};
const emphasizedInvalidIndeterminate = () => {
  return x`
        <sp-checkbox emphasized invalid indeterminate>Checkbox</sp-checkbox>
    `;
};
const emphasizedInvalidChecked = () => {
  return x`
        <sp-checkbox emphasized invalid checked>Checkbox</sp-checkbox>
    `;
};
const Invalid = () => {
  return x`
        <sp-checkbox invalid>Checkbox</sp-checkbox>
    `;
};
const invalidIndeterminate = () => {
  return x`
        <sp-checkbox invalid indeterminate>Checkbox</sp-checkbox>
    `;
};
const invalidChecked = () => {
  return x`
        <sp-checkbox invalid checked>Checkbox</sp-checkbox>
    `;
};
const Autofocus = () => {
  return x`
        <sp-checkbox autofocus>Checkbox</sp-checkbox>
    `;
};
const Disabled = () => {
  return x`
        <sp-checkbox disabled>Checkbox</sp-checkbox>
    `;
};
const disabledChecked = () => {
  return x`
        <sp-checkbox disabled checked>Checkbox</sp-checkbox>
    `;
};
const disabledIndeterminate = () => {
  return x`
        <sp-checkbox disabled indeterminate>Checkbox</sp-checkbox>
    `;
};
const emphasizedDisabled = () => {
  return x`
        <sp-checkbox emphasized disabled>Checkbox</sp-checkbox>
    `;
};
const emphasizedDisabledIndeterminate = () => {
  return x`
        <sp-checkbox emphasized disabled indeterminate>Checkbox</sp-checkbox>
    `;
};
const emphasizedDisabledChecked = () => {
  return x`
        <sp-checkbox emphasized checked>Checkbox</sp-checkbox>
    `;
};
const tabIndexExample = () => {
  return x`
        <sp-field-group horizontal>
            <sp-checkbox tabindex="0">Checkbox 0</sp-checkbox>
            <sp-checkbox disabled tabindex="3">Checkbox 3</sp-checkbox>
            <sp-checkbox tabindex="4">Checkbox 4</sp-checkbox>
            <sp-checkbox tabindex="2" autofocus>Checkbox 2</sp-checkbox>
            <sp-checkbox tabindex="1">Checkbox 1</sp-checkbox>
        </sp-field-group>
    `;
};
const verticalTabIndexExample = () => {
  return x`
        <sp-field-group vertical>
            <sp-checkbox tabindex="0">Checkbox 0</sp-checkbox>
            <sp-checkbox disabled tabindex="3">Checkbox 3</sp-checkbox>
            <sp-checkbox tabindex="4">Checkbox 4</sp-checkbox>
            <sp-checkbox tabindex="2" autofocus>Checkbox 2</sp-checkbox>
            <sp-checkbox tabindex="1">Checkbox 1</sp-checkbox>
        </sp-field-group>
    `;
};
const __namedExportsOrder = ['Default', 'readonly', 'Indeterminate', 'Checked', 'emphasized', 'emphasizedIndeterminate', 'emphasizedChecked', 'emphasizedInvalid', 'emphasizedInvalidIndeterminate', 'emphasizedInvalidChecked', 'Invalid', 'invalidIndeterminate', 'invalidChecked', 'Autofocus', 'Disabled', 'disabledChecked', 'disabledIndeterminate', 'emphasizedDisabled', 'emphasizedDisabledIndeterminate', 'emphasizedDisabledChecked', 'tabIndexExample', 'verticalTabIndexExample'];

export { Autofocus, Checked, Default, Disabled, Indeterminate, Invalid, __namedExportsOrder, checkbox_stories as default, disabledChecked, disabledIndeterminate, emphasized, emphasizedChecked, emphasizedDisabled, emphasizedDisabledChecked, emphasizedDisabledIndeterminate, emphasizedIndeterminate, emphasizedInvalid, emphasizedInvalidChecked, emphasizedInvalidIndeterminate, invalidChecked, invalidIndeterminate, readonly, tabIndexExample, verticalTabIndexExample };
