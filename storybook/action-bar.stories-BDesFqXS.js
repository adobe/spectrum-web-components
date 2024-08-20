import './sp-action-bar-C-ChM5tQ.js';
import './sp-field-label-DvdKN6Ly.js';
import './sp-action-button-CoTLHMmD.js';
import './sp-action-group-DVgkKHJs.js';
import './sp-icon-edit-Cvzs0geQ.js';
import './sp-icon-more-B5UQKdi8.js';
import './sp-action-menu-BUYe2cbG.js';
import './sp-menu-CTfuH1l3.js';
import './sp-menu-item-CPMamcOA.js';
import './sp-icon-share-light-BPQ82uK4.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-popover-C5FJ1XtN.js';
import './Popover-3sy-Xzo0.js';
import './lit-element-BL-po2DW.js';
import './define-element-C5BYKBZP.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-close-button-CURoaP9x.js';
import './spectrum-icon-cross.css-BUF8d0zt.js';
import './ButtonBase-D3KeK2NK.js';
import './like-anchor-CXjWBVJG.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BQuZpn6Y.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C2oNg7p9.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-q22s6ZK0.js';
import './sp-icon-cross500-bbmJkCUk.js';
import './Cross500-HJNUUNvY.js';
import './sizedMixin-DyuXUK9p.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './sp-icon-corner-triangle300-CS4DKac8.js';
import './CornerTriangle300-B7hvHiLM.js';
import './RovingTabindex-CoaPJLDZ.js';
import './FocusGroup-BxawWWgQ.js';
import './Edit-CCpN7dze.js';
import './custom-tag-Diwq7nXX.js';
import './More-C2yzfCOG.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-83KyQpKU.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './sp-icon-chevron100-Dn3goYXa.js';
import './Chevron100-2ZEB0c-t.js';
import './sp-icon-alert-C1Xt_mWd.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './style-map-DtKTc8KS.js';
import './state-CnHyAYDv.js';
import './when-DEJm_QN9.js';
import './spectrum-icon-checkmark.css-C_afKhIc.js';
import './ShareLight-B9MOfimI.js';

const Template = ({
  emphasized,
  open,
  tools = true
}) => {
  return x`
        <sp-action-bar ?open=${open} ?emphasized=${emphasized}>
            2 selected
            ${tools ? x`
                      <sp-action-button slot="buttons" label="Edit">
                          <sp-icon-edit slot="icon"></sp-icon-edit>
                      </sp-action-button>
                      <sp-action-button slot="buttons" label="Share">
                          <sp-icon-share-light
                              slot="icon"
                          ></sp-icon-share-light>
                      </sp-action-button>
                  ` : x``}
        </sp-action-bar>
    `;
};

var actionBar_stories = {
  title: "Action Bar",
  component: "sp-action-bar",
  parameters: {
    // Getting the Figma link: https://help.figma.com/hc/en-us/articles/360045003494-Storybook-and-Figma
    design: {
      type: "figma",
      url: "https://www.figma.com/file/MPtRIVRzPp2VHiEplwXL2X/S-%2F-Manual?node-id=465%3A3127&t=xbooxCWItOFgG2xM-1"
    }
  }
};
const Default = () => Template({
  open: true
});
const emphasized = () => {
  return x`
        <sp-action-bar open emphasized>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-bar>
    `;
};
const fixed = () => {
  return x`
        <style>
            [variant='fixed'] {
                bottom: 2.5em;
                inset-inline-end: 1em;
            }
        </style>
        <sp-action-bar open variant="fixed">
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-bar>
    `;
};
const flexible = () => {
  return x`
        <sp-action-bar open flexible emphasized>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
        </sp-action-bar>
    `;
};
const hasActionMenuAsChild = () => {
  return x`
        <sp-action-bar open>
            2 selected
            <sp-action-button slot="buttons" label="Edit">
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-menu label="More Actions" slot="buttons">
                <sp-menu-item>One</sp-menu-item>
                <sp-menu-item>Two</sp-menu-item>
                <sp-menu-item>
                    Select some items
                    <sp-menu slot="submenu" selects="multiple">
                        <sp-menu-item>A</sp-menu-item>
                        <sp-menu-item selected>B</sp-menu-item>
                        <sp-menu-item>C</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
            </sp-action-menu>
        </sp-action-bar>
    `;
};
const __namedExportsOrder = ['Default', 'emphasized', 'fixed', 'flexible', 'hasActionMenuAsChild'];

export { Default, __namedExportsOrder, actionBar_stories as default, emphasized, fixed, flexible, hasActionMenuAsChild };
