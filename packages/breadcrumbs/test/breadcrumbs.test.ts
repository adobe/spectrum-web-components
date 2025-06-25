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
import {
    elementUpdated,
    expect,
    fixture,
    html,
    oneEvent,
} from '@open-wc/testing';

import { spy } from 'sinon';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import {
    Breadcrumbs,
    BreadcrumbSelectDetail,
} from '@spectrum-web-components/breadcrumbs';
import { getBreadcrumbs } from '../stories/template.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

import '@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';
import { sendKeys } from '@web/test-runner-commands';

describe('Breadcrumbs', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Breadcrumbs>(html`
                <sp-breadcrumbs>${getBreadcrumbs(4)}</sp-breadcrumbs>
            `)
    );
    it('should render accessibly', async () => {
        const el = await fixture<Breadcrumbs>(html`
            <sp-breadcrumbs>${getBreadcrumbs(4)}</sp-breadcrumbs>
        `);

        await elementUpdated(el);
        await expect(el).to.be.accessible();

        // Default role and aria-label.
        expect(el.getAttribute('role')).to.equal('navigation');
        expect(el.getAttribute('aria-label')).to.equal('Breadcrumbs');

        // Reacts to changes of `label` attribute.
        el.label = 'My breadcrumbs';
        await elementUpdated(el);
        expect(el.getAttribute('aria-label')).to.equal('My breadcrumbs');
    });
    it('should display all breadcrumbs if max-visible-items >= nr. or slotted breadcrumb items', async () => {
        const el = await fixture<Breadcrumbs>(html`
            <sp-breadcrumbs>${getBreadcrumbs(4)}</sp-breadcrumbs>
        `);

        await elementUpdated(el);

        const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
        breadcrumbs.forEach((breadcrumb) => {
            expect(breadcrumb).to.be.displayed;
        });
    });
    it('should collapse breadcrumbs if max-visible-items < nr. or slotted breadcrumb items', async () => {
        const el = await fixture<Breadcrumbs>(html`
            <sp-breadcrumbs max-visible-items=${3}>
                ${getBreadcrumbs(4)}
            </sp-breadcrumbs>
        `);

        await elementUpdated(el);

        const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
        expect(breadcrumbs[0]).not.to.be.displayed;
        expect(breadcrumbs[1]).to.be.displayed;
        expect(breadcrumbs[2]).to.be.displayed;
        expect(breadcrumbs[3]).to.be.displayed;

        const menu = el.shadowRoot.querySelector(
            'sp-action-menu'
        ) as ActionMenu;
        expect(menu).to.exist;

        menu.click();
        await elementUpdated(menu);
        expect(menu.open).to.be.true;

        const menuitems = menu.querySelectorAll('sp-menu-item');
        expect(menuitems.length).to.equal(4);
        expect(menu.getAttribute('value')).to.equal('3');
    });
    it('should respect max-visible-items when adding items dynamically', async () => {
        const el = await fixture<Breadcrumbs>(html`
            <sp-breadcrumbs max-visible-items=${3}>
                ${getBreadcrumbs(4)}
            </sp-breadcrumbs>
        `);

        // let's verify that we have 3 breadcrumbs visible and 1 hidden
        const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
        expect(breadcrumbs.length).to.equal(4);
        expect(breadcrumbs[0]).not.to.be.displayed;
        expect(breadcrumbs[1]).to.be.displayed;
        expect(breadcrumbs[2]).to.be.displayed;
        expect(breadcrumbs[3]).to.be.displayed;

        // let's add one more item to the breadcrumbs directly
        const newItem = document.createElement('sp-breadcrumb-item');
        newItem.textContent = 'New item';
        el.appendChild(newItem);
        await elementUpdated(el);

        // let's verify that we have 3 breadcrumbs visible and 2 hidden
        const newBreadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
        expect(newBreadcrumbs.length).to.equal(5);
        expect(newBreadcrumbs[0]).not.to.be.displayed;
        expect(newBreadcrumbs[1]).not.to.be.displayed;
        expect(newBreadcrumbs[2]).to.be.displayed;
        expect(newBreadcrumbs[3]).to.be.displayed;
        expect(newBreadcrumbs[4]).to.be.displayed;
    });
    it('should always show the first breadcrumb if slot="root" is populated', async () => {
        const el = await fixture<Breadcrumbs>(html`
            <sp-breadcrumbs max-visible-items=${3}>
                <sp-breadcrumb-item value="Home" slot="root">
                    Home
                </sp-breadcrumb-item>
                ${getBreadcrumbs(4)}
            </sp-breadcrumbs>
        `);

        await elementUpdated(el);

        const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
        expect(breadcrumbs[0]).to.be.displayed;
        expect(breadcrumbs[1]).not.to.be.displayed;
        expect(breadcrumbs[2]).to.be.displayed;
        expect(breadcrumbs[3]).to.be.displayed;
        expect(breadcrumbs[4]).to.be.displayed;

        const menu = el.shadowRoot.querySelector(
            'sp-action-menu'
        ) as ActionMenu;
        expect(menu).to.exist;
    });
    it('should emit a change event on breadcrumb click if no href is provided', async () => {
        const changeSpy = spy();

        const el = await fixture<Breadcrumbs>(html`
            <sp-breadcrumbs
                max-visible-items=${3}
                @change=${(
                    event: Event & { detail: BreadcrumbSelectDetail }
                ) => {
                    changeSpy(event.detail.value);
                }}
            >
                ${getBreadcrumbs(4)}
            </sp-breadcrumbs>
        `);

        await elementUpdated(el);

        // Simulate a click from the visible breadcrumb.
        const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
        breadcrumbs[1].click();

        expect(changeSpy).to.have.been.calledOnce;
        expect(changeSpy).to.have.been.calledWith('1');

        changeSpy.resetHistory();

        // Simulate a click from the menu dropdown.
        const menu = el.shadowRoot.querySelector(
            'sp-action-menu'
        ) as ActionMenu;
        expect(menu).to.exist;

        const opened = oneEvent(el, 'sp-opened');
        menu.click();
        await elementUpdated(menu);
        await opened;

        const closed = oneEvent(el, 'sp-closed');
        const menuitems = menu.querySelectorAll('sp-menu-item');
        menuitems[0].click();
        await closed;

        expect(menu.open).to.be.false;

        await elementUpdated(el);
        expect(changeSpy).to.have.been.calledOnce;
        expect(changeSpy).to.have.been.calledWith('0');
    });

    it('should emit a change event on Enter keypress', async () => {
        const changeSpy = spy();

        const el = await fixture<Breadcrumbs>(html`
            <sp-breadcrumbs
                @change=${(
                    event: Event & { detail: BreadcrumbSelectDetail }
                ) => {
                    changeSpy(event.detail.value);
                }}
            >
                ${getBreadcrumbs(4)}
            </sp-breadcrumbs>
        `);

        await elementUpdated(el);

        // Simulate a click from the visible breadcrumb.
        const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');

        breadcrumbs[1].focus();
        await sendKeys({ press: 'Enter' });

        expect(changeSpy).to.have.been.calledOnce;
        expect(changeSpy).to.have.been.calledWith('1');
    });
});
