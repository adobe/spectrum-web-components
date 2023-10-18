import './sp-icons-large-e10ca407.js';
import './icons-demo-948987d9.js';
import { x } from './lit-html-126adc72.js';
import './define-element-e64f5ea4.js';
import './lit-element-9354aa77.js';
import './sp-icon-38633c83.js';
import './IconBase-d00b1a4e.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-search-eaccf8c1.js';
import './sp-clear-button-42b9f79d.js';
import './spectrum-icon-cross.css-5810d93c.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './sizedMixin-43fe982f.js';
import './custom-tag-c228386e.js';
import './sp-icon-magnify-b0889d95.js';
import './custom-tag-b5526d41.js';
import './Textfield-f4934212.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './sp-icon-alert-248f0d52.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-5175507d.js';
import './sp-field-label-eb7b786c.js';
import './ElementResolution-7469f128.js';
import './body-734819b4.js';
import './spectrum-lang.css-9eeeffe9.js';
import './sp-help-text-e88ae1be.js';
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
