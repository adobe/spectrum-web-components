"use strict";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/dialog/sp-dialog.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
describe("popover", () => {
  let popover;
  beforeEach(async () => {
    popover = await fixture(html`
            <sp-popover placement="top" open>
                <sp-dialog>
                    <h3 slot="heading">Popover title</h3>
                    Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly
                    caramels. Icing soufflé chupa chups donut cheesecake.
                    Jelly-o chocolate cake sweet roll cake danish candy biscuit
                    halvah
                </sp-dialog>
            </sp-popover>
        `);
    await elementUpdated(popover);
  });
  it("loads", async () => {
    var _a;
    expect(popover).to.not.equal(void 0);
    expect((_a = popover.textContent) == null ? void 0 : _a.trim()).to.include("Popover title");
    await expect(popover).to.be.accessible();
  });
  it("tip exists only when tip attribute is true", async () => {
    if (!popover.shadowRoot) throw new Error("No shadowRoot");
    expect(popover.getAttribute("tip")).to.equal(null);
    let tip = popover.shadowRoot.querySelector("tip");
    expect(tip).to.equal(null);
    popover.setAttribute("tip", "true");
    tip = popover.shadowRoot.querySelector("tip");
    expect(tip).to.not.equal(void 0);
  });
  it("surfaces tip element", async () => {
    const el = await fixture(html`
            <sp-popover placement="top" tip open>
                <div id="title">Popover Title</div>
                <div id="content">
                    Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly
                    caramels. Icing soufflé chupa chups donut cheesecake.
                    Jelly-o chocolate cake sweet roll cake danish candy biscuit
                    halvah
                </div>
            </sp-popover>
        `);
    await elementUpdated(el);
    expect(typeof el.tipElement).to.not.equal("undefined");
  });
});
//# sourceMappingURL=popover.test.js.map
