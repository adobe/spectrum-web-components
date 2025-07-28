"use strict";
export const getLabelFromSlot = (label, slotEl) => {
  if (label) return null;
  const textContent = slotEl.assignedNodes().reduce((accumulator, node) => {
    if (node.textContent) {
      return accumulator + node.textContent;
    } else {
      return accumulator;
    }
  }, "");
  if (textContent) {
    return textContent.trim();
  } else {
    return null;
  }
};
//# sourceMappingURL=get-label-from-slot.dev.js.map
