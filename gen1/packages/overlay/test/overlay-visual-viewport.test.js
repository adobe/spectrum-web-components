"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame,
  oneEvent
} from "@open-wc/testing";
import { isWebKit } from "@spectrum-web-components/shared";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import "@spectrum-web-components/popover/sp-popover.js";
describe("PlacementController visualViewport listeners", () => {
  before(function() {
    if (!isWebKit()) {
      this.skip();
    }
  });
  it("attaches and cleans up visualViewport listeners across the open/close lifecycle", async () => {
    const vv = window.visualViewport;
    const addCalls = [];
    const removeCalls = [];
    const originalAdd = vv.addEventListener.bind(vv);
    const originalRemove = vv.removeEventListener.bind(vv);
    vv.addEventListener = (type, listener, options) => {
      addCalls.push(type);
      return originalAdd(type, listener, options);
    };
    vv.removeEventListener = (type, listener, options) => {
      removeCalls.push(type);
      return originalRemove(type, listener, options);
    };
    try {
      const container = await fixture(html`
        <div>
          <sp-button id="trigger">Open</sp-button>
          <sp-overlay
            trigger="trigger@click"
            type="auto"
            placement="bottom"
            offset="0"
          >
            <sp-popover>
              <p>positioned popover content</p>
            </sp-popover>
          </sp-overlay>
        </div>
      `);
      const trigger = container.querySelector("#trigger");
      const overlay = container.querySelector("sp-overlay");
      await elementUpdated(overlay);
      const opened = oneEvent(overlay, "sp-opened");
      trigger.click();
      await opened;
      await nextFrame();
      expect(
        addCalls,
        "addEventListener should have been called for resize"
      ).to.include("resize");
      expect(
        addCalls,
        "addEventListener should have been called for scroll"
      ).to.include("scroll");
      const closed = oneEvent(overlay, "sp-closed");
      overlay.open = false;
      await closed;
      await nextFrame();
      expect(
        removeCalls,
        "removeEventListener should have been called for resize"
      ).to.include("resize");
      expect(
        removeCalls,
        "removeEventListener should have been called for scroll"
      ).to.include("scroll");
    } finally {
      vv.addEventListener = originalAdd;
      vv.removeEventListener = originalRemove;
    }
  });
});
//# sourceMappingURL=overlay-visual-viewport.test.js.map
