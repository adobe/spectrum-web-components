"use strict";
import {
  elementUpdated,
  expect,
  html,
  nextFrame,
  oneEvent,
  waitUntil
} from "@open-wc/testing";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/textfield/sp-textfield.js";
import "@spectrum-web-components/dialog/sp-dialog.js";
import { sendMouse } from "../../../test/plugins/browser.js";
import { fixture } from "../../../test/testing-helpers.js";
import { sendKeys } from "@web/test-runner-commands";
import { isChrome } from "@spectrum-web-components/shared";
const initTest = async (styles = html``) => {
  const test = await fixture(html`
        <div class="container">
            <style>
                .container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }
            </style>
            ${styles}
            <overlay-trigger type="modal" id="trigger" placement="top">
                <sp-button id="outer-button" variant="primary" slot="trigger">
                    Show Popover
                </sp-button>
                <sp-popover
                    id="outer-popover"
                    slot="click-content"
                    direction="bottom"
                    tip
                    tabindex="0"
                    placement="top"
                >
                    <sp-dialog no-divider>
                        This is the overlay content.
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>
        </div>
    `);
  await nextFrame();
  await nextFrame();
  await nextFrame();
  await nextFrame();
  await nextFrame();
  await nextFrame();
  return {
    overlayTrigger: test.querySelector("overlay-trigger"),
    button: test.querySelector("sp-button"),
    popover: test.querySelector("sp-popover")
  };
};
describe("Overlay Trigger - extended", () => {
  let overlayTrigger;
  let button;
  let popover;
  afterEach(async () => {
    if (overlayTrigger && overlayTrigger.open) {
      const closed = oneEvent(overlayTrigger, "sp-closed");
      overlayTrigger.open = void 0;
      await closed;
    }
  });
  it("manages `placement` on open", async () => {
    ({ overlayTrigger, button, popover } = await initTest());
    expect(popover.placement).to.equal("top");
    const open = oneEvent(overlayTrigger, "sp-opened");
    button.click();
    await open;
    expect(popover.placement).to.equal("bottom");
    const close = oneEvent(overlayTrigger, "sp-closed");
    overlayTrigger.open = void 0;
    await close;
    expect(popover.placement).to.equal("top");
  });
  it("manages `placement` on scroll", async () => {
    if (isChrome()) {
      return;
    }
    ({ overlayTrigger, button, popover } = await initTest(html`
            <style>
                sp-button {
                    margin: 100vh 0;
                    transform: translateY(-100%);
                }
            </style>
        `));
    expect(popover.placement).to.equal("top");
    const open = oneEvent(overlayTrigger, "sp-opened");
    button.click();
    await open;
    expect(popover.placement).to.equal("top");
    button.scrollIntoView({
      behavior: "instant",
      block: "start"
    });
    await nextFrame();
    await nextFrame();
    await nextFrame();
    await nextFrame();
    expect(popover.placement).to.equal("bottom");
  });
  it("occludes content behind the overlay", async () => {
    if (isChrome()) {
      return;
    }
    const { overlayTrigger: overlayTrigger2, button: button2, popover: popover2 } = await initTest();
    const textfield = document.createElement("sp-textfield");
    overlayTrigger2.insertAdjacentElement("afterend", textfield);
    const textfieldRect = textfield.getBoundingClientRect();
    expect(document.activeElement === textfield).to.be.false;
    await sendMouse({
      steps: [
        {
          type: "click",
          position: [
            textfieldRect.left + textfieldRect.width / 2,
            textfieldRect.top + textfieldRect.height / 2
          ]
        }
      ]
    });
    await elementUpdated(textfield);
    textfield.focus();
    await waitUntil(() => document.activeElement === textfield);
    expect(
      document.activeElement === textfield,
      "clicking focuses the Textfield"
    ).to.be.true;
    expect(popover2.placement).to.equal("top");
    const open = oneEvent(overlayTrigger2, "sp-opened");
    await sendKeys({
      press: "Shift+Tab"
    });
    expect(document.activeElement === button2, "button focused").to.be.true;
    await sendKeys({
      press: "Enter"
    });
    await open;
    expect(overlayTrigger2.type).to.equal("modal");
    expect(overlayTrigger2.open).to.equal("click");
    expect(popover2.placement).to.equal("bottom");
    const close = oneEvent(overlayTrigger2, "sp-closed");
    await sendMouse({
      steps: [
        {
          type: "click",
          position: [
            textfieldRect.left + textfieldRect.width / 2,
            textfieldRect.top + textfieldRect.height / 2
          ]
        }
      ]
    });
    await close;
    expect(overlayTrigger2.open).to.be.undefined;
    expect(
      document.activeElement === textfield,
      "closing does not focus the Textfield"
    ).to.be.false;
    await sendMouse({
      steps: [
        {
          type: "click",
          position: [
            textfieldRect.left + textfieldRect.width / 2,
            textfieldRect.top + textfieldRect.height / 2
          ]
        }
      ]
    });
    textfield.focus();
    await waitUntil(
      () => document.activeElement === textfield,
      "textfield is focused"
    );
    expect(
      document.activeElement === textfield,
      "the Textfield is focused again"
    ).to.be.true;
  });
  xit("occludes wheel interactions behind the overlay", async () => {
    ({ overlayTrigger, button, popover } = await initTest());
    const scrollingArea = document.createElement("div");
    Object.assign(scrollingArea.style, {
      width: "100px",
      height: "100px",
      overflow: "auto"
    });
    const content = Array(100).fill(
      "This is content within my box that will scroll."
    );
    scrollingArea.textContent = content.join(" ");
    document.body.append(scrollingArea);
    await nextFrame();
    const boundingRect = scrollingArea.getBoundingClientRect();
    expect(scrollingArea.scrollTop).to.equal(0);
    const distance = 1;
    await sendMouse({
      steps: [
        {
          type: "move",
          position: [
            boundingRect.left + boundingRect.width / 2,
            boundingRect.top + boundingRect.height / 2
          ]
        }
      ]
    });
    await sendMouse({
      steps: [
        {
          type: "wheel",
          position: [0, distance]
        }
      ]
    });
    await waitUntil(
      () => scrollingArea.scrollTop === distance,
      `scroll went to ${distance}`
    );
    expect(scrollingArea.scrollTop).to.equal(distance);
    expect(popover.placement).to.equal("top");
    const open = oneEvent(overlayTrigger, "sp-opened");
    button.click();
    await open;
    expect(overlayTrigger.open).to.equal("click");
    expect(popover.placement).to.equal("bottom");
    expect(scrollingArea.scrollTop).to.equal(distance);
    await sendMouse({
      steps: [
        {
          type: "wheel",
          position: [0, -distance]
        }
      ]
    });
    await nextFrame();
    await nextFrame();
    await nextFrame();
    expect(
      scrollingArea.scrollTop,
      `scrollTop should be ${distance}.`
    ).to.equal(distance);
    scrollingArea.remove();
  });
});
//# sourceMappingURL=overlay-trigger-extended.test.js.map
