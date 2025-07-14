"use strict";
import { LitElement } from "lit";
import { expect } from "@open-wc/testing";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";
describe("RovingTabindex", () => {
  it("constructs with defaults", async () => {
    class TestEl extends LitElement {
    }
    customElements.define("test-roving-tabindex-el", TestEl);
    const el = new TestEl();
    const controller = new RovingTabindexController(
      el
    );
    expect(controller.direction).to.equal("both");
    expect(controller.focusInIndex).to.equal(0);
    expect(controller.isFocusableElement(el)).to.be.true;
  });
});
//# sourceMappingURL=roving-tabindex.test.js.map
