import { CSSResultArray, PropertyValues } from 'lit-element';
import { ButtonBase } from './ButtonBase.js';
export declare class ActionButton extends ButtonBase {
    static get styles(): CSSResultArray;
    holdAffordance: boolean;
    selected: boolean;
    toggles: boolean;
    quiet: boolean;
    constructor();
    private onClick;
    protected updated(changes: PropertyValues): void;
}
