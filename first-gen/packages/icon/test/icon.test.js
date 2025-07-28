"use strict";
import Sinon from "sinon";
import { isWebKit } from "@spectrum-web-components/shared";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/icons/sp-icons-medium.js";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  waitUntil
} from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Icon", () => {
  before(async () => {
    const icons = document.createElement("sp-icons-medium");
    document.body.append(icons);
    await elementUpdated(icons);
  });
  it("loads", async () => {
    const el = await fixture(
      html`
                <sp-icon name="ui:Chevron200"></sp-icon>
            `
    );
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    const container = el.shadowRoot ? el.shadowRoot.querySelector("#container") : el.querySelector("#container");
    expect(container).to.exist;
    const icon = container.querySelector("svg");
    expect(icon).to.exist;
    expect(icon.getAttribute("aria-hidden")).to.equal("true");
  });
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-icon
                        label="Image Icon"
                        src="data:image/png;base64,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"
                    ></sp-icon>
                `
    )
  );
  it("loads w/ src", async () => {
    const el = await fixture(
      html`
                <sp-icon
                    label="Image Icon"
                    src="data:image/png;base64,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"
                ></sp-icon>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads w/ invalid src, error dispatching", async () => {
    const error = Sinon.spy();
    const el = await fixture(
      html`
                <sp-icon
                    label="Image Icon"
                    src="invalid-image-src"
                    @error=${error}
                ></sp-icon>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    if (!isWebKit()) {
      await waitUntil(() => error.calledOnce, "The error was thrown.");
    }
  });
  it("loads w/ label", async () => {
    const label = "Chevron";
    const el = await fixture(
      html`
                <sp-icon name="ui:Chevron200" label=${label}></sp-icon>
            `
    );
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    const container = el.shadowRoot ? el.shadowRoot.querySelector("#container") : el.querySelector("#container");
    expect(container).to.exist;
    const icon = container.querySelector("svg");
    expect(icon).to.exist;
    expect(icon.hasAttribute("aria-hidden")).to.be.false;
    expect(icon.getAttribute("aria-label")).to.equal(label);
  });
  it("does not error when name is missing", async () => {
    const el = await fixture(
      html`
                <sp-icon></sp-icon>
            `
    );
    return elementUpdated(el);
  });
  it("does not error with unknown set", async () => {
    const el = await fixture(html`
            <sp-icon name="unknown-icon"></sp-icon>
        `);
    return elementUpdated(el);
  });
  it("does error with unknown icon", async () => {
    const el = document.createElement("sp-icon");
    el.name = "ui:unknown-icon";
    try {
      document.body.appendChild(el);
      await elementUpdated(el);
      expect("failed").to.not.equal("failed");
    } catch (error) {
      expect(() => {
        throw error;
      }).to.throw();
    }
    el.remove();
  });
  it("does not add multiple SVGs when removed and re-added to DOM", async () => {
    const el = await fixture(
      html`
                <sp-icon name="ui:Chevron200"></sp-icon>
            `
    );
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    const parent = el.parentNode;
    parent.removeChild(el);
    parent.appendChild(el);
    await el.updateComplete;
    const count = el.shadowRoot.querySelectorAll("svg").length;
    expect(count).to.equal(1);
  });
});
//# sourceMappingURL=icon.test.js.map
