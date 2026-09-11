"use strict";
import { executeServerCommand, resetMouse } from "@web/test-runner-commands";
function queueMouseCleanUp() {
  if (mouseCleanupQueued) {
    return;
  }
  try {
    if ("afterEach" in window && "after" in window) {
      mouseCleanupQueued = true;
      afterEach(async function() {
        await resetMouse();
      });
      after(() => {
        mouseCleanupQueued = false;
      });
    }
  } catch (error) {
    console.warn(
      "Failed to queue mouse cleanup:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
}
let mouseCleanupQueued = false;
export async function sendMouse(options) {
  queueMouseCleanUp();
  let steps;
  if (typeof options === "object" && "steps" in options) {
    steps = options.steps;
  } else {
    steps = Array.isArray(options) ? options : [options];
  }
  const processedSteps = steps.map((step) => {
    if (step.position && Array.isArray(step.position) && step.position.length >= 1) {
      const [target, position] = step.position;
      if (target instanceof HTMLElement) {
        return {
          ...step,
          position: [target.getBoundingClientRect(), position || "center"]
        };
      }
    }
    return step;
  });
  return await executeServerCommand("send-pointer", processedSteps);
}
export function grantPermissions(options) {
  return executeServerCommand("grant-permissions", options);
}
//# sourceMappingURL=browser.js.map
