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

import { fixture, elementUpdated, expect } from '@open-wc/testing';

import '../sp-button-group.js';
import { ButtonGroup } from '..';
import { buttons, buttonsVertical } from '../stories/button-group.stories.js';

describe('Buttongroup', () => {
    it('loads default button-group accessibly with sp-button', async () => {
        const el = await fixture<ButtonGroup>(buttons());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads default button-group[vertial] accessibly with sp-button', async () => {
        const el = await fixture<ButtonGroup>(buttonsVertical());

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
