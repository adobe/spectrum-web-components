/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { Tooltip } from '@spectrum-web-components/tooltip/src/Tooltip.js';
import { sendMouse } from '@web/test-runner-commands';

import { Truncated } from '../src/index.js';
import '../sp-truncated.js';

describe('Truncated', () => {
    it('loads default truncated accessibly', async () => {
        const el = await fixture<Truncated>(
            html`
                <ue-truncated></ue-truncated>
            `
        );

        await expect(el).to.be.accessible();
    });
    it('renders a tooltip when overflowing', async () => {
        const p = await fixture(html`
            <p style="width: 200px">
                <sp-truncated>This will overflow into a tooltip</sp-truncated>
            </p>
        `);
        const el = p.querySelector('sp-truncated') as Truncated;
        const tooltip = el.shadowRoot!.querySelector('sp-tooltip') as Tooltip;
        const rect = el.getBoundingClientRect();

        const opened = oneEvent(el, 'sp-opened');

        await sendMouse({
            type: 'move',
            position: [Math.round(rect.left + 2), Math.round(rect.top + 2)],
        });

        await opened;

        expect(tooltip.open).to.be.true;
    });
    it('does not render a tooltip when content fits', async () => {
        const p = await fixture(html`
            <p style="width: 200px">
                <sp-truncated>Short</sp-truncated>
            </p>
        `);
        const el = p.querySelector('sp-truncated') as Truncated;
        const tooltip = el.shadowRoot!.querySelector(
            'sp-tooltip'
        ) as Tooltip | null;
        const rect = el.getBoundingClientRect();
        await sendMouse({
            type: 'move',
            position: [Math.round(rect.left + 2), Math.round(rect.top + 2)],
        });

        expect(tooltip).to.be.null;
    });
    it('detects whether or not custom overflow is specified for optimization', async () => {
        const defaultOverflow = await fixture<Truncated>(
            html`
                <sp-truncated>This will overflow into a tooltip</sp-truncated>
            `
        );
        const customOverflow = await fixture<Truncated>(
            html`
                <sp-truncated>
                    Default
                    <span slot="overflow">Custom</span>
                </sp-truncated>
            `
        );

        expect(defaultOverflow.hasCustomOverflow).to.be.false;
        expect(customOverflow.hasCustomOverflow).to.be.true;
    });
});
