"use strict";
import { expect, fixture, html, oneEvent } from "@open-wc/testing";
import { sendMouse } from "@web/test-runner-commands";
import "../sp-truncated.js";
describe("Truncated", () => {
  it("loads default truncated accessibly", async () => {
    const el = await fixture(
      html`
                <sp-truncated></sp-truncated>
            `
    );
    await expect(el).to.be.accessible();
  });
  it("renders a tooltip when overflowing", async () => {
    const p = await fixture(html`
            <p style="width: 20px">
                <sp-truncated>This will overflow into a tooltip</sp-truncated>
            </p>
        `);
    const el = p.querySelector("sp-truncated");
    const tooltip = el.shadowRoot.querySelector("sp-tooltip");
    const rect = el.getBoundingClientRect();
    await sendMouse({
      type: "move",
      position: [Math.round(rect.left + 2), Math.round(rect.top + 2)]
    });
    const opened = oneEvent(el, "sp-opened");
    await opened;
    expect(tooltip.open).to.be.true;
  });
  it("does not render a tooltip when content fits", async () => {
    const p = await fixture(html`
            <p style="width: 200px">
                <sp-truncated>Short</sp-truncated>
            </p>
        `);
    const el = p.querySelector("sp-truncated");
    const tooltip = el.shadowRoot.querySelector(
      "sp-tooltip"
    );
    const rect = el.getBoundingClientRect();
    await sendMouse({
      type: "move",
      position: [Math.round(rect.left + 2), Math.round(rect.top + 2)]
    });
    expect(tooltip).to.be.null;
  });
  it("detects whether or not custom overflow is specified for optimization", async () => {
    const defaultOverflow = await fixture(
      html`
                <sp-truncated>This will overflow into a tooltip</sp-truncated>
            `
    );
    const customOverflow = await fixture(
      html`
                <sp-truncated>
                    Default
                    <span slot="overflow">Custom</span>
                </sp-truncated>
            `
    );
    expect(defaultOverflow.hasCustomOverflow).to.be.false;
    expect(customOverflow.hasCustomOverflow).to.be.true;
  });
  it("copies the text when clicked", async () => {
    const text = "This will overflow into a  tooltiptooltiptooltiptooltipmtooltipv tooltip tooltiptooltip";
    const defaultOverflow = await fixture(
      html`
                <p style="width: 200px">
                    <sp-truncated>${text}</sp-truncated>
                </p>
            `
    );
    const truncated = defaultOverflow.querySelector("sp-truncated");
    const content = truncated == null ? void 0 : truncated.shadowRoot.querySelector(
      "#content"
    );
    content.click();
    expect(truncated == null ? void 0 : truncated.hasCopied).to.be.true;
  });
});
//# sourceMappingURL=truncated.test.js.map
