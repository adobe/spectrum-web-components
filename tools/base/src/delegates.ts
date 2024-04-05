/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import type { ReactiveController } from 'lit';
import type { SpectrumElement } from '@spectrum-web-components/base';
import { DownState } from '@spectrum-web-components/base/src/downstate.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DelegatesList: Record<string, any> = {
    downState: DownState,
};

export class Delegates implements ReactiveController {
    private host: SpectrumElement;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private controllers: Record<string, any> = {};

    set system(value: string) {
        const { spectrumConfig } = this.host;
        Object.entries(spectrumConfig).forEach(([controller, systems]) => {
            if (systems.includes(value)) {
                this.controllers[controller] = new DelegatesList[controller](
                    this.host
                );
            }
        });
    }

    constructor(host: SpectrumElement) {
        this.host = host;
        this.host.addController(this);
    }

    public hostConnected(): void {}

    public hostDisconnected(): void {}
}
