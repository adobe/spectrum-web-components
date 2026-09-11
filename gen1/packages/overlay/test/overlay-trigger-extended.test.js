"use strict";
import {
  aTimeout,
  elementUpdated,
  expect,
  html,
  nextFrame,
  waitUntil
} from "@open-wc/testing";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/dialog/sp-dialog.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import "@spectrum-web-components/popover/sp-popover.js";
import { sendMouse } from "../../../test/plugins/browser.js";
import {
  fixture,
  mouseClickOn,
  mouseMoveOver
} from "../../../test/testing-helpers.js";
import { overlayClosed, overlayOpened } from "./overlay-testing-helpers.js";
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
      <overlay-trigger
        type="modal"
        id="trigger"
        placement="top"
        triggered-by="click"
      >
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
          <sp-dialog no-divider>This is the overlay content.</sp-dialog>
        </sp-popover>
      </overlay-trigger>
    </div>
  `);
  await waitUntil(
    () => {
      return !!test.querySelector("overlay-trigger") && !!test.querySelector("sp-button") && !!test.querySelector("sp-popover");
    },
    "overlay-trigger, button, and popover appeared",
    { timeout: 300 }
  );
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
  it("manages `placement` on open", async () => {
    ({ overlayTrigger, button, popover } = await initTest());
    expect(popover.placement).to.equal("top");
    button.click();
    await elementUpdated(overlayTrigger);
    await overlayOpened(overlayTrigger.clickOverlayElement, 300);
    expect(popover.placement).to.equal("bottom");
    overlayTrigger.open = void 0;
    await elementUpdated(overlayTrigger);
    expect(
      overlayTrigger.clickOverlayElement.state,
      "overlay state after closing"
    ).to.equal("closing");
    await overlayClosed(overlayTrigger.clickOverlayElement, 300);
    expect(popover.placement).to.equal("top");
  });
  it("manages `placement` on scroll", async () => {
    ({ overlayTrigger, button, popover } = await initTest(html`
      <style>
        .container {
          padding: 100vh 0;
        }
      </style>
    `));
    expect(!!overlayTrigger, `overlayTrigger is ready`).to.be.true;
    expect(!!button.isConnected, "button is ready").to.be.true;
    expect(!!overlayTrigger.isConnected, "overlayTrigger is ready").to.be.true;
    expect(popover.placement, "initial placement").to.equal("top");
    button.scrollIntoView({
      behavior: "instant",
      block: "end"
    });
    overlayTrigger.open = "click";
    await waitUntil(
      () => popover.placement === "top" && popover.getBoundingClientRect().height > 0,
      `popover placement is top`,
      { timeout: 100 }
    );
    expect(overlayTrigger.open).to.equal("click");
    expect(popover.placement, `placement after clicking`).to.equal("top");
    button.scrollIntoView({
      behavior: "instant",
      block: "start"
    });
    await waitUntil(
      () => popover.placement === "bottom",
      `popover placement is top`,
      { timeout: 100 }
    );
    expect(popover.placement, `placement after scrolling`).to.equal("bottom");
  });
  it('does not auto-focus overlay content when `receives-focus="false"` on a modal', async () => {
    const el = await fixture(html`
      <div>
        <overlay-trigger
          type="modal"
          placement="top"
          triggered-by="click"
          receives-focus="false"
        >
          <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
          <sp-popover slot="click-content" tip>
            <sp-dialog no-divider>
              Body copy with
              <a href="https://example.com/">an inline link</a>
              that should not be auto-focused on open.
            </sp-dialog>
          </sp-popover>
        </overlay-trigger>
      </div>
    `);
    const trigger = el.querySelector("overlay-trigger");
    const button2 = el.querySelector("sp-button");
    button2.focus();
    button2.click();
    await elementUpdated(trigger);
    await overlayOpened(trigger.clickOverlayElement, 300);
    expect(
      document.activeElement,
      'focus should remain on the trigger when receives-focus="false"'
    ).to.equal(button2);
  });
  it('auto-focuses the first focusable in overlay content when `receives-focus="true"` on a modal', async () => {
    const el = await fixture(html`
      <div>
        <overlay-trigger
          type="modal"
          placement="top"
          triggered-by="click"
          receives-focus="true"
        >
          <sp-button slot="trigger" variant="primary">Toggle Dialog</sp-button>
          <sp-popover slot="click-content" tip>
            <sp-dialog no-divider>
              Body copy with
              <a href="https://example.com/">an inline link</a>
              that should be auto-focused on open.
            </sp-dialog>
          </sp-popover>
        </overlay-trigger>
      </div>
    `);
    const trigger = el.querySelector("overlay-trigger");
    const button2 = el.querySelector("sp-button");
    const link = el.querySelector("a");
    button2.click();
    await elementUpdated(trigger);
    await overlayOpened(trigger.clickOverlayElement, 300);
    expect(
      document.activeElement,
      "link inside overlay should receive focus"
    ).to.equal(link);
  });
  it.skip("occludes content behind the overlay", async () => {
    const el = await fixture(html`
      <div class="container">
        <style>
          .container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
        </style>
        <overlay-trigger
          type="modal"
          id="trigger"
          placement="top"
          triggered-by="click"
        >
          <sp-button id="outer-button" variant="primary" slot="trigger">
            Show Popover
          </sp-button>
          <sp-popover
            id="outer-popover"
            slot="click-content"
            tip
            tabindex="0"
            placement="bottom"
          >
            <sp-dialog no-divider>This is the overlay content.</sp-dialog>
          </sp-popover>
        </overlay-trigger>
        <input
          type="text"
          id="textfield"
          style="position: relative; z-index: 1;"
        />
      </div>
    `);
    const textfield = el.querySelector("#textfield");
    const overlayTrigger2 = el.querySelector(
      "overlay-trigger"
    );
    const button2 = el.querySelector("sp-button");
    const popover2 = el.querySelector("sp-popover");
    await elementUpdated(el);
    const overlay = overlayTrigger2.clickOverlayElement;
    expect(overlay.state, `overlay state`).to.equal("closed");
    expect(textfield.offsetParent, "textfield is visible").to.not.be.null;
    expect(textfield.tabIndex, "textfield is focusable").to.be.equal(0);
    await mouseClickOn(textfield);
    await waitUntil(
      () => document.activeElement === textfield,
      `textfield focused`,
      { timeout: 500 }
    );
    expect(document.activeElement, `textfield focused`).to.equal(textfield);
    expect(popover2.placement).to.equal("bottom");
    button2.focus();
    await elementUpdated(button2);
    expect(document.activeElement, `button focused`).to.equal(button2);
    expect(overlayTrigger2.open, `overlayTrigger.open`).to.equal(void 0);
    expect(overlay.state, `overlay.state`).to.equal("closed");
    overlayTrigger2.open = "click";
    await elementUpdated(overlayTrigger2);
    expect(
      overlayTrigger2.clickOverlayElement.state,
      "overlay state after clicking"
    ).to.equal("opening");
    await overlayOpened(overlayTrigger2.clickOverlayElement, 400);
    await mouseClickOn(textfield);
    await aTimeout(100);
    expect(document.activeElement, `textfield cannot be clicked`).to.not.equal(
      textfield
    );
    overlayTrigger2.open = void 0;
    await overlayClosed(overlayTrigger2.clickOverlayElement, 300);
    expect(document.activeElement, "textfield is not focused").to.not.equal(
      textfield
    );
    await mouseClickOn(textfield);
    await waitUntil(
      () => document.activeElement === textfield,
      `textfield focused after overlay closed`,
      { timeout: 500 }
    );
    expect(document.activeElement, `textfield focused`).to.equal(textfield);
  });
  it.skip("occludes wheel interactions behind the overlay", async () => {
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
    expect(scrollingArea.scrollTop).to.equal(0);
    const distance = 1;
    await mouseMoveOver(scrollingArea);
    await sendMouse({
      type: "wheel",
      position: [0, distance]
    });
    await waitUntil(
      () => scrollingArea.scrollTop === distance,
      `scroll went to ${distance}`,
      { timeout: 200 }
    );
    expect(scrollingArea.scrollTop).to.equal(distance);
    expect(popover.placement).to.equal("top");
    button.click();
    expect(overlayTrigger.open, "overlay open").to.equal("click");
    expect(
      overlayTrigger.clickOverlayElement.state,
      "overlay state after clicking"
    ).to.equal("opening");
    await overlayOpened(overlayTrigger.clickOverlayElement, 300);
    expect(overlayTrigger.open).to.equal("click");
    expect(popover.placement).to.equal("bottom");
    expect(scrollingArea.scrollTop).to.equal(distance);
    await sendMouse({
      type: "wheel",
      position: [0, -distance]
    });
    await aTimeout(50);
    expect(
      scrollingArea.scrollTop,
      `scrollTop should be ${distance}.`
    ).to.equal(distance);
    scrollingArea.remove();
  });
});
//# sourceMappingURL=overlay-trigger-extended.test.js.map
