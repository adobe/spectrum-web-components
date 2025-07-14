"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/badge/sp-badge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js";
import { stub } from "sinon";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Badge", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-badge>
                    <sp-icon-checkmark-circle
                        slot="icon"
                    ></sp-icon-checkmark-circle>
                    Icon and label
                </sp-badge>
            `)
  );
  it("manages `fixed` attribute", async () => {
    const el = await fixture(html`
            <sp-badge>Label only</sp-badge>
        `);
    expect(el.fixed).to.be.undefined;
    const textFixedValue = "inline-start";
    el.fixed = textFixedValue;
    await elementUpdated(el);
    expect(el.fixed).to.equal(textFixedValue);
    el.fixed = textFixedValue;
    await elementUpdated(el);
    expect(el.fixed).to.equal(textFixedValue);
    el.fixed = void 0;
    await elementUpdated(el);
    expect(el.hasAttribute("fixed")).to.be.false;
  });
  describe("dev mode", () => {
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
    it("loads default badge accessibly", async () => {
      const el = await fixture(html`
                <sp-badge>
                    <sp-icon-checkmark-circle
                        slot="icon"
                    ></sp-icon-checkmark-circle>
                    Icon and label
                </sp-badge>
            `);
      await elementUpdated(el);
      await expect(el).to.be.accessible();
      expect(consoleWarnStub.called).to.be.false;
    });
    it("warns in Dev Mode when sent an incorrect `variant`", async () => {
      const el = await fixture(html`
                <sp-badge variant="other">
                    <sp-icon-checkmark-circle
                        slot="icon"
                    ></sp-icon-checkmark-circle>
                    Icon and label
                </sp-badge>
            `);
      await elementUpdated(el);
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args.at(0).includes('"variant"'),
        "confirm variant-centric message"
      ).to.be.true;
      expect(spyCall.args.at(-1), "confirm `data` shape").to.deep.equal({
        data: {
          localName: "sp-badge",
          type: "api",
          level: "default"
        }
      });
    });
  });
});
//# sourceMappingURL=badge.test.js.map
