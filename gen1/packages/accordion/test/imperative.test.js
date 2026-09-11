"use strict";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { Default } from "../stories/accordion.stories.js";
import { AccordionMarkup } from "../stories/index.js";
describe("Accordion - imperative interactions", () => {
  it("manages item size", async () => {
    const el = await fixture(
      AccordionMarkup({
        size: "l"
      })
    );
    const item = el.querySelector("sp-accordion-item");
    expect(el.size).to.equal("l");
    expect(item.size).to.equal("l");
    el.size = "s";
    await elementUpdated(el);
    await elementUpdated(item);
    expect(el.size).to.equal("s");
    expect(item.size).to.equal("s");
  });
  it("only allows one open item by default", async () => {
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
    let openItems = el.querySelectorAll("sp-accordion-item[open]");
    expect(openItems.length).to.equal(1);
    secondButton.click();
    await elementUpdated(el);
    openItems = el.querySelectorAll("sp-accordion-item[open]");
    expect(openItems.length).to.equal(1);
  });
  it("allows more than one open item when `[allow-multiple]`", async () => {
    const el = await fixture(Default());
    el.allowMultiple = true;
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
    secondButton.click();
    await elementUpdated(el);
    expect(firstItem.open).to.be.true;
    expect(secondItem.open).to.be.true;
  });
  it("ensures that the correct item is open and that items can be closed", async () => {
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
    secondButton.click();
    await elementUpdated(el);
    expect(firstItem.open).to.be.false;
    expect(secondItem.open).to.be.true;
    secondButton.click();
    await elementUpdated(el);
    expect(firstItem.open).to.be.false;
    expect(secondItem.open).to.be.false;
  });
  it("ensures that the correct item is open and that items can be closed when [allow-multiple]", async () => {
    const el = await fixture(Default());
    el.allowMultiple = true;
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
    secondButton.click();
    await elementUpdated(el);
    expect(firstItem.open).to.be.true;
    expect(secondItem.open).to.be.true;
    secondButton.click();
    await elementUpdated(el);
    expect(firstItem.open).to.be.true;
    expect(secondItem.open).to.be.false;
  });
});
//# sourceMappingURL=imperative.test.js.map
