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
import { Theme } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('Themes', () => {
    it('loads - light', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme color="light"></sp-theme>
            `
        );

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
    });
    it('loads - dark', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme color="dark"></sp-theme>
            `
        );

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
    });
    it('loads - unkown', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme color="unknown" scale="unknown"></sp-theme>
            `
        );

        await elementUpdated(el);

        expect(el).shadowDom.to.equalSnapshot();
    });
});

describe('Lightest', () => {
    it('loads', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme color="lightest"></sp-theme>
            `
        );

        await elementUpdated(el);

        expect(el).to.not.be.undefined;
        expect(el).shadowDom.to.equalSnapshot();
    });
});

describe('Medium', () => {
    it('loads', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme size="medium"></sp-theme>
            `
        );

        await elementUpdated(el);

        expect(el).to.not.be.undefined;
        expect(el).shadowDom.to.equalSnapshot();
    });
});

describe('Setting attributes', () => {
    it('loads', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme color="light"></sp-theme>
            `
        );

        await elementUpdated(el);

        expect(el).to.not.be.undefined;
        expect(el).shadowDom.to.equalSnapshot();

        el.color = 'dark';
        el.size = 'medium';
        expect(el.getAttribute('color')).to.equal('dark');
        expect(el.getAttribute('size')).to.equal('medium');

        // Invalid value
        el.setAttribute('color', 'fish');
        expect(el.getAttribute('color')).to.equal('fish');
        expect(el.color).to.equal('light');
    });
});
