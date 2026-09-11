"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { LitElement } from "@spectrum-web-components/base";
import { ObserveSlotText } from "@spectrum-web-components/shared/src/observe-slot-text.js";
class ObserverTest extends ObserveSlotText(LitElement) {
  render() {
    return html`
      <slot @slotchange=${this.manageTextObservedSlot}></slot>
    `;
  }
}
customElements.define("observe-slot-test", ObserverTest);
describe("ObserveSlotText", () => {
  it("does no management when slot unavailable", async () => {
    const el = await fixture(html`
      <observe-slot-test></observe-slot-test>
    `);
    await elementUpdated(el);
    expect(el.slotHasContent).to.be.false;
    el.textContent = `hi, i'm some text`;
    await elementUpdated(el);
    expect(el.slotHasContent).to.be.true;
  });
  describe("nested mixin constructor timing", () => {
    it("should support calling manageTextObservedSlot in constructor immediately after super()", async () => {
      class NestedMixinTestElement extends ObserveSlotText(LitElement) {
        constructor() {
          super();
          this.manageTextObservedSlot();
        }
        render() {
          return html`
            <div>
              <slot @slotchange=${this.manageTextObservedSlot}></slot>
            </div>
          `;
        }
      }
      customElements.define("nested-mixin-text-test", NestedMixinTestElement);
      const el = await fixture(html`
        <nested-mixin-text-test>Some text content</nested-mixin-text-test>
      `);
      await elementUpdated(el);
      expect(el.slotHasContent).to.be.true;
    });
    it("should support double-nested mixin with immediate manageTextObservedSlot call", async () => {
      function AdditionalMixin(BaseClass) {
        return class extends BaseClass {
          constructor() {
            super(...arguments);
            this.additionalProperty = "test";
          }
        };
      }
      class DoubleNestedElement extends ObserveSlotText(
        AdditionalMixin(LitElement),
        "label"
      ) {
        constructor() {
          super();
          this.manageTextObservedSlot();
        }
        render() {
          return html`
            <div>
              <slot
                name="label"
                @slotchange=${this.manageTextObservedSlot}
              ></slot>
            </div>
          `;
        }
      }
      customElements.define("double-nested-text-test", DoubleNestedElement);
      const el = await fixture(html`
        <double-nested-text-test>
          <span slot="label">Label text</span>
        </double-nested-text-test>
      `);
      await elementUpdated(el);
      expect(el.slotHasContent).to.be.true;
      expect(el.additionalProperty).to.equal("test");
    });
    it("should handle manageTextObservedSlot call before element is connected", async () => {
      class PreConnectTestElement extends ObserveSlotText(LitElement) {
        constructor() {
          super();
          this.hasCalledInConstructor = false;
          this.manageTextObservedSlot();
          this.hasCalledInConstructor = true;
        }
        render() {
          return html`
            <div>
              <slot @slotchange=${this.manageTextObservedSlot}></slot>
            </div>
          `;
        }
      }
      customElements.define("pre-connect-text-test", PreConnectTestElement);
      const el = document.createElement(
        "pre-connect-text-test"
      );
      el.textContent = "Text content";
      expect(el.hasCalledInConstructor).to.be.true;
      document.body.appendChild(el);
      await elementUpdated(el);
      expect(el.slotHasContent).to.be.true;
    });
  });
});
//# sourceMappingURL=observe-slot-text.test.js.map
