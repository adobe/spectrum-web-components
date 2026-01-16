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

import { create, themes } from '@storybook/theming';

const brandConfig = {
    brandTitle: 'Spectrum Web Components',
    brandUrl: 'https://opensource.adobe.com/spectrum-web-components',
    brandImage:
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjEuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMCAyNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzAgMjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkEwRjAwO30KPC9zdHlsZT4KPGc+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjE5LDAgMzAsMCAzMCwyNiAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjExLjEsMCAwLDAgMCwyNiAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjE1LDkuNiAyMi4xLDI2IDE3LjUsMjYgMTUuNCwyMC44IDEwLjIsMjAuOCAJIi8+CjwvZz4KPC9zdmc+Cg==',
};

export const lightTheme = create({
    ...themes.light,
    ...brandConfig,
    base: 'light',
});

export const darkTheme = create({
    ...themes.dark,
    ...brandConfig,
    base: 'dark',
});

export const THEME_CHANGE_EVENT = 'swc-theme-change';
