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

import { fixture, elementUpdated, expect, html } from '@open-wc/testing';

import '../sp-field-group.js';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import { FieldGroup } from '..';

describe('FieldGroup', () => {
    it('loads default field-group accessibly', async () => {
        const el = await fixture<FieldGroup>(
            html`
                <sp-field-group horizontal>
                    <sp-checkbox>Checkbox 1</sp-checkbox>
                    <sp-checkbox>Checkbox 2</sp-checkbox>
                    <sp-checkbox>Checkbox 3</sp-checkbox>
                    <sp-checkbox>Checkbox 4</sp-checkbox>
                    <sp-checkbox>Checkbox 5</sp-checkbox>
                </sp-field-group>
            `
        );

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
});
