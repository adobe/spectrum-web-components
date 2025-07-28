"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame,
  oneEvent
} from "@open-wc/testing";
import "@spectrum-web-components/tray/sp-tray.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import { testForLitDevWarnings } from "../../../test/testing-helpers.js";
describe("Tray", () => {
  testForLitDevWarnings(
    async () => await fixture(html`
                <sp-tray></sp-tray>
            `)
  );
  it("loads default tray accessibly", async () => {
    const el = await fixture(html`
            <sp-tray></sp-tray>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("focuses focusable light DOM element", async () => {
    const el = await fixture(html`
            <sp-tray open>
                <div>
                    <a href="#">Test element</a>
                </div>
            </sp-tray>
        `);
    const anchor = el.querySelector("a");
    await elementUpdated(el);
    el.focus();
    await elementUpdated(el);
    expect(document.activeElement).to.equal(anchor);
  });
  it('focuses "tray"', async () => {
    const el = await fixture(html`
            <sp-tray open>
                <div></div>
            </sp-tray>
        `);
    await elementUpdated(el);
    el.focus();
    await elementUpdated(el);
    expect(document.activeElement).to.equal(el);
    expect(el.shadowRoot.activeElement).to.equal(
      el.tray
    );
  });
  it("closes", async () => {
    const test = await fixture(html`
            <sp-theme system="spectrum" scale="medium" color="dark">
                <sp-tray></sp-tray>
            </sp-theme>
        `);
    const el = test.querySelector("sp-tray");
    await nextFrame();
    await nextFrame();
    expect(el.open).to.be.false;
    el.open = true;
    await elementUpdated(el);
    expect(el.open).to.be.true;
    const closed = oneEvent(el, "close");
    const overlay = el.shadowRoot.querySelector(
      "sp-underlay"
    );
    overlay.click();
    await closed;
    expect(el.open).to.be.false;
  });
});
//# sourceMappingURL=tray.test.js.map
