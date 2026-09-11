"use strict";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
import { LitElement } from "@spectrum-web-components/base";
import { ObserveSlotPresence } from "@spectrum-web-components/shared/src/observe-slot-presence.js";
class ObserverTest extends ObserveSlotPresence(
  LitElement,
  '[slot="test-slot"]'
) {
  render() {
    return html`
      Test Element
    `;
  }
}
customElements.define("observe-presence-test", ObserverTest);
describe("ObserveSlotPresence", () => {
  it("does no management when slot unavailable", async () => {
    const el = await fixture(html`
      <observe-presence-test></observe-presence-test>
    `);
    await elementUpdated(el);
    expect(el.slotContentIsPresent).to.be.false;
    el.innerHTML = '<div slot="test-slot"></div>';
    await elementUpdated(el);
    expect(el.slotContentIsPresent).to.be.true;
  });
  describe("nested mixin constructor timing", () => {
    it("should support calling managePresenceObservedSlot in constructor immediately after super()", async () => {
      class NestedMixinTestElement extends ObserveSlotPresence(
        LitElement,
        '[slot="icon"]'
      ) {
        constructor() {
          super();
          this.managePresenceObservedSlot();
        }
        render() {
          return html`
            <div>
              <slot name="icon"></slot>
            </div>
          `;
        }
      }
      customElements.define("nested-mixin-test", NestedMixinTestElement);
      const el = await fixture(html`
        <nested-mixin-test>
          <span slot="icon">🎯</span>
        </nested-mixin-test>
      `);
      await elementUpdated(el);
      expect(el.slotContentIsPresent).to.be.true;
    });
    it("should support double-nested mixin with immediate managePresenceObservedSlot call", async () => {
      function AdditionalMixin(BaseClass) {
        return class extends BaseClass {
          constructor() {
            super(...arguments);
            this.additionalProperty = "test";
          }
        };
      }
      class DoubleNestedElement extends ObserveSlotPresence(
        AdditionalMixin(LitElement),
        '[slot="content"]'
      ) {
        constructor() {
          super();
          this.managePresenceObservedSlot();
        }
        render() {
          return html`
            <div>
              <slot name="content"></slot>
            </div>
          `;
        }
      }
      customElements.define("double-nested-test", DoubleNestedElement);
      const el = await fixture(html`
        <double-nested-test>
          <div slot="content">Test content</div>
        </double-nested-test>
      `);
      await elementUpdated(el);
      expect(el.slotContentIsPresent).to.be.true;
      expect(el.additionalProperty).to.equal("test");
    });
    it("should handle managePresenceObservedSlot call before element is connected", async () => {
      class PreConnectTestElement extends ObserveSlotPresence(
        LitElement,
        '[slot="item"]'
      ) {
        constructor() {
          super();
          this.hasCalledInConstructor = false;
          this.managePresenceObservedSlot();
          this.hasCalledInConstructor = true;
        }
        render() {
          return html`
            <div>
              <slot name="item"></slot>
            </div>
          `;
        }
      }
      customElements.define("pre-connect-test", PreConnectTestElement);
      const el = document.createElement(
        "pre-connect-test"
      );
      el.innerHTML = '<span slot="item">Item</span>';
      expect(el.hasCalledInConstructor).to.be.true;
      document.body.appendChild(el);
      await elementUpdated(el);
      expect(el.slotContentIsPresent).to.be.true;
    });
  });
});
//# sourceMappingURL=observe-slot-presence.test.js.map
