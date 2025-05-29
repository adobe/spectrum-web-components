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
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { BreadcrumbItem, BreadcrumbSelectDetail } from '../src/index.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

import '@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';

describe('Breadcrumb Item', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<BreadcrumbItem>(html`
                <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
            `)
    );
    it('should render accessibly', async () => {
        const el = await fixture<BreadcrumbItem>(html`
            <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
        `);

        expect(el.getAttribute('role')).to.equal('listitem');
    });

    it('should render a disabled item', async () => {
        const el = await fixture<BreadcrumbItem>(html`
            <sp-breadcrumb-item value="home" disabled>Home</sp-breadcrumb-item>
        `);
        expect(el.hasAttribute('aria-disabled')).to.be.true;
    });

    it('should manage aria-current', async () => {
        const el = await fixture<BreadcrumbItem>(html`
            <sp-breadcrumbs>
                <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
                <sp-breadcrumb-item value="products">
                    Products
                </sp-breadcrumb-item>
            </sp-breadcrumbs>
        `);

        await elementUpdated(el);

        const currentItem = el.querySelector(
            'sp-breadcrumb-item:nth-child(2)'
        ) as BreadcrumbItem;
        const otherItem = el.querySelector(
            'sp-breadcrumb-item:nth-child(1)'
        ) as BreadcrumbItem;

        await elementUpdated(currentItem);
        await elementUpdated(otherItem);

        expect(currentItem.focusElement.hasAttribute('aria-current'), 'current')
            .to.be.true;
        expect(otherItem.focusElement.hasAttribute('aria-current'), 'other').to
            .be.false;
    });

    it('should not emit change event if element is the last one', async () => {
        const changeSpy = spy();
        const el = await fixture<BreadcrumbItem>(html`
            <sp-breadcrumb-item
                isLastOfType
                @breadcrumb-select=${(
                    event: CustomEvent<BreadcrumbSelectDetail>
                ) => changeSpy(event.detail.value)}
                value="https://adobe.com/home"
            >
                Home
            </sp-breadcrumb-item>
        `);

        await elementUpdated(el);

        el.click();
        expect(changeSpy.callCount).to.equal(0);
    });

    it('should emit change event if href is not provided and element is not the last one', async () => {
        const changeSpy = spy();
        const el = await fixture<BreadcrumbItem>(html`
            <sp-breadcrumb-item
                @breadcrumb-select=${(
                    event: CustomEvent<BreadcrumbSelectDetail>
                ) => changeSpy(event.detail.value)}
                value="home"
            >
                Home
            </sp-breadcrumb-item>
        `);

        await elementUpdated(el);

        el.click();
        expect(changeSpy.callCount).to.equal(1);
        expect(changeSpy).to.have.been.calledWith('home');
    });
});
