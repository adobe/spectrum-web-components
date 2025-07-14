"use strict";
import {
  renderButtonSet,
  renderLink,
  renderLinkWithTarget,
  renderMinWidthButton,
  renderWithIcon,
  renderWithIconOnly
} from "./index.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help.js";
import { args, argTypes } from "./index.js";
const variant = "secondary";
const treatment = "outline";
export default {
  component: "sp-button",
  title: "Button/Secondary/Outline",
  args: {
    ...args,
    variant,
    treatment
  },
  argTypes
};
export const Default = (props) => renderButtonSet(props);
export const withIcon = (props) => renderWithIcon(props);
export const withIconOnly = (props) => renderWithIconOnly(props);
export const minWidthButton = (props) => renderMinWidthButton(props);
minWidthButton.storyName = "min-width";
export const link = (props) => renderLink(props);
link.storyName = "href";
export const linkWithTarget = (props) => renderLinkWithTarget(props);
linkWithTarget.storyName = 'href with target="_blank"';
//# sourceMappingURL=button-secondary-outline.stories.js.map
