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
import { elementUpdated, expect, oneEvent } from '@open-wc/testing';
import { AccordionItem } from '@spectrum-web-components/accordion/src/AccordionItem.js';
import { OverlayTrigger } from '../src/OverlayTrigger.js';
import { accordion } from '../stories/overlay.stories.js';
import {
    fixture,
    ignoreResizeObserverLoopError,
} from '../../../test/testing-helpers.js';

describe('sp-update-overlays event', () => {
    ignoreResizeObserverLoopError(before, after);
    it('updates overlay height', async () => {
        const el = await fixture<OverlayTrigger>(accordion());
        const container = el.querySelector('sp-popover') as HTMLElement;
        const item = el.querySelector(
            '[label="Other things"]'
        ) as AccordionItem;

        el.triggeredBy = 'click';
        await elementUpdated(item);

        const opened = oneEvent(el, 'sp-opened');
        el.open = 'click';
        await opened;

        const height1 = container.getBoundingClientRect().height;
        item.click();
        await elementUpdated(item);

        const height2 = container.getBoundingClientRect().height;
        expect(height1).to.be.lessThan(height2);
    });
});
