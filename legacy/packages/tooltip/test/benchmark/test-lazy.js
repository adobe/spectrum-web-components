"use strict";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import {
  removeSlottableRequest
} from "@spectrum-web-components/overlay/src/slottable-request-event.js";
import { html, render } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
const handleSlottableRequest = (event) => {
  import("@spectrum-web-components/tooltip/sp-tooltip.js");
  const template = event.data === removeSlottableRequest ? void 0 : html`
                  <sp-tooltip>Tip me!</sp-tooltip>
              `;
  render(template, event.target);
};
measureFixtureCreation(html`
    <sp-action-button id="button">I'm a button...</sp-action-button>
    <sp-overlay
        trigger="button@hover"
        type="hint"
        @slottable-request=${handleSlottableRequest}
    ></sp-overlay>
`);
//# sourceMappingURL=test-lazy.js.map
