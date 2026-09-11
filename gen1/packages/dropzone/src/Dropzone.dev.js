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
const _Dropzone = class _Dropzone extends SpectrumElement {
  constructor() {
    super(...arguments);
    this._dropEffect = "copy";
    this.isDragged = false;
    this.isFilled = false;
    // No runtime warn for `isDragged`/`isFilled` above: both attributes (`dragged`/`filled`)
    // are unchanged and still valid per B2/B3, and Lit's attribute-to-property sync
    // routes through the same reactive property a consumer's own JS assignment would.
    // `isDragged` is also set internally on every drag-over/drag-leave. A `changes.has()`
    // guard in `updated()` can't distinguish any of those from a consumer explicitly
    // writing `element.isDragged = ...`/`element.isFilled = ...`, so a warning there
    // would fire for ordinary, unmigrated attribute/template-binding usage that the
    // migration plan explicitly promises is unaffected. The `@deprecated` JSDoc above
    // still documents the rename for IDE/type tooling.
    this.debouncedDragLeave = null;
  }
  static get styles() {
    return [dropzoneStyles];
  }
  /**
   * Controls the feedback (typically visual) the user is given during a drag and drop operation
   *
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
    if (this.onDragOver !== _Dropzone.prototype.onDragOver || this.onDragLeave !== _Dropzone.prototype.onDragLeave || this.onDrop !== _Dropzone.prototype.onDrop) {
      window.__swc.warn(
        this,
        `<${this.localName}> "onDragOver", "onDragLeave", and "onDrop" are deprecated as public, overridable methods and will become non-public in a future release.`,
        "https://opensource.adobe.com/spectrum-web-components/components/dropzone/",
        { level: "deprecation" }
      );
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("drop", this.onDrop);
    this.removeEventListener("dragover", this.onDragOver);
    this.removeEventListener("dragleave", this.onDragLeave);
    this.clearDebouncedDragLeave();
  }
  /**
   * @deprecated This method will become non-public in a future release. Overriding it is deprecated.
   */
  onDragOver(event) {
    event.preventDefault();
    const shouldAcceptEvent = new CustomEvent(
      "sp-dropzone-should-accept",
      {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: event
      }
    );
    const shouldAccept = this.dispatchEvent(shouldAcceptEvent);
    if (!event.dataTransfer) {
      return;
    }
    if (!shouldAccept) {
      event.dataTransfer.dropEffect = "none";
      return;
    }
    this.clearDebouncedDragLeave();
    if (!this.isDragged) {
      this.isDragged = true;
      if (true) {
        window.__swc.warn(
          this,
          `<${this.localName}> events will be renamed with a "swc-dropzone-" prefix in a future release (for example, "sp-dropzone-should-accept" becomes "swc-dropzone-should-accept").`,
          "https://opensource.adobe.com/spectrum-web-components/components/dropzone/",
          { level: "deprecation" }
        );
      }
    }
    event.dataTransfer.dropEffect = this.dropEffect;
    this.dispatchEvent(
      new CustomEvent("sp-dropzone-dragover", {
        bubbles: true,
        composed: true,
        detail: event
      })
    );
  }
  /**
   * @deprecated This method will become non-public in a future release. Overriding it is deprecated.
   */
  onDragLeave(event) {
    if (event.relatedTarget && this.contains(event.relatedTarget)) {
      return;
    }
    this.clearDebouncedDragLeave();
    this.debouncedDragLeave = window.setTimeout(() => {
      this.isDragged = false;
      this.dispatchEvent(
        new CustomEvent("sp-dropzone-dragleave", {
          bubbles: true,
          composed: true,
          detail: event
        })
      );
    }, 100);
  }
  /**
   * @deprecated This method will become non-public in a future release. Overriding it is deprecated.
   */
  onDrop(event) {
    event.preventDefault();
    if (!this.isDragged) {
      return;
    }
    this.clearDebouncedDragLeave();
    this.isDragged = false;
    this.dispatchEvent(
      new CustomEvent("sp-dropzone-drop", {
        bubbles: true,
        composed: true,
        detail: event
      })
    );
  }
  render() {
    return html`
      <slot></slot>
    `;
  }
  clearDebouncedDragLeave() {
    if (this.debouncedDragLeave !== null) {
      clearTimeout(this.debouncedDragLeave);
      this.debouncedDragLeave = null;
    }
  }
};
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "dragged" })
], _Dropzone.prototype, "isDragged", 2);
__decorateClass([
  property({ type: Boolean, attribute: "filled" })
], _Dropzone.prototype, "isFilled", 2);
export let Dropzone = _Dropzone;
//# sourceMappingURL=Dropzone.dev.js.map
