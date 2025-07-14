"use strict";
import "@spectrum-web-components/theme/sp-theme.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { stub } from "sinon";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Theme", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-theme></sp-theme>
            `)
  );
  describe("Dev Mode", () => {
    let consoleWarnStub;
    before(() => {
      window.__swc.verbose = true;
      consoleWarnStub = stub(console, "warn");
    });
    afterEach(() => {
      consoleWarnStub.resetHistory();
    });
    after(() => {
      window.__swc.verbose = false;
      consoleWarnStub.restore();
    });
    it("warns in Dev Mode when no attributes or fragments", async () => {
      const el = await fixture(html`
                <sp-theme></sp-theme>
            `);
      await elementUpdated(el);
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args.at(0).includes("theme delivery"),
        'confirm "theme delivery"-centric message'
      ).to.be.true;
      expect(spyCall.args.at(-1), "confirm `data` shape").to.deep.equal({
        data: {
          localName: "sp-theme",
          type: "api",
          level: "default"
        }
      });
    });
  });
});
//# sourceMappingURL=theme-devmode.test.js.map
