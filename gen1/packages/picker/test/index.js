"use strict";
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  fixtureCleanup,
  html,
  nextFrame,
  oneEvent,
  waitUntil
} from "@open-wc/testing";
import {
  a11ySnapshot,
  findAccessibilityNode,
  resetMouse,
  sendKeys,
  setViewport
} from "@web/test-runner-commands";
import { spy, stub } from "sinon";
import { SAFARI_FOCUS_RING_CLASS } from "@spectrum-web-components/picker/src/InteractionController.js";
import { isWebKit } from "@spectrum-web-components/shared";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/dialog/sp-dialog.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-copy.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js";
import "@spectrum-web-components/menu/sp-menu-group.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import "@spectrum-web-components/picker/sp-picker.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/shared/src/focus-visible.js";
import "@spectrum-web-components/theme/src/themes.js";
import { sendMouse } from "../../../test/plugins/browser.js";
import {
  arrowDownEvent,
  arrowRightEvent,
  arrowUpEvent,
  fixture as styledFixture,
  ignoreResizeObserverLoopError,
  mouseClickAway,
  mouseClickOn,
  sendShiftTabKey,
  sendTabKey,
  testForLitDevWarnings,
  tEvent
} from "../../../test/testing-helpers.js";
import {
  Default,
  disabled,
  dynamicIcons,
  iconsOnly,
  noVisibleLabel,
  slottedLabel,
  tooltip
} from "../stories/picker.stories.js";
import { M as pending } from "../stories/picker-pending.stories.js";
ignoreResizeObserverLoopError(before, after);
const isMenuActiveElement = function(el) {
  var _a;
  return ((_a = document.activeElement) == null ? void 0 : _a.tagName) === "SP-MENU-ITEM" && el.contains(document.activeElement);
};
const waitForFocusEvent = async (focusPromise, expectedElement, timeoutMs = 3e3) => {
  try {
    await Promise.race([
      focusPromise,
      new Promise(
        (_, reject) => setTimeout(() => reject(new Error("Focus event timed out")), timeoutMs)
      )
    ]);
  } catch (error) {
    console.warn(
      "Focus event timed out. Falling back to manual verification due to inconsistent focus events:",
      error instanceof Error ? error.message : "Unknown error"
    );
    await waitUntil(
      () => document.activeElement === expectedElement,
      `Expected element should be focused`,
      { timeout: 2e3 }
    );
  }
};
const waitForElementReady = async (element) => {
  await elementUpdated(element);
  await nextFrame();
  if (element.shadowRoot) {
    await nextFrame();
  }
};
const openPickerAndWait = async (picker) => {
  const opened = oneEvent(picker, "sp-opened");
  picker.open = true;
  await opened;
  await waitForElementReady(picker);
  await waitUntil(() => picker.open === true, "Picker should be open");
};
export function runPickerTests() {
  let el;
  const pickerFixture = async () => {
    const test = await fixture(html`
      <sp-theme scale="medium" color="light" system="spectrum">
        <sp-field-label for="picker">Where do you live?</sp-field-label>
        <sp-picker id="picker" label="Where do you live?">
          <sp-menu-item>Deselect</sp-menu-item>
          <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
          <sp-menu-item>Feather...</sp-menu-item>
          <sp-menu-item>Select and Mask...</sp-menu-item>
          <sp-menu-item>Save Selection</sp-menu-item>
          <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-picker>
      </sp-theme>
    `);
    return test.querySelector("sp-picker");
  };
  describe("accessibility model", () => {
    it('accessible with "<sp-field-label>"', async function() {
      const test = await fixture(html`
        <div>
          ${Default({
        onChange: () => {
          return;
        }
      })}
        </div>
      `);
      const el2 = test.querySelector("sp-picker");
      let snapshot = await a11ySnapshot({});
      expect(
        findAccessibilityNode(
          snapshot,
          (node) => node.name === "Select a Country with a very long label, too long, in fact Where do you live?"
        ),
        "`name` is the label text"
      ).to.not.be.null;
      el2.value = "option-2";
      await elementUpdated(el2);
      await nextFrame();
      await nextFrame();
      snapshot = await a11ySnapshot({});
      expect(
        findAccessibilityNode(
          snapshot,
          (node) => node.name === "Select Inverse Where do you live?"
        ),
        "`name` is the the selected item text plus the label text"
      ).to.not.be.null;
    });
    it('accessible with "label" attribute', async () => {
      const test = await fixture(html`
        <div>
          ${noVisibleLabel({
        onChange: () => {
          return;
        }
      })}
        </div>
      `);
      const el2 = test.querySelector("sp-picker");
      let snapshot = await a11ySnapshot({});
      expect(
        findAccessibilityNode(
          snapshot,
          (node) => node.name === "Where do you live?"
        ),
        "`name` is the label text"
      ).to.not.be.null;
      el2.value = "option-2";
      await elementUpdated(el2);
      await nextFrame();
      await nextFrame();
      snapshot = await a11ySnapshot({});
      expect(
        findAccessibilityNode(
          snapshot,
          (node) => node.name === "Select Inverse Where do you live?"
        ),
        "`name` is the the selected item text plus the label text"
      ).to.not.be.null;
    });
    it('accessible with "label" slot', async function() {
      const test = await fixture(html`
        <div>
          ${slottedLabel({
        onChange: () => {
          return;
        }
      })}
        </div>
      `);
      const el2 = test.querySelector("sp-picker");
      await elementUpdated(el2);
      await nextFrame();
      await nextFrame();
      let snapshot = await a11ySnapshot({});
      let name = "Where do you live?";
      let node = findAccessibilityNode(
        snapshot,
        (node2) => node2.name === name
      );
      expect(
        node,
        `node not available: ${JSON.stringify(snapshot, null, "  ")}`
      ).to.not.be.null;
      el2.value = "option-2";
      await elementUpdated(el2);
      await nextFrame();
      await nextFrame();
      snapshot = await a11ySnapshot({});
      name = "Select Inverse Where do you live?";
      node = findAccessibilityNode(
        snapshot,
        (node2) => node2.name === name
      );
      expect(
        node,
        `node not available: ${JSON.stringify(snapshot, null, "  ")}`
      ).to.not.be.null;
    });
  });
  describe("standard", () => {
    beforeEach(async () => {
      el = await pickerFixture();
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
    });
    it("loads accessibly", async () => {
      await expect(el).to.be.accessible();
    });
    it("closes accessibly", async () => {
      const focused = oneEvent(el, "focus");
      el.focus();
      await waitForFocusEvent(focused, el);
      await waitForElementReady(el);
      expect(el.shadowRoot.activeElement).to.equal(el.button);
      await openPickerAndWait(el);
      expect(el.open, "open?").to.be.true;
      const accessibleCloseButton = el.shadowRoot.querySelector(
        ".visually-hidden button"
      );
      expect(accessibleCloseButton).to.have.attribute("aria-label", "Dismiss");
      const closed2 = oneEvent(el, "sp-closed");
      accessibleCloseButton.click();
      await closed2;
      await waitForElementReady(el);
      expect(el.open, "open?").to.be.false;
      expect(el.shadowRoot.activeElement).to.equal(el.button);
      expect(document.activeElement).to.eq(el);
    });
    it("accepts new selected item content", async () => {
      await nextFrame();
      await nextFrame();
      const option2 = el.querySelector('[value="option-2"');
      el.value = "option-2";
      await elementUpdated(option2);
      await elementUpdated(el);
      await aTimeout(150);
      expect(el.value).to.equal("option-2");
      expect((el.button.textContent || "").trim()).to.include("Select Inverse");
      let itemUpdated = oneEvent(el, "sp-menu-item-added-or-updated");
      const newLabel1 = "Invert Selection";
      option2.innerHTML = newLabel1;
      await itemUpdated;
      await elementUpdated(el);
      expect(el.value).to.equal("option-2");
      expect((el.button.textContent || "").trim()).to.include(newLabel1);
      itemUpdated = oneEvent(el, "sp-menu-item-added-or-updated");
      const newLabel2 = "Other option";
      option2.childNodes[0].textContent = newLabel2;
      await itemUpdated;
      await elementUpdated(el);
      expect(el.value).to.equal("option-2");
      expect((el.button.textContent || "").trim()).to.include(newLabel2);
    });
    it("accepts new selected item content when open", async () => {
      await nextFrame();
      const option2 = el.querySelector('[value="option-2"');
      el.value = "option-2";
      await elementUpdated(el);
      await aTimeout(150);
      expect(el.value).to.equal("option-2");
      expect((el.button.textContent || "").trim()).to.include("Select Inverse");
      const opened = oneEvent(el, "sp-opened");
      el.open = true;
      await opened;
      const itemUpdated = oneEvent(option2, "sp-menu-item-added-or-updated");
      option2.innerHTML = "Invert Selection";
      await itemUpdated;
      await elementUpdated(el);
      await aTimeout(150);
      expect(el.value).to.equal("option-2");
      expect((el.button.textContent || "").trim()).to.include(
        "Invert Selection"
      );
    });
    it("unsets value when children removed", async () => {
      await nextFrame();
      el.value = "option-2";
      await elementUpdated(el);
      await aTimeout(150);
      expect(el.value).to.equal("option-2");
      expect((el.button.textContent || "").trim()).to.include("Select Inverse");
      const items = el.querySelectorAll("sp-menu-item");
      items.forEach((item) => {
        item.remove();
      });
      await elementUpdated(el);
      await nextFrame();
      await aTimeout(150);
      expect(
        el.optionsMenu.childItems.length
      ).to.equal(0);
      if ("showPopover" in document.createElement("div")) {
        return;
      }
      expect(el.value).to.equal("");
      expect((el.button.textContent || "").trim()).to.not.include(
        "Select Inverse"
      );
    });
    it("accepts a new item and value at the same time", async () => {
      el.value = "option-2";
      await elementUpdated(el);
      expect(el.value).to.equal("option-2");
      const item = document.createElement("sp-menu-item");
      item.value = "option-new";
      item.textContent = "New Option";
      el.append(item);
      await elementUpdated(el);
      el.value = "option-new";
      await elementUpdated(el);
      expect(el.value).to.equal("option-new");
    });
    it("accepts a new item that can be selected", async () => {
      el.value = "option-2";
      await elementUpdated(el);
      expect(el.value).to.equal("option-2");
      const item = document.createElement("sp-menu-item");
      item.value = "option-new";
      item.textContent = "New Option";
      el.append(item);
      await nextFrame();
      await elementUpdated(el);
      let opened = oneEvent(el, "sp-opened");
      el.open = true;
      await opened;
      await nextFrame();
      const close = oneEvent(el, "sp-closed");
      item.click();
      await close;
      await nextFrame();
      expect(el.value, "first time").to.equal("option-new");
      opened = oneEvent(el, "sp-opened");
      el.open = true;
      await opened;
      await nextFrame();
      expect(el.value, "second time").to.equal("option-new");
    });
    it("shows label when menu-items are added after value is set", async () => {
      var _a;
      const pickerWithoutItems = await fixture(html`
        <sp-theme scale="medium" color="light" system="spectrum">
          <sp-field-label for="picker-delayed">Test Picker</sp-field-label>
          <sp-picker
            id="picker-delayed"
            label="Test Picker"
            value="item-2"
          ></sp-picker>
        </sp-theme>
      `);
      const delayedPicker = pickerWithoutItems.querySelector(
        "sp-picker"
      );
      await elementUpdated(delayedPicker);
      await nextFrame();
      expect(delayedPicker.value).to.equal("item-2");
      expect((delayedPicker.button.textContent || "").trim()).to.not.include(
        "Finish"
      );
      const itemNoValue1 = document.createElement("sp-menu-item");
      itemNoValue1.textContent = "Incomplete 1";
      delayedPicker.appendChild(itemNoValue1);
      const itemNoValue2 = document.createElement("sp-menu-item");
      itemNoValue2.textContent = "Incomplete 2";
      delayedPicker.appendChild(itemNoValue2);
      await elementUpdated(delayedPicker);
      await nextFrame();
      expect(delayedPicker.value).to.equal("item-2");
      expect((delayedPicker.button.textContent || "").trim()).to.not.include(
        "Finish"
      );
      itemNoValue1.remove();
      itemNoValue2.remove();
      await elementUpdated(delayedPicker);
      const item1 = document.createElement("sp-menu-item");
      item1.value = "item-1";
      item1.textContent = "Save";
      delayedPicker.appendChild(item1);
      const item2 = document.createElement("sp-menu-item");
      item2.value = "item-2";
      item2.textContent = "Finish";
      delayedPicker.appendChild(item2);
      const item3 = document.createElement("sp-menu-item");
      item3.value = "item-3";
      item3.textContent = "Review";
      delayedPicker.appendChild(item3);
      await elementUpdated(delayedPicker);
      await nextFrame();
      await nextFrame();
      await aTimeout(150);
      expect(delayedPicker.value).to.equal("item-2");
      expect((delayedPicker.button.textContent || "").trim()).to.include(
        "Finish"
      );
      expect((_a = delayedPicker.selectedItem) == null ? void 0 : _a.value).to.equal("item-2");
    });
    it('manages its "name" value in the accessibility tree', async () => {
      await nextFrame();
      let snapshot = await a11ySnapshot({});
      expect(
        findAccessibilityNode(
          snapshot,
          (node) => node.name === "Where do you live?"
        ),
        "`name` is the label text"
      ).to.not.be.null;
      el.value = "option-2";
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
      snapshot = await a11ySnapshot({});
      expect(
        findAccessibilityNode(
          snapshot,
          (node) => node.name === "Select Inverse Where do you live?"
        ),
        "`name` is the selected item text plus the label text"
      ).to.not.be.null;
    });
    it("renders invalid accessibly", async () => {
      el.invalid = true;
      await elementUpdated(el);
      expect(el.invalid).to.be.true;
      await expect(el).to.be.accessible();
    });
    it("renders selection accessibly", async () => {
      el.value = "option-2";
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
    it("opens with visible focus on a menu item on `DownArrow`", async () => {
      const firstItem = el.querySelector("sp-menu-item");
      expect(
        firstItem.focused,
        "first item should not be visually focused before opening"
      ).to.be.false;
      const focused = oneEvent(el, "focus");
      el.focus();
      await waitForFocusEvent(focused, el);
      await waitForElementReady(el);
      const opened = oneEvent(el, "sp-opened");
      await sendKeys({ press: "ArrowDown" });
      await opened;
      await waitForElementReady(el);
      expect(el.open, "picker should be open").to.be.true;
      await waitUntil(
        () => firstItem.focused,
        "first item should be visually focused after opening",
        { timeout: 2e3 }
      );
      expect(
        firstItem.focused,
        "first item should be visually focused after opening"
      ).to.be.true;
      const closed2 = oneEvent(el, "sp-closed");
      await sendKeys({ press: "Escape" });
      await closed2;
      await waitForElementReady(el);
      expect(el.open, "picker should be closed").to.be.false;
      expect(document.activeElement).to.equal(el);
      expect(el.shadowRoot.activeElement).to.equal(el.button);
      await waitUntil(
        () => !firstItem.focused,
        "finally, not visually focused"
      );
      expect(
        firstItem.focused,
        "first item should not be visually focused after closing"
      ).to.be.false;
    });
    it("opens with visible focus on a menu item on `Space`", async function() {
      var _a, _b;
      const firstItem = el.querySelector("sp-menu-item");
      expect(firstItem.focused, "should not be visually focused before opening").to.be.false;
      const focused = oneEvent(el, "focus");
      el.focus();
      await waitForFocusEvent(focused, el);
      await waitForElementReady(el);
      const opened = oneEvent(el, "sp-opened");
      await sendKeys({ press: "Space" });
      await opened;
      await waitForElementReady(el);
      expect(el.open, "open?").to.be.true;
      await waitUntil(
        () => firstItem.focused,
        "should be visually focused after opening",
        { timeout: 2e3 }
      );
      expect(firstItem.focused, "should be visually focused after opening").to.be.true;
      const closed2 = oneEvent(el, "sp-closed");
      await sendKeys({ press: "Escape" });
      await closed2;
      await waitForElementReady(el);
      expect(el.open, "picker should be closed").to.be.false;
      expect(
        document.activeElement === el,
        `focused ${(_a = document.activeElement) == null ? void 0 : _a.localName} instead of back on Picker`
      ).to.be.true;
      expect(
        el.shadowRoot.activeElement === el.button,
        `focused ${(_b = el.shadowRoot.activeElement) == null ? void 0 : _b.localName} instead of back on button`
      ).to.be.true;
      await waitUntil(
        () => !firstItem.focused,
        "finally, not visually focused"
      );
      expect(
        firstItem.focused,
        "first item should not be visually focused after closing"
      ).to.be.false;
    });
    it("opens, on click, with visible focus NOT on a menu item", async () => {
      await nextFrame();
      await nextFrame();
      const firstItem = el.querySelector("sp-menu-item");
      expect(firstItem.focused, "not visually focused").to.be.false;
      const opened = oneEvent(el, "sp-opened");
      await mouseClickOn(el.button);
      await opened;
      expect(el.open, "open?").to.be.true;
      expect(firstItem.focused, "firstItem focused after click?").to.be.false;
      expect(firstItem).to.not.equal(document.activeElement);
    });
    it("opens and selects in a single pointer button interaction", async () => {
      await nextFrame();
      await nextFrame();
      const thirdItem = el.querySelector(
        "sp-menu-item:nth-of-type(3)"
      );
      expect(el.value).to.not.equal(thirdItem.value);
      const opened = oneEvent(el, "sp-opened");
      await sendMouse([
        {
          type: "move",
          position: [el.button]
        },
        {
          type: "down"
        }
      ]);
      await opened;
      const closed2 = oneEvent(el, "sp-closed");
      await sendMouse([
        {
          type: "move",
          position: [thirdItem]
        },
        {
          type: "up"
        }
      ]);
      await closed2;
      expect(el.open, "open?").to.be.false;
      expect(el.value).to.equal(thirdItem.value);
    });
    it("opens/closes multiple times", async () => {
      expect(!el.open, "starts closed").to.be.true;
      const waitForOpenState = async (expectedState, description) => {
        await aTimeout(140);
        await mouseClickOn(el.button);
        await waitUntil(() => el.open === expectedState, description);
        await elementUpdated(el);
        expect(el.open, description).to.equal(expectedState);
      };
      await waitForOpenState(true, "first click opens");
      await waitForOpenState(false, "second click closes");
      await waitForOpenState(true, "third click opens");
      await waitForOpenState(false, "fourth click closes");
    });
    it("closes when becoming disabled", async () => {
      expect(el.open, "open before click?").to.be.false;
      el.click();
      await elementUpdated(el);
      expect(el.open, "open after click?").to.be.true;
      el.disabled = true;
      await closed;
      expect(el.open, "open after disabled?").to.be.false;
    });
    it("closes when clicking away", async () => {
      el.id = "closing";
      const other = document.createElement("div");
      document.body.append(other);
      await elementUpdated(el);
      expect(el.open, "open?").to.be.false;
      const opened = oneEvent(el, "sp-opened");
      el.click();
      await opened;
      await elementUpdated(el);
      expect(el.open, "open?").to.be.true;
      const closed2 = oneEvent(el, "sp-closed");
      other.click();
      closed2;
      await elementUpdated(el);
      other.remove();
    });
    it("selects", async () => {
      var _a, _b;
      const secondItem = el.querySelector(
        "sp-menu-item:nth-of-type(2)"
      );
      const opened = oneEvent(el, "sp-opened");
      el.click();
      await opened;
      expect(el.open, "open?").to.be.true;
      expect((_a = el.selectedItem) == null ? void 0 : _a.itemText).to.be.undefined;
      expect(el.value).to.equal("");
      const closed2 = oneEvent(el, "sp-closed");
      secondItem.click();
      await closed2;
      expect(el.open, "open?").to.be.false;
      expect((_b = el.selectedItem) == null ? void 0 : _b.itemText).to.equal("Select Inverse");
      expect(el.value).to.equal("option-2");
    });
    it("re-selects", async () => {
      var _a, _b, _c, _d;
      const firstItem = el.querySelector(
        "sp-menu-item:nth-of-type(1)"
      );
      const secondItem = el.querySelector(
        "sp-menu-item:nth-of-type(2)"
      );
      let opened = oneEvent(el, "sp-opened");
      el.click();
      await opened;
      expect(el.open, "open?").to.be.true;
      expect((_a = el.selectedItem) == null ? void 0 : _a.itemText).to.be.undefined;
      expect(el.value).to.equal("");
      let closed2 = oneEvent(el, "sp-closed");
      secondItem.click();
      await closed2;
      expect(el.open, "open?").to.be.false;
      expect((_b = el.selectedItem) == null ? void 0 : _b.itemText).to.equal("Select Inverse");
      expect(el.value).to.equal("option-2");
      opened = oneEvent(el, "sp-opened");
      el.click();
      await opened;
      expect(el.open, "open?").to.be.true;
      expect((_c = el.selectedItem) == null ? void 0 : _c.itemText).to.equal("Select Inverse");
      expect(el.value).to.equal("option-2");
      closed2 = oneEvent(el, "sp-closed");
      firstItem.click();
      await closed2;
      expect(el.open, "open?").to.be.false;
      expect((_d = el.selectedItem) == null ? void 0 : _d.itemText).to.equal("Deselect");
      expect(el.value).to.equal("Deselect");
    });
    it("dispatches bubbling and composed events", async () => {
      const changeSpy = spy();
      const parent = el.parentElement;
      parent.shadowRoot.append(el);
      const secondItem = el.querySelector(
        "sp-menu-item:nth-of-type(2)"
      );
      parent.addEventListener("change", () => changeSpy());
      expect(el.value).to.equal("");
      const opened = oneEvent(el, "sp-opened");
      el.open = true;
      await opened;
      const closed2 = oneEvent(el, "sp-closed");
      secondItem.click();
      await closed2;
      expect(el.value).to.equal(secondItem.value);
      expect(changeSpy.calledOnce).to.be.true;
    });
    it("can have selection prevented", async () => {
      var _a;
      const preventChangeSpy = spy();
      const secondItem = el.querySelector(
        "sp-menu-item:nth-of-type(2)"
      );
      const opened = oneEvent(el, "sp-opened");
      el.click();
      await opened;
      expect(el.open, "open?").to.be.true;
      expect((_a = el.selectedItem) == null ? void 0 : _a.itemText).to.be.undefined;
      expect(el.value).to.equal("");
      expect(secondItem.selected).to.be.false;
      el.addEventListener("change", (event) => {
        event.preventDefault();
        preventChangeSpy();
      });
      const changed = oneEvent(el, "change");
      secondItem.click();
      await changed;
      await elementUpdated(el);
      expect(preventChangeSpy.calledOnce, preventChangeSpy.callCount.toString()).to.be.true;
      expect(secondItem.selected, "selection prevented").to.be.false;
      expect(el.open, "open?").to.be.true;
    });
    it("should return focus after click", async () => {
      var _a;
      const input = document.createElement("input");
      document.body.append(input);
      await elementUpdated(el);
      const secondItem = el.querySelector(
        "sp-menu-item:nth-of-type(2)"
      );
      const opened = oneEvent(el, "sp-opened");
      await mouseClickOn(el.button);
      await opened;
      await elementUpdated(el);
      expect(el.open, "open?").to.be.true;
      expect((_a = el.selectedItem) == null ? void 0 : _a.itemText).to.be.undefined;
      expect(el.value).to.equal("");
      expect(secondItem.selected).to.be.false;
      const closed2 = oneEvent(el, "sp-closed");
      secondItem.click();
      await closed2;
      await waitUntil(() => document.activeElement === el, "focused", {
        timeout: 300
      });
      expect(el.open, "open?").to.be.false;
      expect(el.value, "value changed").to.equal("option-2");
      expect(secondItem.selected, "selected changed").to.be.true;
      input.remove();
    });
    it("should throw focus after `change`", async () => {
      var _a;
      const input = document.createElement("input");
      document.body.append(input);
      await elementUpdated(el);
      const secondItem = el.querySelector(
        "sp-menu-item:nth-of-type(2)"
      );
      const opened = oneEvent(el, "sp-opened");
      el.click();
      await opened;
      await elementUpdated(el);
      expect(el.open, "open?").to.be.true;
      expect((_a = el.selectedItem) == null ? void 0 : _a.itemText).to.be.undefined;
      expect(el.value).to.equal("");
      expect(secondItem.selected).to.be.false;
      el.addEventListener("change", () => {
        input.focus();
      });
      secondItem.click();
      await waitUntil(() => document.activeElement === input, "focus throw", {
        timeout: 300
      });
      expect(el.open, "open?").to.be.false;
      expect(el.value, "value changed").to.equal("option-2");
      expect(secondItem.selected, "selected changed").to.be.true;
      input.remove();
    });
    it("opens on ArrowUp", async () => {
      const button = el.button;
      el.focus();
      await elementUpdated(el);
      expect(el.open, "inially closed").to.be.false;
      button.dispatchEvent(tEvent());
      await elementUpdated(el);
      expect(el.open, "still closed").to.be.false;
      const opened = oneEvent(el, "sp-opened");
      button.dispatchEvent(arrowUpEvent());
      await elementUpdated(el);
      expect(el.open, "open by ArrowUp").to.be.true;
      await opened;
      const closed2 = oneEvent(el, "sp-closed");
      await sendKeys({ press: "Escape" });
      await closed2;
      expect(el.open, "should be closed after escape key is pressed").to.be.false;
    });
    it("opens on ArrowDown", async () => {
      var _a, _b;
      const firstItem = el.querySelector(
        "sp-menu-item:nth-of-type(1)"
      );
      const button = el.button;
      el.focus();
      await elementUpdated(el);
      expect(el.open, "inially closed").to.be.false;
      const opened = oneEvent(el, "sp-opened");
      button.dispatchEvent(arrowDownEvent());
      await opened;
      await elementUpdated(el);
      expect(el.open, "open by ArrowDown").to.be.true;
      expect((_a = el.selectedItem) == null ? void 0 : _a.itemText).to.be.undefined;
      expect(el.value).to.equal("");
      const closed2 = oneEvent(el, "sp-closed");
      firstItem.click();
      await closed2;
      await elementUpdated(el);
      expect(el.open, "open?").to.be.false;
      expect((_b = el.selectedItem) == null ? void 0 : _b.itemText).to.equal("Deselect");
      expect(el.value).to.equal("Deselect");
    });
    it("quick selects on ArrowLeft/Right", async () => {
      const selectionSpy = spy();
      el.addEventListener("change", (event) => {
        const { value } = event.target;
        selectionSpy(value);
      });
      el.focus();
      await elementUpdated(el);
      await waitUntil(
        () => el.menuItems.length === 6
      );
      await sendKeys({ press: "ArrowLeft" });
      await elementUpdated(el);
      expect(
        selectionSpy.callCount,
        `selectionSpy.callCount: ${selectionSpy.callCount}`
      ).to.equal(1);
      expect(selectionSpy.calledWith("Deselected"));
      await sendKeys({ press: "ArrowLeft" });
      await elementUpdated(el);
      expect(
        selectionSpy.callCount,
        `selectionSpy.callCount: ${selectionSpy.callCount}`
      ).to.equal(1);
      await sendKeys({ press: "ArrowRight" });
      await nextFrame();
      await nextFrame();
      expect(selectionSpy.calledWith("option-2"), "option-2");
      await sendKeys({ press: "ArrowRight" });
      await nextFrame();
      await nextFrame();
      await sendKeys({ press: "ArrowRight" });
      await nextFrame();
      await nextFrame();
      await sendKeys({ press: "ArrowRight" });
      await nextFrame();
      await nextFrame();
      await sendKeys({ press: "ArrowRight" });
      await nextFrame();
      await nextFrame();
      expect(
        selectionSpy.calledWith("Save Selection"),
        'selectionSpy.calledWith("Save Selection")'
      );
      expect(
        selectionSpy.calledWith("Make Work Path"),
        'selectionSpy.calledWith("Make Work Path")'
      ).to.be.false;
      expect(
        selectionSpy.callCount,
        `selectionSpy.callCount: ${selectionSpy.callCount}`
      ).to.equal(5);
    });
    it("quick selects first item on ArrowRight when no value", async () => {
      await nextFrame();
      const selectionSpy = spy();
      el.addEventListener("change", (event) => {
        const { value } = event.target;
        selectionSpy(value);
      });
      const button = el.button;
      el.focus();
      const changed = oneEvent(el, "change");
      button.dispatchEvent(arrowRightEvent());
      await elementUpdated(el);
      await changed;
      expect(selectionSpy.callCount).to.equal(1);
      expect(selectionSpy.calledWith("Deselected"));
    });
    it("stops propagation of arrow key events but allows other keys to propagate", async () => {
      const keydownSpy = spy();
      const wrapper = await fixture(html`
        <div @keydown=${() => keydownSpy()}>
          <sp-picker
            label="Select"
            value="option-2"
            @change=${(event) => event.preventDefault()}
          >
            <sp-menu-item value="option-1">Option 1</sp-menu-item>
            <sp-menu-item value="option-2">Option 2</sp-menu-item>
            <sp-menu-item value="option-3">Option 3</sp-menu-item>
          </sp-picker>
        </div>
      `);
      const picker = wrapper.querySelector("sp-picker");
      await elementUpdated(picker);
      picker.focus();
      await elementUpdated(picker);
      await sendKeys({ press: "ArrowLeft" });
      await elementUpdated(picker);
      expect(
        keydownSpy.callCount,
        "ArrowLeft event should not propagate"
      ).to.equal(0);
      await sendKeys({ press: "ArrowRight" });
      await elementUpdated(picker);
      expect(
        keydownSpy.callCount,
        "ArrowRight event should not propagate"
      ).to.equal(0);
      const opened = oneEvent(picker, "sp-opened");
      await sendKeys({ press: "Enter" });
      await opened;
      await elementUpdated(picker);
      expect(
        keydownSpy.callCount,
        "Enter event should propagate"
      ).to.be.greaterThan(0);
    });
    it("loads", async () => {
      expect(el).to.not.be.undefined;
    });
    it("closes when focusing away from the menu", async () => {
      const firstItem = el.querySelector("sp-menu-item");
      const thirdItem = el.querySelector(
        "sp-menu-item:nth-of-type(3)"
      );
      const button = el.button;
      const input = document.createElement("input");
      el.insertAdjacentElement("afterend", input);
      el.focus();
      await sendTabKey();
      expect(document.activeElement).to.equal(input);
      await sendShiftTabKey();
      expect(document.activeElement).to.equal(el);
      const opened = oneEvent(el, "sp-opened");
      await sendKeys({ press: "Enter" });
      await opened;
      await elementUpdated(el);
      await waitUntil(
        () => firstItem.focused,
        "The first items should have become focused visually."
      );
      await sendKeys({ press: "ArrowDown" });
      await sendKeys({ press: "ArrowDown" });
      expect(thirdItem.focused, "thirdItem focused?").to.be.true;
      const closed2 = oneEvent(el, "sp-closed");
      button.focus();
      await closed2;
      expect(isMenuActiveElement(el)).to.be.false;
      expect(el.open, "open?").to.be.false;
    });
    it("does not listen to streaming `Enter` keydown", async () => {
      const openSpy = spy();
      const closedSpy = spy();
      el.addEventListener("sp-opened", () => openSpy());
      el.addEventListener("sp-closed", () => closedSpy());
      const firstItem = el.querySelector("sp-menu-item");
      const thirdItem = el.querySelector(
        "sp-menu-item:nth-of-type(3)"
      );
      const input = document.createElement("input");
      el.insertAdjacentElement("afterend", input);
      el.focus();
      await sendTabKey();
      expect(document.activeElement).to.equal(input);
      await sendKeys({ press: "Shift+Tab" });
      expect(document.activeElement).to.equal(el);
      const opened = oneEvent(el, "sp-opened");
      await sendKeys({ down: "Enter" });
      await opened;
      await aTimeout(300);
      expect(openSpy.callCount).to.equal(1);
      await sendKeys({ up: "Enter" });
      await waitUntil(
        () => firstItem.focused,
        "The first items should have become focused visually."
      );
      await sendKeys({ press: "ArrowDown" });
      await sendKeys({ press: "ArrowDown" });
      expect(thirdItem.focused, "thirdItem focused?").to.be.true;
      const closed2 = oneEvent(el, "sp-closed");
      await sendKeys({ down: "Enter" });
      await closed2;
      await aTimeout(300);
      expect(el.value).to.equal(thirdItem.value);
      expect(openSpy.callCount).to.equal(1);
      expect(closedSpy.callCount).to.equal(1);
      await sendKeys({ up: "Enter" });
    });
    it("allows tabbing to close", async () => {
      const input = document.createElement("input");
      el.insertAdjacentElement("afterend", input);
      const opened = oneEvent(el, "sp-opened");
      el.open = true;
      await opened;
      await nextFrame();
      expect(el.open, "open?").to.be.true;
      el.focus();
      const closed2 = oneEvent(el, "sp-closed");
      await sendTabKey();
      await closed2;
      expect(el.open, "closes").to.be.false;
    });
    describe("tab order", () => {
      let input1;
      let input2;
      beforeEach(() => {
        const surroundingInput = () => {
          const input = document.createElement("input");
          input.type = "text";
          input.tabIndex = 0;
          return input;
        };
        input1 = surroundingInput();
        input2 = surroundingInput();
        el.insertAdjacentElement("beforebegin", input1);
        el.insertAdjacentElement("afterend", input2);
      });
      afterEach(() => {
        input1.remove();
        input2.remove();
        fixtureCleanup();
        resetMouse();
      });
      it("tabs forward through the element", async function() {
        this.timeout(1e4);
        let focused;
        input1.focus();
        await nextFrame();
        await elementUpdated(el);
        expect(document.activeElement === input1, "focuses input 1").to.be.true;
        focused = oneEvent(el, "focus");
        await sendTabKey();
        try {
          await Promise.race([
            focused,
            new Promise(
              (_, reject) => setTimeout(() => reject(new Error("Focus event timed out")), 5e3)
            )
          ]);
        } catch (error) {
          console.error("Focus event timed out:", error);
          el.focus();
          await nextFrame();
          expect(
            document.activeElement === el,
            "element focused manually after timeout"
          ).to.be.true;
        }
        expect(el.focused, "focused").to.be.true;
        expect(!el.open, "closed").to.be.true;
        expect(document.activeElement === el, "focuses el").to.be.true;
        focused = oneEvent(input2, "focus");
        await sendTabKey();
        await focused;
        expect(document.activeElement === input2, "focuses input 2").to.be.true;
      });
      it("shift+tabs backwards through the element", async () => {
        input2.focus();
        await nextFrame();
        await elementUpdated(el);
        expect(document.activeElement, "focuses input 2").to.equal(input2);
        let focused = oneEvent(el, "focus");
        await sendShiftTabKey();
        await waitForFocusEvent(focused, el);
        expect(el.focused, "focused").to.be.true;
        expect(el.open, "closed").to.be.false;
        expect(document.activeElement, "focuses el").to.equal(el);
        focused = oneEvent(input1, "focus");
        await sendShiftTabKey();
        await waitForFocusEvent(focused, input1);
        await elementUpdated(el);
        expect(document.activeElement).to.equal(input1);
      });
      it("can close and immediately tab to the next tab stop", async () => {
        el.focus();
        expect(document.activeElement, "focuses el").to.equal(el);
        const opened = oneEvent(el, "sp-opened");
        await sendKeys({ press: "ArrowUp" });
        await opened;
        expect(el.open, "opened").to.be.true;
        const closed2 = oneEvent(el, "sp-closed");
        el.close();
        await closed2;
        expect(el.open, "open?").to.be.false;
        expect(document.activeElement).to.equal(el);
        await sendTabKey();
        expect(el.open, "open?").to.be.false;
        expect(document.activeElement).to.equal(input2);
      });
      it("can close and immediate shift+tab to the previous tab stop", async () => {
        el.focus();
        await nextFrame();
        expect(document.activeElement === el, "focuses el").to.be.true;
        const opened = oneEvent(el, "sp-opened");
        await sendKeys({ press: "ArrowUp" });
        await opened;
        expect(el.open, "opened").to.be.true;
        const closed2 = oneEvent(el, "sp-closed");
        el.close();
        await closed2;
        expect(el.open, "open?").to.be.false;
        expect(document.activeElement).to.equal(el);
        const focused = oneEvent(input1, "focus");
        await sendShiftTabKey();
        await focused;
        expect(el.open, "open?").to.be.false;
        expect(document.activeElement === input1, "input has focus").to.be.true;
      });
    });
    it("does not open when [readonly]", async () => {
      el.readonly = true;
      await elementUpdated(el);
      el.click();
      await elementUpdated(el);
      expect(el.open, "open?").to.be.false;
    });
    it("manages focus-ring styles", async () => {
      if (!isWebKit()) {
        return;
      }
      el.isMobile.matches = true;
      el.bindEvents();
      await setViewport({ width: 360, height: 640 });
      await nextFrame();
      let opened = oneEvent(el, "sp-opened");
      await mouseClickOn(el.button);
      await opened;
      const tray = el.shadowRoot.querySelector("sp-tray");
      expect(tray, "has tray").to.not.be.null;
      let closed2 = oneEvent(el, "sp-closed");
      const firstItem = el.querySelector("sp-menu-item");
      firstItem.click();
      await closed2;
      expect(el.open, "open?").to.be.false;
      const button = el.shadowRoot.querySelector(
        "#button"
      );
      expect(button, "has button").to.not.be.null;
      expect(
        button.classList.contains(SAFARI_FOCUS_RING_CLASS),
        "button has focus ring?"
      ).to.be.true;
      expect(document.activeElement).to.equal(el);
      await mouseClickAway(el.button);
      expect(document.activeElement).not.to.equal(el);
      opened = oneEvent(el, "sp-opened");
      el.focus();
      await sendKeys({ press: "Enter" });
      await opened;
      expect(firstItem.focused, "firstItem focused?").to.be.true;
      closed2 = oneEvent(el, "sp-closed");
      await sendKeys({ press: "Enter" });
      await closed2;
      await elementUpdated(el);
      expect(el.open, "open?").to.be.false;
      expect(
        document.activeElement,
        "focus should be on picker after keyboard close"
      ).to.equal(el);
      expect(
        el.contains(document.activeElement) || el === document.activeElement,
        "focus should remain within picker component after keyboard close"
      ).to.be.true;
      await mouseClickAway(el.button);
      expect(document.activeElement).not.to.equal(el);
      expect(
        button.classList.contains(SAFARI_FOCUS_RING_CLASS),
        "has focus ring again?"
      ).to.be.false;
    });
    it("does not close on document scroll", async () => {
      const el2 = await fixture(html`
        <div style="height: 200vh; padding: 50vh 0;">
          <sp-picker label="Select an option" placement="right">
            <sp-menu-item value="option-1">Option 1</sp-menu-item>
            <sp-menu-item value="option-2">Option 2</sp-menu-item>
            <sp-menu-item value="option-3">Option 3</sp-menu-item>
          </sp-picker>
        </div>
      `);
      const picker = el2.querySelector("sp-picker");
      await elementUpdated(picker);
      await waitUntil(
        () => picker.updateComplete,
        "Waiting for picker to update"
      );
      expect(picker.open).to.be.false;
      const opened = oneEvent(picker, "sp-opened");
      picker.click();
      await opened;
      expect(picker.open).to.be.true;
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 100;
      }
      await waitUntil(
        () => picker.open === true,
        "Waiting for picker to remain open after scroll"
      );
      expect(picker.open).to.be.true;
    });
    it("ignores component scrolling but handles document scrolling", async () => {
      const scrollSpy = spy(document, "dispatchEvent");
      const el2 = await fixture(html`
        <div style="height: 200vh; padding: 50vh 0;">
          <div
            id="scrollable-container"
            style="height: 100px; overflow-y: auto;"
          >
            <div style="height: 200px;">Scrollable content</div>
          </div>
          <sp-picker label="Select an option" placement="right">
            <sp-menu-item value="option-1">Option 1</sp-menu-item>
            <sp-menu-item value="option-2">Option 2</sp-menu-item>
            <sp-menu-item value="option-3">Option 3</sp-menu-item>
          </sp-picker>
        </div>
      `);
      const picker = el2.querySelector("sp-picker");
      const scrollableContainer = el2.querySelector(
        "#scrollable-container"
      );
      await elementUpdated(picker);
      const opened = oneEvent(picker, "sp-opened");
      picker.click();
      await opened;
      expect(picker.open).to.be.true;
      scrollSpy.resetHistory();
      scrollableContainer.scrollTop = 50;
      await aTimeout(50);
      const componentScrollUpdateCount = scrollSpy.getCalls().filter(
        (call) => call.args[0] instanceof CustomEvent && call.args[0].type === "sp-update-overlays"
      ).length;
      scrollSpy.resetHistory();
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 100;
      }
      await aTimeout(50);
      const documentScrollUpdateCount = scrollSpy.getCalls().filter(
        (call) => call.args[0] instanceof CustomEvent && call.args[0].type === "sp-update-overlays"
      ).length;
      scrollSpy.restore();
      expect(componentScrollUpdateCount).to.equal(0);
      expect(documentScrollUpdateCount).to.be.greaterThan(0);
      expect(picker.open).to.be.true;
    });
  });
  describe("grouped", async () => {
    const groupedFixture = async () => {
      return fixture(html`
        <sp-picker
          quiet
          label="I would like to use Spectrum Web Components"
          value="0"
        >
          <sp-menu-group>
            <span slot="header">Timeline</span>
            <sp-menu-item value="0" id="should-be-selected">
              Immediately
            </sp-menu-item>
            <sp-menu-item value="1">I'm already using them</sp-menu-item>
            <sp-menu-item value="2">Soon</sp-menu-item>
            <sp-menu-item value="3">As part of my next project</sp-menu-item>
            <sp-menu-item value="4">In the future</sp-menu-item>
          </sp-menu-group>
        </sp-picker>
      `);
    };
    beforeEach(async () => {
      el = await groupedFixture();
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
    });
    it("selects the item with a matching value in a group", async () => {
      const item = el.querySelector("#should-be-selected");
      expect(item.selected).to.be.true;
    });
  });
  describe("slotted label", () => {
    const pickerFixture2 = async () => {
      const test = await fixture(html`
        <div>
          <sp-field-label for="picker-slotted">
            Where do you live?
          </sp-field-label>
          <sp-picker id="picker-slotted">
            <span slot="label">
              Select a Country with a very long label, too long in fact
            </span>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
          </sp-picker>
        </div>
      `);
      return test.querySelector("sp-picker");
    };
    beforeEach(async () => {
      el = await pickerFixture2();
      await elementUpdated(el);
      await nextFrame();
    });
    afterEach(async () => {
      if (el && el.open) {
        const closed2 = oneEvent(el, "sp-closed");
        el.open = false;
        await closed2;
      }
    });
    it("loads accessibly w/ slotted label", async () => {
      await expect(el).to.be.accessible();
    });
  });
  describe("Dev mode", () => {
    let consoleWarnStub;
    before(() => {
      window.__swc.verbose = true;
      consoleWarnStub = stub(console, "warn");
    });
    afterEach(() => {
      consoleWarnStub.resetHistory();
    });
    after(async () => {
      window.__swc.verbose = false;
      consoleWarnStub.restore();
      if (el == null ? void 0 : el.open) {
        const closed2 = oneEvent(el, "sp-closed");
        el.open = false;
        await closed2;
      }
    });
    const pickerFixture2 = async () => {
      const test = await fixture(html`
        <div>
          <sp-field-label for="picker-deprecated">
            Where do you live?
          </sp-field-label>
          <sp-picker
            id="picker-deprecated"
            label="Select a Country with a very long label, too long in fact"
          >
            <sp-menu>
              <sp-menu-item>Deselect</sp-menu-item>
              <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
              <sp-menu-item>Feather...</sp-menu-item>
              <sp-menu-item>Select and Mask...</sp-menu-item>
              <sp-menu-item>Save Selection</sp-menu-item>
              <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-menu>
          </sp-picker>
        </div>
      `);
      return test.querySelector("sp-picker");
    };
    it("does not warn in Dev Mode when accessible elements leveraged", async () => {
      const test = await fixture(html`
        <div>
          <sp-field-label for="test">Test label</sp-field-label>
          <sp-picker id="test">
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-item>Save Selection</sp-menu-item>
          </sp-picker>
        </div>
      `);
      el = test.querySelector("sp-picker");
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
      expect(consoleWarnStub.called).to.be.false;
    });
    it("warns in Dev Mode when accessible attributes are not leveraged", async function() {
      this.retries(0);
      el = await fixture(html`
        <sp-picker>
          <sp-menu-item>Feather...</sp-menu-item>
          <sp-menu-item>Select and Mask...</sp-menu-item>
          <sp-menu-item>Save Selection</sp-menu-item>
        </sp-picker>
      `);
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args[0].includes("accessible"),
        "confirm accessibility-centric message"
      ).to.be.true;
      expect(
        spyCall.args[spyCall.args.length - 1],
        "confirm `data` shape"
      ).to.deep.equal({
        data: {
          localName: "sp-picker",
          type: "accessibility",
          level: "default"
        }
      });
    });
    describe("deprecated", () => {
      it("warns in Dev Mode of deprecated `<sp-menu>` usage", async () => {
        el = await pickerFixture2();
        await elementUpdated(el);
        expect(consoleWarnStub.called).to.be.true;
        const spyCall = consoleWarnStub.getCall(0);
        expect(
          spyCall.args[0].includes("<sp-menu>"),
          "confirm <sp-menu>-centric message"
        ).to.be.true;
        expect(
          spyCall.args[spyCall.args.length - 1],
          "confirm `data` shape"
        ).to.deep.equal({
          data: {
            localName: "sp-picker",
            type: "api",
            level: "deprecation"
          }
        });
      });
    });
    describe("Dev mode ignored", () => {
      const { ignoreWarningLocalNames } = window.__swc;
      before(() => {
        window.__swc.ignoreWarningLocalNames = {
          "sp-picker": true
        };
      });
      before(() => {
        window.__swc.ignoreWarningLocalNames = ignoreWarningLocalNames;
      });
      beforeEach(async () => {
        el = await pickerFixture2();
        await elementUpdated(el);
        await nextFrame();
      });
      afterEach(async () => {
        if (el.open) {
          const closed2 = oneEvent(el, "sp-closed");
          el.open = false;
          await closed2;
        }
      });
      it("selects with deprecated syntax", async () => {
        var _a, _b;
        const secondItem = el.querySelector(
          "sp-menu-item:nth-of-type(2)"
        );
        const opened = oneEvent(el, "sp-opened");
        el.click();
        await opened;
        expect(el.open, "open?").to.be.true;
        expect((_a = el.selectedItem) == null ? void 0 : _a.itemText).to.be.undefined;
        expect(el.value).to.equal("");
        const closed2 = oneEvent(el, "sp-closed");
        secondItem.click();
        await closed2;
        expect(el.open, "open?").to.be.false;
        expect((_b = el.selectedItem) == null ? void 0 : _b.itemText).to.equal("Select Inverse");
        expect(el.value).to.equal("option-2");
      });
    });
  });
  testForLitDevWarnings(async () => await pickerFixture());
  it('manages its "name" value in the accessibility tree when [icons-only]', async () => {
    const test = await fixture(html`
      <div>${iconsOnly({})}</div>
    `);
    const el2 = test.querySelector("sp-picker");
    await elementUpdated(el2);
    await nextFrame();
    let snapshot = await a11ySnapshot({});
    expect(
      findAccessibilityNode(
        snapshot,
        (node) => node.name === "Delete Choose an action type..."
      ),
      "`name` is the label text"
    ).to.not.be.null;
    el2.value = "2";
    await elementUpdated(el2);
    await nextFrame();
    await nextFrame();
    expect(el2.value).to.equal("2");
    snapshot = await a11ySnapshot({});
    expect(
      findAccessibilityNode(
        snapshot,
        (node) => node.name === "Copy Choose an action type..."
      ),
      "`name` is the label text plus the selected item text"
    ).to.not.be.null;
  });
  it("toggles between pickers", async () => {
    const el1 = await pickerFixture();
    const el2 = await pickerFixture();
    el1.id = "away";
    el2.id = "other";
    expect(el1.open, "el1 to be closed").to.be.false;
    expect(el2.open, "el2 to be closed").to.be.false;
    const el1open = oneEvent(el1, "sp-opened");
    let el1closed = oneEvent(el1, "sp-closed");
    const el2open = oneEvent(el2, "sp-opened");
    const el2closed = oneEvent(el2, "sp-closed");
    el1.click();
    await el1open;
    expect(el1.open, "click el1: el1 to be open").to.be.true;
    expect(el2.open, "click el1: el2 to be closed").to.be.false;
    el2.click();
    await el1closed;
    await el2open;
    expect(el1.open, "click el2: el1 to be closed").to.be.false;
    expect(el2.open, "click el2: el2 to be open").to.be.true;
    el1.click();
    await el2closed;
    await el1open;
    expect(el2.open, "click el1 again: el2 to be closed").to.be.false;
    expect(el1.open, "click el1 again: el1 to be open").to.be.true;
    el1closed = oneEvent(el1, "sp-closed");
    await sendKeys({ press: "Escape" });
    await el1closed;
    expect(el1.open, "escape key: el1 to be closed").to.be.false;
  });
  it("displays selected item text by default", async () => {
    var _a, _b, _c, _d;
    const el2 = await fixture(html`
      <sp-picker
        value="inverse"
        label="Select a Country with a very long label, too long in fact"
      >
        <sp-menu-item value="deselect">Deselect Text</sp-menu-item>
        <sp-menu-item value="inverse">Select Inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
      </sp-picker>
    `);
    await nextFrame();
    await elementUpdated(el2);
    await waitUntil(
      () => {
        var _a2;
        return ((_a2 = el2.selectedItem) == null ? void 0 : _a2.itemText) === "Select Inverse";
      },
      `Selected Item Text: ${(_a = el2.selectedItem) == null ? void 0 : _a.itemText}`
    );
    const firstItem = el2.querySelector(
      "sp-menu-item:nth-of-type(1)"
    );
    const secondItem = el2.querySelector(
      "sp-menu-item:nth-of-type(2)"
    );
    expect(el2.value).to.equal("inverse");
    expect((_b = el2.selectedItem) == null ? void 0 : _b.itemText).to.equal("Select Inverse");
    el2.focus();
    await elementUpdated(el2);
    expect(
      el2 === document.activeElement,
      `activeElement is ${(_c = document.activeElement) == null ? void 0 : _c.localName}`
    ).to.be.true;
    const opened = oneEvent(el2, "sp-opened");
    await sendKeys({ press: "Enter" });
    await opened;
    expect(
      el2.selectedItem === document.activeElement,
      `activeElement is ${(_d = document.activeElement) == null ? void 0 : _d.localName}`
    ).to.be.true;
    expect(firstItem.focused, 'firstItem NOT "focused"').to.be.false;
    expect(secondItem.focused, 'secondItem "focused"').to.be.true;
  });
  it("resets value when item not available", async () => {
    var _a;
    const el2 = await fixture(html`
      <sp-picker
        value="missing"
        label="Select a Country with a very long label, too long in fact"
      >
        <sp-menu-item value="deselect">Deselect Text</sp-menu-item>
        <sp-menu-item value="inverse">Select Inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
      </sp-picker>
    `);
    await elementUpdated(el2);
    await waitUntil(() => el2.value === "");
    expect(el2.value).to.equal("");
    expect((_a = el2.selectedItem) == null ? void 0 : _a.itemText).to.be.undefined;
  });
  it("allows event listeners on child items", async () => {
    const mouseenterSpy = spy();
    const handleMouseenter = () => mouseenterSpy();
    const el2 = await fixture(html`
      <sp-picker
        label="Select a Country with a very long label, too long in fact"
      >
        <sp-menu-item value="deselect" @mouseenter=${handleMouseenter}>
          Deselect Text
        </sp-menu-item>
      </sp-picker>
    `);
    await elementUpdated(el2);
    const hoverEl = el2.querySelector("sp-menu-item");
    const opened = oneEvent(el2, "sp-opened");
    el2.open = true;
    await opened;
    await elementUpdated(el2);
    expect(el2.open, "open?").to.be.true;
    hoverEl.dispatchEvent(new MouseEvent("mouseenter"));
    await elementUpdated(el2);
    expect(el2.open, "open?").to.be.true;
    const closed2 = oneEvent(el2, "sp-closed");
    el2.open = false;
    await closed2;
    await elementUpdated(el2);
    expect(el2.open, "open?").to.be.false;
    expect(mouseenterSpy.calledOnce).to.be.true;
  });
  it("dispatches events on open/close", async () => {
    const openedSpy = spy();
    const closedSpy = spy();
    const handleOpenedSpy = (event) => openedSpy(event);
    const handleClosedSpy = (event) => closedSpy(event);
    const el2 = await fixture(html`
      <sp-picker
        label="Select a Country with a very long label, too long in fact"
        @sp-opened=${handleOpenedSpy}
        @sp-closed=${handleClosedSpy}
      >
        <sp-menu-item value="deselect">Deselect Text</sp-menu-item>
      </sp-picker>
    `);
    await elementUpdated(el2);
    const opened = oneEvent(el2, "sp-opened");
    el2.open = true;
    await opened;
    await elementUpdated(el2);
    expect(openedSpy.calledOnce).to.be.true;
    expect(closedSpy.calledOnce).to.be.false;
    const closed2 = oneEvent(el2, "sp-closed");
    el2.open = false;
    await closed2;
    await elementUpdated(el2);
    expect(closedSpy.calledOnce).to.be.true;
  });
  it("closes tooltip on button blur", async () => {
    var _a;
    const test = await styledFixture(html`
      <div>${tooltip(tooltip.args)}</div>
    `);
    const el2 = test.querySelector("sp-picker");
    await elementUpdated(el2);
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    input1.id = "input1";
    input2.id = "input2";
    const tooltipEl = el2.querySelector("sp-tooltip");
    el2.insertAdjacentElement("beforebegin", input1);
    el2.insertAdjacentElement("afterend", input2);
    input1.focus();
    expect(document.activeElement).to.equal(input1);
    const tooltipOpened = oneEvent(el2, "sp-opened");
    await sendTabKey();
    await tooltipOpened;
    expect(
      document.activeElement === el2,
      `Actually, ${(_a = document.activeElement) == null ? void 0 : _a.localName}`
    ).to.be.true;
    expect(tooltipEl.open, "tooltipEl open?").to.be.true;
    expect(el2.open, "open?").to.be.false;
    expect(el2.focused, "el focused?").to.be.true;
    const menuOpen = oneEvent(el2, "sp-opened");
    const tooltipClosed = oneEvent(el2, "sp-closed");
    await sendKeys({ press: "ArrowDown" });
    await menuOpen;
    await tooltipClosed;
    const firstOption = el2.querySelector("sp-menu-item");
    expect(
      document.activeElement === firstOption,
      "firstOption is activeElement"
    ).to.be.true;
    expect(tooltipEl.open, "tooltip open").to.be.false;
    expect(el2.open, "menu open").to.be.true;
    const menuClosed = oneEvent(el2, "sp-closed");
    await sendTabKey();
    await menuClosed;
    expect(document.activeElement).not.to.equal(el2);
    expect(tooltipEl.open, "tooltipEl open?").to.be.false;
    expect(el2.open, "open?").to.be.false;
  });
  describe("disabled", function() {
    beforeEach(async function() {
      const test = await fixture(html`
        <div>${disabled(disabled.args)}</div>
      `);
      this.label = test.querySelector("sp-field-label");
      this.el = test.querySelector("sp-picker");
      await elementUpdated(this.el);
    });
    it("does not recieve focus from an `<sp-field-label>`", async function() {
      expect(this.el.disabled, "this.el disabled?").to.be.true;
      expect(this.el.focused, "this.el focused?").to.be.false;
      this.label.click();
      await elementUpdated(this.el);
      expect(this.el.focused, "this.el focused?").to.be.false;
    });
    it("does not open from `click()`", async function() {
      expect(this.el.disabled, "this.el disabled?").to.be.true;
      expect(this.el.focused, "this.el open?").to.be.false;
      this.el.click();
      await elementUpdated(this.el);
      expect(this.el.focused, "this.el open?").to.be.false;
    });
    it("does not open from `sendMouse()`", async function() {
      expect(this.el.disabled, "this.el disabled?").to.be.true;
      expect(this.el.focused, "this.el open?").to.be.false;
      await mouseClickOn(this.el.button);
      await nextFrame();
      await nextFrame();
      await nextFrame();
      await nextFrame();
      expect(this.el.focused, "this.el open?").to.be.false;
    });
  });
  describe("pending", function() {
    beforeEach(async function() {
      const test = await fixture(html`
        <div>${pending({ pending: true })}</div>
      `);
      this.label = test.querySelector("sp-field-label");
      this.el = test.querySelector("sp-picker");
      await elementUpdated(this.el);
    });
    it("receives focus from an `<sp-field-label>`", async function() {
      expect(this.el.focused, "this.el focused?").to.be.false;
      this.label.click();
      await elementUpdated(this.el);
      expect(this.el.focused, "this.el focused?").to.be.true;
    });
    it("does not open from `click()`", async function() {
      expect(this.el.focused, "this.el open?").to.be.false;
      this.el.click();
      await elementUpdated(this.el);
      expect(this.el.focused, "this.el open?").to.be.false;
    });
    it('manages its "name" value in the accessibility tree when [pending]', async () => {
      const snapshot = await a11ySnapshot({});
      expect(
        findAccessibilityNode(snapshot, (node) => {
          return node.name === "Choose your neighborhood Where do you live? Pending";
        })
      ).to.not.be.null;
    });
  });
  describe("dynamic icons", function() {
    beforeEach(async function() {
      const test = await fixture(html`
        <div>${dynamicIcons(dynamicIcons.args)}</div>
      `);
      this.el = test.querySelector("sp-picker");
      await elementUpdated(this.el);
    });
    it.skip("displays the same icon as the selected menu item", async function() {
      await nextFrame();
      await nextFrame();
      await nextFrame();
      await nextFrame();
      const picker = this.el;
      const displayedIconBefore = picker.shadowRoot.querySelector("#icon > sp-icon");
      expect(displayedIconBefore).to.be.ok;
      const displayedIconSrcBefore = displayedIconBefore == null ? void 0 : displayedIconBefore.src;
      expect(displayedIconSrcBefore).to.be.a.string;
      const value = picker.value;
      expect(value).to.be.a.string;
      const selectedItem = picker.querySelector(
        `sp-menu-item[value="${value}"]`
      );
      expect(selectedItem).to.be.ok;
      const selectedItemIcon = selectedItem == null ? void 0 : selectedItem.querySelector("sp-icon");
      expect(selectedItemIcon).to.be.ok;
      const selectedItemIconSrcBefore = selectedItemIcon == null ? void 0 : selectedItemIcon.src;
      expect(selectedItemIconSrcBefore).to.be.a.string;
      expect(displayedIconSrcBefore).to.equal(selectedItemIconSrcBefore);
      const newSrc = "assets/new-icon.svg";
      if (selectedItemIcon) {
        selectedItemIcon.setAttribute("src", newSrc);
      }
      const selectedItemIconSrcAfter = selectedItemIcon == null ? void 0 : selectedItemIcon.src;
      expect(selectedItemIconSrcAfter).to.equal(newSrc);
      await nextFrame();
      await nextFrame();
      await nextFrame();
      const displayedIconAfter = picker.shadowRoot.querySelector("#icon > sp-icon");
      expect(displayedIconAfter).to.be.ok;
      const displayedIconSrcAfter = displayedIconAfter == null ? void 0 : displayedIconAfter.src;
      expect(displayedIconSrcAfter).to.be.a.string;
      expect(displayedIconSrcAfter).to.equal(newSrc);
    });
  });
  it("closes modal overlay immediately when escape is pressed on closed picker in modal", async function() {
    const test = await fixture(html`
      <sp-theme scale="medium" color="light" system="spectrum">
        <overlay-trigger type="modal" id="modal-trigger" placement="top">
          <sp-button
            variant="primary"
            slot="trigger"
            style="position:absolute;bottom:50px"
          >
            Open Modal
          </sp-button>
          <sp-popover slot="click-content" tip>
            <sp-dialog no-divider class="options-popover-content">
              <sp-picker
                label="Select a Country"
                value="item-2"
                id="picker-value"
              >
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item disabled value="item-6">
                  Make work path
                </sp-menu-item>
              </sp-picker>
            </sp-dialog>
          </sp-popover>
        </overlay-trigger>
      </sp-theme>
    `);
    const overlayTrigger = test.querySelector(
      "overlay-trigger"
    );
    const button = test.querySelector("sp-button");
    const picker = test.querySelector("sp-picker");
    button.click();
    await elementUpdated(overlayTrigger);
    await waitUntil(
      () => overlayTrigger.open === "click",
      "overlay should be open"
    );
    picker.focus();
    await elementUpdated(picker);
    expect(picker.open, "picker should be closed initially").to.be.false;
    const modalClosed = oneEvent(overlayTrigger, "sp-closed");
    await sendKeys({ press: "Escape" });
    await modalClosed;
    expect(overlayTrigger.open, "modal overlay should be closed after escape").to.be.undefined;
  });
  it("keeps parent overlay open when scrolling picker menu in modal", async function() {
    const test = await fixture(html`
      <sp-theme scale="medium" color="light" system="spectrum">
        <overlay-trigger type="modal" id="modal-trigger" placement="top">
          <sp-button
            variant="primary"
            slot="trigger"
            style="position:absolute;bottom:50px"
          >
            Open Modal
          </sp-button>
          <sp-popover slot="click-content" tip>
            <sp-dialog no-divider class="options-popover-content">
              <sp-picker
                label="Select a Country"
                value="item-2"
                id="picker-value"
              >
                ${Array.from(
      { length: 30 },
      (_, i) => html`
                    <sp-menu-item value=${`item-${i + 1}`}>
                      Item ${i + 1}
                    </sp-menu-item>
                  `
    )}
              </sp-picker>
            </sp-dialog>
          </sp-popover>
        </overlay-trigger>
      </sp-theme>
    `);
    const overlayTrigger = test.querySelector(
      "overlay-trigger"
    );
    const button = test.querySelector("sp-button");
    const picker = test.querySelector("sp-picker");
    const overlayClosedSpy = spy();
    overlayTrigger.addEventListener("sp-closed", overlayClosedSpy);
    button.click();
    await elementUpdated(overlayTrigger);
    await waitUntil(
      () => overlayTrigger.open === "click",
      "overlay should be open"
    );
    const opened = oneEvent(picker, "sp-opened");
    picker.click();
    await opened;
    await elementUpdated(picker);
    const menu = picker.optionsMenu;
    expect(menu, "picker menu should be available").to.exist;
    const pickerScrollSpy = spy();
    picker.addEventListener("scroll", pickerScrollSpy);
    menu.style.maxHeight = "80px";
    menu.style.overflow = "auto";
    menu.scrollTop = 60;
    await waitUntil(() => menu.scrollTop > 0, "picker menu should scroll");
    await aTimeout(50);
    expect(
      overlayClosedSpy.callCount,
      "parent overlay should not close while scrolling picker menu"
    ).to.equal(0);
    expect(overlayTrigger.open, "parent overlay should remain open").to.equal(
      "click"
    );
    expect(picker.open, "picker should remain open").to.be.true;
    expect(
      pickerScrollSpy.callCount,
      "scroll event should fire on the picker host"
    ).to.be.greaterThan(0);
  });
  describe("initial value", function() {
    beforeEach(async function() {
      const test = await fixture(html`
        <sp-theme scale="medium" color="light" system="spectrum">
          <sp-field-label for="picker">Where do you live?</sp-field-label>
          <sp-picker id="picker" label="Where do you live?" value="option-6">
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item value="option-6">Make Work Path</sp-menu-item>
          </sp-picker>
        </sp-theme>
      `);
      el = test.querySelector("sp-picker");
      const styles = document.createElement("style");
      styles.innerText = "sp-popover { height: 60px; }";
      el.shadowRoot.append(styles);
      await elementUpdated(el);
    });
    it.skip("scrolls selected into view on open", async () => {
      await elementUpdated(el);
      const firstItem = el.querySelector(
        "sp-menu-item:first-child"
      );
      const lastItem = el.querySelector("sp-menu-item:last-child");
      expect(el.value).to.equal("option-6");
      el.focus();
      await elementUpdated(el);
      await sendKeys({ press: "ArrowDown" });
      await elementUpdated(el);
      await oneEvent(el, "sp-opened");
      await waitUntil(() => isMenuActiveElement(el), "menu item focused");
      await nextFrame();
      await nextFrame();
      const getParentOffset = (item) => {
        var _a;
        const parentScroll = ((_a = item.assignedSlot) == null ? void 0 : _a.parentElement).scrollTop;
        const parentOffset = item.offsetTop - parentScroll;
        return parentOffset;
      };
      const actualOffset = getParentOffset(lastItem);
      expect(actualOffset, "initial: last item offset").to.be.lessThan(60);
      const firstItemOffset = getParentOffset(firstItem);
      expect(firstItemOffset, "initial: first item offset").to.be.lessThan(-1);
      await sendKeys({ press: "ArrowDown" });
      await elementUpdated(el);
      const lastItemOffsetAfter = getParentOffset(lastItem);
      const firstItemOffsetAfter = getParentOffset(firstItem);
      expect(lastItemOffsetAfter, "after: last item offset").to.be.greaterThan(
        60
      );
      expect(
        firstItemOffsetAfter,
        "after: first item offset"
      ).to.be.greaterThan(-1);
    });
  });
  describe("icons attribute", () => {
    it('hides icon in button when icons="none"', async () => {
      const el2 = await fixture(html`
        <sp-picker label="Choose an action" value="1" icons="none">
          <sp-menu-item value="1">
            <sp-icon-edit slot="icon"></sp-icon-edit>
            Edit
          </sp-menu-item>
          <sp-menu-item value="2">
            <sp-icon-copy slot="icon"></sp-icon-copy>
            Copy
          </sp-menu-item>
        </sp-picker>
      `);
      await elementUpdated(el2);
      const iconSpan = el2.shadowRoot.querySelector("#icon");
      expect(iconSpan).to.not.be.null;
      expect(iconSpan.hidden, "icon span should be hidden").to.be.true;
      const labelSpan = el2.shadowRoot.querySelector(".label");
      expect(labelSpan).to.not.be.null;
      expect(
        labelSpan.classList.contains("visually-hidden"),
        "label should be visible"
      ).to.be.false;
    });
    it('preserves icon elements in menu items when icons="none"', async () => {
      const el2 = await fixture(html`
        <sp-picker label="Choose an action" value="1" icons="none">
          <sp-menu-item value="1">
            <sp-icon-edit slot="icon"></sp-icon-edit>
            Edit
          </sp-menu-item>
          <sp-menu-item value="2">
            <sp-icon-copy slot="icon"></sp-icon-copy>
            Copy
          </sp-menu-item>
        </sp-picker>
      `);
      await elementUpdated(el2);
      const opened = oneEvent(el2, "sp-opened");
      el2.open = true;
      await opened;
      await elementUpdated(el2);
      const menuItems = el2.querySelectorAll("sp-menu-item");
      expect(menuItems.length).to.equal(2);
      menuItems.forEach((item, index) => {
        const icon = item.querySelector('[slot="icon"]');
        expect(icon, `menu item ${item.value} should have icon`).to.not.be.null;
        const expectedTag = index === 0 ? "SP-ICON-EDIT" : "SP-ICON-COPY";
        expect(icon.tagName).to.equal(expectedTag);
      });
    });
    it('hides label text when icons="only" and has value', async () => {
      const el2 = await fixture(html`
        <sp-picker label="Choose an action" value="1" icons="only">
          <sp-menu-item value="1">
            <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
            Edit
          </sp-menu-item>
          <sp-menu-item value="2">
            <sp-icon-copy slot="icon" label="Copy"></sp-icon-copy>
            Copy
          </sp-menu-item>
        </sp-picker>
      `);
      await elementUpdated(el2);
      const labelSpan = el2.shadowRoot.querySelector(".label");
      expect(labelSpan).to.not.be.null;
      expect(
        labelSpan.classList.contains("visually-hidden"),
        'label should be visually hidden when icons="only" and has value'
      ).to.be.true;
      const iconSpan = el2.shadowRoot.querySelector("#icon");
      expect(iconSpan).to.not.be.null;
      expect(iconSpan.hidden, "icon should be visible").to.be.false;
    });
    it('shows label text when icons="only" but no value selected', async () => {
      const el2 = await fixture(html`
        <sp-picker label="Choose an action" icons="only">
          <sp-menu-item value="1">
            <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
            Edit
          </sp-menu-item>
          <sp-menu-item value="2">
            <sp-icon-copy slot="icon" label="Copy"></sp-icon-copy>
            Copy
          </sp-menu-item>
        </sp-picker>
      `);
      await elementUpdated(el2);
      const labelSpan = el2.shadowRoot.querySelector(".label");
      expect(labelSpan).to.not.be.null;
      expect(
        labelSpan.classList.contains("visually-hidden"),
        "label should be visible when no value selected"
      ).to.be.false;
      expect(
        labelSpan.classList.contains("placeholder"),
        "label should have placeholder class"
      ).to.be.true;
    });
    it("updates icon visibility when icons attribute changes", async () => {
      const el2 = await fixture(html`
        <sp-picker label="Choose an action" value="1">
          <sp-menu-item value="1">
            <sp-icon-edit slot="icon"></sp-icon-edit>
            Edit
          </sp-menu-item>
        </sp-picker>
      `);
      await elementUpdated(el2);
      let iconSpan = el2.shadowRoot.querySelector("#icon");
      expect(iconSpan.hidden, "icon should be visible initially").to.be.false;
      el2.icons = "none";
      await elementUpdated(el2);
      iconSpan = el2.shadowRoot.querySelector("#icon");
      expect(
        iconSpan.hidden,
        'icon should be hidden after setting icons="none"'
      ).to.be.true;
      el2.icons = "only";
      await elementUpdated(el2);
      iconSpan = el2.shadowRoot.querySelector("#icon");
      expect(
        iconSpan.hidden,
        'icon should be visible after setting icons="only"'
      ).to.be.false;
      const labelSpan = el2.shadowRoot.querySelector(".label");
      expect(
        labelSpan.classList.contains("visually-hidden"),
        'label should be hidden with icons="only"'
      ).to.be.true;
    });
  });
}
//# sourceMappingURL=index.js.map
