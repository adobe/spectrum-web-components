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
import { queryAssignedNodes } from "@spectrum-web-components/base/src/decorators.js";
import { FocusVisiblePolyfillMixin } from "@spectrum-web-components/shared/src/focus-visible.js";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";
import { Tag } from "./Tag.dev.js";
import styles from "./tags.css.js";
export class Tags extends FocusVisiblePolyfillMixin(SpectrumElement) {
  constructor() {
    super();
    this.rovingTabindexController = new RovingTabindexController(this, {
      focusInIndex: (elements) => {
        return elements.findIndex((el) => {
          return !el.disabled && el.deletable;
        });
      },
      elements: () => this.tags,
      isFocusableElement: (el) => !el.disabled && el.deletable
    });
    this.handleFocusin = () => {
      this.addEventListener("focusout", this.handleFocusout);
      this.addEventListener("keydown", this.handleKeydown);
    };
    this.handleKeydown = (event) => {
      const { code } = event;
      if (code !== "PageUp" && code !== "PageDown") return;
      const circularIndexedElement = (list, index) => list[(list.length + index) % list.length];
      const tagsSiblings = [
        ...this.getRootNode().querySelectorAll(
          "sp-tags"
        )
      ];
      if (tagsSiblings.length < 2) {
        return;
      }
      event.preventDefault();
      const currentIndex = tagsSiblings.indexOf(this);
      const offset = code === "PageUp" ? -1 : 1;
      let nextTagsIndex = currentIndex + offset;
      let nextTags = circularIndexedElement(tagsSiblings, nextTagsIndex);
      while (!nextTags.tags.length) {
        nextTagsIndex += offset;
        nextTags = circularIndexedElement(tagsSiblings, nextTagsIndex);
      }
      nextTags.focus();
    };
    this.handleFocusout = () => {
      this.removeEventListener("keydown", this.handleKeydown);
      this.removeEventListener("focusout", this.handleFocusout);
    };
    this.addEventListener("focusin", this.handleFocusin);
  }
  static get styles() {
    return [styles];
  }
  get tags() {
    return this.defaultNodes.filter(
      (node) => node instanceof Tag
    );
  }
  focus() {
    this.rovingTabindexController.focus();
  }
  handleSlotchange() {
    this.rovingTabindexController.clearElementCache();
  }
  render() {
    return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
  }
  firstUpdated() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "list");
    }
    if (!this.hasAttribute("aria-label")) {
      this.setAttribute("aria-label", "Tags");
    }
  }
}
__decorateClass([
  queryAssignedNodes()
], Tags.prototype, "defaultNodes", 2);
//# sourceMappingURL=Tags.dev.js.map
