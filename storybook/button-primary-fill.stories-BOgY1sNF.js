import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderIconSizeOverridden, f as renderMinWidthButton, g as renderLink, h as renderLinkWithTarget } from './index-B0JWQ-qW.js';
import './sp-icon-help-Crc8OEFv.js';
import './sp-button-CeMdry9U.js';
import './ButtonBase-CGWMAWIx.js';
import './like-anchor-BF2mSMlR.js';
import './define-element-BgsU7oi-.js';
import './lit-element-BulMEkr1.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BVZVIowx.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-vBV0Xc1Q.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-BonGxxq6.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-CHWWI7zp.js';
import './sp-icon-BTK-ls8P.js';
import './IconBase-B4NmWdYY.js';
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
const link = (props) => renderLink(props);
link.storyName = "href";
const linkWithTarget = (props) => renderLinkWithTarget(props);
linkWithTarget.storyName = 'href with target="_blank"';
const __namedExportsOrder = ['Default', 'withIcon', 'withIconOnly', 'iconSizeOverridden', 'minWidthButton', 'link', 'linkWithTarget'];

export { Default, __namedExportsOrder, buttonPrimaryFill_stories as default, iconSizeOverridden, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
