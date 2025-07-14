import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import { ButtonBase } from '@spectrum-web-components/button/src/ButtonBase.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
declare const PickerButton_base: typeof ButtonBase & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-picker-button
 */
export declare class PickerButton extends PickerButton_base {
    static get styles(): CSSResultArray;
    invalid: boolean;
    position: 'left' | 'right';
    protected get hasText(): boolean;
    protected render(): TemplateResult;
}
export {};
