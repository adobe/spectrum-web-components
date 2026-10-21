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

import { createScopedRegistry } from '@adobe/spectrum-wc-core/element/index.js';

import { version } from './version.js';

export {
  ScopedElementMixin,
  scopedRenderOptions,
} from '@adobe/spectrum-wc-core/element/index.js';
export { version };

/**
 * The scoped custom element registry of this copy of Spectrum Web Components.
 * Define components in it with `Component.define(registry)`, then attach it to
 * an app's shadow root. Also published at
 * `window.__swc.scopedRegistries.get(version)`.
 *
 * Importing this module throws when the browser does not support scoped
 * registries.
 */
export const registry: CustomElementRegistry = createScopedRegistry(version);
