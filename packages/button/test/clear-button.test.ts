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

import '@spectrum-web-components/button/sp-clear-button.js';
import { ClearButton } from '@spectrum-web-components/button';
import { expect, fixture, html } from '@open-wc/testing';

describe('Clear Button', () => {
    (
        ['s', 'm', 'l', 'xl'] as (
            | 'xxs'
            | 'xs'
            | 's'
            | 'm'
            | 'l'
            | 'xl'
            | 'xxl'
        )[]
    ).map((size) => {
        it(`loads - ${size}`, async () => {
            const el = await fixture<ClearButton>(
                html`
                    <sp-clear-button
                        size=${size}
                        label="Clear"
                    ></sp-clear-button>
                `
            );

            await expect(el).to.be.accessible();
        });
    });
});
