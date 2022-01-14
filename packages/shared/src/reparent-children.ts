/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
function restoreChildren<T extends Element>(
    placeholderItems: Comment[],
    srcElements: T[],
    cleanupCallbacks: ((el: T) => void)[] = []
): T[] {
    for (let index = 0; index < srcElements.length; ++index) {
        const srcElement = srcElements[index];
        const placeholderItem = placeholderItems[index];
        const parentElement =
            placeholderItem.parentElement || placeholderItem.getRootNode();
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

export const reparentChildren = <T extends Element>(
    srcElements: T[],
    newParent: Element,
    prepareCallback?: (el: T) => ((el: T) => void) | void
): (() => Element[]) => {
    const placeholderItems: Comment[] = [];
    const cleanupCallbacks: ((el: T) => void)[] = [];

    for (let index = 0; index < srcElements.length; ++index) {
        const srcElement = srcElements[index];
        if (prepareCallback) {
            cleanupCallbacks.push(
                prepareCallback(srcElement) ||
                    (() => {
                        return;
                    })
            );
        }
        const placeholderItem: Comment = document.createComment(
            'placeholder for reparented element'
        );
        placeholderItems.push(placeholderItem);
        const parentElement =
            srcElement.parentElement || srcElement.getRootNode();
        if (parentElement && parentElement !== srcElement) {
            parentElement.replaceChild(placeholderItem, srcElement);
        }
        newParent.append(srcElement);
    }

    return function (): Element[] {
        return restoreChildren<T>(
            placeholderItems,
            srcElements,
            cleanupCallbacks
        );
    };
};
