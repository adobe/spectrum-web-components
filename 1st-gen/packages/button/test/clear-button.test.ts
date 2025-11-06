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

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { ElementSize } from '@spectrum-web-components/base';
import { ClearButton } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-clear-button.js';
import { SinonStub, stub } from 'sinon';
import { testForLitDevWarnings } from '../../../test/testing-helpers';

describe('Clear Button', () => {
    testForLitDevWarnings(async () =>
        fixture<ClearButton>(html`
            <sp-clear-button size="m" label="Clear"></sp-clear-button>
        `)
    );
    (['s', 'm', 'l', 'xl'] as ElementSize[]).map((size) => {
        it(`loads - ${size}`, async () => {
            const el = await fixture<ClearButton>(html`
                <sp-clear-button size=${size} label="Clear"></sp-clear-button>
            `);

            await expect(el).to.be.accessible();
        });
    });

    describe('dev mode', () => {
        let consoleStub: SinonStub;
        beforeEach(() => {
            window.__swc.verbose = true;
            consoleStub = stub(console, 'warn');
        });

        afterEach(() => {
            window.__swc.verbose = false;
            consoleStub.restore();
        });

        it(`loads static-color="white" when variant="overBackground"`, async () => {
            const el = await fixture<ClearButton>(html`
                <sp-clear-button
                    label="Clear"
                    variant="overBackground"
                ></sp-clear-button>
            `);

            await elementUpdated(el);

            // Check that the staticColor is set to white
            expect(el.staticColor).to.equal('white');
            expect(el.hasAttribute('static-color')).to.be.true;
            expect(el.getAttribute('static-color')).to.equal('white');
        });

        it('should log dev warning when overBackground variant is used', async () => {
            const el = await fixture<ClearButton>(html`
                <sp-clear-button
                    label="Clear"
                    variant="overBackground"
                ></sp-clear-button>
            `);

            await elementUpdated(el);

            const warning = consoleStub.getCall(0).args.at(0);
            const expectedContent =
                'The overBackground variant is deprecated. Please use `static-color="white"` instead.';

            expect(consoleStub).to.be.calledOnce;
            expect(warning.includes(expectedContent)).to.be.true;
        });
    });
});
