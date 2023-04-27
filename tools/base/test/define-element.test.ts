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
import {
    isFirefox,
    isWebKit,
} from '@spectrum-web-components/shared/src/platform.js';

// for window.__swc
import '@spectrum-web-components/base';

const elements = {
    'sp-accordion-item': () =>
        import('@spectrum-web-components/accordion/sp-accordion-item.js'),
    'sp-accordion': () =>
        import('@spectrum-web-components/accordion/sp-accordion.js'),
    'sp-action-bar': () =>
        import('@spectrum-web-components/action-bar/sp-action-bar.js'),
    'sp-action-menu': () =>
        import('@spectrum-web-components/action-menu/sp-action-menu.js'),
    'sp-action-button': () =>
        import('@spectrum-web-components/action-button/sp-action-button.js'),
    'sp-action-group': () =>
        import('@spectrum-web-components/action-group/sp-action-group.js'),
    'sp-color-area': () =>
        import('@spectrum-web-components/color-area/sp-color-area.js'),
};

const browser: 'webkit' | 'firefox' | 'chromium' = isWebKit()
    ? 'webkit'
    : isFirefox()
    ? 'firefox'
    : 'chromium';

describe('define-element', function () {
    // registrations are globally-unique, so retries will always fail
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

    Object.entries(elements).forEach(([name, register]) =>
        it(`'${name}' warns on redefinition`, async function () {
            // classes already-defined via transitive dependencies can't be tested this way
            if (customElements.get(name)) {
                this.skip();
            }
            const error = {
                webkit: 'Cannot define multiple custom elements with the same tag name',
                firefox: `'${name}' has already been defined`,
                chromium: `"${name}" has already been used with this registry`,
            }[browser];
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
