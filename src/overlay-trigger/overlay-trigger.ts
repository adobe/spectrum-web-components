/*
Copyright 2018 Adobe. All rights reserved.
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

import {
    OverlayCloseDetail,
    OverlayOpenDetail,
    TriggerInteractions,
    Placement,
} from '../overlay-root';
import { strictCustomEvent } from '../events.js';

export class OverlayTrigger extends LitElement {
    public static is = 'overlay-trigger';

    public static get styles(): CSSResultArray {
        return [overlayTriggerStyles];
    }

    @property({ reflect: true })
    public placement: Placement = 'bottom';

    @property({ type: Number, reflect: true })
    public offset = 6;

    private clickContent?: HTMLElement;

    private hoverContent?: HTMLElement;

    public onOverlayOpen(ev: Event, interaction: TriggerInteractions): void {
        const isClick = interaction === 'click';
        const overlayElement = isClick ? this.clickContent : this.hoverContent;
        const delayAttribute = overlayElement
            ? overlayElement.getAttribute('delay')
            : null;
        const delay = delayAttribute ? parseFloat(delayAttribute) : 0;

        if (!overlayElement) {
            return;
        }
        const overlayOpenDetail: OverlayOpenDetail = {
            content: overlayElement,
            delay: delay,
            offset: this.offset,
            placement: this.placement,
            trigger: this,
            interaction: interaction,
        };

        const overlayOpenEvent = strictCustomEvent('sp-overlay:open', {
            bubbles: true,
            composed: true,
            detail: overlayOpenDetail,
        });

        this.dispatchEvent(overlayOpenEvent);
    }

    public onOverlayClose(ev: Event, interaction: TriggerInteractions): void {
        const isClick = interaction === 'click';
        const overlayElement = isClick ? this.clickContent : this.hoverContent;

        if (!overlayElement) {
            return;
        }

        const overlayCloseDetail: OverlayCloseDetail = {
            content: overlayElement,
        };

        const overlayCloseEvent = strictCustomEvent('sp-overlay:close', {
            bubbles: true,
            composed: true,
            detail: overlayCloseDetail,
        });

        this.dispatchEvent(overlayCloseEvent);
    }

    public onTriggerClick(ev: Event): void {
        if (this.clickContent) {
            this.onOverlayOpen(ev, 'click');
        }
    }

    public onTriggerMouseOver(ev: Event): void {
        if (this.hoverContent) {
            this.onOverlayOpen(ev, 'hover');
        }
    }

    public onTriggerMouseLeave(ev: Event): void {
        if (this.hoverContent) {
            this.onOverlayClose(ev, 'hover');
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
                <slot name="trigger"></slot>
            </div>
            <slot
                @slotchange=${this.onClickSlotChange}
                name="click-content"
                id="click-content"
            ></slot>
            <slot
                @slotchange=${this.onHoverSlotChange}
                name="hover-content"
                id="hover-content"
            ></slot>
        `;
    }

    private onClickSlotChange(ev: Event): void {
        if (ev.target) {
            const slot = ev.target as HTMLSlotElement;
            const content = this.extractSlotContent(slot);

            if (content) {
                this.clickContent = content;
            }
        }
    }

    private onHoverSlotChange(ev: Event): void {
        if (ev.target) {
            const slot = ev.target as HTMLSlotElement;
            const content = this.extractSlotContent(slot);

            if (content) {
                this.hoverContent = content;
            }
        }
    }

    private extractSlotContent(slot: HTMLSlotElement): HTMLElement | null {
        const nodes = slot.assignedNodes();

        if (nodes.length) {
            return nodes[0] as HTMLElement;
        }

        return null;
    }
}
