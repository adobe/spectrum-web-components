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

import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { Tooltip } from '@spectrum-web-components/tooltip';
import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';
import { stub } from 'sinon';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { sendMouse } from '../../../test/plugins/browser.js';

describe('Tooltip', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<Tooltip>(
                html`
                    <sp-tooltip>Help text.</sp-tooltip>
                `
            )
    );
    it('loads', async () => {
        const el = await fixture<Tooltip>(
            html`
                <sp-tooltip>Help text.</sp-tooltip>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('self manages', async () => {
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [1, 1],
                },
            ],
        });
        const button = await fixture<Button>(
            html`
                <sp-button>
                    This is a button.
                    <sp-tooltip self-managed placement="top">
                        Help text.
                    </sp-tooltip>
                </sp-button>
            `
        );

        const el = button.querySelector('sp-tooltip') as Tooltip;

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await expect(button).to.be.accessible();

        const opened = oneEvent(button, 'sp-opened');
        button.focus();
        await opened;

        expect(el.open).to.be.true;
        await expect(button).to.be.accessible();

        const closed = oneEvent(button, 'sp-closed');
        button.blur();
        await closed;

        expect(el.open).to.be.false;
    });
    it('cleans up when self manages', async () => {
        const button = await fixture<Button>(
            html`
                <sp-button>
                    This is a button.
                    <sp-tooltip self-managed>Help text.</sp-tooltip>
                </sp-button>
            `
        );

        const el = button.querySelector('sp-tooltip') as Tooltip;

        await elementUpdated(el);

        expect(el.open).to.be.false;
        const opened = oneEvent(button, 'sp-opened');
        button.focus();
        await opened;
        await elementUpdated(el);

        expect(el.open).to.be.true;

        const closed = oneEvent(button, 'sp-closed');
        button.blur();
        await closed;

        expect(el.open).to.be.false;
    });
    it('cleans up when self managed and removed', async () => {
        const button = await fixture<Button>(
            html`
                <sp-button>
                    This is a button.
                    <sp-tooltip self-managed>Help text.</sp-tooltip>
                </sp-button>
            `
        );

        const el = button.querySelector('sp-tooltip') as Tooltip;

        await elementUpdated(el);

        expect(el.open).to.be.false;
        const opened = oneEvent(button, 'sp-opened');
        button.focus();
        await opened;

        expect(el.open).to.be.true;

        const closed = oneEvent(button, 'sp-closed');
        button.remove();
        await closed;

        expect(el.open).to.be.false;
    });
    it('accepts variants', async () => {
        const el = await fixture<Tooltip>(
            html`
                <sp-tooltip variant="negative">Help text.</sp-tooltip>
            `
        );

        await elementUpdated(el);

        expect(el.variant).to.equal('negative');
        expect(el.getAttribute('variant')).to.equal('negative');

        el.variant = 'info';

        await elementUpdated(el);

        expect(el.variant).to.equal('info');
        expect(el.getAttribute('variant')).to.equal('info');

        el.setAttribute('variant', 'positive');

        await elementUpdated(el);

        expect(el.variant).to.equal('positive');
        expect(el.getAttribute('variant')).to.equal('positive');

        el.removeAttribute('variant');

        await elementUpdated(el);

        expect(el.variant).to.equal('');
        expect(el.hasAttribute('variant')).to.be.false;
    });
    it('validates variants', async () => {
        const el = await fixture<Tooltip>(
            html`
                <sp-tooltip variant="other">Help text.</sp-tooltip>
            `
        );

        await elementUpdated(el);

        expect(el.variant).to.equal('');
        expect(el.hasAttribute('variant')).to.be.false;

        el.variant = 'info';

        await elementUpdated(el);

        expect(el.variant).to.equal('info');
        expect(el.getAttribute('variant')).to.equal('info');

        el.variant = 'info';

        await elementUpdated(el);

        expect(el.variant).to.equal('info');
        expect(el.getAttribute('variant')).to.equal('info');
    });

    it('surfaces tip element', async () => {
        const el = await fixture<Tooltip>(
            html`
                <sp-tooltip placement="top">Help text.</sp-tooltip>
            `
        );

        await elementUpdated(el);

        expect(typeof el.tipElement).to.not.equal('undefined');
    });
    describe('dev mode', () => {
        let consoleWarnStub!: ReturnType<typeof stub>;
        before(() => {
            window.__swc.verbose = true;
            consoleWarnStub = stub(console, 'warn');
        });
        afterEach(() => {
            consoleWarnStub.resetHistory();
        });
        after(() => {
            window.__swc.verbose = false;
            consoleWarnStub.restore();
        });

        it('loads default badge accessibly', async () => {
            const el = await fixture<Tooltip>(
                html`
                    <sp-tooltip variant="negative" self-managed>
                        Help text.
                    </sp-tooltip>
                `
            );

            await elementUpdated(el);

            expect(consoleWarnStub.called).to.be.true;
            const spyCall = consoleWarnStub.getCall(0);
            expect(
                (spyCall.args.at(0) as string).includes('Self managed'),
                'confirm self managed-centric message'
            ).to.be.true;
            expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
                data: {
                    localName: 'sp-tooltip',
                    type: 'api',
                    level: 'high',
                },
            });
        });
    });
});
