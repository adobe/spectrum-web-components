"use strict";
import {
  elementUpdated,
  fixture,
  nextFrame,
  waitUntil
} from "@open-wc/testing";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/story-decorator/sp-story-decorator.js";
import { emulateMedia, sendKeys } from "@web/test-runner-commands";
import { visualDiff } from "@web/test-runner-visual-regression";
import { render } from "lit";
import { ignoreResizeObserverLoopError } from "../testing-helpers.js";
ignoreResizeObserverLoopError(before, after);
const wrap = () => html`
    <sp-story-decorator
        reduce-motion
        screenshot
        tabindex="0"
    ></sp-story-decorator>
`;
async function testReady(test2, retry = 0) {
  await waitUntil(
    () => test2.ready,
    `Wait for decorator to become ready on try number ${retry + 1}`,
    {
      timeout: 2e4
    }
  );
}
async function ensureComponentStable(root) {
  root.getBoundingClientRect();
  await nextFrame();
  try {
    const animations = root.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.all(
        animations.map(
          (a) => a.finished.catch((error) => {
            console.warn("Animation failed:", error);
            return void 0;
          })
        )
      );
    }
  } catch (error) {
    console.warn("Error while waiting for animations", error);
  }
  await nextFrame();
}
export const test = (tests, name, color, scale, dir) => {
  Object.keys(tests).map((story) => {
    var _a;
    if (story !== "default" && !((_a = tests[story].swc_vrt) == null ? void 0 : _a.skip)) {
      it(story, async () => {
        let test2 = await fixture(wrap());
        await elementUpdated(test2);
        test2.focus();
        await sendKeys({ press: "ArrowUp" });
        await sendKeys({ press: "ArrowDown" });
        const testsDefault = tests.default;
        const args = {
          ...testsDefault.args || {},
          ...tests[story].args || {}
        };
        const decorators = [
          ...tests[story].decorators || [],
          ...testsDefault.decorators || []
        ];
        let decoratedStory = () => html`
                    ${tests[story](args)}
                `;
        const decorate = (story2, decorator) => {
          return () => decorator(story2, { args });
        };
        while (decorators.length) {
          const decorator = decorators.shift();
          decoratedStory = decorate(decoratedStory, decorator);
        }
        render(decoratedStory(), test2);
        await testReady(test2);
        await ensureComponentStable(test2);
        const testName = `${color} - ${scale} - ${dir} - ${name} - ${story}`;
        const allowedRetries = 4;
        let retries = allowedRetries;
        let passed = false;
        while (retries && !passed) {
          retries -= 1;
          const retry = allowedRetries - retries;
          try {
            await visualDiff(test2, testName);
            passed = true;
          } catch (error) {
            if (error.message && error.message.search(
              "There was no baseline image to compare against."
            ) > -1) {
              retries = 0;
              throw error;
            } else {
              test2.remove();
              test2 = await fixture(wrap());
              await elementUpdated(test2);
              render(decoratedStory(), test2);
              await testReady(test2, retry);
              await ensureComponentStable(test2);
              if (!retries) {
                try {
                  await visualDiff(test2, testName);
                } catch (error2) {
                  console.log(
                    `Tried ${allowedRetries - retries} times. ${testName}`
                  );
                  throw error2;
                }
              }
            }
          }
        }
        console.log(
          `Tried ${allowedRetries - retries} times. ${testName}`
        );
      });
    }
  });
};
export const regressVisuals = async (name, stories) => {
  describe(`${name} Visual Regressions`, () => {
    const {
      defaultColor: color,
      defaultScale: scale,
      defaultDirection: dir,
      hcm
    } = window.__swc_hack_knobs__;
    before(async () => {
      var _a, _b;
      if ((_b = (_a = stories.default) == null ? void 0 : _a.swc_vrt) == null ? void 0 : _b.preload) {
        await stories.default.swc_vrt.preload();
      }
      if (hcm) {
        await emulateMedia({
          forcedColors: "active",
          colorScheme: "dark"
        });
      }
    });
    after(async () => {
      if (hcm) {
        await emulateMedia({
          forcedColors: "none",
          colorScheme: "no-preference"
        });
      }
    });
    afterEach(() => {
      const overlays = [
        ...document.querySelectorAll("active-overlay") || []
      ];
      overlays.map((overlay) => overlay.remove());
    });
    if (color && scale && dir) {
      test(stories, name, color, scale, dir);
    } else {
      const colors = ["lightest", "light", "dark", "darkest"];
      const scales = ["medium", "large"];
      const directions = ["ltr", "rtl"];
      colors.forEach((color2) => {
        scales.forEach((scale2) => {
          directions.forEach((dir2) => {
            test(stories, name, color2, scale2, dir2);
          });
        });
      });
    }
  });
};
//# sourceMappingURL=test.js.map
