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
import { sendKeys } from "@web/test-runner-commands";
import { spy } from "sinon";
import { slottableRequest } from "@spectrum-web-components/overlay/src/slottable-request-directive.js";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js";
import "@spectrum-web-components/menu/sp-menu-group.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import { sendMouse } from "../../../test/plugins/browser.js";
import {
  fixture,
  mouseClickOn,
  mouseMoveAway,
  mouseMoveOver,
  sendTabKey
} from "../../../test/testing-helpers.js";
const selectsWithKeyboardData = [
  {
    dir: "ltr",
    openKey: "ArrowRight",
    closeKey: "ArrowLeft"
  },
  {
    dir: "rtl",
    openKey: "ArrowLeft",
    closeKey: "ArrowRight"
  }
];
describe("Submenu", () => {
  function selectWithPointer() {
    it("with pointer", async function() {
      expect(this.rootItem.open).to.be.false;
      const opened = oneEvent(this.rootItem, "sp-opened");
      await mouseMoveOver(this.rootItem);
      await opened;
      expect(this.rootItem.open).to.be.true;
      const item2 = document.querySelector(".submenu-item-2");
      const closed = oneEvent(this.rootItem, "sp-closed");
      await mouseClickOn(item2);
      await closed;
      expect(
        this.submenuChanged.withArgs("Two").calledOnce,
        `submenu changed ${this.submenuChanged.callCount} times`
      ).to.be.true;
      expect(
        this.rootChanged.withArgs("Has submenu").calledOnce,
        "root changed"
      ).to.be.true;
    });
  }
  function selectsWithBoth(testData) {
    it(`with pointer and keyboard: ${testData.dir}`, async function() {
      expect(this.rootItem.open).to.be.false;
      const opened = oneEvent(this.rootItem, "sp-opened");
      await mouseMoveOver(this.rootItem);
      await opened;
      const item1 = document.querySelector(".submenu-item-1");
      const item2 = document.querySelector(".submenu-item-2");
      expect(this.rootItem.open, `submenu should open`).to.be.true;
      expect(document.activeElement).not.to.equal(item1);
      const prev = this.rootItem.previousElementSibling;
      await sendKeys({ press: "ArrowUp" });
      expect(document.activeElement).to.equal(prev);
      expect(prev.focused, `focus is on previous item`).to.be.true;
      expect(this.rootItem.open, `submenu should stay open`).to.be.true;
      const closed = oneEvent(this.rootItem, "sp-closed");
      await mouseClickOn(item2);
      await closed;
      expect(
        this.submenuChanged.withArgs("Two").calledOnce,
        `submenu changed ${this.submenuChanged.callCount} times`
      ).to.be.true;
      expect(
        this.rootChanged.withArgs("Has submenu").calledOnce,
        `root changed ${this.submenuChanged.callCount} times`
      ).to.be.true;
    });
  }
  function selectsWithKeyboard(testData) {
    it(`with keyboard: ${testData.dir}`, async function() {
      this.el.parentElement.dir = testData.dir;
      await elementUpdated(this.el);
      expect(this.rootItem.open, `rootItem open before ${testData.openKey}`).to.be.false;
      const input = document.createElement("input");
      this.el.insertAdjacentElement("beforebegin", input);
      await elementUpdated(input);
      await sendTabKey();
      await elementUpdated(input);
      expect(document.activeElement).to.equal(input);
      await sendTabKey();
      await elementUpdated(this.el);
      await waitUntil(
        () => document.activeElement === this.el.children[0],
        "focuses first menu item after tab"
      );
      expect(document.activeElement).to.equal(this.el.children[0]);
      await sendKeys({ press: "ArrowDown" });
      await elementUpdated(this.rootItem);
      expect(
        this.rootItem.focused,
        `rootItem focused before ${testData.openKey}`
      ).to.be.true;
      let opened = oneEvent(this.rootItem, "sp-opened");
      await sendKeys({ press: testData.openKey });
      await opened;
      const rootItem = this.el.querySelector(".root");
      let submenu = this.el.querySelector('[slot="submenu"]');
      let submenuItem = this.el.querySelector(".submenu-item-1");
      expect(this.rootItem.open, `rootItem open after ${testData.openKey}`).to.be.true;
      expect(document.activeElement).to.equal(submenuItem);
      let closed = oneEvent(this.rootItem, "sp-closed");
      await sendKeys({ press: testData.closeKey });
      await closed;
      expect(this.rootItem.open, `rootItem open after ${testData.closeKey}`).to.be.false;
      expect(document.activeElement).to.equal(rootItem);
      opened = oneEvent(this.rootItem, "sp-opened");
      await sendKeys({ press: testData.openKey });
      await opened;
      await elementUpdated(this.rootItem);
      submenu = this.el.querySelector('[slot="submenu"]');
      await elementUpdated(submenu);
      expect(this.rootItem.open, "rootItem.open").to.be.true;
      expect(submenuItem.focused, "submenuItem.focused").to.be.true;
      expect(document.activeElement).to.equal(submenuItem);
      await sendKeys({ press: "ArrowDown" });
      await elementUpdated(submenu);
      await elementUpdated(submenuItem);
      submenuItem = this.el.querySelector(".submenu-item-2");
      expect(submenuItem.focused, `submenu focused`).to.be.true;
      expect(document.activeElement === submenuItem, `submenu active`).to.be.true;
      closed = oneEvent(this.rootItem, "sp-closed");
      await sendKeys({ press: "Enter" });
      await closed;
      expect(this.submenuChanged.calledWith("Two"), "submenu changed").to.be.true;
      expect(this.rootChanged.called, "root has changed").to.be.true;
      expect(
        this.rootChanged.calledWith("Has submenu"),
        "root specifically changed"
      ).to.be.true;
    });
  }
  function returnsFocusToRootWhenClosingSubmenu() {
    it("returns visible focus when submenu closed", async function() {
      var _a;
      const input = document.createElement("input");
      this.el.insertAdjacentElement("beforebegin", input);
      await sendTabKey();
      await elementUpdated(input);
      expect(document.activeElement, "focuses input").to.equal(input);
      await sendTabKey();
      await waitUntil(
        () => document.activeElement === this.el.children[0],
        "focuses first menu item after tab"
      );
      expect(document.activeElement, "focuses first menu item").to.equal(
        this.el.children[0]
      );
      await sendKeys({ press: "ArrowDown" });
      await elementUpdated(this.el);
      await nextFrame();
      await nextFrame();
      expect(this.rootItem.active, "menu with submenu is not active").to.be.false;
      expect(
        this.rootItem.focused,
        `focused: ${(_a = document.activeElement) == null ? void 0 : _a.localName}`
      ).to.be.true;
      expect(this.rootItem.open, "menu with submenu is not open").to.be.false;
      expect(document.activeElement, "focuses menu with submenu").to.equal(
        this.rootItem
      );
      const opened = oneEvent(this.rootItem, "sp-opened");
      await sendKeys({ press: "ArrowRight" });
      await opened;
      expect(this.rootItem.active).to.be.true;
      expect(this.rootItem.focused).to.be.false;
      expect(this.rootItem.open).to.be.true;
      await sendKeys({ press: "ArrowDown" });
      expect(this.rootItem.active).to.be.true;
      expect(this.rootItem.focused).to.be.false;
      expect(this.rootItem.open).to.be.true;
      const closed = oneEvent(this.rootItem, "sp-closed");
      await sendKeys({ press: "ArrowLeft" });
      await closed;
      expect(this.rootItem.active).to.be.false;
      expect(this.rootItem.focused).to.be.true;
      expect(this.rootItem.open).to.be.false;
    });
  }
  function closesOnPointerLeave() {
    it("closes on `pointerleave`", async function() {
      expect(this.rootItem.open).to.be.false;
      const opened = oneEvent(this.rootItem, "sp-opened");
      await mouseMoveOver(this.rootItem);
      await opened;
      expect(this.rootItem.open).to.be.true;
      const closed = oneEvent(this.rootItem, "sp-closed");
      await mouseMoveAway(this.rootItem);
      await closed;
      expect(this.rootItem.open).to.be.false;
    });
    it("handles mouse pointerdown on open submenu followed by focus", async function() {
      expect(this.rootItem.open).to.be.false;
      const opened = oneEvent(this.rootItem, "sp-opened");
      await mouseMoveOver(this.rootItem);
      await opened;
      expect(this.rootItem.open).to.be.true;
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          pointerType: "mouse"
        })
      );
      this.rootItem.dispatchEvent(
        new FocusEvent("focus", {
          bubbles: true
        })
      );
      await elementUpdated(this.rootItem);
      expect(this.rootItem.open).to.be.true;
    });
  }
  function persistsThroughMouseLeaveAndReturn() {
    it("stays open when mousing off menu item and back again", async function() {
      expect(this.rootItem.open).to.be.false;
      const opened = oneEvent(this.rootItem, "sp-opened");
      await mouseMoveOver(this.rootItem);
      await mouseMoveAway(this.rootItem);
      await mouseMoveOver(this.rootItem);
      await opened;
      expect(this.rootItem.open).to.be.true;
      const closed = oneEvent(this.rootItem, "sp-closed");
      await mouseMoveAway(this.rootItem);
      await closed;
    });
  }
  function doesNotOpenWhenDisabled() {
    it("does not open when disabled", async function() {
      this.rootItem.disabled = true;
      await elementUpdated(this.rootItem);
      expect(this.rootItem.open).to.be.false;
      await mouseMoveOver(this.rootItem);
      await new Promise((r) => setTimeout(r, 200));
      expect(this.rootItem.open).to.be.false;
    });
  }
  function persistsWhenMovingBetweenItemAndSubmenu() {
    it("stays open when mousing between menu item and submenu", async function() {
      expect(this.rootItem.open).to.be.false;
      const opened = oneEvent(this.rootItem, "sp-opened");
      await mouseMoveOver(this.rootItem);
      await opened;
      await nextFrame();
      await nextFrame();
      const subItem = this.el.querySelector(".submenu-item-2");
      const clickSpy = spy();
      subItem.addEventListener("click", () => clickSpy());
      expect(this.rootItem.open).to.be.true;
      await mouseMoveOver(subItem);
      expect(this.rootItem.open).to.be.true;
      await aTimeout(150);
      expect(this.rootItem.open).to.be.true;
      const closed = oneEvent(this.rootItem, "sp-closed");
      await mouseClickOn(subItem);
      await closed;
      expect(clickSpy.callCount).to.equal(1);
    });
  }
  function continuesToOpenWhenMovingBetweenItemAndSubmenu() {
    it("continues to open when mousing between menu item and submenu", async function() {
      expect(this.rootItem.open).to.be.false;
      const opened = oneEvent(this.rootItem, "sp-opened");
      await mouseMoveOver(this.rootItem);
      await aTimeout(200);
      const subItem = this.el.querySelector(".submenu-item-2");
      const clickSpy = spy();
      subItem.addEventListener("click", () => clickSpy());
      await mouseMoveOver(subItem);
      await opened;
      expect(this.rootItem.open).to.be.true;
      await aTimeout(150);
      expect(this.rootItem.open).to.be.true;
      const closed = oneEvent(this.rootItem, "sp-closed");
      await mouseClickOn(subItem);
      await closed;
      expect(clickSpy.callCount).to.equal(1);
    });
  }
  const renderSubmenu = () => html`
    <sp-menu-item class="submenu-item-1">One</sp-menu-item>
    <sp-menu-item class="submenu-item-2">Two</sp-menu-item>
    <sp-menu-item class="submenu-item-3">Three</sp-menu-item>
  `;
  describe("static DOM", () => {
    beforeEach(async function() {
      this.rootChanged = spy();
      this.submenuChanged = spy();
      const handleRootChange = (event) => {
        this.rootChanged(event.target.value);
      };
      const handleSubmenuChange = (event) => {
        this.submenuChanged(event.target.value);
      };
      this.el = await fixture(html`
        <sp-menu @change=${handleRootChange}>
          <sp-menu-item>No submenu</sp-menu-item>
          <sp-menu-item class="root">
            Has submenu
            <sp-menu slot="submenu" @change=${handleSubmenuChange}>
              ${renderSubmenu()}
            </sp-menu>
          </sp-menu-item>
        </sp-menu>
      `);
      await elementUpdated(this.el);
      this.rootItem = this.el.querySelector(".root");
      await elementUpdated(this.rootItem);
    });
    describe("selects", () => {
      selectWithPointer();
      selectsWithKeyboardData.map((testData) => {
        selectsWithKeyboard(testData);
        selectsWithBoth(testData);
      });
    });
    closesOnPointerLeave();
    returnsFocusToRootWhenClosingSubmenu();
    persistsThroughMouseLeaveAndReturn();
    doesNotOpenWhenDisabled();
    persistsWhenMovingBetweenItemAndSubmenu();
    continuesToOpenWhenMovingBetweenItemAndSubmenu();
  });
  describe("directive", () => {
    beforeEach(async function() {
      this.rootChanged = spy();
      this.submenuChanged = spy();
      const handleRootChange = (event) => {
        this.rootChanged(event.target.value);
      };
      const handleSubmenuChange = (event) => {
        this.submenuChanged(event.target.value);
      };
      this.el = await fixture(html`
        <sp-menu @change=${handleRootChange}>
          <sp-menu-item>No submenu</sp-menu-item>
          <sp-menu-item class="root">
            Has submenu
            <sp-menu
              slot="submenu"
              @change=${handleSubmenuChange}
              ${slottableRequest(renderSubmenu)}
            ></sp-menu>
          </sp-menu-item>
        </sp-menu>
      `);
      await elementUpdated(this.el);
      this.rootItem = this.el.querySelector(".root");
      await elementUpdated(this.rootItem);
    });
    describe("selects", () => {
      selectWithPointer();
      selectsWithKeyboardData.map((testData) => {
        selectsWithKeyboard(testData);
        selectsWithBoth(testData);
      });
    });
    closesOnPointerLeave();
    returnsFocusToRootWhenClosingSubmenu();
    persistsThroughMouseLeaveAndReturn();
    doesNotOpenWhenDisabled();
    persistsWhenMovingBetweenItemAndSubmenu();
    continuesToOpenWhenMovingBetweenItemAndSubmenu();
  });
  it("closes deep tree on selection", async function() {
    const rootChanged = spy();
    const submenuChanged = spy();
    const subSubmenuChanged = spy();
    const handleRootChange = (event) => {
      rootChanged(event.target.value);
    };
    const handleSubmenuChange = (event) => {
      submenuChanged(event.target.value);
    };
    const handleSubSubmenuChange = (event) => {
      subSubmenuChanged(event.target.value);
    };
    const el = await fixture(html`
      <sp-menu @change=${handleRootChange}>
        <sp-menu-item class="root">
          Has submenu
          <sp-menu slot="submenu" @change=${handleSubmenuChange}>
            <sp-menu-item class="submenu-item-1">One</sp-menu-item>
            <sp-menu-item class="submenu-item-2">
              Two
              <sp-menu slot="submenu" @change=${handleSubSubmenuChange}>
                <sp-menu-item class="sub-submenu-item-1">A</sp-menu-item>
                <sp-menu-item class="sub-submenu-item-2">B</sp-menu-item>
                <sp-menu-item class="sub-submenu-item-3">C</sp-menu-item>
              </sp-menu>
            </sp-menu-item>
            <sp-menu-item class="submenu-item-3">Three</sp-menu-item>
          </sp-menu>
        </sp-menu-item>
      </sp-menu>
    `);
    const rootItem = el.querySelector(".root");
    const item2 = document.querySelector(".submenu-item-2");
    const itemC = document.querySelector(".sub-submenu-item-3");
    expect(rootItem.open).to.be.false;
    let opened = oneEvent(rootItem, "sp-opened");
    await mouseMoveOver(rootItem);
    await opened;
    expect(rootItem.open).to.be.true;
    opened = oneEvent(item2, "sp-opened");
    await mouseMoveOver(item2);
    await opened;
    expect(item2.open).to.be.true;
    const closed = oneEvent(rootItem, "sp-closed");
    await mouseClickOn(itemC);
    await closed;
    expect(rootChanged.calledWith("Has submenu"), "root changed").to.be.true;
    expect(submenuChanged.calledWith("Two"), "submenu changed").to.be.true;
    expect(subSubmenuChanged.calledWith("C"), "sub submenu changed").to.be.true;
  });
  it("closes all descendant submenus when closing a ancestor menu", async () => {
    const el = await fixture(html`
      <sp-action-menu label="Closing ancestors will close submenus">
        <sp-icon-show-menu slot="icon"></sp-icon-show-menu>
        <sp-menu-group role="none" id="group">
          <span slot="header">New York</span>
          <sp-menu-item>Bronx</sp-menu-item>
          <sp-menu-item id="submenu-item-1">
            Brooklyn
            <sp-menu slot="submenu" id="submenu-1">
              <sp-menu-item id="submenu-item-2">
                Ft. Greene
                <sp-menu slot="submenu" id="submenu-2">
                  <sp-menu-item>S. Oxford St</sp-menu-item>
                  <sp-menu-item>S. Portland Ave</sp-menu-item>
                  <sp-menu-item>S. Elliot Pl</sp-menu-item>
                </sp-menu>
              </sp-menu-item>
              <sp-menu-item disabled>Park Slope</sp-menu-item>
              <sp-menu-item>Williamsburg</sp-menu-item>
            </sp-menu>
          </sp-menu-item>
          <sp-menu-item id="submenu-item-3">
            Manhattan
            <sp-menu slot="submenu" id="submenu-3">
              <sp-menu-item disabled>SoHo</sp-menu-item>
              <sp-menu-item>
                Union Square
                <sp-menu slot="submenu">
                  <sp-menu-item>14th St</sp-menu-item>
                  <sp-menu-item>Broadway</sp-menu-item>
                  <sp-menu-item>Park Ave</sp-menu-item>
                </sp-menu>
              </sp-menu-item>
              <sp-menu-item>Upper East Side</sp-menu-item>
            </sp-menu>
          </sp-menu-item>
        </sp-menu-group>
      </sp-action-menu>
    `);
    const rootMenu1 = el.querySelector("#submenu-item-1");
    const rootMenu2 = el.querySelector("#submenu-item-3");
    const childMenu2 = el.querySelector("#submenu-item-2");
    expect(el.open).to.be.false;
    let opened = oneEvent(el, "sp-opened");
    el.click();
    await opened;
    expect(el.open).to.be.true;
    opened = oneEvent(rootMenu1, "sp-opened");
    await mouseMoveOver(rootMenu1);
    await opened;
    expect(rootMenu1.open).to.be.true;
    opened = oneEvent(childMenu2, "sp-opened");
    await mouseMoveOver(childMenu2);
    await opened;
    expect(childMenu2.open).to.be.true;
    const childMenu2Closed = oneEvent(childMenu2, "sp-closed");
    const rootMenu1Closed = oneEvent(rootMenu1, "sp-closed");
    const rootMenu2Opened = oneEvent(rootMenu2, "sp-opened");
    rootMenu2.dispatchEvent(
      new PointerEvent("pointerenter", { bubbles: true })
    );
    await childMenu2Closed;
    await rootMenu1Closed;
    await rootMenu2Opened;
  });
  describe("deep tree", () => {
    beforeEach(async function() {
      this.el = await fixture(html`
        <sp-action-menu id="action-menu" label="Deep submenu tree">
          <sp-icon-show-menu slot="icon"></sp-icon-show-menu>
          <sp-menu-group role="none">
            <span slot="header">New York</span>
            <sp-menu-item id="no-submenu">Bronx</sp-menu-item>
            <sp-menu-item id="submenu-item-1">
              Brooklyn
              <sp-menu slot="submenu">
                <sp-menu-item id="submenu-item-2">
                  Ft. Greene
                  <sp-menu slot="submenu">
                    <sp-menu-item>S. Oxford St</sp-menu-item>
                    <sp-menu-item>S. Portland Ave</sp-menu-item>
                    <sp-menu-item>S. Elliot Pl</sp-menu-item>
                  </sp-menu>
                </sp-menu-item>
                <sp-menu-item disabled>Park Slope</sp-menu-item>
                <sp-menu-item id="ancestor-item">Williamsburg</sp-menu-item>
              </sp-menu>
            </sp-menu-item>
            <sp-menu-item id="submenu-item-3">
              Manhattan
              <sp-menu slot="submenu">
                <sp-menu-item disabled>SoHo</sp-menu-item>
                <sp-menu-item>
                  Union Square
                  <sp-menu slot="submenu">
                    <sp-menu-item>14th St</sp-menu-item>
                    <sp-menu-item>Broadway</sp-menu-item>
                    <sp-menu-item>Park Ave</sp-menu-item>
                  </sp-menu>
                </sp-menu-item>
                <sp-menu-item>Upper East Side</sp-menu-item>
              </sp-menu>
            </sp-menu-item>
          </sp-menu-group>
        </sp-action-menu>
      `);
      await nextFrame();
      await nextFrame();
    });
    it("closes back to the first overlay without a `root` when clicking away", async function() {
      const rootMenu1 = this.el.querySelector("#submenu-item-1");
      const childMenu2 = this.el.querySelector("#submenu-item-2");
      document.body.style.setProperty("padding", "50px");
      expect(this.el.open).to.be.false;
      let opened = oneEvent(this.el, "sp-opened");
      this.el.click();
      await opened;
      expect(this.el.open).to.be.true;
      opened = oneEvent(rootMenu1, "sp-opened");
      await mouseMoveOver(rootMenu1);
      await opened;
      opened = oneEvent(childMenu2, "sp-opened");
      await mouseMoveOver(childMenu2);
      await opened;
      const closed = Promise.all([
        oneEvent(childMenu2, "sp-closed"),
        oneEvent(rootMenu1, "sp-closed")
      ]);
      await mouseMoveAway(this.el);
      await closed;
    });
    it("closes descendant menus when Menu Item in ancestor without a submenu is pointerentered", async function() {
      const rootMenu = this.el.querySelector("#submenu-item-1");
      const noSubmenu = this.el.querySelector("#no-submenu");
      expect(this.el.open).to.be.false;
      let opened = oneEvent(this.el, "sp-opened");
      this.el.click();
      await opened;
      expect(this.el.open).to.be.true;
      opened = oneEvent(rootMenu, "sp-opened");
      rootMenu.dispatchEvent(
        new PointerEvent("pointerenter", { bubbles: true })
      );
      await opened;
      const closed = oneEvent(rootMenu, "sp-closed");
      noSubmenu.dispatchEvent(
        new PointerEvent("pointerenter", { bubbles: true })
      );
      await closed;
    });
    it("closes descendant menus when Menu Item in ancestor is clicked", async function() {
      const rootMenu1 = this.el.querySelector("#submenu-item-1");
      const childMenu2 = this.el.querySelector("#submenu-item-2");
      const ancestorItem = this.el.querySelector("#ancestor-item");
      expect(this.el.open).to.be.false;
      let opened = oneEvent(this.el, "sp-opened");
      this.el.click();
      await opened;
      expect(this.el.open).to.be.true;
      opened = oneEvent(rootMenu1, "sp-opened");
      await mouseMoveOver(rootMenu1);
      await opened;
      opened = oneEvent(childMenu2, "sp-opened");
      await mouseMoveOver(childMenu2);
      await opened;
      const closed = Promise.all([
        oneEvent(childMenu2, "sp-closed"),
        oneEvent(rootMenu1, "sp-closed")
      ]);
      await mouseClickOn(ancestorItem);
      await closed;
    });
  });
  it('cleans up submenus that close before they are "open"', async () => {
    if ("showPopover" in document.createElement("div")) {
      return;
    }
    await sendMouse({
      type: "move",
      position: [1, 1]
    });
    const el = await fixture(html`
      <sp-menu>
        <sp-menu-item class="root-1">
          Has submenu
          <sp-menu slot="submenu">${renderSubmenu()}</sp-menu>
        </sp-menu-item>
        <sp-menu-item class="root-2">
          Has submenu
          <sp-menu slot="submenu">${renderSubmenu()}</sp-menu>
        </sp-menu-item>
      </sp-menu>
    `);
    await elementUpdated(el);
    const rootItem1 = el.querySelector(".root-1");
    const rootItem2 = el.querySelector(".root-2");
    expect(rootItem1.open, "initially closed 1").to.be.false;
    expect(rootItem2.open, "initially closed 2").to.be.false;
    await mouseMoveOver(rootItem1);
    await mouseMoveOver(rootItem2);
    await mouseMoveOver(rootItem1);
    await mouseMoveOver(rootItem2);
    await elementUpdated(rootItem1);
    await elementUpdated(rootItem2);
    const closed = oneEvent(rootItem2, "sp-closed");
    await mouseClickOn(rootItem2);
    await elementUpdated(rootItem2);
    await closed;
    expect(rootItem1.open, "finally closed 1").to.be.false;
    expect(rootItem2.open, "finally closed 2").to.be.false;
  });
  it("allows using non-menu-item elements as the root of a submenu", async () => {
    var _a;
    const el = await fixture(html`
            <sp-menu>
                <sp-menu-item class="root">
                    Has submenu
                    <div role="menuitem" slot="submenu">
                        <sp-menu-item class="submenu-1">One</sp-menu-item>
                        <sp-menu-item>Two</sp-menu-item>
                        <sp-menu-item>Three</sp-menu-item>
                    </div
                ></div>
                </sp-menu-item>
            </sp-menu>
        `);
    await elementUpdated(el);
    const rootItem = el.querySelector(".root");
    await mouseMoveOver(rootItem);
    expect(rootItem.open).to.be.true;
    const firstSubMenuItemRect = (_a = el.querySelector(".submenu-1")) == null ? void 0 : _a.getBoundingClientRect();
    if (!firstSubMenuItemRect) {
      throw new Error("Submenu item not found");
    }
    await mouseMoveOver(firstSubMenuItemRect);
  });
  it("should make submenu scrollable when content exceeds max height", async () => {
    const el = await fixture(html`
      <sp-menu>
        <sp-menu-item>
          Parent Item
          <div role="menu" slot="submenu">
            ${Array(20).fill(0).map(
      (_, i) => html`
                  <sp-menu-item>Submenu Item ${i + 1}</sp-menu-item>
                `
    )}
          </div>
        </sp-menu-item>
      </sp-menu>
    `);
    await elementUpdated(el);
    const menuItem = el.querySelector("sp-menu-item");
    const submenu = menuItem.querySelector('[slot="submenu"]');
    const opened = oneEvent(menuItem, "sp-opened");
    menuItem.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }));
    await opened;
    submenu.style.maxHeight = "200px";
    await elementUpdated(submenu);
    const computedStyle = window.getComputedStyle(submenu);
    expect(computedStyle.overflowY).to.equal("auto");
    expect(submenu.scrollHeight).to.be.greaterThan(submenu.clientHeight);
    const initialScrollTop = submenu.scrollTop;
    submenu.scrollTop = 50;
    await elementUpdated(submenu);
    expect(submenu.scrollTop).to.equal(50);
    expect(submenu.scrollTop).to.not.equal(initialScrollTop);
  });
  describe("touch interactions", () => {
    beforeEach(async function() {
      this.el = await fixture(html`
        <sp-menu>
          <sp-menu-item>No submenu</sp-menu-item>
          <sp-menu-item class="root">
            Has submenu
            <sp-menu slot="submenu">
              <sp-menu-item class="submenu-item-1">One</sp-menu-item>
              <sp-menu-item class="submenu-item-2">Two</sp-menu-item>
              <sp-menu-item class="submenu-item-3">Three</sp-menu-item>
            </sp-menu>
          </sp-menu-item>
        </sp-menu>
      `);
      await elementUpdated(this.el);
      this.rootItem = this.el.querySelector(".root");
      await elementUpdated(this.rootItem);
    });
    it("does not open submenu on touch pointerenter", async function() {
      expect(this.rootItem.open).to.be.false;
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerenter", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      await aTimeout(150);
      expect(this.rootItem.open).to.be.false;
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerleave", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      await elementUpdated(this.rootItem);
      expect(this.rootItem.open).to.be.false;
    });
    it("opens submenu on touch tap when closed", async function() {
      expect(this.rootItem.open).to.be.false;
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      const opened = oneEvent(this.rootItem, "sp-opened");
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerup", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      await opened;
      expect(this.rootItem.open).to.be.true;
      this.rootItem.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true
        })
      );
      await elementUpdated(this.rootItem);
      expect(this.rootItem.open).to.be.true;
    });
    it("closes submenu on touch tap when open", async function() {
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      const opened = oneEvent(this.rootItem, "sp-opened");
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerup", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      await opened;
      expect(this.rootItem.open).to.be.true;
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      const closed = oneEvent(this.rootItem, "sp-closed");
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerup", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      await closed;
      expect(this.rootItem.open).to.be.false;
    });
    it("does not reopen submenu after touch close due to focus event", async function() {
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      const opened = oneEvent(this.rootItem, "sp-opened");
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerup", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      await opened;
      expect(this.rootItem.open).to.be.true;
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      const closed = oneEvent(this.rootItem, "sp-closed");
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerup", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      await closed;
      expect(this.rootItem.open).to.be.false;
      this.rootItem.dispatchEvent(new Event("focus", { bubbles: true }));
      await aTimeout(100);
      expect(this.rootItem.open, "submenu should stay closed").to.be.false;
    });
    it("prevents duplicate listeners from multiple pointerdown events", async function() {
      expect(this.rootItem.open).to.be.false;
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      const opened = oneEvent(this.rootItem, "sp-opened");
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerup", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      await opened;
      expect(this.rootItem.open).to.be.true;
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      const closed = oneEvent(this.rootItem, "sp-closed");
      this.rootItem.dispatchEvent(
        new PointerEvent("pointerup", {
          bubbles: true,
          pointerType: "touch"
        })
      );
      await closed;
      expect(this.rootItem.open).to.be.false;
      await aTimeout(100);
      expect(this.rootItem.open, "should stay closed").to.be.false;
    });
  });
  describe("mobile view", () => {
    beforeEach(async function() {
      this.rootChanged = spy();
      this.submenuChanged = spy();
      const handleRootChange = (event) => {
        this.rootChanged(event.target.value);
      };
      const handleSubmenuChange = (event) => {
        this.submenuChanged(event.target.value);
      };
      this.el = await fixture(html`
        <sp-menu mobile-view @change=${handleRootChange}>
          <sp-menu-item>No submenu</sp-menu-item>
          <sp-menu-item class="root">
            Has submenu
            <sp-menu slot="submenu" @change=${handleSubmenuChange}>
              <sp-menu-item class="submenu-item-1">One</sp-menu-item>
              <sp-menu-item class="submenu-item-2">Two</sp-menu-item>
              <sp-menu-item class="submenu-item-3">Three</sp-menu-item>
            </sp-menu>
          </sp-menu-item>
        </sp-menu>
      `);
      await elementUpdated(this.el);
      this.rootItem = this.el.querySelector(".root");
      await elementUpdated(this.rootItem);
    });
    it("opens submenu via click (drill-down replaces content)", async function() {
      var _a;
      const menu = this.el;
      expect(menu.mobileView).to.be.true;
      expect(menu.currentMobileSubmenu).to.be.undefined;
      await mouseClickOn(this.rootItem);
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.equal(this.rootItem);
      const backItem = (_a = this.rootItem.submenuElement) == null ? void 0 : _a.querySelector(
        "[data-mobile-back]"
      );
      expect(backItem).to.not.be.null;
    });
    it("navigates back via back button", async function() {
      var _a;
      const menu = this.el;
      await mouseClickOn(this.rootItem);
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.equal(this.rootItem);
      const backItem = (_a = this.rootItem.submenuElement) == null ? void 0 : _a.querySelector(
        "[data-mobile-back]"
      );
      expect(backItem).to.not.be.null;
      await mouseClickOn(backItem);
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.be.undefined;
    });
    it("opens submenu via ArrowRight keyboard", async function() {
      const menu = this.el;
      const input = document.createElement("input");
      menu.insertAdjacentElement("beforebegin", input);
      await sendTabKey();
      await elementUpdated(input);
      expect(document.activeElement).to.equal(input);
      await sendTabKey();
      await elementUpdated(menu);
      await waitUntil(
        () => document.activeElement === menu.children[0],
        "focuses first menu item after tab"
      );
      await sendKeys({ press: "ArrowDown" });
      await elementUpdated(this.rootItem);
      expect(this.rootItem.focused).to.be.true;
      await sendKeys({ press: "ArrowRight" });
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.equal(this.rootItem);
    });
    it("closes submenu via ArrowLeft keyboard", async function() {
      const menu = this.el;
      menu.openMobileSubmenu(this.rootItem);
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.equal(this.rootItem);
      await sendKeys({ press: "ArrowLeft" });
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.be.undefined;
    });
    it("opens submenu via Enter key", async function() {
      const menu = this.el;
      const input = document.createElement("input");
      menu.insertAdjacentElement("beforebegin", input);
      await sendTabKey();
      await elementUpdated(input);
      await sendTabKey();
      await elementUpdated(menu);
      await waitUntil(
        () => document.activeElement === menu.children[0],
        "focuses first menu item after tab"
      );
      await sendKeys({ press: "ArrowDown" });
      await elementUpdated(this.rootItem);
      await sendKeys({ press: "Enter" });
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.equal(this.rootItem);
    });
    it("resets mobile submenu stack on resetMobileSubmenus", async function() {
      const menu = this.el;
      menu.openMobileSubmenu(this.rootItem);
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.equal(this.rootItem);
      menu.resetMobileSubmenus();
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.be.undefined;
    });
    it("does not open overlay on hover in mobile mode", async function() {
      expect(this.rootItem.open).to.be.false;
      await mouseMoveOver(this.rootItem);
      await aTimeout(200);
      expect(this.rootItem.open).to.be.false;
    });
    it("supports multi-level drill-down", async function() {
      const subSubmenuChanged = spy();
      const handleSubSubmenuChange = (event) => {
        subSubmenuChanged(event.target.value);
      };
      const el = await fixture(html`
        <sp-menu mobile-view>
          <sp-menu-item class="level1">
            Level 1
            <sp-menu slot="submenu">
              <sp-menu-item class="level2">
                Level 2
                <sp-menu slot="submenu" @change=${handleSubSubmenuChange}>
                  <sp-menu-item class="level3-item">Level 3 item</sp-menu-item>
                </sp-menu>
              </sp-menu-item>
            </sp-menu>
          </sp-menu-item>
        </sp-menu>
      `);
      await elementUpdated(el);
      const level1 = el.querySelector(".level1");
      await elementUpdated(level1);
      el.openMobileSubmenu(level1);
      await elementUpdated(el);
      expect(el.currentMobileSubmenu).to.equal(level1);
      const level2 = el.querySelector(".level2");
      if (level2) {
        el.openMobileSubmenu(level2);
        await elementUpdated(el);
        expect(el.currentMobileSubmenu).to.equal(level2);
      }
      el.closeMobileSubmenu();
      await elementUpdated(el);
      expect(el.currentMobileSubmenu).to.equal(level1);
      el.closeMobileSubmenu();
      await elementUpdated(el);
      expect(el.currentMobileSubmenu).to.be.undefined;
    });
    it("closes submenu via Escape key", async function() {
      const menu = this.el;
      menu.openMobileSubmenu(this.rootItem);
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.equal(this.rootItem);
      await sendKeys({ press: "Escape" });
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.be.undefined;
    });
    it("handleKeydown does not eat ArrowDown/ArrowUp at the root level", async function() {
      const menu = this.el;
      const input = document.createElement("input");
      menu.insertAdjacentElement("beforebegin", input);
      await sendTabKey();
      await elementUpdated(input);
      await sendTabKey();
      await elementUpdated(menu);
      await waitUntil(
        () => document.activeElement === menu.children[0],
        "focuses first menu item after tab"
      );
      const firstItem = menu.children[0];
      expect(firstItem.focused).to.be.true;
      await sendKeys({ press: "ArrowDown" });
      await elementUpdated(menu);
      expect(this.rootItem.focused).to.be.true;
      input.remove();
    });
    it("Arrow Down from back row focuses first nested item", async function() {
      const menu = this.el;
      menu.openMobileSubmenu(this.rootItem);
      await elementUpdated(menu);
      expect(menu.currentMobileSubmenu).to.equal(this.rootItem);
      const submenuEl = this.rootItem.submenuElement;
      const backItem = submenuEl.querySelector(
        ".mobile-back-button"
      );
      const firstItem = submenuEl.querySelector(".submenu-item-1");
      await elementUpdated(backItem);
      await elementUpdated(firstItem);
      backItem.tabIndex = 0;
      backItem.focused = true;
      backItem.focus();
      await elementUpdated(backItem);
      expect(document.activeElement === backItem).to.be.true;
      await sendKeys({ press: "ArrowDown" });
      await elementUpdated(menu);
      expect(document.activeElement === firstItem).to.be.true;
    });
    it("navigates correctly in RTL mode", async function() {
      const el = await fixture(html`
        <sp-menu mobile-view dir="rtl">
          <sp-menu-item class="rtl-root">
            Has submenu
            <sp-menu slot="submenu">
              <sp-menu-item class="rtl-sub-item">Sub item</sp-menu-item>
            </sp-menu>
          </sp-menu-item>
        </sp-menu>
      `);
      await elementUpdated(el);
      const rootItem = el.querySelector(".rtl-root");
      await elementUpdated(rootItem);
      el.openMobileSubmenu(rootItem);
      await elementUpdated(el);
      expect(el.currentMobileSubmenu).to.equal(rootItem);
      await sendKeys({ press: "ArrowRight" });
      await elementUpdated(el);
      expect(el.currentMobileSubmenu).to.be.undefined;
    });
  });
});
//# sourceMappingURL=submenu.test.js.map
