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
 * Capitalizes the first character of a string.
 *
 * @param str - The string to capitalize
 * @returns The capitalized string, or an empty string if the input is not a string
 *
 * @example
 * ```typescript
 * capitalize('hello') // Returns: 'Hello'
 * capitalize('world') // Returns: 'World'
 * capitalize('') // Returns: ''
 * capitalize(undefined) // Returns: ''
 * ```
 */
export function capitalize(str?: string): string {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
