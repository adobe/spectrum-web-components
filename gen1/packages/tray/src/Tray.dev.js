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
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query,
  state
} from "@spectrum-web-components/base/src/decorators.js";
import modalStyles from "@spectrum-web-components/modal/src/modal.css.js";
import { MatchMediaController } from "@spectrum-web-components/reactive-controllers/src/MatchMedia.js";
import { firstFocusableIn } from "@spectrum-web-components/shared/src/first-focusable-in.js";
import "@spectrum-web-components/underlay/sp-underlay.js";
import styles from "./tray.css.js";
export class Tray extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.open = false;
    this.prefersMotion = new MatchMediaController(
      this,
      "(prefers-reduced-motion: no-preference)"
    );
    this.transitionPromise = Promise.resolve();
    this.resolveTransitionPromise = () => {
    };
    this.animating = false;
    this.hasKeyboardDismissButton = false;
    this.needsDismissHelper = true;
  }
  static get styles() {
    return [modalStyles, styles];
  }
  focus() {
    const firstFocusable = firstFocusableIn(this);
    if (firstFocusable) {
      firstFocusable.focus();
    } else if (this.children.length === 1) {
      this.tray.focus();
    } else {
      super.focus();
    }
  }
  overlayWillCloseCallback() {
    if (!this.open) {
      return this.animating;
    }
    this.close();
    return true;
  }
  close() {
    this.open = false;
    if (!this.prefersMotion.matches) {
      this.dispatchClosed();
    }
  }
  /**
   * Returns a visually hidden dismiss button for mobile screen reader accessibility.
   * This button is placed before and after tray content to allow mobile screen reader
   * users (particularly VoiceOver on iOS) to easily dismiss the overlay.
   */
  get dismissHelper() {
    return html`
      <div class="visually-hidden">
        <button aria-label="Dismiss" @click=${this.close}></button>
      </div>
    `;
  }
  /**
   * Check if slotted content has keyboard-accessible dismiss buttons.
   * Looks for buttons in light DOM and checks for known components with built-in dismiss.
   */
  checkForDismissButtons() {
    if (!this.contentSlot) {
      this.needsDismissHelper = true;
      return;
    }
    const slottedElements = this.contentSlot.assignedElements({
      flatten: true
    });
    if (slottedElements.length === 0) {
      this.needsDismissHelper = true;
      return;
    }
    const hasDismissButton = slottedElements.some((element) => {
      if (element.tagName === "SP-BUTTON" || element.tagName === "SP-CLOSE-BUTTON" || element.tagName === "BUTTON") {
        return true;
      }
      if (element.tagName === "SP-DIALOG" && element.hasAttribute("dismissable")) {
        return true;
      }
      if (element.tagName === "SP-DIALOG-WRAPPER" && element.hasAttribute("dismissable")) {
        return true;
      }
      const buttons = element.querySelectorAll(
        "sp-button, sp-close-button, button"
      );
      if (buttons.length > 0) {
        return true;
      }
      return false;
    });
    this.needsDismissHelper = !hasDismissButton;
  }
  handleSlotChange() {
    this.checkForDismissButtons();
  }
  dispatchClosed() {
    this.dispatchEvent(
      new Event("close", {
        bubbles: true
      })
    );
  }
  handleUnderlayTransitionend() {
    if (!this.open) {
      this.resolveTransitionPromise();
      this.dispatchClosed();
    }
  }
  handleTrayTransitionend() {
    if (this.open) {
      this.resolveTransitionPromise();
    }
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.checkForDismissButtons();
  }
  update(changes) {
    if (changes.has("open") && changes.get("open") !== void 0 && this.prefersMotion.matches) {
      this.animating = true;
      this.transitionPromise = new Promise((res) => {
        this.resolveTransitionPromise = () => {
          this.animating = false;
          res();
        };
      });
    }
    super.update(changes);
  }
  render() {
    return html`
      <sp-underlay
        ?open=${this.open}
        @close=${this.close}
        @transitionend=${this.handleUnderlayTransitionend}
      ></sp-underlay>
      <div
        class="tray modal"
        tabindex="-1"
        @transitionend=${this.handleTrayTransitionend}
      >
        ${!this.hasKeyboardDismissButton && this.needsDismissHelper ? this.dismissHelper : nothing}
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${!this.hasKeyboardDismissButton && this.needsDismissHelper ? this.dismissHelper : nothing}
      </div>
    `;
  }
  /**
   * Bind the open/close transition into the update complete lifecycle so
   * that the overlay system can wait for it to be "visibly ready" before
   * attempting to throw focus into the content contained herein. Not
   * waiting for this can cause small amounts of page scroll to happen
   * while opening the Tray when focusable content is included: e.g. Menu
   * elements whose selected Menu Item is not the first Menu Item.
   */
  async getUpdateComplete() {
    const complete = await super.getUpdateComplete();
    await this.transitionPromise;
    return complete;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], Tray.prototype, "open", 2);
__decorateClass([
  query(".tray")
], Tray.prototype, "tray", 2);
__decorateClass([
  query("slot")
], Tray.prototype, "contentSlot", 2);
__decorateClass([
  property({ type: Boolean, attribute: "has-keyboard-dismiss" })
], Tray.prototype, "hasKeyboardDismissButton", 2);
__decorateClass([
  state()
], Tray.prototype, "needsDismissHelper", 2);
//# sourceMappingURL=Tray.dev.js.map
