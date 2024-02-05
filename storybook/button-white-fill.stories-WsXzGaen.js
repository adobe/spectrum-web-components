import { m as makeOverBackground, a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderIconSizeOverridden, f as renderMinWidthButton, g as renderLink, h as renderLinkWithTarget } from './index-KvCJIFKU.js';
import './sp-icon-help-7It6gf_P.js';
import './sp-button-RmYXnt4x.js';
import './ButtonBase-H8ie1_xx.js';
import './like-anchor-J4T73PxR.js';
import './define-element-2O4ZhTAw.js';
import './lit-element-xBOPiTek.js';
import './lit-html-GmIhAbMP.js';
import './if-defined-pV6JZKXB.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-ybW1xuBS.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './base-STdhtiz1.js';
import './sizedMixin-mnNfh2gr.js';
import './query-JMOstM_r.js';
import './when-kvvOyHr2.js';
import './sp-icon-h9aid892.js';
import './IconBase-TDmbHQaH.js';
import './Help-MUMRCGeh.js';
import './custom-tag-JXLWq-Sj.js';

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
