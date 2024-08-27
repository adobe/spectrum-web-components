import './sp-action-bar-Dj-CW5G2.js';
import './sp-field-label-CZ0naTeT.js';
import './sp-action-button-Cap05DDq.js';
import './sp-action-group-DKrbdqJ8.js';
import './sp-icon-edit-8Wtp4EjX.js';
import './sp-icon-more-CAf9AdSJ.js';
import './sp-action-menu-DyzCsbs7.js';
import './sp-menu-BWEy12vg.js';
import './sp-menu-item-C8MCrD_m.js';
import './sp-icon-share-light-CpfFaAiv.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-popover-BB5UbEe8.js';
import './Popover-DxEMW8Ok.js';
import './lit-element-BL-po2DW.js';
import './define-element-CXRu6sWi.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-close-button-DeB-BbrO.js';
import './spectrum-icon-cross.css-BAONp4pC.js';
import './ButtonBase-B6EfsHA8.js';
import './like-anchor-BAH-foY5.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BHn_FpaM.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CBh62R5W.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-LhykbR0q.js';
import './sp-icon-cross500-D_HHrgfj.js';
import './Cross500-HJNUUNvY.js';
import './sizedMixin-BKu_31Nm.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './sp-icon-corner-triangle300-xtvzqr63.js';
import './CornerTriangle300-B7hvHiLM.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './Edit-CCpN7dze.js';
import './custom-tag-Diwq7nXX.js';
import './More-C2yzfCOG.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-C9xeKl_z.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './sp-icon-chevron100-Bg4mTD65.js';
import './Chevron100-2ZEB0c-t.js';
import './sp-icon-alert-Q6xYlBo2.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './style-map-DtKTc8KS.js';
import './state-dMhNMyLY.js';
import './when-DEJm_QN9.js';
import './spectrum-icon-checkmark.css-BQx7WYUd.js';
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
