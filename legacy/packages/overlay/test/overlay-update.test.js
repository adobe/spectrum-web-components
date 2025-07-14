"use strict";
import { elementUpdated, expect, oneEvent } from "@open-wc/testing";
import { accordion } from "../stories/overlay.stories.js";
import {
  fixture,
  ignoreResizeObserverLoopError
} from "../../../test/testing-helpers.js";
describe("sp-update-overlays event", () => {
  ignoreResizeObserverLoopError(before, after);
  it("updates overlay height", async () => {
    const el = await fixture(accordion());
    const container = el.querySelector("sp-popover");
    const item = el.querySelector(
      '[label="Other things"]'
    );
    el.triggeredBy = "click";
    await elementUpdated(item);
    const opened = oneEvent(el, "sp-opened");
    el.open = "click";
    await opened;
    const height1 = container.getBoundingClientRect().height;
    item.click();
    await elementUpdated(item);
    const height2 = container.getBoundingClientRect().height;
    expect(height1).to.be.lessThan(height2);
  });
});
//# sourceMappingURL=overlay-update.test.js.map
