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

import type { LitElement } from 'lit';
import { DownState } from './downstate.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DelegatesList: Record<string, any> = {
    downstate: DownState,
};

export type SpectrumConfig = {
    downstate?: string[];
};

export class Delegates {
    private host: LitElement;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private controllers: Record<string, any> = {};

    set system(value: string) {
        const { spectrumConfig } = this.host as unknown as {
            spectrumConfig: SpectrumConfig;
        };
        Object.entries(spectrumConfig as SpectrumConfig).forEach(
            ([controller, systems]) => {
                if (systems.includes(value)) {
                    const ControllerClass = DelegatesList[controller];
                    this.controllers[controller] = new ControllerClass(
                        this.host
                    );
                }
            }
        );
    }

    constructor(host: LitElement) {
        this.host = host;
    }
}
