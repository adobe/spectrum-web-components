export default class ElementReparenter {
    private placeholderItems: Comment[];
    private srcElements: Element[];

    constructor(srcElements: Element[], newParent: Element) {
        this.placeholderItems = [];
        this.srcElements = srcElements;

        for (let index = 0; index < srcElements.length; ++index) {
            const placeholderItem: Comment = document.createComment(
                'placeholder for reparented element'
            );
            this.placeholderItems.push(placeholderItem);

            const srcElement = srcElements[index];
            const parentElement =
                srcElement.parentElement || srcElement.getRootNode();
            parentElement.replaceChild(placeholderItem, srcElement);
            newParent.append(srcElement);
        }
    }

    public restore(): void {
        if (this.srcElements.length != this.placeholderItems.length) {
            throw new Error(
                'Unexpected length mismatch attempting to restore parent elements'
            );
        }
        for (let index = 0; index < this.srcElements.length; ++index) {
            const srcElement = this.srcElements[index];
            const placeholderItem = this.placeholderItems[index];
            const parentElement =
                placeholderItem.parentElement || placeholderItem.getRootNode();
            parentElement.replaceChild(srcElement, placeholderItem);
            delete this.placeholderItems[index];
        }
        this.placeholderItems = [];
        this.srcElements = [];
    }
}
