import { r as renderTabsOverflowExample } from './index-D3ffF20N.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-tab-panel-DmMaCc-Y.js';
import './tab.css-B7nSVs8Y.js';
import './resize-controller-BJKfu6ft.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-CTLIe6if.js';
import './define-element-xyi5NDDf.js';
import './focusable-DcHsG7Zg.js';
import './focus-visible-D29Av9Xb.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './mutation-controller-D2lT1xZk.js';
import './observe-slot-text-64cbqGrA.js';
import './query-assigned-nodes-DAYI4epk.js';
import './random-id-BST1Puzz.js';
import './sp-action-button-rDyKsJf5.js';
import './sp-icon-corner-triangle300-BqR5xB2E.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './IconBase-5vvO1gxM.js';
import './state-DzluJiIq.js';
import './ButtonBase-C-5TBDaE.js';
import './like-anchor-Dgva6KsU.js';
import './sp-icon-chevron100-CVbE_k3u.js';
import './Chevron100-OyV1wQMZ.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';
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
