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
import { Popover } from '../';
import { fixture, html, expect } from '@open-wc/testing';

describe('popover', () => {
    let popover!: Popover;

    beforeEach(async () => {
        popover = await fixture<Popover>(
            html`
                <sp-popover variant="dialog" direction="top" open>
                    <div id="title">
                        Popover Title
                    </div>
                    <div id="content">
                        Cupcake ipsum dolor sit amet jelly beans. Chocolate
                        jelly caramels. Icing soufflé chupa chups donut
                        cheesecake. Jelly-o chocolate cake sweet roll cake
                        danish candy biscuit halvah
                    </div>
                </sp-popover>
            `
        );
    });

    it('loads', async () => {
        expect(popover).to.not.equal(undefined);
        expect(popover.textContent).to.include('Popover Title');

        return true;
    });
    it('tip exists only when tip attribute is true', async () => {
        if (!popover.shadowRoot) throw new Error('No shadowRoot');
        expect(popover.getAttribute('tip')).to.equal(null);

        let tip = popover.shadowRoot.querySelector('tip') as HTMLElement;
        expect(tip).to.equal(null);

        popover.setAttribute('tip', 'true');

        tip = popover.shadowRoot.querySelector('tip') as HTMLElement;
        expect(tip).to.not.equal(undefined);

        return true;
    });
});
