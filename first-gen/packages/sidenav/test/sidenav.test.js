"use strict";
import "@spectrum-web-components/sidenav/sp-sidenav.js";
import "@spectrum-web-components/sidenav/sp-sidenav-item.js";
import "@spectrum-web-components/sidenav/sp-sidenav-heading.js";
import { SideNavItem } from "@spectrum-web-components/sidenav";
import { manageTabIndex } from "../stories/sidenav.stories.js";
import {
  arrowDownEvent,
  arrowUpEvent,
  shiftTabEvent
} from "../../../test/testing-helpers.js";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame,
  waitUntil
} from "@open-wc/testing";
import { LitElement } from "@spectrum-web-components/base";
import { spy } from "sinon";
import { sendMouse } from "../../../test/plugins/browser.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Sidenav", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-sidenav>
                    <sp-sidenav-heading label="CATEGORY 1">
                        <sp-sidenav-item
                            value="Section 1"
                            label="Section 1"
                        ></sp-sidenav-item>
                        <sp-sidenav-item
                            value="Section 2"
                            label="Section 2"
                        ></sp-sidenav-item>
                    </sp-sidenav-heading>
                </sp-sidenav>
            `)
  );
  it("loads", async () => {
    const el = await fixture(html`
            <sp-sidenav>
                <sp-sidenav-heading label="CATEGORY 1">
                    <sp-sidenav-item
                        value="Section 1"
                        label="Section 1"
                    ></sp-sidenav-item>
                    <sp-sidenav-item
                        value="Section 2"
                        label="Section 2"
                    ></sp-sidenav-item>
                </sp-sidenav-heading>
            </sp-sidenav>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("does not accept focus/click/blur when empty", async () => {
    const el = await fixture(html`
            <sp-sidenav></sp-sidenav>
        `);
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
    el.focus();
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
    el.blur();
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
    el.click();
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
  });
  it("does not accept keyboard events when items are not present", async () => {
    const errorSpy = spy();
    const el = await fixture(html`
            <sp-sidenav>
                <sp-sidenav-item
                    value="Section 1"
                    label="Section 1"
                ></sp-sidenav-item>
            </sp-sidenav>
        `);
    await elementUpdated(el);
    const item = el.querySelector("sp-sidenav-item");
    window.addEventListener("error", () => errorSpy());
    el.dispatchEvent(new FocusEvent("focusin"));
    item.remove();
    await elementUpdated(el);
    el.dispatchEvent(
      new KeyboardEvent("keydown", {
        code: "ArrowDown"
      })
    );
    expect(errorSpy.callCount).to.equal(0);
  });
  it("does not accept focus when all children [disabled]", async () => {
    const el = await fixture(html`
            <sp-sidenav>
                <sp-sidenav-item
                    disabled
                    value="Section 1"
                    label="Section 1"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    disabled
                    value="Section 2"
                    label="Section 2"
                ></sp-sidenav-item>
            </sp-sidenav>
        `);
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
    el.focus();
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
    expect(el.matches(":focus-within")).to.be.false;
  });
  it("sets manageTabIndex on new children", async () => {
    const el = await fixture(html`
            <sp-sidenav>
                <sp-sidenav-item
                    value="Section 1"
                    label="Section 1"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 2"
                    label="Section 2"
                ></sp-sidenav-item>
            </sp-sidenav>
        `);
    await elementUpdated(el);
    expect(el.manageTabIndex).to.be.false;
    const item1 = el.querySelector("sp-sidenav-item");
    expect(item1.tabIndex).to.equal(0);
    const newItem = document.createElement("sp-sidenav-item");
    newItem.value = "Section 3";
    newItem.label = "Section 3";
    el.appendChild(newItem);
    await elementUpdated(newItem);
    expect(newItem.tabIndex).to.equal(0);
    el.focus();
    const focused = document.activeElement;
    focused.click();
    expect(focused.selected).to.be.true;
    el.dispatchEvent(shiftTabEvent());
    const outsideFocused = document.activeElement;
    expect(typeof outsideFocused).not.to.equal(SideNavItem);
  });
  it("handles select", async () => {
    const changeSpy = spy();
    const el = await fixture(html`
            <sp-sidenav @change=${() => changeSpy()}>
                <sp-sidenav-heading label="CATEGORY 1">
                    <sp-sidenav-item
                        value="Section 1"
                        label="Section 1"
                    ></sp-sidenav-item>
                    <sp-sidenav-item value="Section 2" label="Section 2">
                        <sp-sidenav-item
                            value="Section 2a"
                            label="Section 2a"
                        ></sp-sidenav-item>
                    </sp-sidenav-item>
                </sp-sidenav-heading>
            </sp-sidenav>
        `);
    await elementUpdated(el);
    expect(el.value).to.be.undefined;
    const sidenavItem = el.querySelector(
      '[value="Section 2"]'
    );
    sidenavItem.dispatchEvent(
      new CustomEvent("sidenav-select", {
        bubbles: true,
        detail: {
          value: "Section 2"
        }
      })
    );
    await elementUpdated(el);
    expect(el.value).to.equal("Section 2");
    expect(changeSpy.callCount).to.equal(1);
    sidenavItem.click();
    await elementUpdated(sidenavItem);
    const sidenavItemChild = el.querySelector(
      '[value="Section 2a"]'
    );
    sidenavItemChild.click();
    await elementUpdated(el);
    expect(el.value).to.equal("Section 2a");
    expect(changeSpy.callCount).to.equal(2);
  });
  it("prevents selection", async () => {
    const changeSpy = spy();
    const el = await fixture(html`
            <sp-sidenav
                @change=${(event) => {
      event.preventDefault();
      changeSpy();
    }}
            >
                <sp-sidenav-heading label="CATEGORY 1">
                    <sp-sidenav-item
                        value="Section 1"
                        label="Section 1"
                    ></sp-sidenav-item>
                    <sp-sidenav-item value="Section 2" label="Section 2" opened>
                        <sp-sidenav-item
                            value="Section 2a"
                            label="Section 2a"
                        ></sp-sidenav-item>
                    </sp-sidenav-item>
                </sp-sidenav-heading>
            </sp-sidenav>
        `);
    await elementUpdated(el);
    expect(el.value).to.be.undefined;
    el.click();
    await elementUpdated(el);
    expect(el.value).to.be.undefined;
    expect(changeSpy.callCount).to.equal(1);
  });
  it("prevents [tabindex=0] while `focusin`", async () => {
    const el = await fixture(manageTabIndex());
    const selected = el.querySelector('[value="Section 1"]');
    const toBeSelected = el.querySelector(
      '[value="Section 0"]'
    );
    await elementUpdated(el);
    await waitUntil(() => el.value === "Section 1", "wait for selection");
    expect(el.value).to.equal("Section 1");
    expect(selected.tabIndex, "initially 0").to.equal(0);
    expect(toBeSelected.tabIndex, "initially -1").to.equal(-1);
    el.focus();
    await elementUpdated(el);
    expect(el.value).to.equal("Section 1");
    expect(selected.tabIndex, "0 when focusin").to.equal(0);
    el.blur();
    await elementUpdated(el);
    expect(el.value).to.equal("Section 1");
    expect(selected.tabIndex, "0 when blur").to.equal(0);
    const bindingRect = toBeSelected.getBoundingClientRect();
    await sendMouse({
      steps: [
        {
          type: "click",
          position: [
            bindingRect.x + bindingRect.width / 2,
            bindingRect.y + bindingRect.height / 2
          ]
        }
      ]
    });
    toBeSelected.dispatchEvent(
      new CustomEvent("sidenav-select", {
        bubbles: true,
        detail: {
          value: "Section 0"
        }
      })
    );
    await elementUpdated(el);
    expect(el.value).to.equal("Section 0");
    expect(toBeSelected.tabIndex, "will be new focusable child").to.equal(
      0
    );
    expect(selected.tabIndex, "no longer selected").to.equal(-1);
  });
  it("manage tab index", async () => {
    const el = await fixture(manageTabIndex());
    await elementUpdated(el);
    expect(el.value).to.equal("Section 1");
    el.focus();
    el.dispatchEvent(arrowUpEvent());
    let focused = document.activeElement;
    focused.click();
    await elementUpdated(el);
    expect(el.value).to.equal("Section 0");
    el.focus();
    el.dispatchEvent(arrowDownEvent());
    el.dispatchEvent(arrowDownEvent());
    focused = document.activeElement;
    expect(focused.expanded, "not expanded").to.be.false;
    focused.click();
    await elementUpdated(el);
    expect(focused.expanded, "expanded").to.be.true;
    el.dispatchEvent(arrowDownEvent());
    await elementUpdated(el);
    focused = document.activeElement;
    focused.click();
    await elementUpdated(el);
    expect(el.value).to.equal("Section 3a");
    document.body.focus();
    el.focus();
    focused = document.activeElement;
    expect(focused.selected, "selected").to.be.true;
    el.dispatchEvent(shiftTabEvent());
    const outsideFocused = document.activeElement;
    expect(typeof outsideFocused).not.to.equal(SideNavItem);
  });
  it("focuses the child anchor not the root when [tabindex=-1]", async () => {
    const el = await fixture(manageTabIndex());
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await elementUpdated(el);
    const firstItem = el.querySelector(
      '[value="Section 0"]'
    );
    const selected = el.querySelector("[selected]");
    expect(selected.tabIndex).to.equal(0);
    expect(firstItem.tabIndex).to.equal(-1);
    const firstRect = firstItem.getBoundingClientRect();
    await sendMouse({
      steps: [
        {
          type: "click",
          position: [
            firstRect.x + firstRect.width / 2,
            firstRect.y + firstRect.height / 2
          ]
        }
      ]
    });
    await elementUpdated(el);
    expect(firstItem.matches(":focus"), "root has focus").to.be.true;
    expect(
      firstItem.focusElement.matches(":focus"),
      "child has more precise focus"
    ).to.be.true;
  });
  it("manage tab index through shadow DOM", async () => {
    class SideNavTestEl extends LitElement {
      render() {
        return manageTabIndex();
      }
    }
    customElements.define("sidenav-test-el", SideNavTestEl);
    const el = await fixture(html`
            <sidenav-test-el></sidenav-test-el>
        `);
    await elementUpdated(el);
    const rootNode = el.shadowRoot;
    const sidenavEl = rootNode.querySelector("sp-sidenav");
    await elementUpdated(sidenavEl);
    expect(sidenavEl.value).to.equal("Section 1");
    sidenavEl.focus();
    sidenavEl.dispatchEvent(arrowUpEvent());
    let focused = rootNode.activeElement;
    focused.focusElement.click();
    await elementUpdated(sidenavEl);
    expect(sidenavEl.value).to.equal("Section 0");
    sidenavEl.focus();
    sidenavEl.dispatchEvent(arrowDownEvent());
    sidenavEl.dispatchEvent(arrowDownEvent());
    focused = rootNode.activeElement;
    expect(focused.expanded).to.be.false;
    focused.focusElement.click();
    await elementUpdated(sidenavEl);
    expect(focused.expanded).to.be.true;
    sidenavEl.dispatchEvent(arrowDownEvent());
    await elementUpdated(sidenavEl);
    focused = rootNode.activeElement;
    focused.focusElement.click();
    await elementUpdated(sidenavEl);
    expect(sidenavEl.value).to.equal("Section 3a");
    document.body.focus();
    sidenavEl.focus();
    focused = rootNode.activeElement;
    expect(focused.selected).to.be.true;
    sidenavEl.dispatchEvent(shiftTabEvent());
    const outsideFocused = rootNode.activeElement;
    expect(typeof outsideFocused).not.to.equal(SideNavItem);
  });
  it("manage tab index for late added items", async () => {
    const el = await fixture(html`
            <sp-sidenav manage-tab-index>
                <sp-sidenav-item
                    value="Section 0"
                    label="Section 0"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 1"
                    label="Section 1"
                ></sp-sidenav-item>
            </sp-sidenav>
        `);
    await elementUpdated(el);
    expect(el.manageTabIndex).to.be.true;
    const item1 = el.querySelector("sp-sidenav-item");
    const item2 = el.querySelector(
      "sp-sidenav-item:nth-child(2)"
    );
    await elementUpdated(item1);
    await elementUpdated(item2);
    expect(item1.tabIndex, "first item tabindex").to.equal(0);
    expect(item2.tabIndex, "second item tabindex").to.equal(-1);
    const item3 = document.createElement("sp-sidenav-item");
    item3.value = "Section 2";
    item3.label = "Section 2";
    await elementUpdated(el);
    el.appendChild(item3);
    await elementUpdated(item3);
    await elementUpdated(el);
    await waitUntil(() => item3.tabIndex === -1, "after");
  });
});
//# sourceMappingURL=sidenav.test.js.map
