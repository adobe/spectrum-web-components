"use strict";
import {
  elementUpdated,
  expect,
  fixture,
  html,
  nextFrame
} from "@open-wc/testing";
import "@spectrum-web-components/split-view/sp-split-view.js";
import {
  arrowDownEvent,
  arrowLeftEvent,
  arrowRightEvent,
  arrowUpEvent,
  endEvent,
  homeEvent,
  pageDownEvent,
  pageUpEvent,
  shiftTabEvent,
  testForLitDevWarnings
} from "../../../test/testing-helpers.js";
import { spy } from "sinon";
describe("SplitView", () => {
  testForLitDevWarnings(
    async () => await fixture(
      html`
                    <sp-split-view primary-size="100">
                        <div>First panel</div>
                        <div>Second panel</div>
                    </sp-split-view>
                `
    )
  );
  it("loads default (horizontal) split-view accessibly", async () => {
    const el = await fixture(
      html`
                <sp-split-view primary-size="100">
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    expect(el.splitterPos || 0).to.equal(100);
    expect(el.resizable).to.be.false;
    expect(el.collapsible).to.be.false;
    const gripper = el.shadowRoot.querySelector(
      "#gripper"
    );
    expect(gripper).to.be.null;
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    expect(getComputedStyle(splitter).cursor).to.equal("auto");
  });
  it("loads horizontal [resizable] split-view accessibly", async () => {
    const el = await fixture(
      html`
                <sp-split-view resizable primary-size="100px">
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    expect(el.splitterPos || 0).to.equal(100);
    const gripper = el.shadowRoot.querySelector(
      "#gripper"
    );
    await expect(gripper).to.be.accessible();
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    expect(getComputedStyle(splitter).cursor).to.equal("ew-resize");
  });
  it("loads [vertical] split-view accessibly", async () => {
    const el = await fixture(
      html`
                <sp-split-view
                    vertical
                    primary-size="75%"
                    style="height: 400px"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    expect(el.splitterPos || 0).to.equal(300);
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    expect(getComputedStyle(splitter).cursor).to.equal("auto");
  });
  it("loads [vertical] [resizable] split-view accessibly", async () => {
    const el = await fixture(
      html`
                <sp-split-view vertical resizable style="height: 400px">
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    expect(el.splitterPos || 0).to.equal(200);
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    expect(getComputedStyle(splitter).cursor).to.equal("ns-resize");
  });
  it("set all panel values", async () => {
    const splitTotalWidth = 400;
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    primary-max="300"
                    secondary-min="50"
                    style=${`height: 500px; width: ${splitTotalWidth}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.true;
    expect(el.primaryMin).to.equal(50);
    expect(el.primaryMax).to.equal(300);
    expect(el.secondaryMin).to.equal(50);
    expect(el.secondaryMax).to.equal(3840);
  });
  it("use auto height in primary pane", async () => {
    const splitTotalWidth = 400;
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    primary-size="auto"
                    style=${`height: 500px; width: ${splitTotalWidth}px;`}
                >
                    <div>
                        First panel Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                    </div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.true;
    expect(el.primarySize).to.equal("auto");
    expect(el.splitterPos || 0).to.equal(398);
  });
  it("resizes when pointer moves and resizable is enabled [ltr]", async () => {
    let pointerId = -1;
    const splitTotalWidth = 400;
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    secondary-min="50"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.true;
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.setPointerCapture = (id) => pointerId = id;
    splitter.releasePointerCapture = (id) => pointerId = id;
    let pos = el.splitterPos;
    expect(el.splitterPos).to.equal(200);
    splitter.dispatchEvent(
      new PointerEvent("pointerdown", { pointerId: 1 })
    );
    await elementUpdated(el);
    expect(pointerId).to.equal(1);
    pos -= 10;
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: pos
      })
    );
    await elementUpdated(el);
    await nextFrame();
    expect(Math.round(el.splitterPos)).to.equal(
      pos - el.getBoundingClientRect().left
    );
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 0
      })
    );
    await elementUpdated(el);
    await nextFrame();
    expect(el.splitterPos).to.equal(el.primaryMin);
    expect(getComputedStyle(splitter).cursor).to.equal("e-resize");
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: splitTotalWidth
      })
    );
    await elementUpdated(el);
    expect(el.splitterPos, "350 first time").to.equal(
      splitTotalWidth - el.secondaryMin
    );
    expect(getComputedStyle(splitter).cursor).to.equal("w-resize");
    splitter.dispatchEvent(new PointerEvent("pointerup"));
    await elementUpdated(el);
    splitter.dispatchEvent(
      new MouseEvent("pointerdown", { button: 2, cancelable: true })
    );
    await elementUpdated(el);
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 0
      })
    );
    expect(el.splitterPos, "350 second time, because right click").to.equal(
      splitTotalWidth - el.secondaryMin
    );
  });
  it("resizes when pointer moves and resizable is enabled [rtl]", async () => {
    let pointerId = -1;
    const splitTotalWidth = 400;
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    secondary-min="40"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                    dir="rtl"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.true;
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.setPointerCapture = (id) => pointerId = id;
    splitter.releasePointerCapture = (id) => pointerId = id;
    let pos = el.splitterPos || 0;
    splitter.dispatchEvent(
      new PointerEvent("pointerdown", { pointerId: 1 })
    );
    await elementUpdated(el);
    expect(pointerId).to.equal(1);
    pos = el.getBoundingClientRect().right - 100;
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: pos
      })
    );
    await elementUpdated(el);
    await nextFrame();
    expect(Math.round(el.splitterPos || 0)).to.equal(
      el.getBoundingClientRect().right - pos
    );
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 0
      })
    );
    await elementUpdated(el);
    await nextFrame();
    expect(el.splitterPos || 0).to.equal(splitTotalWidth - el.secondaryMin);
    expect(getComputedStyle(splitter).cursor).to.equal("e-resize");
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: el.getBoundingClientRect().right
      })
    );
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(el.primaryMin);
    expect(getComputedStyle(splitter).cursor).to.equal("w-resize");
  });
  it("resizes to start pos when pointer moves in horizontal splitview", async () => {
    let pointerId = -1;
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    secondary-min="50"
                    style="height: 200px; width: 400px;"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.setPointerCapture = (id) => pointerId = id;
    splitter.releasePointerCapture = (id) => pointerId = id;
    splitter.dispatchEvent(
      new PointerEvent("pointerdown", { pointerId: 1 })
    );
    await elementUpdated(el);
    expect(pointerId).to.equal(1);
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: -10
      })
    );
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(0);
    splitter.dispatchEvent(new PointerEvent("pointerup"));
    await elementUpdated(el);
    expect(splitter.classList.contains("is-collapsed-start")).to.be.true;
    expect(getComputedStyle(splitter).cursor).to.equal("e-resize");
  });
  it("resizes to end pos when pointer moves in horizontal splitview", async () => {
    let pointerId = -1;
    const splitTotalWidth = 400;
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.setPointerCapture = (id) => pointerId = id;
    splitter.releasePointerCapture = (id) => pointerId = id;
    expect(el.primaryMin).to.equal(50);
    expect(el.resizable).to.be.true;
    splitter.dispatchEvent(
      new PointerEvent("pointerdown", { pointerId: 1 })
    );
    await elementUpdated(el);
    expect(pointerId).to.equal(1);
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: splitTotalWidth + 10
      })
    );
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(splitTotalWidth - el.splitterSize);
    splitter.dispatchEvent(new PointerEvent("pointerup"));
    await elementUpdated(el);
    expect(splitter.classList.contains("is-collapsed-end")).to.be.true;
    expect(getComputedStyle(splitter).cursor).to.equal("w-resize");
  });
  it("resizes to start pos when pointer moves in [vertical] splitview", async () => {
    let pointerId = -1;
    const el = await fixture(
      html`
                <sp-split-view
                    vertical
                    resizable
                    primary-min="0"
                    secondary-min="50"
                    style="height: 400px; width: 200px;"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.setPointerCapture = (id) => pointerId = id;
    splitter.releasePointerCapture = (id) => pointerId = id;
    splitter.dispatchEvent(
      new PointerEvent("pointerdown", { pointerId: 1 })
    );
    await elementUpdated(el);
    expect(pointerId).to.equal(1);
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientY: 0
      })
    );
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(0);
    splitter.dispatchEvent(new PointerEvent("pointerup"));
    await elementUpdated(el);
    expect(splitter.classList.contains("is-collapsed-start")).to.be.true;
    expect(getComputedStyle(splitter).cursor).to.equal("s-resize");
  });
  it("resizes to end pos when pointer moves in [vertical] splitview", async () => {
    let pointerId = -1;
    const splitTotalHeight = 400;
    const el = await fixture(
      html`
                <sp-split-view
                    vertical
                    resizable
                    primary-min="50"
                    style=${`height: ${splitTotalHeight}px; width: 200px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.setPointerCapture = (id) => pointerId = id;
    splitter.releasePointerCapture = (id) => pointerId = id;
    expect(el.primaryMin).to.equal(50);
    expect(el.resizable).to.be.true;
    splitter.dispatchEvent(
      new PointerEvent("pointerdown", { pointerId: 1 })
    );
    await elementUpdated(el);
    expect(pointerId).to.equal(1);
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientY: splitTotalHeight + 10
      })
    );
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(
      splitTotalHeight - el.splitterSize
    );
    splitter.dispatchEvent(new PointerEvent("pointerup"));
    await elementUpdated(el);
    expect(splitter.classList.contains("is-collapsed-end")).to.be.true;
    expect(getComputedStyle(splitter).cursor).to.equal("n-resize");
  });
  it("resizes and collapses when pointer moves in horizontal splitview", async () => {
    let pointerId = -1;
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    collapsible
                    primary-min="50"
                    secondary-min="50"
                    style="height: 200px; width: 400px;"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.collapsible).to.be.true;
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.setPointerCapture = (id) => pointerId = id;
    splitter.releasePointerCapture = (id) => pointerId = id;
    splitter.dispatchEvent(
      new PointerEvent("pointerdown", { pointerId: 1 })
    );
    await elementUpdated(el);
    expect(pointerId).to.equal(1);
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 40
      })
    );
    await elementUpdated(el);
    await nextFrame();
    expect(el.splitterPos || 0).to.equal(50);
    expect(splitter.classList.contains("is-collapsed-start")).to.be.false;
    expect(getComputedStyle(splitter).cursor).to.equal("ew-resize");
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: -10
      })
    );
    await elementUpdated(el);
    await nextFrame();
    expect(el.splitterPos || 0).to.equal(0);
    expect(splitter.classList.contains("is-collapsed-start")).to.be.true;
    expect(getComputedStyle(splitter).cursor).to.equal("e-resize");
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: el.getBoundingClientRect().right - 10
      })
    );
    await elementUpdated(el);
    await nextFrame();
    expect(el.splitterPos || 0).to.equal(350);
    expect(splitter.classList.contains("is-collapsed-end")).to.be.false;
    expect(getComputedStyle(splitter).cursor).to.equal("ew-resize");
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: el.getBoundingClientRect().right
      })
    );
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(400 - el.splitterSize);
    splitter.dispatchEvent(new PointerEvent("pointerup"));
    await elementUpdated(el);
    expect(splitter.classList.contains("is-collapsed-end")).to.be.true;
    expect(getComputedStyle(splitter).cursor).to.equal("w-resize");
  });
  it("resizes and collapses when pointer moves in [vertical] splitview", async () => {
    let pointerId = -1;
    const splitTotalHeight = 400;
    const el = await fixture(
      html`
                <sp-split-view
                    vertical
                    resizable
                    collapsible
                    primary-min="50"
                    secondary-min="50"
                    style=${`height: ${splitTotalHeight}px; width: 200px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.setPointerCapture = (id) => pointerId = id;
    splitter.releasePointerCapture = (id) => pointerId = id;
    splitter.dispatchEvent(
      new PointerEvent("pointerdown", { pointerId: 1 })
    );
    await elementUpdated(el);
    expect(pointerId).to.equal(1);
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientY: 40
      })
    );
    await elementUpdated(el);
    await nextFrame();
    expect(el.splitterPos || 0).to.equal(50);
    expect(splitter.classList.contains("is-collapsed-start")).to.be.false;
    expect(getComputedStyle(splitter).cursor).to.equal("ns-resize");
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientY: -10
      })
    );
    await elementUpdated(el);
    await nextFrame();
    expect(el.splitterPos || 0).to.equal(0);
    expect(splitter.classList.contains("is-collapsed-start")).to.be.true;
    expect(getComputedStyle(splitter).cursor).to.equal("s-resize");
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientY: splitTotalHeight - 40
      })
    );
    await elementUpdated(el);
    await nextFrame();
    expect(el.splitterPos || 0).to.equal(splitTotalHeight - 50);
    expect(splitter.classList.contains("is-collapsed-end")).to.be.false;
    expect(getComputedStyle(splitter).cursor).to.equal("ns-resize");
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientY: splitTotalHeight + 50
      })
    );
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(
      splitTotalHeight - el.splitterSize
    );
    splitter.dispatchEvent(new PointerEvent("pointerup"));
    await elementUpdated(el);
    expect(splitter.classList.contains("is-collapsed-end")).to.be.true;
    expect(getComputedStyle(splitter).cursor).to.equal("n-resize");
  });
  it("handles focus and keyboard inputs and resizes accordingly for horizontal splitviews [ltr]", async () => {
    const splitTotalWidth = 500;
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    secondary-min="50"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.true;
    const pos = el.splitterPos || 0;
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos - 10);
    splitter.dispatchEvent(arrowRightEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos);
    splitter.dispatchEvent(arrowUpEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos + 10);
    splitter.dispatchEvent(arrowDownEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos);
    splitter.dispatchEvent(pageUpEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos + 50);
    splitter.dispatchEvent(pageDownEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos);
    splitter.dispatchEvent(homeEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(50);
    splitter.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(50);
    splitter.dispatchEvent(endEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(splitTotalWidth - 50);
    splitter.dispatchEvent(arrowRightEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(splitTotalWidth - 50);
    splitter.dispatchEvent(shiftTabEvent());
    await elementUpdated(el);
    const outsideFocused = document.activeElement;
    expect(typeof outsideFocused).not.to.equal(splitter);
  });
  it("handles focus and keyboard inputs and resizes accordingly for horizontal splitviews [rtl]", async () => {
    const splitTotalWidth = 500;
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                    dir="rtl"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.true;
    const pos = el.splitterPos || 0;
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos + 10);
    splitter.dispatchEvent(arrowRightEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos);
    splitter.dispatchEvent(arrowUpEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos + 10);
    splitter.dispatchEvent(arrowDownEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos);
    splitter.dispatchEvent(pageUpEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos + 50);
    splitter.dispatchEvent(pageDownEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos);
    splitter.dispatchEvent(homeEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(0);
    splitter.dispatchEvent(endEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(splitTotalWidth - el.splitterSize);
    splitter.dispatchEvent(shiftTabEvent());
    await elementUpdated(el);
    const outsideFocused = document.activeElement;
    expect(typeof outsideFocused).not.to.equal(splitter);
  });
  it("handles keyboard inputs and resizes accordingly for [vertical] splitviews", async () => {
    const splitTotalHeight = 500;
    const el = await fixture(
      html`
                <sp-split-view
                    vertical
                    resizable
                    style=${`width: 200px; height: ${splitTotalHeight}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.true;
    const pos = el.splitterPos || 0;
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos - 10);
    splitter.dispatchEvent(arrowRightEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos);
    splitter.dispatchEvent(arrowUpEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos - 10);
    splitter.dispatchEvent(arrowDownEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos);
    splitter.dispatchEvent(pageUpEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos - 50);
    splitter.dispatchEvent(pageDownEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos);
    splitter.dispatchEvent(homeEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(0);
    splitter.dispatchEvent(endEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(
      splitTotalHeight - el.splitterSize
    );
    splitter.dispatchEvent(shiftTabEvent());
    await elementUpdated(el);
    const outsideFocused = document.activeElement;
    expect(typeof outsideFocused).not.to.equal(splitter);
  });
  it("handles focus and keyboard inputs and resizes accordingly for collapsible horizontal splitviews", async () => {
    const splitTotalWidth = 500;
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    collapsible
                    primary-min="50"
                    secondary-min="50"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.true;
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.dispatchEvent(homeEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(0);
    splitter.dispatchEvent(endEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(splitTotalWidth - el.splitterSize);
  });
  it("does not resize when not resizable", async () => {
    const el = await fixture(
      html`
                <sp-split-view>
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.false;
    const pos = el.splitterPos || 0;
    const splitter = el.shadowRoot ? el.shadowRoot.querySelector("#splitter") : el;
    splitter.dispatchEvent(new PointerEvent("pointerdown"));
    await elementUpdated(el);
    splitter.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos);
  });
  it("renders no splitter if only one panel is provided", async () => {
    const el = await fixture(
      html`
                <sp-split-view style="width: 400px">
                    <div id="primary" style="width: 200px">First panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.false;
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    expect(splitter).to.be.null;
    const slot = el.shadowRoot.querySelector("slot");
    expect(slot).to.exist;
    expect(slot.assignedElements().length).to.equal(1);
    const elPrim = slot.assignedElements()[0];
    expect(getComputedStyle(elPrim).width).to.equal("200px");
  });
  it("renders only 2 out of 3 panels", async () => {
    const el = await fixture(
      html`
                <sp-split-view>
                    <div>First panel</div>
                    <div>Second panel</div>
                    <div id="testPanel">Third (invisible) panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    const testPanel = el.shadowRoot.querySelector(
      "#testPanel"
    );
    expect(testPanel).to.be.null;
  });
  it("allows a custom label when resizable if specified", async () => {
    const customLabel = "Resizable Split View Custom Label";
    const defaultLabel = "Resize the panels";
    let el = await fixture(
      html`
                <sp-split-view
                    resizable
                    label=${customLabel}
                    primary-min="50"
                    secondary-min="50"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    expect(el.label).to.equal(customLabel);
    let splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    expect(splitter.ariaLabel).to.equal(customLabel);
    el = await fixture(
      html`
                <sp-split-view resizable primary-min="50" secondary-min="50">
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    splitter = el.shadowRoot.querySelector("#splitter");
    expect(splitter.ariaLabel).to.equal(defaultLabel);
  });
  it("keeps the splitter pos when removing and re-adding a panel", async () => {
    var _a, _b;
    let pointerId = -1;
    const el = await fixture(
      html`
                <sp-split-view resizable style="width: 400px">
                    <div id="primary">First panel</div>
                    <div id="secondary">Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.resizable).to.be.true;
    let splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.setPointerCapture = (id) => pointerId = id;
    splitter.releasePointerCapture = (id) => pointerId = id;
    let pos = el.splitterPos || 0;
    expect(pos).to.equal(200);
    splitter.dispatchEvent(
      new PointerEvent("pointerdown", { pointerId: 1 })
    );
    await elementUpdated(el);
    expect(pointerId).to.equal(1);
    pos -= 10;
    splitter.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: pos
      })
    );
    await elementUpdated(el);
    expect(Math.round(el.splitterPos || 0)).to.equal(
      pos - el.getBoundingClientRect().left
    );
    const secPanel = (_a = el.lastElementChild) == null ? void 0 : _a.cloneNode(true);
    expect(secPanel).not.to.be.null;
    (_b = el.lastElementChild) == null ? void 0 : _b.remove();
    await elementUpdated(el);
    let slot = el.shadowRoot.querySelector("slot");
    expect(slot).to.exist;
    expect(slot.assignedElements().length).to.equal(1);
    splitter = el.shadowRoot.querySelector("#splitter");
    expect(splitter).to.be.null;
    if (secPanel) {
      el.appendChild(secPanel);
      await elementUpdated(el);
      expect(Math.round(el.splitterPos || 0)).to.equal(
        pos - el.getBoundingClientRect().left
      );
      slot = el.shadowRoot.querySelector("slot");
      expect(slot).to.exist;
      expect(slot.assignedElements().length).to.equal(2);
      splitter = el.shadowRoot.querySelector(
        "#splitter"
      );
      await expect(splitter).to.be.accessible();
    }
  });
  it("announces when splitterPos moves", async () => {
    const changeSpy = spy();
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    style=${`height: 200px; width: 500px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    el.addEventListener("change", changeSpy);
    await elementUpdated(el);
    expect(el.resizable).to.be.true;
    const pos = el.splitterPos || 0;
    const splitter = el.shadowRoot.querySelector(
      "#splitter"
    );
    splitter.dispatchEvent(arrowLeftEvent());
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(pos - 10);
    expect(changeSpy.callCount).to.equal(1);
  });
  it("resizes when primarySize changes", async () => {
    const el = await fixture(
      html`
                <sp-split-view
                    resizable
                    primary-size="100"
                    style=${`height: 200px; width: 500px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
    );
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(100);
    el.primarySize = "300";
    await elementUpdated(el);
    expect(el.splitterPos || 0).to.equal(300);
  });
});
//# sourceMappingURL=split-view.test.js.map
