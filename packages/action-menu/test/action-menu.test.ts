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

import '../';
import { ActionMenu } from '../';
import '../../menu/lib/index.js';
import '../../menu-item/lib/index.js';
import { fixture, elementUpdated, expect } from '@open-wc/testing';
import { ActionMenuMarkup } from '../stories/';

describe('Action menu', () => {
    it('loads', async () => {
        const el = await fixture<ActionMenu>(
            ActionMenuMarkup({
                ariaLabel: '',
            })
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('loads - [label]', async () => {
        const el = await fixture<ActionMenu>(ActionMenuMarkup());

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();
    });
    it('stays `quiet`', async () => {
        const el = await fixture<ActionMenu>(ActionMenuMarkup());

        await elementUpdated(el);

        expect(el.quiet).to.be.true;

        el.quiet = false;
        await elementUpdated(el);

        expect(el.quiet).to.be.true;
    });
    it('stay `valid`', async () => {
        const el = await fixture<ActionMenu>(ActionMenuMarkup());

        await elementUpdated(el);

        expect(el.invalid).to.be.false;

        el.invalid = true;
        await elementUpdated(el);

        expect(el.invalid).to.be.false;
    });
});
