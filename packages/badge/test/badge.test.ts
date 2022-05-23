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

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import '../sp-badge.js';
import '../../icons-workflow/icons/sp-icon-checkmark-circle.js';
import { Badge } from '../src/Badge.js';

describe('Badge', () => {
    it('loads default badge accessibly', async () => {
        const el = await fixture<Badge>(
            html`
                <sp-badge>
                    <sp-icon-checkmark-circle
                        slot="icon"
                    ></sp-icon-checkmark-circle>
                    Icon and label
                </sp-badge>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
