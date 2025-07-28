"use strict";
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
          for (const step of payload.steps) {
            step.options = step.options || {};
            step.options.delay = 1;
            if (step.position) {
              await page.mouse[step.type](
                Math.round(step.position[0]),
                Math.round(step.position[1]),
                step.options
              );
            } else {
              await page.mouse[step.type](
                step.options
              );
            }
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
