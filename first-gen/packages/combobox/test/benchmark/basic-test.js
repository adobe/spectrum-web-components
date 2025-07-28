"use strict";
import "@spectrum-web-components/combobox/sp-combobox.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
import { benchmarkOptions } from "../index.js";
measureFixtureCreation(
  html`
        <sp-combobox .options=${benchmarkOptions}></sp-combobox>
    `,
  {
    numRenders: 10
  }
);
//# sourceMappingURL=basic-test.js.map
