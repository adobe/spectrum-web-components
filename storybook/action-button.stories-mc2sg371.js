import './sp-action-group-rAGuj7aO.js';
import './sp-icon-edit-BOixh7Kk.js';
import { a as renderButton } from './index-CPY-oks2.js';
import './sp-action-button-PAnKUsuA.js';
import { x } from './lit-html-COgVUehj.js';
import './RovingTabindex-BIFuw_W7.js';
import './FocusGroup-CQTGJWkN.js';
import './mutation-controller-D2lT1xZk.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-BPhwmt-S.js';
import './define-element-Bun2ZgR-.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './custom-tag-Diwq7nXX.js';
import './Edit-prqhnpZR.js';
import './IconBase-luFyVpTn.js';
import './state-a9qXQZw8.js';
import './sp-icon-DqRHAie2.js';
import './if-defined-DDJGFaN4.js';
import './sp-icon-corner-triangle300-DK57Of1v.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './ButtonBase-CsEYgJMd.js';
import './like-anchor-BaNwPfYf.js';
import './focusable-y67P8eQI.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-B-N3zGRD.js';
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
const href = (args) => renderButtonsSelected(args);
href.args = {
  href: "https://github.com/adobe/spectrum-web-components",
  icon: x`
        <sp-icon-edit hidden slot="icon"></sp-icon-edit>
    `
};
const __namedExportsOrder = ['toggles', 'href'];

export { __namedExportsOrder, actionButton_stories as default, href, toggles };
