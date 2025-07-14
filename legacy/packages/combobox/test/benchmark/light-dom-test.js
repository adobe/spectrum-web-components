"use strict";
import "@spectrum-web-components/combobox/sp-combobox.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
import { countryList } from "../index.js";
measureFixtureCreation(
  html`
        <sp-combobox>
            ${countryList.map(
    (option, index) => html`
                    <sp-menu-item id=${index} value=${option}>
                        ${option}
                    </sp-menu-item>
                `
  )}
        </sp-combobox>
    `,
  {
    numRenders: 10
  }
);
//# sourceMappingURL=light-dom-test.js.map
