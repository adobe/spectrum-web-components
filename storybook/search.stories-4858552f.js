import './sp-search-dd8024ff.js';
import { x } from './lit-html-126adc72.js';
import './sp-clear-button-b5cd4c86.js';
import './spectrum-icon-cross.css-a270fccc.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './define-element-43d4edd5.js';
import './lit-element-9354aa77.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './base-511c8c11.js';
import './sizedMixin-281e4c72.js';
import './query-d0113d5a.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
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
