"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { spy } from "sinon";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import "@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js";
import "@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js";
describe("Breadcrumb Item", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
            `)
  );
  it("should render accessibly", async () => {
    const el = await fixture(html`
            <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
        `);
    expect(el.getAttribute("role")).to.equal("listitem");
  });
  it("should render a disabled item", async () => {
    const el = await fixture(html`
            <sp-breadcrumb-item value="home" disabled>Home</sp-breadcrumb-item>
        `);
    expect(el.hasAttribute("aria-disabled")).to.be.true;
  });
  it("should manage aria-current", async () => {
    const el = await fixture(html`
            <sp-breadcrumbs>
                <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
                <sp-breadcrumb-item value="products">
                    Products
                </sp-breadcrumb-item>
            </sp-breadcrumbs>
        `);
    await elementUpdated(el);
    const currentItem = el.querySelector(
      "sp-breadcrumb-item:nth-child(2)"
    );
    const otherItem = el.querySelector(
      "sp-breadcrumb-item:nth-child(1)"
    );
    await elementUpdated(currentItem);
    await elementUpdated(otherItem);
    expect(currentItem.focusElement.hasAttribute("aria-current"), "current").to.be.true;
    expect(otherItem.focusElement.hasAttribute("aria-current"), "other").to.be.false;
  });
  it("should not emit change event if element is the last one", async () => {
    const changeSpy = spy();
    const el = await fixture(html`
            <sp-breadcrumb-item
                isLastOfType
                @breadcrumb-select=${(event) => changeSpy(event.detail.value)}
                value="https://adobe.com/home"
            >
                Home
            </sp-breadcrumb-item>
        `);
    await elementUpdated(el);
    el.click();
    expect(changeSpy.callCount).to.equal(0);
  });
  it("should emit change event if href is not provided and element is not the last one", async () => {
    const changeSpy = spy();
    const el = await fixture(html`
            <sp-breadcrumb-item
                @breadcrumb-select=${(event) => changeSpy(event.detail.value)}
                value="home"
            >
                Home
            </sp-breadcrumb-item>
        `);
    await elementUpdated(el);
    el.click();
    expect(changeSpy.callCount).to.equal(1);
    expect(changeSpy).to.have.been.calledWith("home");
  });
});
//# sourceMappingURL=breadcrumb-item.test.js.map
