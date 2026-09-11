"use strict";
export function grantPermissionsPlugin() {
  return {
    name: "grant-permissions-command",
    async executeCommand({
      command,
      session,
      payload
    }) {
      if (command === "grant-permissions") {
        if (session.browser.type === "playwright") {
          const page = session.browser.getPage(session.id);
          await page.context().grantPermissions(payload);
          return true;
        }
        throw new Error(
          `Sending mouse commands is not supported for browser type ${session.browser.type}.`
        );
      }
    }
  };
}
//# sourceMappingURL=grant-permissions-plugin.js.map
