"use strict";
import {
  aTimeout,
  elementUpdated,
  expect,
  html,
  nextFrame,
  oneEvent,
  waitUntil
} from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers";
import { spy } from "sinon";
import {
  fixture,
  ignoreResizeObserverLoopError
} from "../../../test/testing-helpers.js";
import "@spectrum-web-components/dialog/sp-dialog-base.js";
import {
  iconOnly,
  tooltipDescriptionAndPlacement
} from "../stories/action-menu.stories.js";
import { findDescribedNode } from "../../../test/testing-helpers-a11y.js";
import { sendMouse } from "../../../test/plugins/browser.js";
import {
  a11ySnapshot,
  findAccessibilityNode,
  sendKeys,
  setViewport
} from "@web/test-runner-commands";
import { isWebKit } from "@spectrum-web-components/shared";
import { SAFARI_FOCUS_RING_CLASS } from "@spectrum-web-components/picker/src/InteractionController.js";
ignoreResizeObserverLoopError(before, after);
const deprecatedActionMenuFixture = async () => await fixture(html`
        <sp-action-menu label="More Actions">
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
        </sp-action-menu>
    `);
const actionMenuFixture = async () => await fixture(html`
        <sp-action-menu label="More Actions">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-action-menu>
    `);
const actionSubmenuFixture = async () => await fixture(html`
        <sp-action-menu label="More Actions">
            <sp-menu-item>One</sp-menu-item>
            <sp-menu-item selected id="root-selected-item">Two</sp-menu-item>
            <sp-menu-item id="item-with-submenu">
                B should be selected
                <sp-menu slot="submenu">
                    <sp-menu-item>A</sp-menu-item>
                    <sp-menu-item selected id="sub-selected-item">
                        B
                    </sp-menu-item>
                    <sp-menu-item>C</sp-menu-item>
                </sp-menu>
            </sp-menu-item>
        </sp-action-menu>
    `);
export const testActionMenu = (mode) => {
  describe(`Action menu: ${mode}`, () => {
    testForLitDevWarnings(async () => await actionMenuFixture());
    it("loads", async () => {
      const el = await actionMenuFixture();
      await elementUpdated(el);
      expect(el).to.not.be.undefined;
      await expect(el).to.be.accessible();
    });
    it('loads - [slot="label"]', async () => {
      const el = await fixture(html`
                <sp-action-menu>
                    <span slot="label">More Actions</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            `);
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
      await expect(el).to.be.accessible();
    });
    it("loads - [custom icon]", async () => {
      const el = await fixture(html`
                <sp-action-menu label="More Actions">
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            `);
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
      await expect(el).to.be.accessible();
    });
    it("has menuitems in accessibility tree", async () => {
      const el = await fixture(html`
                <sp-action-menu
                    label="More Actions">
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            `);
      const opened = oneEvent(el, "sp-opened");
      el.focus();
      sendKeys({ press: "Enter" });
      await opened;
      await nextFrame();
      const snapshot = await a11ySnapshot({});
      const button = findAccessibilityNode(snapshot, (node) => node.name === "More Actions");
      const menu = findAccessibilityNode(snapshot, (node) => node.role === "menu");
      const deselect = findAccessibilityNode(snapshot, (node) => node.role === "menuitem" && node.name === "Deselect");
      const workPath = findAccessibilityNode(snapshot, (node) => node.role === "menuitem" && node.name === "Make Work Path" && node.disabled);
      expect(button, "button").to.not.be.null;
      expect(menu, "menu").to.not.be.null;
      expect(deselect, "first menuitem").to.not.be.null;
      expect(workPath, "second menuitem").to.not.be.null;
    });
    it("dispatches change events, no [href]", async () => {
      const changeSpy = spy();
      const el = await fixture(html`
                <sp-action-menu
                    label="More Actions"
                    @change=${({
        target: { value }
      }) => {
        changeSpy(value);
      }}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save Selection</sp-menu-item>
                    <sp-menu-item disabled>Make Work Path</sp-menu-item>
                </sp-action-menu>
            `);
      expect(changeSpy.callCount).to.equal(0);
      expect(el.open).to.be.false;
      const menuItem2 = el.querySelector(
        "sp-menu-item:nth-child(2)"
      );
      const opened = oneEvent(el, "sp-opened");
      el.click();
      await elementUpdated(el);
      await opened;
      expect(el.open).to.be.true;
      const closed = oneEvent(el, "sp-closed");
      menuItem2.click();
      await closed;
      expect(el.open).to.be.false;
      expect(changeSpy.callCount).to.equal(1);
      expect(changeSpy.calledWith("Deselect")).to.be.true;
    });
    it("closes when Menu Item has [href]", async () => {
      const changeSpy = spy();
      const el = await fixture(html`
                <sp-action-menu
                    label="More Actions"
                    @change=${() => {
        changeSpy();
      }}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    <sp-menu-item href="#">Deselect</sp-menu-item>
                    <sp-menu-item href="#">Select Inverse</sp-menu-item>
                    <sp-menu-item href="#">Feather...</sp-menu-item>
                    <sp-menu-item href="#">Select and Mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item href="#">Save Selection</sp-menu-item>
                    <sp-menu-item href="#" disabled>
                        Make Work Path
                    </sp-menu-item>
                </sp-action-menu>
            `);
      expect(changeSpy.callCount).to.equal(0);
      expect(el.open).to.be.false;
      const menuItem2 = el.querySelector(
        "sp-menu-item:nth-child(2)"
      );
      const opened = oneEvent(el, "sp-opened");
      el.click();
      await opened;
      expect(el.open).to.be.true;
      const closed = oneEvent(el, "sp-closed");
      menuItem2.click();
      await closed;
      expect(el.open).to.be.false;
      expect(changeSpy.callCount).to.equal(0);
    });
    it("can be `quiet`", async () => {
      const el = await actionMenuFixture();
      expect(el.quiet).to.be.false;
      el.quiet = true;
      await elementUpdated(el);
      expect(el.quiet).to.be.true;
    });
    it("can be `staticColor`", async () => {
      const el = await actionMenuFixture();
      expect(el.staticColor == void 0).to.be.true;
      el.staticColor = "black";
      await elementUpdated(el);
      expect(el.staticColor == "black").to.be.true;
      el.staticColor = "white";
      await elementUpdated(el);
      expect(el.staticColor == "white").to.be.true;
    });
    it("stay `valid`", async () => {
      const el = await actionMenuFixture();
      expect(el.invalid).to.be.false;
      el.invalid = true;
      await elementUpdated(el);
      expect(el.invalid).to.be.false;
    });
    it("focus()", async () => {
      const el = await actionMenuFixture();
      el.focus();
      expect(document.activeElement).to.equal(el);
      expect(el.shadowRoot.activeElement).to.equal(el.focusElement);
      const opened = oneEvent(el, "sp-opened");
      el.open = true;
      await opened;
      const closed = oneEvent(el, "sp-closed");
      el.open = false;
      await closed;
      expect(document.activeElement).to.equal(el);
      expect(el.shadowRoot.activeElement).to.equal(el.focusElement);
    });
    it("manages focus-ring styles", async () => {
      if (!isWebKit()) {
        return;
      }
      const el = await actionMenuFixture();
      el.isMobile.matches = true;
      el.bindEvents();
      await setViewport({ width: 360, height: 640 });
      await nextFrame();
      let opened = oneEvent(el, "sp-opened");
      const boundingRect = el.button.getBoundingClientRect();
      sendMouse({
        steps: [
          {
            type: "click",
            position: [
              boundingRect.x + boundingRect.width / 2,
              boundingRect.y + boundingRect.height / 2
            ]
          }
        ]
      });
      await opened;
      const tray = el.shadowRoot.querySelector("sp-tray");
      expect(tray).to.not.be.null;
      let closed = oneEvent(el, "sp-closed");
      const firstItem = el.querySelector("sp-menu-item");
      firstItem.click();
      await elementUpdated(el);
      await closed;
      expect(el.open).to.be.false;
      const button = el.shadowRoot.querySelector(
        "#button"
      );
      expect(button).to.not.be.null;
      expect(button.classList.contains(SAFARI_FOCUS_RING_CLASS)).to.be.true;
      expect(document.activeElement === el).to.be.true;
      await sendMouse({
        steps: [
          {
            type: "click",
            position: [0, 0]
          }
        ]
      });
      expect(document.activeElement === el).to.be.false;
      opened = oneEvent(el, "sp-opened");
      await sendKeys({
        press: "Tab"
      });
      await sendKeys({
        press: "Enter"
      });
      await elementUpdated(el);
      await opened;
      closed = oneEvent(el, "sp-closed");
      firstItem.click();
      await elementUpdated(el);
      await closed;
      expect(el.open).to.be.false;
      expect(button.classList.contains(SAFARI_FOCUS_RING_CLASS)).to.be.false;
    });
    it("opens unmeasured", async () => {
      const el = await actionMenuFixture();
      const button = el.button;
      expect(button).to.have.attribute("aria-haspopup", "true");
      expect(button).to.not.have.attribute("aria-expanded", "true");
      expect(button).to.not.have.attribute("aria-controls", "menu");
      el.click();
      await elementUpdated(el);
      expect(el.open).to.be.true;
      expect(button).to.have.attribute("aria-haspopup", "true");
      expect(button).to.have.attribute("aria-expanded", "true");
      expect(button).to.have.attribute("aria-controls", "menu");
    });
    it("opens repeatedly with Menu in the correct location", async function() {
      var _a, _b, _c, _d;
      const el = await fixture(
        iconOnly({
          ...iconOnly.args,
          align: "end"
        })
      );
      expect(el.open, "open?").to.be.false;
      let opened = oneEvent(el, "sp-opened");
      el.click();
      await opened;
      expect(el.open, "open?").to.be.true;
      const firstRect = (_b = (_a = el == null ? void 0 : el.overlayElement) == null ? void 0 : _a.dialogEl) == null ? void 0 : _b.getBoundingClientRect();
      const closed = oneEvent(el, "sp-closed");
      el.close();
      await closed;
      expect(el.open, "open?").to.be.false;
      opened = oneEvent(el, "sp-opened");
      el.toggle();
      await opened;
      expect(el.open, "open?").to.be.true;
      const secondRect = (_d = (_c = el == null ? void 0 : el.overlayElement) == null ? void 0 : _c.dialogEl) == null ? void 0 : _d.getBoundingClientRect();
      el.close();
      expect(firstRect).to.deep.equal(secondRect);
    });
    it("opens and selects in a single pointer button interaction", async () => {
      const el = await actionMenuFixture();
      const thirdItem = el.querySelector(
        "sp-menu-item:nth-of-type(3)"
      );
      const boundingRect = el.button.getBoundingClientRect();
      expect(el.value).to.not.equal(thirdItem.value);
      const opened = oneEvent(el, "sp-opened");
      await sendMouse({
        steps: [
          {
            type: "move",
            position: [
              boundingRect.x + boundingRect.width / 2,
              boundingRect.y + boundingRect.height / 2
            ]
          },
          {
            type: "down"
          }
        ]
      });
      await opened;
      const thirdItemRect = thirdItem.getBoundingClientRect();
      const closed = oneEvent(el, "sp-closed");
      let selected = "";
      el.addEventListener("change", (event) => {
        selected = event.target.value;
      });
      await sendMouse({
        steps: [
          {
            type: "move",
            position: [
              thirdItemRect.x + thirdItemRect.width / 2,
              thirdItemRect.y + thirdItemRect.height / 2
            ]
          },
          {
            type: "up"
          }
        ]
      });
      await closed;
      expect(el.open).to.be.false;
      expect(selected).to.equal(thirdItem.value);
    });
    it("returns focus on `Escape`", async () => {
      const el = await actionMenuFixture();
      const thirdItem = el.querySelector(
        "sp-menu-item:nth-of-type(3)"
      );
      expect(el.value).to.not.equal(thirdItem.value);
      const opened = oneEvent(el, "sp-opened");
      el.focus();
      await sendKeys({ press: "Enter" });
      await opened;
      await sendKeys({ press: "Escape" });
      await waitUntil(
        () => document.activeElement === el,
        "focused",
        { timeout: 300 }
      );
      expect(el.open).to.be.false;
    });
    it("returns focus on select", async () => {
      const el = await actionMenuFixture();
      const thirdItem = el.querySelector(
        "sp-menu-item:nth-of-type(3)"
      );
      expect(el.value).to.not.equal(thirdItem.value);
      const opened = oneEvent(el, "sp-opened");
      el.focus();
      await sendKeys({ press: "Enter" });
      await opened;
      thirdItem.click();
      await waitUntil(
        () => document.activeElement === el,
        "focused",
        { timeout: 300 }
      );
      expect(el.open).to.be.false;
    });
    it("has attribute aria-describedby", async () => {
      const name = "sp-picker";
      const description = "Rendering a Picker";
      const el = await fixture(html`
                <sp-action-menu label=${name}>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <span slot="description">${description}</span>
                </sp-action-menu>
            `);
      await elementUpdated(el);
      await findDescribedNode(name, description);
    });
    it("opens unmeasured with deprecated syntax", async () => {
      const el = await deprecatedActionMenuFixture();
      el.click();
      await elementUpdated(el);
      expect(el.open).to.be.true;
    });
    it("toggles open/close multiple time", async () => {
      const el = await actionMenuFixture();
      await elementUpdated(el);
      const button = el.button;
      expect(button).to.have.attribute("aria-haspopup", "true");
      expect(button).to.have.attribute("aria-expanded", "false");
      expect(button).not.to.have.attribute("aria-controls");
      let opened = oneEvent(el, "sp-opened");
      el.open = true;
      await opened;
      expect(el.open).to.be.true;
      expect(button).to.have.attribute("aria-expanded", "true");
      expect(button).to.have.attribute("aria-controls", "menu");
      let closed = oneEvent(el, "sp-closed");
      el.open = false;
      await closed;
      expect(el.open).to.be.false;
      expect(button).to.have.attribute("aria-expanded", "false");
      expect(button).not.to.have.attribute("aria-controls");
      opened = oneEvent(el, "sp-opened");
      el.open = true;
      await opened;
      expect(el.open).to.be.true;
      expect(button).to.have.attribute("aria-expanded", "true");
      expect(button).to.have.attribute("aria-controls", "menu");
      closed = oneEvent(el, "sp-closed");
      el.open = false;
      await closed;
      expect(el.open).to.be.false;
      expect(button).to.have.attribute("aria-expanded", "false");
      expect(button).not.to.have.attribute("aria-controls");
    });
    it("allows submenu items to be selected", async () => {
      const root = await actionSubmenuFixture();
      const menuItem = root.querySelector("#item-with-submenu");
      const submenu = menuItem.querySelector(
        'sp-menu[slot="submenu"]'
      );
      const selectedItem = submenu.querySelector(
        "#sub-selected-item"
      );
      expect(selectedItem.selected, "item should be initially selected").to.be.true;
      let opened = oneEvent(root, "sp-opened");
      root.click();
      await opened;
      expect(root.open).to.be.true;
      opened = oneEvent(menuItem, "sp-opened");
      menuItem.dispatchEvent(
        new PointerEvent("pointerenter", { bubbles: true })
      );
      await opened;
      await elementUpdated(submenu);
      expect(
        selectedItem.selected,
        "initially selected item should maintain selection"
      ).to.be.true;
    });
    it("does not alter submenu selection when top-level menu items are selected", async () => {
      const root = await fixture(html`
                <sp-action-menu id="actionmenu" label="More Actions">
                    <sp-menu-item id="item-1">One</sp-menu-item>
                    <sp-menu-item id="item-2">
                        Two, with B selected
                        <sp-menu slot="submenu" id="menu-2" selects="single">
                            <sp-menu-item id="item-2a" selected>A</sp-menu-item>
                            <sp-menu-item id="item-2b">B</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-action-menu>
            `);
      const item1 = root.querySelector("#item-1");
      const item2 = root.querySelector("#item-2");
      const itemA = root.querySelector("#item-2a");
      const itemB = root.querySelector("#item-2b");
      let opened = oneEvent(root, "sp-opened");
      expect(item1.selected, "before opening: item1 selected?").to.be.false;
      expect(item2.selected, "before opening: item2 selected?").to.be.false;
      expect(itemA.selected, "before opening: itemA selected?").to.be.true;
      expect(item2.selected, "before opening: itemB selected?").to.be.false;
      root.click();
      await opened;
      expect(root.open, "after clicking open: open?").to.be.true;
      let closed = oneEvent(root, "sp-closed");
      item1.click();
      await closed;
      expect(item1.selected, "after clicking item1: item1 selected?").to.be.false;
      expect(itemA.selected, "after clicking item1: itemA selected?").to.be.true;
      expect(root.open, "after clicking item1: open?").to.be.false;
      opened = oneEvent(root, "sp-opened");
      root.click();
      await opened;
      expect(root.open, "after reopening: open?").to.be.true;
      closed = oneEvent(root, "sp-closed");
      itemB.click();
      root.close();
      await closed;
      expect(item1.selected, "after clicking itemB: item1 selected?").to.be.false;
      expect(item2.selected, "after clicking itemB: item2 selected?").to.be.false;
      expect(itemA.selected, "after clicking itemB: itemA selected?").to.be.false;
      expect(itemB.selected, "after clicking itemB: itemB selected?").to.be.true;
      expect(root.open, "after clicking itemB: open?").to.be.false;
      opened = oneEvent(root, "sp-opened");
      root.click();
      await opened;
      expect(root.open, "after reopening: open?").to.be.true;
      closed = oneEvent(root, "sp-closed");
      itemB.click();
      await closed;
      expect(item2.selected, "after clicking item2: item2 selected?").to.be.false;
      expect(itemB.selected, "after clicking item2: itemB selected?").to.be.true;
      expect(root.open, "after clicking item2: open?").to.be.false;
    });
    it("shows tooltip", async function() {
      const openSpy = spy();
      const el = await fixture(
        tooltipDescriptionAndPlacement(
          tooltipDescriptionAndPlacement.args
        )
      );
      const tooltip = el.querySelector("sp-tooltip");
      const rect = el.getBoundingClientRect();
      tooltip.addEventListener("sp-opened", () => openSpy());
      await elementUpdated(tooltip);
      await nextFrame();
      await nextFrame();
      const overlay = tooltip.shadowRoot.querySelector(
        "sp-overlay"
      );
      await elementUpdated(overlay);
      expect(overlay.triggerElement === el.button).to.be.true;
      let open = oneEvent(tooltip, "sp-opened");
      await sendMouse({
        steps: [
          {
            position: [
              rect.left + rect.width / 2,
              rect.top + rect.height / 2
            ],
            type: "move"
          }
        ]
      });
      await open;
      expect(tooltip.open).to.be.true;
      const close = oneEvent(tooltip, "sp-closed");
      open = oneEvent(el, "sp-opened");
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
      await close;
      await open;
      expect(tooltip.open, "tooltip still open").to.be.false;
      expect(el.open, "menu not open").to.be.true;
      const menu = el.optionsMenu;
      const menuRect = menu.getBoundingClientRect();
      await sendMouse({
        steps: [
          {
            position: [
              menuRect.left + menuRect.width / 2,
              menuRect.top + menuRect.height / 2
            ],
            type: "move"
          }
        ]
      });
      await aTimeout(150);
      expect(openSpy.callCount).to.equal(1);
    });
    it("opens, then closes, on subsequent clicks", async function() {
      const el = await actionMenuFixture();
      const rect = el.getBoundingClientRect();
      await nextFrame();
      await nextFrame();
      const open = oneEvent(el, "sp-opened");
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
      await open;
      expect(el.open).to.be.true;
      await aTimeout(50);
      expect(el.open).to.be.true;
      const close = oneEvent(el, "sp-closed");
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
      await close;
      expect(el.open).to.be.false;
      await aTimeout(50);
      expect(el.open).to.be.false;
    });
    it("should handle scroll event", async () => {
      const renderMenuItems = () => Array.from(
        { length: 30 },
        (_, i) => html`
                        <sp-menu-item style="width: 100%;">
                            Menu Item ${i + 1}
                        </sp-menu-item>
                    `
      );
      const handleActionMenuScroll = spy();
      const el = await fixture(html`
                <sp-action-menu @scroll=${() => handleActionMenuScroll()}>
                    <span slot="label">More Actions</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select Inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and Mask...</sp-menu-item>
                    ${renderMenuItems()}
                </sp-action-menu>
            `);
      await elementUpdated(el);
      expect(handleActionMenuScroll.called).to.be.false;
      el.dispatchEvent(
        new Event("scroll", { cancelable: true, composed: true })
      );
      expect(handleActionMenuScroll).to.have.been.called;
    });
  });
};
//# sourceMappingURL=index.js.map
