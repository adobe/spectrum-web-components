import './sp-icons-large-2ce7c059.js';
import './icons-demo-ae7e4f15.js';
import { x } from './lit-html-126adc72.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './sp-icon-8061244b.js';
import './IconBase-d9572ad8.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-search-d1cc37b1.js';
import './sp-clear-button-5d866f28.js';
import './spectrum-icon-cross.css-db5add4c.js';
import './ButtonBase-5cb3a7f7.js';
import './like-anchor-86192240.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-94a58958.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-db063b1b.js';
import './sizedMixin-9a9da45c.js';
import './custom-tag-c228386e.js';
import './sp-icon-magnify-4997aa6c.js';
import './custom-tag-b5526d41.js';
import './Textfield-7e6cdcd0.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './sp-icon-alert-4033bfea.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-59f591cf.js';
import './sp-field-label-286ffe1f.js';
import './ElementResolution-b58a0825.js';
import './body-734819b4.js';
import './spectrum-lang.css-9eeeffe9.js';
import './sp-help-text-c83a6f75.js';
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
