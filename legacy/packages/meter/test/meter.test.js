"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/meter/sp-meter.js";
import { meterVariants } from "@spectrum-web-components/meter";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
import { createLanguageContext } from "../../../tools/reactive-controllers/test/helpers.js";
describe("Meter", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-meter label="Loading"></sp-meter>
            `)
  );
  it("loads default meter accessibly", async () => {
    const el = await fixture(html`
            <sp-meter label="Loading"></sp-meter>
        `);
    await elementUpdated(el);
    expect(el).to.not.be.undefined;
    await expect(el).to.be.accessible();
  });
  meterVariants.map((variant) => {
    it(`loads - [variant="${variant}"]`, async () => {
      const el = await fixture(html`
                <sp-meter variant=${variant}>
                    This meter is of the \`${variant}\` variant.
                </sp-meter>
            `);
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    });
  });
  it("accepts a changing process w/ [label]", async () => {
    const el = await fixture(html`
            <sp-meter label="Changing Value"></sp-meter>
        `);
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.true;
    expect(el.getAttribute("aria-valuenow")).to.equal("0");
    el.progress = 50;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.true;
    expect(el.getAttribute("aria-valuenow")).to.equal("50");
    el.progress = 100;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.true;
    expect(el.getAttribute("aria-valuenow")).to.equal("100");
  });
  it("accepts label from `slot`", async () => {
    const el = await fixture(html`
            <sp-meter>Label From Slot</sp-meter>
        `);
    await elementUpdated(el);
    expect(el.getAttribute("label")).to.equal("Label From Slot");
  });
  it("accepts a changing process", async () => {
    const el = await fixture(html`
            <sp-meter>Changing Value</sp-meter>
        `);
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.true;
    expect(el.getAttribute("aria-valuenow")).to.equal("0");
    el.progress = 50;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.true;
    expect(el.getAttribute("aria-valuenow")).to.equal("50");
    el.progress = 100;
    await elementUpdated(el);
    expect(el.hasAttribute("aria-valuenow")).to.be.true;
    expect(el.getAttribute("aria-valuenow")).to.equal("100");
  });
  it("resolves a language (en-US)", async () => {
    var _a;
    const [languageContext] = createLanguageContext("en-US");
    const test = await fixture(html`
            <div @sp-language-context=${languageContext}>
                <sp-meter label="Changing Value" progress="45"></sp-meter>
            </div>
        `);
    const el = test.querySelector("sp-meter");
    const percentage = el.shadowRoot.querySelector(
      ".percentage"
    );
    expect((_a = percentage.textContent) == null ? void 0 : _a.search("%")).to.not.equal(-1);
  });
  it("resolves a language (ar-sa)", async () => {
    var _a;
    const [languageContext] = createLanguageContext("ar-sa");
    const test = await fixture(html`
            <div @sp-language-context=${languageContext}>
                <sp-meter label="Changing Value" progress="45"></sp-meter>
            </div>
        `);
    const el = test.querySelector("sp-meter");
    const percentage = el.shadowRoot.querySelector(
      ".percentage"
    );
    expect((_a = percentage.textContent) == null ? void 0 : _a.search("\u066A")).to.not.equal(-1);
  });
  it("validates variants", async () => {
    const el = await fixture(html`
            <sp-meter variant="invalid">
                This meter validates variants.
            </sp-meter>
        `);
    await elementUpdated(el);
    expect(el.variant).to.equal("");
    el.variant = meterVariants[0];
    await elementUpdated(el);
    expect(el.variant).to.equal(meterVariants[0]);
    el.variant = meterVariants[0];
    await elementUpdated(el);
    expect(el.variant).to.equal(meterVariants[0]);
  });
});
//# sourceMappingURL=meter.test.js.map
