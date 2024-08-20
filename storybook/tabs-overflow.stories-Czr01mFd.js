import { r as renderTabsOverflowExample } from './index-BcCedB23.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-tab-panel-C3Be_Y6_.js';
import './tab.css-BBuKpb7A.js';
import './resize-controller-BJKfu6ft.js';
import './RovingTabindex-CoaPJLDZ.js';
import './FocusGroup-BxawWWgQ.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-DyuXUK9p.js';
import './define-element-C5BYKBZP.js';
import './focusable-BQuZpn6Y.js';
import './focus-visible-D29Av9Xb.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './mutation-controller-D2lT1xZk.js';
import './observe-slot-text-C2oNg7p9.js';
import './query-assigned-nodes-DAYI4epk.js';
import './random-id-BST1Puzz.js';
import './sp-action-button-CoTLHMmD.js';
import './sp-icon-corner-triangle300-CS4DKac8.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-q22s6ZK0.js';
import './ButtonBase-D3KeK2NK.js';
import './like-anchor-CXjWBVJG.js';
import './sp-icon-chevron100-Dn3goYXa.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './state-CnHyAYDv.js';
import './query-assigned-elements-C9WOp2R6.js';
import './repeat-D5JakrYV.js';
import './directive-helpers-icdnqxxc.js';

var tabsOverflow_stories = {
  title: "Tabs Overflow",
  component: "sp-tabs-overflow"
};
const compact = (args) => {
  return renderTabsOverflowExample(args);
};
compact.args = {
  compact: true
};
const autoscroll = (args) => {
  return renderTabsOverflowExample(args);
};
autoscroll.args = {
  selected: 15
};
const autoscrollOnlyHorizontally = (args) => {
  return x`
        <style>
            .container {
                height: 500px;
                overflow-y: scroll;
            }
        </style>
        <div class="container">
            <div style="height: 500px">There are some tabs down here!</div>
            ${renderTabsOverflowExample(args)}
        </div>
    `;
};
autoscrollOnlyHorizontally.args = {
  selected: 15
};
const __namedExportsOrder = ['compact', 'autoscroll', 'autoscrollOnlyHorizontally'];

export { __namedExportsOrder, autoscroll, autoscrollOnlyHorizontally, compact, tabsOverflow_stories as default };
