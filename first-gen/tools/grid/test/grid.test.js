"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  nextFrame,
  waitUntil
} from "@open-wc/testing";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/grid/sp-grid.js";
import { Default } from "../stories/grid.stories.js";
import { emulateMedia, sendKeys, sendMouse } from "@web/test-runner-commands";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { isWebKit } from "@spectrum-web-components/shared";
describe("Grid", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <div>${Default()}</div>
            `)
  );
  beforeEach(() => {
    emulateMedia({ reducedMotion: "reduce" });
  });
  afterEach(() => {
    emulateMedia({ reducedMotion: "no-preference" });
  });
  it("loads default grid accessibly", async () => {
    const test = await fixture(html`
            <div>${Default()}</div>
        `);
    const el = test.querySelector("sp-grid");
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("accepts focus", async () => {
    const test = await fixture(html`
            <div>${Default()}</div>
        `);
    const el = test.querySelector("sp-grid");
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(0);
    await sendKeys({ press: "Tab" });
    await sendKeys({ press: "Tab" });
    await nextFrame();
    await nextFrame();
    if (!isWebKit()) {
      sendMouse({
        type: "click",
        position: [0, 0]
      });
    }
    expect(
      el.querySelector(el.focusableSelector) === document.activeElement
    ).to.be.true;
  });
  it("does not focus when clicking grid", async () => {
    const test = await fixture(html`
            <sp-theme color="light" scale="medium">${Default()}</sp-theme>
        `);
    const el = test.querySelector("sp-grid");
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(0);
    await sendKeys({ press: "Tab" });
    await sendKeys({ press: "Tab" });
    await nextFrame();
    await nextFrame();
    const firstItem = el.querySelector(el.focusableSelector);
    expect(firstItem === document.activeElement).to.be.true;
    const firstRect = firstItem == null ? void 0 : firstItem.getBoundingClientRect();
    const position = [
      Math.round(firstRect.x + firstRect.width + 2),
      Math.round(firstRect.y + 2)
    ];
    await sendMouse({
      type: "click",
      position
    });
    await nextFrame();
    await nextFrame();
    expect(
      el.querySelector(el.focusableSelector) === document.activeElement
    ).to.be.false;
  });
  it("allows to tab in and out", async function() {
    var _a, _b, _c;
    if (/WebKit/.test(navigator.userAgent)) this.skip();
    const test = await fixture(html`
            <div>${Default()}</div>
        `);
    const el = test.querySelector("sp-grid");
    const firstInput = test.querySelector("#first-input");
    const lastInput = test.querySelector("#last-input");
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(0);
    firstInput.focus();
    expect(document.activeElement).to.equal(firstInput);
    expect(el.tabIndex).to.equal(0);
    await sendKeys({ press: "Tab" });
    await waitUntil(
      () => {
        const firstItem2 = el.querySelector(
          el.focusableSelector
        );
        return firstItem2 === document.activeElement;
      },
      "Grid should receive focus after Tab",
      { timeout: 5e3 }
    );
    const firstItem = el.querySelector(el.focusableSelector);
    if (document.activeElement !== firstItem) {
      firstItem.focus();
    }
    expect(document.activeElement).to.equal(firstItem);
    expect(el.tabIndex).to.equal(-1);
    await sendKeys({ press: "Tab" });
    await waitUntil(
      () => {
        const activeElement2 = document.activeElement;
        return firstItem.contains(activeElement2) && activeElement2.tagName === "SP-ACTION-MENU";
      },
      "Action menu should be focused after Tab",
      { timeout: 5e3 }
    );
    let activeElement = document.activeElement;
    if (!firstItem.contains(activeElement)) {
      activeElement = firstItem.querySelector(
        "sp-action-menu"
      );
      activeElement == null ? void 0 : activeElement.focus();
    }
    expect(firstItem.contains(activeElement)).to.be.true;
    expect(activeElement.tagName).to.equal("SP-ACTION-MENU");
    expect(activeElement.tabIndex).to.equal(-1);
    expect(el.tabIndex).to.equal(-1);
    await sendKeys({ press: "Tab" });
    await waitUntil(
      () => {
        const activeElement2 = document.activeElement;
        return activeElement2.tagName === "SP-CARD";
      },
      "Card should be focused after Tab",
      { timeout: 5e3 }
    );
    activeElement = document.activeElement;
    if (activeElement.tagName !== "SP-CARD") {
      activeElement = el.querySelector("sp-card");
      activeElement == null ? void 0 : activeElement.focus();
    }
    expect(activeElement.tagName).to.equal("SP-CARD");
    expect(activeElement.tabIndex).to.equal(0);
    const shadowCheckbox = (_c = (_a = activeElement.shadowRoot) == null ? void 0 : _a.activeElement) != null ? _c : (_b = activeElement.shadowRoot) == null ? void 0 : _b.querySelector(
      "sp-checkbox"
    );
    expect(shadowCheckbox == null ? void 0 : shadowCheckbox.tagName).to.equal("SP-CHECKBOX");
    expect(shadowCheckbox == null ? void 0 : shadowCheckbox.tabIndex).to.equal(0);
    expect(el.tabIndex).to.equal(-1);
    await sendKeys({ press: "Tab" });
    await waitUntil(
      () => lastInput === document.activeElement,
      "Last input should be focused after Tab",
      { timeout: 5e3 }
    );
    if (document.activeElement !== lastInput) {
      lastInput.focus();
    }
    expect(document.activeElement).to.equal(lastInput);
    expect(el.tabIndex).to.equal(0);
    await sendKeys({ press: "Shift+Tab" });
    await waitUntil(
      () => {
        const backToFirstItem2 = el.querySelector(
          el.focusableSelector
        );
        return backToFirstItem2 === document.activeElement;
      },
      "Grid should receive focus after Shift+Tab",
      { timeout: 5e3 }
    );
    const backToFirstItem = el.querySelector(
      el.focusableSelector
    );
    if (document.activeElement !== backToFirstItem) {
      backToFirstItem.focus();
    }
    expect(document.activeElement).to.equal(backToFirstItem);
    expect(el.tabIndex).to.equal(-1);
  });
  it("manages roving tabindex", async () => {
    const test = await fixture(html`
            <div>${Default()}</div>
        `);
    const el = test.querySelector("sp-grid");
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(0);
    el.focus();
    await nextFrame();
    await nextFrame();
    let focused = el.querySelector(el.focusableSelector);
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({
      press: "ArrowRight"
    });
    focused = el.querySelector(
      `${el.focusableSelector}:nth-child(2)`
    );
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({
      press: "ArrowDown"
    });
    focused = el.querySelector(
      `${el.focusableSelector}:nth-child(5)`
    );
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({
      press: "ArrowLeft"
    });
    focused = el.querySelector(
      `${el.focusableSelector}:nth-child(4)`
    );
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({
      press: "ArrowUp"
    });
    focused = el.querySelector(`${el.focusableSelector}`);
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
  });
  it("manages selection", async () => {
    const test = await fixture(html`
            <div>${Default()}</div>
        `);
    const el = test.querySelector("sp-grid");
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(0);
    el.focus();
    await nextFrame();
    await nextFrame();
    let focused = el.querySelector(el.focusableSelector);
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({
      press: "ArrowRight"
    });
    focused = el.querySelector(
      `${el.focusableSelector}:nth-child(2)`
    );
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({
      press: "Space"
    });
    await elementUpdated(el);
    expect(el.selected).to.deep.equal([{ id: 1 }]);
    await sendKeys({
      press: "ArrowDown"
    });
    focused = el.querySelector(
      `${el.focusableSelector}:nth-child(5)`
    );
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({
      press: "Space"
    });
    await elementUpdated(el);
    expect(el.selected).to.deep.equal([{ id: 1 }, { id: 4 }]);
    await sendKeys({
      press: "ArrowUp"
    });
    focused = el.querySelector(
      `${el.focusableSelector}:nth-child(2)`
    );
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({
      press: "Space"
    });
    await elementUpdated(el);
    expect(el.selected).to.deep.equal([{ id: 4 }]);
  });
  it("does not claim lit-virtualizer on the global registry", async () => {
    const test = await fixture(html`
            <div>${Default()}</div>
        `);
    const el = test.querySelector("sp-grid");
    await elementUpdated(el);
    customElements.define("lit-virtualizer", class extends HTMLElement {
    });
    expect(() => {
      customElements.define(
        "lit-virtualizer",
        class extends HTMLElement {
        }
      );
    }).to.throw();
  });
});
//# sourceMappingURL=grid.test.js.map
