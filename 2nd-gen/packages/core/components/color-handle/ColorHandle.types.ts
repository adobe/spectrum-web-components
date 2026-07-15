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

/**
 * The public property contract for `swc-color-handle`.
 *
 * Color Handle exposes no variant, size, or treatment enums; its surface is a
 * single string color plus four boolean flags. This interface documents that
 * contract; the concrete decorated properties live on `ColorHandleBase`.
 */
export interface ColorHandleProperties {
  /** CSS color shown inside the handle; alpha reveals the opacity checkerboard. */
  color: string;
  /** Suppresses the loupe even when `open`. */
  disabled: boolean;
  /** Parent-set focus flag; enlarges the handle as the focus indicator. */
  focused: boolean;
  /** Shows the built-in loupe; auto-toggled by touch. */
  open: boolean;
  /** `true` shows the inner color swatch; `false` renders an outline-only handle. */
  fill: boolean;
}
