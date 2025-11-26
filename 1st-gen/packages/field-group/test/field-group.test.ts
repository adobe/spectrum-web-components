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

import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { findDescribedNode } from '../../../test/testing-helpers-a11y.js';
import { HelpText } from '@spectrum-web-components/help-text';
import { FieldGroup } from '@spectrum-web-components/field-group';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/field-group/sp-field-group.js';
import { testForLitDevWarnings } from '../../../test/testing-helpers.js';

describe('FieldGroup', () => {
    testForLitDevWarnings(
        async () =>
            await fixture<FieldGroup>(html`
                <sp-field-group horizontal>
                    <sp-checkbox>Checkbox 1</sp-checkbox>
                    <sp-checkbox>Checkbox 2</sp-checkbox>
                    <sp-checkbox>Checkbox 3</sp-checkbox>
                    <sp-checkbox>Checkbox 4</sp-checkbox>
                    <sp-checkbox>Checkbox 5</sp-checkbox>
                </sp-field-group>
            `)
    );
    it('loads default field-group accessibly', async () => {
        const el = await fixture<FieldGroup>(html`
            <sp-field-group horizontal>
                <sp-checkbox>Checkbox 1</sp-checkbox>
                <sp-checkbox>Checkbox 2</sp-checkbox>
                <sp-checkbox>Checkbox 3</sp-checkbox>
                <sp-checkbox>Checkbox 4</sp-checkbox>
                <sp-checkbox>Checkbox 5</sp-checkbox>
            </sp-field-group>
        `);

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });

    describe('help text', () => {
        const name = 'This is a field group';
        const description = 'This text helps you fill it out';
        const descriptionNegative = 'This text helps you when invalid';
        it('accepts help text in `slot="help-text"`', async () => {
            const el = await fixture(html`
                <sp-field-group label=${name}>
                    <sp-help-text slot="help-text">${description}</sp-help-text>
                </sp-field-group>
            `);

            await elementUpdated(el);

            await findDescribedNode(name, description);
        });
        it('accepts help text in `slot="help-text"` w/ own ID', async () => {
            const el = await fixture(html`
                <sp-field-group label=${name}>
                    <sp-help-text slot="help-text" id="help-text-id-1">
                        ${description}
                    </sp-help-text>
                </sp-field-group>
            `);

            await elementUpdated(el);

            await findDescribedNode(name, description);
        });
        it('manages neutral/negative help text pairs', async () => {
            const el = await fixture<FieldGroup>(html`
                <sp-field-group label=${name}>
                    <sp-help-text slot="help-text">${description}</sp-help-text>
                    <sp-help-text slot="negative-help-text">
                        ${descriptionNegative}
                    </sp-help-text>
                </sp-field-group>
            `);
            const negativeHelpText = el.querySelector(
                '[slot="negative-help-text"]'
            ) as HelpText;

            await elementUpdated(el);

            expect(negativeHelpText.variant).to.equal('neutral');
            await findDescribedNode(name, description);

            el.invalid = true;
            await elementUpdated(el);

            expect(negativeHelpText.variant).to.equal('negative');
            await findDescribedNode(name, descriptionNegative);
        });
        it('manages neutral/negative help text pairs w/ own IDs', async () => {
            const el = await fixture<FieldGroup>(html`
                <sp-field-group label=${name}>
                    <sp-help-text slot="help-text" id="help-text-id-2">
                        ${description}
                    </sp-help-text>
                    <sp-help-text slot="negative-help-text" id="help-text-id-3">
                        ${descriptionNegative}
                    </sp-help-text>
                </sp-field-group>
            `);
            const negativeHelpText = el.querySelector(
                '[slot="negative-help-text"]'
            ) as HelpText;

            await elementUpdated(el);

            expect(negativeHelpText.variant).to.equal('neutral');
            await findDescribedNode(name, description);

            el.invalid = true;
            await elementUpdated(el);

            expect(negativeHelpText.variant).to.equal('negative');
            await findDescribedNode(name, descriptionNegative);
        });
    });
});
