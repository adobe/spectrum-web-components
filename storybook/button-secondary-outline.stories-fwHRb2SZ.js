import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderIconSizeOverridden, f as renderMinWidthButton, g as renderLink, h as renderLinkWithTarget } from './index-utt5G90s.js';
import './sp-icon-help-uo3b6Itz.js';
import './sp-button-St5-WM_S.js';
import './ButtonBase-xfo9cPrz.js';
import './like-anchor-iRdC2T2x.js';
import './define-element-z6bXN_P5.js';
import './lit-element-xBOPiTek.js';
import './lit-html-GmIhAbMP.js';
import './if-defined-pV6JZKXB.js';
import './focusable-M0S89eyW.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-MDYPopbw.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-qh-rhz36.js';
import './base-STdhtiz1.js';
import './sizedMixin-IBQibr2z.js';
import './query-JMOstM_r.js';
import './when-kvvOyHr2.js';
import './sp-icon-nbUG1ZO_.js';
import './IconBase-1lzddWrP.js';
import './Help-MUMRCGeh.js';
import './custom-tag-JXLWq-Sj.js';

const variant = "secondary";
const treatment = "outline";
var buttonSecondaryOutline_stories = {
  component: "sp-button",
  title: "Button/Secondary/Outline",
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

export { Default, __namedExportsOrder, buttonSecondaryOutline_stories as default, iconSizeOverridden, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
