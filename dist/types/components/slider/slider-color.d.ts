import { LitElement } from '@polymer/lit-element';
export declare type ISliderInputEventDetail = number;
export declare class SpectrumSliderColor extends LitElement {
    static is: string;
    type: string;
    value: number;
    label: string;
    max: number;
    min: number;
    step: number;
    disabled: boolean;
    isDragging: boolean;
    onInput(ev: Event): void;
    onChange(ev: Event): void;
    protected render(): import('lit-html').TemplateResult;
    private onMouseDown;
    private onMouseUp;
    private readonly inputElement;
    /**
     * Ratio representing the slider's position on the track
     */
    private readonly trackProgress;
    private readonly handleStyle;
    private readonly handleClass;
}
