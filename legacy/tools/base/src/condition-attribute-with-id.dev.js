"use strict";
export function conditionAttributeWithoutId(el, attribute, ids) {
  const ariaDescribedby = el.getAttribute(attribute);
  let descriptors = ariaDescribedby ? ariaDescribedby.split(/\s+/) : [];
  descriptors = descriptors.filter(
    (descriptor) => !ids.find((id) => descriptor === id)
  );
  if (descriptors.length) {
    el.setAttribute(attribute, descriptors.join(" "));
  } else {
    el.removeAttribute(attribute);
  }
}
export function conditionAttributeWithId(el, attribute, id) {
  const ids = Array.isArray(id) ? id : [id];
  const ariaDescribedby = el.getAttribute(attribute);
  const descriptors = ariaDescribedby ? ariaDescribedby.split(/\s+/) : [];
  const hadIds = ids.every((id2) => descriptors.indexOf(id2) > -1);
  if (hadIds)
    return () => {
      return;
    };
  descriptors.push(...ids);
  el.setAttribute(attribute, descriptors.join(" "));
  return () => conditionAttributeWithoutId(el, attribute, ids);
}
//# sourceMappingURL=condition-attribute-with-id.dev.js.map
