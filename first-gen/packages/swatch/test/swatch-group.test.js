"use strict";
import { elementUpdated, expect, fixture, nextFrame } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import "@spectrum-web-components/swatch/sp-swatch.js";
import { Default } from "../stories/swatch-group.stories.js";
import { spy, stub } from "sinon";
import { html } from "@spectrum-web-components/base";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Swatch Group", () => {
  let el;
  beforeEach(async () => {
    el = await fixture(Default(Default.args));
    await elementUpdated(el);
  });
  testForLitDevWarnings(
    async () => await fixture(Default(Default.args))
  );
  it("loads default swatch accessibly", async () => {
    await expect(el).to.be.accessible();
  });
  it("forwards `border` to children", async () => {
    el.border = "light";
    await elementUpdated(el);
    [...el.children].forEach((child) => {
      expect(child.border).to.equal("light");
    });
  });
  it("forwards `rounding` to children", async () => {
    el.rounding = "full";
    await elementUpdated(el);
    [...el.children].forEach((child) => {
      expect(child.rounding).to.equal("full");
    });
  });
  it("forwards `size` to children", async () => {
    el.size = "xs";
    await elementUpdated(el);
    [...el.children].forEach((child) => {
      expect(child.size).to.equal("xs");
    });
  });
  it("forwards `shape` to children", async () => {
    el.shape = "rectangle";
    await elementUpdated(el);
    [...el.children].forEach((child) => {
      expect(child.shape).to.equal("rectangle");
    });
  });
  it("unsets forwarding", async () => {
    el.border = "light";
    el.rounding = "full";
    el.size = "xs";
    el.shape = "rectangle";
    await elementUpdated(el);
    [...el.children].forEach((child) => {
      expect(child.border).to.not.be.undefined;
      expect(child.rounding).to.not.be.undefined;
      expect(child.size).to.not.equal("m");
      expect(child.shape).to.not.be.undefined;
    });
    el.border = void 0;
    el.rounding = void 0;
    el.removeAttribute("size");
    el.shape = void 0;
    await elementUpdated(el);
    [...el.children].forEach((child) => {
      expect(child.border).to.equal(void 0);
      expect(child.rounding).to.equal(void 0);
      expect(child.size).to.equal("m");
      expect(child.shape).to.equal(void 0);
    });
  });
  it("does not dispatch `change` events without `selects` attribute", async () => {
    const selectedChild = el.querySelector(
      ":scope > sp-swatch:nth-child(4)"
    );
    const changeSpy = spy();
    el.addEventListener("change", () => changeSpy());
    expect(el.selected).to.deep.equal([]);
    selectedChild.click();
    expect(changeSpy.called).to.be.false;
    expect(el.selected).to.deep.equal([]);
  });
  it('dispatches `change` events as [selects="single"]', async () => {
    el.selects = "single";
    const selectedChild = el.querySelector(
      ":scope > sp-swatch:nth-child(4)"
    );
    const changeSpy = spy();
    el.addEventListener("change", () => changeSpy());
    expect(el.selected).to.deep.equal([]);
    expect(selectedChild.selected).to.be.false;
    selectedChild.click();
    expect(changeSpy.calledOnce).to.be.true;
    expect(el.selected).to.deep.equal([selectedChild.value]);
    expect(selectedChild.selected).to.be.true;
    selectedChild.click();
    expect(changeSpy.calledOnce).to.be.true;
    expect(el.selected).to.deep.equal([selectedChild.value]);
    expect(selectedChild.selected).to.be.true;
  });
  it("can have `change` events prevented", async () => {
    el.selects = "single";
    const selectedChild = el.querySelector(
      ":scope > sp-swatch:nth-child(4)"
    );
    el.addEventListener("change", (event) => event.preventDefault());
    expect(el.selected).to.deep.equal([]);
    expect(selectedChild.selected).to.be.false;
    selectedChild.click();
    expect(el.selected).to.deep.equal([]);
    expect(selectedChild.selected).to.be.false;
  });
  it('dispatches `change` events as [selects="multiple"]', async () => {
    el.selects = "multiple";
    const selectedChild0 = el.querySelector(
      ":scope > sp-swatch:nth-child(1)"
    );
    const selectedChild1 = el.querySelector(
      ":scope > sp-swatch:nth-child(4)"
    );
    const selectedChild2 = el.querySelector(
      ":scope > sp-swatch:nth-child(6)"
    );
    await elementUpdated(selectedChild0);
    const changeSpy = spy();
    el.addEventListener("change", () => changeSpy());
    expect(el.selected).to.deep.equal([]);
    selectedChild0.click();
    selectedChild1.click();
    selectedChild2.click();
    expect(changeSpy.callCount).to.equal(3);
    expect(el.selected).to.deep.equal([
      selectedChild0.value,
      selectedChild1.value,
      selectedChild2.value
    ]);
  });
  it("filters `selected` when a selected Swatch is removed from the DOM", async () => {
    el.selects = "multiple";
    const selectedChild0 = el.querySelector(
      ":scope > sp-swatch:nth-child(1)"
    );
    const selectedChild1 = el.querySelector(
      ":scope > sp-swatch:nth-child(4)"
    );
    const selectedChild2 = el.querySelector(
      ":scope > sp-swatch:nth-child(6)"
    );
    await elementUpdated(selectedChild0);
    expect(el.selected).to.deep.equal([]);
    selectedChild0.click();
    selectedChild1.click();
    selectedChild2.click();
    expect(el.selected).to.deep.equal([
      selectedChild0.value,
      selectedChild1.value,
      selectedChild2.value
    ]);
    selectedChild0.remove();
    await elementUpdated(el);
    expect(el.selected).to.deep.equal([
      selectedChild1.value,
      selectedChild2.value
    ]);
    selectedChild2.remove();
    await elementUpdated(el);
    expect(el.selected).to.deep.equal([selectedChild1.value]);
    selectedChild1.remove();
    await elementUpdated(el);
    expect(el.selected).to.deep.equal([]);
  });
  it("maintains a single tab stop", async () => {
    const inputBefore = document.createElement("input");
    const inputAfter = document.createElement("input");
    el.insertAdjacentElement("beforebegin", inputBefore);
    el.insertAdjacentElement("afterend", inputAfter);
    inputBefore.focus();
    expect(document.activeElement === el.children[0]).to.be.false;
    await sendKeys({
      press: "Tab"
    });
    expect(document.activeElement === el.children[0]).to.be.true;
    await sendKeys({
      press: "Tab"
    });
    expect(document.activeElement === el.children[0]).to.be.false;
    await sendKeys({
      press: "Shift+Tab"
    });
    expect(document.activeElement === el.children[0]).to.be.true;
  });
  it("makes the first selected child the single tab stop", async () => {
    const selectedChild = el.querySelector(
      ":scope > sp-swatch:nth-child(4)"
    );
    expect(selectedChild.selected).to.be.false;
    const inputBefore = document.createElement("input");
    const inputAfter = document.createElement("input");
    el.insertAdjacentElement("beforebegin", inputBefore);
    el.insertAdjacentElement("afterend", inputAfter);
    inputBefore.focus();
    el.selects = "single";
    el.selected = [selectedChild.value];
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    expect(selectedChild.selected).to.be.true;
    expect(document.activeElement === selectedChild).to.be.false;
    await sendKeys({
      press: "Tab"
    });
    expect(document.activeElement === selectedChild).to.be.true;
    await sendKeys({
      press: "Tab"
    });
    expect(document.activeElement === selectedChild).to.be.false;
    await sendKeys({
      press: "Shift+Tab"
    });
    expect(document.activeElement === selectedChild).to.be.true;
  });
  it("focus()es to the first Swatch", async () => {
    el.focus();
    expect(document.activeElement === el.children[0]).to.be.true;
  });
  it("focus()es to the first selected Swatch", async () => {
    const selectedChild = el.querySelector(
      ":scope > sp-swatch:nth-child(4)"
    );
    expect(selectedChild.selected).to.be.false;
    el.selects = "single";
    el.selected = [selectedChild.value];
    await elementUpdated(el);
    await nextFrame();
    expect(selectedChild.selected).to.be.true;
    el.focus();
    expect(document.activeElement === selectedChild).to.be.true;
  });
});
describe("Swatch Group - DOM selected", () => {
  describe("dev mode", () => {
    let consoleWarnStub;
    before(() => {
      window.__swc.verbose = true;
      consoleWarnStub = stub(console, "warn");
    });
    afterEach(() => {
      consoleWarnStub.resetHistory();
    });
    after(() => {
      window.__swc.verbose = false;
      consoleWarnStub.restore();
    });
    it('warns in Dev Mode when mixed-value attribute is added in sp-swatch when parent sp-swatch-group is not having selects="multiple"', async () => {
      const el = await fixture(
        html`
                    <sp-swatch-group selects="single">
                        <sp-swatch mixed-value></sp-swatch>
                    </sp-swatch-group>
                `
      );
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();
      expect(consoleWarnStub.called).to.be.true;
      const spyCall = consoleWarnStub.getCall(0);
      expect(
        spyCall.args.at(0).includes(
          '<sp-swatch> elements can only leverage the "mixed-value" attribute when their <sp-swatch-group> parent element is also leveraging "selects="multiple"'
        ),
        "confirm warning message"
      ).to.be.true;
      expect(spyCall.args.at(-1), "confirm `data` shape").to.deep.equal({
        data: {
          localName: "sp-swatch-group",
          type: "accessibility",
          level: "default"
        }
      });
    });
  });
  it("accepts selection from DOM", async () => {
    const el = await fixture(html`
            <sp-swatch-group selects="multiple">
                <sp-swatch value="color-0" color="red"></sp-swatch>
                <sp-swatch value="color-1" color="green" selected></sp-swatch>
                <sp-swatch value="color-2" color="blue"></sp-swatch>
                <sp-swatch value="color-3" color="yellow" selected></sp-swatch>
            </sp-swatch-group>
        `);
    await elementUpdated(el);
    expect(el.selected).to.deep.equal(["color-1", "color-3"]);
  });
  it("merges `selected` and selection from DOM", async function() {
    const el = await fixture(html`
            <sp-swatch-group selects="multiple" .selected=${["color-1"]}>
                <sp-swatch value="color-0" color="red"></sp-swatch>
                <sp-swatch value="color-1" color="green"></sp-swatch>
                <sp-swatch value="color-2" color="blue"></sp-swatch>
                <sp-swatch value="color-3" color="yellow" selected></sp-swatch>
            </sp-swatch-group>
        `);
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    expect(el.selected).to.deep.equal(["color-1", "color-3"]);
  });
  it("lazily accepts selection from DOM", async function() {
    const el = await fixture(html`
            <sp-swatch-group selects="multiple">
                <sp-swatch value="color-0" color="red"></sp-swatch>
                <sp-swatch value="color-1" color="green"></sp-swatch>
                <sp-swatch value="color-2" color="blue"></sp-swatch>
                <sp-swatch value="color-3" color="yellow" selected></sp-swatch>
            </sp-swatch-group>
        `);
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    const color1 = el.querySelector('[value="color-1"]');
    expect(el.selected).to.deep.equal(["color-3"]);
    color1.selected = true;
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    expect(el.selected).to.deep.equal(["color-3", "color-1"]);
  });
  it("clears previously selected children when updating `selected`", async () => {
    const el = await fixture(html`
            <sp-swatch-group selects="single" .selected=${["color-1"]}>
                <sp-swatch value="color-0" color="red"></sp-swatch>
                <sp-swatch value="color-1" color="green"></sp-swatch>
                <sp-swatch value="color-2" color="blue"></sp-swatch>
            </sp-swatch-group>
        `);
    await elementUpdated(el);
    expect(el.selected).to.deep.equal(["color-1"]);
    el.selected = ["color-2"];
    await elementUpdated(el);
    expect(el.selected).to.deep.equal(["color-2"]);
  });
});
describe("Swatch Group - slotted", () => {
  it('manages [selects="single"] selection through multiple slots', async () => {
    const test = await fixture(
      html`
                <div>
                    <sp-swatch value="First">First</sp-swatch>
                    <sp-swatch value="Second">Second</sp-swatch>
                    <sp-swatch value="Third" selected>Third</sp-swatch>
                </div>
            `
    );
    const firstItem = test.querySelector("sp-swatch");
    const thirdItem = test.querySelector("sp-swatch[selected]");
    const shadowRoot = test.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
            <sp-swatch-group label="Selects Single Group" selects="single">
                <slot></slot>
            </sp-swatch-group>
        `;
    const el = shadowRoot.querySelector("sp-swatch-group");
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();
    expect(el.selected, '"Third" selected').to.deep.equal(["Third"]);
    expect(firstItem.selected).to.be.false;
    expect(thirdItem.selected).to.be.true;
    firstItem.click();
    await elementUpdated(el);
    expect(el.selected, '"First" selected').to.deep.equal(["First"]);
    expect(firstItem.selected).to.be.true;
    expect(thirdItem.selected).to.be.false;
  });
});
//# sourceMappingURL=swatch-group.test.js.map
