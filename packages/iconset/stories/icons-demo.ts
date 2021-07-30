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
import { IconsetAddedDetail } from '../';
import {
    SpectrumElement,
    css,
    html,
    TemplateResult,
    CSSResultGroup,
    property,
    customElement,
} from '@spectrum-web-components/base';
import { Search } from '@spectrum-web-components/search';
import '@spectrum-web-components/search/sp-search.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import bodyStyles from '@spectrum-web-components/styles/body.js';
import '@spectrum-web-components/icon/sp-icon.js';

@customElement('delayed-ready')
export class DelayedReady extends SpectrumElement {
    _delayedReady!: Promise<void>;
    _resolveDelayedReady!: () => void;

    protected render(): TemplateResult {
        return html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
    }

    protected firstUpdated(): void {
        this._delayedReady = new Promise(
            (res) => (this._resolveDelayedReady = res)
        );
    }

    protected async getUpdateComplete(): Promise<boolean> {
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
    public size = 'm';

    @property()
    public search = '';

    @property({ attribute: false })
    public icons: {
        name: string;
        story(size: string): TemplateResult;
        tag: string;
    }[] = [];

    private iconset: string[] = [];
    public constructor() {
        super();
        this.iconset = [];
        this.handleIconSetAdded = this.handleIconSetAdded.bind(this);
    }
    public connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('sp-iconset-added', this.handleIconSetAdded);
    }
    public disconnectedCallback(): void {
        window.removeEventListener('sp-iconset-added', this.handleIconSetAdded);
        super.disconnectedCallback();
    }
    public handleIconSetAdded(event: CustomEvent<IconsetAddedDetail>): void {
        const { iconset } = event.detail;
        this.iconset = iconset.getIconList();
        this.requestUpdate();
    }
    public static get styles(): CSSResultGroup {
        return [
            ...bodyStyles,
            css`
                :host {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 20px;
                }
                .icon {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                sp-icon {
                    margin-bottom: 10px;
                }
                .search {
                    grid-column-start: 1;
                    grid-column-end: -1;
                }
            `,
        ];
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
            ? this.icons.filter(
                  (icon) => icon.name.toLowerCase().search(this.search) !== -1
              )
            : this.icons;
        return html`
            <div class="search">
                <sp-field-label for="search">Spectrum icons:</sp-field-label>
                <sp-search
                    id="search"
                    @keydown=${this.updateSearch}
                    @input=${this.updateSearch}
                    @submit=${this.submit}
                    .value=${this.search}
                    label="Search for icons"
                    autocomplete="off"
                ></sp-search>
                <p class="spectrum-Body spectrum-Body--sizeM">
                    Showing ${matchingIcons.length} of ${this.icons.length}
                    available icons.
                </p>
            </div>
            ${matchingIcons.map((icon) => {
                return html`
                    <bdo class="icon" dir="ltr" class="icon">
                        ${icon.story(this.size)} ${icon.tag}
                    </bdo>
                `;
            })}
        `;
    }
    protected render(): TemplateResult {
        return html`
            ${this.icons.length
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
