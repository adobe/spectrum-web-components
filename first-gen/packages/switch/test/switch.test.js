"use strict";
import "@spectrum-web-components/switch/sp-switch.js";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
function inputForSwitch(checkbox) {
  if (!checkbox.shadowRoot) throw new Error("No shadowRoot");
  return checkbox.shadowRoot.querySelector("#input");
}
function labelForSwitch(checkbox) {
  if (!checkbox.shadowRoot) throw new Error("No shadowRoot");
  const labelEl = checkbox.shadowRoot.querySelector("label");
  if (!labelEl) {
    throw new Error("Failed to find label in shadowRoot");
  }
  return labelEl;
}
describe("Switch", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-switch>Not Checked</sp-switch>
                `
    )
  );
  it("loads default switch accessibly", async () => {
    const el = await fixture(
      html`
                <sp-switch>Not Checked</sp-switch>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    const labelEl = labelForSwitch(el);
    const inputEl = inputForSwitch(el);
    expect(labelEl.getAttribute("for")).to.equal(inputEl.id);
  });
  it("has name attribute", async () => {
    const el = await fixture(
      html`
                <sp-switch>Not Checked</sp-switch>
            `
    );
    await elementUpdated(el);
    await expect(el.hasAttribute("name"));
  });
  it("loads `checked` switch accessibly", async () => {
    const el = await fixture(
      html`
                <sp-switch checked>Checked</sp-switch>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    const labelEl = labelForSwitch(el);
    const inputEl = inputForSwitch(el);
    expect(labelEl.getAttribute("for")).to.equal(inputEl.id);
  });
  it("maintains its value when [readonly]", async () => {
    const el = await fixture(html`
            <sp-switch checked readonly>Component</sp-switch>
        `);
    expect(el.checked).to.be.true;
    el.click();
    await elementUpdated(el);
    expect(el.checked).to.be.true;
  });
});
//# sourceMappingURL=switch.test.js.map
