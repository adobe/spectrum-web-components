"use strict";
import { elementUpdated, expect, oneEvent } from "@open-wc/testing";
import { fixture } from "../../../test/testing-helpers.js";
import { sendKeys } from "@web/test-runner-commands";
import { groupsWithSelects } from "../stories/action-menu.stories.js";
describe("Action Menu - Groups", () => {
  it("throws focus into the Menu when opened", async function() {
    var _a;
    const el = await fixture(
      groupsWithSelects({ onChange: () => {
      } })
    );
    const firstItem = el.querySelector("sp-menu-item");
    expect(firstItem.focused).to.be.false;
    expect(document.activeElement === firstItem).to.be.false;
    const opened = oneEvent(el, "sp-opened");
    el.focus();
    await sendKeys({
      press: "ArrowDown"
    });
    await opened;
    expect(firstItem.focused).to.be.true;
    expect(
      document.activeElement === firstItem,
      (_a = document.activeElement) == null ? void 0 : _a.localName
    ).to.be.true;
  });
  it('toggles child group with `selects="multiple"`', async function() {
    var _a;
    this.retries(0);
    const el = await fixture(
      groupsWithSelects({ onChange: () => {
      } })
    );
    const multipleGroup = el.querySelector(
      '[selects="multiple"]'
    );
    const firstItem = multipleGroup.querySelector(
      "sp-menu-item"
    );
    expect(firstItem.selected, "before opening: first item selected?").to.be.false;
    let opened = oneEvent(el, "sp-opened");
    el.focus();
    await sendKeys({
      press: "ArrowDown"
    });
    await opened;
    expect(el.open, "first opened: open?").to.be.true;
    await sendKeys({
      press: "ArrowUp"
    });
    await elementUpdated(el);
    let closed = oneEvent(el, "sp-closed");
    await sendKeys({
      press: "Enter"
    });
    await closed;
    await elementUpdated(el);
    await elementUpdated(firstItem);
    expect(el.open, "first closed: open?").to.be.false;
    expect(firstItem.selected, "after select: first item selected?").to.be.true;
    expect(document.activeElement === el, (_a = document.activeElement) == null ? void 0 : _a.localName).to.be.true;
    opened = oneEvent(el, "sp-opened");
    await sendKeys({
      press: "ArrowDown"
    });
    await opened;
    expect(el.open, "reopened: open?").to.be.true;
    closed = oneEvent(el, "sp-closed");
    await sendKeys({
      press: "Enter"
    });
    await closed;
    await elementUpdated(el);
    await elementUpdated(firstItem);
    expect(el.open, "reclosed: open?").to.be.false;
    expect(firstItem.selected, "after deselect: first item selected?").to.be.false;
  });
});
//# sourceMappingURL=action-menu-groups.test.js.map
