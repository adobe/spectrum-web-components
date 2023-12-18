import './sp-search-6b79a4ca.js';
import { x } from './lit-html-126adc72.js';
import './sp-clear-button-ee6a6e05.js';
import './spectrum-icon-cross.css-87c98b5d.js';
import './ButtonBase-dba358cb.js';
import './like-anchor-8f97823d.js';
import './define-element-7dc6a572.js';
import './lit-element-9354aa77.js';
import './if-defined-ae83b405.js';
import './focusable-391b57ba.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-769cbc70.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-d63886c3.js';
import './base-511c8c11.js';
import './sizedMixin-3d08a58f.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-7772fb01.js';
import './sp-icon-magnify-fabd56c0.js';
import './custom-tag-b5526d41.js';
import './Textfield-bbb91e08.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-ebf23520.js';
import './sp-icon-alert-f7ff11b9.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-3927c84f.js';

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
