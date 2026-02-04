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

import { SpectrumElement as CoreSpectrumElement } from '@spectrum-web-components/core/shared/base/Base.js';
import { coreVersion, version } from './version.js';

export {
    type SpectrumInterface,
    SpectrumMixin,
} from '@spectrum-web-components/core/shared/base/Base.js';

/**
 * Base class for 1st-gen Spectrum Web Components.
 * Extends the core SpectrumElement with 1st-gen specific version information.
 */
export class SpectrumElement extends CoreSpectrumElement {
    /**
     * The version of the 1st-gen Spectrum Web Components library.
     */
    static override VERSION = version;

    /**
     * The version of the core base package.
     */
    static override CORE_VERSION = coreVersion;
}
