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

import { Overlay } from './Overlay.js';

export class VirtualTrigger {
    private x = 0;
    private y = 0;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public updateBoundingClientRect(x: number, y: number): void {
        this.x = x;
        this.y = y;
        Overlay.update();
    }

    public getBoundingClientRect(): DOMRect {
        return {
            width: 0,
            height: 0,
            top: this.y,
            right: this.x,
            y: this.y,
            x: this.x,
            bottom: this.y,
            left: this.x,
            /* c8 ignore next 3 */
            toJSON() {
                return;
            },
        };
    }
}
