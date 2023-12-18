import './sp-textfield-00b5f14c.js';
import './sp-picker-c2f902c1.js';
import './sp-field-label-81c2b9be.js';
import { x } from './lit-html-126adc72.js';
import './Textfield-bbb91e08.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './if-defined-ae83b405.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './define-element-7dc6a572.js';
import './lit-element-9354aa77.js';
import './spectrum-icon-checkmark.css-ebf23520.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './sp-icon-alert-f7ff11b9.js';
import './custom-tag-b5526d41.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './sizedMixin-3d08a58f.js';
import './base-511c8c11.js';
import './state-3927c84f.js';
import './query-d0113d5a.js';
import './Picker-50b2dc89.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './sp-icon-chevron100-19c0ec20.js';
import './Chevron100-6f55b923.js';
import './sp-menu-b9e57a20.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './style-map-156e3c36.js';
import './ElementResolution-b58a0825.js';

var fieldLabel_stories = {
  title: "Field Label",
  component: "sp-field-label"
};
const standard = () => {
  return x`
        <sp-field-label for="lifestory-1">Life Story</sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory-1"
        ></sp-textfield>
        <sp-field-label for="lifestory-2" disabled>
            Life Story
            <sp-textfield
                placeholder="Enter your life story"
                disabled
                id="lifestory-2"
            ></sp-textfield>
        </sp-field-label>
    `;
};
const sideAlignStart = () => {
  return x`
        <sp-field-label
            for="lifestory"
            side-aligned="start"
            style="width: 72px;"
        >
            Life Story
        </sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory"
        ></sp-textfield>
    `;
};
const sideAlignEnd = () => {
  return x`
        <sp-field-label for="lifestory" side-aligned="end" style="width: 72px;">
            Life Story
        </sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory"
        ></sp-textfield>
    `;
};
const required = () => {
  return x`
        <sp-field-label for="lifestory-1" required>Life Story</sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory-1"
        ></sp-textfield>
        <sp-field-label for="lifestory-2">Life Story (Required)</sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory-2"
        ></sp-textfield>
        <br />
        <br />
        <sp-field-label for="lifestory-3" side-aligned="start" required>
            Life Story
        </sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory-3"
        ></sp-textfield>
        <br />
        <br />
        <sp-field-label for="lifestory-4" side-aligned="end" required>
            Life Story
        </sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            id="lifestory-4"
        ></sp-textfield>
        <sp-field-label for="lifestory-5" required disabled>
            Life Story
        </sp-field-label>
        <sp-textfield
            placeholder="Enter your life story"
            disabled
            id="lifestory-5"
        ></sp-textfield>
    `;
};
const picker = () => {
  return x`
        <sp-field-label for="country" required>
            Select a Country with a very long label, too long in fact
        </sp-field-label>
        <sp-picker id="country" value="item-2">
            <sp-menu-item value="item-1">Deselect</sp-menu-item>
            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="item-3">Feather...</sp-menu-item>
            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item value="item-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>
        </sp-picker>
    `;
};
const nativeInput = () => {
  return x`
        <sp-field-label for="lifestory-1" required>Life Story</sp-field-label>
        <input placeholder="Enter your life story" id="lifestory-1" />
    `;
};
const __namedExportsOrder = ['standard', 'sideAlignStart', 'sideAlignEnd', 'required', 'picker', 'nativeInput'];

export { __namedExportsOrder, fieldLabel_stories as default, nativeInput, picker, required, sideAlignEnd, sideAlignStart, standard };
