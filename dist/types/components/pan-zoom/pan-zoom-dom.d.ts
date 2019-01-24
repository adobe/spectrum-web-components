import { LitElement } from '@polymer/lit-element';
interface ITransformation {
    translateX: number;
    translateY: number;
    scale: number;
}
export declare class CrispPanZoomDom extends LitElement {
    translateX: number;
    translateY: number;
    scale: number;
    onPan(ev: CustomEvent): void;
    onZoom(ev: CustomEvent): void;
    setTransformation(transform: ITransformation): void;
    pan(x: number, y: number): void;
    zoom(delta: number): void;
    protected render(): import('lit-html').TemplateResult;
    private readonly contentStyle;
    private readonly transform;
    private readonly transformOrigin;
}
export {};
