/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { defineCustomElement } from '../src/define';
import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { Banner } from '../src/banner/banner';

import { html } from 'lit-element';

defineCustomElement(Banner);

describe('banner', () => {
    it('loads', async () => {
        const el = await fixture<Banner>(
            html`
                <sp-banner type="info">
                    <div slot="header">Header Text</div>
                    <div slot="content">Content</div>
                </sp-banner>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.equal(undefined);
        expect(el.textContent).to.include('Header Text');
        expect(el.textContent).to.include('Content');
    });
});
