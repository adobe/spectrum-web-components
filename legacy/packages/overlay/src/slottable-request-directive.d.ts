import { ElementPart, TemplateResult } from '@spectrum-web-components/base';
import { AsyncDirective } from '@spectrum-web-components/base/src/async-directive.js';
import { SlottableRequestEvent } from './slottable-request-event.js';
export declare class SlottableRequestDirective extends AsyncDirective {
    protected template: () => TemplateResult;
    protected target: HTMLElement;
    private renderBefore;
    protected listenerHost: HTMLElement;
    protected listeners: AbortController;
    render(_template: () => TemplateResult): unknown;
    update(part: ElementPart, [template]: Parameters<this['render']>): void;
    handleSlottableRequest(event: SlottableRequestEvent): void;
    init(): void;
    disconnected(): void;
    reconnected(): void;
}
export declare const slottableRequest: (_template: () => TemplateResult) => import("lit-html/directive.js").DirectiveResult<typeof SlottableRequestDirective>;
