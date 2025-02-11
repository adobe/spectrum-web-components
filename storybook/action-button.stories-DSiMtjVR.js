import './sp-action-group-BLHWxplO.js';
import './sp-icon-edit-C4mdQGfw.js';
import { a as renderButton } from './index-DrkYHKOu.js';
import './sp-action-button-D5M6xHvf.js';
import { x } from './lit-html-COgVUehj.js';
import './RovingTabindex-Bi74mHtS.js';
import './FocusGroup-DQHKf855.js';
import './mutation-controller-D2lT1xZk.js';
import './lit-element-BulMEkr1.js';
import './sizedMixin-CvxKvEie.js';
import './define-element-JsEeAjlA.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './custom-tag-Diwq7nXX.js';
import './Edit-prqhnpZR.js';
import './IconBase-Bmj8ZYSq.js';
import './state-CJdJtSzk.js';
import './sp-icon-CZ2xPYLk.js';
import './if-defined-DDJGFaN4.js';
import './sp-icon-corner-triangle300-uVLgKiGk.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './ButtonBase-EiAuB8cn.js';
import './like-anchor-C9Xos9l8.js';
import './focusable-C0Y2600m.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DKkDovCf.js';
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
