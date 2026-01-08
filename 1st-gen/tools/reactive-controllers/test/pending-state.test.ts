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
import {
    HostWithPendingState,
    PendingStateController,
} from '@spectrum-web-components/reactive-controllers/src/PendingState.js';

import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';

describe('PendingStateController', () => {
    let host: HostWithPendingState;
    let controller: PendingStateController<HostWithPendingState>;

    beforeEach(async () => {
        host = await fixture<HostWithPendingState>(html`
            <sp-button aria-label="clickable" pending>Click me</sp-button>
        `);
        controller = host.pendingStateController;
    });

    describe('renderPendingState', () => {
        it('should change aria-label of host when pending and when not pending', async () => {
            host = await fixture<HostWithPendingState>(html`
                <sp-button>Click me</sp-button>
            `);
            controller = host.pendingStateController;

            host.setAttribute('pending', 'true');
            await host.updateComplete;

            let ariaLabel = host.getAttribute('aria-label');
            expect(ariaLabel).to.equal('Pending');

            host.removeAttribute('pending');
            await host.updateComplete;

            ariaLabel = host.getAttribute('aria-label');
            expect(ariaLabel).to.equal(null);

            host.setAttribute('aria-label', 'clickable');
            await host.updateComplete;
            ariaLabel = host.getAttribute('aria-label');
            expect(ariaLabel).to.equal('clickable');
            host.setAttribute('pending', 'true');

            await host.updateComplete;
            ariaLabel = host.getAttribute('aria-label');
            expect(ariaLabel).to.equal('Pending');

            host.removeAttribute('pending');
            await host.updateComplete;
            ariaLabel = host.getAttribute('aria-label');
            expect(ariaLabel).to.equal('clickable');

            host.setAttribute('pending', 'true');
            await host.updateComplete;
            ariaLabel = host.getAttribute('aria-label');
            expect(ariaLabel).to.equal('Pending');
        });

        it('should render the pending state UI', async () => {
            const pendingLabel = 'Custom Pending Label';
            host.pendingLabel = pendingLabel;
            const templateResult = controller.renderPendingState();

            const renderedElement = await fixture(html`
                ${templateResult}
            `);
            const expectedElement = await fixture(html`
                <sp-progress-circle
                    id="loader"
                    size="s"
                    indeterminate
                    class="progress-circle"
                    role="presentation"
                ></sp-progress-circle>
            `);

            expect(renderedElement.outerHTML === expectedElement.outerHTML).to
                .be.true;
        });

        it('should render the default pending state UI if no label is provided', async () => {
            host.pendingLabel = undefined;
            const templateResult = controller.renderPendingState();
            const renderedElement = await fixture(html`
                ${templateResult}
            `);
            const expectedElement = await fixture(html`
                <sp-progress-circle
                    id="loader"
                    size="s"
                    indeterminate
                    role="presentation"
                    class="progress-circle"
                ></sp-progress-circle>
            `);

            const renderedAttributes = renderedElement.attributes;
            const expectedAttributes = expectedElement.attributes;

            expect(renderedAttributes.length).to.equal(
                expectedAttributes.length
            );

            for (let i = 0; i < renderedAttributes.length; i++) {
                const renderedAttr = renderedAttributes[i];
                const expectedAttr = expectedAttributes.getNamedItem(
                    renderedAttr.name
                );

                expect(renderedAttr.value === expectedAttr?.value).to.be.true;
            }
            expect(host.pending).to.be.true;
        });

        it('should toggle the pending state on and off and preserve the component state correctly', async () => {
            // Set initial pending state to true
            host.setAttribute('pending', 'true');
            await host.updateComplete;
            let progressCircle =
                host.shadowRoot?.querySelector('sp-progress-circle');
            expect(progressCircle).to.not.be.null;
            host.removeAttribute('pending');
            await host.updateComplete;
            progressCircle =
                host.shadowRoot?.querySelector('sp-progress-circle');
            expect(progressCircle).to.be.null;
            host.setAttribute('pending', 'true');
            await host.updateComplete;
            progressCircle =
                host.shadowRoot?.querySelector('sp-progress-circle');
            expect(progressCircle).to.not.be.null;
            const expectedElement = await fixture(html`
                <sp-progress-circle
                    id="loader"
                    size="s"
                    indeterminate
                    role="presentation"
                    class="progress-circle"
                ></sp-progress-circle>
            `);

            const renderedAttributes = progressCircle?.attributes;
            const expectedAttributes = expectedElement.attributes;
            expect(renderedAttributes?.length === expectedAttributes.length).to
                .be.true;
            if (renderedAttributes) {
                for (let i = 0; i < renderedAttributes.length; i++) {
                    const renderedAttr = renderedAttributes[i];
                    const expectedAttr = expectedAttributes.getNamedItem(
                        renderedAttr.name
                    );

                    expect(renderedAttr.value === expectedAttr?.value).to.be
                        .true;
                }
            }
        });
    });
});
