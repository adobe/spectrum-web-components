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

// `dist/custom-elements.json` is a generated build artifact absent at type-check
// time (the gate does not build). VRT stories import it for custom-property
// coverage; this declares its shape so the import type-resolves without the file.
declare module '*/dist/custom-elements.json' {
  const manifest: {
    modules: Array<{
      path: string;
      declarations: Array<{
        name: string;
        cssProperties?: Array<{ name: string }>;
        [key: string]: unknown;
      }>;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  };
  export default manifest;
}
