import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/field-label/sp-field-label.js';
declare const ProgressBar_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-progress-bar
 */
export declare class ProgressBar extends ProgressBar_base {
    static get styles(): CSSResultArray;
    indeterminate: boolean;
    label: string;
    private languageResolver;
    overBackground: boolean;
    sideLabel: boolean;
    progress: number;
    staticColor?: 'white';
    private slotEl;
    protected render(): TemplateResult;
    protected handleSlotchange(): void;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
}
export {};
