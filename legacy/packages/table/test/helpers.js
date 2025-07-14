"use strict";
import { fixture, html } from "@open-wc/testing";
import { virtualizerRef } from "@lit-labs/virtualizer/virtualize.js";
export async function styledFixture(story) {
  const test = await fixture(html`
        <sp-theme system="spectrum" scale="medium" color="light">
            ${story}
        </sp-theme>
    `);
  return test.children[0];
}
export async function tableLayoutComplete(table) {
  const body = table.querySelector(
    "sp-table-body"
  );
  await body[virtualizerRef].layoutComplete;
}
//# sourceMappingURL=helpers.js.map
