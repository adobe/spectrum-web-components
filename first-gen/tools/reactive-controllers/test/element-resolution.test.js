"use strict";
import { html, LitElement } from "lit";
import { elementUpdated, expect, fixture } from "@open-wc/testing";
import { ElementResolutionController } from "@spectrum-web-components/reactive-controllers/src/ElementResolution.js";
describe("Element Resolution", () => {
  it("responds to DOM changes", async () => {
    class TestEl extends LitElement {
    }
    if (!customElements.get("test-element-resolution-el")) {
      customElements.define("test-element-resolution-el", TestEl);
    }
    const test = await fixture(
      html`
                <div>
                    <test-element-resolution-el></test-element-resolution-el>
                    <div class="target" id="one"></div>
                    <div class="target" id="two"></div>
                </div>
            `
    );
    const el = test.querySelector("test-element-resolution-el");
    const target1 = test.querySelector("#one");
    const target2 = test.querySelector("#two");
    const controller = new ElementResolutionController(el);
    expect(controller.element).to.be.null;
    controller.selector = ".target";
    await elementUpdated(el);
    expect(controller.element === target1).to.be.true;
    test.insertAdjacentElement("afterbegin", target2);
    await elementUpdated(el);
    expect(controller.element === target2).to.be.true;
    target2.setAttribute("class", "not-target");
    await elementUpdated(el);
    expect(controller.element === target1).to.be.true;
    target2.setAttribute("class", "target");
    await elementUpdated(el);
    expect(controller.element === target2).to.be.true;
  });
});
//# sourceMappingURL=element-resolution.test.js.map
