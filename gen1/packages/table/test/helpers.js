"use strict";
import {
  virtualizerRef
} from "@lit-labs/virtualizer/virtualize.js";
import { fixture, html } from "@open-wc/testing";
export async function styledFixture(story) {
  const test = await fixture(html`
    <sp-theme system="spectrum" scale="medium" color="light">${story}</sp-theme>
  `);
  return test.children[0];
}
export async function tableLayoutComplete(table) {
  var _a;
  const body = table.querySelector("sp-table-body");
  await ((_a = body[virtualizerRef]) == null ? void 0 : _a.layoutComplete);
}
//# sourceMappingURL=helpers.js.map
