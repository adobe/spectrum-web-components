"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { stub } from "sinon";
import "@spectrum-web-components/progress-circle/sp-progress-circle.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("ProgressCircle", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
        <sp-progress-circle label="Loading"></sp-progress-circle>
      `)
  );
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
    it("warns in Dev Mode when accessible attributes are not leveraged", async () => {
      const el = await fixture(html`
        <sp-progress-circle progress="50"></sp-progress-circle>
      `);
      await elementUpdated(el);
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args[0].includes("accessible"),
        "confirm accessibility-centric message"
      ).to.be.true;
      expect(
        spyCall.args[spyCall.args.length - 1],
        "confirm `data` shape"
      ).to.deep.equal({
        data: {
          localName: "sp-progress-circle",
          type: "accessibility",
          level: "default"
        }
      });
    });
  });
  it("loads", async () => {
    const el = await fixture(html`
      <sp-progress-circle label="Loading"></sp-progress-circle>
    `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    await expect(el).to.be.accessible();
  });
  it("loads - [indeterminate]", async () => {
    const el = await fixture(html`
      <sp-progress-circle indeterminate label="Loading"></sp-progress-circle>
    `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    await expect(el).to.be.accessible();
  });
  it("accepts label from `slot`", async () => {
    const el = await fixture(html`
      <sp-progress-circle role="progressbar">
        Label From Slot
      </sp-progress-circle>
    `);
    await elementUpdated(el);
    expect(el.getAttribute("aria-label")).to.equal("Label From Slot");
  });
  it("accepts user `role`", async () => {
    const el = await fixture(html`
      <sp-progress-circle
        role="progressbar"
        label="With user role"
      ></sp-progress-circle>
    `);
    await elementUpdated(el);
    expect(el.getAttribute("role")).to.equal("progressbar");
  });
  it("returns to indeterminate", async () => {
    const el = await fixture(html`
      <sp-progress-circle
        progress="50"
        label="Will be indeterminate"
      ></sp-progress-circle>
    `);
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.true;
    expect(el.getAttribute("aria-valuenow")).to.equal("50");
    expect(el.hasAttribute("aria-valuetext")).to.be.true;
    expect(el.getAttribute("aria-valuetext")).to.equal("50%");
    expect(el.hasAttribute("aria-valuemin")).to.be.true;
    expect(el.getAttribute("aria-valuemin")).to.equal("0");
    expect(el.hasAttribute("aria-valuemax")).to.be.true;
    expect(el.getAttribute("aria-valuemax")).to.equal("100");
    el.indeterminate = true;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.false;
    expect(el.hasAttribute("aria-valuetext")).to.be.false;
    expect(el.hasAttribute("aria-valuemin")).to.be.false;
    expect(el.hasAttribute("aria-valuemax")).to.be.false;
  });
  it("accepts a changing progress", async () => {
    const el = await fixture(html`
      <sp-progress-circle label="Changing value"></sp-progress-circle>
    `);
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.true;
    expect(el.getAttribute("aria-valuenow")).to.equal("0");
    expect(el.hasAttribute("aria-valuetext")).to.be.true;
    expect(el.getAttribute("aria-valuetext")).to.equal("0%");
    el.progress = 50;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.true;
    expect(el.getAttribute("aria-valuenow")).to.equal("50");
    expect(el.hasAttribute("aria-valuetext")).to.be.true;
    expect(el.getAttribute("aria-valuetext")).to.equal("50%");
    el.progress = 100;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.true;
    expect(el.getAttribute("aria-valuenow")).to.equal("100");
    expect(el.hasAttribute("aria-valuetext")).to.be.true;
    expect(el.getAttribute("aria-valuetext")).to.equal("100%");
  });
  it("accepts `aria-label`", async () => {
    const el = await fixture(html`
      <sp-progress-circle aria-label="Loading"></sp-progress-circle>
    `);
    await elementUpdated(el);
    expect(el.hasAttribute("aria-label")).to.be.true;
    expect(el.getAttribute("aria-label")).to.equal("Loading");
  });
  it("sets `aria-label` to equal `label` if `label` is set", async () => {
    const el = await fixture(html`
      <sp-progress-circle label="Loading"></sp-progress-circle>
    `);
    await elementUpdated(el);
    expect(el.hasAttribute("aria-label")).to.be.true;
    expect(el.getAttribute("aria-label")).to.equal("Loading");
  });
  it("does not remove `aria-label` if set independently of `label`", async () => {
    const el = await fixture(html`
      <sp-progress-circle label="" aria-label="Loading"></sp-progress-circle>
    `);
    await elementUpdated(el);
    expect(el.hasAttribute("aria-label")).to.be.true;
    expect(el.getAttribute("aria-label")).to.equal("Loading");
  });
});
//# sourceMappingURL=progress-circle.test.js.map
