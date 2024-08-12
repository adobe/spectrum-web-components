import './sp-action-bar-BdlcM1aL.js';
import './sp-field-label-BIZFvuFw.js';
import './sp-action-button-DsNjWZwM.js';
import './sp-action-group-B13QDRfi.js';
import './sp-icon-edit-DAuQgXnx.js';
import './sp-icon-more-ed5g2Y4T.js';
import './sp-action-menu-DWRpKQNS.js';
import './sp-menu-C8v97wTb.js';
import './sp-menu-item-8u7lqO6f.js';
import './sp-icon-share-light-BKLn7va0.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-popover-8oM61WIR.js';
import './Popover-BDIzwbib.js';
import './lit-element-BL-po2DW.js';
import './define-element-DfDMCiEa.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-close-button-CIIV381x.js';
import './spectrum-icon-cross.css-BlifuMyY.js';
import './ButtonBase-C7Ofi_KG.js';
import './like-anchor-BYGSHbJ7.js';
import './if-defined-DDJGFaN4.js';
import './focusable-DH4iFM4s.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BtuI5sqC.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-Fm5B4nA1.js';
import './sp-icon-cross500-BK3u0Nvh.js';
import './Cross500-HJNUUNvY.js';
import './sizedMixin-Cgw04SVn.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './sp-icon-corner-triangle300-BFQa-tNZ.js';
import './CornerTriangle300-B7hvHiLM.js';
import './RovingTabindex-CoaPJLDZ.js';
import './FocusGroup-BxawWWgQ.js';
import './Edit-CCpN7dze.js';
import './custom-tag-Diwq7nXX.js';
import './More-C2yzfCOG.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-Cv9SU9tX.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './sp-icon-chevron100-rjktYDjS.js';
import './Chevron100-2ZEB0c-t.js';
import './sp-icon-alert-BytVFlW2.js';
import './MatchMedia-pSNe9kbs.js';
import './DependencyManger-Dpkh1Bse.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './style-map-DtKTc8KS.js';
import './state-Bu2qBYzT.js';
import './when-DEJm_QN9.js';
import './spectrum-icon-checkmark.css-aJBgz3nt.js';
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
