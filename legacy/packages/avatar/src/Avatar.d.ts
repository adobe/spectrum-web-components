import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
export type AvatarSize = 50 | 75 | 100 | 200 | 300 | 400 | 500 | 600 | 700;
declare const Avatar_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
};
/**
 * @element sp-avatar
 */
export declare class Avatar extends Avatar_base {
    static get styles(): CSSResultArray;
    anchorElement: HTMLAnchorElement;
    get focusElement(): HTMLElement;
    src: string;
    get size(): AvatarSize;
    set size(value: AvatarSize);
    private _size;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
}
export {};
