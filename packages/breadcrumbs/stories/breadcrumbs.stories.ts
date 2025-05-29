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
import { html, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import { LitElement } from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import {
    getBreadcrumbs,
    getBreadcrumbsWithLinks,
    getResizableStyles,
    StoryArgs,
    Template,
} from './template.js';
import { argTypes } from './args.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { spreadProps } from '../../../test/lit-helpers.js';
import '@spectrum-web-components/button/sp-button.js';

export default {
    title: 'Breadcrumbs',
    component: 'sp-breadcrumbs',
    args: {
        'max-visible-items': 4,
    },
    argTypes,
};

export const Default = (args: StoryArgs): TemplateResult => Template(args);

export const Disabled = (args: StoryArgs): TemplateResult => Template(args);
Disabled.args = {
    disabled: true,
};

export const Compact = (args: StoryArgs): TemplateResult => Template(args);
Compact.args = {
    compact: true,
};

export const Links = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-breadcrumbs
            ${spreadProps(args)}
            max-visible-items=${ifDefined(args['max-visible-items'])}
            @change=${args.onChange}
        >
            ${getBreadcrumbsWithLinks(4)}
        </sp-breadcrumbs>
    `;
};

class AddItemsStoryBreadcrumbs extends LitElement {
    private _counter = 2;
    private _items: TemplateResult[] = [];

    @property({ type: Number })
    accessor maxVisibleItems = 4;

    protected override firstUpdated(): void {
        this._items = getBreadcrumbsWithLinks(this._counter);
        this.requestUpdate();
    }

    protected override render(): TemplateResult {
        return html`
            <sp-breadcrumbs
                max-visible-items=${this.maxVisibleItems}
                @slotchange=${() => {
                    const breadcrumbs =
                        this.shadowRoot?.querySelector('sp-breadcrumbs');
                    if (breadcrumbs) {
                        breadcrumbs.requestUpdate();
                    }
                }}
            >
                ${this._items}
            </sp-breadcrumbs>
            <sp-button
                @click=${() => {
                    this._counter++;
                    this._items = getBreadcrumbsWithLinks(this._counter);
                    this.requestUpdate();
                }}
                style="margin-top: 8px;"
                id="add-more-items"
            >
                Add more items (current: ${this._counter})
            </sp-button>
        `;
    }
}

customElements.define('add-items-story-breadcrumbs', AddItemsStoryBreadcrumbs);

export const AddItemsDynamic = (args: StoryArgs): TemplateResult => {
    return html`
        <add-items-story-breadcrumbs
            maxVisibleItems=${ifDefined(args['max-visible-items'])}
        ></add-items-story-breadcrumbs>
    `;
};

AddItemsDynamic.swc_vrt = {
    skip: true,
};

export const ShowRoot = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-breadcrumbs
            ${spreadProps(args)}
            max-visible-items=${ifDefined(args['max-visible-items'])}
            @change=${args.onChange}
        >
            <sp-breadcrumb-item value="Home" slot="root">
                Home
            </sp-breadcrumb-item>
            ${getBreadcrumbs(6)}
        </sp-breadcrumbs>
    `;
};

export const resizableBehavior = (args: StoryArgs): TemplateResult => {
    return html`
        <div class="resizable-container">
            ${getResizableStyles()}

            <sp-breadcrumbs
                ${spreadProps(args)}
                max-visible-items=${ifDefined(args['max-visible-items'])}
                @change=${args.onChange}
            >
                ${getBreadcrumbs(4)}
            </sp-breadcrumbs>
        </div>
    `;
};
