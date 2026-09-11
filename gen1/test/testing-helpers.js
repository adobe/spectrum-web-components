"use strict";
import {
  elementUpdated,
  expect,
  fixture as owcFixture,
  nextFrame
} from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import { spy, stub } from "sinon";
import { html, render } from "@spectrum-web-components/base";
import { isWebKit } from "@spectrum-web-components/shared";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import { sendMouse } from "./plugins/browser.js";
export async function mouseClickOn(target, pointerPosition = "center", options) {
  return await sendMouse({
    type: "click",
    position: [target, pointerPosition],
    options
  });
}
export async function mouseClickAway(target, options) {
  return await mouseClickOn(target, "outside", options);
}
export async function mouseMoveOver(target, pointerPosition = "center", options) {
  return await sendMouse({
    type: "move",
    position: [target, pointerPosition],
    options
  });
}
export async function mouseMoveAway(target, options) {
  return await mouseMoveOver(target, "outside", options);
}
export async function sendTabKey() {
  const tab = isWebKit() ? "Alt+Tab" : "Tab";
  return await sendKeys({ press: tab });
}
export async function sendShiftTabKey() {
  const shiftTab = isWebKit() ? "Alt+Shift+Tab" : "Shift+Tab";
  return await sendKeys({ press: shiftTab });
}
export async function testForLitDevWarnings(fixture2) {
  describe("lit dev mode", () => {
    let consoleWarnStub;
    before(() => {
      consoleWarnStub = stub(console, "warn");
    });
    afterEach(() => {
      consoleWarnStub.resetHistory();
    });
    after(() => {
      consoleWarnStub.restore();
    });
    it("does not emit warnings", async () => {
      var _a;
      const el = await fixture2();
      await elementUpdated(el);
      expect(
        consoleWarnStub.called,
        (_a = consoleWarnStub.getCall(0)) == null ? void 0 : _a.args.join(", ")
      ).to.be.false;
    });
  });
}
export async function testForMemoryLeaks(element) {
  describe("Memory usage", () => {
    it("releases references on disconnect", async function() {
      if (!window.gc || !("measureUserAgentSpecificMemory" in performance)) {
        this.skip();
      }
      this.timeout(1e4);
      const iterations = 50;
      let active = false;
      const el = await fixture(html`
        <div></div>
      `);
      async function toggle(forced = void 0) {
        active = forced != null ? forced : !active;
        render(active ? element : html``, el);
        await nextFrame();
        await nextFrame();
      }
      for (let i = 0; i < 5; i++) {
        await toggle();
      }
      await toggle(false);
      const beforeMB = await usedHeapMB();
      for (let i = 0; i < iterations; i++) {
        await toggle();
      }
      await toggle(false);
      const afterMB = await usedHeapMB();
      expect(
        afterMB.dom - beforeMB.dom,
        `DOM | before: ${beforeMB.dom}, after: ${afterMB.dom}`
      ).to.be.lte(0);
      expect(
        afterMB.js - beforeMB.js,
        `JS | before: ${beforeMB.js}, after: ${afterMB.js}`
      ).to.be.lte(0);
    });
  });
}
export function waitForPredicate(predicateFn, timeout = 250) {
  const initialTime = Date.now();
  return new Promise((resolve, reject) => {
    function testPredicate() {
      if (predicateFn()) {
        resolve(true);
      } else if (Date.now() - initialTime < timeout) {
        requestAnimationFrame(testPredicate);
      } else {
        reject(false);
      }
    }
    testPredicate();
  });
}
export function isVisible(element) {
  return !!element.offsetParent;
}
const keyboardEvent = (code, eventDetails = {}, eventName = "keydown") => {
  return new KeyboardEvent(eventName, {
    ...eventDetails,
    bubbles: true,
    composed: true,
    cancelable: true,
    code,
    key: code
  });
};
export const shiftTabEvent = () => keyboardEvent("Tab", { shiftKey: true });
export const shiftEvent = () => keyboardEvent("Shift", { shiftKey: true });
export const enterEvent = () => keyboardEvent("Enter");
export const escapeEvent = () => keyboardEvent("Escape");
export const arrowRightEvent = () => keyboardEvent("ArrowRight");
export const arrowLeftEvent = () => keyboardEvent("ArrowLeft");
export const arrowUpEvent = () => keyboardEvent("ArrowUp");
export const arrowDownEvent = () => keyboardEvent("ArrowDown");
export const deleteEvent = () => keyboardEvent("Delete");
export const spaceEvent = () => keyboardEvent("Space");
export const backspaceEvent = () => keyboardEvent("Backspace");
export const endEvent = () => keyboardEvent("End");
export const homeEvent = () => keyboardEvent("Home");
export const pageUpEvent = () => keyboardEvent("PageUp");
export const pageDownEvent = () => keyboardEvent("PageDown");
export const tabEvent = () => keyboardEvent("Tab");
export const tEvent = () => keyboardEvent("t");
export const shiftKeyupEvent = () => keyboardEvent("Shift", { shiftKey: true }, "keyup");
export const arrowRightKeyupEvent = () => keyboardEvent("ArrowRight", {}, "keyup");
export const arrowLeftKeyupEvent = () => keyboardEvent("ArrowLeft", {}, "keyup");
export const arrowUpKeyupEvent = () => keyboardEvent("ArrowUp", {}, "keyup");
export const arrowDownKeyupEvent = () => keyboardEvent("ArrowDown", {}, "keyup");
export function ignoreResizeObserverLoopError(before2, after2) {
  let globalErrorHandler = void 0;
  let errorListener;
  before2(function() {
    var _a, _b;
    try {
      (_b = (_a = Mocha == null ? void 0 : Mocha.process) == null ? void 0 : _a.removeListener) == null ? void 0 : _b.call(_a, "uncaughtException");
    } catch (error) {
      console.warn("Failed to remove Mocha uncaught exception handler:", error);
    }
    globalErrorHandler = window.onerror;
    errorListener = (error) => {
      var _a2, _b2;
      const isResizeObserverError = (_b2 = (_a2 = error.message) == null ? void 0 : _a2.match) == null ? void 0 : _b2.call(
        _a2,
        /ResizeObserver.*loop|loop.*ResizeObserver/i
      );
      if (isResizeObserverError) {
        console.warn(
          "Uncaught global error in ignoreResizeObserverLoopError:",
          error.message
        );
        return;
      } else {
        console.warn(
          "There is a non-resize observer loop error",
          error.message
        );
        globalErrorHandler == null ? void 0 : globalErrorHandler(error);
      }
    };
    addEventListener("error", errorListener);
  });
  after2(function() {
    removeEventListener("error", errorListener);
    window.onerror = globalErrorHandler;
  });
}
export async function isOnTopLayer(element) {
  let resolve;
  const found = new Promise((res) => resolve = res);
  const queryEvent = new Event("on-top-layer-event", {
    composed: true,
    bubbles: true
  });
  element.addEventListener(
    queryEvent.type,
    (event) => {
      const closestDialog = [...event.composedPath()].find(
        (el) => {
          var _a, _b;
          return ((_a = el.classList) == null ? void 0 : _a.contains("dialog")) && ((_b = el.part) == null ? void 0 : _b.contains("dialog"));
        }
      );
      if (!closestDialog) {
        resolve(false);
        return;
      }
      let popoverOpen = false;
      try {
        popoverOpen = closestDialog.matches(":popover-open");
      } catch (error) {
        console.warn(
          "Failed to check if popover is open:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
      let open = false;
      try {
        open = closestDialog.matches(":open");
      } catch (error) {
        console.warn(
          "Failed to check if dialog is open:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
      let modal = false;
      try {
        modal = closestDialog.matches(":modal");
      } catch (error) {
        console.warn(
          "Failed to check if dialog is modal:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
      let polyfill = false;
      if (!popoverOpen && !open && !modal) {
        const style = getComputedStyle(closestDialog);
        polyfill = style.getPropertyValue("--sp-overlay-open") === "true" && style.getPropertyValue("position") === "fixed";
      }
      resolve(popoverOpen || open || modal || polyfill);
    },
    { once: true }
  );
  element.dispatchEvent(queryEvent);
  return found;
}
export async function isInteractive(el, pointerPosition = "center") {
  const clickSpy = spy();
  el.addEventListener(
    "click",
    () => {
      clickSpy();
    },
    { once: true }
  );
  await nextFrame();
  await nextFrame();
  await mouseClickOn(el, pointerPosition);
  return clickSpy.callCount === 1;
}
export async function fixture(story, dir = "ltr") {
  const test = await owcFixture(html`
    <sp-theme system="spectrum" scale="medium" color="light">
      ${story}
      <style>
        sp-theme {
          --spectrum-animation-duration-0: 50ms;
          --spectrum-animation-duration-100: 50ms;
          --spectrum-animation-duration-200: 50ms;
          --spectrum-animation-duration-300: 50ms;
          --spectrum-animation-duration-400: 50ms;
          --spectrum-animation-duration-500: 50ms;
          --spectrum-animation-duration-600: 50ms;
          --spectrum-animation-duration-700: 50ms;
          --spectrum-animation-duration-800: 50ms;
          --spectrum-animation-duration-900: 50ms;
          --spectrum-animation-duration-1000: 50ms;
          --spectrum-animation-duration-2000: 50ms;
          --spectrum-animation-duration-4000: 50ms;
          --spectrum-coachmark-animation-indicator-ring-duration: 50ms;
          --swc-test-duration: 1ms;
        }
      </style>
    </sp-theme>
  `);
  document.documentElement.dir = dir;
  return test.children[0];
}
export async function usedHeapMB() {
  var _a, _b, _c;
  const memorySample = performance.measureUserAgentSpecificMemory();
  const result = await memorySample;
  return {
    total: result.bytes,
    js: ((_a = result.breakdown.find((entry) => entry.types.includes("JS"))) == null ? void 0 : _a.bytes) || 0,
    dom: ((_b = result.breakdown.find((entry) => entry.types.includes("DOM"))) == null ? void 0 : _b.bytes) || 0,
    shared: ((_c = result.breakdown.find((entry) => entry.types.includes("Shared"))) == null ? void 0 : _c.bytes) || 0
  };
}
export function detectOS() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];
  if (macosPlatforms.indexOf(platform) !== -1) {
    return "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    return "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    return "Windows";
  } else if (/Android/.test(userAgent)) {
    return "Android";
  } else if (/Linux/.test(platform)) {
    return "Linux";
  }
  return null;
}
//# sourceMappingURL=testing-helpers.js.map
