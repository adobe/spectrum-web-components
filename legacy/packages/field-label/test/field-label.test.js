"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { stub } from "sinon";
import "@spectrum-web-components/textfield/sp-textfield.js";
import "@spectrum-web-components/picker/sp-picker.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import { FieldLabel } from "@spectrum-web-components/field-label";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("FieldLabel", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <div>
                        <sp-field-label for="test">Input label</sp-field-label>
                        <input id="test" />
                    </div>
                `
    )
  );
  it("loads default field-label accessibly", async () => {
    const el = await fixture(
      html`
                <div>
                    <sp-field-label for="test">Input label</sp-field-label>
                    <input id="test" />
                </div>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("loads [required] field-label accessibly", async () => {
    const el = await fixture(
      html`
                <div>
                    <sp-field-label required for="test">
                        Required input label
                    </sp-field-label>
                    <input id="test" />
                </div>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it('loads with no "for"', async () => {
    const el = await fixture(
      html`
                <sp-field-label>Input label</sp-field-label>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("observes based on `for` value", async () => {
    const test = await fixture(
      html`
                <div>
                    <sp-field-label for="test">Input label</sp-field-label>
                    <input id="test" />
                    <input id="test" />
                </div>
            `
    );
    const fieldLabel = test.querySelector("sp-field-label");
    const el = fieldLabel;
    const input1 = test.querySelector(
      "input:nth-of-type(1)"
    );
    const input2 = test.querySelector(
      "input:nth-of-type(2)"
    );
    await elementUpdated(fieldLabel);
    expect(el.target === input1).to.be.true;
    input1.remove();
    await elementUpdated(fieldLabel);
    expect(el.target === input2).to.be.true;
    fieldLabel.insertAdjacentElement("beforebegin", input1);
    await elementUpdated(fieldLabel);
    expect(el.target === input1).to.be.true;
    input1.id = "other";
    await elementUpdated(fieldLabel);
    expect(el.target === input2).to.be.true;
    input2.remove();
    await elementUpdated(fieldLabel);
    expect(el.target).to.be.null;
    input1.id = "test";
    await elementUpdated(fieldLabel);
    expect(el.target === input1).to.be.true;
    fieldLabel.insertAdjacentElement("afterend", input2);
    await elementUpdated(fieldLabel);
    expect(el.target === input2).to.be.false;
    input2.insertAdjacentElement("afterend", input1);
    await elementUpdated(fieldLabel);
    expect(el.target === input2).to.be.true;
  });
  it('allows unfulfilled "for"', async () => {
    const el = await fixture(
      html`
                <sp-field-label>Input label</sp-field-label>
            `
    );
    await elementUpdated(el);
    const manageSpy = stub(
      el,
      "manageTarget"
    );
    manageSpy.callsFake(async (...args) => {
      try {
        await FieldLabel.prototype.manageTarget.apply(el, ...args);
      } catch (error) {
        return "Error was thrown.";
      }
      return "No error was thrown.";
    });
    el.for = "not-available";
    el.id = "force-manage-target";
    await elementUpdated(el);
    const result = await manageSpy.returnValues[0];
    expect(result).to.equal("No error was thrown.");
  });
  it('associates itself to an element whose "id" matches its "for" attribute', async () => {
    const test = await fixture(
      html`
                <div>
                    <sp-field-label required for="test"></sp-field-label>
                    <input id="test" />
                </div>
            `
    );
    const el = test.querySelector("sp-field-label");
    const input = test.querySelector("input");
    await elementUpdated(el);
    expect(input.hasAttribute("aria-labelledby"));
    expect(input.getAttribute("aria-labelledby")).to.equal(el.id);
  });
  it('associates via "id" starting with number', async () => {
    const test = await fixture(
      html`
                <div>
                    <sp-field-label required for="1"></sp-field-label>
                    <input id="1" />
                </div>
            `
    );
    const el = test.querySelector("sp-field-label");
    const input = test.querySelector("input");
    await elementUpdated(el);
    expect(input.hasAttribute("aria-labelledby"));
    expect(input.getAttribute("aria-labelledby")).to.equal(el.id);
  });
  it("passed clicks to assiciated form element as focus", async () => {
    const test = await fixture(
      html`
                <div>
                    <sp-field-label required for="test"></sp-field-label>
                    <input id="test" />
                </div>
            `
    );
    const el = test.querySelector("sp-field-label");
    const input = test.querySelector("input");
    await elementUpdated(el);
    el.click();
    await elementUpdated(el);
    expect(document.activeElement).to.equal(input);
  });
  it('associates itself to an element with a focueElement whose "id" matches its "for" attribute', async () => {
    const test = await fixture(
      html`
                <div>
                    <sp-field-label required for="test"></sp-field-label>
                    <sp-textfield id="test"></sp-textfield>
                </div>
            `
    );
    const el = test.querySelector("sp-field-label");
    const input = test.querySelector("sp-textfield").focusElement;
    await elementUpdated(el);
    expect(input.hasAttribute("aria-label"));
    expect(input.getAttribute("aria-label")).to.equal(
      (el.textContent || "").trim()
    );
  });
  it("passed clicks to assiciated form element with a focueElement as focus", async () => {
    const test = await fixture(
      html`
                <div>
                    <sp-field-label required for="test"></sp-field-label>
                    <sp-textfield id="test"></sp-textfield>
                </div>
            `
    );
    const el = test.querySelector("sp-field-label");
    const input = test.querySelector("sp-textfield");
    await elementUpdated(el);
    el.click();
    await elementUpdated(el);
    expect(document.activeElement).to.equal(input);
  });
  it("forces focus visible when available", async () => {
    const test = await fixture(
      html`
                <div>
                    <sp-field-label required for="test"></sp-field-label>
                    <sp-picker id="test">
                        <sp-menu-item>Test</sp-menu-item>
                    </sp-picker>
                </div>
            `
    );
    const el = test.querySelector("sp-field-label");
    const picker = test.querySelector("sp-picker");
    await elementUpdated(el);
    await elementUpdated(picker);
    expect(picker.focused).to.be.false;
    el.click();
    await elementUpdated(el);
    await elementUpdated(picker);
    expect(document.activeElement).to.equal(picker);
    expect(picker.focused).to.be.true;
  });
});
//# sourceMappingURL=field-label.test.js.map
