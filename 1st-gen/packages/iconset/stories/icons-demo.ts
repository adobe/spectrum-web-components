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
import { IconsetAddedDetail } from '@spectrum-web-components/iconset';
import {
    css,
    CSSResultGroup,
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    customElement,
    property,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { Search } from '@spectrum-web-components/search';
import '@spectrum-web-components/search/sp-search.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import bodyStyles from '@spectrum-web-components/styles/body.js';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/help-text/sp-help-text.js';

import iconsList from './iconsList.json' with { type: 'json' };

import {
    SystemResolutionController,
    systemResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/SystemContextResolution.js';

@customElement('delayed-ready')
export class DelayedReady extends SpectrumElement {
    _delayedReady!: Promise<void>;
    _resolveDelayedReady!: () => void;

    protected override render(): TemplateResult {
        return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
    }

    protected override firstUpdated(): void {
        this._delayedReady = new Promise(
            (res) => (this._resolveDelayedReady = res)
        );
    }

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        await this._delayedReady;
        return complete;
    }

    public handleSlotchange({
        target,
    }: Event & { target: HTMLSlotElement }): void {
        if (target.assignedElements({ flatten: true }).length) {
            requestAnimationFrame(() => {
                this._resolveDelayedReady();
            });
        }
    }
}

@customElement('icons-demo')
export class IconsDemo extends SpectrumElement {
    @property()
    public name = 'ui';

    @property()
    public package = '';

    @property()
    public size = 'm';

    @property()
    public search = '';

    @property({ attribute: false })
    public icons: {
        name: string;
        story(size: string): TemplateResult;
        tag: string;
    }[] = [];

    private filteredIcons: {
        name: string;
        story(size: string): TemplateResult;
        tag: string;
    }[] = [];

    private unsubscribeSystemContext: (() => void) | null = null;

    @state()
    public spectrumVersion = 1;

    private iconset: string[] = [];
    public constructor() {
        super();
        this.iconset = [];
        this.handleIconSetAdded = this.handleIconSetAdded.bind(this);
    }

    public override async connectedCallback(): Promise<void> {
        super.connectedCallback();
        window.addEventListener('sp-iconset-added', this.handleIconSetAdded);
    }
    public override disconnectedCallback(): void {
        window.removeEventListener('sp-iconset-added', this.handleIconSetAdded);
        super.disconnectedCallback();
        if (this.unsubscribeSystemContext) {
            this.unsubscribeSystemContext();
            this.unsubscribeSystemContext = null;
        }
    }

    private filterIconsBySpectrumVersion(): void {
        const iconVersion = this.spectrumVersion === 2 ? 's2' : 's1';
        let filteredIcons = this.icons;
        // Filter out icons that are not in the current version for workflow icons
        if (this.name === 'workflow') {
            filteredIcons = filteredIcons.filter((icon) => {
                const iconName = icon.name.replace(/\s/g, '').toLowerCase();
                return iconsList[iconVersion].includes(iconName);
            });
        }

        // Use a Set to remove duplicates that may get added because of the same icon name in both versions
        const iconSet = new Set();
        filteredIcons = filteredIcons.filter((icon) => {
            if (iconSet.has(icon.name)) {
                return false;
            }
            iconSet.add(icon.name);
            return true;
        });

        this.filteredIcons = filteredIcons;
    }

    private systemResolver = new SystemResolutionController(this);

    protected override update(changes: PropertyValues): void {
        if (changes.has(systemResolverUpdatedSymbol)) {
            this.spectrumVersion =
                this.systemResolver.system === 'spectrum-two' ? 2 : 1;
            this.filterIconsBySpectrumVersion();
        }

        if (changes.has('icons')) {
            this.filterIconsBySpectrumVersion();
        }

        super.update(changes);
    }

    public handleIconSetAdded(event: CustomEvent<IconsetAddedDetail>): void {
        const { iconset } = event.detail;
        this.iconset = iconset.getIconList();
        this.requestUpdate();
    }
    public static override get styles(): CSSResultGroup {
        return [
            ...bodyStyles,
            css`
                :host {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 20px;
                    align-items: flex-start;
                }
                .icon {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    border-radius: var(
                        --spectrum-alias-focus-ring-gap,
                        var(--spectrum-spacing-50)
                    );
                }
                :host([package]) .icon {
                    cursor: pointer;
                }
                sp-icon {
                    margin-bottom: 10px;
                }
                .search {
                    grid-column-start: 1;
                    grid-column-end: -1;
                }
                .icon[tabindex]:focus {
                    outline: none;
                }
                .icon[tabindex]:focus-visible {
                    outline: var(--spectrum-alias-focus-ring-size) solid
                        var(--spectrum-alias-focus-ring-color);
                    outline-offset: calc(
                        var(
                                --spectrum-alias-focus-ring-gap,
                                var(--spectrum-spacing-50)
                            ) *
                            2
                    );
                }
            `,
        ];
    }
    private handleKeydown(event: KeyboardEvent, tag: string): void {
        const { code } = event;
        if (code !== 'Enter' && code !== 'NumpadEnter' && code !== 'Space') {
            return;
        }
        event.preventDefault();
        this.shouldCopy(tag);
    }

    private shouldCopy(tag: string): void {
        if (!this.package) return;
        const conditionedTag = tag.slice(1, tag.length - 1);
        const importURL = `import '@spectrum-web-components/${this.package}/icons/${conditionedTag}.js';`;
        this.dispatchEvent(
            new CustomEvent('copy-text', {
                bubbles: true,
                composed: true,
                detail: {
                    message: 'Import statement copied to clipboard!',
                    text: importURL,
                },
            })
        );
    }
    private updateSearch(event: Event & { target: Search }): void {
        event.stopPropagation();
        this.search = event.target.value;
    }
    private submit(event: Event & { target: Search }): void {
        event.stopPropagation();
        this.updateSearch(event);
    }
    private renderSearch(): TemplateResult {
        const matchingIcons = this.search
            ? this.filteredIcons.filter((icon) =>
                  icon.name.toLowerCase().includes(this.search.toLowerCase())
              )
            : this.filteredIcons;

        return html`
            <div class="search" part="search">
                <sp-field-label for="search">Spectrum icons:</sp-field-label>
                <sp-search
                    id="search"
                    @keydown=${this.updateSearch}
                    @input=${this.updateSearch}
                    @submit=${this.submit}
                    .value=${this.search}
                    label="Search for icons"
                    autocomplete="off"
                >
                    <sp-help-text slot="help-text">
                        Showing ${matchingIcons.length} of
                        ${this.filteredIcons.length} available icons.
                    </sp-help-text>
                </sp-search>
            </div>
            ${matchingIcons.map((icon) => {
                return html`
                    <bdo
                        class="icon"
                        part="icon"
                        dir="ltr"
                        class="icon"
                        @click=${() => this.shouldCopy(icon.tag)}
                        @keydown=${(event: KeyboardEvent) =>
                            this.handleKeydown(event, icon.tag)}
                        tabindex=${ifDefined(this.package ? '0' : undefined)}
                    >
                        ${icon.story(this.size)} ${icon.tag}
                    </bdo>
                `;
            })}
        `;
    }
    protected override render(): TemplateResult {
        return html`
            ${this.filteredIcons.length
                ? this.renderSearch()
                : html`
                      <slot></slot>
                  `}
            ${this.iconset.map(
                (icon) => html`
                    <bdo class="icon" dir="ltr">
                        <sp-icon
                            size="xl"
                            name=${`${this.name}:${icon}`}
                        ></sp-icon>
                        ${icon}
                    </bdo>
                `
            )}
        `;
    }
}
