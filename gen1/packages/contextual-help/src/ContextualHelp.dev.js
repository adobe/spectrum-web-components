"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  html,
  render,
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import {
  removeSlottableRequest
} from "@spectrum-web-components/overlay/src/slottable-request-event.js";
import {
  IS_MOBILE,
  MatchMediaController
} from "@spectrum-web-components/reactive-controllers/src/MatchMedia.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-info-outline.js";
import styles from "./contextual-help.css.js";
export const DEFAULT_ARIA_LABELS = {
  help: "Help",
  info: "Information"
};
const _ContextualHelp = class _ContextualHelp extends SpectrumElement {
  constructor() {
    super();
    this.isMobile = new MatchMediaController(this, IS_MOBILE);
    this.variant = "info";
    this.placement = "bottom-start";
    this.offset = 0;
    this.open = false;
    const id = _ContextualHelp.instanceCount++;
    this.popoverId = `contextual-help-popover-${id}`;
    this.contentId = `contextual-help-content-${id}`;
  }
  static get styles() {
    return [styles];
  }
  get buttonAriaLabel() {
    if (this.label) {
      return this.label;
    } else {
      if (this.variant === "help") {
        return DEFAULT_ARIA_LABELS.help;
      }
      return DEFAULT_ARIA_LABELS.info;
    }
  }
  renderOverlayContent() {
    if (this.isMobile.matches) {
      import("@spectrum-web-components/dialog/sp-dialog-base.js");
      import("@spectrum-web-components/dialog/sp-dialog.js");
      return html`
        <sp-dialog-base underlay>
          <sp-dialog dismissable size="s" id=${this.popoverId}>
            <slot name="heading" slot="heading"></slot>
            <slot></slot>
            <slot name="link"></slot>
          </sp-dialog>
        </sp-dialog-base>
      `;
    } else {
      import("@spectrum-web-components/popover/sp-popover.js");
      return html`
        <sp-popover
          class="popover"
          id=${this.popoverId}
          role="region"
          aria-labelledby=${this.contentId}
        >
          <section id=${this.contentId}>
            <div>
              <slot name="heading"></slot>
            </div>
            <div class="body">
              <slot></slot>
            </div>
            <slot name="link"></slot>
          </section>
        </sp-popover>
      `;
    }
  }
  handleSlottableRequest(event) {
    event.stopPropagation();
    if (event.data === removeSlottableRequest) {
      this.open = false;
      render(void 0, event.target);
      return;
    }
    this.open = true;
    const template = this.renderOverlayContent();
    render(template, event.target);
  }
  render() {
    const actualPlacement = this.isMobile.matches ? void 0 : this.placement;
    return html`
      <sp-action-button
        quiet
        size="s"
        id="trigger"
        aria-label=${this.buttonAriaLabel}
        aria-haspopup=${ifDefined(this.isMobile.matches ? "dialog" : void 0)}
        aria-expanded=${this.open ? "true" : "false"}
        aria-controls=${this.popoverId}
        .active=${this.open}
      >
        ${this.variant === "help" ? html`
              <sp-icon-help-outline slot="icon"></sp-icon-help-outline>
            ` : html`
              <sp-icon-info-outline slot="icon"></sp-icon-info-outline>
            `}
      </sp-action-button>
      <sp-overlay
        trigger="trigger@click"
        placement=${ifDefined(actualPlacement)}
        type=${this.isMobile.matches ? "modal" : "auto"}
        receives-focus="true"
        .offset=${this.offset}
        @slottable-request=${this.handleSlottableRequest}
        ?open=${this.open}
      ></sp-overlay>
    `;
  }
};
_ContextualHelp.instanceCount = 0;
__decorateClass([
  property()
], _ContextualHelp.prototype, "label", 2);
__decorateClass([
  property()
], _ContextualHelp.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], _ContextualHelp.prototype, "placement", 2);
__decorateClass([
  property({ type: Number })
], _ContextualHelp.prototype, "offset", 2);
__decorateClass([
  property({ type: Boolean })
], _ContextualHelp.prototype, "open", 2);
export let ContextualHelp = _ContextualHelp;
//# sourceMappingURL=ContextualHelp.dev.js.map
