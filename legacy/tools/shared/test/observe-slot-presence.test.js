"use strict";
import { ObserveSlotPresence } from "@spectrum-web-components/shared/src/observe-slot-presence.js";
import { LitElement } from "@spectrum-web-components/base";
import { elementUpdated, expect, fixture, html } from "@open-wc/testing";
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
    const el = await fixture(
      html`
                <observe-presence-test></observe-presence-test>
            `
    );
    await elementUpdated(el);
    expect(el.slotContentIsPresent).to.be.false;
    el.innerHTML = '<div slot="test-slot"></div>';
    await elementUpdated(el);
    expect(el.slotContentIsPresent).to.be.true;
  });
});
//# sourceMappingURL=observe-slot-presence.test.js.map
