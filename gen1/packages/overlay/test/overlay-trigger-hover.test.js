"use strict";
import {
  elementUpdated,
  expect,
  html,
  oneEvent,
  waitUntil
} from "@open-wc/testing";
import { spy } from "sinon";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/dialog/sp-dialog-wrapper.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import {
  fixture,
  ignoreResizeObserverLoopError,
  mouseMoveAway,
  mouseMoveOver,
  sendShiftTabKey,
  sendTabKey
} from "../../../test/testing-helpers.js";
ignoreResizeObserverLoopError(before, after);
async function styledFixture(story) {
  const test = await fixture(html`
    <sp-theme system="spectrum" scale="medium" color="light">${story}</sp-theme>
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
          triggered-by="hover"
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
    const trigger = el.querySelector('[slot="trigger"]');
    await mouseMoveOver(trigger);
    await elementUpdated(el);
    await waitUntil(
      () => openedSpy.calledOnce,
      "hover content projected to overlay",
      { timeout: 2e3 }
    );
    await mouseMoveAway(trigger);
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
          <overlay-trigger placement="right-start" triggered-by="hover">
            <sp-action-button slot="trigger">
              <sp-icon-magnify slot="icon"></sp-icon-magnify>
            </sp-action-button>
            <sp-tooltip slot="hover-content" tip>Magnify</sp-tooltip>
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
      await waitUntil(() => tooltip.open === true, "tooltip should open", {
        timeout: 500
      });
      expect(tooltip.open).to.be.true;
      button.dispatchEvent(
        new MouseEvent("pointerleave", {
          bubbles: true,
          composed: true
        })
      );
      await elementUpdated(tooltip);
      tooltip.dispatchEvent(
        new MouseEvent("pointerenter", {
          bubbles: true,
          composed: true
        })
      );
      await elementUpdated(tooltip);
      expect(tooltip.open).to.be.true;
      tooltip.dispatchEvent(
        new MouseEvent("pointerleave", {
          bubbles: true,
          composed: true
        })
      );
      await elementUpdated(tooltip);
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
      await elementUpdated(tooltip);
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
    it('closes the "tooltip" on "escape" keydown', async () => {
      const opened = oneEvent(button, "sp-opened");
      button.dispatchEvent(
        new MouseEvent("pointerenter", {
          bubbles: true,
          composed: true
        })
      );
      await waitUntil(() => tooltip.open === true, "tooltip should open", {
        timeout: 500
      });
      await opened;
      expect(el.open).to.equal("hover");
      const body = el.ownerDocument.body;
      body.focus();
      const closed = oneEvent(button, "sp-closed");
      const escapeKeydown = new KeyboardEvent("keydown", {
        code: "Escape",
        bubbles: true,
        composed: true
      });
      body.dispatchEvent(escapeKeydown);
      await closed;
      expect(el.open).to.be.undefined;
    });
  });
  it("persists hover content", async () => {
    const el = await fixture(
      (() => html`
        <overlay-trigger placement="right-start" triggered-by="hover">
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
        <overlay-trigger placement="right-start" triggered-by="hover longpress">
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
        <overlay-trigger
          placement="right-start"
          type="modal"
          triggered-by="hover"
        >
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
    await sendTabKey();
    await opened;
    expect(el.open).to.equal("hover");
    const closed = oneEvent(el, "sp-closed");
    trigger.blur();
    await closed;
    expect(el.open).to.be.undefined;
  });
  it('will not return focus to a "modal" parent', async () => {
    const el = await styledFixture(html`
      <overlay-trigger type="modal" triggered-by="click">
        <sp-button slot="trigger">Toggle Dialog</sp-button>
        <sp-dialog-wrapper
          slot="click-content"
          headline="Dialog title"
          size="s"
        >
          ${[1, 2, 3, 4].map(
      (index) => html`
              <overlay-trigger triggered-by="hover">
                <sp-button slot="trigger" id="button-${index}">
                  Button with Tooltip ${index}
                </sp-button>
                <sp-tooltip slot="hover-content">Tooltip ${index}</sp-tooltip>
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
    await sendTabKey();
    await opened;
    expect(button2 === document.activeElement).to.be.true;
    opened = oneEvent(button3, "sp-opened");
    await sendTabKey();
    await opened;
    expect(button3 === document.activeElement).to.be.true;
  });
  describe("nested overlays focus management", () => {
    it("closes nested hover overlay without closing parent modal when focus leaves nested overlay", async () => {
      const el = await styledFixture(html`
        <overlay-trigger type="modal" triggered-by="click">
          <sp-button slot="trigger">Toggle Dialog</sp-button>
          <sp-dialog-wrapper
            slot="click-content"
            headline="Dialog with hover tooltips"
            size="s"
          >
            <overlay-trigger triggered-by="hover" id="tooltip-trigger-1">
              <sp-button slot="trigger" id="button-1">
                Button with Tooltip 1
              </sp-button>
              <sp-tooltip slot="hover-content" id="tooltip-1">
                Tooltip content 1
              </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger triggered-by="hover" id="tooltip-trigger-2">
              <sp-button slot="trigger" id="button-2">
                Button with Tooltip 2
              </sp-button>
              <sp-tooltip slot="hover-content" id="tooltip-2">
                Tooltip content 2
              </sp-tooltip>
            </overlay-trigger>
          </sp-dialog-wrapper>
        </overlay-trigger>
      `);
      await elementUpdated(el);
      const button = el.querySelector("sp-button");
      const dialog = el.querySelector("sp-dialog-wrapper");
      const button1 = dialog.querySelector("#button-1");
      const button2 = dialog.querySelector("#button-2");
      const tooltipTrigger1 = dialog.querySelector(
        "#tooltip-trigger-1"
      );
      const tooltipTrigger2 = dialog.querySelector(
        "#tooltip-trigger-2"
      );
      const opened = oneEvent(button, "sp-opened");
      button.dispatchEvent(new Event("click", { bubbles: true }));
      await opened;
      expect(el.open).to.equal("click");
      button1.focus();
      await elementUpdated(tooltipTrigger1);
      await waitUntil(
        () => tooltipTrigger1.open === "hover",
        "tooltip 1 opens on focus",
        { timeout: 500 }
      );
      expect(tooltipTrigger1.open).to.equal("hover");
      expect(el.open).to.equal("click");
      await sendTabKey();
      await elementUpdated(tooltipTrigger1);
      await elementUpdated(tooltipTrigger2);
      await waitUntil(
        () => tooltipTrigger2.open === "hover",
        "tooltip 2 opens on focus",
        { timeout: 500 }
      );
      expect(
        button2 === document.activeElement || button2.contains(document.activeElement)
      ).to.be.true;
      await new Promise((resolve) => setTimeout(resolve, 400));
      await elementUpdated(tooltipTrigger1);
      expect(tooltipTrigger2.open).to.equal("hover");
      expect(tooltipTrigger1.open).to.be.undefined;
      expect(el.open).to.equal("click");
      await sendShiftTabKey();
      await elementUpdated(tooltipTrigger1);
      await elementUpdated(tooltipTrigger2);
      await waitUntil(
        () => tooltipTrigger1.open === "hover",
        "tooltip 1 opens on reverse focus",
        { timeout: 500 }
      );
      expect(
        button1 === document.activeElement || button1.contains(document.activeElement)
      ).to.be.true;
      await new Promise((resolve) => setTimeout(resolve, 400));
      await elementUpdated(tooltipTrigger2);
      expect(tooltipTrigger1.open).to.equal("hover");
      expect(tooltipTrigger2.open).to.be.undefined;
      expect(el.open).to.equal("click");
    });
    it("maintains parent modal open when nested hover overlay closes on pointer leave", async () => {
      const el = await styledFixture(html`
        <overlay-trigger type="modal" triggered-by="click">
          <sp-button slot="trigger">Toggle Dialog</sp-button>
          <sp-dialog-wrapper
            slot="click-content"
            headline="Dialog with hover content"
            size="s"
          >
            <overlay-trigger triggered-by="hover" id="popover-trigger">
              <sp-button slot="trigger" id="button-with-popover">
                Button with Popover
              </sp-button>
              <sp-tooltip slot="hover-content" id="nested-tooltip">
                Tooltip content
              </sp-tooltip>
            </overlay-trigger>
          </sp-dialog-wrapper>
        </overlay-trigger>
      `);
      await elementUpdated(el);
      const button = el.querySelector("sp-button");
      const dialog = el.querySelector("sp-dialog-wrapper");
      const buttonWithPopover = dialog.querySelector(
        "#button-with-popover"
      );
      const popoverTrigger = dialog.querySelector(
        "#popover-trigger"
      );
      const opened = oneEvent(button, "sp-opened");
      button.dispatchEvent(new Event("click", { bubbles: true }));
      await opened;
      await elementUpdated(dialog);
      await elementUpdated(buttonWithPopover);
      expect(el.open).to.equal("click");
      buttonWithPopover.dispatchEvent(
        new MouseEvent("pointerenter", {
          bubbles: true,
          composed: true
        })
      );
      await elementUpdated(popoverTrigger);
      await waitUntil(
        () => popoverTrigger.open === "hover",
        "tooltip opens on hover",
        { timeout: 1e3 }
      );
      expect(popoverTrigger.open).to.equal("hover");
      expect(el.open).to.equal("click");
      const nestedTooltip = document.querySelector(
        "#nested-tooltip"
      );
      buttonWithPopover.blur();
      await elementUpdated(popoverTrigger);
      const closed = oneEvent(buttonWithPopover, "sp-closed");
      buttonWithPopover.dispatchEvent(
        new MouseEvent("pointerleave", {
          relatedTarget: nestedTooltip,
          bubbles: true,
          composed: true
        })
      );
      await elementUpdated(popoverTrigger);
      if (nestedTooltip) {
        nestedTooltip.dispatchEvent(
          new MouseEvent("pointerleave", {
            relatedTarget: null,
            bubbles: true,
            composed: true
          })
        );
      }
      await closed;
      expect(popoverTrigger.open).to.be.undefined;
      expect(el.open).to.equal("click");
    });
  });
  describe("keyboard navigation into hover content", () => {
    it("keeps hover content open when tabbing into interactive overlay content", async () => {
      const el = await styledFixture(html`
        <overlay-trigger placement="bottom" triggered-by="hover">
          <sp-button slot="trigger">
            Hover trigger with interactive content
          </sp-button>
          <sp-popover slot="hover-content">
            <sp-button id="button-in-popover">Interactive button</sp-button>
          </sp-popover>
        </overlay-trigger>
      `);
      await elementUpdated(el);
      const trigger = el.querySelector('[slot="trigger"]');
      const buttonInPopover = el.querySelector("#button-in-popover");
      trigger.focus();
      await elementUpdated(el);
      await waitUntil(
        () => el.open === "hover",
        "hover content opens on focus",
        { timeout: 500 }
      );
      expect(el.open).to.equal("hover");
      await sendTabKey();
      await elementUpdated(el);
      await waitUntil(
        () => buttonInPopover === document.activeElement || buttonInPopover.contains(document.activeElement),
        "focus moved to button in popover",
        { timeout: 500 }
      );
      expect(
        buttonInPopover === document.activeElement || buttonInPopover.contains(document.activeElement)
      ).to.be.true;
      await new Promise((resolve) => setTimeout(resolve, 400));
      await elementUpdated(el);
      expect(el.open).to.equal("hover");
    });
    it("closes hover content after delay when tabbing out of both trigger and content", async () => {
      const theme = await fixture(html`
        <sp-theme system="spectrum" scale="medium" color="light">
          <input id="before-trigger" />
          <overlay-trigger placement="bottom" triggered-by="hover">
            <sp-button slot="trigger">Hover trigger</sp-button>
            <sp-popover slot="hover-content">
              <sp-button id="button-in-popover">Interactive button</sp-button>
            </sp-popover>
          </overlay-trigger>
          <input id="after-trigger" />
        </sp-theme>
      `);
      await elementUpdated(theme);
      const el = theme.querySelector("overlay-trigger");
      const trigger = el.querySelector('[slot="trigger"]');
      const afterInput = theme.querySelector(
        "#after-trigger"
      );
      trigger.focus();
      await elementUpdated(el);
      await waitUntil(
        () => el.open === "hover",
        "overlay should open on focus",
        { timeout: 500 }
      );
      expect(el.open).to.equal("hover");
      await sendTabKey();
      await elementUpdated(el);
      expect(el.open).to.equal("hover");
      await sendTabKey();
      await elementUpdated(el);
      await waitUntil(
        () => afterInput === document.activeElement,
        "focus moved to input after overlay",
        { timeout: 500 }
      );
      expect(afterInput === document.activeElement).to.be.true;
      expect(el.open).to.equal("hover");
      await new Promise((resolve) => setTimeout(resolve, 400));
      await elementUpdated(el);
      expect(el.open).to.be.undefined;
    });
    it("closes hover content after delay when using Shift+Tab to exit overlay content backwards", async () => {
      const theme = await fixture(html`
        <sp-theme system="spectrum" scale="medium" color="light">
          <input id="before-trigger" />
          <overlay-trigger placement="bottom" triggered-by="hover">
            <sp-button slot="trigger">Hover trigger</sp-button>
            <sp-popover slot="hover-content">
              <sp-button id="button-in-popover">Interactive button</sp-button>
            </sp-popover>
          </overlay-trigger>
          <input id="after-trigger" />
        </sp-theme>
      `);
      await elementUpdated(theme);
      const el = theme.querySelector("overlay-trigger");
      const trigger = el.querySelector('[slot="trigger"]');
      const beforeInput = theme.querySelector(
        "#before-trigger"
      );
      trigger.focus();
      await elementUpdated(el);
      await waitUntil(
        () => el.open === "hover",
        "overlay should open on focus",
        { timeout: 500 }
      );
      expect(el.open).to.equal("hover");
      await sendTabKey();
      await elementUpdated(el);
      expect(el.open).to.equal("hover");
      await sendShiftTabKey();
      await elementUpdated(el);
      await waitUntil(
        () => trigger === document.activeElement || trigger.contains(document.activeElement),
        "focus returned to trigger",
        { timeout: 500 }
      );
      expect(el.open).to.equal("hover");
      await sendShiftTabKey();
      await elementUpdated(el);
      await waitUntil(
        () => beforeInput === document.activeElement,
        "focus moved to input before overlay",
        { timeout: 500 }
      );
      expect(beforeInput === document.activeElement).to.be.true;
      expect(el.open).to.equal("hover");
      await new Promise((resolve) => setTimeout(resolve, 400));
      await elementUpdated(el);
      expect(el.open).to.be.undefined;
    });
    it("closes hover content on Escape and returns focus to trigger", async () => {
      var _a;
      const el = await styledFixture(html`
        <overlay-trigger placement="bottom" triggered-by="hover">
          <sp-button slot="trigger">Hover trigger</sp-button>
          <sp-popover slot="hover-content">
            <sp-button id="button-in-popover">Interactive button</sp-button>
          </sp-popover>
        </overlay-trigger>
      `);
      await elementUpdated(el);
      const trigger = el.querySelector('[slot="trigger"]');
      const buttonInPopover = el.querySelector("#button-in-popover");
      trigger.focus();
      await elementUpdated(el);
      await waitUntil(
        () => el.open === "hover",
        "overlay should open on focus",
        { timeout: 500 }
      );
      expect(el.open).to.equal("hover");
      await sendTabKey();
      await elementUpdated(el);
      expect(el.open).to.equal("hover");
      const escapeEvent = new KeyboardEvent("keyup", {
        code: "Escape",
        bubbles: true,
        composed: true,
        cancelable: true
      });
      buttonInPopover.dispatchEvent(escapeEvent);
      await elementUpdated(el);
      await waitUntil(
        () => el.open === void 0,
        "hover content closes on Escape",
        { timeout: 500 }
      );
      expect(el.open).to.be.undefined;
      expect(
        trigger === document.activeElement || ((_a = trigger.shadowRoot) == null ? void 0 : _a.activeElement)
      ).to.exist;
    });
    it("allows keyboard navigation through multiple interactive elements in hover content", async () => {
      const el = await styledFixture(html`
        <overlay-trigger placement="bottom" triggered-by="hover">
          <sp-button slot="trigger">Hover trigger</sp-button>
          <sp-popover slot="hover-content">
            <sp-button id="button-1">Button 1</sp-button>
            <sp-button id="button-2">Button 2</sp-button>
            <sp-button id="button-3">Button 3</sp-button>
          </sp-popover>
        </overlay-trigger>
      `);
      await elementUpdated(el);
      const trigger = el.querySelector('[slot="trigger"]');
      trigger.focus();
      await elementUpdated(el);
      await waitUntil(
        () => el.open === "hover",
        "hover content opens on focus",
        { timeout: 500 }
      );
      expect(el.open).to.equal("hover");
      await sendTabKey();
      await elementUpdated(el);
      expect(el.open).to.equal("hover");
      await sendTabKey();
      await elementUpdated(el);
      expect(el.open).to.equal("hover");
      await sendTabKey();
      await elementUpdated(el);
      expect(el.open).to.equal("hover");
      expect(el.open).to.equal("hover");
    });
    it("keeps hover content open when mouse enters after keyboard focus", async () => {
      const el = await styledFixture(html`
        <overlay-trigger placement="bottom" triggered-by="hover">
          <sp-button slot="trigger">Hover trigger</sp-button>
          <sp-popover slot="hover-content">
            <sp-button id="button-in-popover">Interactive button</sp-button>
          </sp-popover>
        </overlay-trigger>
      `);
      await elementUpdated(el);
      const trigger = el.querySelector('[slot="trigger"]');
      trigger.focus();
      await elementUpdated(el);
      await waitUntil(
        () => el.open === "hover",
        "hover content opens on focus",
        { timeout: 500 }
      );
      expect(el.open).to.equal("hover");
      await sendTabKey();
      await elementUpdated(el);
      expect(el.open).to.equal("hover");
      trigger.dispatchEvent(
        new MouseEvent("pointerenter", {
          bubbles: true,
          composed: true
        })
      );
      await elementUpdated(el);
      expect(el.open).to.equal("hover");
      await sendTabKey();
      await elementUpdated(el);
      expect(el.open).to.equal("hover");
    });
  });
});
//# sourceMappingURL=overlay-trigger-hover.test.js.map
