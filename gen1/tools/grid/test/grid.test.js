"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  nextFrame,
  waitUntil
} from "@open-wc/testing";
import { emulateMedia, resetMouse, sendKeys } from "@web/test-runner-commands";
import { html } from "@spectrum-web-components/base";
import { isWebKit } from "@spectrum-web-components/shared";
import "@spectrum-web-components/grid/sp-grid.js";
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/theme-light.js";
import {
  mouseClickOn,
  sendShiftTabKey,
  sendTabKey,
  testForLitDevWarnings
} from "../../../test/testing-helpers.js";
import { Default } from "../stories/grid.stories.js";
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
  it("should accept focus when tabbing into the grid", async () => {
    const test = await fixture(html`
      <div>${Default()}</div>
    `);
    const el = test.querySelector("sp-grid");
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(0);
    await sendTabKey();
    await sendTabKey();
    await nextFrame();
    await nextFrame();
    if (!isWebKit()) {
      resetMouse();
    }
    expect(el.querySelector(el.focusableSelector) === document.activeElement).to.be.true;
  });
  it("should not focus the grid when clicking inside the grid after an item is focused", async () => {
    const test = await fixture(html`
      <div>${Default()}</div>
    `);
    const el = test.querySelector("sp-grid");
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(0);
    await sendTabKey();
    await sendTabKey();
    await nextFrame();
    await nextFrame();
    const firstItem = el.querySelector(el.focusableSelector);
    expect(firstItem === document.activeElement).to.be.true;
    await mouseClickOn(el, "top-right");
    await elementUpdated(firstItem);
    expect(el.querySelector(el.focusableSelector) === document.activeElement).to.be.false;
  });
  it.skip("allows to tab in and out", async function() {
    var _a, _b, _c, _d, _e;
    const test = await fixture(html`
      <div>${Default()}</div>
    `);
    const grid = test.querySelector("sp-grid");
    const firstInput = test.querySelector("#first-input");
    const lastInput = test.querySelector("#last-input");
    const firstCard = grid.querySelector(grid.focusableSelector);
    const actionMenu = firstCard.querySelector("sp-action-menu");
    await elementUpdated(grid);
    expect(grid.tabIndex, "Grid initial tabIndex").to.equal(0);
    await waitUntil(
      () => sendTabKey(),
      "First input should receive focus after first tab"
    );
    expect(
      document.activeElement,
      "Active element is first input outside grid"
    ).to.equal(firstInput);
    await waitUntil(
      () => sendTabKey(),
      "First card should receive focus after second tab"
    );
    if (document.activeElement !== firstCard) {
      await firstCard.focus();
    }
    await elementUpdated(grid);
    expect(
      document.activeElement,
      "Active element is first card inside grid"
    ).to.equal(firstCard);
    expect(
      document.activeElement.tabIndex,
      "First card tabIndex after card focus"
    ).to.equal(0);
    expect(grid.tabIndex, "Grid tabIndex after card focus").to.equal(-1);
    await waitUntil(
      () => sendTabKey(),
      "Action menu should receive focus after third tab"
    );
    if (!firstCard.contains(document.activeElement)) {
      await (actionMenu == null ? void 0 : actionMenu.focus());
    }
    await elementUpdated(grid);
    expect(
      firstCard.contains(document.activeElement),
      "Action menu is inside first card is active element"
    ).to.be.true;
    expect(document.activeElement).to.equal(actionMenu);
    expect(actionMenu.tabIndex, "action menu tabIndex is 0").to.equal(0);
    expect(grid.tabIndex, "Grid tabIndex after action menu focus").to.equal(-1);
    await waitUntil(
      () => sendTabKey(),
      "First card with checkbox should receive focus after fourth tab"
    );
    if (document.activeElement !== firstCard) {
      firstCard == null ? void 0 : firstCard.focus();
    }
    await elementUpdated(grid);
    expect(
      document.activeElement,
      "Active element is first card inside grid"
    ).to.equal(firstCard);
    const shadowCheckbox = (_e = (_b = (_a = document.activeElement) == null ? void 0 : _a.shadowRoot) == null ? void 0 : _b.activeElement) != null ? _e : (_d = (_c = document.activeElement) == null ? void 0 : _c.shadowRoot) == null ? void 0 : _d.querySelector(
      "sp-checkbox"
    );
    expect(
      shadowCheckbox == null ? void 0 : shadowCheckbox.tagName,
      "Shadow checkbox tagName is SP-CHECKBOX"
    ).to.equal("SP-CHECKBOX");
    expect(
      shadowCheckbox == null ? void 0 : shadowCheckbox.tabIndex,
      "Shadow checkbox tabIndex is 0"
    ).to.equal(0);
    expect(grid.tabIndex, "Grid tabIndex after second card focus").to.equal(-1);
    await waitUntil(
      () => sendTabKey(),
      "Second card should receive focus after fourth tab"
    );
    if (document.activeElement !== lastInput) {
      await lastInput.focus();
    }
    expect(
      document.activeElement,
      "Active element is last input outside grid"
    ).to.equal(lastInput);
    expect(grid.tabIndex, "Grid tabIndex after last input focus").to.equal(0);
    await waitUntil(
      () => sendShiftTabKey(),
      "First card should receive focus after shift + tab"
    );
    if (document.activeElement !== firstCard) {
      firstCard.focus();
    }
    await elementUpdated(grid);
    expect(
      document.activeElement,
      "Active element is first card inside grid after shift + tab"
    ).to.equal(firstCard);
    expect(grid.tabIndex, "Grid tabIndex after shift + tab").to.equal(-1);
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
    await sendKeys({ press: "ArrowRight" });
    focused = el.querySelector(`${el.focusableSelector}:nth-child(2)`);
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({ press: "ArrowDown" });
    focused = el.querySelector(`${el.focusableSelector}:nth-child(5)`);
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({ press: "ArrowLeft" });
    focused = el.querySelector(`${el.focusableSelector}:nth-child(4)`);
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({ press: "ArrowUp" });
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
    await sendKeys({ press: "ArrowRight" });
    focused = el.querySelector(`${el.focusableSelector}:nth-child(2)`);
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({ press: "Space" });
    await elementUpdated(el);
    expect(el.selected).to.deep.equal([{ id: 1 }]);
    await sendKeys({ press: "ArrowDown" });
    focused = el.querySelector(`${el.focusableSelector}:nth-child(5)`);
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({ press: "Space" });
    await elementUpdated(el);
    expect(el.selected).to.deep.equal([{ id: 1 }, { id: 4 }]);
    await sendKeys({ press: "ArrowUp" });
    focused = el.querySelector(`${el.focusableSelector}:nth-child(2)`);
    await elementUpdated(focused);
    expect(focused === document.activeElement).to.be.true;
    expect(focused.focused).to.be.true;
    await sendKeys({ press: "Space" });
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
      customElements.define("lit-virtualizer", class extends HTMLElement {
      });
    }).to.throw();
  });
});
//# sourceMappingURL=grid.test.js.map
