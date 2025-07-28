"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/coachmark/sp-coach-indicator.js";
export default {
  title: "CoachIndicator",
  component: "sp-coach-indicator"
};
export const Default = () => {
  return html`
        <sp-coach-indicator></sp-coach-indicator>
    `;
};
export const quiet = () => {
  return html`
        <sp-coach-indicator quiet></sp-coach-indicator>
    `;
};
//# sourceMappingURL=coach-indicator.stories.js.map
