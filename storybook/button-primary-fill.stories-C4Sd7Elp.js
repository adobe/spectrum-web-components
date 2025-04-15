import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderMinWidthButton, h as renderButton, f as renderLink, g as renderLinkWithTarget } from './index-Cly4X37w.js';
import './sp-icon-help-C4oOiEkV.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-button-DPZvBYiQ.js';
import './ButtonBase-vQ52yrzS.js';
import './like-anchor-BMTFbWfx.js';
import './define-element-C4UuMSqY.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-0UaXYqOQ.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Bj4_fBJm.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-Dn01Sbyv.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-DUWGHsWj.js';
import './sp-icon-CfAg73k4.js';
import './IconBase-XNwB0O-B.js';
import './state-Cl59WR3S.js';
import './custom-tag-Diwq7nXX.js';
import './Help-DwXA_pCu.js';

const variant = "primary";
const treatment = "fill";
var buttonPrimaryFill_stories = {
  component: "sp-button",
  title: "Button/Primary/Fill",
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
const noWrapButton = (props) => renderButton({ noWrap, content, ...props });
const noWrap = true;
const content = x`
    Really long content that should not wrap, if it does wrap then we have a
    problem. Do we have a problem? I hope we don't have a problem. Is this long
    enough to show we do not have a problem? Awesome, we do not have a problem.
    Really long content that should not wrap, if it does wrap then we have a
    problem. Do we have a problem? I hope we don't have a problem. Is this long
    enough to show we do not have a problem? Awesome, we do not have a problem.
`;
noWrapButton.storyName = "no-wrap";
const link = (props) => renderLink(props);
link.storyName = "href";
const linkWithTarget = (props) => renderLinkWithTarget(props);
linkWithTarget.storyName = 'href with target="_blank"';
const __namedExportsOrder = ['Default', 'withIcon', 'withIconOnly', 'minWidthButton', 'noWrapButton', 'link', 'linkWithTarget'];

export { Default, __namedExportsOrder, buttonPrimaryFill_stories as default, link, linkWithTarget, minWidthButton, noWrapButton, withIcon, withIconOnly };
