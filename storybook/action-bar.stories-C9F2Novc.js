import './sp-action-bar-BIsZ0n2c.js';
import './sp-field-label-CcbnA-9i.js';
import './sp-action-button-GJJh_4Ts.js';
import './sp-action-group-BLZSvjNX.js';
import './sp-icon-edit-t0rX_G5S.js';
import './sp-icon-more-CheVc2SU.js';
import './sp-action-menu-CvElcOmN.js';
import './sp-menu-Bj8DrbR9.js';
import './sp-menu-item-FIdNp82T.js';
import './sp-icon-share-BS55e2R_.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-popover-DVq3btVN.js';
import './Popover-Dy_XwdEG.js';
import './lit-element-BulMEkr1.js';
import './define-element-BacrH-dd.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-close-button-DnQEUmWc.js';
import './icon-cross-overrides.css-DsCXcMtK.js';
import './ButtonBase-DjpCcxMx.js';
import './like-anchor-BTdhD6VU.js';
import './if-defined-DDJGFaN4.js';
import './focusable-Qk_nX99k.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CG33WdGp.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-sFh2_uG3.js';
import './state-DWB0FQGh.js';
import './sp-icon-cross500-CWHa9HeZ.js';
import './Cross500-Cv8kebkP.js';
import './sizedMixin-D27dvb1g.js';
import './random-id-BST1Puzz.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './ElementResolution-B9KteuX8.js';
import './sp-icon-corner-triangle300-CMLQSph_.js';
import './CornerTriangle300-B0AKm-jy.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './custom-tag-Diwq7nXX.js';
import './Edit-prqhnpZR.js';
import './More-D5VvzTyj.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-Bk1o1W1J.js';
import './icon-chevron-overrides.css-Bz8Nk10Z.js';
import './sp-icon-chevron100-D9IXAw32.js';
import './Chevron100-OyV1wQMZ.js';
import './sp-icon-alert-DaBQ9iwA.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './PendingState-Dc-7wEUb.js';
import './get-label-from-slot-Cg6mfN40.js';
import './platform-r3Lf9REX.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './style-map-DtKTc8KS.js';
import './icon-checkmark-overrides.css-DQNJ1kXI.js';
import './Share-C7ia2FsH.js';

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
                          <sp-icon-share slot="icon"></sp-icon-share>
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
