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

import {
    Placement,
    TriggerInteractions,
    OverlayOptions,
} from './overlay-types';
import { openOverlay } from './loader.js';
import overlayTriggerStyles from './overlay-trigger.css.js';

/**
 * A overlay trigger component for displaying overlays relative to other content.
 * @element overlay-trigger
 *
 * @slot trigger - The content that will trigger the various overlays
 * @slot hover-content - The content that will be displayed on hover
 * @slot click-content - The content that will be displayed on click
 *
 * @fires sp-open - Announces that the overlay has been opened
 * @fires sp-close - Announces that the overlay has been closed
 */
export class OverlayTrigger extends LitElement {
    private closeClickOverlay?: () => void;
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

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    private clickContent?: HTMLElement;
    private hoverContent?: HTMLElement;
    private targetContent?: HTMLElement;

    public overloadTarget(target: HTMLElement): void {
        this.targetContent = target;
    }

    protected render(): TemplateResult {
        // Keyboard event availability documented in README.md
        /* eslint-disable lit-a11y/click-events-have-key-events */
        return html`
            <div
                id="trigger"
                @click=${this.onTrigger}
                @mouseenter=${this.onTrigger}
                @mouseleave=${this.onTrigger}
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

    private onTrigger(event: Event): void {
        if (this.disabled) {
            return;
        }
        switch (event.type) {
            case 'click':
                this.onTriggerClick();
                return;
            case 'mouseenter':
                this.onTriggerMouseEnter();
                return;
            case 'mouseleave':
                this.onTriggerMouseLeave();
                return;
        }
    }

    public async onTriggerClick(): Promise<void> {
        if (this.targetContent && this.clickContent) {
            if (this.type === 'modal') {
                const firstFocusable = this.querySelector(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                ) as HTMLElement;
                if (!firstFocusable) {
                    this.clickContent.tabIndex = 0;
                }
            }
            const { targetContent, clickContent } = this;
            this.closeClickOverlay = await OverlayTrigger.openOverlay(
                targetContent,
                this.type ? this.type : 'click',
                clickContent,
                this.overlayOptions
            );
        }
    }

    private hoverOverlayReady = Promise.resolve();

    public async onTriggerMouseEnter(): Promise<void> {
        if (this.targetContent && this.hoverContent) {
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
        const content = this.extractSlotContentFromEvent(event);
        this.clickContent = content;
    }

    private onHoverSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        const content = this.extractSlotContentFromEvent(event);
        this.hoverContent = content;
    }

    private onTargetSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        const content = this.extractSlotContentFromEvent(event);
        this.targetContent = content;
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
        super.disconnectedCallback();
    }
}
