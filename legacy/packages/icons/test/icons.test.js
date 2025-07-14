"use strict";
import "@spectrum-web-components/icons/sp-icons-large.js";
import "@spectrum-web-components/icons/sp-icons-medium.js";
import IconsetSVG from "../src/icons-large.svg.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { stub } from "sinon";
describe("icons", () => {
  it("large", async () => {
    const el = await fixture(html`
            <sp-icons-large></sp-icons-large>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    expect(el.getIconList().length).to.be.above(0);
  });
  it("medium", async () => {
    const el = await fixture(html`
            <sp-icons-medium></sp-icons-medium>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    expect(el.getIconList().length).to.be.above(0);
  });
  it("listens to slotchange events", async () => {
    const el = await fixture(html`
            <sp-icons-medium>${IconsetSVG}</sp-icons-medium>
        `);
    await elementUpdated(el);
    expect(el).to.not.equal(void 0);
    expect(el.getIconList().length).to.equal(48);
  });
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
  it("warns in devMode for deprecated usage - medium", async () => {
    const el = await fixture(html`
            <sp-icons-medium>${IconsetSVG}</sp-icons-medium>
        `);
    await elementUpdated(el);
    expect(consoleWarnStub.called).to.be.true;
    const spyCall = consoleWarnStub.getCall(0);
    expect(
      spyCall.args.at(0).includes("deprecated"),
      "confirm deprecated variant warning"
    ).to.be.true;
    expect(spyCall.args.at(-1), "confirm `data` shape").to.deep.equal({
      data: {
        localName: "sp-icons-medium",
        type: "api",
        level: "deprecation"
      }
    });
  });
  it("warns in devMode for deprecated usage - large", async () => {
    const el = await fixture(html`
            <sp-icons-large>${IconsetSVG}</sp-icons-large>
        `);
    await elementUpdated(el);
    expect(consoleWarnStub.called).to.be.true;
    const spyCall = consoleWarnStub.getCall(0);
    expect(
      spyCall.args.at(0).includes("deprecated"),
      "confirm deprecated variant warning"
    ).to.be.true;
    expect(spyCall.args.at(-1), "confirm `data` shape").to.deep.equal({
      data: {
        localName: "sp-icons-large",
        type: "api",
        level: "deprecation"
      }
    });
  });
});
//# sourceMappingURL=icons.test.js.map
