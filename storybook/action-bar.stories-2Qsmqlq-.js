import './sp-action-bar-eacummLO.js';
import './sp-field-label-zgYSrBxX.js';
import './sp-action-button-XdC2aqha.js';
import './sp-action-group-5N_Ss3pv.js';
import './sp-icon-edit-52Ilpbdk.js';
import './sp-icon-more--guHacSU.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-popover-VEiJb0fr.js';
import './Popover-JIiF3pUZ.js';
import './lit-element-xBOPiTek.js';
import './define-element-2SKaLcgv.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-close-button-DVfTfovy.js';
import './spectrum-icon-cross.css-fyatyW0U.js';
import './ButtonBase-75QTpX6n.js';
import './like-anchor-aNXO7yKS.js';
import './if-defined-pV6JZKXB.js';
import './focusable-n0Bfj6en.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-mc0YsU0d.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-6HeAKn4X.js';
import './sp-icon-cross500-EcTOQQfP.js';
import './Cross500-CuS5PwKf.js';
import './sizedMixin-i8vReDsT.js';
import './random-id-M2k-wjyE.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './ElementResolution-TTOqkMM7.js';
import './sp-icon-corner-triangle300-WaZEcosI.js';
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
