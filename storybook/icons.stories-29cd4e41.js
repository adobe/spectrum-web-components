import './sp-icons-large-f291d519.js';
import './icons-demo-3e6fa246.js';
import { x } from './lit-html-126adc72.js';
import './define-element-467f3dc4.js';
import './lit-element-9354aa77.js';
import './sp-icon-7032d55b.js';
import './IconBase-fdbfb1c1.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-search-a1586611.js';
import './sp-clear-button-4035aaee.js';
import './spectrum-icon-cross.css-8adfc305.js';
import './ButtonBase-4ebd5d24.js';
import './like-anchor-79c92c76.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-2a3e6366.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-6218f033.js';
import './sizedMixin-95b38e3e.js';
import './custom-tag-c228386e.js';
import './sp-icon-magnify-6bb2bc75.js';
import './custom-tag-b5526d41.js';
import './Textfield-034d075f.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-2fc91f81.js';
import './sp-icon-alert-107ad358.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-879d3fe4.js';
import './sp-field-label-5c290246.js';
import './ElementResolution-b58a0825.js';
import './body-734819b4.js';
import './spectrum-lang.css-9eeeffe9.js';
import './sp-help-text-fc561657.js';
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
