"use strict";
function restoreChildren(placeholderItems, srcElements, cleanupCallbacks = []) {
  for (let index = 0; index < srcElements.length; ++index) {
    const srcElement = srcElements[index];
    const placeholderItem = placeholderItems[index];
    const parentElement = placeholderItem.parentElement || placeholderItem.getRootNode();
    if (cleanupCallbacks[index]) {
      cleanupCallbacks[index](srcElement);
    }
    if (parentElement && parentElement !== placeholderItem) {
      parentElement.replaceChild(srcElement, placeholderItem);
    }
    delete placeholderItems[index];
  }
  return srcElements;
}
export const reparentChildren = (srcElements, destination, {
  position,
  prepareCallback
} = { position: "beforeend" }) => {
  let { length } = srcElements;
  if (length === 0) {
    return () => srcElements;
  }
  let step = 1;
  let index = 0;
  if (position === "afterbegin" || position === "afterend") {
    step = -1;
    index = length - 1;
  }
  const placeholderItems = new Array(length);
  const cleanupCallbacks = new Array(length);
  const placeholderTemplate = document.createComment(
    "placeholder for reparented element"
  );
  do {
    const srcElement = srcElements[index];
    if (prepareCallback) {
      cleanupCallbacks[index] = prepareCallback(srcElement);
    }
    placeholderItems[index] = placeholderTemplate.cloneNode();
    const parentElement = srcElement.parentElement || srcElement.getRootNode();
    if (parentElement && parentElement !== srcElement) {
      parentElement.replaceChild(placeholderItems[index], srcElement);
    }
    destination.insertAdjacentElement(position, srcElement);
    index += step;
  } while (--length > 0);
  return function() {
    return restoreChildren(
      placeholderItems,
      srcElements,
      cleanupCallbacks
    );
  };
};
//# sourceMappingURL=reparent-children.dev.js.map
