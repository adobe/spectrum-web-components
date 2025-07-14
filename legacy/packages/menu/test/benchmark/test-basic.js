"use strict";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/menu/sp-menu-group.js";
import "@spectrum-web-components/menu/sp-menu-divider.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-menu selects="multiple">
        <sp-menu-group selects="inherit">
            <span slot="header">Section Heading</span>
            <sp-menu-item>Action 1</sp-menu-item>
            <sp-menu-item>Action 2</sp-menu-item>
            <sp-menu-item>Action 3</sp-menu-item>
        </sp-menu-group>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-group selects="inherit">
            <span slot="header">Section Heading</span>
            <sp-menu-item>Save</sp-menu-item>
            <sp-menu-item disabled>Download</sp-menu-item>
        </sp-menu-group>
    </sp-menu>
`);
//# sourceMappingURL=test-basic.js.map
