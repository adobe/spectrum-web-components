import { m as makeOverBackground, a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderMinWidthButton, f as renderLink, g as renderLinkWithTarget } from './index-BRHV2qUG.js';
import './sp-icon-help-CaftLIGC.js';
import './sp-button-BdwaNDHQ.js';
import './ButtonBase-S95xo6rZ.js';
import './like-anchor-Du7qlE4L.js';
import './define-element-BcIuQqj7.js';
import './lit-element-BulMEkr1.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CVpJvZMa.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-7-FmzoJl.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-CHDRBDoX.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-y7jJohI-.js';
import './sp-icon-MJswZRJf.js';
import './IconBase-DryES_A6.js';
import './state-mjpVzfMZ.js';
import './custom-tag-Diwq7nXX.js';
import './Help-DwXA_pCu.js';

const variant = "black";
const treatment = "outline";
var buttonBlackOutline_stories = {
  component: "sp-button",
  title: "Button/Black/Outline",
  decorators: [makeOverBackground(variant)],
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
const link = (props) => renderLink(props);
link.storyName = "href";
const linkWithTarget = (props) => renderLinkWithTarget(props);
linkWithTarget.storyName = 'href with target="_blank"';
const __namedExportsOrder = ['Default', 'withIcon', 'withIconOnly', 'minWidthButton', 'link', 'linkWithTarget'];

export { Default, __namedExportsOrder, buttonBlackOutline_stories as default, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
