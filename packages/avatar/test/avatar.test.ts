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
import '../sp-avatar.js';
import { Avatar } from '../';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

describe('Avatar', () => {
    it('loads accessibly', async () => {
        const el = await fixture<Avatar>(
            html`
                <sp-avatar
                    label="Shantanu Narayen"
                    src="https://placedog.net/500/500"
                ></sp-avatar>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('loads with everything set', async () => {
        const el = await fixture<Avatar>(
            html`
                <sp-avatar
                    label="Shantanu Narayen"
                    src="https://placedog.net/500/500"
                ></sp-avatar>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        const imageEl = el.shadowRoot
            ? (el.shadowRoot.querySelector('img') as HTMLImageElement)
            : (el.querySelector('img') as HTMLImageElement);
        expect(imageEl.hasAttribute('alt')).to.be.true;
        expect(imageEl.getAttribute('alt')).to.equal('Shantanu Narayen');
    });
    it('loads with no label', async () => {
        const el = await fixture<Avatar>(
            html`
                <sp-avatar src="https://placedog.net/500/500"></sp-avatar>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        const imageEl = el.shadowRoot
            ? (el.shadowRoot.querySelector('img') as HTMLImageElement)
            : (el.querySelector('img') as HTMLImageElement);
        expect(imageEl.hasAttribute('alt')).to.be.false;
    });
});
