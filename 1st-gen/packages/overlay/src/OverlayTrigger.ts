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
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import type { Placement } from '@floating-ui/dom';

import type { BeforetoggleOpenEvent } from './events.js';
import type { Overlay } from './Overlay.js';
import type { OverlayTypes } from './overlay-types.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@spectrum-web-components/overlay/sp-overlay.js';

import overlayTriggerStyles from './overlay-trigger.css.js';

export type OverlayContentTypes = 'click' | 'hover' | 'longpress';

// Helper type to create all unique combinations of OverlayContentTypes
type Combinations<T extends string, U extends string = T> = T extends string
    ? T | `${T} ${Combinations<Exclude<U, T>>}`
    : never;

export type TriggeredByType = Combinations<OverlayContentTypes>;

/**
 * @element overlay-trigger
 *
 * A component that manages overlay content triggered by different interactions.
 * Supports click, hover, and longpress triggered overlays with configurable
 * placement and behavior.
 *
 * @slot trigger - The content that will trigger the various overlays
 * @slot hover-content - The content that will be displayed on hover
 * @slot click-content - The content that will be displayed on click
 * @slot longpress-content - The content that will be displayed on longpress
 * @slot longpress-describedby-descriptor - Description for longpress content
 *
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 *
 * @attr {string} placement - The placement of the overlay relative to the trigger
 * @attr {number} offset - The distance between the overlay and the trigger
 * @attr {boolean} disabled - Whether the overlay trigger is disabled
 * @attr {string} receives-focus - How focus should be handled ('true'|'false'|'auto')
 * @attr {string} triggered-by - The type of interaction that will trigger the overlay ('click'|'hover'|'longpress')
 */
export class OverlayTrigger extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [overlayTriggerStyles];
    }

    /**
     * Optional property to optimize performance and prevent race conditions.
     *
     * By explicitly declaring which content types are used (e.g. "click", "longpress hover"),
     * we can avoid:
     * 1. Extra renders from unnecessary slot reparenting
     * 2. Potential infinite render loops during content detection
     * 3. Race conditions during slot assignment
     *
     * By only returning overlay wrappers for explicitly declared content types,
     * we minimize unecessary DOM nodes, operations and ensure a more stable rendering behavior.
     */
    @property({ attribute: 'triggered-by' })
    public triggeredBy?: TriggeredByType;

    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    @property({ reflect: true })
    public placement?: Placement;

    @property()
    public type?: OverlayTypes;

    @property({ type: Number })
    public offset = 6;

    @property({ reflect: true })
    public open?: OverlayContentTypes;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ attribute: 'receives-focus' })
    public receivesFocus: 'true' | 'false' | 'auto' = 'auto';

    @state()
    private clickContent: HTMLElement[] = [];

    private clickPlacement?: Placement;

    @state()
    private longpressContent: HTMLElement[] = [];

    private longpressPlacement?: Placement;

    @state()
    private hoverContent: HTMLElement[] = [];

    private hoverPlacement?: Placement;

    /**
     * Tracks whether hover should be temporarily suppressed after a modal overlay closes.
     * This prevents the hover overlay from immediately opening when focus returns to
     * the trigger after closing a modal overlay.
     */
    @state()
    private hoverSuppressed = false;

    /**
     * Timeout handle for the hover suppression delay.
     * Used to clear pending timeouts when overlays close in quick succession.
     */
    private hoverSuppressionTimeout?: ReturnType<typeof setTimeout>;

    @state()
    private targetContent: HTMLElement[] = [];

    @query('#click-overlay', true)
    clickOverlayElement!: Overlay;

    @query('#longpress-overlay', true)
    longpressOverlayElement!: Overlay;

    @query('#hover-overlay', true)
    hoverOverlayElement!: Overlay;

    private getAssignedElementsFromSlot(slot: HTMLSlotElement): HTMLElement[] {
        return slot.assignedElements({ flatten: true }) as HTMLElement[];
    }

    private handleTriggerContent(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.targetContent = this.getAssignedElementsFromSlot(event.target);
    }

    private handleSlotContent(
        event: Event & { target: HTMLSlotElement }
    ): void {
        switch (event.target.name) {
            case 'click-content':
                this.clickContent = this.getAssignedElementsFromSlot(
                    event.target
                );
                break;
            case 'longpress-content':
                this.longpressContent = this.getAssignedElementsFromSlot(
                    event.target
                );
                break;
            case 'hover-content':
                this.hoverContent = this.getAssignedElementsFromSlot(
                    event.target
                );
                break;
        }
    }

    private handleBeforetoggle(event: BeforetoggleOpenEvent): void {
        const { target } = event;
        let type: OverlayContentTypes;
        if (target === this.clickOverlayElement) {
            type = 'click';
        } else if (target === this.longpressOverlayElement) {
            type = 'longpress';
        } else if (target === this.hoverOverlayElement) {
            type = 'hover';
            /* c8 ignore next 3 */
        } else {
            return;
        }
        if (event.newState === 'open') {
            this.open = type;
        } else if (this.open === type) {
            this.open = undefined;
            // Suppress hover overlay briefly when a modal (click/longpress) overlay closes.
            // This prevents hover from immediately opening when focus returns to the trigger.
            // We must set disabled directly on the element because the template hasn't
            // re-rendered yet when the HoverController tries to open.
            if (type === 'click' || type === 'longpress') {
                this.hoverSuppressed = true;
                if (this.hoverOverlayElement) {
                    this.hoverOverlayElement.disabled = true;
                }
                // Clear any pending timeout to avoid race conditions
                if (this.hoverSuppressionTimeout) {
                    clearTimeout(this.hoverSuppressionTimeout);
                }
                // Use a fixed timeout to re-enable hover after the close transition
                // and focus return have completed. This is more predictable than
                // chaining requestAnimationFrame calls.
                this.hoverSuppressionTimeout = setTimeout(() => {
                    this.hoverSuppressed = false;
                    if (this.hoverOverlayElement) {
                        this.hoverOverlayElement.disabled =
                            this.disabled || !this.hoverContent.length;
                    }
                    this.hoverSuppressionTimeout = undefined;
                }, 100);
            }
        }
    }

    protected override update(changes: PropertyValues): void {
        if (changes.has('clickContent')) {
            this.clickPlacement =
                ((this.clickContent[0]?.getAttribute('placement') ||
                    this.clickContent[0]?.getAttribute(
                        'direction'
                    )) as Placement) || undefined;
        }
        if (changes.has('hoverContent')) {
            this.hoverPlacement =
                ((this.hoverContent[0]?.getAttribute('placement') ||
                    this.hoverContent[0]?.getAttribute(
                        'direction'
                    )) as Placement) || undefined;
        }
        if (changes.has('longpressContent')) {
            this.longpressPlacement =
                ((this.longpressContent[0]?.getAttribute('placement') ||
                    this.longpressContent[0]?.getAttribute(
                        'direction'
                    )) as Placement) || undefined;
        }
        super.update(changes);
    }

    protected renderSlot(name: string): TemplateResult {
        return html`
            <slot name=${name} @slotchange=${this.handleSlotContent}></slot>
        `;
    }

    protected renderClickOverlay(): TemplateResult {
        const slot = this.renderSlot('click-content');
        const clickOverlay = html`
            <sp-overlay
                id="click-overlay"
                ?disabled=${this.disabled || !this.clickContent.length}
                ?open=${this.open === 'click' && !!this.clickContent.length}
                .offset=${this.offset}
                .placement=${this.clickPlacement || this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${'click'}
                .type=${this.type || 'auto'}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
        `;

        // If click interactions are explicitly enabled by customers, always return the overlay
        if (this.triggeredBy?.includes('click')) {
            return clickOverlay;
        }

        if (!this.clickContent.length) {
            return slot;
        } else {
            return clickOverlay;
        }
    }

    protected renderHoverOverlay(): TemplateResult {
        const slot = this.renderSlot('hover-content');
        const hoverOverlay = html`
            <sp-overlay
                id="hover-overlay"
                ?open=${this.open === 'hover' && !!this.hoverContent.length}
                ?disabled=${this.disabled ||
                !this.hoverContent.length ||
                (!!this.open && this.open !== 'hover') ||
                this.hoverSuppressed}
                .offset=${this.offset}
                .placement=${this.hoverPlacement || this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${'hover'}
                .type=${'hint'}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
        `;

        // If hover interactions are explicitly enabled by customers, always return the overlay
        if (this.triggeredBy?.includes('hover')) {
            return hoverOverlay;
        }

        if (!this.hoverContent.length) {
            return slot;
        } else {
            return hoverOverlay;
        }
    }

    protected renderLongpressOverlay(): TemplateResult {
        const slot = this.renderSlot('longpress-content');
        const longpressOverlay = html`
            <sp-overlay
                id="longpress-overlay"
                ?disabled=${this.disabled || !this.longpressContent.length}
                ?open=${this.open === 'longpress' &&
                !!this.longpressContent.length}
                .offset=${this.offset}
                .placement=${this.longpressPlacement || this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${'longpress'}
                .type=${'auto'}
                @beforetoggle=${this.handleBeforetoggle}
                .receivesFocus=${this.receivesFocus}
            >
                ${slot}
            </sp-overlay>
            <slot name="longpress-describedby-descriptor"></slot>
        `;

        // If click interactions are explicitly enabled by customers, always return the overlay
        if (this.triggeredBy?.includes('longpress')) {
            return longpressOverlay;
        }

        if (!this.longpressContent.length) {
            return slot;
        } else {
            return longpressOverlay;
        }
    }

    protected override render(): TemplateResult {
        // Keyboard event availability documented in README.md
        return html`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[
                this.renderClickOverlay(),
                this.renderHoverOverlay(),
                this.renderLongpressOverlay(),
            ]}
        `;
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (window.__swc?.DEBUG && !this.triggeredBy) {
            const issues = [
                'You have not specified the `triggeredBy` property. For optimal performance, consider explicitly declaring which overlay types you plan to use.',
                'Example: triggered-by="click hover"',
                'This helps avoid unnecessary DOM operations and potential race conditions.',
            ];

            window.__swc.warn(
                this,
                'Performance optimization available for <overlay-trigger>:',
                'https://opensource.adobe.com/spectrum-web-components/components/overlay-trigger/#performance-optimization',
                { issues }
            );
        }

        if (this.disabled && changedProperties.has('disabled')) {
            this.open = undefined;
            return;
        }
    }

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        return complete;
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        // Clean up any pending hover suppression timeout
        if (this.hoverSuppressionTimeout) {
            clearTimeout(this.hoverSuppressionTimeout);
            this.hoverSuppressionTimeout = undefined;
        }
    }
}
