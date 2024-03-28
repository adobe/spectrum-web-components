/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { expect, fixture, nextFrame } from '@open-wc/testing';
import { html, render } from '@spectrum-web-components/base';
import { Default } from '../stories/accordion.stories.js';
import { usedHeapMB } from '../../../test/testing-helpers.js';

describe('Menu memory usage', () => {
    it('releases references on disconnect', async function () {
        if (!window.gc || !('measureUserAgentSpecificMemory' in performance))
            this.skip();

        this.timeout(10000);

        const iterations = 50;
        let active = false;

        const el = await fixture<HTMLElement>(
            html`
                <div></div>
            `
        );

        async function toggle(
            forced: boolean | undefined = undefined
        ): Promise<void> {
            active = forced != null ? forced : !active;
            render(active ? Default() : html``, el);
            await nextFrame();
            await nextFrame();
        }

        // "shake things out" to get a good first reading
        for (let i = 0; i < 5; i++) {
            await toggle();
        }
        await toggle(false);
        const beforeMB = await usedHeapMB();

        for (let i = 0; i < iterations; i++) {
            await toggle();
        }
        await toggle(false);
        const afterMB = await usedHeapMB();

        expect(
            afterMB.dom - beforeMB.dom,
            `DOM | before: ${beforeMB.dom}, after: ${afterMB.dom}`
        ).to.be.lte(0);
        expect(
            afterMB.js - beforeMB.js,
            `JS | before: ${beforeMB.js}, after: ${afterMB.js}`
        ).to.be.lte(0);
    });
});
