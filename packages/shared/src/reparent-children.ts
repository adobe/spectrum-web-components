function restoreChildren(
    placeholderItems: Comment[],
    srcElements: Element[]
): void {
    if (srcElements.length != placeholderItems.length) {
        throw new Error(
            'Unexpected length mismatch attempting to restore parent elements'
        );
    }
    for (let index = 0; index < srcElements.length; ++index) {
        const srcElement = srcElements[index];
        const placeholderItem = placeholderItems[index];
        const parentElement =
            placeholderItem.parentElement || placeholderItem.getRootNode();
        parentElement.replaceChild(srcElement, placeholderItem);
        delete placeholderItems[index];
    }
}

export default function (srcElements: Element[], newParent: Element): Function {
    let placeholderItems: Comment[] = [];

    for (let index = 0; index < srcElements.length; ++index) {
        const placeholderItem: Comment = document.createComment(
            'placeholder for reparented element'
        );
        placeholderItems.push(placeholderItem);

        const srcElement = srcElements[index];
        const parentElement =
            srcElement.parentElement || srcElement.getRootNode();
        parentElement.replaceChild(placeholderItem, srcElement);
        newParent.append(srcElement);
    }

    return function () {
        restoreChildren(placeholderItems, srcElements);
    };
}
