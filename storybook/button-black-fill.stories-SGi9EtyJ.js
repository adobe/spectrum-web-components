import { m as makeOverBackground, a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderMinWidthButton, f as renderLink, g as renderLinkWithTarget } from './index-DjJfD23C.js';
import './sp-icon-help-DjGvi4oT.js';
import './sp-button-RtDTDjdF.js';
import './ButtonBase-ixFv8y71.js';
import './like-anchor-DD7X4GZI.js';
import './define-element-CbLZvyrL.js';
import './lit-element-BulMEkr1.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-8mrYv4ai.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-nvMXakjD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-Ddh3k4V8.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-HBGPeo6s.js';
import './sp-icon-C0O1UE6w.js';
import './IconBase-Z2IxLljH.js';
import './state-DMEtq-nM.js';
import './custom-tag-Diwq7nXX.js';
import './Help-DwXA_pCu.js';

const variant = "black";
const treatment = "fill";
var buttonBlackFill_stories = {
  component: "sp-button",
  title: "Button/Black/Fill",
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

export { Default, __namedExportsOrder, buttonBlackFill_stories as default, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
