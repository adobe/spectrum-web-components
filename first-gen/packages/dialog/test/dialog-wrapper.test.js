"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  oneEvent,
  waitUntil
} from "@open-wc/testing";
import { spy, stub } from "sinon";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/dialog/sp-dialog-wrapper.js";
import {
  lazyHero,
  longContent,
  wrapperButtons,
  wrapperButtonsUnderlay,
  wrapperDismissable,
  wrapperDismissableUnderlayError,
  wrapperFullscreen,
  wrapperHeadlineVisibilityNone,
  wrapperLabeledHero,
  wrapperWithHeadline,
  wrapperWithHeadlineNoDivider
} from "../stories/dialog-wrapper.stories.js";
import { html } from "@spectrum-web-components/base";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { sendMouse } from "../../../test/plugins/browser.js";
import { nextFrame } from "@spectrum-web-components/overlay/src/AbstractOverlay.js";
async function styledFixture(story) {
  const test = await fixture(html`
        <sp-theme system="spectrum" scale="medium" color="dark">
            ${story}
        </sp-theme>
    `);
  return test.children[0];
}
describe("Dialog Wrapper", () => {
  testForLitDevWarnings(
    async () => await styledFixture(wrapperDismissable())
  );
  it("loads wrapped dialog accessibly", async () => {
    const el = await styledFixture(wrapperDismissable());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads labeled hero dialog accessibly", async () => {
    const el = await styledFixture(wrapperLabeledHero());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads fullscreen wrapped dialog accessibly", async () => {
    const el = await styledFixture(wrapperFullscreen());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  xit("loads with underlay and no headline accessibly", async () => {
    const el = await styledFixture(wrapperButtonsUnderlay());
    await elementUpdated(el);
    el.headline = "";
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("opens and closes", async () => {
    const closeSpy = spy();
    const openedSpy = spy();
    const test = await styledFixture(html`
            <div @sp-opened=${() => openedSpy()}>${longContent()}</div>
        `);
    const overlayTrigger = test.querySelector(
      "overlay-trigger"
    );
    const el = test.querySelector("sp-dialog-wrapper");
    el.addEventListener("close", () => closeSpy());
    await waitUntil(
      () => openedSpy.calledOnce,
      "click content projected to overlay",
      { timeout: 2e3 }
    );
    expect(el.open).to.be.true;
    const closed = oneEvent(overlayTrigger, "sp-closed");
    overlayTrigger.open = void 0;
    await closed;
    expect(el.open).to.be.false;
    expect(closeSpy.callCount).to.equal(1);
  });
  it("opens and closes when element is recycled", async () => {
    const closeSpy = spy();
    const openedSpy = spy();
    const test = await styledFixture(html`
            <div @sp-opened=${() => openedSpy()}>${longContent()}</div>
        `);
    const overlayTrigger = test.querySelector(
      "overlay-trigger"
    );
    const el = test.querySelector("sp-dialog-wrapper");
    el.addEventListener("close", () => closeSpy());
    await waitUntil(
      () => openedSpy.calledOnce,
      "click content projected to overlay",
      { timeout: 2e3 }
    );
    expect(el.open).to.be.true;
    const closed = oneEvent(overlayTrigger, "sp-closed");
    overlayTrigger.open = void 0;
    await closed;
    expect(el.open).to.be.false;
    expect(closeSpy.callCount).to.equal(1);
  });
  it("shows header divider when there's a header", async () => {
    const wrapper = await styledFixture(
      wrapperWithHeadline()
    );
    await elementUpdated(wrapper);
    const dialog = wrapper.shadowRoot.querySelector("sp-dialog");
    const divider = dialog.shadowRoot.querySelector(
      "sp-divider.divider"
    );
    expect(divider).to.be.not.null;
  });
  it(`hides header divider when there's a header but "no-divider"`, async () => {
    const wrapper = await styledFixture(
      wrapperWithHeadlineNoDivider()
    );
    await elementUpdated(wrapper);
    await expect(wrapper).to.be.accessible();
    const dialog = wrapper.shadowRoot.querySelector("sp-dialog");
    const divider = dialog.shadowRoot.querySelector(
      "sp-divider.divider"
    );
    expect(divider).to.be.null;
  });
  it("hides header divider when there's no header", async () => {
    const wrapper = await styledFixture(
      wrapperHeadlineVisibilityNone()
    );
    await elementUpdated(wrapper);
    await expect(wrapper).to.be.accessible();
    const dialog = wrapper.shadowRoot.querySelector("sp-dialog");
    const divider = dialog.shadowRoot.querySelector(
      "sp-divider.divider"
    );
    expect(divider).to.be.null;
  });
  it("dismisses via clicking the underlay when [dismissable]", async () => {
    const test = await styledFixture(
      wrapperDismissableUnderlayError()
    );
    const el = test.querySelector("sp-dialog-wrapper");
    await elementUpdated(el);
    expect(el.open).to.be.true;
    el.dismissable = true;
    const underlay = el.shadowRoot.querySelector("sp-underlay");
    underlay.click();
    await elementUpdated(el);
    expect(el.open).to.be.false;
  });
  it("does not dismiss via clicking the underlay :not([dismissable])", async () => {
    const el = await styledFixture(wrapperButtonsUnderlay());
    await elementUpdated(el);
    expect(el.open).to.be.true;
    const underlay = el.shadowRoot.querySelector("sp-underlay");
    underlay.click();
    await elementUpdated(el);
    expect(el.open).to.be.true;
  });
  it("dismisses", async () => {
    const el = await styledFixture(wrapperDismissable());
    await elementUpdated(el);
    expect(el.open).to.be.true;
    const root = el.shadowRoot ? el.shadowRoot : el;
    const dialog = root.querySelector("sp-dialog");
    const dialogRoot = dialog.shadowRoot ? dialog.shadowRoot : dialog;
    const dismissButton = dialogRoot.querySelector(
      ".close-button"
    );
    expect(dismissButton.ariaLabel).to.be.equals("Close");
    dismissButton.click();
    await elementUpdated(el);
    expect(el.open).to.be.false;
  });
  it("manages entry focus - buttons", async () => {
    var _a;
    const el = await styledFixture(wrapperButtons());
    await elementUpdated(el);
    expect(el.open).to.be.true;
    expect(document.activeElement !== el, "no focused").to.be.true;
    const button = el.shadowRoot.querySelector("sp-button");
    el.focus();
    await elementUpdated(el);
    expect(
      document.activeElement === el,
      `focused generally, ${document.activeElement}`
    ).to.be.true;
    expect(
      button.getRootNode().activeElement === button,
      `focused specifically, ${(_a = button.getRootNode().activeElement) == null ? void 0 : _a.outerHTML}`
    ).to.be.true;
  });
  it("dispatches `confirm`, `cancel` and `secondary`", async () => {
    const confirmSpy = spy();
    const cancelSpy = spy();
    const secondarySpy = spy();
    const handleConfirm = () => confirmSpy();
    const handleCancel = () => cancelSpy();
    const handleSecondary = () => secondarySpy();
    const el = await styledFixture(wrapperButtons());
    el.addEventListener("confirm", handleConfirm);
    el.addEventListener("cancel", handleCancel);
    el.addEventListener("secondary", handleSecondary);
    await elementUpdated(el);
    expect(confirmSpy.called).to.be.false;
    expect(cancelSpy.called).to.be.false;
    expect(secondarySpy.called).to.be.false;
    const accentButton = el.shadowRoot.querySelector(
      '[variant="accent"]'
    );
    const primaryButton = el.shadowRoot.querySelector(
      '[variant="primary"]'
    );
    const secondaryButton = el.shadowRoot.querySelector(
      '[variant="secondary"]'
    );
    accentButton.click();
    await elementUpdated(el);
    expect(confirmSpy.called, "dispatched `confirm`").to.be.true;
    expect(secondarySpy.called).to.be.false;
    expect(cancelSpy.called).to.be.false;
    primaryButton.click();
    await elementUpdated(el);
    expect(confirmSpy.callCount).to.equal(1);
    expect(secondarySpy.called, "dispatched `cancel`").to.be.true;
    expect(cancelSpy.called).to.be.false;
    secondaryButton.click();
    await elementUpdated(el);
    expect(confirmSpy.callCount).to.equal(1);
    expect(secondarySpy.callCount).to.equal(1);
    expect(cancelSpy.called, "dispatched `secondary`").to.be.true;
  });
  describe("dev mode", () => {
    let consoleWarnStub;
    before(() => {
      consoleWarnStub = stub(console, "warn");
    });
    afterEach(() => {
      consoleWarnStub.resetHistory();
    });
    after(() => {
      consoleWarnStub.restore();
    });
    it("warns in Dev Mode when accessible attributes are not leveraged", async () => {
      const el = await fixture(html`
                <sp-dialog-wrapper></sp-dialog-wrapper>
            `);
      await elementUpdated(el);
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args.at(0).includes("accessible"),
        "confirm accessibility-centric message"
      ).to.be.true;
      expect(spyCall.args.at(-1), "confirm `data` shape").to.deep.equal({
        data: {
          localName: "sp-dialog-wrapper",
          type: "accessibility",
          level: "default"
        }
      });
    });
  });
  it("manages content element tabindex on resize observer time", async () => {
    const imgReadyPromise = new Promise((res) => {
      const img = document.createElement("img");
      img.onload = res;
      img.src = lazyHero.args.src;
    });
    const test = await styledFixture(lazyHero(lazyHero.args));
    const dialog = document.querySelector(
      "sp-dialog-wrapper"
    );
    const button = document.querySelector("sp-button");
    const rect = button.getBoundingClientRect();
    const contentElement = dialog.dialog.contentElement;
    expect(contentElement.hasAttribute("tabindex")).to.be.false;
    await elementUpdated(dialog);
    const opened = oneEvent(test, "sp-opened");
    await sendMouse({
      steps: [
        {
          position: [
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          ],
          type: "click"
        }
      ]
    });
    await opened;
    await elementUpdated(dialog);
    await imgReadyPromise;
    await nextFrame();
    await nextFrame();
    expect(contentElement.hasAttribute("tabindex")).to.be.true;
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
});
//# sourceMappingURL=dialog-wrapper.test.js.map
