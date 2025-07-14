"use strict";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/action-group/sp-action-group.js";
import "@spectrum-web-components/tabs/sp-tab-panel.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import { elementUpdated, expect, fixture, nextFrame } from "@open-wc/testing";
import { html } from "@spectrum-web-components/base";
import { sendKeys } from "@web/test-runner-commands";
import { sendMouse } from "../../../test/plugins/browser.js";
const createTabs = async () => {
  const tabs = await fixture(html`
        <sp-tabs selected="second">
            <sp-tab label="Tab 1" value="first"></sp-tab>
            <sp-tab label="Tab 2" value="second"></sp-tab>
            <sp-tab label="Tab 3" value="third"></sp-tab>
            <sp-tab-panel value="first">
                <sp-action-group selects="single">
                    <sp-action-button selected value="1">
                        Single Button 1
                    </sp-action-button>
                    <sp-action-button value="2">
                        Single Button 2
                    </sp-action-button>
                    <sp-action-button value="3">
                        Single Button 3
                    </sp-action-button>
                </sp-action-group>
            </sp-tab-panel>
            <sp-tab-panel value="second">
                <sp-action-group selects="multiple">
                    <sp-action-button value="1">
                        Multiple Button 1
                    </sp-action-button>
                    <sp-action-button selected value="2">
                        Multiple Button 2
                    </sp-action-button>
                    <sp-action-button selected value="3">
                        Multiple Button 3
                    </sp-action-button>
                </sp-action-group>
            </sp-tab-panel>
            <sp-tab-panel value="third">
                <sp-action-group>
                    <sp-action-button value="1">None Button 1</sp-action-button>
                    <sp-action-button value="2">None Button 2</sp-action-button>
                    <sp-action-button selected value="3">
                        None Button 3
                    </sp-action-button>
                </sp-action-group>
            </sp-tab-panel>
        </sp-tabs>
    `);
  await elementUpdated(tabs);
  return tabs;
};
const createGroup = async () => {
  const group = await fixture(html`
        <sp-action-group>
            <sp-action-button>Button 1</sp-action-button>
            <sp-action-button>Longer Button 2</sp-action-button>
            <sp-action-button>Short 3</sp-action-button>
            <sp-action-menu label="More Actions">
                <sp-menu-item>One</sp-menu-item>
                <sp-menu-item>Two</sp-menu-item>
                <sp-menu-item>Three</sp-menu-item>
                <sp-menu-item>
                    Select some items
                    <sp-menu slot="submenu" selects="multiple">
                        <sp-menu-item>A</sp-menu-item>
                        <sp-menu-item selected>B</sp-menu-item>
                        <sp-menu-item>C</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
            </sp-action-menu>
        </sp-action-group>
    `);
  await elementUpdated(group);
  return group;
};
describe("Action Group inside of Tabs", () => {
  it("accurately navigates the desired element", async () => {
    const el = await createTabs();
    const tab1 = el.querySelector('sp-tab[value="first"]');
    const tab2 = el.querySelector('sp-tab[value="second"]');
    const tab3 = el.querySelector('sp-tab[value="third"]');
    const tabPanel1 = el.querySelector(
      'sp-tab-panel[value="first"]'
    );
    const tabPanel2 = el.querySelector(
      'sp-tab-panel[value="second"]'
    );
    const tabPanel3 = el.querySelector(
      'sp-tab-panel[value="third"]'
    );
    const actionGroup1 = tabPanel1.querySelector(
      "sp-action-group"
    );
    const actionGroup2 = tabPanel2.querySelector(
      "sp-action-group"
    );
    const actionGroup3 = tabPanel3.querySelector(
      "sp-action-group"
    );
    const actionButton1 = actionGroup1.querySelector(
      "[selected]"
    );
    const actionButton2 = actionGroup2.querySelector(
      "[selected]"
    );
    const actionButton3 = actionGroup3.querySelector(
      "[selected]"
    );
    el.focus();
    expect(el.contains(document.activeElement)).to.be.true;
    expect(document.activeElement === tab2).to.be.true;
    actionGroup2.focus();
    expect(document.activeElement === actionButton2).to.be.true;
    await nextFrame();
    await sendKeys({
      press: "ArrowLeft"
    });
    expect(document.activeElement === tab1).to.be.false;
    expect(actionGroup2.contains(document.activeElement)).to.be.true;
    el.focus();
    expect(document.activeElement === tab2).to.be.true;
    await sendKeys({
      press: "ArrowRight"
    });
    expect(document.activeElement === tab3).to.be.true;
    await sendKeys({
      press: "Enter"
    });
    expect(document.activeElement === tab3).to.be.true;
    actionGroup3.focus();
    expect(document.activeElement === actionButton3).to.be.true;
    await sendKeys({
      press: "ArrowLeft"
    });
    expect(document.activeElement === tab2).to.be.false;
    expect(actionGroup3.contains(document.activeElement)).to.be.true;
    const boundingRect = tab1.getBoundingClientRect();
    await sendMouse({
      steps: [
        {
          type: "click",
          position: [
            boundingRect.left + boundingRect.width / 2,
            boundingRect.top + boundingRect.height / 2
          ]
        }
      ]
    });
    expect(document.activeElement === tab1).to.be.true;
    actionGroup1.focus();
    expect(document.activeElement === actionButton1).to.be.true;
    await sendKeys({
      press: "ArrowRight"
    });
    expect(document.activeElement === tab2).to.be.false;
    expect(actionGroup1.contains(document.activeElement)).to.be.true;
  });
});
describe("Action Menu inside of Action Group", () => {
  it("accurately manages the tabindex of all the elements", async () => {
    var _a, _b;
    const el = await createGroup();
    const actionButton1 = el.querySelector(
      "sp-action-button:nth-child(1)"
    );
    const actionButton2 = el.querySelector(
      "sp-action-button:nth-child(2)"
    );
    const actionButton3 = el.querySelector(
      "sp-action-button:nth-child(3)"
    );
    const actionMenu = el.querySelector("sp-action-menu");
    el.focus();
    expect(document.activeElement === actionButton1).to.be.true;
    await sendKeys({
      press: "ArrowRight"
    });
    expect(document.activeElement === actionButton2).to.be.true;
    expect(actionButton2.tabIndex).to.equal(0);
    expect(actionButton1.tabIndex).to.equal(-1);
    expect(actionButton3.tabIndex).to.equal(-1);
    expect(actionMenu.tabIndex).to.equal(-1);
    await sendKeys({
      press: "ArrowRight"
    });
    expect(document.activeElement === actionButton3).to.be.true;
    expect(actionButton3.tabIndex).to.equal(0);
    expect(actionButton2.tabIndex).to.equal(-1);
    expect(actionButton1.tabIndex).to.equal(-1);
    expect(actionMenu.tabIndex).to.equal(-1);
    await sendKeys({
      press: "ArrowRight"
    });
    expect(document.activeElement === actionMenu).to.be.true;
    expect(actionButton3.tabIndex).to.equal(-1);
    expect(actionButton2.tabIndex).to.equal(-1);
    expect(actionButton1.tabIndex).to.equal(-1);
    expect((_a = actionMenu.shadowRoot) == null ? void 0 : _a.querySelector("sp-action-button")).to.exist;
    expect(
      ((_b = actionMenu.shadowRoot) == null ? void 0 : _b.querySelector(
        "sp-action-button"
      )).tabIndex
    ).to.equal(0);
  });
});
describe("tabIndex is cached properly", () => {
  it("cache is managed properly", async () => {
    var _a, _b, _c;
    const menuEl = await fixture(html`
            <sp-action-menu label="More Actions">
                <sp-menu-item>One</sp-menu-item>
                <sp-menu-item>Two</sp-menu-item>
                <sp-menu-item>Three</sp-menu-item>
            </sp-action-menu>
        `);
    expect(
      (_a = menuEl.focusElement) == null ? void 0 : _a.tabIndex,
      "button tabindex before disabling"
    ).to.equal(0);
    menuEl.disabled = true;
    await elementUpdated(menuEl);
    expect(
      (_b = menuEl.focusElement) == null ? void 0 : _b.tabIndex,
      "button tabindex after disabling"
    ).to.equal(-1);
    menuEl.disabled = false;
    await elementUpdated(menuEl);
    expect(
      (_c = menuEl.focusElement) == null ? void 0 : _c.tabIndex,
      "button tabindex after setting to 0"
    ).to.equal(0);
  });
});
//# sourceMappingURL=roving-tabindex-integration.test.js.map
