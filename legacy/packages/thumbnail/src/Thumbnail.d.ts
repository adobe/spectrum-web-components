import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
declare const validSizes: string[];
export type ThumbnailSize = (typeof validSizes)[number];
/**
 * @element sp-thumbnail
 *
 * @slot image - image element to present in the Thumbnail
 */
export declare class Thumbnail extends SpectrumElement {
    static get styles(): CSSResultArray;
    background?: string;
    cover: boolean;
    layer: boolean;
    get size(): ThumbnailSize;
    set size(value: ThumbnailSize);
    private _size;
    protected update(changes: PropertyValues): void;
    protected render(): TemplateResult;
}
export {};
