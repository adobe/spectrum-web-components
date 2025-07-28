"use strict";
import "@spectrum-web-components/field-group/sp-field-group.js";
import "@spectrum-web-components/checkbox/sp-checkbox.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-field-group horizontal>
        <sp-checkbox>Checkbox 1</sp-checkbox>
        <sp-checkbox>Checkbox 2</sp-checkbox>
        <sp-checkbox>Checkbox 3</sp-checkbox>
        <sp-checkbox>Checkbox 4</sp-checkbox>
        <sp-checkbox>Checkbox 5</sp-checkbox>
    </sp-field-group>
`);
//# sourceMappingURL=basic-test.js.map
