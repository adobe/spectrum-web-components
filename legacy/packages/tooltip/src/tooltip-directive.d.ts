import { TemplateResult } from '@spectrum-web-components/base';
import { OverlayTriggerOptions, trigger } from '@spectrum-web-components/overlay/src/overlay-trigger-directive.js';
export declare const tooltip: (tooltipContent: () => TemplateResult, options?: Partial<OverlayTriggerOptions & {
    variant: string;
}>) => ReturnType<typeof trigger>;
