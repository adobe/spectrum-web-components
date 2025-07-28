"use strict";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/icons/sp-icons-medium.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
async function test() {
  const iconset = document.createElement("sp-icons-medium");
  document.body.append(iconset);
  await iconset.updateComplete;
  measureFixtureCreation(html`
        <sp-icon name="ui:Arrow100"></sp-icon>
    `);
}
test();
//# sourceMappingURL=test-basic.js.map
