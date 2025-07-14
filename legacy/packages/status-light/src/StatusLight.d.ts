import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
declare const StatusLight_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-status-light
 *
 * @slot - text label of the Status Light
 */
export declare class StatusLight extends StatusLight_base {
    static get styles(): CSSResultArray;
    /**
     * A status light in a disabled state shows that a status exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a status may become available later.
     */
    disabled: boolean;
    /**
     * The visual variant to apply to this status light.
     */
    variant: 'negative' | 'notice' | 'positive' | 'info' | 'neutral' | 'yellow' | 'fuchsia' | 'indigo' | 'seafoam' | 'chartreuse' | 'magenta' | 'celery' | 'purple';
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};
