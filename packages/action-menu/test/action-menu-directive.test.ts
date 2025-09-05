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

import { expect, oneEvent } from '@open-wc/testing';
import { ActionMenu } from '@spectrum-web-components/action-menu';
import { sendKeys } from '@web/test-runner-commands';

import { directive } from '../stories/action-menu.stories.js';
import { fixture } from '../../../test/testing-helpers.js';
import { nextFrame } from '@spectrum-web-components/overlay/src/AbstractOverlay.js';

describe('Slottable Request Directive', () => {
    it('Action Menu requests for options rendering when opening and closing', async function () {
        const el = await fixture<ActionMenu>(directive());
        const initialNodeLength = el.children.length;

        expect(el.open, 'should be closed initially').to.be.false;
        expect(el.children.length).to.equal(initialNodeLength);

        const opened = oneEvent(el, 'sp-opened');

        el.click();
        await opened;

        expect(el.open, 'should be open after clicking').to.be.true;
        expect(el.children.length).to.be.gt(initialNodeLength);

        const closed = oneEvent(el, 'sp-closed');

        await sendKeys({ press: 'Escape' });
        await closed;
        await nextFrame();
        await nextFrame();

        expect(el.open, 'should be closed after escape key is pressed').to.be
            .false;
        expect(el.children.length).to.equal(initialNodeLength);
    });
});
