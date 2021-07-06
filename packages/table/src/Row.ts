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
    html,
    queryAssignedNodes,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { Cell } from './Cell';

/**
 * @element sp-row
 */
export class Row extends SpectrumElement {
    @queryAssignedNodes('', true, 'sp-cell')
    private cellNodes!: ReadonlyArray<Cell> | null;

    public ready: Promise<ReadonlyArray<Cell>>;

    private readyResolve!: (value: ReadonlyArray<Cell>) => void;

    constructor() {
        super();

        this.ready = new Promise((resolve) => {
            this.readyResolve = resolve;
        });
    }

    protected render(): TemplateResult {
        return html`
            <slot
                style="display: none;"
                @slotchange="${this.onSlotChanges}"
            ></slot>
        `;
    }

    private onSlotChanges(): void {
        if (this.cellNodes !== null) {
            this.readyResolve(this.cellNodes);
        }
    }
}
