"use strict";
export const getDeepElementFromPoint = (x, y) => {
  let target = document.elementFromPoint(x, y);
  while (target == null ? void 0 : target.shadowRoot) {
    const innerTarget = target.shadowRoot.elementFromPoint(x, y);
    if (!innerTarget || innerTarget === target) {
      break;
    }
    target = innerTarget;
  }
  return target;
};
//# sourceMappingURL=get-deep-element-from-point.dev.js.map
