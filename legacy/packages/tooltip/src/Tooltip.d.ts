import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import type { Overlay, Placement } from '@spectrum-web-components/overlay';
/**
 * @element sp-tooltip
 *
 * @slot icon - the icon element appearing at the start of the label
 * @slot - the text label of the Tooltip
 */
export declare class Tooltip extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * A Tooltip that is `delayed` will its Overlay wait until a warm-up period of
     * 1000ms has completed before opening. Once the warmup period has completed, all
     * subsequent Overlays will open immediately. When no Overlays are opened, a
     * cooldown period of 1000ms will begin. Once the cooldown has completed, the next
     * Overlay to be opened will be subject to the warm-up period if provided that option.
     */
    delayed: boolean;
    private dependencyManager;
    /**
     * Whether to prevent a self-managed Tooltip from responding to user input.
     */
    disabled: boolean;
    /**
     * Automatically bind to the parent element of the assigned `slot` or the parent element of the `sp-tooltip`.
     * Without this, you must provide your own `overlay-trigger`.
     */
    selfManaged: boolean;
    offset: number;
    open: boolean;
    overlayElement?: Overlay;
    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    placement?: Placement;
    tipElement: HTMLSpanElement;
    tipPadding?: number;
    private _variant;
    get variant(): string;
    set variant(variant: string);
    private handleOpenOverlay;
    protected handleCloseOverlay: () => void;
    protected forwardTransitionEvent(event: TransitionEvent): void;
    private get triggerElement();
    render(): TemplateResult;
    connectedCallback(): void;
}
