import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { ActionButton } from '@spectrum-web-components/action-button';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
declare const ActionGroup_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-action-group
 * @slot - the sp-action-button elements that make up the group
 *
 * @fires change - Announces that selection state has been changed by user
 */
export declare class ActionGroup extends ActionGroup_base {
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    static get styles(): CSSResultArray;
    set buttons(buttons: ActionButton[]);
    get buttons(): ActionButton[];
    _buttons: ActionButton[];
    protected _buttonSelector: string;
    constructor();
    rovingTabindexController: RovingTabindexController<ActionButton>;
    compact: boolean;
    emphasized: boolean;
    justified: boolean;
    label: string;
    quiet: boolean;
    selects: undefined | 'single' | 'multiple';
    staticColor?: 'white' | 'black';
    vertical: boolean;
    private _selected;
    set selected(selected: string[]);
    get selected(): string[];
    slotElement: HTMLSlotElement;
    private dispatchChange;
    private setSelected;
    focus(options?: FocusOptions): void;
    private deselectSelectedButtons;
    private handleActionButtonChange;
    private handleClick;
    private applySelects;
    private manageSelects;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
    private manageChildren;
    private hasManaged;
    private manageButtons;
}
export {};
