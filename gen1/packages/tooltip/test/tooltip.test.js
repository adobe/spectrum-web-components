"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame,
  oneEvent
} from "@open-wc/testing";
import { resetMouse } from "@web/test-runner-commands";
import { spy, stub } from "sinon";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Tooltip", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
        <sp-tooltip>Help text.</sp-tooltip>
      `)
  );
  it("loads", async () => {
    const el = await fixture(html`
      <sp-tooltip>Help text.</sp-tooltip>
    `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("self manages", async () => {
    await resetMouse();
    const button = await fixture(html`
      <sp-button>
        This is a button.
        <sp-tooltip self-managed placement="top">Help text.</sp-tooltip>
      </sp-button>
    `);
    const el = button.querySelector("sp-tooltip");
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await expect(button).to.be.accessible();
    const opened = oneEvent(button, "sp-opened");
    button.focus();
    await opened;
    expect(el.open).to.be.true;
    await expect(button).to.be.accessible();
    const closed = oneEvent(button, "sp-closed");
    button.blur();
    await closed;
    expect(el.open).to.be.false;
  });
  it("self manages through a shadow boundary", async () => {
    const test = await fixture(html`
      <div></div>
    `);
    test.attachShadow({ mode: "open" });
    if (!test.shadowRoot) {
      return;
    }
    test.shadowRoot.innerHTML = `
            <sp-button>
                This is a button.
                <sp-tooltip self-managed placement="top">
                    Help text.
                </sp-tooltip>
            </sp-button>
        `;
    const button = test.shadowRoot.querySelector("sp-button");
    const el = test.shadowRoot.querySelector("sp-tooltip");
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await nextFrame();
    const opened = oneEvent(button, "sp-opened");
    button.focus();
    await opened;
    expect(el.open).to.be.true;
    await expect(button).to.be.accessible();
    const closed = oneEvent(button, "sp-closed");
    button.blur();
    await closed;
    expect(el.open).to.be.false;
  });
  it("cleans up when self manages", async () => {
    const button = await fixture(html`
      <sp-button>
        This is a button.
        <sp-tooltip self-managed>Help text.</sp-tooltip>
      </sp-button>
    `);
    const el = button.querySelector("sp-tooltip");
    await elementUpdated(el);
    expect(el.open).to.be.false;
    const opened = oneEvent(button, "sp-opened");
    button.focus();
    await opened;
    await elementUpdated(el);
    expect(el.open).to.be.true;
    const closed = oneEvent(button, "sp-closed");
    button.blur();
    await closed;
    expect(el.open).to.be.false;
  });
  it("cleans up when self managed and removed", async () => {
    const button = await fixture(html`
      <sp-button>
        This is a button.
        <sp-tooltip self-managed>Help text.</sp-tooltip>
      </sp-button>
    `);
    const el = button.querySelector("sp-tooltip");
    await elementUpdated(el);
    expect(el.open).to.be.false;
    const opened = oneEvent(button, "sp-opened");
    button.focus();
    await opened;
    expect(el.open).to.be.true;
    const closed = oneEvent(button, "sp-closed");
    button.remove();
    await closed;
    expect(el.open).to.be.false;
  });
  it("accepts variants", async () => {
    const el = await fixture(html`
      <sp-tooltip variant="negative">Help text.</sp-tooltip>
    `);
    await elementUpdated(el);
    expect(el.variant).to.equal("negative");
    expect(el.getAttribute("variant")).to.equal("negative");
    el.variant = "info";
    await elementUpdated(el);
    expect(el.variant).to.equal("info");
    expect(el.getAttribute("variant")).to.equal("info");
    el.setAttribute("variant", "positive");
    await elementUpdated(el);
    expect(el.variant).to.equal("positive");
    expect(el.getAttribute("variant")).to.equal("positive");
    el.removeAttribute("variant");
    await elementUpdated(el);
    expect(el.variant).to.equal("");
    expect(el.hasAttribute("variant")).to.be.false;
  });
  it("validates variants", async () => {
    const el = await fixture(html`
      <sp-tooltip variant="other">Help text.</sp-tooltip>
    `);
    await elementUpdated(el);
    expect(el.variant).to.equal("");
    expect(el.hasAttribute("variant")).to.be.false;
    el.variant = "info";
    await elementUpdated(el);
    expect(el.variant).to.equal("info");
    expect(el.getAttribute("variant")).to.equal("info");
    el.variant = "info";
    await elementUpdated(el);
    expect(el.variant).to.equal("info");
    expect(el.getAttribute("variant")).to.equal("info");
  });
  it("surfaces tip element", async () => {
    const el = await fixture(html`
      <sp-tooltip placement="top">Help text.</sp-tooltip>
    `);
    await elementUpdated(el);
    expect(typeof el.tipElement).to.not.equal("undefined");
  });
  describe("self-managed", () => {
    let documentEventsSpy;
    before(() => {
      documentEventsSpy = spy(document, "addEventListener");
    });
    afterEach(() => {
      documentEventsSpy.resetHistory();
    });
    after(() => {
      documentEventsSpy.restore();
    });
    it("does not attach event listeners if no trigger was found", async function() {
      var _a;
      const el = await fixture(html`
        <sp-tooltip self-managed>Help text.</sp-tooltip>
      `);
      await elementUpdated(el);
      let calls = documentEventsSpy.callCount;
      while (calls) {
        calls -= 1;
        const call = documentEventsSpy.getCall(calls);
        expect(call.args[0]).to.not.equal("pointerenter");
      }
      expect((_a = el.overlayElement) == null ? void 0 : _a.triggerElement).to.be.null;
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
    it("warns when using the deprecated `self-managed` attribute", async () => {
      const el = await fixture(html`
        <sp-tooltip variant="negative" self-managed>Help text.</sp-tooltip>
      `);
      await elementUpdated(el);
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args[0].includes("self-managed"),
        "confirm dev warning message includes `self-managed`"
      ).to.be.true;
      expect(
        spyCall.args[spyCall.args.length - 1],
        "confirm `data` shape"
      ).to.deep.equal({
        data: {
          localName: "sp-tooltip",
          type: "api",
          level: "deprecation"
        }
      });
    });
  });
});
//# sourceMappingURL=tooltip.test.js.map
