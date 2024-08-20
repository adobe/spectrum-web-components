import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderIconSizeOverridden, f as renderMinWidthButton, g as renderLink, h as renderLinkWithTarget } from './index-Byz6dmvG.js';
import './sp-icon-help-D1L9MBDw.js';
import './sp-button-whL2STLK.js';
import './ButtonBase-D3KeK2NK.js';
import './like-anchor-CXjWBVJG.js';
import './define-element-C5BYKBZP.js';
import './lit-element-BL-po2DW.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BQuZpn6Y.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-C2oNg7p9.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-DyuXUK9p.js';
import './when-DEJm_QN9.js';
import './sp-icon-nEXVNVvK.js';
import './IconBase-q22s6ZK0.js';
import './Help-BVQBuYxu.js';
import './custom-tag-Diwq7nXX.js';

const variant = "primary";
const treatment = "outline";
var buttonPrimaryOutline_stories = {
  component: "sp-button",
  title: "Button/Primary/Outline",
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

export { Default, __namedExportsOrder, buttonPrimaryOutline_stories as default, iconSizeOverridden, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
