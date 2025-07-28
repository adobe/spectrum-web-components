"use strict";
import {
  makeOverBackground,
  renderButtonSet,
  renderLink,
  renderLinkWithTarget,
  renderMinWidthButton,
  renderWithIcon,
  renderWithIconOnly
} from "./index.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help.js";
import { args, argTypes } from "./index.js";
const staticColor = "white";
const treatment = "outline";
export default {
  component: "sp-button",
  title: "Button/White/Outline",
  decorators: [makeOverBackground(staticColor)],
  args: {
    ...args,
    staticColor,
    treatment
  },
  argTypes
};
export const Default = (props) => renderButtonSet(props);
export const Primary = (props) => renderButtonSet(props);
Primary.args = {
  variant: "primary"
};
export const Secondary = (props) => renderButtonSet(props);
Secondary.args = {
  variant: "secondary"
};
export const withIcon = (props) => renderWithIcon(props);
export const withIconOnly = (props) => renderWithIconOnly(props);
export const minWidthButton = (props) => renderMinWidthButton(props);
minWidthButton.storyName = "min-width";
export const link = (props) => renderLink(props);
link.storyName = "href";
export const linkWithTarget = (props) => renderLinkWithTarget(props);
linkWithTarget.storyName = 'href with target="_blank"';
//# sourceMappingURL=button-white-outline.stories.js.map
