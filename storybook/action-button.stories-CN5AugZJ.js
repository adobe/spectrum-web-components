import './sp-action-group-BLZSvjNX.js';
import './sp-icon-edit-B4XqfQhj.js';
import { a as renderButton } from './index-DZK7MMHR.js';
import './sp-action-button-DtK_29oM.js';
import { x } from './lit-html-COgVUehj.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './mutation-controller-D2lT1xZk.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-D27dvb1g.js';
import './define-element-BacrH-dd.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './custom-tag-Diwq7nXX.js';
import './Edit-prqhnpZR.js';
import './IconBase-lDJoNs5V.js';
import './state-DWB0FQGh.js';
import './sp-icon-B_FQdtNF.js';
import './if-defined-DDJGFaN4.js';
import './sp-icon-corner-triangle300-tK2gzJwJ.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './ButtonBase-DjpCcxMx.js';
import './like-anchor-BTdhD6VU.js';
import './focusable-Qk_nX99k.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CG33WdGp.js';
import './query-assigned-nodes-DAYI4epk.js';

var actionButton_stories = {
  component: "sp-action-button",
  title: "Action Button"
};
function renderButtonsSelected(args) {
  const disabled = Object.assign({}, args, { disabled: true });
  const selected = Object.assign({}, args, { selected: true });
  return x`
        <sp-action-group
            ?emphasized="${!!args.emphasized}"
            ?quiet="${!!args.quiet}"
        >
            ${renderButton(args)} ${renderButton(selected)}
            ${renderButton(disabled)}
        </sp-action-group>
    `;
}
const toggles = (args) => renderButtonsSelected(args);
toggles.args = {
  toggles: true,
  icon: x`
        <sp-icon-edit hidden slot="icon"></sp-icon-edit>
    `
};
const __namedExportsOrder = ['toggles'];

export { __namedExportsOrder, actionButton_stories as default, toggles };
