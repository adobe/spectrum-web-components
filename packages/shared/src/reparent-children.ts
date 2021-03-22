function restoreChildren(
    placeholderItems: Comment[],
    srcElements: Element[],
    cleanupCallbacks: ((el: Element) => void)[] = []
): Element[] {
    for (let index = 0; index < srcElements.length; ++index) {
        const srcElement = srcElements[index];
        const placeholderItem = placeholderItems[index];
        const parentElement =
            placeholderItem.parentElement || placeholderItem.getRootNode();
        if (cleanupCallbacks[index]) {
            cleanupCallbacks[index](srcElement);
        }
        parentElement.replaceChild(srcElement, placeholderItem);
        delete placeholderItems[index];
    }
    return srcElements;
}

export const reparentChildren = (
    srcElements: Element[],
    newParent: Element,
    prepareCallback?: (el: Element) => ((el: Element) => void) | void
): (() => Element[]) => {
    let placeholderItems: Comment[] = [];
    let cleanupCallbacks: ((el: Element) => void)[] = [];

    for (let index = 0; index < srcElements.length; ++index) {
        const placeholderItem: Comment = document.createComment(
            'placeholder for reparented element'
        );
        placeholderItems.push(placeholderItem);

        const srcElement = srcElements[index];
        if (prepareCallback) {
            cleanupCallbacks.push(
                prepareCallback(srcElement) || ((_el: Element) => {})
            );
        }
        const parentElement =
            srcElement.parentElement || srcElement.getRootNode();
        parentElement.replaceChild(placeholderItem, srcElement);
        newParent.append(srcElement);
    }

    return function (): Element[] {
        return restoreChildren(placeholderItems, srcElements, cleanupCallbacks);
    };
};
