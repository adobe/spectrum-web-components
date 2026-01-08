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

import { Asset } from '@spectrum-web-components/asset';
import { testForLitDevWarnings } from '../../../test/testing-helpers';
import { Default, File, Folder } from '../stories/asset.stories.js';

describe('Asset', () => {
    testForLitDevWarnings(async () => await fixture<Asset>(Default()));
    it('loads default asset accessibly', async () => {
        const el = await fixture<Asset>(Default());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [variant="file"] accessibly', async () => {
        const el = await fixture<Asset>(File());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads [variant="folder"] accessibly', async () => {
        const el = await fixture<Asset>(Folder());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
