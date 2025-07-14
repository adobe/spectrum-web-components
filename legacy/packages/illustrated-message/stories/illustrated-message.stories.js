"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/illustrated-message/sp-illustrated-message.js";
import { illustration } from "../../dropzone/test/test-svg.js";
export default {
  component: "sp-illustrated-message",
  title: "IllustratedMessage"
};
export const Default = () => {
  return html`
        <sp-illustrated-message
            heading="Drag and Drop Your File"
            description="Additional descriptive text"
        >
            ${illustration}
        </sp-illustrated-message>
    `;
};
//# sourceMappingURL=illustrated-message.stories.js.map
