"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/underlay/sp-underlay.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { spy } from "sinon";
describe("Underlay", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-underlay></sp-underlay>
            `)
  );
  it("loads default underlay accessibly", async () => {
    const el = await fixture(html`
            <sp-underlay></sp-underlay>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("fires a close event when clicked", async () => {
    const el = await fixture(html`
            <sp-underlay></sp-underlay>
        `);
    await elementUpdated(el);
    const closeSpy = spy();
    el.addEventListener("close", () => closeSpy());
    expect(closeSpy.callCount).to.equal(0);
    el.dispatchEvent(new PointerEvent("pointerdown", { button: 0 }));
    el.dispatchEvent(new PointerEvent("pointerup"));
    expect(closeSpy.callCount).to.equal(1);
  });
});
//# sourceMappingURL=underlay.test.js.map
