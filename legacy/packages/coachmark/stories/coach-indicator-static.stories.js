"use strict";
import { html } from "@spectrum-web-components/base";
import { makeOverBackground } from "../../button/stories/index.js";
import "@spectrum-web-components/coachmark/sp-coach-indicator.js";
export default {
  title: "CoachIndicator",
  component: "sp-coach-indicator",
  decorators: [makeOverBackground()]
};
export const staticWhite = () => {
  return html`
        <sp-coach-indicator static-color="white"></sp-coach-indicator>
        <sp-coach-indicator quiet static-color="white"></sp-coach-indicator>
    `;
};
export const staticBlack = () => {
  return html`
        <sp-coach-indicator static-color="black"></sp-coach-indicator>
        <sp-coach-indicator quiet static-color="black"></sp-coach-indicator>
    `;
};
//# sourceMappingURL=coach-indicator-static.stories.js.map
