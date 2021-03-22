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

import { fixture, html, expect } from '@open-wc/testing';
import { reparentChildren } from '../src/reparent-children.js';

describe('Reparent Children', () => {
    it('reparents and returns a single child', async () => {
        const context = await fixture<HTMLDivElement>(html`
            <div>
                <div class="source">
                    <div class="child"></div>
                </div>
                <div class="destination"></div>
            </div>
        `);

        const source = context.querySelector('.source') as HTMLDivElement;
        const child = context.querySelector('.child') as HTMLDivElement;
        const destination = context.querySelector(
            '.destination'
        ) as HTMLDivElement;

        expect(source.children.length).to.equal(1);
        expect(destination.children.length).to.equal(0);
        const restore = reparentChildren([child], destination);

        expect(source.children.length).to.equal(0);
        expect(destination.children.length).to.equal(1);

        restore();
        expect(source.children.length).to.equal(1);
        expect(destination.children.length).to.equal(0);
    });

    it('reparents and returns multiple child', async () => {
        const context = await fixture<HTMLDivElement>(html`
            <div>
                <div class="source">
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                    <div class="child"></div>
                </div>
                <div class="destination"></div>
            </div>
        `);

        const source = context.querySelector('.source') as HTMLDivElement;
        const { children } = source;
        const destination = context.querySelector(
            '.destination'
        ) as HTMLDivElement;

        expect(source.children.length).to.equal(5);
        expect(destination.children.length).to.equal(0);
        const restore = reparentChildren([...children], destination);

        expect(source.children.length).to.equal(0);
        expect(destination.children.length).to.equal(5);

        restore();
        expect(source.children.length).to.equal(5);
        expect(destination.children.length).to.equal(0);
    });

    it('augments the child via a callback', async () => {
        const context = await fixture<HTMLDivElement>(html`
            <div>
                <div class="source">
                    <div class="child" slot="slot"></div>
                </div>
                <div class="destination"></div>
            </div>
        `);

        const child = context.querySelector('.child') as HTMLDivElement;
        const destination = context.querySelector(
            '.destination'
        ) as HTMLDivElement;

        expect(child.getAttribute('slot')).to.equal('slot');
        const restore = reparentChildren(
            [child],
            destination,
            (el: Element) => {
                const slotName = el.slot;
                el.removeAttribute('slot');
                return (el: Element) => {
                    el.slot = slotName;
                };
            }
        );

        expect(child.hasAttribute('slot')).to.be.false;

        restore();
        expect(child.getAttribute('slot')).to.equal('slot');
    });
});
