import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/color-handle/sp-color-handle.js';
import { ColorTypes } from '@spectrum-web-components/reactive-controllers/src/ColorController.js';
/**
 * @element sp-color-wheel
 * @slot gradient - a custom gradient visually outlining the available color values
 * @fires input - The value of the Color Wheel has changed.
 * @fires change - An alteration to the value of the Color Wheel has been committed by the user.
 */
export declare class ColorWheel extends Focusable {
    static get styles(): CSSResultArray;
    dir: 'ltr' | 'rtl';
    disabled: boolean;
    focused: boolean;
    private handle;
    label: string;
    step: number;
    private languageResolver;
    private colorController;
    get value(): number;
    set value(hue: number);
    get color(): ColorTypes;
    set color(color: ColorTypes);
    private get altered();
    private set altered(value);
    private _altered;
    input: HTMLInputElement;
    get focusElement(): HTMLInputElement;
    private handleKeydown;
    private handleInput;
    private handleChange;
    focus(focusOptions?: FocusOptions): void;
    private forwardFocus;
    private handleFocus;
    private handleBlur;
    private boundingClientRect;
    private _pointerDown;
    private handlePointerdown;
    private handlePointermove;
    private handlePointerup;
    /**
     * Returns the value under the cursor
     * @param: PointerEvent on slider
     * @return: Slider value that correlates to the position under the pointer
     */
    private calculateHandlePosition;
    private handleGradientPointerdown;
    calculateStyleData(): {
        clipPath: string;
        clipPathBorders: string;
        diameter: number;
        handleLocationStyles: string;
    };
    protected render(): TemplateResult;
    protected firstUpdated(changed: PropertyValues): void;
    private observer?;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
