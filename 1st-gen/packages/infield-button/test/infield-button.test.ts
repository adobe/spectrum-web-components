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
import { elementUpdated, expect, fixture } from '@open-wc/testing';

import '@spectrum-web-components/infield-button/sp-infield-button.js';
import { InfieldButton } from '@spectrum-web-components/infield-button';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { Default, stacked } from '../stories/infield-button.stories.js';
import { args } from '../stories/index.js';

describe('InfieldButton', () => {
    testForLitDevWarnings(
        async () => await fixture<InfieldButton>(Default(args))
    );
    it('loads default infield-button accessibly', async () => {
        const el = await fixture<InfieldButton>(Default(args));

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads stacked infield-button accessibly', async () => {
        const el = await fixture<InfieldButton>(stacked());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
