"use strict";
import { executeServerCommand } from "@web/test-runner-commands";
async function mouseCleanup() {
  await executeServerCommand("send-pointer", {
    steps: [
      {
        type: "move",
        position: [0, 0]
      },
      {
        type: "up"
      }
    ]
  });
}
function queueMouseCleanUp() {
  if (mouseCleanupQueued) return;
  try {
    if ("afterEach" in window && "after" in window) {
      mouseCleanupQueued = true;
      afterEach(async function() {
        await mouseCleanup();
      });
      after(() => {
        mouseCleanupQueued = false;
      });
    }
  } catch (error) {
  }
}
let mouseCleanupQueued = false;
export function sendMouse(options) {
  queueMouseCleanUp();
  return executeServerCommand("send-pointer", options);
}
export function grantPermissions(options) {
  return executeServerCommand("grant-permissions", options);
}
//# sourceMappingURL=browser.js.map
