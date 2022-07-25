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

import { html, TemplateResult } from '@spectrum-web-components/base';
import { elementUpdated, fixture, nextFrame } from '@open-wc/testing';
import { ProvideLang } from '@spectrum-web-components/theme';
import { NumberField } from '@spectrum-web-components/number-field';
import { sendMouse } from '../../../test/plugins/browser.js';

export async function getElFrom(test: TemplateResult): Promise<NumberField> {
    const wrapped = await fixture<HTMLDivElement>(html`
        <div style="--spectrum-alias-ui-icon-chevron-size-75: 20px;">
            ${test}
        </div>
    `);
    const el = wrapped.querySelector('sp-number-field') as NumberField;
    await elementUpdated(el);
    return el;
}

export async function clickBySelector(
    el: NumberField,
    selector: string,
    options: { button?: 'left' | 'right' | 'middle' } = {}
): Promise<void> {
    const target = el.shadowRoot.querySelector(selector) as HTMLElement;
    const targetRect = target.getBoundingClientRect();
    await sendMouse({
        steps: [
            {
                type: 'move',
                position: [
                    targetRect.x + targetRect.width / 2,
                    targetRect.y + targetRect.height / 2,
                ],
                options,
            },
            {
                type: 'down',
                options,
            },
        ],
    });
    await nextFrame();
    await sendMouse({
        steps: [
            {
                type: 'up',
                options,
            },
        ],
    });
    await elementUpdated(el);
}

export function createLanguageContext(
    lang: string
): (event: CustomEvent<ProvideLang>) => void {
    const langResolvers: ProvideLang['callback'][] = [];
    const createLangResolver = (event: CustomEvent<ProvideLang>): void => {
        langResolvers.push(event.detail.callback);
        resolveLanguage();
    };
    const resolveLanguage = (): void => {
        langResolvers.forEach((resolver) => resolver(lang));
    };
    return createLangResolver;
}
