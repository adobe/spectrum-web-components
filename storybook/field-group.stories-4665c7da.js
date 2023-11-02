import './sp-field-group-7069d2b1.js';
import './sp-checkbox-8e354a72.js';
import './sp-radio-e1972978.js';
import { x } from './lit-html-126adc72.js';
import './FieldGroup-e49bf5e9.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './if-defined-ae83b405.js';
import './lit-element-9354aa77.js';
import './define-element-43d4edd5.js';
import './CheckboxBase-694e006f.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
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

var fieldGroup_stories = {
  title: "Field Group",
  component: "sp-field-group"
};
const horizontal = () => {
  return x`
        <sp-field-group horizontal>
            <sp-checkbox>Checkbox 1</sp-checkbox>
            <sp-checkbox>Checkbox 2</sp-checkbox>
            <sp-checkbox>Checkbox 3</sp-checkbox>
            <sp-checkbox>Checkbox 4</sp-checkbox>
            <sp-checkbox>Checkbox 5</sp-checkbox>
        </sp-field-group>
    `;
};
const vertical = () => {
  return x`
        <sp-field-group vertical>
            <sp-checkbox>Checkbox 1</sp-checkbox>
            <sp-checkbox>Checkbox 2</sp-checkbox>
            <sp-checkbox>Checkbox 3</sp-checkbox>
            <sp-checkbox>Checkbox 4</sp-checkbox>
            <sp-checkbox>Checkbox 5</sp-checkbox>
        </sp-field-group>
    `;
};
const __namedExportsOrder = ['horizontal', 'vertical'];

export { __namedExportsOrder, fieldGroup_stories as default, horizontal, vertical };
