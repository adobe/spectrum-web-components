import { LitElement } from '@polymer/lit-element';
export declare class CrispPanZoom extends LitElement {
    private cursorDevice;
    constructor();
    onPan(ev: WheelEvent): void;
    onZoom(ev: WheelEvent): void;
    protected render(): import('lit-html').TemplateResult;
    private onMouseWheel;
    private checkCursorDevice;
}
