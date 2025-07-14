"use strict";
import { ObserveSlotText } from "@spectrum-web-components/shared/src/observe-slot-text.js";
import { LitElement } from "@spectrum-web-components/base";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
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
    const el = await fixture(
      html`
                <observe-slot-test></observe-slot-test>
            `
    );
    await elementUpdated(el);
    expect(el.slotHasContent).to.be.false;
    el.textContent = `hi, i'm some text`;
    await elementUpdated(el);
    expect(el.slotHasContent).to.be.true;
  });
});
//# sourceMappingURL=observe-slot-text.test.js.map
