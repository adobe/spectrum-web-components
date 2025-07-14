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
import "@spectrum-web-components/button/sp-button.js";
import { FocusVisiblePolyfillMixin } from "@spectrum-web-components/shared/src/focus-visible.js";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
import { conditionAttributeWithId } from "@spectrum-web-components/base/src/condition-attribute-with-id.js";
import { ResizeController } from "@lit-labs/observers/resize-controller.js";
import alertStyles from "./alert-dialog.css.js";
export const alertDialogVariants = [
  "confirmation",
  "information",
  "warning",
  "error",
  "destructive",
  "secondary"
];
function gatherAppliedIdsFromSlottedChildren(slot, idBase) {
  const assignedElements = slot.assignedElements();
  const ids = [];
  assignedElements.forEach((el) => {
    if (el.id) {
      ids.push(el.id);
    } else {
      const id = idBase + `-${randomID()}`;
      el.id = id;
      ids.push(id);
    }
  });
  return ids;
}
const _AlertDialog = class _AlertDialog extends FocusVisiblePolyfillMixin(SpectrumElement) {
  constructor() {
    super(...arguments);
    this.resizeController = new ResizeController(this, {
      callback: () => {
        this.shouldManageTabOrderForScrolling();
      }
    });
    this._variant = "";
    this.labelledbyId = `sp-dialog-label-${_AlertDialog.instanceCount++}`;
    this.shouldManageTabOrderForScrolling = () => {
      if (!this.contentElement) return;
      const { offsetHeight, scrollHeight } = this.contentElement;
      if (offsetHeight < scrollHeight) {
        this.contentElement.tabIndex = 0;
      } else {
        this.contentElement.removeAttribute("tabindex");
      }
    };
    this.describedbyId = `sp-dialog-description-${_AlertDialog.instanceCount++}`;
  }
  static get styles() {
    return [alertStyles];
  }
  set variant(variant) {
    if (variant === this.variant) {
      return;
    }
    const oldValue = this.variant;
    if (alertDialogVariants.includes(variant)) {
      this.setAttribute("variant", variant);
      this._variant = variant;
    } else {
      this.removeAttribute("variant");
      this._variant = "";
    }
    this.requestUpdate("variant", oldValue);
  }
  get variant() {
    return this._variant;
  }
  renderIcon() {
    switch (this.variant) {
      case "warning":
      case "error":
        return html`
                    <sp-icon-alert class="icon"></sp-icon-alert>
                `;
      default:
        return html``;
    }
  }
  renderHeading() {
    return html`
            <slot name="heading" @slotchange=${this.onHeadingSlotchange}></slot>
        `;
  }
  renderContent() {
    return html`
            <div class="content">
                <slot @slotchange=${this.onContentSlotChange}></slot>
            </div>
        `;
  }
  onHeadingSlotchange({
    target
  }) {
    if (this.conditionLabelledby) {
      this.conditionLabelledby();
      delete this.conditionLabelledby;
    }
    const ids = gatherAppliedIdsFromSlottedChildren(
      target,
      this.labelledbyId
    );
    if (ids.length) {
      this.conditionLabelledby = conditionAttributeWithId(
        this,
        "aria-labelledby",
        ids
      );
    }
  }
  onContentSlotChange({
    target
  }) {
    requestAnimationFrame(() => {
      this.resizeController.unobserve(this.contentElement);
      this.resizeController.observe(this.contentElement);
    });
    if (this.conditionDescribedby) {
      this.conditionDescribedby();
      delete this.conditionDescribedby;
    }
    const ids = gatherAppliedIdsFromSlottedChildren(
      target,
      this.describedbyId
    );
    if (ids.length && ids.length < 4) {
      this.conditionDescribedby = conditionAttributeWithId(
        this,
        "aria-describedby",
        ids
      );
    } else if (!ids.length) {
      const idProvided = !!this.id;
      if (!idProvided) this.id = this.describedbyId;
      const conditionDescribedby = conditionAttributeWithId(
        this,
        "aria-describedby",
        this.id
      );
      this.conditionDescribedby = () => {
        conditionDescribedby();
        if (!idProvided) {
          this.removeAttribute("id");
        }
      };
    }
  }
  renderButtons() {
    return html`
            <sp-button-group class="button-group">
                <slot name="button"></slot>
            </sp-button-group>
        `;
  }
  render() {
    return html`
            <div class="grid">
                <div class="header">
                    ${this.renderHeading()} ${this.renderIcon()}
                </div>
                <sp-divider size="m" class="divider"></sp-divider>
                ${this.renderContent()} ${this.renderButtons()}
            </div>
        `;
  }
};
_AlertDialog.instanceCount = 0;
__decorateClass([
  query(".content")
], _AlertDialog.prototype, "contentElement", 2);
__decorateClass([
  property({ type: String, reflect: true })
], _AlertDialog.prototype, "variant", 1);
export let AlertDialog = _AlertDialog;
//# sourceMappingURL=AlertDialog.dev.js.map
