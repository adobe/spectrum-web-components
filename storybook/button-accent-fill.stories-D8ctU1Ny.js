import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderMinWidthButton, f as renderLink, g as renderLinkWithTarget } from './index-C_XikmUc.js';
import './sp-icon-help-DupcRyUT.js';
import './sp-button-CCjeFkWT.js';
import './ButtonBase-CVCDQq4P.js';
import './like-anchor-BQR4wmj8.js';
import './define-element-B7NoFsQI.js';
import './lit-element-BulMEkr1.js';
import './lit-html-COgVUehj.js';
import './if-defined-DDJGFaN4.js';
import './focusable-CtU8nZTr.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-DVS1yx82.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './PendingState-D1EWknyv.js';
import './get-label-from-slot-Cg6mfN40.js';
import './sizedMixin-SWvQmBKY.js';
import './sp-icon-C6fwh19n.js';
import './IconBase-DXeaJSV5.js';
import './state-CG9Kyp94.js';
import './custom-tag-Diwq7nXX.js';
import './Help-DwXA_pCu.js';

const variant = "accent";
const treatment = "fill";
var buttonAccentFill_stories = {
  component: "sp-button",
  title: "Button/Accent/Fill",
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

export { Default, __namedExportsOrder, buttonAccentFill_stories as default, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
