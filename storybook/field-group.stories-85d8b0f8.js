import './sp-field-group-89e7c2f5.js';
import './sp-checkbox-1a2ad388.js';
import './sp-radio-c007bc5e.js';
import { x } from './lit-html-126adc72.js';
import './FieldGroup-10738c40.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './if-defined-ae83b405.js';
import './lit-element-9354aa77.js';
import './define-element-e64f5ea4.js';
import './CheckboxBase-dd1db946.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
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
