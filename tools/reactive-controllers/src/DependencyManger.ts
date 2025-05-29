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

import type { ReactiveElement } from 'lit';
export const dependencyManagerLoadedSymbol = Symbol(
    'dependency manager loaded'
);

/**
 * Manage the availability of custom element dependencies of a host element
 * to gate render and functional behavior before and after their presence
 */
export class DependencyManagerController {
    private dependencies: Record<string, boolean> = {};

    private host!: ReactiveElement;

    /**
     * Whether all of the provided dependencies have been registered.
     * This will be `false` when no dependencies have been listed for management.
     * Changes to this value will trigger `requestUpdate()` on the host.
     */
    public get loaded(): boolean {
        return this._loaded;
    }

    private set loaded(loaded: boolean) {
        if (loaded === this.loaded) return;
        this._loaded = loaded;
        this.host.requestUpdate(dependencyManagerLoadedSymbol, !this.loaded);
    }

    private _loaded = false;

    constructor(host: ReactiveElement) {
        this.host = host;
    }

    /**
     * Submit a custom element tag name to be managed as a dependency.
     *
     * @param dependency {string} - the custom element tag to manage
     * @param alreadyLoaded {boolean} - force the managemented custom element to be listed as loaded
     */
    public add(dependency: string, alreadyLoaded?: boolean): void {
        const loaded =
            !!alreadyLoaded ||
            !!customElements.get(dependency) ||
            this.dependencies[dependency];
        if (!loaded) {
            customElements.whenDefined(dependency).then(() => {
                this.add(dependency, true);
            });
        }
        this.dependencies = {
            ...this.dependencies,
            [dependency]: loaded,
        };
        // Update the loaded property based on the new loaded state of all dependencies
        this.loaded = Object.values(this.dependencies).every(
            (loaded) => loaded
        );
    }
}
