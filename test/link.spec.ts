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

import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { fixture, elementUpdated } from '@open-wc/testing-helpers';
import { Link } from '../src/link';
import '../src/link';
import { html } from 'lit-element';

chai.use(chaiDomDiff);

describe('Link', () => {
    it('loads', async () => {
        const el = await fixture<Link>(
            html`
                <sp-link href="test_url">Default Link</sp-link>
            `
        );

        await elementUpdated(el);
        expect(el).to.not.be.undefined;
        expect(el.textContent).to.include('Default Link');
        // make sure href is being passed to <a>
        expect(el).shadowDom.to.equal(`<a href="test_url"><slot></slot></a>`);
    });
});
