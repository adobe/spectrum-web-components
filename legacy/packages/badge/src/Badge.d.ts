import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
export declare const BADGE_VARIANTS: readonly ["accent", "neutral", "informative", "positive", "negative", "notice", "fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "gray", "red", "orange", "chartreuse", "celery", "green", "cyan", "blue"];
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
export declare const FIXED_VALUES: readonly ["inline-start", "inline-end", "block-start", "block-end"];
export type FixedValues = (typeof FIXED_VALUES)[number];
declare const Badge_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export declare class Badge extends Badge_base {
    static get styles(): CSSResultArray;
    get fixed(): FixedValues | undefined;
    set fixed(fixed: FixedValues | undefined);
    private _fixed?;
    variant: BadgeVariant;
    protected get hasIcon(): boolean;
    protected render(): TemplateResult;
}
export {};
