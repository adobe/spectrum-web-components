"use strict";
import { elementUpdated, expect, fixture, nextFrame } from "@open-wc/testing";
import { Default, Selected } from "../stories/top-nav.stories.js";
import { spy } from "sinon";
import { testForLitDevWarnings } from "../../../test/testing-helpers";
import { sendMouse } from "../../../test/plugins/browser.js";
describe("TopNav", () => {
  testForLitDevWarnings(async () => await fixture(Default()));
  it("loads default top-nav accessibly", async () => {
    const el = await fixture(Default());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("accepts and removes `label` accessibly", async () => {
    const el = await fixture(Default());
    await elementUpdated(el);
    el.label = "Page";
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    el.label = "";
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads with a selected item accessible", async () => {
    const el = await fixture(Selected());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("updates indicator size when Nav Item content changes", async () => {
    const el = await fixture(Selected());
    await elementUpdated(el);
    const items = [...el.querySelectorAll("sp-top-nav-item")];
    await Promise.all(items.map((item) => elementUpdated(item)));
    const indicator = el.shadowRoot.querySelector(
      "#selection-indicator"
    );
    const { width: widthStart } = indicator.getBoundingClientRect();
    const selectedItem = el.querySelector(
      `[href="${el.selected}"]`
    );
    selectedItem.innerHTML = "0";
    await nextFrame();
    await nextFrame();
    const { width: widthEnd } = indicator.getBoundingClientRect();
    expect(
      widthStart,
      `${widthStart} is not greater than ${widthEnd}`
    ).to.be.greaterThan(widthEnd);
  });
  it("can have an item removed", async () => {
    const el = await fixture(Selected());
    const item = el.querySelector(".selected");
    await elementUpdated(el);
    await elementUpdated(item);
    expect(el.selected).to.equal(item.value);
    item.remove();
    await elementUpdated(el);
    expect(el.selected).to.not.equal(item.value);
  });
});
describe("TopNavItem", () => {
  it("passes click to `<a>`", async () => {
    const clickSpy = spy();
    const test = await fixture(Selected());
    const el = test.querySelector(
      "sp-top-nav-item:nth-of-type(4)"
    );
    const anchor = el.focusElement;
    test.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.composedPath()[0];
      clickSpy(target);
    });
    await elementUpdated(el);
    el.click();
    expect(clickSpy.called).to.be.true;
    expect(clickSpy.calledWith(anchor)).to.be.true;
  });
  it("`<a>` accepts click across full item area", async () => {
    const clickSpy = spy();
    const test = await fixture(Selected());
    const el = test.querySelector(
      "sp-top-nav-item:nth-of-type(4)"
    );
    const anchor = el.focusElement;
    test.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.composedPath()[0];
      clickSpy(target);
    });
    await elementUpdated(el);
    const rect = el.getBoundingClientRect();
    await sendMouse({
      steps: [
        {
          type: "click",
          position: [rect.left + rect.width / 2, rect.top + 1]
        }
      ]
    });
    await elementUpdated(test);
    expect(clickSpy.called).to.be.true;
    expect(clickSpy.calledWith(anchor)).to.be.true;
  });
});
//# sourceMappingURL=top-nav.test.js.map
