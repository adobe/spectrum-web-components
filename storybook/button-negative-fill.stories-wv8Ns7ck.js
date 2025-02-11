import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderMinWidthButton, f as renderLink, g as renderLinkWithTarget } from './index-C2I_s3Wg.js';
import './sp-icon-help-DBTnHs-z.js';
import './sp-button-nbdGbWXQ.js';
import './ButtonBase-EiAuB8cn.js';
import './like-anchor-C9Xos9l8.js';
import './define-element-JsEeAjlA.js';
import './lit-element-BulMEkr1.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-C0Y2600m.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DKkDovCf.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-DrK3DVye.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-CvxKvEie.js';
import './sp-icon-CZ2xPYLk.js';
import './IconBase-Bmj8ZYSq.js';
import './state-CJdJtSzk.js';
import './custom-tag-Diwq7nXX.js';
import './Help-DwXA_pCu.js';

const variant = "negative";
const treatment = "fill";
var buttonNegativeFill_stories = {
  component: "sp-button",
  title: "Button/Negative/Fill",
  args: {
    ...args,
    variant,
    treatment
  },
  argTypes
};
const Default = (props) => renderButtonSet(props);
const withIcon = (props) => renderWithIcon(props);
const withIconOnly = (props) => renderWithIconOnly(props);
const minWidthButton = (props) => renderMinWidthButton(props);
minWidthButton.storyName = "min-width";
const link = (props) => renderLink(props);
link.storyName = "href";
const linkWithTarget = (props) => renderLinkWithTarget(props);
linkWithTarget.storyName = 'href with target="_blank"';
const __namedExportsOrder = ['Default', 'withIcon', 'withIconOnly', 'minWidthButton', 'link', 'linkWithTarget'];

export { Default, __namedExportsOrder, buttonNegativeFill_stories as default, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
