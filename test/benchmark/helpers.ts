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

import { html, TemplateResult, render } from 'lit-html';
import { customElement, LitElement, property } from 'lit-element';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/theme-lightest.js';

declare global {
    interface Window {
        tachometerResult: undefined | number;
        tachometerStart: undefined | 'page' | 'element';
    }
}

@customElement('test-fixture')
export class TestFixture extends LitElement {
    @property({ type: Boolean })
    shouldAttachContents = true;

    @property({ type: Object })
    template: TemplateResult = html``;

    remove(): boolean {
        const parent = this.parentNode;
        if (parent) {
            parent.removeChild(this);
            return true;
        }

        return false;
    }

    get root(): ShadowRoot {
        return this.shadowRoot!;
    }

    attachContents(options = { awaitRender: false }) {
        this.shouldAttachContents = true;

        if (options.awaitRender) {
            const rendered = new Promise((res) => {
                requestAnimationFrame(res);
            });

            return rendered;
        } else {
            return this.updateComplete;
        }
    }

    detachContents(options = { awaitRender: false }) {
        this.shouldAttachContents = false;

        if (options.awaitRender) {
            const rendered = new Promise((res) => {
                requestAnimationFrame(res);
            });

            return rendered;
        } else {
            return this.updateComplete;
        }
    }

    render() {
        return html`
            ${this.shouldAttachContents ? this.template : ''}
        `;
    }
}

const defaultOpts = {
    shouldAttachContents: true,
    document: document,
};

interface FixtureOptions {
    shouldAttachContents: boolean;
    document: Document;
}

export const fixture = (
    template: TemplateResult,
    options?: Partial<FixtureOptions>
) => {
    const opts: FixtureOptions = { ...defaultOpts, ...options };
    const tf = opts.document.createElement('test-fixture') as TestFixture;
    tf.shouldAttachContents = opts.shouldAttachContents;
    tf.template = template;

    opts.document.body.appendChild(tf);

    return tf;
};

interface MeasureFixtureCreationOpts {
    afterRender?: (root: HTMLElement) => Promise<unknown>;
    numRenders: number;
}

const defaultMeasureOpts = {
    numRenders: 100,
};

export const measureFixtureCreation = async (
    template: TemplateResult,
    options?: Partial<MeasureFixtureCreationOpts>
) => {
    const opts: MeasureFixtureCreationOpts = {
        ...defaultMeasureOpts,
        ...options,
    };
    const templates = new Array<TemplateResult>(opts.numRenders).fill(template);
    const renderContainer = document.createElement('sp-theme');
    renderContainer.scale = 'large';
    renderContainer.color = 'lightest';

    document.body.appendChild(renderContainer);
    const start = window.tachometerStart === 'page' ? 0 : performance.now();
    render(templates, renderContainer);
    const children = renderContainer.querySelectorAll('*');
    const updates = [...children].filter((el) => 'updateComplete' in el);

    if (updates.length) {
        await Promise.all(
            updates.map((el) => (el as LitElement).updateComplete)
        );
        document.body.offsetWidth;
    } else {
        await new Promise((res) => requestAnimationFrame(res));
    }

    if (opts.afterRender) {
        opts.afterRender(renderContainer);
    }

    const end = performance.now();
    window.tachometerResult = end - start;
    return window.tachometerResult;
};
