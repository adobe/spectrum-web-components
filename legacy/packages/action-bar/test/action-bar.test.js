"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/action-bar/sp-action-bar.js";
import { Default, emphasized } from "../stories/action-bar.stories.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { spy } from "sinon";
describe("ActionBar", () => {
  testForLitDevWarnings(async () => await fixture(Default()));
  it("loads", async () => {
    const el = await fixture(Default());
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    await expect(el).to.be.accessible();
  });
  it("accepts variants", async () => {
    const el = await fixture(
      html`
                <sp-action-bar variant="sticky">Help text.</sp-action-bar>
            `
    );
    await elementUpdated(el);
    expect(el.variant).to.equal("sticky");
    expect(el.getAttribute("variant")).to.equal("sticky");
    el.variant = "fixed";
    await elementUpdated(el);
    expect(el.variant).to.equal("fixed");
    expect(el.getAttribute("variant")).to.equal("fixed");
    el.setAttribute("variant", "sticky");
    await elementUpdated(el);
    expect(el.variant).to.equal("sticky");
    expect(el.getAttribute("variant")).to.equal("sticky");
    el.removeAttribute("variant");
    await elementUpdated(el);
    expect(el.variant).to.equal("");
    expect(el.hasAttribute("variant")).to.be.false;
  });
  it("validates variants", async () => {
    const el = await fixture(
      html`
                <sp-action-bar variant="other">Help text.</sp-action-bar>
            `
    );
    await elementUpdated(el);
    expect(el.variant).to.equal("");
    expect(el.hasAttribute("variant")).to.be.false;
    el.variant = "fixed";
    await elementUpdated(el);
    expect(el.variant).to.equal("fixed");
    expect(el.getAttribute("variant")).to.equal("fixed");
    el.variant = "fixed";
    await elementUpdated(el);
    expect(el.variant).to.equal("fixed");
    expect(el.getAttribute("variant")).to.equal("fixed");
  });
  it("dispatches close event", async () => {
    const el = await fixture(emphasized());
    const closeSpy = spy();
    el.addEventListener("close", () => closeSpy());
    expect(closeSpy.callCount).to.equal(0);
    expect(el.open).to.be.true;
    const closeButton = el.shadowRoot.querySelector("sp-close-button");
    closeButton == null ? void 0 : closeButton.click();
    expect(closeSpy.callCount).to.equal(1);
    expect(el.open).to.be.false;
  });
  it("can have close event prevented", async () => {
    const el = await fixture(emphasized());
    const closeSpy = spy();
    el.addEventListener("close", (event) => {
      event.preventDefault();
      closeSpy();
    });
    expect(closeSpy.callCount).to.equal(0);
    expect(el.open).to.be.true;
    const closeButton = el.shadowRoot.querySelector("sp-close-button");
    closeButton == null ? void 0 : closeButton.click();
    expect(closeSpy.callCount).to.equal(1);
    expect(el.open).to.be.true;
  });
});
//# sourceMappingURL=action-bar.test.js.map
