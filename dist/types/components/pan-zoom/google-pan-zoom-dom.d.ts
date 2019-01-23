import { LitElement } from '@polymer/lit-element';
export declare class GooglePanZoomDom extends LitElement {
    translateX: number;
    translateY: number;
    scale: number;
    onPan(ev: CustomEvent): void;
    onZoom(ev: CustomEvent): void;
    protected render(): import('lit-html').TemplateResult;
    private readonly contentStyle;
    private readonly transform;
}
