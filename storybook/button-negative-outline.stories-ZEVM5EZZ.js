import { a as args, b as argTypes, r as renderButtonSet, c as renderWithIcon, d as renderWithIconOnly, e as renderIconSizeOverridden, f as renderMinWidthButton, g as renderLink, h as renderLinkWithTarget } from './index-EomDWsAs.js';
import './sp-icon-help-fDVNeBlH.js';
import './sp-button-W8hFYHyg.js';
import './ButtonBase-jlLlzNEe.js';
import './like-anchor-Gwp5ooDH.js';
import './define-element-s04w2teA.js';
import './lit-element-xBOPiTek.js';
import './lit-html-GmIhAbMP.js';
import './if-defined-pV6JZKXB.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-eZT7feU8.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-u86daeBT.js';
import './base-STdhtiz1.js';
import './sizedMixin-D9_yg9Lr.js';
import './query-JMOstM_r.js';
import './when-kvvOyHr2.js';
import './sp-icon-34kpoGCA.js';
import './IconBase-_0RU6XqS.js';
import './Help-MUMRCGeh.js';
import './custom-tag-JXLWq-Sj.js';

const variant = "negative";
const treatment = "outline";
var buttonNegativeOutline_stories = {
  component: "sp-button",
  title: "Button/Negative/Outline",
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

export { Default, __namedExportsOrder, buttonNegativeOutline_stories as default, iconSizeOverridden, link, linkWithTarget, minWidthButton, withIcon, withIconOnly };
