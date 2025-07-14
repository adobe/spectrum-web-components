import { ReactiveElement, TemplateResult } from '@spectrum-web-components/base';
type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
type RenderAnchorOptions = {
    id: string;
    className?: string;
    ariaHidden?: boolean;
    anchorContent?: TemplateResult | TemplateResult[];
    labelledby?: string;
    tabindex?: -1 | 0;
};
export interface LikeAnchorInterface {
    download?: string;
    label?: string;
    href?: string;
    rel?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    renderAnchor(options: RenderAnchorOptions): TemplateResult;
}
export declare function LikeAnchor<T extends Constructor<ReactiveElement>>(constructor: T): T & Constructor<LikeAnchorInterface>;
export {};
