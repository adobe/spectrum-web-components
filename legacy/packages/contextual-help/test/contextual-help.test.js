"use strict";
import { elementUpdated, expect, fixture, oneEvent } from "@open-wc/testing";
import { nextFrame } from "@spectrum-web-components/overlay/src/AbstractOverlay.js";
import { sendKeys } from "@web/test-runner-commands";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { ContextualHelpMarkup } from "../stories";
import { render } from "lit";
describe("ContextualHelp", () => {
  testForLitDevWarnings(
    async () => await fixture(ContextualHelpMarkup())
  );
  it("loads default contextual-help accessibly", async () => {
    var _a, _b;
    const el = await fixture(ContextualHelpMarkup());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    const button = (_b = (_a = document.querySelector("sp-contextual-help")) == null ? void 0 : _a.shadowRoot) == null ? void 0 : _b.querySelector("sp-action-button");
    expect(button).to.have.attribute("aria-label", "Informations");
    el.variant = "help";
    await elementUpdated(el);
    expect(button).to.have.attribute("aria-label", "Help");
  });
  it("is a popover on web", async () => {
    var _a, _b, _c, _d, _e;
    const el = await fixture(ContextualHelpMarkup());
    await elementUpdated(el);
    const trigger = (_a = el.shadowRoot) == null ? void 0 : _a.querySelector("#trigger");
    let popover = (_b = el.shadowRoot) == null ? void 0 : _b.querySelector("sp-popover");
    expect(popover).not.to.exist;
    const opened = oneEvent(el, "sp-opened");
    trigger.click();
    await opened;
    popover = (_c = el.shadowRoot) == null ? void 0 : _c.querySelector("sp-popover");
    expect(popover).to.exist;
    const headingSlot = popover == null ? void 0 : popover.querySelector(
      'slot[name="heading"]'
    );
    const heading = headingSlot.assignedElements()[0].textContent;
    expect(heading).to.equal("Permission required");
    const closed = oneEvent(el, "sp-closed");
    await sendKeys({
      press: "Escape"
    });
    await closed;
    await nextFrame();
    await nextFrame();
    popover = (_d = el.shadowRoot) == null ? void 0 : _d.querySelector("sp-popover");
    expect((_e = el.shadowRoot) == null ? void 0 : _e.querySelector("sp-popover")).not.to.exist;
  });
  it("returns the label if set", async () => {
    const el = await fixture(ContextualHelpMarkup());
    el.label = "Custom Label";
    expect(el.buttonAriaLabel).to.equal("Custom Label");
  });
  it('returns "Help" if variant is "help" and label is not set', async () => {
    const el = await fixture(ContextualHelpMarkup());
    el.variant = "help";
    expect(el.buttonAriaLabel).to.equal("Help");
  });
  it('returns "Informations" if variant is not "help" and label is not set', async () => {
    const el = await fixture(ContextualHelpMarkup());
    expect(el.buttonAriaLabel).to.equal("Informations");
  });
  it("renders correctly when actualPlacement is undefined", async () => {
    var _a, _b;
    const el = await fixture(ContextualHelpMarkup());
    el.isMobile.matches = true;
    await elementUpdated(el);
    const trigger = (_a = el.shadowRoot) == null ? void 0 : _a.querySelector("#trigger");
    expect(trigger).to.exist;
    expect(trigger).to.have.attribute("aria-label", "Informations");
    const overlay = (_b = el.shadowRoot) == null ? void 0 : _b.querySelector(
      "sp-overlay"
    );
    expect(overlay).to.exist;
    expect(overlay).to.have.attribute("trigger", "trigger@click");
    expect(overlay).to.have.attribute("receives-focus", "true");
    expect(overlay).to.have.property("offset", el.offset);
    expect(overlay).to.have.property("open", el.open);
  });
  it("renders dialog content when isMobile.matches is true", async () => {
    const el = await fixture(ContextualHelpMarkup());
    el.isMobile.matches = true;
    await elementUpdated(el);
    const template = el["renderOverlayContent"]();
    const container = document.createElement("div");
    render(template, container);
    const dialogBase = container.querySelector("sp-dialog-base");
    const dialog = container.querySelector("sp-dialog");
    const headingSlot = container.querySelector('slot[name="heading"]');
    const linkSlot = container.querySelector('slot[name="link"]');
    expect(dialogBase).to.exist;
    expect(dialog).to.exist;
    expect(dialog).to.have.attribute("dismissable");
    expect(dialog).to.have.attribute("size", "s");
    expect(headingSlot).to.exist;
    expect(linkSlot).to.exist;
  });
});
//# sourceMappingURL=contextual-help.test.js.map
