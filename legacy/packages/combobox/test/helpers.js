"use strict";
import { expect, fixture } from "@open-wc/testing";
import { html } from "@open-wc/testing";
import "@spectrum-web-components/combobox/sp-combobox.js";
import { countries, fruits } from "../stories/index.js";
export const comboboxFixture = async () => {
  const el = await fixture(html`
        <sp-combobox
            .autocomplete=${"list"}
            label="Combobox"
            .options=${fruits}
        >
            Combobox
        </sp-combobox>
    `);
  return el;
};
export const longComboboxFixture = async () => {
  const el = await fixture(html`
        <sp-combobox
            .autocomplete=${"list"}
            label="Combobox"
            .options=${countries}
        >
            Combobox
        </sp-combobox>
    `);
  return el;
};
export const withDisabledItemsFixture = async () => {
  const countriesWithDisabledItems = countries.map((country) => ({
    ...country,
    disabled: ["Albania", "Azerbaijan", "Solomon Islands"].includes(
      country.itemText
    )
  }));
  const el = await fixture(html`
        <sp-combobox
            .autocomplete=${"list"}
            label="Combobox"
            .options=${countriesWithDisabledItems}
        >
            Combobox
        </sp-combobox>
    `);
  return el;
};
export const testActiveElement = (el, testId) => {
  var _a;
  expect((_a = el.activeDescendant) == null ? void 0 : _a.value, "active descendant").to.equal(testId);
  const activeElement = el.shadowRoot.querySelector(
    `#${el.activeDescendant.value}`
  );
  expect(
    activeElement.getAttribute("aria-selected"),
    "aria-selected"
  ).to.equal("true");
};
//# sourceMappingURL=helpers.js.map
