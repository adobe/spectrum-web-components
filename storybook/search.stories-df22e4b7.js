import './sp-search-d1cc37b1.js';
import { x } from './lit-html-126adc72.js';
import './sp-clear-button-5d866f28.js';
import './spectrum-icon-cross.css-db5add4c.js';
import './ButtonBase-5cb3a7f7.js';
import './like-anchor-86192240.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './if-defined-ae83b405.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-94a58958.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-db063b1b.js';
import './base-511c8c11.js';
import './sizedMixin-9a9da45c.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
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

var search_stories = {
  component: "sp-search",
  title: "Search"
};
const Default = () => x`
    <sp-search></sp-search>
    <sp-search disabled></sp-search>
`;
const autofocus = () => x`
    <sp-search autofocus></sp-search>
`;
const focusedOverflowing = () => x`
    <sp-search
        value="this is a really long search term that overflows the available space"
    ></sp-search>
`;
const Quiet = () => x`
    <sp-search quiet></sp-search>
    <sp-search quiet disabled></sp-search>
`;
const __namedExportsOrder = ['Default', 'autofocus', 'focusedOverflowing', 'Quiet'];

export { Default, Quiet, __namedExportsOrder, autofocus, search_stories as default, focusedOverflowing };
