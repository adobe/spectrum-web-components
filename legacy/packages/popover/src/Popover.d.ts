import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import type { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';
/**
 * @element sp-popover
 *
 * @slot - content to display within the Popover
 */
export declare class Popover extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * Whether the popover is visible or not.
     */
    open: boolean;
    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    placement?: Placement;
    tip: boolean;
    tipElement: HTMLSpanElement;
    protected renderTip(): TemplateResult;
    protected render(): TemplateResult;
}
