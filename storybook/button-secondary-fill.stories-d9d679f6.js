import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderIconSizeOverridden, e as renderMinWidthButton, f as renderLink, g as renderLinkWithTarget } from './index-b16ecba2.js';
import './sp-icon-help-d701da7b.js';
import './sp-button-6534d7a7.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './lit-html-126adc72.js';
import './if-defined-ae83b405.js';
import './define-element-e64f5ea4.js';
import './lit-element-9354aa77.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './base-511c8c11.js';
import './sizedMixin-43fe982f.js';
import './query-d0113d5a.js';
import './sp-icon-38633c83.js';
import './IconBase-d00b1a4e.js';
import './Help-10c43472.js';
import './custom-tag-b5526d41.js';

const variant = "secondary";
const treatment = "fill";
var buttonSecondaryFill_stories = {
  component: "sp-button",
  title: "Button/Secondary/Fill",
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

export { Default, __namedExportsOrder, buttonSecondaryFill_stories as default, iconSizeOverridden, link, linkWithTarget, minWidthButton, withIcon };
