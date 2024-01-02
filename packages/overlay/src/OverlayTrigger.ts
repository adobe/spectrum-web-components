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

import type { BeforetoggleOpenEvent } from './AbstractOverlay.js';
import type { Overlay } from './Overlay.js';
import type { OverlayTriggerInteractions } from './overlay-types';

import overlayTriggerStyles from './overlay-trigger.css.js';

export type OverlayContentTypes = 'click' | 'hover' | 'longpress';

/**
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
export class OverlayTrigger extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [overlayTriggerStyles];
    }

    @property()
    content = 'click hover longpress';

    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    @property({ reflect: true })
    public placement?: Placement;

    @property()
    public type?: OverlayTriggerInteractions;

    @property({ type: Number })
    public offset = 6;

    @property({ reflect: true })
    public open?: OverlayContentTypes;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

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
        import('@spectrum-web-components/overlay/sp-overlay.js');
        const slot = this.renderSlot('click-content');
        if (!this.clickContent.length) {
            return slot;
        }
        return html`
            <sp-overlay
                id="click-overlay"
                ?disabled=${this.disabled || !this.clickContent.length}
                ?open=${this.open === 'click' && !!this.clickContent.length}
                .offset=${this.offset}
                .placement=${this.clickPlacement || this.placement}
                .triggerElement=${this.targetContent[0]}
                .triggerInteraction=${'click'}
                .type=${this.type !== 'modal' ? 'auto' : 'modal'}
                @beforetoggle=${this.handleBeforetoggle}
            >
                ${slot}
            </sp-overlay>
        `;
    }

    protected renderHoverOverlay(): TemplateResult {
        import('@spectrum-web-components/overlay/sp-overlay.js');
        const slot = this.renderSlot('hover-content');
        if (!this.hoverContent.length) {
            return slot;
        }
        return html`
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
            >
                ${slot}
            </sp-overlay>
        `;
    }

    protected renderLongpressOverlay(): TemplateResult {
        import('@spectrum-web-components/overlay/sp-overlay.js');
        const slot = this.renderSlot('longpress-content');
        if (!this.longpressContent.length) {
            return slot;
        }
        return html`
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
            >
                ${slot}
            </sp-overlay>
            <slot name="longpress-describedby-descriptor"></slot>
        `;
    }

    protected override render(): TemplateResult {
        const content = this.content.split(' ');
        // Keyboard event availability documented in README.md
        /* eslint-disable lit-a11y/click-events-have-key-events */
        return html`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            ${[
                content.includes('click') ? this.renderClickOverlay() : html``,
                content.includes('hover') ? this.renderHoverOverlay() : html``,
                content.includes('longpress')
                    ? this.renderLongpressOverlay()
                    : html``,
            ]}
        `;
        /* eslint-enable lit-a11y/click-events-have-key-events */
    }

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (this.disabled && changes.has('disabled')) {
            this.open = undefined;
            return;
        }
    }

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        return complete;
    }
}
