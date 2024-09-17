import { r as renderTabsOverflowExample } from './index-FE4GimlU.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-tab-panel-B-7zW_wO.js';
import './tab.css-DU5VcCOz.js';
import './resize-controller-BJKfu6ft.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-CHWWI7zp.js';
import './define-element-BgsU7oi-.js';
import './focusable-BVZVIowx.js';
import './focus-visible-D29Av9Xb.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './mutation-controller-D2lT1xZk.js';
import './observe-slot-text-vBV0Xc1Q.js';
import './query-assigned-nodes-DAYI4epk.js';
import './random-id-BST1Puzz.js';
import './sp-action-button-BlHIBOPf.js';
import './sp-icon-corner-triangle300-By2ZthPD.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-B4NmWdYY.js';
import './ButtonBase-CGWMAWIx.js';
import './like-anchor-BF2mSMlR.js';
import './sp-icon-chevron100-ravIHRxr.js';
import './Chevron100-2ZEB0c-t.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './state-ClgQn688.js';
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
