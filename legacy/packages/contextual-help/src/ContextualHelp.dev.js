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
import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-info-outline.js";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import {
  removeSlottableRequest
} from "@spectrum-web-components/overlay/src/slottable-request-event.js";
import {
  IS_MOBILE,
  MatchMediaController
} from "@spectrum-web-components/reactive-controllers/src/MatchMedia.js";
import styles from "./contextual-help.css.js";
export class ContextualHelp extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.isMobile = new MatchMediaController(this, IS_MOBILE);
    this.variant = "info";
    this.placement = "bottom-start";
    this.offset = 0;
    this.open = false;
  }
  static get styles() {
    return [styles];
  }
  get buttonAriaLabel() {
    if (this.label) {
      return this.label;
    } else {
      if (this.variant === "help") {
        return "Help";
      }
      return "Informations";
    }
  }
  renderOverlayContent() {
    if (this.isMobile.matches) {
      import("@spectrum-web-components/dialog/sp-dialog-base.js");
      import("@spectrum-web-components/dialog/sp-dialog.js");
      return html`
                <sp-dialog-base underlay>
                    <sp-dialog dismissable size="s">
                        <slot name="heading" slot="heading"></slot>
                        <slot></slot>
                        <slot name="link"></slot>
                    </sp-dialog>
                </sp-dialog-base>
            `;
    } else {
      import("@spectrum-web-components/popover/sp-popover.js");
      return html`
                <sp-popover class="popover">
                    <section>
                        <slot name="heading"></slot>
                        <slot></slot>
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
                .active=${this.open}
            >
                ${this.variant === "help" ? html`
                          <sp-icon-help-outline
                              slot="icon"
                          ></sp-icon-help-outline>
                      ` : html`
                          <sp-icon-info-outline
                              slot="icon"
                          ></sp-icon-info-outline>
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
}
__decorateClass([
  property()
], ContextualHelp.prototype, "label", 2);
__decorateClass([
  property()
], ContextualHelp.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], ContextualHelp.prototype, "placement", 2);
__decorateClass([
  property({ type: Number })
], ContextualHelp.prototype, "offset", 2);
__decorateClass([
  property({ type: Boolean })
], ContextualHelp.prototype, "open", 2);
//# sourceMappingURL=ContextualHelp.dev.js.map
