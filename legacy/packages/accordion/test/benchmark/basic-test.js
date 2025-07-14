"use strict";
import "@spectrum-web-components/accordion/sp-accordion.js";
import "@spectrum-web-components/accordion/sp-accordion-item.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-accordion>
        <sp-accordion-item label="Heading 1">
            <div>Item 1</div>
        </sp-accordion-item>
        <sp-accordion-item label="Heading 2">
            <div>Item 2</div>
        </sp-accordion-item>
        <sp-accordion-item label="Heading 3">
            <div>Item 3</div>
        </sp-accordion-item>
        <sp-accordion-item label="Heading 4">
            <div>Item 4</div>
        </sp-accordion-item>
        <sp-accordion-item label="Heading 5">
            <div>Item 5</div>
        </sp-accordion-item>
        <sp-accordion-item label="Heading 6">
            <div>Item 6</div>
        </sp-accordion-item>
    </sp-accordion>
`);
//# sourceMappingURL=basic-test.js.map
