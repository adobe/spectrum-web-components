"use strict";
import "@spectrum-web-components/overlay/sp-overlay.js";
import "@spectrum-web-components/button/sp-button.js";
import {
  removeSlottableRequest
} from "@spectrum-web-components/overlay/src/slottable-request-event.js";
import { html, render } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
const handleSlottableRequest = (event) => {
  import("@spectrum-web-components/popover/sp-popover.js");
  import("@spectrum-web-components/dialog/sp-dialog.js");
  import("@spectrum-web-components/slider/sp-slider.js");
  import("@spectrum-web-components/tooltip/sp-tooltip.js");
  const template = event.data === removeSlottableRequest ? void 0 : html`
                  <sp-popover>
                      <sp-dialog no-divider>
                          <sp-slider
                              value="5"
                              step="0.5"
                              min="0"
                              max="20"
                              label="Awesomeness"
                          ></sp-slider>
                          <div id="styled-div">
                              The background of this div should be blue
                          </div>
                          <sp-button>
                              Press Me
                              <sp-tooltip self-managed delayed>
                                  Click to open another popover.
                              </sp-tooltip>
                          </sp-button>
                      </sp-dialog>
                  </sp-popover>
              `;
  render(template, event.target);
};
measureFixtureCreation(
  html`
        <sp-button id="button">Trigger</sp-button>
        <sp-overlay
            trigger="button@click"
            @slottable-request=${handleSlottableRequest}
        ></sp-overlay>
    `
);
//# sourceMappingURL=lazy-test.js.map
