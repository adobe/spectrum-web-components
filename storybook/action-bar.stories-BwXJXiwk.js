import './sp-action-bar-m2Alq4JJ.js';
import './sp-field-label-50w0r-Gn.js';
import './sp-action-button-IL4X3jdR.js';
import './sp-action-group-ng_q_-qr.js';
import './sp-icon-edit-5IxIuPeY.js';
import './sp-icon-more-8Poneot0.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-popover-OhDGQO09.js';
import './Popover-uavtgZAO.js';
import './lit-element-xBOPiTek.js';
import './define-element-UHExAFdK.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-close-button-RT_ZgufS.js';
import './spectrum-icon-cross.css-1cFDaPoP.js';
import './ButtonBase-sZHeZCuW.js';
import './like-anchor-njINSPTN.js';
import './if-defined-pV6JZKXB.js';
import './focusable-p9xQieT8.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-5oGzzbFn.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './sizedMixin-6sBuja8e.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './sp-icon-cross500-sf0nDjEl.js';
import './Cross500-CuS5PwKf.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './sp-icon-corner-triangle300-9DQQh1mD.js';
import './CornerTriangle300-wDtTC9xD.js';
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
