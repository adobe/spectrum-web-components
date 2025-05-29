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
import { css, html, SpectrumElement } from '@spectrum-web-components/base';
import {
    property,
    queryAssignedNodes,
} from '@spectrum-web-components/base/src/decorators.js';
import { Slider } from '@spectrum-web-components/slider';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/thumbnail/sp-thumbnail.js';
import '@spectrum-web-components/overlay/sync/overlay-trigger.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';

export class OnionSkinner extends SpectrumElement {
    @property({ type: Number }) public onionLevel = 0.5;

    @queryAssignedNodes({
        slot: '',
        flatten: true,
    })
    private assignments!: NodeListOf<HTMLImageElement>;

    private leftThumbnail?: HTMLImageElement;
    private rightThumbnail?: HTMLImageElement;

    private handleOnionInput(event: Event & { target: Slider }) {
        this.onionLevel = event.target.value;
    }

    private handleSlotchange() {
        const images = [...this.assignments].filter(
            (node) => node.tagName && node.matches('img')
        );
        if (images[0]) {
            this.leftThumbnail = images[0].cloneNode() as HTMLImageElement;
            this.leftThumbnail.removeAttribute('slot');
        }
        if (images[1]) {
            this.rightThumbnail = images[1].cloneNode() as HTMLImageElement;
            this.rightThumbnail.removeAttribute('slot');
        }
        if (images.length) {
            this.requestUpdate();
        }
    }

    private allLeft() {
        this.onionLevel = 0;
    }

    private allRight() {
        this.onionLevel = 1;
    }

    override render() {
        return html`
            <slot
                @slotchange=${this.handleSlotchange}
                style="--onion-level: ${this.onionLevel}"
            ></slot>
            <div class="controls">
                <overlay-trigger placement="top">
                    <sp-thumbnail
                        slot="trigger"
                        size="xl"
                        @click=${this.allLeft}
                    >
                        ${this.leftThumbnail}
                    </sp-thumbnail>
                    <sp-tooltip slot="hover-content">
                        Baseline screenshot
                    </sp-tooltip>
                </overlay-trigger>
                <sp-slider
                    min="0"
                    max="1"
                    step="0.001"
                    .value=${this.onionLevel}
                    .getAriaValueText=${() => ''}
                    @input=${this.handleOnionInput}
                ></sp-slider>
                <overlay-trigger placement="top">
                    <sp-thumbnail
                        slot="trigger"
                        size="xl"
                        @click=${this.allRight}
                    >
                        ${this.rightThumbnail}
                    </sp-thumbnail>
                    <sp-tooltip slot="hover-content">
                        Current screenshot
                    </sp-tooltip>
                </overlay-trigger>
            </div>
        `;
    }

    static override styles = [
        css`
            :host {
                display: grid;
                grid-template-areas: 'main';
            }
            ::slotted(*) {
                grid-area: main;
            }
            ::slotted(:first-child) {
                opacity: calc(1 - var(--onion-level));
            }
            ::slotted(:last-child) {
                opacity: var(--onion-level);
            }
            .controls {
                display: flex;
                gap: 1em;
                margin: 0.25em;
                align-items: center;
            }
            sp-slider {
                flex-grow: 1;
            }
        `,
    ];
}
