"use strict";
import "@spectrum-web-components/link/sp-link.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { spy } from "sinon";
describe("Link", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-link href="test_url">Default Link</sp-link>
            `)
  );
  it("loads", async () => {
    const el = await fixture(html`
            <sp-link href="test_url">Default Link</sp-link>
        `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    expect(el.textContent).to.include("Default Link");
    await expect(el).to.be.accessible();
  });
  it("loads[download]", async () => {
    const el = await fixture(html`
            <sp-link href="test_url" download="somefile.txt">
                Default Link
            </sp-link>
        `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    expect(el.textContent).to.include("Default Link");
    await expect(el).to.be.accessible();
  });
  it("loads[rel]", async () => {
    const el = await fixture(html`
            <sp-link href="test_url" rel="external">Default Link</sp-link>
        `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    expect(el.focusElement.getAttribute("rel")).to.eq("external");
    await expect(el).to.be.accessible();
  });
  it("no click triggers for disabled link", async () => {
    const clickSpy = spy();
    const el = await fixture(html`
            <sp-link href="#" disabled @click=${() => clickSpy()}>
                Disabled Link
            </sp-link>
        `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    expect(el.disabled).to.eq(true);
    await expect(el).to.be.accessible();
    el.click();
    expect(clickSpy.callCount).to.equal(0);
  });
});
//# sourceMappingURL=link.test.js.map
