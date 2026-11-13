/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { supportsScopedRegistries } from '@adobe/spectrum-wc-core/element/index.js';

/**
 * Helpers for apps that render Spectrum Web Components from a scoped custom
 * element registry. See the "Scoped registries" guide.
 */
export {
  ScopedRenderMixin,
  supportsScopedRegistries,
} from '@adobe/spectrum-wc-core/element/index.js';

let registry: CustomElementRegistry | undefined;

/**
 * Returns the scoped custom element registry of this copy of Spectrum Web
 * Components, and creates it on the first call. Apps that load the same copy
 * share it. Another copy, even of the same version, has its own registry,
 * because its classes are different.
 *
 * @throws When the browser does not support scoped registries.
 */
export function getRegistry(): CustomElementRegistry {
  if (!registry) {
    if (!supportsScopedRegistries()) {
      throw new Error(
        'Scoped custom element registries are not supported in this browser. Load a polyfill that implements the standard API, render the app in an iframe, or load one version of Spectrum Web Components per page.'
      );
    }
    registry = new CustomElementRegistry();
  }
  return registry;
}
