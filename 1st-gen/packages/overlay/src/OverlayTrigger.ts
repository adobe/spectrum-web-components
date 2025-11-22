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
 * The `<overlay-trigger>` element supports multiple overlay interactions on a single trigger element.
 * Unlike `<sp-overlay>`, this component can show different content for click, hover, and longpress
 * interactions simultaneously.
 *
 * @element overlay-trigger
 *
 * @slot trigger - The interactive element that triggers the overlays (e.g., `<sp-button>`, `<sp-action-button>`). Must be keyboard accessible.
 * @slot hover-content - Content displayed on hover/focus. **Always non-interactive** (uses `hint` type). Best for tooltips and brief informational content.
 * @slot click-content - Content displayed on click. Interactive (uses `type` attribute). Best for menus, dialogs, and interactive popovers.
 * @slot longpress-content - Content displayed on longpress gesture (300ms hold) or Space/Alt+Down keys. Interactive (uses `auto` type). Best for contextual actions.
 * @slot longpress-describedby-descriptor - Automatically managed description text for longpress affordance (e.g., "Double tap and long press for additional options")
 *
 * @fires sp-opened - Announces that an overlay has completed any entry animations and is fully visible
 * @fires sp-closed - Announces that an overlay has completed any exit animations and is fully closed
 *
 * @attr {string} placement - The placement of the overlay relative to the trigger. Same options as `<sp-overlay>`: `"top"`, `"bottom"`, `"left"`, `"right"`, with `-start` and `-end` variants
 * @attr {number} offset - The distance (in pixels) between the overlay and the trigger. Default: `6`
 * @attr {boolean} disabled - Whether the overlay trigger is disabled. When `true`, overlays cannot be opened
 * @attr {string} receives-focus - How focus should be handled when overlay opens. Options: `"true"` (always focus), `"false"` (never focus), `"auto"` (based on overlay type). Only affects `click-content`
 * @attr {string} type - Configures behavior of `click-content` overlay. Options: `"auto"`, `"modal"`, `"manual"`, `"page"`. **Note:** Hover uses `hint`, longpress uses `auto`
 * @attr {string} triggered-by - Performance optimization to declare which interaction types are used. Space-separated list: `"click"`, `"hover"`, `"longpress"`, or combinations like `"click hover"`
 *
 * @example Basic tooltip + dialog combination
 * ```html
 * <overlay-trigger placement="top">
 *   <sp-button slot="trigger">Help</sp-button>
 *
 *   <!-- Tooltip on hover - always non-interactive -->
 *   <sp-tooltip slot="hover-content">
 *     Click for more information
 *   </sp-tooltip>
 *
 *   <!-- Dialog on click - interactive -->
 *   <sp-popover slot="click-content">
 *     <sp-dialog size="s">
 *       <h2 slot="heading">Help</h2>
 *       <p>Detailed help content...</p>
 *     </sp-dialog>
 *   </sp-popover>
 * </overlay-trigger>
 * ```
 *
 * @example All three interactions
 * ```html
 * <overlay-trigger triggered-by="click hover longpress">
 *   <sp-action-button slot="trigger" hold-affordance>
 *     <sp-icon-more slot="icon"></sp-icon-more>
 *   </sp-action-button>
 *
 *   <sp-tooltip slot="hover-content">Quick actions</sp-tooltip>
 *
 *   <sp-popover slot="click-content">
 *     <sp-menu>
 *       <sp-menu-item>Copy</sp-menu-item>
 *       <sp-menu-item>Paste</sp-menu-item>
 *     </sp-menu>
 *   </sp-popover>
 *
 *   <sp-popover slot="longpress-content">
 *     <sp-menu>
 *       <sp-menu-item>Advanced Option 1</sp-menu-item>
 *       <sp-menu-item>Advanced Option 2</sp-menu-item>
 *     </sp-menu>
 *   </sp-popover>
 * </overlay-trigger>
 * ```
 *
 * @example Performance optimization with triggered-by
 * ```html
 * <!-- Only click and hover, skip longpress detection -->
 * <overlay-trigger triggered-by="click hover" placement="bottom">
 *   <sp-button slot="trigger">Actions</sp-button>
 *   <sp-tooltip slot="hover-content">Actions menu</sp-tooltip>
 *   <sp-popover slot="click-content">
 *     <sp-menu>...</sp-menu>
 *   </sp-popover>
 * </overlay-trigger>
 * ```
 *
 * @see {@link https://opensource.adobe.com/spectrum-web-components/components/overlay/overlay-trigger.md | Overlay Trigger Documentation}
 * @see {@link https://opensource.adobe.com/spectrum-web-components/components/overlay/ | Overlay System Overview}
 * @see Use `<sp-overlay>` for single interaction type or advanced features like {@link https://opensource.adobe.com/spectrum-web-components/components/overlay/imperative-api.md#virtualtrigger-patterns | VirtualTrigger}
 */
export class OverlayTrigger extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [overlayTriggerStyles];
    }

    /**
     * Performance optimization that explicitly declares which interaction types are used.
     *
     * **Benefits of declaring `triggered-by`:**
     * 1. **Prevents extra renders** - Avoids unnecessary slot reparenting
     * 2. **Eliminates race conditions** - Prevents infinite render loops during content detection
     * 3. **Reduces DOM nodes** - Only creates overlays for declared content types
     * 4. **Improves initial load** - Skips detection cycles for unused interaction types
     *
     * **When to use:**
     * - Applications with many `<overlay-trigger>` elements (10+)
     * - Performance-critical pages
     * - Mobile applications
     *
     * **Format:** Space-separated list of interaction types
     *
     * @type {string}
     *
     * @example Single interaction (click only)
     * ```html
     * <overlay-trigger triggered-by="click">
     *   <sp-button slot="trigger">Menu</sp-button>
     *   <sp-popover slot="click-content">...</sp-popover>
     * </overlay-trigger>
     * ```
     *
     * @example Multiple interactions (hover + click)
     * ```html
     * <overlay-trigger triggered-by="hover click">
     *   <sp-button slot="trigger">Help</sp-button>
     *   <sp-tooltip slot="hover-content">Click for details</sp-tooltip>
     *   <sp-popover slot="click-content">...</sp-popover>
     * </overlay-trigger>
     * ```
     *
     * @example All interactions
     * ```html
     * <overlay-trigger triggered-by="click hover longpress">
     *   <sp-action-button slot="trigger" hold-affordance>Actions</sp-action-button>
     *   <sp-tooltip slot="hover-content">Actions menu</sp-tooltip>
     *   <sp-popover slot="click-content">...</sp-popover>
     *   <sp-popover slot="longpress-content">...</sp-popover>
     * </overlay-trigger>
     * ```
     *
     * @see {@link https://opensource.adobe.com/spectrum-web-components/components/overlay/PERFORMANCE.md | Performance Optimization Guide}
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
                (!!this.open && this.open !== 'hover')}
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
}
