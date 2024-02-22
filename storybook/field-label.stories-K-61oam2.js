import './sp-textfield-T8bEq8Q3.js';
import './sp-picker-bs90PbqY.js';
import './sp-field-label-WhBVoFu4.js';
import { x } from './lit-html-GmIhAbMP.js';
import './Textfield-5Qr4UnN3.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './if-defined-pV6JZKXB.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './define-element-b58XwwBM.js';
import './lit-element-xBOPiTek.js';
import './spectrum-icon-checkmark.css-HAq4zshr.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-O-P913zU.js';
import './sp-icon-alert-R3VPMRV3.js';
import './custom-tag-JXLWq-Sj.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './sizedMixin-SQxNgkJG.js';
import './base-STdhtiz1.js';
import './state-OAXf-QuH.js';
import './query-JMOstM_r.js';
import './Picker-YX902jDF.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';
import './sp-icon-chevron100-Z3b2AbFg.js';
import './Chevron100-ok1mOHjI.js';
import './sp-menu-4vecIofk.js';
import './MatchMedia-SMh19R1m.js';
import './class-map-Q7DIFm9x.js';
import './style-map-ak5mT6xX.js';
import './ElementResolution-TTOqkMM7.js';

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
