import { r as renderTabsOverflowExample } from './index-BFvOISMN.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-tab-panel-D08_vGIY.js';
import './tab.css-OxNXyiqe.js';
import './resize-controller-BJKfu6ft.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-SWvQmBKY.js';
import './define-element-B7NoFsQI.js';
import './focusable-CtU8nZTr.js';
import './focus-visible-D29Av9Xb.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './mutation-controller-D2lT1xZk.js';
import './observe-slot-text-DVS1yx82.js';
import './query-assigned-nodes-DAYI4epk.js';
import './random-id-BST1Puzz.js';
import './sp-action-button-D_6IfCJA.js';
import './sp-icon-corner-triangle300-xPP9NKCs.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './ButtonBase-CVCDQq4P.js';
import './like-anchor-BQR4wmj8.js';
import './sp-icon-chevron100-DUm3RyOH.js';
import './Chevron100-OyV1wQMZ.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
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
