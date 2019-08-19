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
import { html, CSSResultArray } from 'lit-element';
import './code-example';
import { ComponentDocs } from '../../components';
import { ComponentApiDocs } from '../../api-docs';
import { LayoutElement } from './layout';
import componentStyles from './markdown.css';
import { AppRouter } from '../router';
import { TabList } from '../../../src/tab-list/tab-list';

enum TabValue {
    Api = 'api',
    Examples = 'examples',
}

class ComponentElement extends LayoutElement {
    public location?: {
        baseUrl: string;
        params: {
            component: string;
            tab: string;
        };
        pathname: string;
    };

    public static get styles(): CSSResultArray {
        return [super.styles, componentStyles];
    }

    public get componentName(): string {
        if (this.location) {
            return `sp-${this.location.params.component}`;
        }
        return '';
    }

    public get tab(): TabValue {
        if (this.location && this.location.params.tab === 'api') {
            return TabValue.Api;
        }
        return TabValue.Examples;
    }

    public handleTabChange(event: Event) {
        if (!this.location || !event.target) return;

        const target = event.target as TabList;
        const selected = target.selected as TabValue;
        AppRouter.changeParams({
            component: this.location.params.component,
            tab: selected,
        });
    }

    renderContent() {
        let result;
        if (this.location && this.location.params) {
            result = html`
                <article class="spectrum-Typography">
                    <div id="title-header" class="spectrum-Article">
                        <p
                            class="spectrum-Heading1--display spectrum-Heading1--quiet"
                        >
                            ${this.componentName}
                        </p>
                    </div>
                    <sp-tab-list
                        selected="${this.tab}"
                        @change="${this.handleTabChange}"
                        direction="horizontal"
                    >
                        <sp-tab value="examples" label="Examples"></sp-tab>
                        <sp-tab value="api" label="API"></sp-tab>
                    </sp-tab-list>
                    ${this.tab === TabValue.Examples
                        ? ComponentDocs.get(this.location.params.component)
                        : ComponentApiDocs.get(this.location.params.component)}
                </article>
            `;
        }
        return result || super.renderContent();
    }
}
customElements.define('docs-component', ComponentElement);
