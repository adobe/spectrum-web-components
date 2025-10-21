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

/**
 * Array of input component tag names for easier iteration and maintenance.
 */
export const INPUT_COMPONENT_TAGS = [
    'SP-SEARCH',
    'SP-TEXTFIELD',
    'SP-NUMBER-FIELD',
    'SP-COMBOBOX',
    'SP-COLOR-FIELD',
] as const;

/**
 * Regular expression pattern to match Spectrum Web Components input elements.
 * Used to identify components that should maintain focus during menu interactions.
 */
export const INPUT_COMPONENT_PATTERN = new RegExp(
    `^(${INPUT_COMPONENT_TAGS.join('|')})$`
);
