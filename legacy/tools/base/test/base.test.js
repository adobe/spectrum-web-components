"use strict";
import { SpectrumElement } from "@spectrum-web-components/base";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { version } from "@spectrum-web-components/base/src/version.js";
class DirElement extends SpectrumElement {
}
customElements.define("dir-element", DirElement);
describe("Base", () => {
  after(() => {
    document.dir = "";
  });
  it("sets `dir` from `document`", async () => {
    document.dir = "rtl";
    const el = await fixture(
      html`
                <dir-element></dir-element>
            `
    );
    await elementUpdated(el);
    expect(el.dir).to.equal("rtl");
    expect(el.isLTR).to.be.false;
  });
  it("has a static VERSION property", () => {
    expect(DirElement.VERSION).to.equal(version);
  });
});
//# sourceMappingURL=base.test.js.map
