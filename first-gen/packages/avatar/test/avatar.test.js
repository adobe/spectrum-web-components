"use strict";
import "@spectrum-web-components/avatar/sp-avatar.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers";
describe("Avatar", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-avatar
                        label="Shantanu Narayen"
                        src="https://picsum.photos/500/500"
                    ></sp-avatar>
                `
    )
  );
  it("loads accessibly", async () => {
    const el = await fixture(
      html`
                <sp-avatar
                    label="Shantanu Narayen"
                    src="https://picsum.photos/500/500"
                ></sp-avatar>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads accessibly with [href]", async () => {
    const el = await fixture(
      html`
                <sp-avatar
                    label="Shantanu Narayen"
                    src="https://picsum.photos/500/500"
                    href="https://adobe.com"
                ></sp-avatar>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("validates `size`", async () => {
    const el = await fixture(
      html`
                <sp-avatar
                    label="Shantanu Narayen"
                    src="https://picsum.photos/500/500"
                ></sp-avatar>
            `
    );
    await elementUpdated(el);
    expect(el.size).to.equal(100);
    el.setAttribute("size", "55");
    await elementUpdated(el);
    expect(el.size).to.equal(100);
    el.setAttribute("size", "600");
    await elementUpdated(el);
    expect(el.size).to.equal(600);
  });
  it("loads with everything set", async () => {
    const el = await fixture(
      html`
                <sp-avatar
                    label="Shantanu Narayen"
                    src="https://picsum.photos/500/500"
                ></sp-avatar>
            `
    );
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    const imageEl = el.shadowRoot ? el.shadowRoot.querySelector("img") : el.querySelector("img");
    expect(imageEl.hasAttribute("alt")).to.be.true;
    expect(imageEl.getAttribute("alt")).to.equal("Shantanu Narayen");
  });
  it("loads with no label", async () => {
    const el = await fixture(
      html`
                <sp-avatar src="https://picsum.photos/500/500"></sp-avatar>
            `
    );
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    const imageEl = el.shadowRoot ? el.shadowRoot.querySelector("img") : el.querySelector("img");
    expect(imageEl.hasAttribute("alt")).to.be.false;
  });
  it("can receive a `tabindex` without an `href`", async () => {
    try {
      const el = await fixture(
        html`
                    <sp-avatar
                        label="Shantanu Narayen"
                        src="https://picsum.photos/500/500"
                        tabindex="0"
                    ></sp-avatar>
                `
      );
      await elementUpdated(el);
      const focusEl = el.focusElement;
      expect(focusEl).to.exist;
    } catch (error) {
      expect(() => {
        throw error;
      }).to.throw("There should be no error.");
    }
  });
});
//# sourceMappingURL=avatar.test.js.map
