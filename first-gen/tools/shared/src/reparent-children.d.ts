export declare const reparentChildren: <T extends Element>(srcElements: T[], destination: Element, { position, prepareCallback, }?: {
    position: InsertPosition;
    prepareCallback?: ((el: T) => void | ((el: T) => void)) | undefined;
}) => () => T[];
