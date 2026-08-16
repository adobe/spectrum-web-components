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
 * Base class for a decorative divider between rows or groups within a
 * `swc-menu` or `swc-action-menu` list (or a `swc-menu-item` submenu). A
 * separator is a direct child of one of those three hosts, not a child of a
 * `swc-menu-group`, and accepts no slotted content.
 */
export abstract class MenuSeparatorBase extends SpectrumElement {}
