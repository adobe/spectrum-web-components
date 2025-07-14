"use strict";
import "@spectrum-web-components/overlay/sp-overlay.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/dialog/sp-dialog.js";
import "@spectrum-web-components/slider/sp-slider.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(
  html`
        <sp-button id="button">Trigger</sp-button>
        <sp-overlay trigger="button@click">
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
                        <sp-tooltip
                            self-managed
                            delayed
                        >
                            Click to open another popover.
                        </sp-tooltip>
                    </sp-button>
                </sp-dialog>
            </sp-popover>
        </sp-overlay>
    `
);
//# sourceMappingURL=element-test.js.map
