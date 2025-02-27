import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderMinWidthButton, f as renderLink, g as renderLinkWithTarget } from './index-Cs7jy6y1.js';
import './sp-icon-help-CIWB74fN.js';
import './sp-button-Jx9C1QJR.js';
import './ButtonBase-DFBdS0ya.js';
import './like-anchor-YCQdykQc.js';
import './define-element-B3-QvDZd.js';
import './lit-element-BulMEkr1.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CRwO5NCP.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BVY5OzXy.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-BeXRKpss.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-Bh0Au8rG.js';
import './sp-icon-CThFoDUE.js';
import './IconBase-CmREmoFq.js';
import './state-DrGS5Kkk.js';
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
