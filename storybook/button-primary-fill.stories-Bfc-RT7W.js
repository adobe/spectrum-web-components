import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderIconSizeOverridden, f as renderMinWidthButton, g as renderLink, h as renderLinkWithTarget } from './index-CKDcFgoG.js';
import './sp-icon-help-CQ5lyzL5.js';
import './sp-button-un1oLDDW.js';
import './ButtonBase-DrEDDNGU.js';
import './like-anchor-Cds2yNgE.js';
import './define-element-CuLWp0nJ.js';
import './lit-element-BL-po2DW.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-B74rwTMw.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-bZJQT55z.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-BYlU5N2O.js';
import './when-DEJm_QN9.js';
import './sp-icon-DiFmj6GE.js';
import './IconBase-BoJOjJXT.js';
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
