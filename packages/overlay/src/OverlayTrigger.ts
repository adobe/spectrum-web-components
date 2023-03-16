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
import {
    isAndroid,
    isIOS,
} from '@spectrum-web-components/shared/src/platform.js';

import { OverlayTriggerInteractions } from './overlay-types';
import overlayTriggerStyles from './overlay-trigger.css.js';
import '../sp-overlay.js';
import { Placement } from '@floating-ui/dom';
import { OverlayBase } from './OverlayBase';

export type OverlayContentTypes = 'click' | 'hover' | 'longpress';

export const LONGPRESS_INSTRUCTIONS = {
    touch: 'Double tap and long press for additional options',
    keyboard: 'Press Space or Alt+Down Arrow for additional options',
    mouse: 'Click and hold for additional options',
};

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

    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
     * @attr
     */
    @property({ reflect: true })
    public placement?: Placement;

    @property()
    public type?: OverlayTriggerInteractions;

    @property({ type: Number, reflect: true })
    public offset = 6;

    @property({ reflect: true })
    public open?: OverlayContentTypes;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @state()
    public hasLongpressContent = false;

    private longpressDescriptor?: HTMLElement;

    @state()
    private clickContent: HTMLElement[] = [];

    @state()
    private longpressContent: HTMLElement[] = [];

    @state()
    private hoverContent: HTMLElement[] = [];

    @state()
    private targetContent: HTMLElement[] = [];

    @query('#click-overlay', true)
    clickOverlayElement!: OverlayBase;

    @query('#longpress-overlay', true)
    longpressOverlayElement!: OverlayBase;

    @query('#hover-overlay', true)
    hoverOverlayElement!: OverlayBase;

    private _longpressId = `longpress-describedby-descriptor`;

    private getAssignedElementsFromEvent(event: Event): HTMLElement[] {
        const target = event.target as HTMLSlotElement;
        return target.assignedElements({ flatten: true }) as HTMLElement[];
    }

    private handleTriggerContent(event: Event): void {
        this.targetContent = this.getAssignedElementsFromEvent(event);
    }

    private handleClickContent(event: Event): void {
        this.clickContent = this.getAssignedElementsFromEvent(event);
    }

    private handleLongpressContent(event: Event): void {
        this.longpressContent = this.getAssignedElementsFromEvent(event);
    }

    private handleHoverContent(event: Event): void {
        this.hoverContent = this.getAssignedElementsFromEvent(event);
    }

    protected override render(): TemplateResult {
        // Keyboard event availability documented in README.md
        /* eslint-disable lit-a11y/click-events-have-key-events */
        return html`
            <slot
                id="trigger"
                name="trigger"
                @slotchange=${this.handleTriggerContent}
            ></slot>
            <div id="overlay-content">
                <sp-overlay
                    id="click-overlay"
                    ?disabled=${!this.clickContent.length}
                    ?open=${this.open === 'click' && !!this.clickContent.length}
                    .offset=${this.offset}
                    .placement=${this.placement}
                    .triggerElement=${this.targetContent[0]}
                    .triggerInteraction=${'click'}
                    .type=${this.type !== 'modal' ? 'auto' : 'modal'}
                    @sp-closed=${(event: Event) => {
                        const target = event.composedPath()[0];
                        if (target !== this.clickOverlayElement) return;
                        if (this.open === 'click') {
                            this.open = undefined;
                        }
                    }}
                    @sp-opened=${(event: Event) => {
                        const target = event.composedPath()[0];
                        if (target !== this.clickOverlayElement) return;
                        this.open = 'click';
                    }}
                >
                    <slot
                        name="click-content"
                        @slotchange=${this.handleClickContent}
                    ></slot>
                </sp-overlay>
                <sp-overlay
                    id="longpress-overlay"
                    ?disabled=${!this.longpressContent.length}
                    ?open=${this.open === 'longpress' &&
                    !!this.longpressContent.length}
                    .offset=${this.offset}
                    .placement=${this.placement}
                    .triggerElement=${this.targetContent[0]}
                    .triggerInteraction=${'longpress'}
                    .type=${'auto'}
                    @sp-closed=${(event: Event) => {
                        const target = event.composedPath()[0];
                        if (target !== this.longpressOverlayElement) return;
                        if (this.open === 'longpress') {
                            this.open = undefined;
                        }
                    }}
                    @sp-opened=${(event: Event) => {
                        const target = event.composedPath()[0];
                        if (target !== this.longpressOverlayElement) return;
                        this.open = 'longpress';
                    }}
                >
                    <slot
                        name="longpress-content"
                        @slotchange=${this.handleLongpressContent}
                    ></slot>
                </sp-overlay>
                <sp-overlay
                    id="hover-overlay"
                    ?disabled=${!this.hoverContent.length}
                    ?open=${this.open === 'hover' && !!this.hoverContent.length}
                    .offset=${this.offset}
                    .placement=${this.placement}
                    .triggerElement=${this.targetContent[0]}
                    .triggerInteraction=${'hover'}
                    .type=${'hint'}
                    @sp-closed=${(event: Event) => {
                        const target = event.composedPath()[0];
                        if (target !== this.hoverOverlayElement) return;
                        if (this.open === 'hover') {
                            this.open = undefined;
                        }
                    }}
                    @sp-opened=${(event: Event) => {
                        const target = event.composedPath()[0];
                        if (target !== this.hoverOverlayElement) return;
                        this.open = 'hover';
                    }}
                >
                    <slot
                        name="hover-content"
                        @slotchange=${this.handleHoverContent}
                    ></slot>
                </sp-overlay>
                <slot name=${this._longpressId}></slot>
            </div>
        `;
        /* eslint-enable lit-a11y/click-events-have-key-events */
    }

    protected override updated(changes: PropertyValues<this>): void {
        super.updated(changes);
        if (this.disabled && changes.has('disabled')) {
            this.open = undefined;
            return;
        }
        if (
            changes.has('hasLongpressContent') &&
            typeof changes.get('hasLongpressContent') !== 'undefined'
        ) {
            this.manageLongpressDescriptor();
        }
    }

    protected manageLongpressDescriptor(): void {
        const trigger = this.querySelector(
            '[slot="trigger"]'
        ) as SpectrumElement;
        const ariaDescribedby = trigger.getAttribute('aria-describedby');
        let descriptors = ariaDescribedby ? ariaDescribedby.split(/\s+/) : [];

        if (this.hasLongpressContent) {
            if (!this.longpressDescriptor) {
                this.longpressDescriptor = document.createElement(
                    'div'
                ) as HTMLElement;

                this.longpressDescriptor.id = this._longpressId;
                this.longpressDescriptor.slot = this._longpressId;
            }
            const messageType = isIOS() || isAndroid() ? 'touch' : 'keyboard';
            this.longpressDescriptor.textContent =
                LONGPRESS_INSTRUCTIONS[messageType];
            this.appendChild(this.longpressDescriptor);
            descriptors.push(this._longpressId);
        } else {
            if (this.longpressDescriptor) this.longpressDescriptor.remove();
            descriptors = descriptors.filter(
                (descriptor) => descriptor !== this._longpressId
            );
        }
        if (descriptors.length) {
            trigger.setAttribute('aria-describedby', descriptors.join(' '));
        } else {
            trigger.removeAttribute('aria-describedby');
        }
    }

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        return complete;
    }

    protected override willUpdate(): void {
        if ((this.placement as unknown as 'none') === 'none') {
            this.placement = undefined;
        }
    }
}
