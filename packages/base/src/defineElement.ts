export const defineElement = (elementName: string, elementConstructor: CustomElementConstructor, options?: { extends: string; }): void => {
    // check for element existence
    if (customElements.get(elementName)) return;

    // define as custom element
    window.customElements.define(elementName, elementConstructor, options);
};

export default defineElement;
