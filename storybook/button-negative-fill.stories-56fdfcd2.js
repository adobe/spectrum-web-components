import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderIconSizeOverridden, e as renderMinWidthButton, f as renderLink, g as renderLinkWithTarget } from './index-3e31ac21.js';
import './sp-icon-help-1ae23d60.js';
import './sp-button-d4cd36d2.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './define-element-43d4edd5.js';
import './lit-element-9354aa77.js';
import './lit-html-126adc72.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './base-511c8c11.js';
import './sizedMixin-281e4c72.js';
import './query-d0113d5a.js';
import './sp-icon-0926a2d4.js';
import './IconBase-fb970ebf.js';
import './Help-10c43472.js';
import './custom-tag-b5526d41.js';

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
const iconSizeOverridden = () => renderIconSizeOverridden(variant, treatment);
const minWidthButton = (props) => renderMinWidthButton(props);
minWidthButton.storyName = "min-width";
const link = (props) => renderLink(props);
link.storyName = "href";
const linkWithTarget = (props) => renderLinkWithTarget(props);
linkWithTarget.storyName = 'href with target="_blank"';
const __namedExportsOrder = ['Default', 'withIcon', 'iconSizeOverridden', 'minWidthButton', 'link', 'linkWithTarget'];

export { Default, __namedExportsOrder, buttonNegativeFill_stories as default, iconSizeOverridden, link, linkWithTarget, minWidthButton, withIcon };
