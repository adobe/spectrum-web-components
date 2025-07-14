import { type ElementPart, type TemplateResult } from '@spectrum-web-components/base';
import type { OverlayOptions, TriggerInteraction } from './overlay-types.js';
import { type SlottableRequestEvent } from './slottable-request-event.js';
import { SlottableRequestDirective } from './slottable-request-directive.js';
export type InsertionOptions = {
    el: HTMLElement | (() => HTMLElement);
    where: InsertPosition;
};
export type OverlayTriggerOptions = {
    open?: boolean;
    triggerInteraction: TriggerInteraction;
    overlayOptions: OverlayOptions;
    insertionOptions?: InsertionOptions;
};
export declare class OverlayTriggerDirective extends SlottableRequestDirective {
    private host?;
    private overlay;
    private strategy;
    protected defaultOptions: OverlayTriggerOptions;
    protected options: OverlayOptions;
    protected insertionOptions?: InsertionOptions;
    render(_template: () => TemplateResult, _options?: Partial<OverlayTriggerOptions>): unknown;
    update(part: ElementPart, [template, options]: Parameters<this['render']>): void;
    handleSlottableRequest(event: SlottableRequestEvent): void;
}
export declare const trigger: (_template: () => TemplateResult, _options?: Partial<OverlayTriggerOptions> | undefined) => import("lit-html/directive.js").DirectiveResult<typeof OverlayTriggerDirective>;
