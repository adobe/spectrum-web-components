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

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import {
    Theme,
    ThemeData,
    ThemeFragmentMap,
} from '@spectrum-web-components/theme';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { css } from '@spectrum-web-components/base';

type TestableThemeConstructor = {
    instances: Set<Theme>;
    themeFragmentsByKind: ThemeFragmentMap;
};

describe('Themes', () => {
    it('loads - light', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme theme="classic" color="light"></sp-theme>
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
                <sp-theme theme="express"></sp-theme>
            `
        );

        await elementUpdated(el);
        const testableTheme = Theme as unknown as TestableThemeConstructor;
        expect(testableTheme.instances.has(el), 'first').to.be.true;
        expect(testableTheme.instances.size).to.equal(1);

        el.remove();
        expect(testableTheme.instances.has(el), 'second').to.be.false;
        expect(testableTheme.instances.size).to.equal(0);

        document.body.append(el);
        expect(testableTheme.instances.has(el), 'third').to.be.true;
        expect(testableTheme.instances.size).to.equal(1);
    });
    it('stops propagation on `sp-query-theme` events', async () => {
        const test = await fixture<Theme>(
            html`
                <sp-theme
                    theme="express"
                    color="lightest"
                    scale="medium"
                    lang="de"
                >
                    <sp-theme color="darkest" scale="large" lang="fr">
                        <div></div>
                    </sp-theme>
                </sp-theme>
            `
        );

        const el = test.querySelector('div') as HTMLDivElement;
        const queryThemeDetail: ThemeData = {
            color: undefined,
            scale: undefined,
            lang: undefined,
            theme: undefined,
        };
        const queryThemeEvent = new CustomEvent<ThemeData>('sp-query-theme', {
            bubbles: true,
            composed: true,
            detail: queryThemeDetail,
            cancelable: true,
        });
        el.dispatchEvent(queryThemeEvent);
        expect(queryThemeDetail.color).to.not.equal('lightest');
        expect(queryThemeDetail.scale).to.not.equal('medium');
        expect(queryThemeDetail.lang).to.not.equal('de');
        expect(queryThemeDetail.theme).to.not.equal('express');
        expect(queryThemeDetail.color).to.equal('darkest');
        expect(queryThemeDetail.scale).to.equal('large');
        expect(queryThemeDetail.lang).to.equal('fr');
        expect(queryThemeDetail.theme).to.equal('spectrum');
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

describe('App styles', () => {
    it('applies app fragments', async () => {
        const el = await fixture<Theme>(
            html`
                <sp-theme color="light">
                    <style>
                        div {
                            padding: var(--app-padding);
                        }
                    </style>
                    <div></div>
                </sp-theme>
            `
        );
        const div = el.querySelector('div') as HTMLDivElement;

        await elementUpdated(el);

        const preStylesDiv = getComputedStyle(div);
        expect(preStylesDiv.paddingBlockStart).to.equal('0px');

        Theme.registerThemeFragment(
            'app',
            'app',
            css`
                :host {
                    --app-padding: 10px;
                }
            `
        );
        await elementUpdated(el);

        const postStylesDiv = getComputedStyle(div);
        expect(postStylesDiv.paddingBlockStart).to.equal('10px');

        (
            Theme as unknown as TestableThemeConstructor
        ).themeFragmentsByKind.delete('app');
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
        expect(el.hasAttribute('scale')).to.be.false;

        if (el.shadowRoot.adoptedStyleSheets) {
            expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(2);
        } else {
            expect(
                [...el.shadowRoot.querySelectorAll('style')].length
            ).to.equal(2);
        }

        await elementUpdated(el);

        // Invalid initial value falls back to default
        el.setAttribute('scale', 'fish');
        expect(el.getAttribute('scale')).to.equal('medium');

        if (el.shadowRoot.adoptedStyleSheets) {
            expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(2);
        } else {
            expect(
                [...el.shadowRoot.querySelectorAll('style')].length
            ).to.equal(2);
        }

        el.color = 'dark';
        el.scale = 'medium';

        await elementUpdated(el);
        expect(el.getAttribute('color')).to.equal('dark');
        expect(el.getAttribute('scale')).to.equal('medium');

        if (el.shadowRoot.adoptedStyleSheets) {
            expect(el.shadowRoot.adoptedStyleSheets.length, 'all').to.equal(3);
        } else {
            expect(
                [...el.shadowRoot.querySelectorAll('style')].length
            ).to.equal(3);
        }

        // Invalid second + value fallsback to previous
        el.setAttribute('color', 'fish');

        await elementUpdated(el);
        expect(el.getAttribute('color')).to.equal('dark');

        if (el.shadowRoot.adoptedStyleSheets) {
            expect(el.shadowRoot.adoptedStyleSheets.length, 'last').to.equal(3);
        } else {
            expect(
                [...el.shadowRoot.querySelectorAll('style')].length
            ).to.equal(3);
        }
    });
});
