/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
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
    private _triggerElement;
    /**
     * Explicit trigger element override for self-managed tooltip usage.
     *
     * This is useful when the intended trigger is not an ancestor of the tooltip
     * in the composed tree (for example, tooltips slotted into components that
     * render their interactive trigger internally).
     */
    set triggerElement(triggerElement: HTMLElement | null);
    get triggerElement(): HTMLElement | null;
    private _variant;
    get variant(): string;
    set variant(variant: string);
    private handleOpenOverlay;
    protected handleCloseOverlay: () => void;
    protected forwardTransitionEvent(event: TransitionEvent): void;
    /**
     * Finds the trigger element for a self-managed tooltip by traversing up the composed DOM tree.
     *
     * Self-managed tooltips automatically bind to their first focusable ancestor element.
     * This method walks up through shadow DOM boundaries to find a suitable trigger element.
     *
     * A trigger element must match the focusableSelector, which includes:
     * - Interactive elements like buttons, inputs, links, etc.
     * - Elements with tabindex (except -1)
     * - Elements with focusable="true"
     *
     * Common scenarios where no trigger element is found:
     * 1. Tooltip is placed directly in document body without a focusable parent
     * 2. Tooltip is nested in non-interactive elements (divs, spans) without focusable ancestors
     * 3. All ancestor elements have tabindex="-1" or are otherwise non-focusable
     *
     * Expected usage: <sp-action-button><sp-tooltip self-managed>...</sp-tooltip></sp-action-button>
     *
     * @returns The first focusable ancestor element, or null if none found
     */
    private resolveSelfManagedTriggerElement;
    render(): TemplateResult;
    connectedCallback(): void;
}
