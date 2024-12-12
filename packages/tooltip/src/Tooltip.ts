/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
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

import tooltipStyles from './tooltip.css.js';
import { focusableSelector } from '@spectrum-web-components/shared/src/focusable-selectors.js';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';

/**
 * The `TooltipOpenable` component is a custom web component that manages the open and close state
 * of a tooltip. It listens for `sp-opened` and `sp-closed` events and redispatches them from the
 * tooltip element. It also manages the `open` and `placement` attributes and properties.
 */
class TooltipOpenable extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('sp-opened', this.redispatchEvent);
        this.addEventListener('sp-closed', this.redispatchEvent);
    }

    /**
     * Redispatches the event from the tooltip element.
     *
     * This method stops the propagation of the original event and redispatches it
     * from the tooltip element with the same type, bubbles, composed, and detail properties.
     */
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

    /**
     * Gets the tooltip element associated with this component.
     */
    get tooltip(): Tooltip {
        return (this.getRootNode() as ShadowRoot).host as Tooltip;
    }

    /**
     * Observed attributes for the component.
     */
    static get observedAttributes(): string[] {
        return ['open', 'placement'];
    }

    /**
     * Callback method called when an observed attribute changes.
     */
    attributeChangedCallback(
        name: 'open' | 'placement',
        _oldValue: string,
        newValue: 'string'
    ): void {
        switch (name) {
            // API generally sets `open` as a property
            case 'open':
                this.open = newValue !== null;
                break;
            case 'placement':
                this.placement = newValue as Placement;
                break;
        }
    }

    /**
     * Sets the open state of the tooltip.
     */
    set open(open: boolean) {
        this._open = open;
        const { tooltip } = this;

        if (!tooltip) {
            return;
        }

        tooltip.open = open;
    }

    /**
     * Gets the open state of the tooltip.
     */
    get open(): boolean {
        return this._open;
    }

    /**
     * Internal property to store the open state of the tooltip.
     */
    private _open = false;

    /**
     * Sets the placement of the tooltip.
     */
    set placement(placement: Placement) {
        this._placement = placement;
        const { tooltip } = this;

        if (!tooltip) {
            return;
        }

        tooltip.placement = placement;
    }

    /**
     * Gets the placement of the tooltip.
     */
    get placement(): Placement {
        return this._placement;
    }

    private _placement: Placement = 'top';

    /**
     * Gets the tip element of the tooltip.
     */
    get tipElement(): HTMLElement {
        return this.tooltip.tipElement;
    }
}

/**
 * Check if the 'sp-tooltip-openable' custom element is not already defined, then define it
 */
if (!customElements.get('sp-tooltip-openable')) {
    customElements.define('sp-tooltip-openable', TooltipOpenable);
}

/**
 * @element sp-tooltip
 *
 * The `Tooltip` component is a custom web component that provides a tooltip element.
 * It includes slots for an icon and text label, and manages its state and interactions.
 * @slot icon - The icon element appearing at the start of the label.
 * @slot - The text label of the Tooltip.
 */
export class Tooltip extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [tooltipStyles];
    }

    /**
     * A Tooltip that is `delayed` will have its Overlay wait until a warm-up period of
     * 1000ms has completed before opening. Once the warmup period has completed, all
     * subsequent Overlays will open immediately. When no Overlays are opened, a
     * cooldown period of 1000ms will begin. Once the cooldown has completed, the next
     * Overlay to be opened will be subject to the warm-up period if provided that option.
     */
    @property({ type: Boolean })
    delayed = false;

    /**
     * Controller to manage dependencies for the component.
     */
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

    /**
     * The offset distance of the tooltip from the trigger element.
     */
    @property({ type: Number })
    public offset = 0;

    /**
     * Indicates whether the tooltip is open.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * Query to select the overlay element within the component.
     * This property is used to access the overlay element that contains the tooltip.
     */
    @query('sp-overlay')
    public overlayElement?: Overlay;

    /**
     * The placement of the tooltip relative to the trigger element.
     *
     * This property is reflected as an attribute, meaning changes to the property
     * will be mirrored in the corresponding HTML attribute.
     */
    @property({ reflect: true })
    public placement?: Placement;

    /**
     * Query to select the tip element within the tooltip.
     * This property is used to access the tip element that contains the tooltip content.
     */
    @query('#tip')
    public tipElement!: HTMLSpanElement;

    /**
     * The padding around the tip of the tooltip.
     */
    @property({ type: Number })
    public tipPadding?: number;

    /**
     * Internal property to store the variant of the tooltip.
     */
    private _variant = '';

    /**
     * Gets the variant of the tooltip.
     */
    @property({ type: String })
    public get variant(): string {
        return this._variant;
    }

    /**
     * Sets the variant of the tooltip.
     * This property ensures that a '' value for `variant` removes the attribute instead of a blank value.
     */
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

    /**
     * Handles the event to open the overlay.
     */
    private handleOpenOverlay = (): void => {
        this.open = true;
    };

    /**
     * Handles the event to close the overlay.
     */
    protected handleCloseOverlay = (): void => {
        this.open = false;
    };

    /**
     * Forwards the transition event.
     * Dispatches a new TransitionEvent with the same type, bubbles, composed, and propertyName properties.
     */
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
     * Resolves and returns the trigger element for the tooltip.
     * The method walks up the composed tree to find a focusable element that can act as the trigger.
     * If no trigger element is found before reaching the document, it returns null.
     */
    private get triggerElement(): HTMLElement | null {
        // Resolve the parent element of the assigned slot (if one exists) or of the Tooltip.
        let start: HTMLElement = this.assignedSlot || this;
        let root = start.getRootNode();

        // Check if the root is the document.
        if (root === document) {
            if (window.__swc.DEBUG) {
                window.__swc.warn(
                    this,
                    `Self managed <${this.localName}> elements walk up the composed tree to acquire a trigger element. No trigger element was found before the document.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/tooltip#self-managed-overlays',
                    {
                        level: 'high',
                    }
                );
            }

            return null;
        }

        // Find the trigger element by walking up the composed tree.
        let triggerElement = (start.parentElement ||
            (root as ShadowRoot).host ||
            root) as HTMLElement;

        // Continue walking up the tree until a focusable element is found.
        while (!triggerElement?.matches?.(focusableSelector)) {
            start =
                triggerElement.assignedSlot || (triggerElement as HTMLElement);
            root = start.getRootNode();

            // Check if the root is the document.
            if (root === document) {
                if (window.__swc.DEBUG) {
                    window.__swc.warn(
                        this,
                        `Self managed <${this.localName}> elements walk up the composed tree to acquire a trigger element. No trigger element was found before the document.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/tooltip#self-managed-overlays',
                        {
                            level: 'high',
                        }
                    );
                }

                return null;
            }

            // Update the trigger element.
            triggerElement = (start.parentElement ||
                (root as ShadowRoot).host ||
                root) as HTMLElement;
        }

        return triggerElement;
    }

    /**
     * Renders the content of the tooltip component.
     * This method returns a template result containing the tooltip content and, if self-managed, an overlay.
     */
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
            // Add 'sp-overlay' to the dependency manager and import the overlay module.
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

    /**
     * Lifecycle method called when the component is connected to the DOM.
     * This method sets up the overlay and trigger elements if the tooltip is self-managed.
     */
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
