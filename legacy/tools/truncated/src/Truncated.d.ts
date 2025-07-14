import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import type { Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
/**
 * @element sp-truncated
 */
export declare class Truncated extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     */
    placement: Placement;
    successMessage: string;
    hasCopied: boolean;
    private fullText;
    private overflowing;
    private content;
    private overlayEl?;
    private slottedContent;
    private slottedOverflow;
    get hasCustomOverflow(): boolean;
    private resizeObserver;
    private mutationObserver;
    render(): TemplateResult;
    private renderTooltip;
    protected firstUpdated(_changedProperties: PropertyValues<this>): void;
    protected updated(changedProperties: PropertyValues<this>): void;
    private handleOverflowSlotchange;
    private handleClick;
    private measureOverflow;
    private copyText;
}
