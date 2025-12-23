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

import { addons } from '@storybook/manager-api';
import { lightTheme, darkTheme, THEME_CHANGE_EVENT } from './theme';

addons.setConfig({
    theme: lightTheme,
    sidebar: {
        showRoots: false,
    },
});

// Listen for theme changes from the preview and update the manager theme
addons.register('swc-theme-sync', (api) => {
    const channel = addons.getChannel();

    channel.on(THEME_CHANGE_EVENT, (theme: string) => {
        // For 'adaptive' theme, check system preference
        let effectiveTheme = theme;
        if (theme === 'adaptive') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)')
                .matches
                ? 'dark'
                : 'light';
        }

        api.setOptions({
            theme: effectiveTheme === 'dark' ? darkTheme : lightTheme,
        });
    });
});
