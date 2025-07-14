"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  waitUntil
} from "@open-wc/testing";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/menu/sp-menu.js";
import { spy } from "sinon";
import { sendMouse } from "../../../test/plugins/browser.js";
describe("Menu item", () => {
  it("renders", async () => {
    const el = await fixture(html`
            <sp-menu>
                <sp-menu-item selected>Selected</sp-menu-item>
            </sp-menu>
        `);
    await waitUntil(
      () => el.childItems.length == 1,
      "expected menu group to manage 1 child"
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("can be disabled", async () => {
    const el = await fixture(html`
            <sp-menu selects="single">
                <sp-menu-item selected label="This is not disabled">
                    Selected
                </sp-menu-item>
                <sp-menu-item disabled>Disabled</sp-menu-item>
            </sp-menu>
        `);
    await elementUpdated(el);
    expect(el.value).to.equal("Selected");
    const disabled = el.querySelector("[disabled]");
    const boundingRect = disabled.getBoundingClientRect();
    sendMouse({
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
        },
        {
          type: "up"
        }
      ]
    });
    await elementUpdated(el);
    expect(el.value).to.equal("Selected");
    disabled.click();
    await elementUpdated(el);
    expect(el.value).to.equal("Selected");
    disabled.dispatchEvent(
      new Event("click", {
        bubbles: true,
        composed: true
      })
    );
    await elementUpdated(el);
    expect(el.value).to.equal("Selected");
  });
  it("proxies `click()`", async () => {
    const clickTargetSpy = spy();
    const el = await fixture(html`
            <sp-menu
                @click=${(event) => {
      clickTargetSpy(
        event.composedPath()[0]
      );
      event.stopPropagation();
      event.preventDefault();
    }}
            >
                <sp-menu-item
                    href="https://opensource.adobe.com/spectrum-web-components"
                >
                    Selected Text
                </sp-menu-item>
            </sp-menu>
        `);
    await elementUpdated(el);
    const item = el.querySelector("sp-menu-item");
    const { anchorElement } = item;
    item.anchorElement.dispatchEvent(new FocusEvent("focus"));
    await elementUpdated(item);
    expect(item === document.activeElement).to.be.true;
    item.click();
    expect(clickTargetSpy.calledWith(anchorElement)).to.be.true;
  });
  it("allows link click", async () => {
    const clickTargetSpy = spy();
    const el = await fixture(html`
            <sp-menu
                @click=${(event) => {
      clickTargetSpy(
        event.composedPath()[0]
      );
      event.stopPropagation();
      event.preventDefault();
    }}
            >
                <sp-menu-item
                    href="https://opensource.adobe.com/spectrum-web-components"
                >
                    Selected Text
                </sp-menu-item>
            </sp-menu>
        `);
    const item = el.querySelector("sp-menu-item");
    const { anchorElement } = item;
    item.anchorElement.dispatchEvent(new FocusEvent("focus"));
    await elementUpdated(item);
    expect(item === document.activeElement).to.be.true;
    const rect = el.getBoundingClientRect();
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
    expect(clickTargetSpy.calledWith(anchorElement)).to.be.true;
  });
  it("value attribute", async () => {
    const el = await fixture(html`
            <sp-menu-item value="selected" selected>Selected Text</sp-menu-item>
        `);
    expect(el.itemText).to.equal("Selected Text");
    expect(el.value).to.equal("selected");
  });
  it("no value attribute", async () => {
    const el = await fixture(html`
            <sp-menu-item selected>Selected Text</sp-menu-item>
        `);
    expect(el.itemText).to.equal("Selected Text");
    expect(el.value).to.equal("Selected Text");
  });
  it("value property", async () => {
    const el = await fixture(html`
            <sp-menu-item selected>Selected Text</sp-menu-item>
        `);
    expect(el.itemText).to.equal("Selected Text");
    expect(el.value).to.equal("Selected Text");
    expect(el.hasAttribute("value")).to.be.false;
    el.value = "Selected Text";
    await elementUpdated(el);
    expect(el.value).to.equal("Selected Text");
    expect(el.getAttribute("value")).to.equal("Selected Text");
    el.value = "";
    await elementUpdated(el);
    expect(el.value).to.equal("Selected Text");
    expect(el.hasAttribute("value")).to.be.false;
  });
  it("assigns content to the description slot", async () => {
    const el = await fixture(html`
            <sp-menu-item selected>
                Menu Item Text
                <span slot="description">Description for the Menu-Item</span>
            </sp-menu-item>
        `);
    const descriptionElement = el.querySelector("span");
    expect(descriptionElement.assignedSlot).to.not.be.null;
  });
  it("acualizes a submenu", async () => {
    const test = await fixture(html`
            <sp-menu>
                <sp-menu-item selected>Selected</sp-menu-item>
            </sp-menu>
        `);
    const el = test.querySelector("sp-menu-item");
    expect(el.hasSubmenu).to.be.false;
    const submenuItem = document.createElement("sp-menu-item");
    const submenu = document.createElement("sp-menu");
    submenuItem.textContent = "Test Submenu Item";
    submenu.slot = "submenu";
    submenu.append(submenuItem);
    el.append(submenu);
    await elementUpdated(el);
    expect(el.hasSubmenu).to.be.true;
    submenu.remove();
    await elementUpdated(el);
    expect(el.hasSubmenu).to.be.false;
  });
  it("should not allow text-align to cascade when used inside an overlay", async () => {
    const element = await fixture(html`
            <div style="text-align: center">
                <p>
                    The paragraph and the button are centered. Menu items are
                    not.
                </p>
                <sp-action-menu label="Actions" selects="single">
                    <sp-menu-item>One</sp-menu-item>
                    <sp-menu-item>Two</sp-menu-item>
                    <sp-menu-item>This is a long option</sp-menu-item>
                    <sp-menu-item>
                        More options
                        <sp-menu slot="submenu">
                            <sp-menu-item>Three</sp-menu-item>
                            <sp-menu-item>Four</sp-menu-item>
                            <sp-menu-item>Another long option</sp-menu-item>
                        </sp-menu>
                    </sp-menu-item>
                </sp-action-menu>
            </div>
        `);
    const menuItems = element.querySelectorAll(
      "sp-menu-item"
    );
    for (const menuItem of menuItems)
      expect(getComputedStyle(menuItem).textAlign).to.equal("start");
  });
});
//# sourceMappingURL=menu-item.test.js.map
