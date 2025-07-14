"use strict";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { html } from "lit/static-html.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Tab", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-tabs>
                        <sp-tab label="Tab 1" value="first"></sp-tab>
                    </sp-tabs>
                `
    )
  );
  it("loads default tab accessibly", async () => {
    const el = await fixture(
      html`
                <sp-tabs>
                    <sp-tab label="Tab 1" value="first"></sp-tab>
                </sp-tabs>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("Updates label", async () => {
    const el = await fixture(
      html`
                <sp-tabs>
                    <sp-tab label="Tab 1" value="first"></sp-tab>
                </sp-tabs>
            `
    );
    await elementUpdated(el);
    const firstTab = el.querySelector("sp-tab");
    const label = firstTab.shadowRoot ? firstTab.shadowRoot.querySelector(
      "#item-label"
    ) : firstTab.querySelector("#itemLabel");
    expect(label.textContent).to.include("Tab 1");
    firstTab.label = "Other Tab";
    await elementUpdated(firstTab);
    expect(label.textContent).to.include("Other Tab");
  });
});
//# sourceMappingURL=tab.test.js.map
