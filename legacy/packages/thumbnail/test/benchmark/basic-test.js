"use strict";
import "@spectrum-web-components/thumbnail/sp-thumbnail.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
import { thumbnail } from "../../stories/images.js";
measureFixtureCreation(html`
    <sp-thumbnail>
        <img src=${thumbnail} alt="Woman crouching" />
    </sp-thumbnail>
`);
//# sourceMappingURL=basic-test.js.map
