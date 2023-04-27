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

import { expect } from '@open-wc/testing';
import { stub } from 'sinon';

// for window.__swc
import '@spectrum-web-components/base';

const elements = [
    {
        name: 'sp-color-area',
        register: () =>
            import('@spectrum-web-components/color-area/sp-color-area.js'),
    },
];

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

describe('define-element', function () {
    this.retries(0);
    beforeEach(function () {
        window.__swc.verbose = true;
        this.warn = stub(console, 'warn');
    });
    afterEach(function () {
        this.warn.resetHistory();
        window.__swc.verbose = false;
        this.warn.restore();
    });
    elements.map(({ name, register }) =>
        it('warns on redefinition', async function () {
            const error = isSafari ? 'same tag name' : 'has already been';
            let caughtError: Error | undefined;

            customElements.define(name, class extends HTMLElement {});
            try {
                await register();
            } catch (error) {
                caughtError = error as Error;
            }

            expect(caughtError?.message ?? '').to.include(error);
            expect(this.warn.called, 'should call console.warn()').to.be.true;
            const spyCall = this.warn.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('redefine'),
                'message should warn about redefining an element'
            ).to.be.true;
        })
    );
});
