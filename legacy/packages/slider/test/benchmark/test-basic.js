"use strict";
import "@spectrum-web-components/slider/sp-slider.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-slider
        value="50"
        step="1"
        min="0"
        max="100"
        label="Opacity"
        id="opacity-slider"
    ></sp-slider>
`);
//# sourceMappingURL=test-basic.js.map
