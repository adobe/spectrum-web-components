"use strict";
import { html } from "@spectrum-web-components/base";
import { elementUpdated, fixture, nextFrame } from "@open-wc/testing";
import { sendMouse } from "../../../test/plugins/browser.js";
export async function getElFrom(test) {
  const wrapped = await fixture(html`
        <div style="--spectrum-alias-ui-icon-chevron-size-75: 20px;">
            ${test}
        </div>
    `);
  const el = wrapped.querySelector("sp-number-field");
  await elementUpdated(el);
  return el;
}
export async function clickBySelector(el, selector, options = {}) {
  const target = el.shadowRoot.querySelector(selector);
  const targetRect = target.getBoundingClientRect();
  await sendMouse({
    steps: [
      {
        type: "move",
        position: [
          targetRect.x + targetRect.width / 2,
          targetRect.y + targetRect.height / 2
        ],
        options
      },
      {
        type: "down",
        options
      }
    ]
  });
  await nextFrame();
  await sendMouse({
    steps: [
      {
        type: "up",
        options
      }
    ]
  });
  await elementUpdated(el);
}
//# sourceMappingURL=helpers.js.map
