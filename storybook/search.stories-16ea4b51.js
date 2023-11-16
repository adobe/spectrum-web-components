import './sp-search-40cc2551.js';
import { x } from './lit-html-126adc72.js';
import './sp-clear-button-1531965a.js';
import './spectrum-icon-cross.css-8f837689.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './if-defined-ae83b405.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './base-511c8c11.js';
import './sizedMixin-29c62bc2.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
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
