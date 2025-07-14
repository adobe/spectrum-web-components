"use strict";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import { html } from "@spectrum-web-components/base";
import { slottableRequest } from "@spectrum-web-components/overlay/src/slottable-request-directive.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
const renderOptions = () => {
  import("@spectrum-web-components/menu/sp-menu-item.js");
  import("@spectrum-web-components/menu/sp-menu-divider.js");
  return html`
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select Inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
    `;
};
measureFixtureCreation(html`
    <sp-action-menu ${slottableRequest(renderOptions)}>
        <span slot="label">
            Select a Country with a very long label, too long in fact
        </span>
    </sp-action-menu>
`);
//# sourceMappingURL=test-directive.js.map
