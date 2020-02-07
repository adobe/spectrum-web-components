import { TemplateResult, CSSResultArray } from 'lit-element';
import { Focusable } from '@spectrum-web-components/shared/lib/focusable.js';
declare const ButtonBase_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared/lib/observe-slot-text").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared/lib/observe-slot-text").SlotTextObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared/lib/like-anchor").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared/lib/like-anchor").LikeAnchorInterface;
};
export declare class ButtonBase extends ButtonBase_base {
    static get styles(): CSSResultArray;
    protected iconRight: boolean;
    private get hasIcon();
    private get hasLabel();
    get focusElement(): HTMLElement;
    protected get buttonContent(): TemplateResult[];
    protected render(): TemplateResult;
}
export {};
