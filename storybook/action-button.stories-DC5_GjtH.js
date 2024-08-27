import './sp-action-group-DKrbdqJ8.js';
import './sp-icon-edit-8Wtp4EjX.js';
import { a as renderButton } from './index-CjRUSFA8.js';
import './sp-action-button-Cap05DDq.js';
import { x } from './lit-html-COgVUehj.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './mutation-controller-D2lT1xZk.js';
import './lit-element-BL-po2DW.js';
import './sizedMixin-BKu_31Nm.js';
import './define-element-CXRu6sWi.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './Edit-CCpN7dze.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-LhykbR0q.js';
import './sp-icon-CYuqy0p0.js';
import './if-defined-DDJGFaN4.js';
import './sp-icon-corner-triangle300-xtvzqr63.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './ButtonBase-B6EfsHA8.js';
import './like-anchor-BAH-foY5.js';
import './focusable-BHn_FpaM.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CBh62R5W.js';
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
const iconSizeOverridden = (args) => {
  return x`
        ${renderButton(args)}
        <h1>For testing purposes only</h1>
        <p>
            This is a test to ensure that sizing the icon will still work when
            it's in the scope of a parent element. You shouldn't normally do
            this as it deviates from the Spectrum design specification.
        </p>
    `;
};
iconSizeOverridden.args = {
  label: "",
  size: "xl",
  icon: x`
        <sp-icon-edit slot="icon" size="s"></sp-icon-edit>
    `
};
const __namedExportsOrder = ['toggles', 'iconSizeOverridden'];

export { __namedExportsOrder, actionButton_stories as default, iconSizeOverridden, toggles };
