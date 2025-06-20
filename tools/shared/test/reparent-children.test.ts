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

import { expect, fixture, html } from '@open-wc/testing';
import { reparentChildren } from '@spectrum-web-components/shared/src/reparent-children.js';

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

    it('early exits no children', async () => {
        const context = await fixture<HTMLDivElement>(html`
            <div>
                <div class="source"></div>
                <div class="destination"></div>
            </div>
        `);

        const source = context.querySelector('.source') as HTMLDivElement;
        const children = [...source.children] as HTMLDivElement[];
        const destination = context.querySelector(
            '.destination'
        ) as HTMLDivElement;

        expect(source.children.length).to.equal(0);
        expect(destination.children.length).to.equal(0);
        const restore = reparentChildren(children, destination);

        expect(source.children.length).to.equal(0);
        expect(destination.children.length).to.equal(0);

        restore();
        expect(source.children.length).to.equal(0);
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
        const restore = reparentChildren([child], destination, {
            position: 'beforeend',
            prepareCallback: (el: Element) => {
                const slotName = el.slot;
                el.removeAttribute('slot');
                return (el: Element) => {
                    el.slot = slotName;
                };
            },
        });

        expect(child.hasAttribute('slot')).to.be.false;

        restore();
        expect(child.getAttribute('slot')).to.equal('slot');
    });

    it('beforeend - reparents and returns multiple children', async () => {
        const context = await fixture<HTMLDivElement>(html`
            <div>
                <div class="source">
                    <div class="child">1</div>
                    <div class="child">2</div>
                    <div class="child">3</div>
                    <div class="child">4</div>
                    <div class="child">5</div>
                </div>
                <div class="destination">
                    <div class="marker"></div>
                </div>
            </div>
        `);

        const source = context.querySelector('.source') as HTMLDivElement;
        const { children } = source;
        const destination = context.querySelector(
            '.destination'
        ) as HTMLDivElement;

        expect(source.children.length).to.equal(5);
        expect(destination.children.length).to.equal(1);
        const restore = reparentChildren([...children], destination, {
            position: 'beforeend',
        });

        expect(source.children.length).to.equal(0);
        expect(destination.children.length).to.equal(5 + 1);

        const marker = context.querySelector('.marker') as HTMLDivElement;
        expect(marker.previousElementSibling).to.be.null;
        expect(marker.nextElementSibling?.textContent).to.equal('1');
        expect(destination.lastElementChild?.textContent).to.equal('5');

        restore();
        expect(source.children.length).to.equal(5);
        expect(destination.children.length).to.equal(1);

        expect(source.firstElementChild?.textContent).to.equal('1');
        expect(source.lastElementChild?.textContent).to.equal('5');
    });

    it('afterbegin - reparents and returns multiple children', async () => {
        const context = await fixture<HTMLDivElement>(html`
            <div>
                <div class="source">
                    <div class="child">1</div>
                    <div class="child">2</div>
                    <div class="child">3</div>
                    <div class="child">4</div>
                    <div class="child">5</div>
                </div>
                <div class="destination">
                    <div class="marker"></div>
                </div>
            </div>
        `);

        const source = context.querySelector('.source') as HTMLDivElement;
        const { children } = source;
        const destination = context.querySelector(
            '.destination'
        ) as HTMLDivElement;

        expect(source.children.length).to.equal(5);
        expect(destination.children.length).to.equal(1);
        const restore = reparentChildren([...children], destination, {
            position: 'afterbegin',
        });

        expect(source.children.length).to.equal(0);
        expect(destination.children.length).to.equal(5 + 1);

        const marker = context.querySelector('.marker') as HTMLDivElement;
        expect(marker.nextElementSibling).to.be.null;
        expect(marker.previousElementSibling?.textContent).to.equal('5');
        expect(destination.firstElementChild?.textContent).to.equal('1');

        restore();
        expect(source.children.length).to.equal(5);
        expect(destination.children.length).to.equal(1);

        expect(source.firstElementChild?.textContent).to.equal('1');
        expect(source.lastElementChild?.textContent).to.equal('5');
    });

    it('beforebegin - reparents and returns multiple children', async () => {
        const context = await fixture<HTMLDivElement>(html`
            <div>
                <div class="source">
                    <div class="child">1</div>
                    <div class="child">2</div>
                    <div class="child">3</div>
                    <div class="child">4</div>
                    <div class="child">5</div>
                </div>
                <div class="marker"></div>
                <div class="destination"></div>
            </div>
        `);

        const source = context.querySelector('.source') as HTMLDivElement;
        const { children } = source;
        const destination = context.querySelector(
            '.destination'
        ) as HTMLDivElement;

        expect(source.children.length).to.equal(5);
        const restore = reparentChildren([...children], destination, {
            position: 'beforebegin',
        });

        expect(source.children.length).to.equal(0);
        expect(destination.children.length).to.equal(0);

        const marker = context.querySelector('.marker') as HTMLDivElement;
        expect(marker.previousElementSibling).to.not.be.null;
        expect(marker.nextElementSibling?.textContent).to.equal('1');
        expect(destination.previousElementSibling?.textContent).to.equal('5');

        restore();
        expect(source.children.length).to.equal(5);
        expect(marker.nextElementSibling).to.equal(destination);

        expect(source.firstElementChild?.textContent).to.equal('1');
        expect(source.lastElementChild?.textContent).to.equal('5');
    });

    it('afterend - reparents and returns multiple children', async () => {
        const context = await fixture<HTMLDivElement>(html`
            <div>
                <div class="source">
                    <div class="child">1</div>
                    <div class="child">2</div>
                    <div class="child">3</div>
                    <div class="child">4</div>
                    <div class="child">5</div>
                </div>
                <div class="destination"></div>
                <div class="marker"></div>
            </div>
        `);

        const source = context.querySelector('.source') as HTMLDivElement;
        const { children } = source;
        const destination = context.querySelector(
            '.destination'
        ) as HTMLDivElement;

        expect(source.children.length).to.equal(5);

        const marker = context.querySelector('.marker') as HTMLDivElement;
        expect(marker.previousElementSibling).to.equal(destination);
        expect(marker.nextElementSibling).to.be.null;

        const restore = reparentChildren([...children], destination, {
            position: 'afterend',
        });

        expect(source.children.length).to.equal(0);
        expect(destination.children.length).to.equal(0);

        expect(destination.nextElementSibling?.textContent).to.equal('1');
        expect(marker.previousElementSibling?.textContent).to.equal('5');

        restore();
        expect(source.children.length).to.equal(5);
        expect(marker.previousElementSibling).to.equal(destination);

        expect(source.firstElementChild?.textContent).to.equal('1');
        expect(source.lastElementChild?.textContent).to.equal('5');
    });
});
