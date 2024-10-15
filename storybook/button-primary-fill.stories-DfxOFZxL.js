import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderIconSizeOverridden, f as renderMinWidthButton, i as renderButton, g as renderLink, h as renderLinkWithTarget } from './index-mogLy7kD.js';
import './sp-icon-help-BTLZxot9.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-button-T-oe-ZrM.js';
import './ButtonBase-CEd57Nas.js';
import './like-anchor-Do3nVKPx.js';
import './define-element-M8Esl59B.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BNUROw9U.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DjQnHXP-.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-J0gat4zB.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-Cn6CHTgo.js';
import './sp-icon-Cy1FTtVT.js';
import './IconBase-CZp8HczU.js';
import './state-CGRProwJ.js';
import './Help-BVQBuYxu.js';
import './custom-tag-Diwq7nXX.js';

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
const iconSizeOverridden = () => renderIconSizeOverridden(variant, treatment);
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
const __namedExportsOrder = ['Default', 'withIcon', 'withIconOnly', 'iconSizeOverridden', 'minWidthButton', 'noWrapButton', 'link', 'linkWithTarget'];

export { Default, __namedExportsOrder, buttonPrimaryFill_stories as default, iconSizeOverridden, link, linkWithTarget, minWidthButton, noWrapButton, withIcon, withIconOnly };
