"use strict";
import "@spectrum-web-components/tags/sp-tag.js";
import "@spectrum-web-components/tags/sp-tags.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-tags>
        <sp-tags-item>Tag 1</sp-tags-item>
        <sp-tags-item invalid>Tag 2</sp-tags-item>
        <sp-tags-item disabled>Tag 3</sp-tags-item>
    </sp-tags>
`);
//# sourceMappingURL=basic-test.js.map
