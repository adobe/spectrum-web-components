"use strict";
import {
  SizedMixin,
  SpectrumElement
} from "../src/index.js";
import { html } from "@open-wc/testing";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
export class FancySizedComponent extends SizedMixin(SpectrumElement, {
  defaultSize: "m",
  validSizes: ["xs", "s", "m", "l", "xl"]
}) {
  render() {
    return html`
            I an wearing size ${this.size}
        `;
  }
}
customElements.define("fancy-sized-component", FancySizedComponent);
describe("sizedMixin", () => {
  it("allows any given size in the validSizes array", async () => {
    const validSizesChecks = ["xs", "s", "m", "l", "xl"].map(async (size) => {
      var _a;
      const el = await fixture(html`
                <fancy-sized-component></fancy-sized-component>
            `);
      await elementUpdated(el);
      el.size = size;
      await elementUpdated(el);
      expect((_a = el.shadowRoot) == null ? void 0 : _a.textContent).to.include(
        `I an wearing size ${size}`
      );
    });
    await Promise.all(validSizesChecks);
  });
  it("fallbacks to default size if the provided size is invalid", async () => {
    var _a;
    const el = await fixture(html`
            <fancy-sized-component size="xxl"></fancy-sized-component>
        `);
    await elementUpdated(el);
    expect((_a = el.shadowRoot) == null ? void 0 : _a.textContent).to.include("I an wearing size m");
  });
  it("fallbacks to default size if no size is provided", async () => {
    var _a;
    const el = await fixture(html`
            <fancy-sized-component></fancy-sized-component>
        `);
    await elementUpdated(el);
    expect((_a = el.shadowRoot) == null ? void 0 : _a.textContent).to.include("I an wearing size m");
  });
  it("applies the given size if it is a valid one", async () => {
    var _a;
    const el = await fixture(html`
            <fancy-sized-component size="l"></fancy-sized-component>
        `);
    await elementUpdated(el);
    expect((_a = el.shadowRoot) == null ? void 0 : _a.textContent).to.include("I an wearing size l");
  });
});
//# sourceMappingURL=sizedMixin.test.js.map
