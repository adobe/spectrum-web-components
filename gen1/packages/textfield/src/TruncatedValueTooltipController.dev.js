"use strict";
import {
  html,
  nothing
} from "@spectrum-web-components/base";
export const truncatedValueTooltipUpdatedSymbol = Symbol(
  "truncated value tooltip updated"
);
export class TruncatedValueTooltipController {
  constructor(host) {
    this._isTruncated = false;
    this._tooltipDepsLoaded = false;
    this._resizeObserver = null;
    this._observerInitialized = false;
    this.host = host;
    this.host.addController(this);
  }
  get inputElementIsTruncated() {
    const host = this.host;
    if (!host.inputElement || host.multiline || host.type === "password") {
      return false;
    }
    return host.inputElement.scrollWidth > host.inputElement.clientWidth + 1;
  }
  /**
   * Updates truncation state. Returns true if we just transitioned to truncated
   * (so the host can e.g. schedule syncTooltipText after updateComplete).
   */
  refreshTruncationState() {
    const host = this.host;
    const currentlyTruncated = this.inputElementIsTruncated;
    if (host.focused && this._isTruncated && !currentlyTruncated) {
      return false;
    }
    if (currentlyTruncated === this._isTruncated) {
      return false;
    }
    const previous = this._isTruncated;
    this._isTruncated = currentlyTruncated;
    Promise.resolve().then(() => {
      this.host.requestUpdate(truncatedValueTooltipUpdatedSymbol, previous);
    });
    return currentlyTruncated;
  }
  /**
   * Public API for hosts (e.g. NumberField) to force a re-check of truncation state.
   * Call from handleInput() or when value/focused changes so the tooltip visibility stays in sync.
   * Returns true if we just became truncated (host may schedule syncTooltipText after updateComplete).
   */
  refresh() {
    return this.refreshTruncationState();
  }
  async ensureTooltipDeps() {
    if (this._tooltipDepsLoaded) {
      return;
    }
    await Promise.all([
      import("@spectrum-web-components/overlay/sp-overlay.js"),
      import("@spectrum-web-components/tooltip/sp-tooltip.js")
    ]);
    this._tooltipDepsLoaded = true;
    Promise.resolve().then(() => {
      this.host.requestUpdate(truncatedValueTooltipUpdatedSymbol, false);
    });
  }
  /**
   * Returns the tooltip overlay template when truncated; otherwise nothing.
   * The host includes this in its render() (e.g. this.truncatedValueTooltipController.render()).
   */
  render() {
    const host = this.host;
    if (!this._isTruncated || host.disabled || !host.inputElement || host.type === "password") {
      return nothing;
    }
    if (!this._tooltipDepsLoaded) {
      this.ensureTooltipDeps();
      return nothing;
    }
    return html`
      <sp-overlay
        id="truncated-value-tooltip"
        aria-hidden="true"
        .describeTrigger=${"none"}
        .triggerElement=${host.inputElement}
        .triggerInteraction=${"hover"}
        type="hint"
        .placement=${host.truncatedValueTooltipPlacement}
      >
        <sp-tooltip
          aria-hidden="true"
          placement=${host.truncatedValueTooltipPlacement}
        >
          ${host.displayValue}
        </sp-tooltip>
      </sp-overlay>
    `;
  }
  /**
   * Updates the tooltip label text without requestUpdate. Used by NumberField from
   * handleInput() so the tooltip shows the current input value while typing without
   * triggering re-renders that would affect formatting or selection.
   *
   * We mutate an existing text node under `<sp-tooltip>` instead of assigning
   * `tooltip.textContent`. Clearing `textContent` on the host removes all light-DOM
   * children, which ejects Lit's marker nodes for `${host.displayValue}` in
   * `render()` and causes "ChildPart has no parentNode" on the next update.
   *
   * Trade-off: this couples to our own light-DOM shape: `render()` must keep a
   * direct text child of `<sp-tooltip>` (or update this lookup if we wrap the label
   * in an element, e.g. a dedicated `<span id="…">`). This does not depend on
   * `sp-tooltip`'s internal shadow DOM.
   */
  syncTooltipText(text) {
    var _a, _b;
    const tooltip = (_a = this.host.shadowRoot) == null ? void 0 : _a.querySelector(
      "#truncated-value-tooltip sp-tooltip"
    );
    if (!tooltip) {
      return;
    }
    const tooltipTextNode = (_b = Array.from(tooltip.childNodes).find(
      (node) => {
        var _a2;
        return node.nodeType === Node.TEXT_NODE && Boolean(((_a2 = node.textContent) != null ? _a2 : "").trim().length);
      }
    )) != null ? _b : Array.from(tooltip.childNodes).find(
      (node) => node.nodeType === Node.TEXT_NODE
    );
    if (tooltipTextNode) {
      tooltipTextNode.textContent = text;
    }
  }
  hostConnected() {
    if (!this._observerInitialized) {
      this.host.requestUpdate();
    }
  }
  hostUpdated() {
    const host = this.host;
    if (host.multiline || this._observerInitialized) {
      return;
    }
    if (!host.inputElement) {
      return;
    }
    this._observerInitialized = true;
    this._resizeObserver = new ResizeObserver(() => {
      this.refreshTruncationState();
    });
    this._resizeObserver.observe(this.host);
    this._resizeObserver.observe(host.inputElement);
    this.refreshTruncationState();
  }
  hostDisconnected() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    this._observerInitialized = false;
    this._isTruncated = false;
  }
}
//# sourceMappingURL=TruncatedValueTooltipController.dev.js.map
