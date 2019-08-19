/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
export * from './theme-dark';
export * from './scale-medium';

import { ThemeDark } from './theme-dark';
import { ThemeLight } from './theme-light';
import { ScaleMedium } from './scale-medium';
import { Theme } from './theme';

if (!customElements.get('sp-theme-dark')) {
    customElements.define('sp-theme-dark', ThemeDark);
}

if (!customElements.get('sp-theme-light')) {
    customElements.define('sp-theme-light', ThemeLight);
}

if (!customElements.get('sp-scale-medium')) {
    customElements.define('sp-scale-medium', ScaleMedium);
}

if (!customElements.get('sp-theme')) {
    customElements.define('sp-theme', Theme);
}

declare global {
    interface HTMLElementTagNameMap {
        'sp-theme-dark': ThemeDark;
        'sp-theme-light': ThemeLight;
        'sp-scale-medium': ScaleMedium;
        'sp-theme': Theme;
    }
}
