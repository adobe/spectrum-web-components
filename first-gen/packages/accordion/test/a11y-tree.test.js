"use strict";
import { html } from "@spectrum-web-components/base";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import "@spectrum-web-components/accordion/sp-accordion-item.js";
import { Default } from "../stories/accordion.stories.js";
describe("Accordion - a11y tree", () => {
  it("renders with items accessibly", async () => {
    const el = await fixture(Default());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
});
describe("Accordion Item - a11y tree", () => {
  it("can exist with no parent accessibly", async () => {
    const el = await fixture(html`
            <sp-accordion-item label="item">
                <div>Item 1</div>
            </sp-accordion-item>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
});
//# sourceMappingURL=a11y-tree.test.js.map
