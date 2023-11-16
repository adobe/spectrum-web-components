import './sp-icons-large-2ce7c059.js';
import './icons-demo-3463af0e.js';
import { x } from './lit-html-126adc72.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './sp-icon-8061244b.js';
import './IconBase-d9572ad8.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-search-40cc2551.js';
import './sp-clear-button-1531965a.js';
import './spectrum-icon-cross.css-8f837689.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './sizedMixin-29c62bc2.js';
import './custom-tag-c228386e.js';
import './sp-icon-magnify-4997aa6c.js';
import './custom-tag-b5526d41.js';
import './Textfield-773874be.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './sp-icon-alert-4033bfea.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-59f591cf.js';
import './sp-field-label-b445efc6.js';
import './ElementResolution-b58a0825.js';
import './body-734819b4.js';
import './spectrum-lang.css-9eeeffe9.js';
import './sp-help-text-b97b22d2.js';
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
