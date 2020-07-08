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

import '../src/focusable';
import { Focusable } from '../src/focusable';
import { html } from 'lit-element';
import { fixture, elementUpdated, expect } from '@open-wc/testing';

describe('Focusable', () => {
    it('enforces the presense of a `focusElement`', async () => {
        customElements.define('focusable-test', class extends Focusable {});
        try {
            const el = await fixture<Focusable>(
                html`
                    <focusable-test></focusable-test>
                `
            );
            await elementUpdated(el);
            expect('failed').to.not.equal('failed');
        } catch (error) {
            expect(() => {
                throw error;
            }).to.throw('Must implement focusElement getter!');
        }
    });
});
