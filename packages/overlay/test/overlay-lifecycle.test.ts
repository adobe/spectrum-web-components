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
import {
    elementUpdated,
    expect,
    fixture,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { OverlayTrigger } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { Tooltip } from '@spectrum-web-components/tooltip';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { a11ySnapshot, findAccessibilityNode } from '@web/test-runner-commands';
import { sendTabKey } from '../../../test/testing-helpers';

describe('Overlay Trigger - accessible hover content management', () => {
    it('accessibly describes trigger content with hover content', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger placement="right-start" triggered-by="hover">
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
        type DescribedNode = {
            name: string;
            description: string;
        };
        const snapshot = (await a11ySnapshot(
            {}
        )) as unknown as DescribedNode & {
            children: DescribedNode[];
        };
        expect(
            findAccessibilityNode<DescribedNode>(
                snapshot,
                (node) =>
                    node.name === 'Button with Tooltip' &&
                    typeof node.description === 'undefined'
            ),
            '`name`ed with no `description`'
        );
    });
    it('gardens `aria-describedby` in its target', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger placement="right-start" triggered-by="hover">
                <sp-action-button slot="trigger" aria-describedby="descriptor">
                    Button with Tooltip
                </sp-action-button>
                <sp-tooltip slot="hover-content" delayed>
                    Described by this content on focus/hover. 2
                </sp-tooltip>
            </overlay-trigger>
            <div id="descriptor">I'm a description!</div>
        `);

        const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
        const tooltip = el.querySelector(
            '[slot="hover-content"]'
        ) as HTMLElement;

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        await waitUntil(
            () => tooltip.id,
            'Tooltip never published an ID for itself'
        );

        expect(trigger.getAttribute('aria-describedby')).to.equal(
            `descriptor ${tooltip.id}`
        );

        trigger.remove();

        // slot change timing
        await nextFrame();

        expect(trigger.getAttribute('aria-describedby')).to.equal('descriptor');
    });
    it('applies `aria-describedby` attribute', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <overlay-trigger placement="right-start" triggered-by="hover">
                <sp-action-button slot="trigger">
                    Button with Tooltip
                </sp-action-button>
                <sp-tooltip slot="hover-content" delayed>
                    Described by this content on focus/hover. 2
                </sp-tooltip>
            </overlay-trigger>
        `);

        const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
        const tooltip = el.querySelector(
            '[slot="hover-content"]'
        ) as HTMLElement;

        await elementUpdated(el);
        await nextFrame();
        await nextFrame();

        await waitUntil(
            () => tooltip.id,
            'Tooltip never published an ID for itself'
        );

        expect(trigger.getAttribute('aria-describedby')).to.equal(tooltip.id);

        trigger.remove();

        // slot change timing
        await nextFrame();

        expect(trigger.getAttribute('aria-describedby')).to.be.null;
    });
    it('does not duplicate `aria-describedby` attribute', async () => {
        const el = await fixture<OverlayTrigger>(html`
            <div>
                <sp-action-button slot="trigger">
                    Button with Tooltip
                </sp-action-button>
                <overlay-trigger placement="right-start" triggered-by="hover">
                    <sp-tooltip slot="hover-content" delayed>
                        Described by this content on focus/hover. 2
                    </sp-tooltip>
                </overlay-trigger>
            </div>
        `);

        const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
        const tooltip = el.querySelector('sp-tooltip') as Tooltip;
        const overlay = el.querySelector('overlay-trigger') as OverlayTrigger;

        trigger.setAttribute('aria-describedby', tooltip.id);
        overlay.append(trigger);

        await elementUpdated(el);
        expect(trigger.getAttribute('aria-describedby')).to.equal(tooltip.id);
        expect(el.open).to.be.undefined;

        // For `:focus-visible` heuristic.
        const input = document.createElement('input');
        el.insertAdjacentElement('afterbegin', input);
        input.focus();

        const opened = oneEvent(el, 'sp-opened');
        await sendTabKey();
        await opened;

        expect(trigger.getAttribute('aria-describedby')).to.equal(tooltip.id);

        const closed = oneEvent(el, 'sp-closed');
        trigger.dispatchEvent(
            new FocusEvent('focusout', { bubbles: true, composed: true })
        );
        await closed;

        expect(trigger.getAttribute('aria-describedby')).to.equal(tooltip.id);
    });
});
