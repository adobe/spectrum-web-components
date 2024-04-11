/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import '../sp-breadcrumbs.js';
import { Breadcrumbs } from '..';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { TemplateResult } from 'lit-html';

describe('Breadcrumbs', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Breadcrumbs>(
                html`
                    <sp-breadcrumbs>
                        <sp-breadcrumb-item href=${window.location.href}>
                            Breadcrumb 1
                        </sp-breadcrumb-item>
                        <sp-breadcrumb-item href=${window.location.href}>
                            Breadcrumb 2
                        </sp-breadcrumb-item>
                        <sp-breadcrumb-item href=${window.location.href}>
                            Breadcrumb 3
                        </sp-breadcrumb-item>
                        <sp-breadcrumb-item href=${window.location.href}>
                            Breadcrumb 4
                        </sp-breadcrumb-item>
                    </sp-breadcrumbs>
                `
            )
    );
    it('loads default breadcrumbs accessibly', async () => {
        const el = await fixture<Breadcrumbs>(
            html`
                <sp-breadcrumbs>${getBreadcrumbs(5)}</sp-breadcrumbs>
            `
        );
        await elementUpdated(el);
        await expect(el).to.be.accessible();

        expect(el.getAttribute('role')).to.equal('navigation');
        expect(el.getAttribute('aria-label')).to.equal('Breadcrumbs');

        el.label = 'Custom accessible name';

        await elementUpdated(el);
        expect(el.getAttribute('aria-label')).to.equal(
            'Custom accessible name'
        );

        const listItems = el.shadowRoot.querySelectorAll('[role="listitem"]');
        // 4 is the default maximum visible items
        expect(listItems.length).to.equal(4);
    });

    it('manages disabled state', async () => {
        const el = await fixture<Breadcrumbs>(
            html`
                <sp-breadcrumbs disabled>${getBreadcrumbs(5)}</sp-breadcrumbs>
            `
        );

        const breadcrumbs =
            el.shadowRoot.querySelectorAll('sp-breadcrumb-item');

        breadcrumbs.forEach((breadcrumb, index) => {
            if (index !== breadcrumbs.length - 1) {
                expect(breadcrumb.hasAttribute('disabled')).to.be.true;
            } else {
                expect(breadcrumb.hasAttribute('disabled')).to.be.false;
            }
        });
    });

    it('renders an action menu that contains the first 4 items, maximum visible items', async () => {
        const el = await fixture<Breadcrumbs>(
            html`
                <sp-breadcrumbs>${getBreadcrumbs(8)}</sp-breadcrumbs>
            `
        );

        await elementUpdated(el);
        const menu = el.shadowRoot.querySelector('sp-action-menu');
        const menuItems = menu?.querySelectorAll('sp-menu-item');

        expect(menuItems?.length).to.equal(4);
        expect(menu).to.exist;
        menuItems?.forEach((menuItem, index) => {
            expect(menuItem.textContent).to.equal(`Breadcrumb ${index}`);
        });
    });

    it('allows multiple visible items than maximum', async () => {
        const breadcrumbsCount = 8;

        const el = await fixture<Breadcrumbs>(
            html`
                <sp-breadcrumbs max-visible-items="8">
                    ${getBreadcrumbs(breadcrumbsCount)}
                </sp-breadcrumbs>
            `
        );

        await elementUpdated(el);
        const menu = el.shadowRoot.querySelector('sp-action-menu');
        const breadcrumbs =
            el.shadowRoot.querySelectorAll('sp-breadcrumb-item');

        expect(breadcrumbs.length).to.be.equal(breadcrumbsCount);
        expect(menu).to.be.null;
    });

    it('shows the root breadcrumb', async () => {
        const breadcrumbsCount = 8;

        const el = await fixture<Breadcrumbs>(
            html`
                <sp-breadcrumbs compact show-root>
                    ${getBreadcrumbs(breadcrumbsCount)}
                </sp-breadcrumbs>
            `
        );

        await elementUpdated(el);
        const menu = el.shadowRoot.querySelector('sp-action-menu');
        const breadcrumbs =
            el.shadowRoot.querySelectorAll('sp-breadcrumb-item');
        expect(breadcrumbs[0].textContent?.trim()).to.equal('Breadcrumb 0');
        expect(menu).to.exist;
    });
});

const getBreadcrumbs = (count: number): TemplateResult[] => {
    const breadcrumbs: TemplateResult[] = [];
    for (let i = 0; i < count; i++) {
        breadcrumbs.push(
            html`
                <sp-breadcrumb-item href=${window.location.href}>
                    Breadcrumb ${i}
                </sp-breadcrumb-item>
            `
        );
    }
    return breadcrumbs;
};
