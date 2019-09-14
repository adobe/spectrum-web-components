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
import { SideNavItem } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';

describe('Sidenav Item', () => {
    it('can exist disabled and with no parent', async () => {
        let selected = false;
        const onSidenavSelect = (): void => {
            selected = true;
        };
        const el = await fixture<SideNavItem>(
            html`
                <sp-sidenav-item
                    disabled
                    value="Section 2"
                    label="Section 2"
                    @sidenav-select=${onSidenavSelect}
                ></sp-sidenav-item>
            `
        );

        await elementUpdated(el);

        expect(selected).to.be.false;

        el.click();

        await elementUpdated(el);

        expect(selected).to.be.false;

        el.disabled = false;

        el.click();

        await elementUpdated(el);

        expect(selected).to.be.true;
    });
});
