import './sp-textfield-Duy__dr1.js';
import './sp-picker-DZUQd4UY.js';
import './sp-field-label-C3IFjzeK.js';
import { x } from './lit-html-COgVUehj.js';
import './Textfield-DwZXN-nE.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './if-defined-DDJGFaN4.js';
import './focusable-Qk_nX99k.js';
import './focus-visible-D29Av9Xb.js';
import './define-element-BacrH-dd.js';
import './lit-element-BulMEkr1.js';
import './icon-checkmark-overrides.css-CNlpiO4P.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-lDJoNs5V.js';
import './state-DWB0FQGh.js';
import './sp-icon-alert-CTB_1kHZ.js';
import './custom-tag-Diwq7nXX.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './sizedMixin-D27dvb1g.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './Picker-Cykjsem7.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';
import './sp-icon-chevron100-D186oDGl.js';
import './Chevron100-OyV1wQMZ.js';
import './sp-menu-Bj8DrbR9.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './PendingState-Dc-7wEUb.js';
import './get-label-from-slot-Cg6mfN40.js';
import './platform-r3Lf9REX.js';
import './class-map-DdRvesrq.js';
import './style-map-DtKTc8KS.js';
import './ElementResolution-B9KteuX8.js';

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
