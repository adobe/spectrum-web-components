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
import { Actionbar } from '../';
import { fixture, elementUpdated, html, expect } from '@open-wc/testing';
import { waitForPredicate } from '../../../test/testing-helpers';
import '../../shared/lib/focus-visible.js';

describe('Actionbar', () => {
    it('loads', async () => {
        const el = await fixture<Actionbar>(
            html`
                <sp-actionbar open>
                    <sp-checkbox indeterminate>228 Selected</sp-checkbox>
                    <div class="spectrum-ButtonGroup">
                        <sp-action-button quiet>
                            <svg
                                slot="icon"
                                id="spectrum-icon-18-Edit"
                                viewBox="0 0 36 36"
                            >
                                <path
                                    d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                                ></path>
                            </svg>
                        </sp-action-button>
                        <sp-action-button quiet>
                            <svg
                                slot="icon"
                                id="spectrum-icon-18-More"
                                viewBox="0 0 36 36"
                            >
                                <circle cx="17.8" cy="18.2" r="3.4"></circle>
                                <circle cx="29.5" cy="18.2" r="3.4"></circle>
                                <circle cx="6.1" cy="18.2" r="3.4"></circle>
                            </svg>
                        </sp-action-button>
                    </div>
                </sp-actionbar>
            `
        );

        await waitForPredicate(() => !!window.applyFocusVisiblePolyfill);
        await elementUpdated(el);

        expect(el).to.not.be.undefined;
        expect(el).lightDom.to.equalSnapshot();
        expect(el).shadowDom.to.equalSnapshot();
    });

    it('accepts variants', async () => {
        const el = await fixture<Actionbar>(
            html`
                <sp-actionbar variant="sticky">Help text.</sp-actionbar>
            `
        );

        await elementUpdated(el);

        expect(el.variant).to.equal('sticky');
        expect(el.getAttribute('variant')).to.equal('sticky');

        el.variant = 'fixed';

        await elementUpdated(el);

        expect(el.variant).to.equal('fixed');
        expect(el.getAttribute('variant')).to.equal('fixed');

        el.setAttribute('variant', 'sticky');

        await elementUpdated(el);

        expect(el.variant).to.equal('sticky');
        expect(el.getAttribute('variant')).to.equal('sticky');

        el.removeAttribute('variant');

        await elementUpdated(el);

        expect(el.variant).to.equal('');
        expect(el.hasAttribute('variant')).to.be.false;
    });
    it('validates variants', async () => {
        const el = await fixture<Actionbar>(
            html`
                <sp-actionbar variant="other">Help text.</sp-actionbar>
            `
        );

        await elementUpdated(el);

        expect(el.variant).to.equal('');
        expect(el.hasAttribute('variant')).to.be.false;

        el.variant = 'fixed';

        await elementUpdated(el);

        expect(el.variant).to.equal('fixed');
        expect(el.getAttribute('variant')).to.equal('fixed');

        el.variant = 'fixed';

        await elementUpdated(el);

        expect(el.variant).to.equal('fixed');
        expect(el.getAttribute('variant')).to.equal('fixed');
    });
});
