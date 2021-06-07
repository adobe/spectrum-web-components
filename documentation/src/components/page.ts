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
import { html, TemplateResult, query } from '@spectrum-web-components/base';
import { LayoutElement } from './layout.js';

export class Page extends LayoutElement {
    @query('#layout-content')
    contentElement?: HTMLDivElement;

    public renderContent(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected firstUpdated(): void {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://use.typekit.net/evk7lzt.css';
        document.head.append(link);
    }

    public resetScroll() {
        if (!this.contentElement) return;

        this.contentElement.scrollTop = 0;
        this.open = false;
    }
}

customElements.define('docs-page', Page);
