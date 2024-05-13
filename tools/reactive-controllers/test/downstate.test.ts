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
import { elementUpdated, expect, fixture, nextFrame } from '@open-wc/testing';
import { html, LitElement } from 'lit';
import { DownState } from '@spectrum-web-components/reactive-controllers/src/downstate.js';
import { sendMouse } from '../../../test/plugins/browser.js';
import { SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/theme/sp-theme.js';

class TestDownstateEl extends SpectrumElement {
    override spectrumConfig = {
        downstate: ['spectrum-two'],
    };
    protected override render(): TemplateResult {
        return html`
            <sp-theme system="spectrum-two" color="light" scale="medium">
                <slot></slot>
            </sp-theme>
        `;
    }
}

customElements.define('test-downstate-el', TestDownstateEl);

describe('DownState', () => {
    it('adds downstate to SpectrumElement', async () => {
        const el = await fixture<TestDownstateEl>(html`
            <sp-checkbox>I am checkbox</sp-checkbox>
        `);
        new DownState(el as LitElement & { shadowRoot: ShadowRoot });
        await nextFrame();
        await nextFrame();
        const rect = el.getBoundingClientRect();
        await sendMouse({
            steps: [
                {
                    type: 'move',
                    position: [
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                    ],
                },
                {
                    type: 'down',
                },
            ],
        });
        await elementUpdated(el);
        expect(
            el.style.getPropertyValue('--spectrum-downstate-width')
        ).to.not.equal('');

        await sendMouse({
            steps: [
                {
                    type: 'up',
                },
                {
                    type: 'move',
                    position: [
                        rect.left + rect.width * 2,
                        rect.top + rect.height / 2,
                    ],
                },
            ],
        });
        await elementUpdated(el);
        expect(
            el.style.getPropertyValue('--spectrum-downstate-width')
        ).to.equal('');
    });
});
