"use strict";
import { expect, nextFrame } from "@open-wc/testing";
import { DependencyManagerController } from "@spectrum-web-components/reactive-controllers/src/DependencyManger.js";
import { spy } from "sinon";
describe("Dependency Manager", () => {
  it("manages dependencies", async function() {
    this.retries(0);
    const tagName = "some-heavy-element";
    const requestUpdateSpy = spy();
    const manager = new DependencyManagerController({
      requestUpdate: () => requestUpdateSpy()
    });
    expect(manager.loaded).to.be.false;
    manager.add(tagName);
    expect(manager.loaded).to.be.false;
    expect(requestUpdateSpy.notCalled).to.be.true;
    customElements.define(tagName, class extends HTMLElement {
    });
    await nextFrame();
    expect(manager.loaded).to.be.true;
    expect(requestUpdateSpy.notCalled).to.be.false;
  });
});
//# sourceMappingURL=dependency-manager.test.js.map
