import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
declare const Link_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
};
/**
 * @element sp-link
 */
export declare class Link extends Link_base {
    static get styles(): CSSResultArray;
    anchorElement: HTMLAnchorElement;
    variant: 'secondary' | undefined;
    staticColor?: 'black' | 'white';
    /**
     * Uses quiet styles or not
     */
    quiet: boolean;
    get focusElement(): HTMLElement;
    protected render(): TemplateResult;
}
export {};
