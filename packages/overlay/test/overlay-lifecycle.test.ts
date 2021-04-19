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
    html,
    expect,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { OverlayTrigger } from '..';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { a11ySnapshot, findAccessibilityNode } from '@web/test-runner-commands';

describe('Overlay Trigger - Lifecycle Methods', () => {
    it('calls the overlay lifecycle (willOpen/Close)', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger placement="right-start">
                <sp-action-button slot="trigger">
                    Button with Tooltip
                </sp-action-button>
                <sp-tooltip slot="hover-content">
                    Described by this content on focus/hover. 1
                </sp-tooltip>
            </overlay-trigger>
        `);

        await elementUpdated(el);

        expect(el.open).to.be.undefined;
        expect(el.childNodes.length).to.equal(5);
        const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
        type DescribedNode = {
            name: string;
            description: string;
        };
        let snapshot = ((await a11ySnapshot(
            {}
        )) as unknown) as DescribedNode & { children: DescribedNode[] };
        expect(
            findAccessibilityNode<DescribedNode>(
                snapshot,
                (node) =>
                    node.name === 'Button with Tooltip' &&
                    typeof node.description === 'undefined'
            ),
            '`name`ed with no `description`'
        );
        const opened = oneEvent(el, 'sp-opened');
        trigger.dispatchEvent(
            new FocusEvent('focusin', { bubbles: true, composed: true })
        );
        await opened;

        expect(el.open).to.equal('hover');
        snapshot = ((await a11ySnapshot({})) as unknown) as DescribedNode & {
            children: DescribedNode[];
        };

        expect(el.childNodes.length).to.equal(6);
        expect(
            findAccessibilityNode<DescribedNode>(
                snapshot,
                (node) =>
                    node.name === 'Button with Tooltip' &&
                    node.description ===
                        'Described by this content on focus/hover.'
            ),
            '`name`ed with `description`'
        );

        const closed = oneEvent(el, 'sp-closed');
        trigger.dispatchEvent(
            new FocusEvent('focusout', { bubbles: true, composed: true })
        );
        await closed;
        await elementUpdated(el);

        await waitUntil(() => el.open === null);
        expect(el.childNodes.length).to.equal(5);
    });
    it('calls the overlay lifecycle (willOpen/openCanceled)', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger placement="right-start">
                <sp-action-button slot="trigger">
                    Button with Tooltip
                </sp-action-button>
                <sp-tooltip slot="hover-content" delayed>
                    Described by this content on focus/hover. 2
                </sp-tooltip>
            </overlay-trigger>
        `);

        await elementUpdated(el);

        expect(el.open).to.be.undefined;
        expect(el.childNodes.length, 'always').to.equal(5);
        const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
        trigger.dispatchEvent(
            new FocusEvent('focusin', { bubbles: true, composed: true })
        );
        await elementUpdated(el);
        trigger.dispatchEvent(
            new FocusEvent('focusout', { bubbles: true, composed: true })
        );
        await elementUpdated(el);

        await waitUntil(() => {
            return el.open === null;
        }, 'open');
        await elementUpdated(el);
        await waitUntil(() => {
            return el.childNodes.length === 5;
        }, 'children');
    });
});
