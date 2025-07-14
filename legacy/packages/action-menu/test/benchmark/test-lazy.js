"use strict";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import { html, render } from "@spectrum-web-components/base";
import {
  removeSlottableRequest
} from "@spectrum-web-components/overlay/src/slottable-request-event.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
const handleSlottableRequest = (event) => {
  import("@spectrum-web-components/menu/sp-menu-item.js");
  import("@spectrum-web-components/menu/sp-menu-divider.js");
  const label = html`
        <span slot="label">
            Select a Country with a very long label, too long in fact
        </span>
    `;
  const template = event.data === removeSlottableRequest ? label : html`
                  ${label}
                  <sp-menu-item>Deselect</sp-menu-item>
                  <sp-menu-item>Select Inverse</sp-menu-item>
                  <sp-menu-item>Feather...</sp-menu-item>
                  <sp-menu-item>Select and Mask...</sp-menu-item>
                  <sp-menu-divider></sp-menu-divider>
                  <sp-menu-item>Save Selection</sp-menu-item>
                  <sp-menu-item disabled>Make Work Path</sp-menu-item>
              `;
  render(template, event.target);
};
measureFixtureCreation(html`
    <sp-action-menu @slottable-request=${handleSlottableRequest}>
        <span slot="label">
            Select a Country with a very long label, too long in fact
        </span>
    </sp-action-menu>
`);
//# sourceMappingURL=test-lazy.js.map
