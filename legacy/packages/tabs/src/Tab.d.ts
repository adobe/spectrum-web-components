import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
declare const Tab_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
};
/**
 * @element sp-tab
 *
 * @slot - text label of the Tab
 * @slot icon - The icon that appears on the left of the label
 */
export declare class Tab extends Tab_base {
    static get styles(): CSSResultArray;
    protected get hasIcon(): boolean;
    protected get hasLabel(): boolean;
    disabled: boolean;
    label: string;
    selected: boolean;
    vertical: boolean;
    value: string;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
}
export {};
