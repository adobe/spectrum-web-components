/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
  aTimeout,
  elementUpdated,
  expect,
  html,
  nextFrame,
  oneEvent,
} from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";

import { spy } from "sinon";

import { ActionMenu } from "@spectrum-web-components/action-menu";
import type { Menu, MenuItem } from "@spectrum-web-components/menu";
import {
  fixture,
  ignoreResizeObserverLoopError,
} from "../../../test/testing-helpers.js";
import "@spectrum-web-components/dialog/sp-dialog-base.js";
import {
  iconOnly,
  tooltipDescriptionAndPlacement,
} from "../stories/action-menu.stories.js";
import { findDescribedNode } from "../../../test/testing-helpers-a11y.js";
import type { Tooltip } from "@spectrum-web-components/tooltip";
import { sendMouse } from "../../../test/plugins/browser.js";
import type { TestablePicker } from "../../picker/test/index.js";
import type { Overlay } from "@spectrum-web-components/overlay";
import { sendKeys, setViewport } from "@web/test-runner-commands";
import { TemplateResult } from "@spectrum-web-components/base";
import { isWebKit } from "@spectrum-web-components/shared";
import { SAFARI_FOCUS_RING_CLASS } from "@spectrum-web-components/picker/src/MobileController.js";

ignoreResizeObserverLoopError(before, after);

const deprecatedActionMenuFixture = async (): Promise<ActionMenu> =>
  await fixture<ActionMenu>(html`
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

const actionMenuFixture = async (): Promise<ActionMenu> =>
  await fixture<ActionMenu>(html`
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

const actionSubmenuFixture = async (): Promise<ActionMenu> =>
  await fixture<ActionMenu>(html`
    <sp-action-menu label="More Actions">
      <sp-menu-item>One</sp-menu-item>
      <sp-menu-item selected id="root-selected-item">Two</sp-menu-item>
      <sp-menu-item id="item-with-submenu">
        B should be selected
        <sp-menu slot="submenu">
          <sp-menu-item>A</sp-menu-item>
          <sp-menu-item selected id="sub-selected-item"> B </sp-menu-item>
          <sp-menu-item>C</sp-menu-item>
        </sp-menu>
      </sp-menu-item>
    </sp-action-menu>
  `);

export const testActionMenu = (mode: "sync" | "async"): void => {
  describe(`Action menu: ${mode}`, () => {
    testForLitDevWarnings(async () => await actionMenuFixture());
    it("loads", async () => {
      const el = await actionMenuFixture();

      await elementUpdated(el);

      expect(el).to.not.be.undefined;

      await expect(el).to.be.accessible();
    });
    it('loads - [slot="label"]', async () => {
      const el = await fixture<ActionMenu>(html`
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
      const el = await fixture<ActionMenu>(html`
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
    it("dispatches change events, no [href]", async () => {
      const changeSpy = spy();

      const el = await fixture<ActionMenu>(html`
        <sp-action-menu
          label="More Actions"
          @change=${({ target: { value } }: Event & { target: ActionMenu }) => {
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
        "sp-menu-item:nth-child(2)",
      ) as MenuItem;
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

      const el = await fixture<ActionMenu>(html`
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
          <sp-menu-item href="#" disabled> Make Work Path </sp-menu-item>
        </sp-action-menu>
      `);

      expect(changeSpy.callCount).to.equal(0);
      expect(el.open).to.be.false;

      const menuItem2 = el.querySelector(
        "sp-menu-item:nth-child(2)",
      ) as MenuItem;

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

      expect(el.staticColor == undefined).to.be.true;

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

      /**
       * This is a hack to set the `isMobile` property to true so that we can test the MobileController
       */
      el.isMobile.matches = true;
      el.bindEvents();

      await setViewport({ width: 360, height: 640 });
      // Allow viewport update to propagate.
      await nextFrame();

      let opened = oneEvent(el, "sp-opened");

      const boundingRect = el.button.getBoundingClientRect();

      sendMouse({
        steps: [
          {
            type: "click",
            position: [
              boundingRect.x + boundingRect.width / 2,
              boundingRect.y + boundingRect.height / 2,
            ],
          },
        ],
      });

      await opened;

      const tray = el.shadowRoot.querySelector("sp-tray");

      expect(tray).to.not.be.null;

      // Make a selection
      let closed = oneEvent(el, "sp-closed");

      const firstItem = el.querySelector("sp-menu-item") as MenuItem;

      firstItem.click();

      await elementUpdated(el);
      await closed;

      // expect the tray to be closed
      expect(el.open).to.be.false;

      const button = el.shadowRoot.querySelector(
        "#button",
      ) as HTMLButtonElement;

      expect(button).to.not.be.null;

      // we should have SAFARI_FOCUS_RING_CLASS in the classList
      expect(button.classList.contains(SAFARI_FOCUS_RING_CLASS)).to.be.true;

      // picker should still have focus
      expect(document.activeElement === el).to.be.true;

      // click outside (0,0)
      await sendMouse({
        steps: [
          {
            type: "click",
            position: [0, 0],
          },
        ],
      });

      // picker should not have focus
      expect(document.activeElement === el).to.be.false;

      // Let's use keyboard to open the tray now
      opened = oneEvent(el, "sp-opened");
      await sendKeys({
        press: "Tab",
      });
      await sendKeys({
        press: "Enter",
      });
      await elementUpdated(el);
      await opened;

      // Make a selection again
      closed = oneEvent(el, "sp-closed");
      firstItem.click();
      await elementUpdated(el);
      await closed;

      // expect the tray to be closed
      expect(el.open).to.be.false;

      // we should not have SAFARI_FOCUS_RING_CLASS in the classList
      expect(button.classList.contains(SAFARI_FOCUS_RING_CLASS)).to.be.false;
    });
    it("opens unmeasured", async () => {
      const el = await actionMenuFixture();

      const button = el.button as HTMLButtonElement;

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
    it("opens repeatedly with Menu in the correct location", async function () {
      const el = await fixture<ActionMenu>(
        iconOnly({
          ...iconOnly.args,
          align: "end",
        }),
      );

      await elementUpdated(el);

      el.focus();
      await elementUpdated(el);
      let opened = oneEvent(el, "sp-opened");

      await sendKeys({ press: "ArrowRight" });
      await sendKeys({ press: "ArrowLeft" });
      await sendKeys({ press: "Space" });
      await opened;

      const firstRect = (
        el as unknown as { overlayElement: Overlay }
      ).overlayElement.dialogEl.getBoundingClientRect();

      let closed = oneEvent(el, "sp-closed");

      await sendKeys({ press: "Space" });
      await closed;

      opened = oneEvent(el, "sp-opened");
      await sendKeys({ press: "Space" });
      await opened;

      const secondRect = (
        el as unknown as { overlayElement: Overlay }
      ).overlayElement.dialogEl.getBoundingClientRect();

      closed = oneEvent(el, "sp-closed");
      await sendKeys({ press: "Space" });
      await closed;

      expect(firstRect).to.deep.equal(secondRect);
    });
    it("opens and selects in a single pointer button interaction", async () => {
      const el = await actionMenuFixture();
      const thirdItem = el.querySelector(
        "sp-menu-item:nth-of-type(3)",
      ) as MenuItem;
      const boundingRect = el.button.getBoundingClientRect();

      expect(el.value).to.not.equal(thirdItem.value);
      const opened = oneEvent(el, "sp-opened");

      await sendMouse({
        steps: [
          {
            type: "move",
            position: [
              boundingRect.x + boundingRect.width / 2,
              boundingRect.y + boundingRect.height / 2,
            ],
          },
          {
            type: "down",
          },
        ],
      });
      await opened;

      const thirdItemRect = thirdItem.getBoundingClientRect();
      const closed = oneEvent(el, "sp-closed");
      let selected = "";

      el.addEventListener("change", (event: Event) => {
        selected = (event.target as ActionMenu).value;
      });
      await sendMouse({
        steps: [
          {
            type: "move",
            position: [
              thirdItemRect.x + thirdItemRect.width / 2,
              thirdItemRect.y + thirdItemRect.height / 2,
            ],
          },
          {
            type: "up",
          },
        ],
      });
      await closed;

      expect(el.open).to.be.false;
      expect(selected).to.equal(thirdItem.value);
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

      const button = el.button as HTMLButtonElement;

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
      const menuItem = root.querySelector("#item-with-submenu") as Menu;
      const submenu = menuItem.querySelector('sp-menu[slot="submenu"]') as Menu;
      const selectedItem = submenu.querySelector(
        "#sub-selected-item",
      ) as MenuItem;

      expect(selectedItem.selected, "item should be initially selected").to.be
        .true;

      let opened = oneEvent(root, "sp-opened");

      root.click();
      await opened;
      expect(root.open).to.be.true;

      opened = oneEvent(menuItem, "sp-opened");
      menuItem.dispatchEvent(
        new PointerEvent("pointerenter", { bubbles: true }),
      );
      await opened;

      await elementUpdated(submenu);
      expect(
        selectedItem.selected,
        "initially selected item should maintain selection",
      ).to.be.true;
    });
    it("allows top-level selection state to change", async () => {
      let selected = true;
      const handleChange = (event: Event & { target: ActionMenu }): void => {
        if (event.target.value === "test") {
          selected = !selected;

          event.target.updateComplete.then(() => {
            event.target.value = selected ? "test" : "";
          });
        }
      };
      const root = await fixture<ActionMenu>(html`
        <sp-action-menu label="More Actions" @change=${handleChange}>
          <sp-menu-item>One</sp-menu-item>
          <sp-menu-item selected value="test" id="root-selected-item">
            Two
          </sp-menu-item>
          <sp-menu-item id="item-with-submenu">
            B should be selected
            <sp-menu slot="submenu">
              <sp-menu-item>A</sp-menu-item>
              <sp-menu-item selected id="sub-selected-item"> B </sp-menu-item>
              <sp-menu-item>C</sp-menu-item>
            </sp-menu>
          </sp-menu-item>
        </sp-action-menu>
      `);

      const unselectedItem = root.querySelector("sp-menu-item") as MenuItem;
      const selectedItem = root.querySelector(
        "#root-selected-item",
      ) as MenuItem;

      expect(unselectedItem.textContent).to.include("One");
      expect(unselectedItem.selected).to.be.false;
      expect(selectedItem.textContent).to.include("Two");
      expect(selectedItem.selected).to.be.true;

      let opened = oneEvent(root, "sp-opened");

      root.click();
      await opened;

      // close by clicking selected
      // (with event listener: should set selected = false)
      let closed = oneEvent(root, "sp-closed");

      selectedItem.click();
      await closed;

      expect(root.open).to.be.false;
      opened = oneEvent(root, "sp-opened");
      root.click();
      await opened;

      // close by clicking unselected
      // (no event listener: should remain selected = false)
      closed = oneEvent(root, "sp-closed");
      unselectedItem.click();
      await closed;

      opened = oneEvent(root, "sp-opened");
      root.click();
      await opened;

      expect(unselectedItem.textContent).to.include("One");
      expect(unselectedItem.selected).to.be.false;
      expect(selectedItem.textContent).to.include("Two");
      expect(selectedItem.selected).to.be.false;

      // close by clicking selected
      // (with event listener: should set selected = false)
      closed = oneEvent(root, "sp-closed");
      selectedItem.click();
      await closed;

      opened = oneEvent(root, "sp-opened");
      root.click();
      await opened;

      expect(unselectedItem.textContent).to.include("One");
      expect(unselectedItem.selected).to.be.false;
      expect(selectedItem.textContent).to.include("Two");
      expect(selectedItem.selected).to.be.true;
    });
    it("shows tooltip", async function () {
      const openSpy = spy();
      const el = await fixture<ActionMenu>(
        tooltipDescriptionAndPlacement(tooltipDescriptionAndPlacement.args),
      );
      const tooltip = el.querySelector("sp-tooltip") as Tooltip;
      const rect = el.getBoundingClientRect();

      tooltip.addEventListener("sp-opened", () => openSpy());
      await elementUpdated(tooltip);

      await nextFrame();
      await nextFrame();

      const overlay = tooltip.shadowRoot.querySelector("sp-overlay") as Overlay;

      await elementUpdated(overlay);

      expect(overlay.triggerElement === el.button).to.be.true;
      let open = oneEvent(tooltip, "sp-opened");

      await sendMouse({
        steps: [
          {
            position: [rect.left + rect.width / 2, rect.top + rect.height / 2],
            type: "move",
          },
        ],
      });
      await open;

      expect(tooltip.open).to.be.true;

      const close = oneEvent(tooltip, "sp-closed");

      open = oneEvent(el, "sp-opened");
      await sendMouse({
        steps: [
          {
            position: [rect.left + rect.width / 2, rect.top + rect.height / 2],
            type: "click",
          },
        ],
      });
      await close;
      await open;

      expect(tooltip.open, "tooltip still open").to.be.false;
      expect(el.open, "menu not open").to.be.true;

      const menu = (el as unknown as TestablePicker).optionsMenu;
      const menuRect = menu.getBoundingClientRect();

      await sendMouse({
        steps: [
          {
            position: [
              menuRect.left + menuRect.width / 2,
              menuRect.top + menuRect.height / 2,
            ],
            type: "move",
          },
        ],
      });

      await aTimeout(150);

      expect(openSpy.callCount).to.equal(1);
    });
    it("opens, then closes, on subsequent clicks", async function () {
      const el = await actionMenuFixture();
      const rect = el.getBoundingClientRect();

      await nextFrame();
      await nextFrame();

      const open = oneEvent(el, "sp-opened");

      await sendMouse({
        steps: [
          {
            position: [rect.left + rect.width / 2, rect.top + rect.height / 2],
            type: "click",
          },
        ],
      });
      await open;

      expect(el.open).to.be.true;
      await aTimeout(50);
      expect(el.open).to.be.true;

      const close = oneEvent(el, "sp-closed");

      await sendMouse({
        steps: [
          {
            position: [rect.left + rect.width / 2, rect.top + rect.height / 2],
            type: "click",
          },
        ],
      });
      await close;

      expect(el.open).to.be.false;
      await aTimeout(50);
      expect(el.open).to.be.false;
    });
    it("should handle scroll event", async () => {
      const renderMenuItems = (): TemplateResult[] =>
        Array.from(
          { length: 30 },
          (_, i) => html`
            <sp-menu-item style="width: 100%;">
              Menu Item ${i + 1}
            </sp-menu-item>
          `,
        );
      const handleActionMenuScroll = spy();
      const el = await fixture<ActionMenu>(html`
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
        new Event("scroll", { cancelable: true, composed: true }),
      );
      expect(handleActionMenuScroll).to.have.been.called;
    });
  });
};
