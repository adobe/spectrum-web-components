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
    query,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import overlayTriggerStyles from './overlay-trigger.css.js';

export interface PopoverOpenDetail {
    content: HTMLElement;
    delay: number;
    offset: number;
    placement: 'top' | 'right' | 'bottom' | 'left';
    trigger: HTMLElement;
    interaction: 'click' | 'hover';
}

export type PopoverCloseDetail = HTMLElement;

export class OverlayTrigger extends LitElement {
    public static is = 'overlay-trigger';

    public static get styles(): CSSResultArray {
        return [overlayTriggerStyles];
    }

    @property({ reflect: true })
    public placement = 'bottom';

    @property({ type: Number, reflect: true })
    public offset = 6;

    @query('#trigger')
    private trigger?: HTMLElement;

    @property()
    private clickContent?: HTMLElement;

    @property()
    private hoverContent?: HTMLElement;

    public onPopoverOpen(ev: Event, interaction: string): void {
        console.log(ev.target);
        const isClick = interaction === 'click';
        const popoverElement = isClick ? this.clickContent : this.hoverContent;

        if (popoverElement) {
            const popoverOpenDetail = {
                content: popoverElement,
                delay: popoverElement.getAttribute('delay') || 0,
                offset: this.offset,
                placement: this.placement,
                trigger: this.trigger,
                interaction: interaction,
            };

            const popoverOpenEvent = new CustomEvent('popover-open', {
                bubbles: true,
                composed: true,
                detail: popoverOpenDetail,
            });

            this.dispatchEvent(popoverOpenEvent);
        }
    }

    public onPopoverClose(ev: Event, interaction: string): void {
        const isClick = interaction === 'click';
        const popoverElement = isClick ? this.clickContent : this.hoverContent;

        const popoverCloseEvent = new CustomEvent('popover-close', {
            bubbles: true,
            composed: true,
            detail: popoverElement,
        });

        this.dispatchEvent(popoverCloseEvent);
    }

    public onTriggerClick(ev: Event): void {
        if (this.clickContent) {
            this.onPopoverOpen(ev, 'click');
        }
    }

    public onTriggerMouseOver(ev: Event): void {
        if (this.hoverContent) {
            this.onPopoverOpen(ev, 'hover');
        }
    }

    public onTriggerMouseLeave(ev: Event): void {
        if (this.hoverContent) {
            this.onPopoverClose(ev, 'hover');
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
