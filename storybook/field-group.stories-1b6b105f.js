import './sp-field-group-224d25b3.js';
import './sp-checkbox-a1270c92.js';
import './sp-radio-719dfe10.js';
import { x } from './lit-html-126adc72.js';
import './FieldGroup-e8713dfb.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './if-defined-ae83b405.js';
import './lit-element-9354aa77.js';
import './define-element-7dc6a572.js';
import './CheckboxMixin-4e7a22f0.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-icon-checkmark300-a95398f6.js';
import './Checkmark300-0ba007ba.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './spectrum-icon-checkmark.css-ebf23520.js';
import './sp-icon-dash300-13e874ff.js';
import './Dash300-2d8f97df.js';
import './spectrum-icon-dash.css-7fdeaf11.js';
import './sizedMixin-3d08a58f.js';
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
