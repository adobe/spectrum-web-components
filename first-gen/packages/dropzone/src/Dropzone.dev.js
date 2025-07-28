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
import { property } from "@spectrum-web-components/base/src/decorators.js";
import dropzoneStyles from "./dropzone.css.js";
export class Dropzone extends SpectrumElement {
  constructor() {
    super(...arguments);
    this._dropEffect = "copy";
    this.isDragged = false;
    this.isFilled = false;
    this.debouncedDragLeave = null;
  }
  static get styles() {
    return [dropzoneStyles];
  }
  /**
   * Controls the feedback (typically visual) the user is given during a drag and drop operation
   * @attr
   * @type {'copy' | 'move' | 'link' | 'none'}
   */
  get dropEffect() {
    return this._dropEffect;
  }
  set dropEffect(value) {
    if (["copy", "move", "link", "none"].includes(value)) {
      this._dropEffect = value;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("drop", this.onDrop);
    this.addEventListener("dragover", this.onDragOver);
    this.addEventListener("dragleave", this.onDragLeave);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("drop", this.onDrop);
    this.removeEventListener("dragover", this.onDragOver);
    this.removeEventListener("dragleave", this.onDragLeave);
  }
  onDragOver(event) {
    const shouldAcceptEvent = new CustomEvent("sp-dropzone-should-accept", {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: event
    });
    const shouldAccept = this.dispatchEvent(shouldAcceptEvent);
    if (!event.dataTransfer) {
      return;
    }
    if (!shouldAccept) {
      event.dataTransfer.dropEffect = "none";
      return;
    }
    event.preventDefault();
    this.clearDebouncedDragLeave();
    this.isDragged = true;
    event.dataTransfer.dropEffect = this.dropEffect;
    const dragOverEvent = new CustomEvent("sp-dropzone-dragover", {
      bubbles: true,
      composed: true,
      detail: event
    });
    this.dispatchEvent(dragOverEvent);
  }
  onDragLeave(event) {
    this.clearDebouncedDragLeave();
    this.debouncedDragLeave = window.setTimeout(() => {
      this.isDragged = false;
      const dragLeave = new CustomEvent("sp-dropzone-dragleave", {
        bubbles: true,
        composed: true,
        detail: event
      });
      this.dispatchEvent(dragLeave);
    }, 100);
  }
  onDrop(event) {
    event.preventDefault();
    this.clearDebouncedDragLeave();
    this.isDragged = false;
    const dropEvent = new CustomEvent("sp-dropzone-drop", {
      bubbles: true,
      composed: true,
      detail: event
    });
    this.dispatchEvent(dropEvent);
  }
  render() {
    return html`
            <slot></slot>
        `;
  }
  clearDebouncedDragLeave() {
    if (this.debouncedDragLeave) {
      clearTimeout(this.debouncedDragLeave);
      this.debouncedDragLeave = null;
    }
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "dragged" })
], Dropzone.prototype, "isDragged", 2);
__decorateClass([
  property({ type: Boolean, attribute: "filled" })
], Dropzone.prototype, "isFilled", 2);
//# sourceMappingURL=Dropzone.dev.js.map
