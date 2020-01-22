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

import { OverlayRoot } from './overlay-root.js';
import {
    OverlayCloseDetail,
    OverlayOpenDetail,
    TriggerInteractions,
    Placement,
} from './overlay.js';
import { ThemeData } from '@spectrum-web-components/theme';

let overlayRoot: OverlayRoot;

/**
 * A overlay trigger component for displaying overlays relative to other content.
 * @element overlay-trigger
 *
 * @slot hover-content - The content that will be displayed on hover
 * @slot click-content - The content that will be displayed on click
 */
export class OverlayTrigger extends LitElement {
    public static get styles(): CSSResultArray {
        return [overlayTriggerStyles];
    }

    static overlayRoot: OverlayRoot;

    @property({ reflect: true })
    public placement: Placement = 'bottom';

    @property({ type: Number, reflect: true })
    public offset = 6;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    private clickContent?: HTMLElement;

    private hoverContent?: HTMLElement;

    public onOverlayOpen(event: Event, interaction: TriggerInteractions): void {
        const isClick = interaction === 'click';
        const overlayElement = isClick ? this.clickContent : this.hoverContent;

        /* istanbul ignore if */
        if (!overlayElement) {
            return;
        }
        if (!overlayRoot) {
            overlayRoot = new OverlayRoot();
        }

        const delayAttribute = overlayElement.getAttribute('delay');
        const delay = delayAttribute ? parseFloat(delayAttribute) : 0;

        const queryThemeDetail: ThemeData = {
            color: undefined,
            scale: undefined,
        };
        const queryThemeEvent = new CustomEvent<ThemeData>('query-theme', {
            bubbles: true,
            composed: true,
            detail: queryThemeDetail,
            cancelable: true,
        });
        this.dispatchEvent(queryThemeEvent);

        const overlayOpenDetail: OverlayOpenDetail = {
            content: overlayElement,
            delay: delay,
            offset: this.offset,
            placement: this.placement,
            trigger: this,
            interaction: interaction,
            theme: queryThemeDetail,
        };

        const overlayOpenEvent = new CustomEvent<OverlayOpenDetail>(
            'sp-overlay-open',
            {
                bubbles: true,
                composed: true,
                detail: overlayOpenDetail,
            }
        );

        this.dispatchEvent(overlayOpenEvent);
    }

    public onOverlayClose(
        event: Event,
        interaction: TriggerInteractions
    ): void {
        const isClick = interaction === 'click';
        const overlayElement = isClick ? this.clickContent : this.hoverContent;

        /* istanbul ignore if */
        if (!overlayElement) {
            return;
        }

        const overlayCloseDetail: OverlayCloseDetail = {
            content: overlayElement,
        };

        const overlayCloseEvent = new CustomEvent<OverlayCloseDetail>(
            'sp-overlay-close',
            {
                bubbles: true,
                composed: true,
                detail: overlayCloseDetail,
            }
        );

        this.dispatchEvent(overlayCloseEvent);
    }

    public onTriggerClick(event: Event): void {
        /* istanbul ignore else */
        if (this.clickContent) {
            this.onOverlayOpen(event, 'click');
        }
    }

    public onTriggerMouseOver(event: Event): void {
        /* istanbul ignore else */
        if (this.hoverContent) {
            this.onOverlayOpen(event, 'hover');
        }
    }

    public onTriggerMouseLeave(event: Event): void {
        /* istanbul ignore else */
        if (this.hoverContent) {
            this.onOverlayClose(event, 'hover');
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
        /* istanbul ignore if */
        if (!event.target) {
            return;
        }
        const slot = event.target as HTMLSlotElement;
        const content = this.extractSlotContent(slot);

        if (content) {
            this.clickContent = content;
        }
    }

    private onHoverSlotChange(event: Event): void {
        /* istanbul ignore if */
        if (!event.target) {
            return;
        }
        const slot = event.target as HTMLSlotElement;
        const content = this.extractSlotContent(slot);

        if (content) {
            this.hoverContent = content;
        }
    }

    private extractSlotContent(slot: HTMLSlotElement): HTMLElement | null {
        const nodes = slot.assignedNodes();

        if (nodes.length) {
            return nodes[0] as HTMLElement;
        }

        return null;
    }

    public disconnectedCallback(): void {
        /* istanbul ignore else */
        if (this.clickContent) {
            this.onOverlayClose(new Event('remove'), 'click');
        }
        if (this.hoverContent) {
            this.onOverlayClose(new Event('remove'), 'hover');
        }
        super.disconnectedCallback();
    }
}
