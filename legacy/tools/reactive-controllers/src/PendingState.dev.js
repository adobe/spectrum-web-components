"use strict";
import { html } from "lit";
import "@spectrum-web-components/progress-circle/sp-progress-circle.js";
export class PendingStateController {
  /**
   * Creates an instance of PendingStateController.
   * @param host - The host element that this controller is attached to.
   */
  constructor(host) {
    this.cachedAriaLabel = null;
    this.host = host;
    this.host.addController(this);
  }
  /**
   * Renders the pending state UI.
   * @returns A TemplateResult representing the pending state UI.
   */
  renderPendingState() {
    const pendingLabel = this.host.pendingLabel || "Pending";
    return this.host.pending ? html`
                  <sp-progress-circle
                      id="loader"
                      size="s"
                      indeterminate
                      aria-valuetext=${pendingLabel}
                      class="progress-circle"
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
    if (pending && !disabled && currentAriaLabel !== pendingLabel) {
      this.cachedAriaLabel = currentAriaLabel;
      this.host.setAttribute("aria-label", pendingLabel || "Pending");
    } else if (!pending || disabled) {
      if (this.cachedAriaLabel) {
        this.host.setAttribute("aria-label", this.cachedAriaLabel);
      } else if (!pending) {
        this.host.removeAttribute("aria-label");
      }
    }
  }
  hostConnected() {
    if (!this.cachedAriaLabel)
      this.cachedAriaLabel = this.host.getAttribute("aria-label");
    this.updateAriaLabel();
  }
  hostUpdated() {
    this.updateAriaLabel();
  }
}
//# sourceMappingURL=PendingState.dev.js.map
