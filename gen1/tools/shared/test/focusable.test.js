"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import "@spectrum-web-components/shared/src/focusable.js";
describe("Focusable", () => {
  it("enforces the presense of a `focusElement`", async () => {
    customElements.define("focusable-test", class extends Focusable {
    });
    try {
      const el = await fixture(html`
        <focusable-test></focusable-test>
      `);
      await elementUpdated(el);
      const focusEl = el.focusElement;
      expect(focusEl).to.exist;
    } catch (error) {
      expect(() => {
        throw error;
      }).to.throw("Must implement focusElement getter!");
    }
  });
});
//# sourceMappingURL=focusable.test.js.map
