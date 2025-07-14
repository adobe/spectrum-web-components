interface CustomElementConstructor {
    new (...params: unknown[]): HTMLElement;
}
export declare function defineElement(name: string, constructor: CustomElementConstructor): void;
export {};
