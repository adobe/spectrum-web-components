import { m as makeOverBackground, a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderIconSizeOverridden, f as renderMinWidthButton, g as renderLink, h as renderLinkWithTarget } from './index-jgNgVuKM.js';
import './sp-icon-help-F4P8y_ow.js';
import './sp-button-D1KAULH9.js';
import './ButtonBase-B6EfsHA8.js';
import './like-anchor-BAH-foY5.js';
import './define-element-CXRu6sWi.js';
import './lit-element-BL-po2DW.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-BHn_FpaM.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CBh62R5W.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-BKu_31Nm.js';
import './when-DEJm_QN9.js';
import './sp-icon-CYuqy0p0.js';
import './IconBase-LhykbR0q.js';
import './Help-BVQBuYxu.js';
import './custom-tag-Diwq7nXX.js';

const variant = "white";
const treatment = "fill";
var buttonWhiteFill_stories = {
  component: "sp-button",
  title: "Button/White/Fill",
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

export { Default, __namedExportsOrder, buttonWhiteFill_stories as default, iconSizeOverridden, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
