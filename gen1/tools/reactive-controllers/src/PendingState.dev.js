"use strict";
import { html } from "lit";
import "@spectrum-web-components/progress-circle/sp-progress-circle.js";
export class PendingStateController {
  /**
   * Creates an instance of PendingStateController.
   *
   * @param host - The host element that this controller is attached to.
   */
  constructor(host) {
    this.cachedAriaLabel = null;
    this.host = host;
    this.host.addController(this);
  }
  /**
   * Renders the pending state UI.
   *
   * @returns A TemplateResult representing the pending state UI.
   *
   * @todo [SWC-1119, SWC-1255, SWC-459] Confirm the accessibility warning and a11y dom tree are accurate for the pending state in button, combobox, and picker components.
   */
  renderPendingState() {
    return this.host.pending ? html`
          <sp-progress-circle
            id="loader"
            size="s"
            indeterminate
            class="progress-circle"
            role="presentation"
          ></sp-progress-circle>
        ` : html``;
  }
  /**
   * Updates the ARIA label of the host element based on the pending state.
   * Manages Cached Aria Label
   */
  updateAriaLabel() {
    const { pending, disabled, pendingLabel } = this.host;
    const currentAriaLabel = this.host.getAttribute("aria-label");
    function shouldCacheAriaLabel(cached, current, pending2) {
      return !cached && current !== pending2 || cached !== current && current !== pending2;
    }
    if (shouldCacheAriaLabel(this.cachedAriaLabel, currentAriaLabel, pendingLabel)) {
      this.cachedAriaLabel = currentAriaLabel;
    }
    if (pending && !disabled) {
      this.host.setAttribute("aria-label", pendingLabel || "Pending");
    } else {
      if (this.cachedAriaLabel) {
        this.host.setAttribute("aria-label", this.cachedAriaLabel);
      } else {
        this.host.removeAttribute("aria-label");
      }
    }
  }
  hostConnected() {
    if (!this.cachedAriaLabel) {
      this.cachedAriaLabel = this.host.getAttribute("aria-label");
    }
    this.updateAriaLabel();
  }
  hostUpdated() {
    this.updateAriaLabel();
  }
}
//# sourceMappingURL=PendingState.dev.js.map
