"use strict";
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent
} from "@open-wc/testing";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import { sendMouse } from "../../../test/plugins/browser.js";
import { clickAndHoverTargets, deep } from "../stories/overlay.stories.js";
import { ignoreResizeObserverLoopError } from "../../../test/testing-helpers.js";
import { sendKeys } from "@web/test-runner-commands";
ignoreResizeObserverLoopError(before, after);
describe("Overlay Trigger - Hover and Click", () => {
  it("toggles open and closed on click", async () => {
    const el = await fixture(html`
            <overlay-trigger>
                <sp-button slot="trigger">Click and hover</sp-button>
                <sp-popover slot="click-content" dialog tip>
                    Popover content
                </sp-popover>
                <sp-tooltip slot="hover-content" delayed>
                    Tooltip content
                </sp-tooltip>
            </overlay-trigger>
        `);
    const trigger = el.querySelector(
      "[slot=trigger]"
    );
    let interaction;
    for (let i = 0; i < 3; i++) {
      const openedEvent = oneEvent(el, "sp-opened");
      trigger.click();
      interaction = (await openedEvent).detail.interaction;
      expect(interaction).equals("auto");
      const closedEvent = oneEvent(el, "sp-closed");
      trigger.click();
      interaction = (await closedEvent).detail.interaction;
      expect(interaction).equals("auto");
    }
  });
  it("toggles on click after hover", async () => {
    const el = await fixture(html`
            <overlay-trigger>
                <sp-button slot="trigger">Click and hover</sp-button>
                <sp-popover slot="click-content" dialog tip>
                    Popover content
                </sp-popover>
                <sp-tooltip slot="hover-content" delayed>
                    Tooltip content
                </sp-tooltip>
            </overlay-trigger>
        `);
    const trigger = el.querySelector(
      "[slot=trigger]"
    );
    const clickContent = el.querySelector(
      '[slot="click-content"]'
    );
    const bounds = el.getBoundingClientRect();
    let interaction;
    const hoveredEvent = oneEvent(el, "sp-opened");
    sendMouse({
      steps: [
        {
          type: "move",
          position: [bounds.left - 1, bounds.top - 1]
        },
        {
          type: "move",
          position: [bounds.left, bounds.top]
        },
        {
          type: "move",
          position: [bounds.left + 1, bounds.top + 1]
        }
      ]
    });
    interaction = (await hoveredEvent).detail.interaction;
    expect(interaction).equals("hint");
    for (let i = 0; i < 3; i++) {
      const openedEvent = oneEvent(clickContent, "sp-opened");
      trigger.click();
      interaction = (await openedEvent).detail.interaction;
      expect(interaction).equals("auto");
      const closedEvent = oneEvent(clickContent, "sp-closed");
      trigger.click();
      interaction = (await closedEvent).detail.interaction;
      expect(interaction).equals("auto");
    }
  });
  it("persists a hover overlay when clicking its trigger and closes the next highest overlay on the stack", async () => {
    const root = document.createElement("div");
    root.style.width = "100vw";
    root.style.height = "100vh";
    root.style.display = "grid";
    root.style.placeContent = "center";
    const test = await fixture(clickAndHoverTargets(), {
      parentNode: root
    });
    const overlayTrigger1 = test.querySelector(
      'overlay-trigger[placement="right"]'
    );
    const overlayTrigger2 = test.querySelector(
      'overlay-trigger[placement="left"]'
    );
    await elementUpdated(overlayTrigger1);
    await elementUpdated(overlayTrigger2);
    const trigger1 = overlayTrigger1.querySelector(
      ".friendly-target"
    );
    const trigger2 = overlayTrigger2.querySelector(
      ".friendly-target"
    );
    const rect1 = trigger1.getBoundingClientRect();
    const rect2 = trigger2.getBoundingClientRect();
    let opened = oneEvent(trigger1, "sp-opened");
    sendMouse({
      steps: [
        {
          type: "click",
          position: [
            rect1.left + rect1.width / 2,
            rect1.top + rect1.height / 2
          ]
        }
      ]
    });
    await opened;
    expect(overlayTrigger1.open).to.equal("click");
    expect(overlayTrigger2.open).to.undefined;
    opened = oneEvent(trigger2, "sp-opened");
    sendMouse({
      steps: [
        {
          type: "move",
          position: [
            rect2.left + rect2.width / 2,
            rect2.top + rect2.height / 2
          ]
        }
      ]
    });
    await opened;
    expect(overlayTrigger1.open).to.equal("click");
    expect(overlayTrigger2.open).to.equal("hover");
    const closed = oneEvent(trigger1, "sp-closed");
    sendMouse({
      steps: [
        {
          type: "click",
          position: [
            rect2.left + rect2.width / 2,
            rect2.top + rect2.height / 2
          ]
        }
      ]
    });
    await closed;
    expect(overlayTrigger1.open).to.be.undefined;
    expect(overlayTrigger2.open).to.equal("hover");
  });
  it('does not close ancestor "click" overlays on `click`', async () => {
    const test = await fixture(html`
            <div>${deep()}</div>
        `);
    const el = test.querySelector("overlay-trigger");
    const trigger = test.querySelector("sp-button");
    const button = el.querySelector("sp-action-button");
    const button2 = el.querySelector(
      "sp-action-button:nth-of-type(2)"
    );
    const tooltip = button.querySelector("sp-tooltip");
    expect(el.open).to.be.undefined;
    expect(tooltip.open).to.be.false;
    const opened = oneEvent(el, "sp-opened");
    trigger.focus();
    await sendKeys({
      press: "Tab"
    });
    await sendKeys({
      press: "Shift+Tab"
    });
    await sendKeys({
      press: "Space"
    });
    await opened;
    expect(el.open).to.equal("click");
    expect(tooltip.open).to.be.true;
    button.click();
    await aTimeout(200);
    expect(el.open).to.equal("click");
    expect(tooltip.open).to.be.true;
    let closed = oneEvent(button, "sp-closed");
    expect(document.activeElement === button, `button focused`).to.be.true;
    await sendKeys({
      press: "Tab"
    });
    expect(document.activeElement === button2, `button focused`).to.be.true;
    await closed;
    expect(el.open).to.equal("click");
    expect(tooltip.open).to.be.false;
    closed = oneEvent(el, "sp-closed");
    sendMouse({
      steps: [
        {
          type: "click",
          position: [1, 1]
        }
      ]
    });
    await closed;
    expect(el.open, '"click" overlay no longer open').to.be.undefined;
    expect(tooltip.open).to.be.false;
  });
});
//# sourceMappingURL=overlay-trigger-hover-click.test.js.map
