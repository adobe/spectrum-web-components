/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

export function conditionAttributeWithoutId(
    el: HTMLElement,
    attribute: string,
    ids: string[]
): void {
    const ariaDescribedby = el.getAttribute(attribute);
    let descriptors = ariaDescribedby ? ariaDescribedby.split(/\s+/) : [];
    descriptors = descriptors.filter(
        (descriptor) => !ids.find((id) => descriptor === id)
    );
    if (descriptors.length) {
        el.setAttribute(attribute, descriptors.join(' '));
    } else {
        el.removeAttribute(attribute);
    }
}

export function conditionAttributeWithId(
    el: HTMLElement,
    attribute: string,
    id: string | string[]
): () => void {
    const ids = Array.isArray(id) ? id : [id];
    const ariaDescribedby = el.getAttribute(attribute);
    const descriptors = ariaDescribedby ? ariaDescribedby.split(/\s+/) : [];
    const hadIds = ids.every((id) => descriptors.indexOf(id) > -1);
    if (hadIds)
        /* c8 ignore next 3 */
        return (): void => {
            return;
        };
    descriptors.push(...ids);
    el.setAttribute(attribute, descriptors.join(' '));
    return () => conditionAttributeWithoutId(el, attribute, ids);
}
