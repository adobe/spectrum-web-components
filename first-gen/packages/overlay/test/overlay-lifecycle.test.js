"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame,
  oneEvent,
  waitUntil
} from "@open-wc/testing";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import {
  a11ySnapshot,
  findAccessibilityNode,
  sendKeys
} from "@web/test-runner-commands";
describe("Overlay Trigger - accessible hover content management", () => {
  it("accessibly describes trigger content with hover content", async () => {
    const el = await fixture(html`
            <overlay-trigger placement="right-start">
                <sp-action-button slot="trigger">
                    Button with Tooltip
                </sp-action-button>
                <sp-tooltip slot="hover-content">
                    Described by this content on focus/hover. 1
                </sp-tooltip>
            </overlay-trigger>
        `);
    await elementUpdated(el);
    expect(el.open).to.be.undefined;
    const snapshot = await a11ySnapshot(
      {}
    );
    expect(
      findAccessibilityNode(
        snapshot,
        (node) => node.name === "Button with Tooltip" && typeof node.description === "undefined"
      ),
      "`name`ed with no `description`"
    );
  });
  it("gardens `aria-describedby` in its target", async () => {
    const el = await fixture(html`
            <overlay-trigger placement="right-start">
                <sp-action-button slot="trigger" aria-describedby="descriptor">
                    Button with Tooltip
                </sp-action-button>
                <sp-tooltip slot="hover-content" delayed>
                    Described by this content on focus/hover. 2
                </sp-tooltip>
            </overlay-trigger>
            <div id="descriptor">I'm a description!</div>
        `);
    const trigger = el.querySelector('[slot="trigger"]');
    const tooltip = el.querySelector(
      '[slot="hover-content"]'
    );
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    await waitUntil(
      () => tooltip.id,
      "Tooltip never published an ID for itself"
    );
    expect(trigger.getAttribute("aria-describedby")).to.equal(
      `descriptor ${tooltip.id}`
    );
    trigger.remove();
    await nextFrame();
    expect(trigger.getAttribute("aria-describedby")).to.equal("descriptor");
  });
  it("applies `aria-describedby` attribute", async () => {
    const el = await fixture(html`
            <overlay-trigger placement="right-start">
                <sp-action-button slot="trigger">
                    Button with Tooltip
                </sp-action-button>
                <sp-tooltip slot="hover-content" delayed>
                    Described by this content on focus/hover. 2
                </sp-tooltip>
            </overlay-trigger>
        `);
    const trigger = el.querySelector('[slot="trigger"]');
    const tooltip = el.querySelector(
      '[slot="hover-content"]'
    );
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    await waitUntil(
      () => tooltip.id,
      "Tooltip never published an ID for itself"
    );
    expect(trigger.getAttribute("aria-describedby")).to.equal(tooltip.id);
    trigger.remove();
    await nextFrame();
    expect(trigger.getAttribute("aria-describedby")).to.be.null;
  });
  it("does not duplicate `aria-describedby` attribute", async () => {
    const el = await fixture(html`
            <div>
                <sp-action-button slot="trigger">
                    Button with Tooltip
                </sp-action-button>
                <overlay-trigger placement="right-start">
                    <sp-tooltip slot="hover-content" delayed>
                        Described by this content on focus/hover. 2
                    </sp-tooltip>
                </overlay-trigger>
            </div>
        `);
    const trigger = el.querySelector('[slot="trigger"]');
    const tooltip = el.querySelector("sp-tooltip");
    const overlay = el.querySelector("overlay-trigger");
    trigger.setAttribute("aria-describedby", tooltip.id);
    overlay.append(trigger);
    await elementUpdated(el);
    expect(trigger.getAttribute("aria-describedby")).to.equal(tooltip.id);
    expect(el.open).to.be.undefined;
    const input = document.createElement("input");
    el.insertAdjacentElement("afterbegin", input);
    input.focus();
    const opened = oneEvent(el, "sp-opened");
    await sendKeys({
      press: "Tab"
    });
    await opened;
    expect(trigger.getAttribute("aria-describedby")).to.equal(tooltip.id);
    const closed = oneEvent(el, "sp-closed");
    trigger.dispatchEvent(
      new FocusEvent("focusout", { bubbles: true, composed: true })
    );
    await closed;
    expect(trigger.getAttribute("aria-describedby")).to.equal(tooltip.id);
  });
});
//# sourceMappingURL=overlay-lifecycle.test.js.map
