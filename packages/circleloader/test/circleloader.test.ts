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

import '../sp-circleloader.js';
import { CircleLoader } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('Circle Loader', () => {
    it('loads', async () => {
        const el = await fixture<CircleLoader>(html`
            <sp-circleloader></sp-circleloader>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();

        await expect(el).to.be.accessible();
    });
    it('loads - [indeterminate]', async () => {
        const el = await fixture<CircleLoader>(html`
            <sp-circleloader indeterminate></sp-circleloader>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();

        await expect(el).to.be.accessible();
    });
    it('accepts user `role`', async () => {
        const el = await fixture<CircleLoader>(html`
            <sp-circleloader role="progressbar"></sp-circleloader>
        `);

        await elementUpdated(el);

        expect(el.getAttribute('role')).to.equal('progressbar');
    });
    it('returns to indeterminate', async () => {
        const el = await fixture<CircleLoader>(html`
            <sp-circleloader progress="50"></sp-circleloader>
        `);

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.true;
        expect(el.getAttribute('aria-valuenow')).to.equal('50');

        el.indeterminate = true;

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.false;
    });
});
