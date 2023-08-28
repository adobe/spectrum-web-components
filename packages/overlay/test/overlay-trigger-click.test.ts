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
import {
    elementUpdated,
    expect,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import type { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import {
    OverlayTrigger,
    TriggerInteractionsV1,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { spy } from 'sinon';
import { ActionButton } from '@spectrum-web-components/action-button';
import { fixture, isInteractive } from '../../../test/testing-helpers.js';

describe('Overlay Trigger - Click', () => {
    it('displays `click` declaratively', async () => {
        const openedSpy = spy();
        const closedSpy = spy();
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger
                    placement="right-start"
                    open="click"
                    @sp-opened=${() => openedSpy()}
                    @sp-closed=${() => closedSpy()}
                >
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="click-content" tip></sp-popover>
                </overlay-trigger>
            `)()
        );

        await waitUntil(
            () => {
                return openedSpy.calledOnce;
            },
            'click content projected to overlay',
            { timeout: 2000 }
        );

        await nextFrame();

        el.removeAttribute('open');
        await elementUpdated(el);

        await waitUntil(() => closedSpy.calledOnce, 'click content returned', {
            timeout: 2000,
        });
    });
    describe('closes on scroll', () => {
        afterEach(() => {
            if (document.scrollingElement) {
                document.scrollingElement.scrollTop = 0;
            }
        });
        (['click', 'replace', 'inline'] as TriggerInteractionsV1[]).map(
            (interaction) => {
                it(`closes "${interaction}" overlay on scroll`, async () => {
                    const el = await fixture<OverlayTrigger>(html`
                        <overlay-trigger
                            placement="right-start"
                            type=${interaction}
                        >
                            <sp-action-button
                                slot="trigger"
                                style="margin: 50vh 0 100vh;"
                            >
                                <sp-icon-magnify slot="icon"></sp-icon-magnify>
                            </sp-action-button>
                            <sp-popover slot="click-content" tip></sp-popover>
                        </overlay-trigger>
                    `);
                    await nextFrame();
                    const popover = el.querySelector('sp-popover') as Popover;
                    expect(el.open).to.be.undefined;

                    await elementUpdated(el);
                    const opened = oneEvent(el, 'sp-opened');
                    el.open = 'click';
                    await opened;

                    expect(el.open).to.equal('click');
                    expect(await isInteractive(popover)).to.be.true;

                    const closed = oneEvent(el, 'sp-closed');
                    if (document.scrollingElement) {
                        document.scrollingElement.scrollTop = 100;
                    }
                    await closed;

                    expect(el.open).to.be.undefined;
                    expect(await isInteractive(popover)).to.be.false;
                });
            }
        );
    });
    it('opens a second time', async () => {
        const openedSpy = spy();
        const closedSpy = spy();
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger
                placement="right-start"
                type="modal"
                open="click"
                @sp-opened=${() => openedSpy()}
                @sp-closed=${() => closedSpy()}
            >
                <sp-action-button slot="trigger">
                    <sp-icon-magnify slot="icon"></sp-icon-magnify>
                </sp-action-button>
                <sp-popover slot="click-content" tip></sp-popover>
            </overlay-trigger>
        `);
        await elementUpdated(el);
        const trigger = el.querySelector('[slot=trigger]') as ActionButton;

        await waitUntil(
            () => openedSpy.calledOnce,
            'click content projected to overlay',
            { timeout: 2000 }
        );
        expect(el.open).to.equal('click');

        el.removeAttribute('open');
        await elementUpdated(el);

        await waitUntil(() => closedSpy.calledOnce, 'click content returned', {
            timeout: 2000,
        });

        expect(el.open).to.be.null;

        trigger.click();
        await waitUntil(
            () => openedSpy.callCount === 2,
            'click content projected to overlay, again',
            { timeout: 2000 }
        );
        expect(el.open).to.equal('click');
    });
});
