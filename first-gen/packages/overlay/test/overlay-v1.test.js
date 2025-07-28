"use strict";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/dialog/sp-dialog.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import "@spectrum-web-components/popover/sp-popover.js";
import { setViewport } from "@web/test-runner-commands";
import {
  Overlay
} from "@spectrum-web-components/overlay";
import {
  elementUpdated,
  expect,
  html,
  nextFrame,
  oneEvent
} from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import {
  definedOverlayElement,
  virtualElementV1
} from "../stories/overlay.stories";
import { sendMouse } from "../../../test/plugins/browser.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import { render } from "@spectrum-web-components/base";
import {
  fixture,
  isInteractive,
  isOnTopLayer
} from "../../../test/testing-helpers.js";
async function styledFixture(story) {
  const test = await fixture(html`
        <sp-theme system="spectrum" scale="medium" color="dark">
            ${story}
        </sp-theme>
    `);
  return test.children[0];
}
describe("Overlays, v1", () => {
  let testDiv;
  let openOverlays = [];
  describe("shared fixture", () => {
    beforeEach(async () => {
      testDiv = await styledFixture(html`
                <div id="top">
                    <style>
                        body {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        #top {
                            margin: 100px;
                        }

                        sp-button {
                            flex: none;
                        }

                        #overlay-content {
                            display: none;
                        }
                    </style>
                    <sp-button id="first-button" variant="primary">
                        Show Popover
                    </sp-button>
                    <div id="overlay-content">
                        <sp-popover id="outer-popover" direction="bottom" tip>
                            <sp-dialog no-divider>
                                <div class="options-popover-content">
                                    A popover message
                                </div>
                                <sp-button id="outer-focus-target">
                                    Test 1
                                </sp-button>
                                <sp-button>Test 2</sp-button>
                                <sp-button>Test 3</sp-button>
                            </sp-dialog>
                        </sp-popover>
                        <sp-tooltip id="hover-1" class="hover-content">
                            Hover message
                        </sp-tooltip>
                        <sp-tooltip id="hover-2" class="hover-content">
                            Other hover message
                        </sp-tooltip>
                    </div>
                </div>
            `);
      await elementUpdated(testDiv);
    });
    afterEach(() => {
      openOverlays.map((close) => close());
      openOverlays = [];
    });
    [
      "bottom",
      "bottom-start",
      "bottom-end",
      "top",
      "top-start",
      "top-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end",
      "none"
    ].map((direction) => {
      const placement = direction;
      it(`opens a popover - ${placement}`, async () => {
        const button = testDiv.querySelector(
          "#first-button"
        );
        const outerPopover = testDiv.querySelector(
          "#outer-popover"
        );
        expect(await isInteractive(outerPopover)).to.be.false;
        expect(button).to.exist;
        const opened = oneEvent(outerPopover, "sp-opened");
        openOverlays.push(
          await Overlay.open(button, "click", outerPopover, {
            delayed: false,
            placement,
            offset: 10
          })
        );
        await opened;
        expect(await isInteractive(outerPopover)).to.be.true;
      });
    });
    it(`opens a modal dialog`, async () => {
      const button = testDiv.querySelector(
        "#first-button"
      );
      const outerPopover = testDiv.querySelector(
        "#outer-popover"
      );
      expect(await isInteractive(outerPopover)).to.be.false;
      expect(button).to.exist;
      const opened = oneEvent(outerPopover, "sp-opened");
      openOverlays.push(
        await Overlay.open(button, "modal", outerPopover, {
          delayed: false
        })
      );
      await opened;
      const firstFocused = outerPopover.querySelector(
        "#outer-focus-target"
      );
      expect(document.activeElement === firstFocused).to.be.true;
      await sendKeys({
        press: "Tab"
      });
      expect(document.activeElement === button).to.be.false;
      await sendKeys({
        press: "Tab"
      });
      expect(document.activeElement === button).to.be.false;
      await sendKeys({
        press: "Shift+Tab"
      });
      expect(document.activeElement === button).to.be.false;
      await sendKeys({
        press: "Shift+Tab"
      });
      expect(document.activeElement === button).to.be.false;
      await sendKeys({
        press: "Shift+Tab"
      });
      expect(document.activeElement === button).to.be.false;
    });
    it(`updates a popover`, async () => {
      const button = testDiv.querySelector(
        "#first-button"
      );
      const outerPopover = testDiv.querySelector(
        "#outer-popover"
      );
      expect(await isInteractive(outerPopover)).to.be.false;
      expect(button).to.exist;
      const opened = oneEvent(outerPopover, "sp-opened");
      openOverlays.push(
        await Overlay.open(button, "click", outerPopover, {
          delayed: false,
          offset: 10
        })
      );
      await opened;
      expect(await isInteractive(outerPopover)).to.be.true;
      Overlay.update();
      expect(await isInteractive(outerPopover)).to.be.true;
    });
    it(`opens a popover w/ delay`, async () => {
      const button = testDiv.querySelector(
        "#first-button"
      );
      const outerPopover = testDiv.querySelector(
        "#outer-popover"
      );
      expect(await isInteractive(outerPopover)).to.be.false;
      expect(button).to.exist;
      const opened = oneEvent(outerPopover, "sp-opened");
      const start = performance.now();
      openOverlays.push(
        await Overlay.open(button, "click", outerPopover, {
          delayed: true,
          offset: 10
        })
      );
      await opened;
      const end = performance.now();
      expect(await isInteractive(outerPopover)).to.be.true;
      expect(end - start).to.be.greaterThan(1e3);
    });
    it("opens hover overlay", async () => {
      const button = testDiv.querySelector(
        "#first-button"
      );
      const hoverOverlay = testDiv.querySelector(
        "#hover-1"
      );
      const clickOverlay = testDiv.querySelector(
        "#outer-popover"
      );
      expect(await isOnTopLayer(hoverOverlay)).to.be.false;
      expect(await isOnTopLayer(clickOverlay)).to.be.false;
      let opened = oneEvent(hoverOverlay, "sp-opened");
      openOverlays.push(
        await Overlay.open(button, "hover", hoverOverlay, {
          delayed: false,
          placement: "top",
          offset: 10
        })
      );
      await opened;
      expect(await isOnTopLayer(hoverOverlay)).to.be.true;
      opened = oneEvent(clickOverlay, "sp-opened");
      const closed = oneEvent(hoverOverlay, "sp-closed");
      openOverlays.push(
        await Overlay.open(button, "click", clickOverlay, {
          delayed: false,
          placement: "bottom",
          offset: 10
        })
      );
      await opened;
      await closed;
      expect(
        await isInteractive(clickOverlay),
        "click overlay not interactive"
      ).to.be.true;
      expect(
        await isOnTopLayer(hoverOverlay),
        "hover overlay interactive"
      ).to.be.false;
    });
    it("opens custom overlay", async () => {
      const button = testDiv.querySelector(
        "#first-button"
      );
      const customOverlay = testDiv.querySelector(
        "#hover-1"
      );
      const clickOverlay = testDiv.querySelector(
        "#outer-popover"
      );
      expect(button).to.exist;
      expect(customOverlay).to.exist;
      expect(await isOnTopLayer(customOverlay)).to.be.false;
      expect(await isOnTopLayer(clickOverlay)).to.be.false;
      let opened = oneEvent(customOverlay, "sp-opened");
      openOverlays.push(
        await Overlay.open(button, "custom", customOverlay, {
          delayed: false,
          placement: "top",
          offset: 10
        })
      );
      await opened;
      expect(await isOnTopLayer(customOverlay)).to.be.true;
      opened = oneEvent(clickOverlay, "sp-opened");
      openOverlays.push(
        await Overlay.open(button, "click", clickOverlay, {
          delayed: false,
          placement: "bottom",
          offset: 10
        })
      );
      await opened;
      expect(await isOnTopLayer(clickOverlay), "click content open").to.be.true;
    });
  });
  it("closes via events", async function() {
    this.retries(0);
    const test = await fixture(html`
            <div>
                <sp-popover id="root">
                    <sp-dialog dismissable>
                        Some Content for the Dialog.
                    </sp-dialog>
                </sp-popover>
            </div>
        `);
    const el = test.querySelector("sp-popover");
    const dialog = el.querySelector("sp-dialog");
    const opened = oneEvent(el, "sp-opened");
    openOverlays.push(
      await Overlay.open(test, "click", el, {
        delayed: false,
        placement: "bottom",
        offset: 10
      })
    );
    await opened;
    expect(await isOnTopLayer(el)).to.be.true;
    const closed = oneEvent(el, "sp-closed");
    dialog.close();
    await closed;
    expect(await isOnTopLayer(el)).to.be.false;
  });
  it("closes an inline overlay when tabbing past the content", async () => {
    const el = await fixture(html`
            <div>
                <sp-button class="trigger">Trigger</sp-button>
                <sp-popover class="content">
                    <input />
                </sp-popover>
                <input value="After" id="after" />
            </div>
        `);
    const trigger = el.querySelector(".trigger");
    const content = el.querySelector(".content");
    const input = el.querySelector("input");
    const after2 = el.querySelector("#after");
    const opened = oneEvent(content, "sp-opened");
    openOverlays.push(
      await Overlay.open(trigger, "inline", content, {
        receivesFocus: "auto"
      })
    );
    await opened;
    expect(await isInteractive(content)).to.be.true;
    expect(document.activeElement).to.equal(input);
    const closed = oneEvent(content, "sp-closed");
    await sendKeys({
      press: "Shift+Tab"
    });
    await closed;
    expect(document.activeElement).to.equal(trigger);
    await sendKeys({
      press: "Tab"
    });
    expect(document.activeElement).to.equal(after2);
    expect(await isInteractive(content)).to.be.false;
  });
  it("closes an inline overlay when tabbing before the trigger", async () => {
    const el = await fixture(html`
            <div>
                <input value="Before" id="before" />
                <sp-button class="trigger">Trigger</sp-button>
                <div class="content">
                    <label>
                        Content in an inline overlay.
                        <input />
                    </label>
                </div>
            </div>
        `);
    const trigger = el.querySelector(".trigger");
    const content = el.querySelector(".content");
    const input = el.querySelector(".content input");
    const before2 = el.querySelector("#before");
    const open = oneEvent(trigger, "sp-opened");
    openOverlays.push(await Overlay.open(trigger, "inline", content, {}));
    await open;
    expect(document.activeElement).to.equal(input);
    await sendKeys({
      press: "Shift+Tab"
    });
    expect(document.activeElement).to.equal(trigger);
    await sendKeys({
      press: "Shift+Tab"
    });
    expect(document.activeElement).to.equal(before2);
  });
  it("opens detached content", async () => {
    const textContent = "This is a detached element that has been overlaid";
    const el = await fixture(html`
            <button>Trigger</button>
        `);
    const content = document.createElement("sp-popover");
    content.textContent = textContent;
    const opened = oneEvent(content, "sp-opened");
    const closeOverlay = await Overlay.open(el, "click", content, {
      placement: "bottom"
    });
    await opened;
    expect(await isInteractive(content)).to.be.true;
    const closed = oneEvent(content, "sp-closed");
    closeOverlay();
    await closed;
    expect(await isInteractive(content)).to.be.false;
    content.remove();
  });
});
describe('Overlay - type="modal", v1', () => {
  describe("handle multiple separate `contextmenu` events", async () => {
    let width = 0;
    let height = 0;
    let firstMenu;
    let firstRect;
    let secondMenu;
    let secondRect;
    before(async () => {
      render(
        html`
                    <sp-theme color="light" scale="large">
                        ${virtualElementV1({
          ...virtualElementV1.args,
          offset: 6
        })}
                    </sp-theme>
                `,
        document.body
      );
      width = window.innerWidth;
      height = window.innerHeight;
    });
    after(() => {
      var _a;
      (_a = document.querySelector("sp-theme")) == null ? void 0 : _a.remove();
    });
    it('opens the first "contextmenu" overlay', async () => {
      const opened = oneEvent(document, "sp-opened");
      await sendMouse({
        steps: [
          {
            type: "move",
            position: [width / 2 + 50, height / 2]
          },
          {
            type: "click",
            options: {
              button: "right"
            },
            position: [width / 2 + 50, height / 2]
          }
        ]
      });
      await opened;
      firstMenu = document.querySelector("sp-popover");
      expect(firstMenu.textContent).to.include("Menu source: end");
      firstRect = firstMenu.getBoundingClientRect();
      expect(firstMenu).to.not.be.null;
    });
    it('closes the first "contextmenu" when opening a second', async () => {
      var _a, _b, _c, _d;
      const closed = oneEvent(document, "sp-closed");
      const opened = oneEvent(document, "sp-opened");
      const trigger = document.querySelector(
        "start-end-contextmenu"
      );
      (_b = (_a = trigger.shadowRoot) == null ? void 0 : _a.querySelector("#start")) == null ? void 0 : _b.dispatchEvent(
        new Event("contextmenu", {
          composed: true
        })
      );
      await nextFrame();
      (_d = (_c = trigger.shadowRoot) == null ? void 0 : _c.querySelector("#start")) == null ? void 0 : _d.dispatchEvent(
        new Event("pointerup", {
          composed: true,
          bubbles: true
        })
      );
      await closed;
      await opened;
      secondMenu = document.querySelector("sp-popover");
      expect(secondMenu.textContent).to.include("Menu source: start");
      secondRect = secondMenu.getBoundingClientRect();
      expect(secondMenu).to.not.be.null;
    });
    it('closes the second "contextmenu" when clicking away', async () => {
      const closed = oneEvent(document, "sp-closed");
      sendMouse({
        steps: [
          {
            type: "click",
            position: [width - width / 8, height - height / 8]
          }
        ]
      });
      await closed;
      expect(firstRect.top).to.not.equal(secondRect.top);
      expect(firstRect.left).to.not.equal(secondRect.left);
    });
  });
  it("does not open content off of the viewport", async () => {
    before(async () => {
      await setViewport({ width: 360, height: 640 });
      await nextFrame();
    });
    after(async () => {
      await setViewport({ width: 800, height: 600 });
      await nextFrame();
    });
    await fixture(html`
            ${virtualElementV1({
      ...virtualElementV1.args,
      offset: 6
    })}
        `);
    const opened = oneEvent(document, "sp-opened");
    sendMouse({
      steps: [
        {
          type: "move",
          position: [270, 10]
        },
        {
          type: "click",
          options: {
            button: "right"
          },
          position: [270, 10]
        }
      ]
    });
    await opened;
    const firstMenu = document.querySelector("sp-menu");
    expect(firstMenu).to.not.be.null;
    expect(await isInteractive(firstMenu)).to.be.true;
    const closed = oneEvent(document, "sp-closed");
    sendKeys({
      press: "Escape"
    });
    await closed;
    expect(await isInteractive(firstMenu)).to.be.false;
  });
  it("opens children in the modal stack through shadow roots", async () => {
    const el = await fixture(definedOverlayElement());
    const trigger = el.querySelector(
      '[slot="trigger"]'
    );
    let open = oneEvent(el, "sp-opened");
    trigger.click();
    await open;
    expect(el.open).to.equal("click");
    const content = document.querySelector(
      "popover-content"
    );
    open = oneEvent(content, "sp-opened");
    content.button.click();
    await open;
    expect(content.trigger.open).to.equal("click");
    let close = oneEvent(content, "sp-closed");
    content.trigger.removeAttribute("open");
    await close;
    expect(content.trigger.open).to.be.null;
    close = oneEvent(el, "sp-closed");
    el.removeAttribute("open");
    await close;
    expect(el.open).to.be.null;
  });
});
//# sourceMappingURL=overlay-v1.test.js.map
