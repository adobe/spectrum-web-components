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
  nothing,
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { FocusVisiblePolyfillMixin } from "@spectrum-web-components/shared/src/focus-visible.js";
import { ObserveSlotPresence } from "@spectrum-web-components/shared/src/observe-slot-presence.js";
import { LikeAnchor } from "@spectrum-web-components/shared/src/like-anchor.js";
import "@spectrum-web-components/asset/sp-asset.js";
import "@spectrum-web-components/checkbox/sp-checkbox.js";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/divider/sp-divider.js";
import cardStyles from "./card.css.js";
export class Card extends LikeAnchor(
  SizedMixin(
    ObserveSlotPresence(FocusVisiblePolyfillMixin(SpectrumElement), [
      '[slot="cover-photo"]',
      '[slot="preview"]'
    ]),
    {
      validSizes: ["s", "m"],
      noDefaultSize: true
    }
  )
) {
  constructor() {
    super(...arguments);
    this.variant = "standard";
    this._selected = false;
    this.heading = "";
    this.horizontal = false;
    this.focused = false;
    this.toggles = false;
    this.value = "";
    this.subheading = "";
    this.handleFocusin = (event) => {
      this.focused = true;
      const target = event.composedPath()[0];
      if (target !== this) {
        this.removeEventListener("keydown", this.handleKeydown);
        return;
      }
      this.addEventListener("keydown", this.handleKeydown);
    };
  }
  static get styles() {
    return [cardStyles];
  }
  get selected() {
    return this._selected;
  }
  set selected(selected) {
    if (selected === this.selected) return;
    this._selected = selected;
    if (this.role === "row" && this.toggles) {
      this.setAttribute("aria-selected", String(this.selected));
    }
    this.requestUpdate("selected", !this._selected);
  }
  get hasCoverPhoto() {
    return this.getSlotContentPresence('[slot="cover-photo"]');
  }
  get hasPreview() {
    return this.getSlotContentPresence('[slot="preview"]');
  }
  click() {
    var _a;
    (_a = this.likeAnchor) == null ? void 0 : _a.click();
  }
  handleFocusout(event) {
    this.focused = false;
    const target = event.composedPath()[0];
    if (target === this) {
      this.removeEventListener("keydown", this.handleKeydown);
    }
  }
  handleKeydown(event) {
    const { code } = event;
    switch (code) {
      case "Space":
        this.toggleSelected();
        if (this.toggles) {
          event.preventDefault();
          break;
        }
      case "Enter":
      case "NumpadEnter":
        this.click();
    }
  }
  handleSelectedChange(event) {
    event.stopPropagation();
    this.selected = event.target.checked;
    this.announceChange();
  }
  toggleSelected() {
    if (!this.toggles) {
      this.dispatchEvent(
        new Event("click", {
          bubbles: true,
          composed: true
        })
      );
      return;
    }
    this.selected = !this.selected;
    this.announceChange();
  }
  announceChange() {
    const applyDefault = this.dispatchEvent(
      new Event("change", {
        cancelable: true,
        bubbles: true,
        composed: true
      })
    );
    if (!applyDefault) {
      this.selected = !this.selected;
    }
  }
  stopPropagationOnHref(event) {
    if (this.href) {
      event.stopPropagation();
    }
  }
  /**
   * Handles pointer down events on the card element.
   * Implements a click detection system that distinguishes between clicks and drags
   * based on duration and movement distance.
   */
  handlePointerdown(event) {
    const path = event.composedPath();
    const hasAnchor = path.some(
      (el) => el.localName === "a"
    );
    if (hasAnchor) return;
    const startTime = event.timeStamp;
    const startX = event.clientX;
    const startY = event.clientY;
    const handleEnd = (endEvent) => {
      const endTime = endEvent.timeStamp;
      const endX = endEvent.clientX;
      const endY = endEvent.clientY;
      const timeDelta = endTime - startTime;
      const moveX = Math.abs(endX - startX);
      const moveY = Math.abs(endY - startY);
      const moved = moveX > 10 || moveY > 10;
      if (timeDelta < 200 && !moved) {
        this.click();
      }
      this.removeEventListener("pointerup", handleEnd);
      this.removeEventListener("pointercancel", handleEnd);
    };
    this.addEventListener("pointerup", handleEnd);
    this.addEventListener("pointercancel", handleEnd);
  }
  get renderHeading() {
    return html`
            <div class="title" id="heading">
                <slot name="heading">${this.heading}</slot>
            </div>
        `;
  }
  get renderPreviewImage() {
    return html`
            <sp-asset id="preview" variant=${ifDefined(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
            ${this.variant !== "quiet" && !this.horizontal ? html`
                      <sp-divider size="s"></sp-divider>
                  ` : nothing}
        `;
  }
  get renderCoverImage() {
    return html`
            <sp-asset id="cover-photo" variant=${ifDefined(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
            ${this.variant !== "quiet" && !this.horizontal ? html`
                      <sp-divider size="s"></sp-divider>
                  ` : nothing}
        `;
  }
  get images() {
    const images = [];
    if (this.hasPreview) images.push(this.renderPreviewImage);
    if (this.hasCoverPhoto) images.push(this.renderCoverImage);
    return images;
  }
  renderImage() {
    if (this.horizontal) {
      return this.images;
    }
    if (this.variant !== "standard") {
      return [this.renderPreviewImage];
    }
    return this.images;
  }
  get renderSubtitleAndDescription() {
    return html`
            <div class="subtitle">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `;
  }
  render() {
    const roleForWrapper = this.role === "row" ? "gridcell" : void 0;
    return html`
            <div class="wrapper" role=${ifDefined(roleForWrapper)}>
                ${this.renderImage()}
                <div class="body">
                    <div class="header">
                        ${this.renderHeading}
                        ${this.variant === "gallery" ? this.renderSubtitleAndDescription : nothing}
                        ${this.variant !== "quiet" || this.size !== "s" ? html`
                                  <div
                                      class="action-button"
                                      @pointerdown=${this.stopPropagationOnHref}
                                  >
                                      <slot name="actions"></slot>
                                  </div>
                              ` : nothing}
                    </div>
                    ${this.variant !== "gallery" ? html`
                              <div class="content">
                                  ${this.renderSubtitleAndDescription}
                              </div>
                          ` : nothing}
                </div>
                ${this.href ? this.renderAnchor({
      id: "like-anchor",
      labelledby: "heading"
    }) : nothing}
                ${this.variant === "standard" ? html`
                          <slot name="footer"></slot>
                      ` : nothing}
                ${this.toggles ? html`
                          <sp-popover
                              class="checkbox-toggle"
                              @pointerdown=${this.stopPropagationOnHref}
                          >
                              <sp-checkbox
                                  class="checkbox"
                                  @change=${this.handleSelectedChange}
                                  .checked=${this.selected}
                              >
                                  <span class="sr-only">
                                      ${this.label || this.heading}
                                  </span>
                              </sp-checkbox>
                          </sp-popover>
                      ` : nothing}
                ${this.variant === "quiet" && this.size === "s" ? html`
                          <div
                              class="spectrum-QuickActions actions"
                              @pointerdown=${this.stopPropagationOnHref}
                          >
                              <slot name="actions"></slot>
                          </div>
                      ` : nothing}
            </div>
        `;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    if (changes.has("label")) {
      if (this.label) {
        this.setAttribute("aria-label", this.label);
      } else {
        this.removeAttribute("aria-label");
      }
    }
    this.addEventListener("pointerdown", this.handlePointerdown);
    this.addEventListener("focusin", this.handleFocusin);
    this.shadowRoot.addEventListener("focusin", this.handleFocusin);
    this.addEventListener("focusout", this.handleFocusout);
  }
  update(changes) {
    super.update(changes);
    if (changes.has("label")) {
      if (this.label) {
        this.setAttribute("aria-label", this.label);
      } else {
        this.removeAttribute("aria-label");
      }
    }
  }
}
__decorateClass([
  property()
], Card.prototype, "asset", 2);
__decorateClass([
  property({ reflect: true })
], Card.prototype, "variant", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Card.prototype, "selected", 1);
__decorateClass([
  property()
], Card.prototype, "heading", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Card.prototype, "horizontal", 2);
__decorateClass([
  query("#like-anchor")
], Card.prototype, "likeAnchor", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Card.prototype, "focused", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], Card.prototype, "toggles", 2);
__decorateClass([
  property()
], Card.prototype, "value", 2);
__decorateClass([
  property()
], Card.prototype, "subheading", 2);
//# sourceMappingURL=Card.dev.js.map
