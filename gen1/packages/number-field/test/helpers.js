"use strict";
import { elementUpdated, fixture, nextFrame } from "@open-wc/testing";
import { html } from "@spectrum-web-components/base";
import { sendMouse } from "../../../test/plugins/browser.js";
export async function getElFrom(test) {
  const wrapped = await fixture(html`
    <div style="--spectrum-alias-ui-icon-chevron-size-75: 20px;">${test}</div>
  `);
  const el = wrapped.querySelector("sp-number-field");
  await elementUpdated(el);
  return el;
}
export async function clickBySelector(el, selector, options = {}) {
  const target = el.shadowRoot.querySelector(selector);
  await sendMouse([
    {
      type: "move",
      position: [target],
      options
    },
    {
      type: "down",
      options
    }
  ]);
  await nextFrame();
  await sendMouse({
    type: "up",
    options
  });
  await elementUpdated(el);
}
//# sourceMappingURL=helpers.js.map
