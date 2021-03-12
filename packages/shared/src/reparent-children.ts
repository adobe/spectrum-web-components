function restoreChildren(
    placeholderItems: Comment[],
    srcElements: Element[],
    slotNames: string[]
): Element[] {
    for (let index = 0; index < srcElements.length; ++index) {
        const srcElement = srcElements[index];
        const placeholderItem = placeholderItems[index];
        const parentElement =
            placeholderItem.parentElement || placeholderItem.getRootNode();
        if (slotNames[index]) {
            srcElement.slot = slotNames[index];
        }
        parentElement.replaceChild(srcElement, placeholderItem);
        delete placeholderItems[index];
    }
    return srcElements;
}

export const reparentChildren = (
    srcElements: Element[],
    newParent: Element
): (() => Element[]) => {
    let placeholderItems: Comment[] = [];
    let slotNames: string[] = [];

    for (let index = 0; index < srcElements.length; ++index) {
        const placeholderItem: Comment = document.createComment(
            'placeholder for reparented element'
        );
        placeholderItems.push(placeholderItem);

        const srcElement = srcElements[index];
        slotNames.push(srcElement.slot);
        srcElement.removeAttribute('slot');
        const parentElement =
            srcElement.parentElement || srcElement.getRootNode();
        parentElement.replaceChild(placeholderItem, srcElement);
        newParent.append(srcElement);
    }

    return function (): Element[] {
        return restoreChildren(placeholderItems, srcElements, slotNames);
    };
};
