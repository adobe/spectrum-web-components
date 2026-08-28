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

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

/**
 * Base class for the menu host. Implements the
 * {@link https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ | menu button}
 * pattern: an externally-referenced trigger (`for`/`triggerElement`) opens a
 * `PlacementController`-anchored surface containing a `role="menu"` list.
 * Trigger resolution, ARIA wiring, and keyboard/focus management are added in
 * a later migration phase.
 *
 * @slot - `swc-menu-item` elements. `swc-menu-group` and `swc-divider` (as a
 *   separator) join in a later migration phase.
 */
export abstract class MenuBase extends SpectrumElement {}
