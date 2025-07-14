"use strict";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import { elementUpdated, expect, fixture, nextFrame } from "@open-wc/testing";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";
import "@spectrum-web-components/alert-dialog/sp-alert-dialog.js";
import {
  alertDialogVariants
} from "@spectrum-web-components/alert-dialog";
import {
  confirmation,
  secondary,
  warning
} from "../stories/alert-dialog.stories.js";
describe("AlertDialog", () => {
  it("renders confirmation variant accessible", async () => {
    const el = await fixture(confirmation());
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it("warning variant renders with an alert icon", async () => {
    const el = await fixture(warning());
    await elementUpdated(el);
    const alertIcon = el.shadowRoot.querySelector("sp-icon-alert");
    expect(alertIcon).to.be.not.null;
  });
  it("secondary variant renders with `confirm`, `cancel` and `secondary` buttons", async () => {
    const el = await fixture(secondary());
    await elementUpdated(el);
    const confirmButton = el.querySelector("#confirmButton");
    const cancelButton = el.querySelector("#cancelButton");
    const secondaryButton = el.querySelector("#secondaryButton");
    expect(confirmButton).to.be.not.null;
    expect(cancelButton).to.be.not.null;
    expect(secondaryButton).to.be.not.null;
  });
  it("validates variants", async () => {
    const el = await fixture(
      html`
                <sp-alert-dialog variant="invalid">
                    This Alert Dialog validates variants.
                </sp-alert-dialog>
            `
    );
    await elementUpdated(el);
    expect(el.variant).to.equal("");
    el.variant = alertDialogVariants[0];
    await elementUpdated(el);
    expect(el.variant).to.equal(alertDialogVariants[0]);
    el.variant = alertDialogVariants[0];
    await elementUpdated(el);
    expect(el.variant).to.equal(alertDialogVariants[0]);
  });
  it("does not recycle applied content ids", async () => {
    const el = await fixture(html`
            <sp-alert-dialog>
                <h2 slot="heading">Disclaimer</h2>
                <p>Initial paragraph.</p>
            </sp-alert-dialog>
        `);
    await elementUpdated(el);
    await expect(el).to.be.accessible();
    const paragraph = document.createElement("p");
    paragraph.textContent = "Added paragraph.";
    const target = el.querySelector("p");
    target.insertAdjacentElement("beforebegin", paragraph);
    await nextFrame();
    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
});
//# sourceMappingURL=alert-dialog.test.js.map
