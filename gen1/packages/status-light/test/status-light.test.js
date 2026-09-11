"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { spy } from "sinon";
import "@spectrum-web-components/status-light/sp-status-light.js";
describe("Status Light", () => {
  it("loads correctly", async () => {
    const el = await fixture(html`
      <sp-status-light variant="positive"></sp-status-light>
    `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    const rootEl = el.shadowRoot ? el.shadowRoot.querySelector("#root") : el.querySelector("#root");
    expect(rootEl).to.not.be.undefined;
  });
  it("[disabled] manages [aria-disabled]", async () => {
    const el = await fixture(html`
      <sp-status-light variant="positive"></sp-status-light>
    `);
    await elementUpdated(el);
    expect(el.hasAttribute("aria-disabled")).to.be.false;
    el.disabled = true;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-disabled")).to.be.true;
    expect(el.getAttribute("aria-disabled")).to.equal("true");
  });
  describe("dev mode warnings", () => {
    let warningMessage;
    beforeEach(() => {
      window.__swc = window.__swc || { warn: () => {
      } };
      warningMessage = window.__swc.warn;
      window.__swc.issuedWarnings = /* @__PURE__ */ new Set();
      window.__swc.DEBUG = true;
    });
    afterEach(() => {
      window.__swc.warn = warningMessage;
    });
    it("warns when unsupported variant is used (brown)", async () => {
      const warnSpy = spy();
      window.__swc.warn = warnSpy;
      const el = await fixture(html`
        <sp-status-light variant="brown"></sp-status-light>
      `);
      await elementUpdated(el);
      expect(warnSpy.called).to.be.true;
      expect(warnSpy.firstCall.args[0]).to.equal(el);
      expect(warnSpy.firstCall.args[1]).to.equal(
        `<${el.localName}> element expects the "variant" attribute to be one of the following:`
      );
    });
  });
});
//# sourceMappingURL=status-light.test.js.map
