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
  property,
  queryAssignedNodes
} from "@spectrum-web-components/base/src/decorators.js";
import { MutationController } from "@lit-labs/observers/mutation-controller.js";
const assignedNodesList = Symbol("assignedNodes");
export function ObserveSlotText(constructor, slotName, excludedSelectors = []) {
  var _a, _b;
  const notExcluded = (el) => (selector) => {
    return el.matches(selector);
  };
  class SlotTextObservingElement extends (_b = constructor, _a = assignedNodesList, _b) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args) {
      super(args);
      this.slotHasContent = false;
      new MutationController(this, {
        config: {
          characterData: true,
          subtree: true
        },
        callback: (mutationsList) => {
          for (const mutation of mutationsList) {
            if (mutation.type === "characterData") {
              this.manageTextObservedSlot();
              return;
            }
          }
        }
      });
    }
    manageTextObservedSlot() {
      if (!this[assignedNodesList]) return;
      const assignedNodes = [...this[assignedNodesList]].filter(
        (currentNode) => {
          const node = currentNode;
          if (node.tagName) {
            return !excludedSelectors.some(notExcluded(node));
          }
          return node.textContent ? node.textContent.trim() : false;
        }
      );
      this.slotHasContent = assignedNodes.length > 0;
    }
    update(changedProperties) {
      if (!this.hasUpdated) {
        const { childNodes } = this;
        const textNodes = [...childNodes].filter((currentNode) => {
          const node = currentNode;
          if (node.tagName) {
            const excluded = excludedSelectors.some(
              notExcluded(node)
            );
            return !excluded ? (
              // This pass happens at element upgrade and before slot rendering.
              // Confirm it would exisit in a targeted slot if there was one supplied.
              slotName ? node.getAttribute("slot") === slotName : !node.hasAttribute("slot")
            ) : false;
          }
          return node.textContent ? node.textContent.trim() : false;
        });
        this.slotHasContent = textNodes.length > 0;
      }
      super.update(changedProperties);
    }
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this.updateComplete.then(() => {
        this.manageTextObservedSlot();
      });
    }
  }
  __decorateClass([
    property({ type: Boolean, attribute: false })
  ], SlotTextObservingElement.prototype, "slotHasContent", 2);
  __decorateClass([
    queryAssignedNodes({
      slot: slotName,
      flatten: true
    })
  ], SlotTextObservingElement.prototype, _a, 2);
  return SlotTextObservingElement;
}
//# sourceMappingURL=observe-slot-text.dev.js.map
