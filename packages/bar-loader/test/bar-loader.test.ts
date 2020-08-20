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

import { fixture, elementUpdated, expect, html } from '@open-wc/testing';

import '../sp-bar-loader.js';
import { BarLoader } from '..';

describe('BarLoader', () => {
    it('loads default bar-loader accessibly', async () => {
        const el = await fixture<BarLoader>(
            html`
                <sp-bar-loader></sp-bar-loader>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();

        await expect(el).to.be.accessible();
    });

    it('accepts a changing progress', async () => {
        const el = await fixture<BarLoader>(html`
            <sp-bar-loader label="Changing value"></sp-bar-loader>
        `);

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.true;
        expect(el.getAttribute('aria-valuenow')).to.equal('0');

        el.progress = 50;

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.true;
        expect(el.getAttribute('aria-valuenow')).to.equal('50');

        el.progress = 100;

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.true;
        expect(el.getAttribute('aria-valuenow')).to.equal('100');
    });
    it('loads - [indeterminate]', async () => {
        const el = await fixture<BarLoader>(html`
            <sp-bar-loader indeterminate></sp-bar-loader>
        `);

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();

        await expect(el).to.be.accessible();
    });
    it('accepts user `role`', async () => {
        const el = await fixture<BarLoader>(html`
            <sp-bar-loader role="progressbar"></sp-bar-loader>
        `);

        await elementUpdated(el);

        expect(el.getAttribute('role')).to.equal('progressbar');
    });
    it('returns to indeterminate', async () => {
        const el = await fixture<BarLoader>(html`
            <sp-bar-loader
                progress="50"
                label="Sometimes indeterminate"
            ></sp-bar-loader>
        `);

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.true;
        expect(el.getAttribute('aria-valuenow')).to.equal('50');

        el.indeterminate = true;

        await elementUpdated(el);

        expect(el.hasAttribute('aria-valuenow')).to.be.false;
    });
});
