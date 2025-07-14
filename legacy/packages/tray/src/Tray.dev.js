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
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import "@spectrum-web-components/underlay/sp-underlay.js";
import { firstFocusableIn } from "@spectrum-web-components/shared/src/first-focusable-in.js";
import { MatchMediaController } from "@spectrum-web-components/reactive-controllers/src/MatchMedia.js";
import modalStyles from "@spectrum-web-components/modal/src/modal.css.js";
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
    if (!this.open) return this.animating;
    this.close();
    return true;
  }
  close() {
    this.open = false;
    if (!this.prefersMotion.matches) {
      this.dispatchClosed();
    }
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
                <slot></slot>
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
//# sourceMappingURL=Tray.dev.js.map
