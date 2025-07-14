"use strict";
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent
} from "@open-wc/testing";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/dialog/sp-dialog-base.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import { alertDestructive } from "../stories/dialog.stories.js";
async function styledFixture(story) {
  const test = await fixture(html`
        <sp-theme system="spectrum" scale="medium" color="dark">
            ${story}
        </sp-theme>
    `);
  return test.children[0];
}
const overlayTrigger = (story) => html`
    <overlay-trigger type="modal">
        <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
        ${story()}
    </overlay-trigger>
`;
describe("dialog base", () => {
  it("does not close by default when interacting with buttons", async () => {
    const el = await styledFixture(
      overlayTrigger(
        () => html`
                    <sp-dialog-base underlay slot="click-content">
                        ${alertDestructive()}
                    </sp-dialog-base>
                `
      )
    );
    await elementUpdated(el);
    const dialog = el.querySelector("sp-dialog-base");
    await elementUpdated(dialog);
    const secondaryButton = el.querySelector(
      '[variant="secondary"]'
    );
    const negativeButton = el.querySelector(
      '[variant="negative"]'
    );
    expect(el.open).to.be.undefined;
    expect(dialog.open).to.be.false;
    const opened = oneEvent(el, "sp-opened");
    el.open = "click";
    await opened;
    expect(dialog.open).to.be.true;
    expect(el.open).to.be.equal("click");
    secondaryButton.click();
    await aTimeout(100);
    expect(el.open).to.be.equal("click");
    negativeButton.click();
    await aTimeout(100);
    expect(el.open).to.be.equal("click");
    const closed = oneEvent(el, "sp-closed");
    dialog.open = false;
    await closed;
    expect(dialog.open).to.be.false;
  });
  it("does not close by default when interacting with buttons when recycled", async () => {
    const el = await styledFixture(
      overlayTrigger(
        () => html`
                    <sp-dialog-base underlay slot="click-content">
                        ${alertDestructive()}
                    </sp-dialog-base>
                `
      )
    );
    await elementUpdated(el);
    const dialog = el.querySelector("sp-dialog-base");
    await elementUpdated(dialog);
    const secondaryButton = el.querySelector(
      '[variant="secondary"]'
    );
    const negativeButton = el.querySelector(
      '[variant="negative"]'
    );
    expect(el.open).to.be.undefined;
    expect(dialog.open).to.be.false;
    const opened = oneEvent(el, "sp-opened");
    el.open = "click";
    await opened;
    expect(dialog.open).to.be.true;
    expect(el.open).to.be.equal("click");
    secondaryButton.click();
    await aTimeout(100);
    expect(el.open).to.be.equal("click");
    negativeButton.click();
    await aTimeout(100);
    expect(el.open).to.be.equal("click");
    const closed = oneEvent(el, "sp-closed");
    dialog.open = false;
    await closed;
    await elementUpdated(el);
    expect(dialog.open).to.be.false;
  });
});
//# sourceMappingURL=dialog-base.test.js.map
