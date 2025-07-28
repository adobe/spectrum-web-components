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
  nothing
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import { when } from "@spectrum-web-components/base/src/directives.js";
import coachmarkStyles from "./coachmark.css.js";
import chevronStyles from "@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";
import "@spectrum-web-components/icons-ui/icons/sp-icon-chevron200.js";
import { Popover } from "@spectrum-web-components/popover";
import { join } from "@spectrum-web-components/base/src/directives.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { MediaType } from "./CoachmarkItem.dev.js";
import "@spectrum-web-components/asset/sp-asset.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/button-group/sp-button-group.js";
export class Coachmark extends Popover {
  constructor() {
    super(...arguments);
    this.placement = "right";
    this.modifierKeys = [];
    this.hasAsset = false;
    this.renderSecondaryButton = () => {
      return html`
            <sp-button
                treatment="outline"
                variant="secondary"
                @click=${this.handleSecondaryCTA}
            >
                ${this.secondaryCTA}
            </sp-button>
        `;
    };
    this.renderPrimaryButton = () => {
      return html`
            <sp-button
                size="s"
                treatment="outline"
                variant="primary"
                @click=${this.handlePrimaryCTA}
            >
                ${this.primaryCTA}
            </sp-button>
        `;
    };
    this.renderSecondaryButtonMobile = () => {
      return html`
            <sp-button
                variant="secondary"
                treatment="outline"
                icon-only
                aria-label="previous"
                @click=${this.handleSecondaryCTA}
            >
                <sp-icon-chevron200
                    size="s"
                    class="spectrum-UIIcon-ChevronLeft75"
                    slot="icon"
                ></sp-icon-chevron200>
            </sp-button>
        `;
    };
    this.renderPrimaryButtonMobile = () => {
      return html`
            <sp-button
                size="s"
                treatment="outline"
                variant="primary"
                @click=${this.handlePrimaryCTA}
            >
                ${this.primaryCTA}
            </sp-button>
        `;
    };
    // render steps
    this.renderSteps = () => {
      return html`
            <div class="step" role="status">
                <span aria-live="polite">
                    <slot name="step-count">
                        ${this.currentStep} of ${this.totalSteps}
                    </slot>
                </span>
            </div>
        `;
    };
    // render action menu
    this.renderActionMenu = () => {
      return html`
            <div class="action-menu">
                <slot name="actions"></slot>
            </div>
        `;
    };
  }
  static get styles() {
    return [...super.styles, coachmarkStyles, chevronStyles];
  }
  // render video and images
  renderMedia() {
    var _a;
    const isImage = this.mediaType === MediaType.IMAGE;
    if (!isImage) {
      return html`
                <slot name="asset"></slot>
            `;
    }
    return html`
            <sp-asset id="cover-photo">
                <div class="image-wrapper">
                    <img
                        class="image"
                        loading="lazy"
                        slot="cover-photo"
                        src="${ifDefined(this.source)}"
                        alt="${ifDefined((_a = this == null ? void 0 : this.content) == null ? void 0 : _a.imageAlt)}"
                    />
                </div>
            </sp-asset>
        `;
  }
  // method to render modifier
  renderModifier(modifierKey, type = "modifier") {
    return html`
            <span type="${type}" class="keyboard-shortcut">${modifierKey}</span>
        `;
  }
  renderJoiner() {
    return html`
            <span class="plus">&plus;</span>
        `;
  }
  // render heading title and modifier
  renderHeader() {
    var _a, _b, _c, _d;
    const hasModifier = this.modifierKeys && ((_a = this.modifierKeys) == null ? void 0 : _a.length) > 0;
    const hasShortcut = Boolean(this.shortcutKey);
    const hasTitle = Boolean((_b = this.content) == null ? void 0 : _b.title);
    if (!hasTitle && !hasModifier && !hasShortcut) {
      return html`
                <div class="title"><slot name="title"></slot></div>
            `;
    }
    return html`
            ${hasTitle ? html`
                      <div class="title">${(_c = this.content) == null ? void 0 : _c.title}</div>
                  ` : nothing}
            ${hasModifier || hasShortcut ? html`
                      <kbd class="keys spectrum-Body spectrum-Body--sizeS">
                          ${hasModifier ? join(
      (_d = this.modifierKeys) == null ? void 0 : _d.map(
        (k) => this.renderModifier(k)
      ),
      this.renderJoiner()
    ) : nothing}
                          ${hasShortcut && hasModifier ? this.renderJoiner() : nothing}
                          ${hasShortcut ? this.renderModifier(
      this.shortcutKey,
      "shortcut"
    ) : nothing}
                      </kbd>
                  ` : nothing}
        `;
  }
  // render description
  renderContent() {
    var _a, _b;
    const hasDescription = Boolean((_a = this.content) == null ? void 0 : _a.description);
    if (!hasDescription)
      return html`
                <slot name="content"></slot>
            `;
    return html`
            <div>${(_b = this.content) == null ? void 0 : _b.description}</div>
        `;
  }
  // event on primary button
  handlePrimaryCTA() {
    this.dispatchEvent(
      new Event("primary", {
        bubbles: true,
        composed: true
      })
    );
  }
  // event on secondary button
  handleSecondaryCTA() {
    this.dispatchEvent(
      new Event("secondary", {
        bubbles: true,
        composed: true
      })
    );
  }
  renderButtons() {
    return html`
            <sp-button-group class="spectrum-ButtonGroup buttongroup">
                ${when(this.secondaryCTA, this.renderSecondaryButton)}
                ${when(this.primaryCTA, this.renderPrimaryButton)}
            </sp-button-group>
            <sp-button-group
                class="spectrum-ButtonGroup buttongroup-mobile"
                size="s"
            >
                ${when(this.secondaryCTA, this.renderSecondaryButtonMobile)}
                ${when(this.primaryCTA, this.renderPrimaryButtonMobile)}
            </sp-button-group>
        `;
  }
  render() {
    return html`
            ${this.renderMedia()}
            <div class="header">
                <div class="flex-container">${this.renderHeader()}</div>
                <div class="static-item">
                    ${when(
      this.secondaryCTA && this.primaryCTA,
      this.renderActionMenu
    )}
                </div>
            </div>

            <div class="content">${this.renderContent()}</div>
            <div class="footer">
                ${when(
      this.totalSteps && this.totalSteps > 1,
      this.renderSteps
    )}
                ${this.renderButtons()}
            </div>
        `;
  }
}
__decorateClass([
  property({ type: Object })
], Coachmark.prototype, "item", 2);
__decorateClass([
  property({ type: String })
], Coachmark.prototype, "placement", 2);
__decorateClass([
  property({ type: Object, attribute: false })
], Coachmark.prototype, "content", 2);
__decorateClass([
  property({ attribute: "shortcut-key" })
], Coachmark.prototype, "shortcutKey", 2);
__decorateClass([
  property({ type: Array })
], Coachmark.prototype, "modifierKeys", 2);
__decorateClass([
  property({ attribute: "src" })
], Coachmark.prototype, "source", 2);
__decorateClass([
  property({ attribute: "media-type" })
], Coachmark.prototype, "mediaType", 2);
__decorateClass([
  property({ type: Boolean, attribute: "has-asset", reflect: true })
], Coachmark.prototype, "hasAsset", 2);
__decorateClass([
  property()
], Coachmark.prototype, "asset", 2);
__decorateClass([
  property({ type: Number, attribute: "current-step" })
], Coachmark.prototype, "currentStep", 2);
__decorateClass([
  property({ type: Number, attribute: "total-steps" })
], Coachmark.prototype, "totalSteps", 2);
__decorateClass([
  property({ type: String, attribute: "primary-cta" })
], Coachmark.prototype, "primaryCTA", 2);
__decorateClass([
  property({ type: String, attribute: "secondary-cta" })
], Coachmark.prototype, "secondaryCTA", 2);
//# sourceMappingURL=Coachmark.dev.js.map
