"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/color-handle/sp-color-handle.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("ColorHandle", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-color-handle></sp-color-handle>
                `
    )
  );
  it("loads default color-handle accessibly", async () => {
    const el = await fixture(
      html`
                <sp-color-handle></sp-color-handle>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads [open] color-handle accessibly", async () => {
    const el = await fixture(
      html`
                <sp-color-handle open></sp-color-handle>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("opens/closes on pointerdown/up/cancel", async () => {
    const el = await fixture(
      html`
                <sp-color-handle></sp-color-handle>
            `
    );
    await elementUpdated(el);
    el.setPointerCapture = () => {
      return;
    };
    el.releasePointerCapture = () => {
      return;
    };
    el.dispatchEvent(
      new PointerEvent("pointerdown", {
        pointerId: 1,
        pointerType: "touch"
      })
    );
    await elementUpdated(el);
    expect(el.open).to.be.true;
    el.dispatchEvent(
      new PointerEvent("pointerup", {
        pointerId: 1,
        pointerType: "touch"
      })
    );
    await elementUpdated(el);
    expect(el.open).to.be.false;
    el.dispatchEvent(
      new PointerEvent("pointerdown", {
        pointerId: 1,
        pointerType: "touch"
      })
    );
    await elementUpdated(el);
    expect(el.open).to.be.true;
    el.dispatchEvent(
      new PointerEvent("pointercancel", {
        pointerId: 1,
        pointerType: "touch"
      })
    );
    await elementUpdated(el);
    expect(el.open).to.be.false;
  });
});
//# sourceMappingURL=color-handle.test.js.map
