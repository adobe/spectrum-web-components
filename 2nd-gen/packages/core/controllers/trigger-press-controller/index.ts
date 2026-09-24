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

// Ported from `gen2` (already merged to main as part of #6764, which extracted
// this from Popover's own copy of the same fix), since this branch stack
// predates the 2nd-gen -> gen2 rename and can't import it directly yet.
// Delete this port once this branch rebases past the rename and switch to
// the real one instead.
export {
  TriggerPressController,
  type TriggerPressControllerOptions,
} from './src/trigger-press-controller.js';
