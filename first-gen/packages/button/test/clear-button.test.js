"use strict";
import "@spectrum-web-components/button/sp-clear-button.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers";
import { stub } from "sinon";
describe("Clear Button", () => {
  testForLitDevWarnings(
    async () => fixture(html`
            <sp-clear-button size="m" label="Clear"></sp-clear-button>
        `)
  );
  ["s", "m", "l", "xl"].map((size) => {
    it(`loads - ${size}`, async () => {
      const el = await fixture(html`
                <sp-clear-button size=${size} label="Clear"></sp-clear-button>
            `);
      await expect(el).to.be.accessible();
    });
  });
  it(`loads static-color="white" when variant="overBackground"`, async () => {
    const el = await fixture(html`
            <sp-clear-button
                label="Clear"
                variant="overBackground"
            ></sp-clear-button>
        `);
    await elementUpdated(el);
    expect(el.staticColor).to.equal("white");
    expect(el.hasAttribute("static-color")).to.be.true;
    expect(el.getAttribute("static-color")).to.equal("white");
  });
  describe("dev mode", () => {
    let consoleStub;
    before(() => {
      window.__swc.verbose = true;
      consoleStub = stub(console, "warn");
    });
    after(() => {
      window.__swc.verbose = false;
      consoleStub.restore();
    });
    it("should log dev warning when overBackground variant is used", async () => {
      const el = await fixture(html`
                <sp-clear-button
                    label="Clear"
                    variant="overBackground"
                ></sp-clear-button>
            `);
      await elementUpdated(el);
      const warning = consoleStub.getCall(0).args.at(0);
      const expectedContent = 'The overBackground variant is deprecated. Please use `static-color="white"` instead.';
      expect(consoleStub).to.be.calledOnce;
      expect(warning.includes(expectedContent)).to.be.true;
    });
  });
});
//# sourceMappingURL=clear-button.test.js.map
