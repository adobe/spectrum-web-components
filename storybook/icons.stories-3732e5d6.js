import './sp-icons-large-7ea98730.js';
import './icons-demo-652c7161.js';
import { x } from './lit-html-126adc72.js';
import './define-element-43d4edd5.js';
import './lit-element-9354aa77.js';
import './sp-icon-0926a2d4.js';
import './IconBase-fb970ebf.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-search-dd8024ff.js';
import './sp-clear-button-b5cd4c86.js';
import './spectrum-icon-cross.css-a270fccc.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './sizedMixin-281e4c72.js';
import './custom-tag-c228386e.js';
import './sp-icon-magnify-87776c4f.js';
import './custom-tag-b5526d41.js';
import './Textfield-a0f64496.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-c19acd0f.js';
import './sp-icon-alert-d34893d7.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-0afa7555.js';
import './sp-field-label-05f39d18.js';
import './ElementResolution-b58a0825.js';
import './body-734819b4.js';
import './spectrum-lang.css-9eeeffe9.js';
import './sp-help-text-b428b3b4.js';
import './custom-element-e937bb64.js';

var icons_stories = {
  title: "Icons",
  argTypes: {
    color: { control: "color" }
  },
  args: {
    color: "#000000"
  }
};
const listMedium = ({ color }) => x`
    <icons-demo style="color: ${color}">
        <sp-icons-medium></sp-icons-medium>
    </icons-demo>
`;
listMedium.storyName = "UI Icons - Medium";
const listLarge = ({ color }) => x`
    <icons-demo style="color: ${color}">
        <sp-icons-large></sp-icons-large>
    </icons-demo>
`;
listLarge.storyName = "UI Icons - Large";
const __namedExportsOrder = ['listMedium', 'listLarge'];

export { __namedExportsOrder, icons_stories as default, listLarge, listMedium };
