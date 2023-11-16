import './sp-action-group-1e1a03cc.js';
import './sp-icon-edit-686dea6d.js';
import { a as renderButton } from './index-1e6dd4e5.js';
import './sp-action-button-0f8bdf2f.js';
import { x } from './lit-html-126adc72.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './mutation-controller-81a30f7f.js';
import './lit-element-9354aa77.js';
import './sizedMixin-95b38e3e.js';
import './define-element-467f3dc4.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './Edit-e6e8ae2a.js';
import './custom-tag-b5526d41.js';
import './IconBase-fdbfb1c1.js';
import './sp-icon-7032d55b.js';
import './if-defined-ae83b405.js';
import './sp-icon-corner-triangle300-26ee005b.js';
import './CornerTriangle300-488cc3d0.js';
import './custom-tag-c228386e.js';
import './ButtonBase-4ebd5d24.js';
import './like-anchor-79c92c76.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-2a3e6366.js';
import './query-assigned-nodes-6218f033.js';

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
