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

import { html, LitElement, render, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/scale-large.js';
import '@spectrum-web-components/theme/theme-lightest.js';

declare global {
    interface Window {
        tachometerResult: undefined | number;
        tachometerStart: undefined | 'page' | 'element';
        tachometerEnd: undefined | 'updateComplete' | 'paint';
    }
}

/**
 * Runs `callback` shortly after the next browser Frame is produced.
 *
 * Adopted from https://webperf.tips/tip/measuring-paint-time/ but possibly replaceable by
 * a performance observer with additional work:
 * https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/PerformanceObserver
 */
function runAfterFramePaint(callback: () => void) {
    // Queue a "before Render Steps" callback via requestAnimationFrame.
    requestAnimationFrame(() => {
        const messageChannel = new MessageChannel();

        // Setup the callback to run in a Task
        messageChannel.port1.onmessage = callback;

        // Queue the Task on the Task Queue
        messageChannel.port2.postMessage(undefined);
    });
}

@customElement('test-fixture')
export class TestFixture extends LitElement {
    @property({ type: Boolean })
    shouldAttachContents = true;

    @property({ type: Object })
    template: TemplateResult = html``;

    override remove(): boolean {
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

    override render() {
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
    let updates = [...children].filter(
        (el) => 'updateComplete' in el
    ) as LitElement[];

    if (updates.length) {
        while (updates.length) {
            const results = await Promise.all(
                updates.map((el) => el.updateComplete)
            );
            updates = results.reduce((acc, result, index) => {
                if (!result) {
                    acc.push(updates[index]);
                }
                return acc;
            }, [] as LitElement[]);
        }
    }

    if (window.tachometerEnd === 'paint') {
        await new Promise<void>((res) => runAfterFramePaint(res));
    }

    if (opts.afterRender) {
        opts.afterRender(renderContainer);
    }

    const end = performance.now();
    window.tachometerResult = end - start;
    return window.tachometerResult;
};
