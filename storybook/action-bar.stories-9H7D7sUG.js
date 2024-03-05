import './sp-action-bar-rduphT6K.js';
import './sp-field-label-Tiv8xbEr.js';
import './sp-action-button-yK8oK-HS.js';
import './sp-action-group-djPkcn0t.js';
import './sp-icon-edit-LAQa2Ir4.js';
import './sp-icon-more-VlXpxsc-.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-popover-K6nK-Hu0.js';
import './Popover-ZO_2BJ88.js';
import './lit-element-xBOPiTek.js';
import './define-element-z6bXN_P5.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-close-button-F0_4B7Dg.js';
import './spectrum-icon-cross.css-NAMb6F9U.js';
import './ButtonBase-xfo9cPrz.js';
import './like-anchor-iRdC2T2x.js';
import './if-defined-pV6JZKXB.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-MDYPopbw.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-qh-rhz36.js';
import './sizedMixin-IBQibr2z.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-1lzddWrP.js';
import './sp-icon-cross500-MLi7bA4s.js';
import './Cross500-CuS5PwKf.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './sp-icon-corner-triangle300-oci86m4p.js';
import './CornerTriangle300-scOUseNi.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './Edit-G5NAbE7j.js';
import './custom-tag-JXLWq-Sj.js';
import './More-RXlxfRbl.js';

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
                      <sp-action-button slot="buttons" label="More">
                          <sp-icon-more slot="icon"></sp-icon-more>
                      </sp-action-button>
                  ` : x``}
        </sp-action-bar>
    `;
};

var actionBar_stories = {
  title: "Action Bar",
  component: "sp-action-bar"
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
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
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
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
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
            <sp-action-button slot="buttons" label="More">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
        </sp-action-bar>
    `;
};
const __namedExportsOrder = ['Default', 'emphasized', 'fixed', 'flexible'];

export { Default, __namedExportsOrder, actionBar_stories as default, emphasized, fixed, flexible };
