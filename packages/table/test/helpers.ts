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
    VirtualizerHostElement,
    virtualizerRef,
} from '@lit-labs/virtualizer/virtualize.js';
import { fixture, html } from '@open-wc/testing';
import { TemplateResult } from '@spectrum-web-components/base';
import type { Table, TableBody } from '@spectrum-web-components/table';
import type { Theme } from '@spectrum-web-components/theme';

export async function styledFixture<T extends Element>(
    story: TemplateResult
): Promise<T> {
    const test = await fixture<Theme>(html`
        <sp-theme system="spectrum" scale="medium" color="light">
            ${story}
        </sp-theme>
    `);
    return test.children[0] as T;
}

/* awaiting a `rangeChanged` event does not guarantee that the component has updated. We need to use
 ** layout complete to ensure the TableBody has updated for tests involving scrolling.
 */
export async function tableLayoutComplete(table: Table): Promise<void> {
    const body = table.querySelector('sp-table-body') as unknown as TableBody &
        VirtualizerHostElement;
    await body[virtualizerRef]?.layoutComplete;
}
