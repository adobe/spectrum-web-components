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

import '../';
import { Theme } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

type TestableTheme = {
    hasAdoptedStyles: boolean;
};

type TestableThemeConstructor = {
    instances: Set<Theme>;
};

describe('Themes', () => {
    it('loads - light', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme color="light"></sp-theme>
            `
        );

        await elementUpdated(el);

        expect(el).to.exist;
        expect(el).shadowDom.to.exist;
    });
    it('loads - dark', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme color="dark"></sp-theme>
            `
        );

        await elementUpdated(el);

        expect(el).to.exist;
        expect(el).shadowDom.to.exist;
    });
    it('loads - unkown', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme color="unknown" scale="unknown"></sp-theme>
            `
        );

        await elementUpdated(el);

        expect(el).to.exist;
        expect(el).shadowDom.to.exist;
    });
    it('adds an instance only once', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme></sp-theme>
            `
        );

        await elementUpdated(el);
        const testableTheme = (Theme as unknown) as TestableThemeConstructor;
        expect(testableTheme.instances.has(el), 'first').to.be.true;
        expect(testableTheme.instances.size).to.equal(1);

        el.remove();
        expect(testableTheme.instances.has(el), 'second').to.be.false;
        expect(testableTheme.instances.size).to.equal(0);

        document.body.append(el);
        expect(testableTheme.instances.has(el), 'third').to.be.true;
        expect(testableTheme.instances.size).to.equal(1);
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

        expect(el).to.exist;
        expect(el).shadowDom.to.exist;
    });
});

describe('Medium', () => {
    it('loads', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme scale="medium"></sp-theme>
            `
        );

        await elementUpdated(el);

        expect(el).to.exist;
        expect(el).shadowDom.to.exist;
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
        expect(
            ((el as unknown) as TestableTheme).hasAdoptedStyles,
            'Color with default'
        ).to.be.true;

        // Invalid initial value falls back to default
        el.setAttribute('scale', 'fish');
        expect(el.getAttribute('scale')).to.equal('medium');
        expect(
            ((el as unknown) as TestableTheme).hasAdoptedStyles,
            'Color with default, afer invalid scale'
        ).to.be.true;

        el.color = 'dark';
        el.scale = 'medium';
        expect(el.getAttribute('color')).to.equal('dark');
        expect(el.getAttribute('scale')).to.equal('medium');
        expect(
            ((el as unknown) as TestableTheme).hasAdoptedStyles,
            'Both as properties'
        ).to.be.true;

        // Invalid second + value fallsback to previous
        el.setAttribute('color', 'fish');
        expect(el.getAttribute('color')).to.equal('dark');
        expect(
            ((el as unknown) as TestableTheme).hasAdoptedStyles,
            'Both after invalid value fallback'
        ).to.be.true;
    });
});
