"use strict";
import { expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/slider/sp-slider.js";
describe("Slider - upgrade order", () => {
  it("loads both handles when document imports sp-slider-handle after sp-slider", async () => {
    const el = await fixture(html`
            <sp-slider variant="range" step="1" min="0" max="255">
                Output Levels
                <sp-slider-handle
                    slot="handle"
                    name="min"
                    label="Minimum"
                    value="5"
                ></sp-slider-handle>
                <sp-slider-handle
                    slot="handle"
                    name="max"
                    label="Maximum"
                    value="250"
                ></sp-slider-handle>
            </sp-slider>
        `);
    import("../sp-slider-handle.js");
    const handles = el.shadowRoot.querySelectorAll(".handle");
    expect(handles).to.have.lengthOf(2);
  });
});
//# sourceMappingURL=slider-handle-upgrade.test.js.map
