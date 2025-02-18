/*!
 * Copyright 2024 Adobe. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at <http://www.apache.org/licenses/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const modes = {
    'Light | LTR': {
        context: 'spectrum-two',
        color: 'light',
        textDirection: 'ltr',
    },
    'Dark | RTL': {
        context: 'spectrum-two',
        color: 'dark',
        textDirection: 'rtl',
    },
    'S1 | Light | LTR': {
        context: 'spectrum',
        color: 'light',
        textDirection: 'ltr',
    },
    'Express | Light | LTR': {
        context: 'express',
        color: 'light',
        textDirection: 'ltr',
    },
};

export default modes;

export const disableDefaultModes = {
    ...Object.keys(modes).reduce((acc, key) => {
        acc[key] = { disable: true };
        return acc;
    }, {}),
};
