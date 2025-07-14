"use strict";
import { html } from "@spectrum-web-components/base";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { spy } from "sinon";
import "@spectrum-web-components/accordion/sp-accordion.js";
import "@spectrum-web-components/accordion/sp-accordion-item.js";
describe("Accordion - declarative", () => {
  it("does not accept focus when empty", async () => {
    const el = await fixture(html`
            <sp-accordion></sp-accordion>
        `);
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
    el.focus();
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
  });
  it("does not accept focus when all children [disabled]", async () => {
    const el = await fixture(html`
            <sp-accordion>
                <sp-accordion-item disabled label="Heading 1">
                    <div>Item 1</div>
                </sp-accordion-item>
                <sp-accordion-item disabled label="Heading 2">
                    <div>Item 2</div>
                </sp-accordion-item>
            </sp-accordion>
        `);
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
    el.focus();
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
  });
});
describe("Accordion Item - declarative", () => {
  it("can be `[disabled]`", async () => {
    const toggleSpy = spy();
    const handleToggle = () => toggleSpy();
    const el = await fixture(html`
            <sp-accordion-item
                disabled
                @sp-accordion-item-toggle=${handleToggle}
            >
                <div>Item 1</div>
            </sp-accordion-item>
        `);
    const root = el.shadowRoot;
    const button = root.querySelector("#header");
    await elementUpdated(el);
    expect(toggleSpy.callCount).to.equal(0);
    button.click();
    await elementUpdated(el);
    expect(toggleSpy.callCount).to.equal(0);
    el.disabled = false;
    await elementUpdated(el);
    button.click();
    await elementUpdated(el);
    expect(toggleSpy.callCount).to.equal(1);
  });
});
//# sourceMappingURL=declarative.test.js.map
