"use strict";
import "@spectrum-web-components/radio/sp-radio-group.js";
import "@spectrum-web-components/radio/sp-radio.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-radio-group id="test-default">
        <sp-radio value="first" checked>Option 1</sp-radio>
        <sp-radio value="second">Option 2</sp-radio>
        <sp-radio value="third">Option 3</sp-radio>
    </sp-radio-group>
`);
//# sourceMappingURL=test-basic.js.map
