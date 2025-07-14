"use strict";
import "@spectrum-web-components/search/sp-search.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-search
        placeholder="Search millions of images"
        label="Search for an image"
        @submit=${(event) => {
  event.preventDefault();
}}
    ></sp-search>
`);
//# sourceMappingURL=test-basic.js.map
