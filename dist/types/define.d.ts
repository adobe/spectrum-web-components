export declare type IElementConstructor = new () => HTMLElement;
export declare type IRegisterableElement = IElementConstructor & {
    is: string;
};
/**
 * A helper function for registering custom elements and first checking conditionally if they are already registered.
 *
 * @param classCtor A HTMLElement constructor that has a static 'is' property defining the desired tag name.
 */
export declare function defineCustomElement(
    classCtor: IRegisterableElement
): void;
/**
 * Registers all given class constructors with the custom elements registry, avoiding duplicate registration errors.
 *
 * @param classCtors - Any number of arguments each defining a custom element with an 'is' static property.
 */
export declare function defineCustomElements(
    ...classCtors: IRegisterableElement[]
): void;
