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
    fixture,
    elementUpdated,
    waitUntil,
    html,
    expect,
} from '@open-wc/testing';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import { OverlayTrigger } from '..';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { spy } from 'sinon';
import { ActionButton } from '@spectrum-web-components/action-button';

describe('Overlay Trigger - Hover', () => {
    it('displays `hover` declaratively', async () => {
        const openedSpy = spy();
        const closedSpy = spy();
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger
                    placement="right-start"
                    open="hover"
                    @sp-opened=${() => openedSpy()}
                    @sp-closed=${() => closedSpy()}
                >
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                </overlay-trigger>
            `)()
        );
        await elementUpdated(el);

        await waitUntil(
            () => openedSpy.calledOnce,
            'hover content projected to overlay',
            { timeout: 2000 }
        );

        el.removeAttribute('open');
        await elementUpdated(el);

        await waitUntil(() => closedSpy.calledOnce, 'hover content returned', {
            timeout: 2000,
        });
    });
    it('persists hover content', async () => {
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger placement="right-start">
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                </overlay-trigger>
            `)()
        );
        await elementUpdated(el);

        expect(el.open).to.be.undefined;

        const trigger = el.querySelector('[slot="trigger"]') as ActionButton;
        trigger.dispatchEvent(
            new Event('mouseenter', {
                bubbles: true,
            })
        );

        await elementUpdated(el);

        expect(el.open).to.equal('hover');

        trigger.click();

        await elementUpdated(el);

        expect(el.open).to.equal('hover');
    });
    it('closes persistent hover content on `longpress`', async () => {
        const el = await fixture<OverlayTrigger>(
            (() => html`
                <overlay-trigger placement="right-start">
                    <sp-action-button slot="trigger">
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-popover slot="hover-content" tip></sp-popover>
                    <sp-popover slot="longpress-content" tip></sp-popover>
                </overlay-trigger>
            `)()
        );
        await elementUpdated(el);

        expect(el.open).to.be.undefined;

        const trigger = el.querySelector('[slot="trigger"]') as ActionButton;
        trigger.dispatchEvent(
            new Event('mouseenter', {
                bubbles: true,
            })
        );

        await elementUpdated(el);

        expect(el.open).to.equal('hover');

        trigger.dispatchEvent(
            new Event('longpress', {
                bubbles: true,
            })
        );

        await elementUpdated(el);

        expect(el.open).to.equal('longpress');
    });
});
