/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import type {
    Overlay,
    OverlayOpenCloseDetail,
    Placement,
} from '@spectrum-web-components/overlay';

import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';
import { focusableSelector } from '@spectrum-web-components/shared/src/focusable-selectors.js';
import tooltipStyles from './tooltip.css.js';

class TooltipOpenable extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('sp-opened', this.redispatchEvent);
        this.addEventListener('sp-closed', this.redispatchEvent);
    }
    redispatchEvent(event: Event): void {
        event.stopPropagation();
        this.tooltip.dispatchEvent(
            new CustomEvent<OverlayOpenCloseDetail>(event.type, {
                bubbles: event.bubbles,
                composed: event.composed,
                detail: (event as CustomEvent<OverlayOpenCloseDetail>).detail,
            })
        );
    }
    get tooltip(): Tooltip {
        return (this.getRootNode() as ShadowRoot).host as Tooltip;
    }
    static get observedAttributes(): string[] {
        return ['open', 'placement'];
    }
    attributeChangedCallback(
        name: 'open' | 'placement',
        _oldValue: string,
        newValue: 'string'
    ): void {
        switch (name) {
            // API generally sets `open` as a property
            /* c8 ignore next 3 */
            case 'open':
                this.open = newValue !== null;
                break;
            case 'placement':
                this.placement = newValue as Placement;
                break;
        }
    }
    set open(open: boolean) {
        this._open = open;
        const { tooltip } = this;
        /* c8 ignore next 3 */
        if (!tooltip) {
            return;
        }
        tooltip.open = open;
    }
    /* c8 ignore next 3 */
    get open(): boolean {
        return this._open;
    }
    private _open = false;
    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    set placement(placement: Placement) {
        this._placement = placement;
        const { tooltip } = this;
        if (!tooltip) {
            return;
        }
        tooltip.placement = placement;
    }
    /* c8 ignore next 3 */
    get placement(): Placement {
        return this._placement;
    }
    private _placement: Placement = 'top';
    get tipElement(): HTMLElement {
        return this.tooltip.tipElement;
    }
}

if (!customElements.get('sp-tooltip-openable')) {
    customElements.define('sp-tooltip-openable', TooltipOpenable);
}

/**
 * @element sp-tooltip
 *
 * @slot icon - the icon element appearing at the start of the label
 * @slot - the text label of the Tooltip
 */
export class Tooltip extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [tooltipStyles];
    }

    /**
     * A Tooltip that is `delayed` will its Overlay wait until a warm-up period of
     * 1000ms has completed before opening. Once the warmup period has completed, all
     * subsequent Overlays will open immediately. When no Overlays are opened, a
     * cooldown period of 1000ms will begin. Once the cooldown has completed, the next
     * Overlay to be opened will be subject to the warm-up period if provided that option.
     */
    @property({ type: Boolean })
    delayed = false;

    private dependencyManager = new DependencyManagerController(this);

    /**
     * Whether to prevent a self-managed Tooltip from responding to user input.
     */
    @property({ type: Boolean })
    disabled = false;

    /**
     * Automatically bind to the parent element of the assigned `slot` or the parent element of the `sp-tooltip`.
     * Without this, you must provide your own `overlay-trigger`.
     */
    @property({ type: Boolean, attribute: 'self-managed' })
    public selfManaged = false;

    @property({ type: Number })
    public offset = 0;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @query('sp-overlay')
    public overlayElement?: Overlay;

    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    @property({ reflect: true })
    public placement?: Placement;

    @query('#tip')
    public tipElement!: HTMLSpanElement;

    @property({ type: Number })
    public tipPadding?: number;

    /* Ensure that a '' value for `variant` removes the attribute instead of a blank value */
    private _variant = '';

    @property({ type: String })
    public get variant(): string {
        return this._variant;
    }
    public set variant(variant: string) {
        if (variant === this.variant) {
            return;
        }
        if (['info', 'positive', 'negative'].includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
            return;
        }
        this.removeAttribute('variant');
        this._variant = '';
    }

    private handleOpenOverlay = (): void => {
        this.open = true;
    };

    protected handleCloseOverlay = (): void => {
        this.open = false;
    };

    protected forwardTransitionEvent(event: TransitionEvent): void {
        this.dispatchEvent(
            new TransitionEvent(event.type, {
                bubbles: true,
                composed: true,
                propertyName: event.propertyName,
            })
        );
    }

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
    private get triggerElement(): HTMLElement | null {
        // Start from the assigned slot (if tooltip is slotted) or the tooltip itself
        let start: HTMLElement = this.assignedSlot || this;
        let root = start.getRootNode();

        // Check if we've reached the document root without finding a parent
        // This happens when the tooltip is at the top level without a container
        if (root === document) {
            if (window.__swc?.DEBUG) {
                window.__swc.warn(
                    this,
                    `[INITIAL_TRAVERSAL] Self-managed <${this.localName}> is at document root without a parent element. Self-managed tooltips must be nested inside focusable elements like <sp-action-button>, <sp-button>, or elements with tabindex.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/tooltip#self-managed-overlays',
                    {
                        level: 'high',
                    }
                );
            }
            return null;
        }

        // Get the initial candidate trigger element:
        // 1. Direct parent element in the same document/shadow root
        // 2. Shadow host if we're in a shadow root
        // 3. The root itself as fallback
        let triggerElement = (start.parentElement ||
            (root as ShadowRoot).host ||
            root) as HTMLElement;

        // Walk up the composed tree until we find a focusable element
        // The focusableSelector matches interactive elements that can receive focus
        while (!triggerElement?.matches?.(focusableSelector)) {
            // Move to the next level up in the composed tree
            // This handles both regular DOM and shadow DOM traversal
            start =
                triggerElement.assignedSlot || (triggerElement as HTMLElement);
            root = start.getRootNode();

            /* c8 ignore next 13 */
            // Check if we've reached the document root during traversal
            // This happens when no focusable ancestor is found
            if (root === document) {
                if (window.__swc?.DEBUG) {
                    window.__swc.warn(
                        this,
                        `[TRAVERSAL_EXHAUSTED] Self-managed <${this.localName}> could not find a focusable trigger element. All ancestor elements are non-focusable. Ensure the tooltip is nested inside an interactive element like <sp-action-button>, <sp-button>, or add tabindex="0" to a parent element.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/tooltip#self-managed-overlays',
                        {
                            level: 'high',
                        }
                    );
                }
                return null;
            }

            // Continue traversing up to find the next candidate
            triggerElement = (start.parentElement ||
                (root as ShadowRoot).host ||
                /* c8 ignore next 1 */
                root) as HTMLElement;
        }

        return triggerElement;
    }

    override render(): TemplateResult {
        const tooltip = html`
            <sp-tooltip-openable
                id="tooltip"
                placement=${ifDefined(this.placement)}
                @transitionrun=${this.forwardTransitionEvent}
                @transitionend=${this.forwardTransitionEvent}
                @transitioncancel=${this.forwardTransitionEvent}
            >
                <slot name="icon"></slot>
                <span id="label"><slot></slot></span>
                <span id="tip" aria-hidden="true"></span>
            </sp-tooltip-openable>
        `;
        if (this.selfManaged) {
            this.dependencyManager.add('sp-overlay');
            import('@spectrum-web-components/overlay/sp-overlay.js');
            return html`
                <sp-overlay
                    ?open=${this.open &&
                    !this.disabled &&
                    this.dependencyManager.loaded}
                    ?delayed=${this.delayed}
                    ?disabled=${this.disabled}
                    offset=${this.offset}
                    .placement=${this.placement}
                    type="hint"
                    .tipPadding=${this.tipPadding}
                    .triggerInteraction=${'hover'}
                    @sp-opened=${this.handleOpenOverlay}
                    @sp-closed=${this.handleCloseOverlay}
                >
                    ${tooltip}
                </sp-overlay>
            `;
        } else {
            return tooltip;
        }
    }

    public override connectedCallback(): void {
        super.connectedCallback();

        this.updateComplete.then(() => {
            if (!this.selfManaged) {
                return;
            }
            const overlayElement = this.overlayElement;
            if (overlayElement) {
                const triggerElement = this.triggerElement;
                overlayElement.triggerElement = triggerElement;
            }
        });
    }
}
