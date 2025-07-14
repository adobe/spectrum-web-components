"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { findDescribedNode } from "../../../test/testing-helpers-a11y.js";
import "@spectrum-web-components/help-text/sp-help-text.js";
import "@spectrum-web-components/checkbox/sp-checkbox.js";
import "@spectrum-web-components/field-group/sp-field-group.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("FieldGroup", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-field-group horizontal>
                        <sp-checkbox>Checkbox 1</sp-checkbox>
                        <sp-checkbox>Checkbox 2</sp-checkbox>
                        <sp-checkbox>Checkbox 3</sp-checkbox>
                        <sp-checkbox>Checkbox 4</sp-checkbox>
                        <sp-checkbox>Checkbox 5</sp-checkbox>
                    </sp-field-group>
                `
    )
  );
  it("loads default field-group accessibly", async () => {
    const el = await fixture(
      html`
                <sp-field-group horizontal>
                    <sp-checkbox>Checkbox 1</sp-checkbox>
                    <sp-checkbox>Checkbox 2</sp-checkbox>
                    <sp-checkbox>Checkbox 3</sp-checkbox>
                    <sp-checkbox>Checkbox 4</sp-checkbox>
                    <sp-checkbox>Checkbox 5</sp-checkbox>
                </sp-field-group>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  describe("help text", () => {
    const name = "This is a field group";
    const description = "This text helps you fill it out";
    const descriptionNegative = "This text helps you when invalid";
    it('accepts help text in `slot="help-text"`', async () => {
      const el = await fixture(html`
                <sp-field-group label=${name}>
                    <sp-help-text slot="help-text">${description}</sp-help-text>
                </sp-field-group>
            `);
      await elementUpdated(el);
      await findDescribedNode(name, description);
    });
    it('accepts help text in `slot="help-text"` w/ own ID', async () => {
      const el = await fixture(html`
                <sp-field-group label=${name}>
                    <sp-help-text slot="help-text" id="help-text-id-1">
                        ${description}
                    </sp-help-text>
                </sp-field-group>
            `);
      await elementUpdated(el);
      await findDescribedNode(name, description);
    });
    it("manages neutral/negative help text pairs", async () => {
      const el = await fixture(html`
                <sp-field-group label=${name}>
                    <sp-help-text slot="help-text">${description}</sp-help-text>
                    <sp-help-text slot="negative-help-text">
                        ${descriptionNegative}
                    </sp-help-text>
                </sp-field-group>
            `);
      const negativeHelpText = el.querySelector(
        '[slot="negative-help-text"]'
      );
      await elementUpdated(el);
      expect(negativeHelpText.variant).to.equal("neutral");
      await findDescribedNode(name, description);
      el.invalid = true;
      await elementUpdated(el);
      expect(negativeHelpText.variant).to.equal("negative");
      await findDescribedNode(name, descriptionNegative);
    });
    it("manages neutral/negative help text pairs w/ own IDs", async () => {
      const el = await fixture(html`
                <sp-field-group label=${name}>
                    <sp-help-text slot="help-text" id="help-text-id-2">
                        ${description}
                    </sp-help-text>
                    <sp-help-text slot="negative-help-text" id="help-text-id-3">
                        ${descriptionNegative}
                    </sp-help-text>
                </sp-field-group>
            `);
      const negativeHelpText = el.querySelector(
        '[slot="negative-help-text"]'
      );
      await elementUpdated(el);
      expect(negativeHelpText.variant).to.equal("neutral");
      await findDescribedNode(name, description);
      el.invalid = true;
      await elementUpdated(el);
      expect(negativeHelpText.variant).to.equal("negative");
      await findDescribedNode(name, descriptionNegative);
    });
  });
});
//# sourceMappingURL=field-group.test.js.map
