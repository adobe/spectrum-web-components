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

import '@spectrum-web-components/theme/sp-theme.js';
import { Theme, ThemeFragmentMap } from '@spectrum-web-components/theme';
import coreStyles from '@spectrum-web-components/theme/src/theme.css.js';
import lightStyles from '@spectrum-web-components/theme/src/theme-light.css.js';
import lightestStyles from '@spectrum-web-components/theme/src/theme-lightest.css.js';
import darkStyles from '@spectrum-web-components/theme/src/theme-dark.css.js';
import darkestStyles from '@spectrum-web-components/theme/src/theme-darkest.css.js';
import largeStyles from '@spectrum-web-components/theme/src/scale-large.css.js';
import mediumStyles from '@spectrum-web-components/theme/src/scale-medium.css.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

type TestableThemeConstructor = {
    instances: Set<Theme>;
    themeFragmentsByKind: ThemeFragmentMap;
};

describe('Themes - lazy', () => {
    beforeEach(() => {
        (
            Theme as unknown as TestableThemeConstructor
        ).themeFragmentsByKind.clear();
        // Core is registered by default in `theme.ts`
        Theme.registerThemeFragment('spectrum', 'system', coreStyles);
    });
    after(() => {
        Theme.registerThemeFragment('light', 'color', lightStyles);
        Theme.registerThemeFragment('lightest', 'color', lightestStyles);
        Theme.registerThemeFragment('dark', 'color', darkStyles);
        Theme.registerThemeFragment('darkest', 'color', darkestStyles);
        Theme.registerThemeFragment('large', 'scale', largeStyles);
        Theme.registerThemeFragment('medium', 'scale', mediumStyles);
    });
    it('loads w/ no themes and none set', async () => {
        const el = await fixture<Theme>(html`
            <sp-theme></sp-theme>
        `);

        await elementUpdated(el);

        if (el.shadowRoot.adoptedStyleSheets) {
            expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
        } else {
            expect(
                [...el.shadowRoot.querySelectorAll('style')].length
            ).to.equal(1);
        }
        expect(el.color).to.equal('');
        expect(el.scale).to.equal('');
    });
    it('loads w/ themes and none set', async () => {
        const el = await fixture<Theme>(html`
            <sp-theme></sp-theme>
        `);

        await elementUpdated(el);

        Theme.registerThemeFragment('light', 'color', lightStyles);
        Theme.registerThemeFragment('medium', 'scale', mediumStyles);

        await elementUpdated(el);

        if (el.shadowRoot.adoptedStyleSheets) {
            expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
        } else {
            expect(
                [...el.shadowRoot.querySelectorAll('style')].length
            ).to.equal(1);
        }
        expect(el.color).to.equal('light');
        expect(el.scale).to.equal('medium');
    });
    it('loads w/ no themes', async () => {
        const el = await fixture<Theme>(html`
            <sp-theme color="light" scale="large"></sp-theme>
        `);

        await elementUpdated(el);

        if (el.shadowRoot.adoptedStyleSheets) {
            expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
        } else {
            expect(
                [...el.shadowRoot.querySelectorAll('style')].length
            ).to.equal(1);
        }
    });
    it('loads w/ not enough themes', async () => {
        const el = await fixture<Theme>(html`
            <sp-theme color="lightest" scale="large"></sp-theme>
        `);

        await elementUpdated(el);

        Theme.registerThemeFragment('light', 'color', lightStyles);
        Theme.registerThemeFragment('medium', 'scale', mediumStyles);

        await elementUpdated(el);

        if (el.shadowRoot.adoptedStyleSheets) {
            expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
        } else {
            expect(
                [...el.shadowRoot.querySelectorAll('style')].length
            ).to.equal(1);
        }
    });
    it('loads w/ lazy themes', async () => {
        const el = await fixture<Theme>(html`
            <sp-theme color="lightest" scale="large"></sp-theme>
        `);

        await elementUpdated(el);

        Theme.registerThemeFragment('light', 'color', lightStyles);
        Theme.registerThemeFragment('medium', 'scale', mediumStyles);

        await elementUpdated(el);

        if (el.shadowRoot.adoptedStyleSheets) {
            expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(1);
        } else {
            expect(
                [...el.shadowRoot.querySelectorAll('style')].length
            ).to.equal(1);
        }

        Theme.registerThemeFragment('lightest', 'color', lightestStyles);
        Theme.registerThemeFragment('large', 'scale', largeStyles);

        await elementUpdated(el);

        if (el.shadowRoot.adoptedStyleSheets) {
            expect(el.shadowRoot.adoptedStyleSheets.length).to.equal(3);
        } else {
            expect(
                [...el.shadowRoot.querySelectorAll('style')].length
            ).to.equal(3);
        }
    });
});
