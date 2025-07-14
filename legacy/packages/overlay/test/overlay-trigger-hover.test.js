"use strict";
import {
  elementUpdated,
  expect,
  html,
  nextFrame,
  oneEvent,
  waitUntil
} from "@open-wc/testing";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import "@spectrum-web-components/dialog/sp-dialog-wrapper.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js";
import { spy } from "sinon";
import { sendKeys } from "@web/test-runner-commands";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import {
  fixture,
  ignoreResizeObserverLoopError
} from "../../../test/testing-helpers.js";
ignoreResizeObserverLoopError(before, after);
async function styledFixture(story) {
  const test = await fixture(html`
        <sp-theme system="spectrum" scale="medium" color="light">
            ${story}
        </sp-theme>
    `);
  return test.children[0];
}
describe("Overlay Trigger - Hover", () => {
  it("displays `hover` declaratively", async () => {
    const openedSpy = spy();
    const closedSpy = spy();
    const el = await fixture(
      (() => html`
                <overlay-trigger
                    placement="right-start"
                    open="hover"
                    @sp-opened=${() => openedSpy()}
                    @sp-closed=${() => closedSpy()}
                >
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                </overlay-trigger>
            `)()
    );
    await elementUpdated(el);
    await waitUntil(
      () => openedSpy.calledOnce,
      "hover content projected to overlay",
      { timeout: 2e3 }
    );
    el.removeAttribute("open");
    await elementUpdated(el);
    await waitUntil(() => closedSpy.calledOnce, "hover content returned", {
      timeout: 2e3
    });
  });
  describe('"tooltip" mouse interactions', () => {
    let el;
    let button;
    let tooltip;
    beforeEach(async () => {
      el = await fixture(
        (() => html`
                    <overlay-trigger placement="right-start">
                        <sp-action-button slot="trigger">
                            <sp-icon-magnify slot="icon"></sp-icon-magnify>
                        </sp-action-button>
                        <sp-tooltip slot="hover-content" tip>
                            Magnify
                        </sp-tooltip>
                    </overlay-trigger>
                `)()
      );
      await elementUpdated(el);
      button = el.querySelector("sp-action-button");
      tooltip = el.querySelector("sp-tooltip");
    });
    it('allows pointer to enter the "tooltip" without closing the "tooltip"', async () => {
      const opened = oneEvent(button, "sp-opened");
      button.dispatchEvent(
        new MouseEvent("pointerenter", {
          bubbles: true,
          composed: true
        })
      );
      await nextFrame();
      await nextFrame();
      await nextFrame();
      await nextFrame();
      expect(tooltip.open).to.be.true;
      button.dispatchEvent(
        new MouseEvent("pointerleave", {
          bubbles: true,
          composed: true
        })
      );
      await nextFrame();
      button.dispatchEvent(
        new MouseEvent("pointerenter", {
          bubbles: true,
          composed: true
        })
      );
      await nextFrame();
      tooltip.dispatchEvent(
        new MouseEvent("pointerleave", {
          bubbles: true,
          composed: true
        })
      );
      await nextFrame();
      button.dispatchEvent(
        new MouseEvent("pointerenter", {
          bubbles: true,
          composed: true
        })
      );
      await opened;
      expect(el.open).to.equal("hover");
      const closed = oneEvent(button, "sp-closed");
      button.dispatchEvent(
        new MouseEvent("pointerleave", {
          relatedTarget: null,
          bubbles: true,
          composed: true
        })
      );
      await closed;
      expect(el.open).to.be.undefined;
    });
    it('closes the "tooltip" when leaving the "tooltip"', async () => {
      const opened = oneEvent(button, "sp-opened");
      button.dispatchEvent(
        new MouseEvent("pointerenter", {
          bubbles: true,
          composed: true
        })
      );
      await nextFrame();
      button.dispatchEvent(
        new MouseEvent("pointerleave", {
          relatedTarget: tooltip,
          bubbles: true,
          composed: true
        })
      );
      await opened;
      expect(el.open).to.equal("hover");
      const closed = oneEvent(button, "sp-closed");
      tooltip.dispatchEvent(
        new MouseEvent("pointerleave", {
          relatedTarget: null,
          bubbles: true,
          composed: true
        })
      );
      await closed;
      expect(el.open).to.be.undefined;
    });
  });
  it("persists hover content", async () => {
    const el = await fixture(
      (() => html`
                <overlay-trigger placement="right-start">
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                </overlay-trigger>
            `)()
    );
    await elementUpdated(el);
    expect(el.open).to.be.undefined;
    const trigger = el.querySelector('[slot="trigger"]');
    const opened = oneEvent(trigger, "sp-opened");
    trigger.dispatchEvent(
      new Event("pointerenter", {
        bubbles: true,
        composed: true
      })
    );
    await opened;
    expect(el.open).to.equal("hover");
    trigger.click();
    await elementUpdated(el);
    expect(el.open).to.equal("hover");
  });
  it("closes persistent hover content on `longpress`", async () => {
    const el = await fixture(
      (() => html`
                <overlay-trigger placement="right-start">
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                    <sp-popover slot="longpress-content" tip></sp-popover>
                </overlay-trigger>
            `)()
    );
    await elementUpdated(el);
    expect(el.open).to.be.undefined;
    const trigger = el.querySelector('[slot="trigger"]');
    let opened = oneEvent(trigger, "sp-opened");
    trigger.dispatchEvent(
      new Event("pointerenter", {
        bubbles: true
      })
    );
    await opened;
    expect(el.open).to.equal("hover");
    opened = oneEvent(trigger, "sp-opened");
    trigger.dispatchEvent(
      new Event("longpress", {
        bubbles: true
      })
    );
    await opened;
    expect(el.open).to.equal("longpress");
  });
  it('closes `hover` overlay when [type="modal"]', async () => {
    const el = await fixture(
      (() => html`
                <overlay-trigger placement="right-start" type="modal">
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                </overlay-trigger>
            `)()
    );
    await elementUpdated(el);
    const input = document.createElement("input");
    el.insertAdjacentElement("beforebegin", input);
    expect(el.open).to.be.undefined;
    const trigger = el.querySelector('[slot="trigger"]');
    const opened = oneEvent(el, "sp-opened");
    input.focus();
    await sendKeys({
      press: "Tab"
    });
    await opened;
    expect(el.open).to.equal("hover");
    const closed = oneEvent(el, "sp-closed");
    trigger.blur();
    await closed;
    expect(el.open).to.be.undefined;
  });
  it('will not return focus to a "modal" parent', async () => {
    const el = await styledFixture(html`
            <overlay-trigger type="modal">
                <sp-button slot="trigger">Toggle Dialog</sp-button>
                <sp-dialog-wrapper
                    slot="click-content"
                    headline="Dialog title"
                    size="s"
                >
                    ${[1, 2, 3, 4].map(
      (index) => html`
                            <overlay-trigger>
                                <sp-button slot="trigger" id="button-${index}">
                                    Button with Tooltip ${index}
                                </sp-button>
                                <sp-tooltip slot="hover-content">
                                    Tooltip ${index}
                                </sp-tooltip>
                            </overlay-trigger>
                        `
    )}
                </sp-dialog-wrapper>
            </overlay-trigger>
        `);
    await elementUpdated(el);
    const button = el.querySelector("sp-button");
    const dialog = el.querySelector("sp-dialog-wrapper");
    const button1 = dialog.querySelector("#button-1");
    const button2 = dialog.querySelector("#button-2");
    const button3 = dialog.querySelector("#button-3");
    await elementUpdated(button);
    await elementUpdated(dialog);
    let opened = oneEvent(button, "sp-opened");
    const openedHint = oneEvent(button1, "sp-opened");
    button.dispatchEvent(new Event("click", { bubbles: true }));
    await opened;
    await openedHint;
    expect(button1 === document.activeElement).to.be.true;
    opened = oneEvent(button2, "sp-opened");
    sendKeys({
      press: "Tab"
    });
    await opened;
    expect(button2 === document.activeElement).to.be.true;
    opened = oneEvent(button3, "sp-opened");
    sendKeys({
      press: "Tab"
    });
    await opened;
    expect(button3 === document.activeElement).to.be.true;
  });
});
//# sourceMappingURL=overlay-trigger-hover.test.js.map
