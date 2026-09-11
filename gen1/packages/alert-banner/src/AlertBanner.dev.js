"use strict";
import {
  html
} from "@spectrum-web-components/base";
import "@spectrum-web-components/button/sp-close-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-info.js";
import styles from "./alert-banner.css.js";
import { AlertBannerBase } from "./AlertBanner.base.dev.js";
export class AlertBanner extends AlertBannerBase {
  static get styles() {
    return [styles];
  }
  renderIcon(variant) {
    switch (variant) {
      case "info":
        return html`
          <sp-icon-info label="Information" class="type"></sp-icon-info>
        `;
      case "negative":
        return html`
          <sp-icon-alert label="Error" class="type"></sp-icon-alert>
        `;
      default:
        return html``;
    }
  }
  render() {
    return html`
      <div class="body" role="alert">
        <div class="content">
          ${this.renderIcon(this.variant)}
          <div class="text"><slot></slot></div>
        </div>
        <slot name="action"></slot>
      </div>
      <div class="end">
        ${this.dismissible ? html`
              <sp-close-button
                @click=${this.shouldClose}
                label="Close"
                static-color="white"
              ></sp-close-button>
            ` : html``}
      </div>
    `;
  }
}
//# sourceMappingURL=AlertBanner.dev.js.map
