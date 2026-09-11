"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/truncated/sp-truncated.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <p style="width: 200px">
    <sp-truncated>
      This is a very long text that will overflow into a tooltip with the help
      of sp-truncated.
    </sp-truncated>
  </p>
`);
//# sourceMappingURL=basic-test.js.map
