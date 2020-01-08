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
import { html, CSSResultArray, TemplateResult } from 'lit-element';
import { LayoutElement } from './layout';
import componentStyles from './markdown.css';
import { AppRouter } from '../router';
import { TabList } from '../../../packages/tab-list';
import docs from '../../custom-elements.json';

let ComponentDocs: Map<string, TemplateResult>;

enum TabValue {
    Api = 'api',
    Examples = 'examples',
}

interface JsDocTagParsed {
    tag: string;
    name?: string;
    attribute?: string;
    type?: string;
    optional?: boolean;
    default?: string;
    description?: string;
}

type ParsedTagArray = JsDocTagParsed[];

type TagType = {
    description: string;
    properties?: ParsedTagArray;
    slots?: ParsedTagArray;
    events?: ParsedTagArray;
    cssProperties?: ParsedTagArray;
};

function sortByName(a: JsDocTagParsed, b: JsDocTagParsed) {
    if (!a.name || !b.name) {
        return 0;
    }
    if (a.name > b.name) {
        return 1;
    }
    if (b.name > a.name) {
        return -1;
    }
    return 0;
}

function buildTable(
    title: string,
    rowData: ParsedTagArray,
    headings: string[],
    cells: ((property: JsDocTagParsed) => TemplateResult)[]
): TemplateResult {
    return html`
        <h2 class="spectrum-Heading2--quiet">${title}</h2>
        <table class="spectrum-Table">
            <thead class="spectrum-Table-head">
                <tr>
                    ${headings.map(
                        (heading) => html`
                            <th class="spectrum-Table-headCell">
                                ${heading}
                            </th>
                        `
                    )}
                </tr>
            </thead>
            <tbody class="spectrum-Table-body">
                ${rowData.sort(sortByName).map(
                    (property) => html`
                        <tr class="spectrum-Table-row">
                            ${cells.map(
                                (cell) => html`
                                    <td class="spectrum-Table-cell">
                                        ${cell(property)}
                                    </td>
                                `
                            )}
                        </tr>
                    `
                )}
            </tbody>
        </table>
    `;
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

    private docsLoaded = false;

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

    loadDocs() {
        import('../../components').then((module) => {
            ComponentDocs = module.ComponentDocs;
            this.docsLoaded = true;
            this.requestUpdate();
        });
    }

    shouldUpdate() {
        if (!this.docsLoaded) {
            this.loadDocs();
        }
        return this.docsLoaded;
    }

    renderContent() {
        let result;
        if (this.location && this.location.params) {
            const APIdocs = docs.tags.find(
                (el) => el.name === this.componentName
            ) as TagType;
            const componentDocs = ComponentDocs.get(
                this.location.params.component
            );
            result = html`
                <article class="spectrum-Typography">
                    <div id="title-header" class="spectrum-Article">
                        <h1
                            class="spectrum-Heading1--display spectrum-Heading1--quiet"
                        >
                            ${this.componentName}
                        </h1>
                    </div>
                    ${APIdocs && componentDocs
                        ? html`
                              <sp-tab-list
                                  selected="${this.tab}"
                                  @change="${this.handleTabChange}"
                                  direction="horizontal"
                              >
                                  <sp-tab
                                      value="examples"
                                      label="Examples"
                                  ></sp-tab>
                                  <sp-tab value="api" label="API"></sp-tab>
                              </sp-tab-list>
                          `
                        : html``}
                    ${componentDocs && this.tab === TabValue.Examples
                        ? componentDocs
                        : this.renderDocs(APIdocs)}
                </article>
            `;
        }
        return result || super.renderContent();
    }

    protected renderDocs(tag: TagType): TemplateResult {
        return html`
            <p>${tag.description}</p>
            ${tag.properties && tag.properties.length
                ? buildTable(
                      'Properties',
                      tag.properties,
                      ['Name', 'Attribute', 'Type', 'Default', 'Description'],
                      [
                          (property) =>
                              html`
                                  <code>${property.name}</code>
                              `,
                          (property) =>
                              html`
                                  <code>${property.attribute || ''}</code>
                              `,
                          (property) =>
                              html`
                                  <code>${property.type || ''}</code>
                              `,
                          (property) =>
                              html`
                                  <code>${property.default || ''}</code>
                              `,
                          (property) =>
                              html`
                                  ${property.description || ''}
                              `,
                      ]
                  )
                : html``}
            ${tag.slots && tag.slots.length
                ? buildTable(
                      'Slots',
                      tag.slots,
                      ['Name', 'Description'],
                      [
                          (property) =>
                              html`
                                  <code>${property.name}</code>
                              `,
                          (property) =>
                              html`
                                  ${property.description || ''}
                              `,
                      ]
                  )
                : html``}
            ${tag.events && tag.events.length
                ? buildTable(
                      'Events',
                      tag.events,
                      ['Name'],
                      [
                          (property) =>
                              html`
                                  <code>${property.name}</code>
                              `,
                      ]
                  )
                : html``}
            ${tag.cssProperties && tag.cssProperties.length
                ? buildTable(
                      'CSS Custom Properties',
                      tag.cssProperties,
                      ['Name', 'Type', 'Default'],
                      [
                          (property) =>
                              html`
                                  <code>${property.name}</code>
                              `,
                          (property) =>
                              html`
                                  <code>${property.type || ''}</code>
                              `,
                          (property) =>
                              html`
                                  <code>
                                      ${(property.default || '""').slice(
                                          1,
                                          (property.default || '""').length - 1
                                      )}
                                  </code>
                              `,
                      ]
                  )
                : html``}
        `;
    }
}
customElements.define('docs-component', ComponentElement);
