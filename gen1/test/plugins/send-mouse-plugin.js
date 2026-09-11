"use strict";
function getPositionFromRect(rect, position = "center") {
  const points = {
    center: [
      Math.round(rect.left + rect.width / 2),
      Math.round(rect.top + rect.height / 2)
    ],
    "top-left": [Math.round(rect.left + 10), Math.round(rect.top + 2)],
    "top-right": [Math.round(rect.right - 10), Math.round(rect.top + 2)],
    outside: [
      Math.round(rect.left + rect.width / 2),
      Math.round(rect.top + rect.height * 2)
    ]
  };
  return points[position];
}
async function executeStep(step, page) {
  step.options = step.options || {};
  step.options.delay = step.options.delay || 1;
  if (step.position && step.position.length === 1 && typeof step.position[0] === "object") {
    step.position.push("center");
  }
  if (step.position && step.position.length === 2) {
    if (typeof step.position[0] === "number" && typeof step.position[1] === "number") {
      await page.mouse[step.type](
        Math.round(step.position[0]),
        Math.round(step.position[1]),
        step.options
      );
    } else if (typeof step.position[0] === "object" && typeof step.position[1] === "string") {
      const [x, y] = getPositionFromRect(
        step.position[0],
        step.position[1]
      );
      await page.mouse[step.type](x, y, step.options);
    }
  } else {
    await page.mouse[step.type](step.options);
  }
}
export function sendMousePlugin() {
  return {
    name: "send-pointer-command",
    async executeCommand({
      command,
      session,
      payload
    }) {
      if (command === "send-pointer") {
        if (session.browser.type === "playwright") {
          const page = session.browser.getPage(session.id);
          if (Array.isArray(payload) && payload) {
            for (const step of payload) {
              await executeStep(step, page);
            }
          } else {
            await executeStep(payload, page);
          }
          return true;
        }
        throw new Error(
          `Sending mouse commands is not supported for browser type ${session.browser.type}.`
        );
      }
    }
  };
}
//# sourceMappingURL=send-mouse-plugin.js.map
