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

import {
    InteractionController,
    InteractionTypes,
} from './InteractionController.js';

export class MobileController extends InteractionController {
    override type = InteractionTypes.mobile;

    handleClick(): void {
        if (this.preventNextToggle == 'no') {
            this.open = !this.open;
        }
        this.preventNextToggle = 'no';
    }

    public override handlePointerdown(): void {
        this.preventNextToggle = this.open ? 'yes' : 'no';
    }

    override init(): void {
        // Clean up listeners if they've already been bound
        this.abortController?.abort();
        this.abortController = new AbortController();
        const { signal } = this.abortController;
        this.target.addEventListener('click', () => this.handleClick(), {
            signal,
        });
        this.target.addEventListener(
            'pointerdown',
            () => this.handlePointerdown(),
            { signal }
        );
        this.target.addEventListener(
            'focus',
            (event: FocusEvent) => this.handleButtonFocus(event),
            {
                signal,
            }
        );
    }
}