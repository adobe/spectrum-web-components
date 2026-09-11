"use strict";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { Default } from "../stories/accordion.stories.js";
describe("Accordion - controlled", () => {
  it("can have `toggle` events canceled", async () => {
    const el = await fixture(Default());
    await elementUpdated(el);
    const firstItem = el.querySelector(
      "sp-accordion-item:nth-of-type(1)"
    );
    const secondItem = el.querySelector(
      "sp-accordion-item:nth-of-type(2)"
    );
    const firstButton = firstItem.focusElement;
    const secondButton = secondItem.focusElement;
    firstButton.click();
    await elementUpdated(el);
    expect(firstItem.open).to.be.true;
    expect(secondItem.open).to.be.false;
    el.addEventListener(
      "sp-accordion-item-toggle",
      (event) => event.preventDefault()
    );
    secondButton.click();
    await elementUpdated(el);
    expect(firstItem.open).to.be.true;
    expect(secondItem.open).to.be.false;
  });
});
//# sourceMappingURL=controlled.test.js.map
