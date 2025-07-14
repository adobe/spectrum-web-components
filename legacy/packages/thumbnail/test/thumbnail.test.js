"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/thumbnail/sp-thumbnail.js";
import { thumbnail } from "../stories/images.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { stub } from "sinon";
describe("Thumbnail", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-thumbnail>
                    <img src=${thumbnail} alt="Woman crouching" />
                </sp-thumbnail>
            `)
  );
  it("loads default thumbnail accessibly", async () => {
    const el = await fixture(html`
            <sp-thumbnail>
                <img src=${thumbnail} alt="Woman crouching" />
            </sp-thumbnail>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("can be size `50`", async () => {
    const el = await fixture(html`
            <sp-thumbnail size="50">
                <img src=${thumbnail} alt="Woman crouching" />
            </sp-thumbnail>
        `);
    await elementUpdated(el);
    expect(el.size).to.equal("50");
  });
  it("accepts `background`", async () => {
    const el = await fixture(html`
            <sp-thumbnail background="blue">
                <img src=${thumbnail} alt="Woman crouching" />
            </sp-thumbnail>
        `);
    const background = el.shadowRoot.querySelector(".background");
    expect(background).to.not.be.null;
  });
  it("renders the opacity checkerboard and slot", async () => {
    const el = await fixture(html`
            <sp-thumbnail>
                <img src=${thumbnail} alt="Woman crouching" />
            </sp-thumbnail>
        `);
    await elementUpdated(el);
    el.setAttribute("layer", "true");
    await elementUpdated(el);
    const checkerboard = el.shadowRoot.querySelector(
      ".opacity-checkerboard.layer-inner"
    );
    expect(checkerboard).to.not.be.null;
    const slot = checkerboard == null ? void 0 : checkerboard.querySelector("slot");
    expect(slot).to.not.be.null;
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
  });
});
//# sourceMappingURL=thumbnail.test.js.map
