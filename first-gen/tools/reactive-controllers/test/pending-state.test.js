"use strict";
import { expect, fixture, html } from "@open-wc/testing";
import "@spectrum-web-components/progress-circle/sp-progress-circle.js";
import "@spectrum-web-components/picker/sp-picker.js";
describe("PendingStateController", () => {
  let host;
  let controller;
  beforeEach(async () => {
    host = await fixture(html`
            <sp-picker aria-label="clickable" pending></sp-picker>
        `);
    controller = host.pendingStateController;
  });
  describe("renderPendingState", () => {
    it("should change aria-label of host when pending and when not pending", async () => {
      host = await fixture(html`
                <sp-picker></sp-picker>
            `);
      controller = host.pendingStateController;
      host.setAttribute("pending", "true");
      await host.updateComplete;
      let ariaLabel = host.getAttribute("aria-label");
      expect(ariaLabel).to.equal("Pending");
      host.removeAttribute("pending");
      await host.updateComplete;
      ariaLabel = host.getAttribute("aria-label");
      expect(ariaLabel).to.equal(null);
      host.setAttribute("aria-label", "clickable");
      await host.updateComplete;
      ariaLabel = host.getAttribute("aria-label");
      expect(ariaLabel).to.equal("clickable");
      host.setAttribute("pending", "true");
      await host.updateComplete;
      ariaLabel = host.getAttribute("aria-label");
      expect(ariaLabel).to.equal("Pending");
      host.removeAttribute("pending");
      await host.updateComplete;
      ariaLabel = host.getAttribute("aria-label");
      expect(ariaLabel).to.equal("clickable");
      host.setAttribute("pending", "true");
      await host.updateComplete;
      ariaLabel = host.getAttribute("aria-label");
      expect(ariaLabel).to.equal("Pending");
    });
    it("should render the pending state UI", async () => {
      const pendingLabel = "Custom Pending Label";
      host.pendingLabel = pendingLabel;
      const templateResult = controller.renderPendingState();
      const renderedElement = await fixture(html`
                ${templateResult}
            `);
      const expectedElement = await fixture(html`
                <sp-progress-circle
                    id="loader"
                    size="s"
                    indeterminate
                    aria-valuetext=${pendingLabel}
                    class="progress-circle"
                ></sp-progress-circle>
            `);
      expect(renderedElement.outerHTML === expectedElement.outerHTML).to.be.true;
    });
    it("should render the default pending state UI if no label is provided", async () => {
      host.pendingLabel = void 0;
      const templateResult = controller.renderPendingState();
      const renderedElement = await fixture(html`
                ${templateResult}
            `);
      const expectedElement = await fixture(html`
                <sp-progress-circle
                    id="loader"
                    size="s"
                    indeterminate
                    aria-valuetext="Pending"
                    class="progress-circle"
                ></sp-progress-circle>
            `);
      const renderedAttributes = renderedElement.attributes;
      const expectedAttributes = expectedElement.attributes;
      expect(renderedAttributes.length === expectedAttributes.length).to.be.true;
      for (let i = 0; i < renderedAttributes.length; i++) {
        const renderedAttr = renderedAttributes[i];
        const expectedAttr = expectedAttributes.getNamedItem(
          renderedAttr.name
        );
        expect(renderedAttr.value === (expectedAttr == null ? void 0 : expectedAttr.value)).to.be.true;
      }
      expect(host.pending).to.be.true;
    });
    it("should toggle the pending state on and off and preserve the component state correctly", async () => {
      var _a, _b, _c;
      host.setAttribute("pending", "true");
      await host.updateComplete;
      let progressCircle = (_a = host.shadowRoot) == null ? void 0 : _a.querySelector("sp-progress-circle");
      expect(progressCircle).to.not.be.null;
      host.removeAttribute("pending");
      await host.updateComplete;
      progressCircle = (_b = host.shadowRoot) == null ? void 0 : _b.querySelector("sp-progress-circle");
      expect(progressCircle).to.be.null;
      host.setAttribute("pending", "true");
      await host.updateComplete;
      progressCircle = (_c = host.shadowRoot) == null ? void 0 : _c.querySelector("sp-progress-circle");
      expect(progressCircle).to.not.be.null;
      const expectedElement = await fixture(html`
                <sp-progress-circle
                    id="loader"
                    size="s"
                    indeterminate
                    aria-valuetext="Pending"
                    class="progress-circle"
                ></sp-progress-circle>
            `);
      const renderedAttributes = progressCircle == null ? void 0 : progressCircle.attributes;
      const expectedAttributes = expectedElement.attributes;
      expect((renderedAttributes == null ? void 0 : renderedAttributes.length) === expectedAttributes.length).to.be.true;
      if (renderedAttributes) {
        for (let i = 0; i < renderedAttributes.length; i++) {
          const renderedAttr = renderedAttributes[i];
          const expectedAttr = expectedAttributes.getNamedItem(
            renderedAttr.name
          );
          expect(renderedAttr.value === (expectedAttr == null ? void 0 : expectedAttr.value)).to.be.true;
        }
      }
    });
  });
});
//# sourceMappingURL=pending-state.test.js.map
