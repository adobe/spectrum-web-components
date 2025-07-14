import { PropertyValues } from '@spectrum-web-components/base';
import { FieldGroup } from '@spectrum-web-components/field-group';
import { Radio } from './Radio.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
declare const RadioGroup_base: typeof FieldGroup;
/**
 * @element sp-radio-group
 *
 * @slot - The `sp-radio` elements to display/manage in the group.
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 *
 * @fires change - An alteration to the value of the element has been committed by the user.
 */
export declare class RadioGroup extends RadioGroup_base {
    name: string;
    defaultNodes: Node[];
    get buttons(): Radio[];
    rovingTabindexController: RovingTabindexController<Radio>;
    focus(): void;
    private _setSelected;
    selected: string;
    protected willUpdate(changes: PropertyValues<this>): void;
    private validateRadios;
    protected handleSlotchange(): void;
}
export {};
