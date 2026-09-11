"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/divider/sp-divider.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Divider", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
        <sp-divider></sp-divider>
      `)
  );
  it("loads default divider accessibly", async () => {
    const el = await fixture(html`
      <sp-divider></sp-divider>
    `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads [vertical] divider accessibly", async () => {
    const el = await fixture(html`
      <sp-divider vertical></sp-divider>
    `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("manages a `static-color` attribute", async () => {
    const el = await fixture(html`
      <sp-divider static-color="black"></sp-divider>
    `);
    await elementUpdated(el);
    expect(el.staticColor).to.equal("black");
    expect(el.getAttribute("static-color")).to.equal("black");
    el.removeAttribute("static-color");
    await elementUpdated(el);
    expect(el.staticColor).to.be.null;
    expect(el.hasAttribute("static-color")).to.be.false;
  });
});
//# sourceMappingURL=divider.test.js.map
