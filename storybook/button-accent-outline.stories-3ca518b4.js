import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderIconSizeOverridden, f as renderMinWidthButton, g as renderLink, h as renderLinkWithTarget } from './index-53a75a80.js';
import './sp-icon-help-038cfed3.js';
import './sp-button-b85e30a6.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './define-element-617dba69.js';
import './lit-element-9354aa77.js';
import './lit-html-126adc72.js';
import './if-defined-ae83b405.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './base-511c8c11.js';
import './sizedMixin-29c62bc2.js';
import './query-d0113d5a.js';
import './sp-icon-8061244b.js';
import './IconBase-d9572ad8.js';
import './Help-10c43472.js';
import './custom-tag-b5526d41.js';

const variant = "accent";
const treatment = "outline";
var buttonAccentOutline_stories = {
  component: "sp-button",
  title: "Button/Accent/Outline",
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

export { Default, __namedExportsOrder, buttonAccentOutline_stories as default, iconSizeOverridden, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
