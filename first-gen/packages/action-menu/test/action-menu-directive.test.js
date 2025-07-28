"use strict";
import { expect, oneEvent } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { directive } from "../stories/action-menu.stories.js";
import { fixture } from "../../../test/testing-helpers.js";
import { nextFrame } from "@spectrum-web-components/overlay/src/AbstractOverlay.js";
describe("Slottable Request Directive", () => {
  it("Action Menu requests for options rendering when opening and closing", async function() {
    const el = await fixture(directive());
    const initialNodeLength = el.children.length;
    expect(el.open, "should be closed initially").to.be.false;
    expect(el.children.length).to.equal(initialNodeLength);
    const opened = oneEvent(el, "sp-opened");
    el.click();
    await opened;
    expect(el.open, "should be open after clicking").to.be.true;
    expect(el.children.length).to.be.gt(initialNodeLength);
    const closed = oneEvent(el, "sp-closed");
    await sendKeys({
      press: "Escape"
    });
    await closed;
    await nextFrame();
    await nextFrame();
    expect(el.open, "should be closed after escape key is pressed").to.be.false;
    expect(el.children.length).to.equal(initialNodeLength);
  });
});
//# sourceMappingURL=action-menu-directive.test.js.map
