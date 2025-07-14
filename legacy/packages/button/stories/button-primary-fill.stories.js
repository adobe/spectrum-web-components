"use strict";
import { html } from "@spectrum-web-components/base";
import {
  renderButton,
  renderButtonSet,
  renderLink,
  renderLinkWithTarget,
  renderMinWidthButton,
  renderWithIcon,
  renderWithIconOnly
} from "./index.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help.js";
import { args, argTypes } from "./index.js";
const variant = "primary";
const treatment = "fill";
export default {
  component: "sp-button",
  title: "Button/Primary/Fill",
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
export const noWrapButton = (props) => renderButton({ noWrap, content, ...props });
const noWrap = true;
const content = html`
    Really long content that should not wrap, if it does wrap then we have a
    problem. Do we have a problem? I hope we don't have a problem. Is this long
    enough to show we do not have a problem? Awesome, we do not have a problem.
    Really long content that should not wrap, if it does wrap then we have a
    problem. Do we have a problem? I hope we don't have a problem. Is this long
    enough to show we do not have a problem? Awesome, we do not have a problem.
`;
noWrapButton.storyName = "no-wrap";
export const link = (props) => renderLink(props);
link.storyName = "href";
export const linkWithTarget = (props) => renderLinkWithTarget(props);
linkWithTarget.storyName = 'href with target="_blank"';
//# sourceMappingURL=button-primary-fill.stories.js.map
