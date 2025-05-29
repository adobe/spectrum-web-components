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
import type { Overlay, Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import {
    property,
    query,
    queryAssignedElements,
    queryAssignedNodes,
    state,
} from '@spectrum-web-components/base/src/decorators.js';

import styles from './truncated.css.js';

/**
 * @element sp-truncated
 */
export class Truncated extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     */
    @property()
    placement: Placement = 'top-start';

    /*
     * @type {String}
     * @attr success-message
     * @description The message to display when the text is copied to the clipboard after clicking on the truncated text
     */
    @property({ type: String, attribute: 'success-message' })
    successMessage = 'Copied to clipboard';

    @state()
    hasCopied = false;

    @state()
    private fullText = '';

    @state()
    private overflowing = false;

    @query('#content')
    private content!: HTMLElement;

    @query('#overlay')
    private overlayEl?: Overlay;

    @queryAssignedNodes({ flatten: true })
    private slottedContent!: Node[];

    // elements instead of nodes because, according to spec,
    // flattened assignedNodes will return a slot's *children* if there are no assigned nodes.
    // ¯\_(ツ)_/¯
    @queryAssignedElements({ slot: 'overflow', flatten: true })
    private slottedOverflow!: HTMLElement[];

    get hasCustomOverflow(): boolean {
        return this.slottedOverflow.length > 0;
    }

    private resizeObserver = new ResizeObserver(() => {
        this.measureOverflow();
    });

    private mutationObserver = new MutationObserver(() => {
        this.copyText();
    });

    override render(): TemplateResult {
        /* eslint-disable lit-a11y/click-events-have-key-events */
        return html`
            <span id="content" @click=${this.handleClick}>
                <slot></slot>
            </span>
            ${this.renderTooltip()}
        `;
        /* eslint-enable lit-a11y/click-events-have-key-events */
    }

    private renderTooltip(): TemplateResult | undefined {
        if (!this.overflowing) {
            return html`
                <slot
                    name="overflow"
                    style="display: none"
                    @slotchange=${this.handleOverflowSlotchange}
                ></slot>
            `;
        }
        return html`
            <sp-overlay
                id="overlay"
                .triggerElement=${this as HTMLElement}
                .triggerInteraction=${'hover'}
                type="hint"
                placement=${this.placement}
            >
                <sp-tooltip name="tooltip">
                    ${!this.hasCopied
                        ? html`
                              <slot
                                  name="overflow"
                                  @slotchange=${this.handleOverflowSlotchange}
                              >
                                  ${this.fullText}
                              </slot>
                          `
                        : this.successMessage}
                </sp-tooltip>
            </sp-overlay>
        `;
    }

    protected override firstUpdated(
        _changedProperties: PropertyValues<this>
    ): void {
        this.resizeObserver.observe(this);
        this.resizeObserver.observe(this.content);
        this.copyText();
        this.measureOverflow();
    }

    protected override updated(changedProperties: PropertyValues<this>): void {
        super.updated(changedProperties);
        if (
            changedProperties.has('hasCopied') &&
            this.hasCopied &&
            this.overlayEl
        ) {
            // we know overlayEl exists because it couldn't copy the text otherwise
            this.overlayEl.open = true;
        }
    }

    private handleOverflowSlotchange(): void {
        this.mutationObserver.disconnect();
        if (!this.hasCustomOverflow) {
            /* c8 ignore next 5 */
            this.mutationObserver.observe(this.content, {
                subtree: true,
                childList: true,
                characterData: true,
            });
        }
    }

    private handleClick(): void {
        if (!this.overflowing) return;

        const textToCopy = this.slottedContent
            .map((node) => node.textContent ?? '')
            .join('')
            .trim();
        navigator.clipboard.writeText(textToCopy);
        this.hasCopied = true;
        /* c8 ignore next 3 */
        setTimeout(() => {
            this.hasCopied = false;
        }, 6000);
    }

    private measureOverflow(): void {
        // Add 1 because Safari sometimes rounds by 1px, breaking the calculation otherwise
        this.overflowing = this.content.offsetWidth > this.clientWidth + 1;
    }

    // Copies just the textContent of slotted nodes into the tooltip to avoid duplicating the user's DOM
    private copyText(): void {
        if (this.hasCustomOverflow) return;
        this.fullText = this.slottedContent
            .map((node) => node.textContent ?? '')
            .join('');
    }
}
