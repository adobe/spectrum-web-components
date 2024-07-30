/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

/*
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { expect, fixture, html } from '@open-wc/testing';
import {
    HostWithPendingState,
    PendingStateController,
} from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
import sinon from 'sinon';
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
import '@spectrum-web-components/picker/sp-picker.js';

describe('PendingStateController', () => {
    let host: HostWithPendingState;
    let pending: sinon.SinonStub;
    let controller: PendingStateController<HostWithPendingState>;

    beforeEach(async () => {
        host = await fixture<HostWithPendingState>(html`
            <sp-picker pending></sp-picker>
        `);
        pending = sinon.stub();
        controller = new PendingStateController(host, {
            pending,
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('isPending', () => {
        it('should call the pending function', () => {
            controller.isPending();
            expect(pending).to.have.been.called;
        });
    });

    describe('renderPendingState', () => {
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
                    aria-valuetext=${pendingLabel}
                    class="progress-circle"
                ></sp-progress-circle>
            `);

            expect(renderedElement.outerHTML).to.equal(
                expectedElement.outerHTML
            );
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
                    aria-valuetext="Pending"
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

                expect(renderedAttr.value).to.equal(expectedAttr?.value);
            }
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
                    aria-valuetext="Pending"
                    class="progress-circle"
                ></sp-progress-circle>
            `);

            const renderedAttributes = progressCircle?.attributes;
            const expectedAttributes = expectedElement.attributes;
            expect(renderedAttributes?.length).to.equal(
                expectedAttributes.length
            );
            if (renderedAttributes) {
                for (let i = 0; i < renderedAttributes.length; i++) {
                    const renderedAttr = renderedAttributes[i];
                    const expectedAttr = expectedAttributes.getNamedItem(
                        renderedAttr.name
                    );

                    expect(renderedAttr.value).to.equal(expectedAttr?.value);
                }
            }
        });
    });

    describe('hostConnected', () => {
        it('should check the pending state', () => {
            controller.hostConnected();
            expect(pending).to.have.been.called;
        });
    });

    describe('hostUpdated', () => {
        it('should check the pending state', () => {
            controller.hostUpdated();
            expect(pending).to.have.been.called;
        });
    });
});
