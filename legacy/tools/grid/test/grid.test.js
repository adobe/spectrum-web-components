"use strict";
import { elementUpdated, expect, fixture, nextFrame } from "@open-wc/testing";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/grid/sp-grid.js";
import { Default } from "../stories/grid.stories.js";
import { sendKeys, sendMouse } from "@web/test-runner-commands";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { isWebKit } from "@spectrum-web-components/shared";
describe("Grid", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <div>${Default()}</div>
            `)
  );
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
  it("allows to tab in and out", async () => {
    const test = await fixture(html`
            <div>${Default()}</div>
        `);
    const el = test.querySelector("sp-grid");
    const firstInput = test.querySelector("#first-input");
    const lastInput = test.querySelector("#last-input");
    await elementUpdated(el);
    expect(el.tabIndex).to.equal(0);
    firstInput.focus();
    expect(firstInput === document.activeElement).to.be.true;
    expect(el.tabIndex).to.equal(0);
    await sendKeys({
      press: "Tab"
    });
    await nextFrame();
    await nextFrame();
    expect(
      el.querySelector(el.focusableSelector) === document.activeElement
    ).to.be.true;
    expect(el.tabIndex).to.equal(-1);
    await sendKeys({
      press: "Tab"
    });
    await nextFrame();
    await nextFrame();
    await elementUpdated(el);
    expect(lastInput === document.activeElement).to.be.true;
    expect(el.tabIndex).to.equal(0);
    await sendKeys({
      press: "Shift+Tab"
    });
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await nextFrame();
    expect(
      el.querySelector(el.focusableSelector) === document.activeElement
    ).to.be.true;
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
