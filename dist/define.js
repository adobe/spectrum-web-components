/**
 * A helper function for registering custom elements and first checking conditionally if they are already registered.
 *
 * @param classCtor A HTMLElement constructor that has a static 'is' property defining the desired tag name.
 */
export function defineCustomElement(classCtor) {
    if (!customElements.get(classCtor.is)) {
        customElements.define(classCtor.is, classCtor);
    }
}
/**
 * Registers all given class constructors with the custom elements registry, avoiding duplicate registration errors.
 *
 * @param classCtors - Any number of arguments each defining a custom element with an 'is' static property.
 */
export function defineCustomElements(...classCtors) {
    for (const ctor of classCtors) {
        defineCustomElement(ctor);
    }
}

//# sourceMappingURL=define.js.map
