import { m as makeOverBackground, a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderMinWidthButton, f as renderLink, g as renderLinkWithTarget } from './index-DvqeP97g.js';
import './sp-icon-help-mfzKvMT-.js';
import './sp-button-fZ-frECV.js';
import './ButtonBase-C-5TBDaE.js';
import './like-anchor-Dgva6KsU.js';
import './define-element-xyi5NDDf.js';
import './lit-element-BulMEkr1.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-DcHsG7Zg.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-64cbqGrA.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-C4z4_Svo.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-CTLIe6if.js';
import './sp-icon-3JXCeRZ3.js';
import './IconBase-5vvO1gxM.js';
import './state-DzluJiIq.js';
import './custom-tag-Diwq7nXX.js';
import './Help-DwXA_pCu.js';

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
const minWidthButton = (props) => renderMinWidthButton(props);
minWidthButton.storyName = "min-width";
const link = (props) => renderLink(props);
link.storyName = "href";
const linkWithTarget = (props) => renderLinkWithTarget(props);
linkWithTarget.storyName = 'href with target="_blank"';
const __namedExportsOrder = ['Default', 'withIcon', 'withIconOnly', 'minWidthButton', 'link', 'linkWithTarget'];

export { Default, __namedExportsOrder, buttonWhiteFill_stories as default, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
