import { m as makeOverBackground, a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderIconSizeOverridden, f as renderMinWidthButton, g as renderLink, h as renderLinkWithTarget } from './index-BXtPlHii.js';
import './sp-icon-help-Cg_fYhcw.js';
import './sp-button-BKAPrKbL.js';
import './ButtonBase-DQebF_98.js';
import './like-anchor-DX5I66Td.js';
import './define-element-Cg7S_Nvo.js';
import './lit-element-BL-po2DW.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-C5h4CSZb.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Dl5hWaOm.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-sqnytUIU.js';
import './when-DEJm_QN9.js';
import './sp-icon-R1TCc8mN.js';
import './IconBase-C8frIgMv.js';
import './Help-BVQBuYxu.js';
import './custom-tag-Diwq7nXX.js';

const variant = "white";
const treatment = "outline";
var buttonWhiteOutline_stories = {
  component: "sp-button",
  title: "Button/White/Outline",
  decorators: [makeOverBackground()],
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

export { Default, __namedExportsOrder, buttonWhiteOutline_stories as default, iconSizeOverridden, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
