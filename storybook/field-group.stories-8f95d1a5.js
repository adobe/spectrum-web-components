import './sp-field-group-e0d6193e.js';
import './sp-checkbox-2808ae5b.js';
import './sp-radio-05931e72.js';
import { x } from './lit-html-126adc72.js';
import './FieldGroup-f386a0d6.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './if-defined-ae83b405.js';
import './lit-element-9354aa77.js';
import './define-element-617dba69.js';
import './CheckboxMixin-20c2ed92.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-icon-checkmark300-36d623be.js';
import './Checkmark300-0ba007ba.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './sp-icon-dash300-0b171774.js';
import './Dash300-2d8f97df.js';
import './spectrum-icon-dash.css-7fdeaf11.js';
import './sizedMixin-9a9da45c.js';
import './focus-visible-03398d98.js';

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
