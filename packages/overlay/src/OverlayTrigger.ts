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
    html,
    LitElement,
    property,
    CSSResultArray,
    TemplateResult,
    PropertyValues,
} from '@spectrum-web-components/base';
import type { LongpressEvent } from '@spectrum-web-components/action-button';

import {
    Placement,
    TriggerInteractions,
    OverlayOptions,
} from './overlay-types';
import { openOverlay } from './loader.js';
import overlayTriggerStyles from './overlay-trigger.css.js';

export type OverlayContentTypes = 'click' | 'hover' | 'longpress';

/**
 * A overlay trigger component for displaying overlays relative to other content.
 * @element overlay-trigger
 *
 * @slot trigger - The content that will trigger the various overlays
 * @slot hover-content - The content that will be displayed on hover
 * @slot click-content - The content that will be displayed on click
 * @slot longpress-content - The content that will be displayed on click
 *
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
export class OverlayTrigger extends LitElement {
    private closeClickOverlay?: () => void;
    private closeLongpressOverlay?: () => void;
    private closeHoverOverlay?: () => void;

    public static get styles(): CSSResultArray {
        return [overlayTriggerStyles];
    }

    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
     * @attr
     */
    @property({ reflect: true })
    public placement: Placement = 'bottom';

    @property()
    public type?: Extract<TriggerInteractions, 'inline' | 'modal' | 'replace'>;

    @property({ type: Number, reflect: true })
    public offset = 6;

    @property({ reflect: true })
    public open?: OverlayContentTypes;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    private clickContent?: HTMLElement;
    private longpressContent?: HTMLElement;
    private hoverContent?: HTMLElement;
    private targetContent?: HTMLElement;

    private handleClose(): void {
        this.removeAttribute('open');
    }

    protected render(): TemplateResult {
        // Keyboard event availability documented in README.md
        /* eslint-disable lit-a11y/click-events-have-key-events */
        return html`
            <div
                id="trigger"
                @click=${this.onTrigger}
                @longpress=${this.onTrigger}
                @mouseenter=${this.onTrigger}
                @mouseleave=${this.onTrigger}
                @focusin=${this.onTrigger}
                @focusout=${this.onTrigger}
                @sp-closed=${this.handleClose}
            >
                <slot
                    @slotchange=${this.onTargetSlotChange}
                    name="trigger"
                ></slot>
            </div>
            <div id="overlay-content">
                <slot
                    @slotchange=${this.onClickSlotChange}
                    name="click-content"
                ></slot>
                <slot
                    @slotchange=${this.onLongpressSlotChange}
                    name="longpress-content"
                ></slot>
                <slot
                    @slotchange=${this.onHoverSlotChange}
                    name="hover-content"
                ></slot>
            </div>
        `;
        /* eslint-enable lit-a11y/click-events-have-key-events */
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (
            this.disabled &&
            this.closeClickOverlay &&
            changes.has('disabled')
        ) {
            this.closeClickOverlay();
        }
        if (changes.has('open')) {
            this.manageOpen(changes.get('open') as OverlayContentTypes);
        }
    }

    private manageOpen(previous?: OverlayContentTypes): void {
        switch (this.open) {
            case 'click':
                if (!this.closeClickOverlay) {
                    this.onTriggerClick();
                }
                break;
            case 'hover':
                if (!this.closeHoverOverlay) {
                    this.onTriggerMouseEnter();
                }
                break;
            case 'longpress':
                if (!this.closeLongpressOverlay) {
                    this.onTriggerLongpress();
                }
                break;
            default:
                switch (previous) {
                    case 'click':
                        if (this.closeClickOverlay) {
                            this.closeClickOverlay();
                            delete this.closeClickOverlay;
                        }
                        break;
                    case 'longpress':
                        if (this.closeLongpressOverlay) {
                            this.closeLongpressOverlay();
                            delete this.closeLongpressOverlay;
                        }
                        break;
                    case 'hover':
                        this.onTriggerMouseLeave();
                        break;
                    default:
                        break;
                }
                break;
        }
    }

    public static openOverlay = async (
        target: HTMLElement,
        interaction: TriggerInteractions,
        content: HTMLElement,
        options: OverlayOptions
    ): Promise<() => void> => {
        return await openOverlay(target, interaction, content, options);
    };

    private get overlayOptions(): OverlayOptions {
        return {
            offset: this.offset,
            placement: this.placement,
            receivesFocus:
                this.type && this.type !== 'inline' ? 'auto' : undefined,
        };
    }

    private onTrigger(event: CustomEvent<LongpressEvent>): void {
        if (this.disabled) {
            return;
        }
        switch (event.type) {
            case 'mouseenter':
            case 'focusin':
                if (this.hoverContent) {
                    this.open = 'hover';
                }
                return;
            case 'mouseleave':
            case 'focusout':
                if (this.open === 'hover') {
                    this.handleClose();
                }
                return;
            case 'click':
                if (this.clickContent) {
                    this.open = event.type;
                }
                return;
            case 'longpress':
                if (this.longpressContent) {
                    this.open = event.type;
                }
                return;
        }
    }

    private prepareToFocusOverlayContent(overlayContent: HTMLElement): void {
        if (this.type !== 'modal') {
            return;
        }
        const firstFocusable = overlayContent.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [focusable]'
        ) as HTMLElement;
        if (!firstFocusable) {
            overlayContent.tabIndex = 0;
        }
    }

    public async onTriggerClick(): Promise<void> {
        if (!this.targetContent || !this.clickContent) {
            return;
        }
        const { targetContent, clickContent } = this;
        this.prepareToFocusOverlayContent(clickContent);
        this.closeClickOverlay = await OverlayTrigger.openOverlay(
            targetContent,
            this.type ? this.type : 'click',
            clickContent,
            this.overlayOptions
        );
    }

    private async onTriggerLongpress(
        event?: CustomEvent<LongpressEvent>
    ): Promise<void> {
        if (!this.targetContent || !this.longpressContent) {
            return;
        }
        const { targetContent, longpressContent } = this;
        this.prepareToFocusOverlayContent(longpressContent);
        const type =
            event && event.detail.source === 'keyboard' ? 'click' : 'longpress';
        const interaction = this.type ? this.type : type || 'longpress';
        this.closeLongpressOverlay = await OverlayTrigger.openOverlay(
            targetContent,
            interaction,
            longpressContent,
            {
                ...this.overlayOptions,
                receivesFocus: 'auto',
            }
        );
    }

    private hoverOverlayReady = Promise.resolve();

    public async onTriggerMouseEnter(): Promise<void> {
        if (!this.targetContent || !this.hoverContent) {
            return;
        }
        let overlayReady: () => void = () => {
            return;
        };
        this.hoverOverlayReady = new Promise((res) => {
            overlayReady = res;
        });
        const { targetContent, hoverContent } = this;
        this.closeHoverOverlay = await OverlayTrigger.openOverlay(
            targetContent,
            'hover',
            hoverContent,
            this.overlayOptions
        );
        overlayReady();
    }

    public async onTriggerMouseLeave(): Promise<void> {
        await this.hoverOverlayReady;
        if (this.closeHoverOverlay) {
            this.closeHoverOverlay();
            delete this.closeHoverOverlay;
        }
    }

    private onClickSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.clickContent = this.extractSlotContentFromEvent(event);
        this.manageOpen();
    }

    private onLongpressSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.longpressContent = this.extractSlotContentFromEvent(event);
        this.manageOpen();
    }

    private onHoverSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.hoverContent = this.extractSlotContentFromEvent(event);
        this.manageOpen();
    }

    private onTargetSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.targetContent = this.extractSlotContentFromEvent(event);
    }

    private extractSlotContentFromEvent(event: Event): HTMLElement | undefined {
        const slot = event.target as HTMLSlotElement;
        const nodes = slot.assignedNodes({ flatten: true });
        return nodes.find((node) => node instanceof HTMLElement) as HTMLElement;
    }

    public disconnectedCallback(): void {
        if (this.closeClickOverlay) {
            this.closeClickOverlay();
            delete this.closeClickOverlay;
        }
        if (this.closeHoverOverlay) {
            this.closeHoverOverlay();
            delete this.closeClickOverlay;
        }
        super.disconnectedCallback();
    }
}
