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
 * Returns the DOM container(s) that should receive the lang attribute when the user changes language.
 * Setting lang on the document element ensures :lang() selectors and font loading apply to the whole preview.
 */
export function fetchContainers(_storyId: string, _isDocs: boolean): Element[] {
    return [document.documentElement];
}
