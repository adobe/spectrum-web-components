"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { SpectrumElement } from "@spectrum-web-components/base";
import { version } from "@spectrum-web-components/base/src/version.js";
class DirElement extends SpectrumElement {
}
customElements.define("dir-element", DirElement);
describe("Base", () => {
  after(() => {
    document.dir = "";
  });
  it("component understands `dir` from `document`", async () => {
    document.dir = "rtl";
    const el = await fixture(html`
      <dir-element></dir-element>
    `);
    await elementUpdated(el);
    const dir = getComputedStyle(el).direction;
    expect(dir).to.equal("rtl");
  });
  it("reports `isLTR` as `true` when direction is `ltr`", async () => {
    document.dir = "ltr";
    const el = await fixture(html`
      <dir-element></dir-element>
    `);
    await elementUpdated(el);
    expect(el.isLTR).to.be.true;
  });
  it("reports `isLTR` as `false` when direction is `rtl`", async () => {
    document.dir = "rtl";
    const el = await fixture(html`
      <dir-element></dir-element>
    `);
    await elementUpdated(el);
    expect(el.isLTR).to.be.false;
  });
  it("has a static VERSION property", () => {
    expect(DirElement.VERSION).to.equal(version);
  });
});
//# sourceMappingURL=base.test.js.map
