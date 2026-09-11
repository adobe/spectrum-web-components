"use strict";
import { render } from "lit";
import { elementUpdated, expect, fixture, oneEvent } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { nextFrame } from "@spectrum-web-components/overlay/src/AbstractOverlay.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { DEFAULT_ARIA_LABELS } from "../src/ContextualHelp.js";
import { ContextualHelpMarkup } from "../stories/index.js";
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
    expect(button).to.have.attribute("aria-label", DEFAULT_ARIA_LABELS.info);
    el.variant = "help";
    await elementUpdated(el);
    expect(button).to.have.attribute("aria-label", DEFAULT_ARIA_LABELS.help);
  });
  it("has proper ARIA attributes for accessibility (desktop disclosure)", async () => {
    var _a, _b;
    const el = await fixture(ContextualHelpMarkup());
    await elementUpdated(el);
    const button = (_a = el.shadowRoot) == null ? void 0 : _a.querySelector(
      "sp-action-button"
    );
    expect(button).to.exist;
    expect(button).not.to.have.attribute("aria-haspopup");
    expect(button).to.have.attribute("aria-expanded", "false");
    const ariaControls = button.getAttribute("aria-controls");
    expect(ariaControls).to.exist;
    expect(ariaControls).to.match(/^contextual-help-popover-/);
    const opened = oneEvent(el, "sp-opened");
    button.click();
    await opened;
    await elementUpdated(el);
    expect(button).to.have.attribute("aria-expanded", "true");
    const popover = (_b = el.shadowRoot) == null ? void 0 : _b.querySelector("sp-popover");
    expect(popover).to.exist;
    if (ariaControls) {
      expect(popover).to.have.attribute("id", ariaControls);
    }
  });
  it('sets aria-haspopup="dialog" on mobile (modal dialog)', async () => {
    var _a;
    const el = await fixture(ContextualHelpMarkup());
    el.isMobile.matches = true;
    el.requestUpdate();
    await elementUpdated(el);
    const button = (_a = el.shadowRoot) == null ? void 0 : _a.querySelector(
      "sp-action-button"
    );
    expect(button).to.exist;
    expect(button).to.have.attribute("aria-haspopup", "dialog");
    expect(button).to.have.attribute("aria-expanded");
    expect(button).to.have.attribute("aria-controls");
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
    expect(popover).to.have.attribute("role", "region");
    expect(popover).to.have.attribute("aria-labelledby");
    const ariaLabelledBy = popover == null ? void 0 : popover.getAttribute("aria-labelledby");
    expect(ariaLabelledBy).to.match(/^contextual-help-content-/);
    const section = popover == null ? void 0 : popover.querySelector("section");
    expect(section).to.exist;
    expect(section).to.have.attribute("id", ariaLabelledBy || "");
    const headingSlot = section == null ? void 0 : section.querySelector(
      'slot[name="heading"]'
    );
    const heading = headingSlot.assignedElements()[0].textContent;
    expect(heading).to.equal("Permission required");
    const closed = oneEvent(el, "sp-closed");
    await sendKeys({ press: "Escape" });
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
  it(`returns ${DEFAULT_ARIA_LABELS.help} if variant is "help" and label is not set`, async () => {
    const el = await fixture(ContextualHelpMarkup());
    el.variant = "help";
    expect(el.buttonAriaLabel).to.equal(DEFAULT_ARIA_LABELS.help);
  });
  it(`returns ${DEFAULT_ARIA_LABELS.info} if variant is not "help" and label is not set`, async () => {
    const el = await fixture(ContextualHelpMarkup());
    expect(el.buttonAriaLabel).to.equal(DEFAULT_ARIA_LABELS.info);
  });
  it("renders correctly when actualPlacement is undefined", async () => {
    var _a, _b;
    const el = await fixture(ContextualHelpMarkup());
    el.isMobile.matches = true;
    await elementUpdated(el);
    const trigger = (_a = el.shadowRoot) == null ? void 0 : _a.querySelector("#trigger");
    expect(trigger).to.exist;
    expect(trigger).to.have.attribute("aria-label", DEFAULT_ARIA_LABELS.info);
    const overlay = (_b = el.shadowRoot) == null ? void 0 : _b.querySelector("sp-overlay");
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
