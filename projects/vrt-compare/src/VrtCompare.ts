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
    SpectrumElement,
    html,
    css,
    property,
    TemplateResult,
    PropertyValues,
    nothing,
} from '@spectrum-web-components/base';
import { ObserveSlotPresence } from '@spectrum-web-components/shared';
import { ActionGroup } from '@spectrum-web-components/action-group';
import bodyStyles from '@spectrum-web-components/styles/body.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/split-view/sp-split-view.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-zoom-in.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-zoom-out.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-refresh.js';
import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
import '../onion-skinner.js';

export class VrtCompare extends ObserveSlotPresence(SpectrumElement, [
    '[slot="actual"]',
    '[slot="baseline"]',
    '[slot="diff"]',
]) {
    @property()
    public view = 'scrubber';

    @property({ type: Number })
    public zoom = 1;

    @property({ type: Boolean, attribute: false })
    public imagesLoaded = false;

    private get hasActual(): boolean {
        return this.getSlotContentPresence('[slot="actual"]');
    }

    private get hasBaseline(): boolean {
        return this.getSlotContentPresence('[slot="baseline"]');
    }

    private get hasDiff(): boolean {
        return this.getSlotContentPresence('[slot="diff"]');
    }

    private get canCompare(): boolean {
        return this.hasActual && this.hasBaseline;
    }

    private handleChange(event: Event & { target: ActionGroup }) {
        const view = event.target.selected[0];
        if (view) {
            this.view = view;
        }
    }

    private handleZoomIn() {
        this.zoom += 0.1;
    }

    private handleZoomClear() {
        this.zoom = 1;
    }

    private handleZoomOut() {
        this.zoom -= 0.1;
    }

    protected get error() {
        return html`
            <sp-icon-alert class="icon" size="xl"></sp-icon-alert>
            <p class="spectrum-Body spectrum-Body--sizeXL">
                Please be sure to supply some combination of actual, baseline,
                and diff screenshots for review.
            </p>
        `;
    }

    protected get actual() {
        return html`
            <div class="view actual">
                <slot name="actual"></slot>
            </div>
        `;
    }

    protected get baseline() {
        return html`
            <div class="view baseline">
                <slot name="baseline"></slot>
            </div>
        `;
    }

    protected get diff() {
        return html`
            <div class="view diff">
                <slot name="diff"></slot>
            </div>
        `;
    }

    protected get scrubber() {
        return html`
            <sp-split-view resizable primary-size="50%">
                ${this.baseline} ${this.actual}
            </sp-split-view>
        `;
    }

    protected get sidebyside() {
        return html`
            ${this.baseline} ${this.actual}
        `;
    }

    protected get onion() {
        return html`
            <onion-skinner>
                <slot name="baseline"></slot>
                <slot name="actual"></slot>
            </onion-skinner>
        `;
    }

    protected get renderView() {
        switch (this.view) {
            case 'error':
                return this.error;
            case 'actual':
                return this.actual;
            case 'baseline':
                return this.baseline;
            case 'diff':
                return this.diff;
            case 'onion':
                return this.onion;
            case 'sidebyside':
                return this.sidebyside;
            case 'scrubber':
            default:
                return this.scrubber;
        }
    }

    private get viewFallback() {
        if (this.canCompare) {
            return 'scrubber';
        } else if (this.hasActual) {
            return 'actual';
        } else if (this.hasBaseline) {
            return 'baseline';
        } else if (this.hasDiff) {
            return 'diff';
        } else {
            return 'error';
        }
    }

    _loadingImages = false;

    async prepImages(event: Event) {
        const slot = event.target as HTMLSlotElement;
        if (this._loadingImages || !slot.assignedNodes().length) {
            return;
        }
        this._loadingImages = true;
        this.imagesLoaded = false;
        const images = [...this.querySelectorAll('img')];
        if (!images.length) {
            this.imagesLoaded = true;
            this._loadingImages = false;
            return;
        }
        const imageLoadPromises = images.map((img) => {
            if (img.naturalWidth) {
                this.style.setProperty(
                    '--image-width',
                    `${img.naturalWidth}px`
                );
                return Promise.resolve();
            }
            return new Promise((resolve) => {
                img.addEventListener('load', () => {
                    this.style.setProperty(
                        '--image-width',
                        `${img.naturalWidth}px`
                    );
                    resolve(true);
                });
            });
        });
        await Promise.all(imageLoadPromises);
        this.imagesLoaded = true;
        this._loadingImages = false;
    }

    protected shouldUpdate() {
        if (
            this.view === 'error' ||
            (this.view === 'actual' && !this.hasActual) ||
            (this.view === 'baseline' && !this.hasBaseline) ||
            (this.view === 'diff' && !this.hasDiff) ||
            ((this.view === 'onion' ||
                this.view === 'sidebyside' ||
                this.view === 'scrubber') &&
                !this.canCompare)
        ) {
            this.view = this.viewFallback;
        }
        return true;
    }

    protected render(): TemplateResult {
        if (this._loadingImages) {
            return html`
                <sp-progress-circle indeterminate></sp-progress-circle>
                <slot
                    name="actual"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot
                    name="baseline"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot name="diff" @slotchange=${this.prepImages} hidden></slot>
            `;
        }
        if (!this.imagesLoaded) {
            return html`
                <p class="spectrum-Body spectrum-Body--sizeXL">
                    Choose a test to review on the left...
                </p>
                <slot
                    name="actual"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot
                    name="baseline"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot name="diff" @slotchange=${this.prepImages} hidden></slot>
            `;
        }
        return html`
            <sp-action-group
                selects="single"
                compact
                emphasized
                @change=${this.handleChange}
            >
                ${this.view !== 'error'
                    ? nothing
                    : html`
                          <sp-action-button value="error" disabled>
                              Error
                          </sp-action-button>
                      `}
                ${!this.canCompare
                    ? nothing
                    : html`
                          <sp-action-button
                              value="scrubber"
                              ?selected=${this.view === 'scrubber'}
                          >
                              Scrubber
                          </sp-action-button>
                          <sp-action-button
                              value="onion"
                              ?selected=${this.view === 'onion'}
                          >
                              Onion skin
                          </sp-action-button>
                          <sp-action-button
                              value="sidebyside"
                              ?selected=${this.view === 'sidebyside'}
                          >
                              Side by side
                          </sp-action-button>
                      `}
                ${!this.hasDiff
                    ? nothing
                    : html`
                          <sp-action-button
                              value="diff"
                              ?selected=${this.view === 'diff'}
                          >
                              Diff
                          </sp-action-button>
                      `}
                ${!this.hasActual
                    ? nothing
                    : html`
                          <sp-action-button
                              value="actual"
                              ?selected=${this.view === 'actual'}
                          >
                              Actual
                          </sp-action-button>
                      `}
                ${!this.hasBaseline
                    ? nothing
                    : html`
                          <sp-action-button
                              value="baseline"
                              ?selected=${this.view === 'baseline'}
                          >
                              Baseline
                          </sp-action-button>
                      `}
            </sp-action-group>
            <div class="review ${this.view}">${this.renderView}</div>
            <sp-action-group compact class="zoom-controls">
                <sp-action-button
                    @click=${this.handleZoomOut}
                    ?disabled=${this.zoom <= 0.5}
                >
                    <sp-icon-zoom-out slot="icon"></sp-icon-zoom-out>
                </sp-action-button>
                <sp-action-button @click=${this.handleZoomClear}>
                    <sp-icon-refresh slot="icon"></sp-icon-refresh>
                </sp-action-button>
                <sp-action-button
                    @click=${this.handleZoomIn}
                    ?disabled=${this.zoom >= 2}
                >
                    <sp-icon-zoom-in slot="icon"></sp-icon-zoom-in>
                </sp-action-button>
            </sp-action-group>
        `;
    }

    protected updated(changes: PropertyValues) {
        if (changes.has('zoom')) {
            let zoom = Math.min(this.zoom, 2);
            zoom = Math.min(zoom, 0.5);
            this.style.setProperty('--zoom-level', `${this.zoom}`);
        }
    }

    static styles = [
        css`
            :host {
                display: grid;
                max-width: 100%;
                overflow: auto;
                margin: 0 auto;
                position: relative;

                --image-display-width: calc(
                    var(--zoom-level, 1) * var(--image-width, 500px)
                );
            }
            sp-progress-circle {
                margin: auto;
                place-self: center;
            }
            .review {
                margin: 100px auto 0;
                display: flex;
                width: var(--image-display-width);
                place-self: start;
            }
            .error {
                flex-direction: column;
            }
            ::slotted(img) {
                display: flex;
            }
            sp-action-group[selects] {
                margin-bottom: 1em;
                justify-content: center;
                position: fixed;
                top: calc(var(--spectrum-global-dimension-size-200) / 2);
                right: calc(var(--spectrum-global-dimension-size-200) / 2);
            }
            .sidebyside {
                display: flex;
                gap: 2px;
            }
            .sidebyside ::slotted(img) {
                width: 100%;
            }
            .view {
                overflow: hidden;
            }
            .review:is(.baseline, .actual, .diff) .view,
            .review:is(.baseline, .actual, .diff) ::slotted(img) {
                width: 100%;
            }
            sp-split-view {
                width: var(--image-display-width);
            }
            sp-split-view ::slotted(img) {
                width: var(--image-display-width);
                height: auto;
                flex-shrink: 0;
            }
            sp-split-view .actual ::slotted(img) {
                float: right;
            }
            p {
                text-align: center;
                margin: 0 3em;
            }
            .icon {
                margin: 0 auto 2em;
                display: flex;
                color: var(--spectrum-semantic-negative-color-background);
            }
            .zoom-controls {
                position: fixed;
                bottom: calc(var(--spectrum-global-dimension-size-200) / 2);
                left: calc(
                    240px + 48px + var(--spectrum-global-dimension-size-200) / 2
                );
                z-index: 1;
            }
        `,
        bodyStyles,
    ];
}
