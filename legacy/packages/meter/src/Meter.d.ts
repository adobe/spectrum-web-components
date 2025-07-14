import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/field-label/sp-field-label.js';
export declare const meterVariants: string[];
export type MeterVariants = (typeof meterVariants)[number];
declare const Meter_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-meter
 *
 * @slot - text labeling the Meter
 */
export declare class Meter extends Meter_base {
    static get styles(): CSSResultArray;
    progress: number;
    /**
     * The variant applies specific styling when set to `negative`, `positive`, `notice`
     * `variant` attribute is removed when not matching one of the above.
     *
     * @param {String} variant
     */
    set variant(variant: MeterVariants);
    get variant(): MeterVariants;
    private _variant;
    label: string;
    private slotEl;
    private languageResolver;
    sideLabel: boolean;
    staticColor?: 'white';
    protected render(): TemplateResult;
    protected handleSlotchange(): void;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
}
export {};
