"use strict";
import {
  elementUpdated,
  expect,
  html,
  nextFrame,
  oneEvent,
  waitUntil
} from "@open-wc/testing";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/tooltip/sp-tooltip.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js";
import "@spectrum-web-components/overlay/overlay-trigger.js";
import { spy } from "sinon";
import { fixture, isOnTopLayer } from "../../../test/testing-helpers.js";
describe("Overlay Trigger - Click", () => {
  it("displays `click` declaratively", async () => {
    const openedSpy = spy();
    const closedSpy = spy();
    const el = await fixture(
      (() => html`
                <overlay-trigger
                    placement="right-start"
                    open="click"
                    @sp-opened=${() => openedSpy()}
                    @sp-closed=${() => closedSpy()}
                >
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="click-content" tip></sp-popover>
                </overlay-trigger>
            `)()
    );
    await waitUntil(
      () => {
        return openedSpy.calledOnce;
      },
      "click content projected to overlay",
      { timeout: 2e3 }
    );
    await nextFrame();
    el.removeAttribute("open");
    await elementUpdated(el);
    await waitUntil(() => closedSpy.calledOnce, "click content returned", {
      timeout: 2e3
    });
  });
  describe("closes on scroll", () => {
    afterEach(async () => {
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
      }
      await waitUntil(() => {
        if (document.scrollingElement) {
          return document.scrollingElement.scrollTop === 0;
        }
        return true;
      });
    });
    ["click", "replace", "inline"].map(
      (interaction) => {
        it(`closes "${interaction}" overlay on scroll`, async function() {
          const el = await fixture(html`
                        <overlay-trigger
                            placement="right"
                            type=${interaction}
                            content="click"
                        >
                            <sp-action-button
                                slot="trigger"
                                style="margin: 50vh 0 100vh;"
                            >
                                <sp-icon-magnify slot="icon"></sp-icon-magnify>
                            </sp-action-button>
                            <sp-popover slot="click-content" tip>
                                Content
                            </sp-popover>
                        </overlay-trigger>
                    `);
          await nextFrame();
          const popover = el.querySelector("sp-popover");
          expect(el.open).to.be.undefined;
          await elementUpdated(el);
          const opened = oneEvent(el, "sp-opened");
          const trigger = el.querySelector(
            "sp-action-button"
          );
          trigger.click();
          await opened;
          expect(el.open).to.equal("click");
          expect(await isOnTopLayer(popover)).to.be.true;
          const closed = oneEvent(el, "sp-closed");
          if (document.scrollingElement) {
            document.scrollingElement.scrollTop = 100;
          }
          await closed;
          expect(el.open).to.be.undefined;
          expect(await isOnTopLayer(popover)).to.be.false;
        });
      }
    );
  });
  it("opens a second time", async () => {
    const openedSpy = spy();
    const closedSpy = spy();
    const el = await fixture(html`
            <overlay-trigger
                placement="right-start"
                type="modal"
                open="click"
                @sp-opened=${() => openedSpy()}
                @sp-closed=${() => closedSpy()}
            >
                <sp-action-button slot="trigger">
                    <sp-icon-magnify slot="icon"></sp-icon-magnify>
                </sp-action-button>
                <sp-popover slot="click-content" tip></sp-popover>
            </overlay-trigger>
        `);
    await elementUpdated(el);
    const trigger = el.querySelector("[slot=trigger]");
    await waitUntil(
      () => openedSpy.calledOnce,
      "click content projected to overlay",
      { timeout: 2e3 }
    );
    expect(el.open).to.equal("click");
    el.removeAttribute("open");
    await elementUpdated(el);
    await waitUntil(() => closedSpy.calledOnce, "click content returned", {
      timeout: 2e3
    });
    expect(el.open).to.be.null;
    trigger.click();
    await waitUntil(
      () => openedSpy.callCount === 2,
      "click content projected to overlay, again",
      { timeout: 2e3 }
    );
    expect(el.open).to.equal("click");
  });
  it("opens with a delay on click", async () => {
    const el = await fixture(html`
            <overlay-trigger placement="right-start">
                <sp-button slot="trigger" variant="primary"></sp-button>
                <sp-tooltip
                    slot="click-content"
                    id="content"
                    delayed
                ></sp-tooltip>
            </overlay-trigger>
        `);
    const start = performance.now();
    const opened = oneEvent(el, "sp-opened");
    el.setAttribute("open", "click");
    await opened;
    const end = performance.now();
    expect(end - start).to.be.greaterThan(1e3);
  });
});
//# sourceMappingURL=overlay-trigger-click.test.js.map
