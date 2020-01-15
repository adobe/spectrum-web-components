/*
Copyright 2019 Adobe. All rights reserved.
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
} from 'lit-element';

import overlayTriggerStyles from './overlay-trigger.css.js';

import { Placement } from './overlay-types';
import { Overlay } from './overlay.js';

/**
 * A overlay trigger component for displaying overlays relative to other content.
 * @element overlay-trigger
 *
 * @slot hover-content - The content that will be displayed on hover
 * @slot click-content - The content that will be displayed on click
 */
export class OverlayTrigger extends LitElement {
    private clickOverlay?: Overlay;
    private hoverOverlay?: Overlay;

    public static get styles(): CSSResultArray {
        return [overlayTriggerStyles];
    }

    @property({ reflect: true })
    public placement: Placement = 'bottom';

    @property({ type: Number, reflect: true })
    public offset = 6;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    private clickContent?: HTMLElement;
    private hoverContent?: HTMLElement;
    private targetContent?: HTMLElement;

    public onTriggerClick(): void {
        /* istanbul ignore else */
        if (this.targetContent && this.clickContent) {
            this.clickOverlay = Overlay.open(
                this.targetContent,
                'click',
                this.clickContent,
                {
                    offset: this.offset,
                    placement: this.placement,
                }
            );
        }
    }

    public onTriggerMouseOver(): void {
        /* istanbul ignore else */
        if (this.targetContent && this.hoverContent) {
            this.hoverOverlay = Overlay.open(
                this.targetContent,
                'hover',
                this.hoverContent,
                {
                    offset: this.offset,
                    placement: this.placement,
                }
            );
        }
    }

    public onTriggerMouseLeave(): void {
        /* istanbul ignore else */
        if (this.hoverOverlay) {
            this.hoverOverlay.close();
            delete this.hoverOverlay;
        }
    }

    protected render(): TemplateResult {
        return html`
            <div
                id="trigger"
                @click=${this.onTriggerClick}
                @mouseenter=${this.onTriggerMouseOver}
                @mouseleave=${this.onTriggerMouseLeave}
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
    }

    private onClickSlotChange(event: Event): void {
        const content = this.extractSlotContentFromEvent(event);
        this.clickContent = content || undefined;
    }

    private onHoverSlotChange(event: Event): void {
        const content = this.extractSlotContentFromEvent(event);
        this.hoverContent = content || undefined;
    }

    private onTargetSlotChange(event: Event): void {
        const content = this.extractSlotContentFromEvent(event);
        this.targetContent = content || undefined;
    }

    private extractSlotContentFromEvent(event: Event): HTMLElement | null {
        /* istanbul ignore if */
        if (!event.target) {
            return null;
        }
        const slot = event.target as HTMLSlotElement;
        const nodes = slot.assignedNodes();
        return nodes.find((node) => node instanceof HTMLElement) as HTMLElement;
    }

    public disconnectedCallback(): void {
        /* istanbul ignore else */
        if (this.clickOverlay) {
            this.clickOverlay.close();
            delete this.clickOverlay;
        }
        if (this.hoverOverlay) {
            this.hoverOverlay.close();
            delete this.hoverOverlay;
        }
        super.disconnectedCallback();
    }
}
