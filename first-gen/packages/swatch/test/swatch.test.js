"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { spy } from "sinon";
import { sendKeys } from "@web/test-runner-commands";
import "@spectrum-web-components/swatch/sp-swatch.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Swatch", () => {
  let el;
  beforeEach(async () => {
    el = await fixture(html`
            <sp-swatch color="red" label="Red"></sp-swatch>
        `);
    await elementUpdated(el);
  });
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-swatch color="red" label="Red"></sp-swatch>
            `)
  );
  it(`loads default swatch accessibly`, async () => {
    await expect(el).to.be.accessible();
  });
  it("loads [mixed-value] swatch accessibly", async () => {
    el.mixedValue = true;
    await expect(el).to.be.accessible();
    expect(el.getAttribute("aria-label")).to.equal("Red");
    el.removeAttribute("label");
    await elementUpdated(el);
    expect(el.getAttribute("aria-label")).to.equal("red");
    el.removeAttribute("color");
    await elementUpdated(el);
    expect(el.getAttribute("aria-label")).to.equal("Mixed");
  });
  it("loads [nothing] swatch accessibly", async () => {
    el.nothing = true;
    el.removeAttribute("color");
    el.label = "Transparent";
    await expect(el).to.be.accessible();
    expect(el.getAttribute("aria-label")).to.equal("Transparent");
  });
  ["xs", "s", "m", "l"].map((size) => {
    it(`loads [mixed-value] swatch accessibly as [size=${size}]`, async () => {
      el.mixedValue = true;
      el.removeAttribute("color");
      el.label = "Mixed Value";
      el.size = size;
      await expect(el).to.be.accessible();
      expect(el.getAttribute("aria-label")).to.equal("Mixed Value");
    });
  });
  it("toggles on `click`", async () => {
    expect(el.selected).to.be.false;
    el.click();
    expect(el.selected).to.be.true;
    await expect(el).to.be.accessible();
  });
  it('toggles on `click` as [role="checkbox"]', async () => {
    el.role = "checkbox";
    await elementUpdated(el);
    expect(el.selected).to.be.false;
    await expect(el).to.be.accessible();
    el.click();
    expect(el.selected).to.be.true;
    await expect(el).to.be.accessible();
  });
  it("toggles on `Space`", async () => {
    expect(el.selected).to.be.false;
    el.focus();
    await sendKeys({
      press: "Space"
    });
    expect(el.selected).to.be.true;
  });
  it("toggles on `Enter`", async () => {
    expect(el.selected).to.be.false;
    el.focus();
    await sendKeys({
      press: "Enter"
    });
    expect(el.selected).to.be.true;
    await sendKeys({
      press: "NumpadEnter"
    });
    expect(el.selected).to.be.false;
  });
  it("dispatches `change`", async () => {
    const changeSpy = spy();
    el.addEventListener("change", () => changeSpy());
    el.click();
    expect(changeSpy.calledOnce).to.be.true;
  });
  it("does not dispatch `change` when [disabled]", async () => {
    const changeSpy = spy();
    el.addEventListener("change", () => changeSpy());
    el.disabled = true;
    await elementUpdated(el);
    el.click();
    expect(changeSpy.calledOnce).to.be.false;
  });
  it("does not dispatch `change` when [mixed-value]", async () => {
    const changeSpy = spy();
    el.addEventListener("change", () => changeSpy());
    el.mixedValue = true;
    await elementUpdated(el);
    el.click();
    expect(changeSpy.calledOnce).to.be.false;
  });
  it("can have `change` prevented", async () => {
    el.addEventListener("change", (event) => {
      event.preventDefault();
    });
    expect(el.selected).to.false;
    el.click();
    expect(el.selected).to.false;
  });
  it("is in the tab order", async () => {
    const inputBefore = document.createElement("input");
    const inputAfter = document.createElement("input");
    el.insertAdjacentElement("beforebegin", inputBefore);
    el.insertAdjacentElement("afterend", inputAfter);
    inputBefore.focus();
    expect(document.activeElement === el).to.be.false;
    await sendKeys({
      press: "Tab"
    });
    expect(document.activeElement === el).to.be.true;
    await sendKeys({
      press: "Tab"
    });
    expect(document.activeElement === el).to.be.false;
    await sendKeys({
      press: "Shift+Tab"
    });
    expect(document.activeElement === el).to.be.true;
  });
  it("is not in the tab order when [disabled]", async () => {
    const inputBefore = document.createElement("input");
    const inputAfter = document.createElement("input");
    el.insertAdjacentElement("beforebegin", inputBefore);
    el.insertAdjacentElement("afterend", inputAfter);
    inputBefore.focus();
    el.disabled = true;
    await elementUpdated(el);
    expect(document.activeElement === el).to.be.false;
    await sendKeys({
      press: "Tab"
    });
    expect(document.activeElement === el).to.be.false;
    await sendKeys({
      press: "Shift+Tab"
    });
    expect(document.activeElement === el).to.be.false;
  });
});
//# sourceMappingURL=swatch.test.js.map
