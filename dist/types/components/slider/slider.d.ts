import { LitElement } from '@polymer/lit-element';
export declare class SpectrumSlider extends LitElement {
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
    private readonly trackLeftStyle;
    private readonly trackRightStyle;
    private readonly handleStyle;
    private readonly handleClass;
}
