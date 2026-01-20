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

import { html } from 'lit';
import type { DecoratorFunction } from '@storybook/types';

/**
 * Decorator that applies selected theme and scale
 */
export const withContext: DecoratorFunction = (Story, context) => {
    const theme = context.globals.theme;
    const scale = context.globals.scale;

    document.documentElement.classList.remove(
        'swc-theme--light',
        'swc-theme--dark',
        'swc-theme--adaptive'
    );
    document.documentElement.classList.add(`swc-theme--${theme}`);

    if (scale === 'large') {
        document.documentElement.classList.add('swc-theme--sizeL');
    } else {
        document.documentElement.classList.remove('swc-theme--sizeL');
    }

    return html`${Story(context)}`;
};
