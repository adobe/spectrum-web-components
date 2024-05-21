/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

// import darkStyles from './src/theme-dark.css.js';
import darkSpectrumStyles from '@spectrum-web-components/styles/spectrum-theme-dark.min.css' with { type: 'css' };
import darkStyles from '@spectrum-web-components/styles/theme-dark.min.css' with { type: 'css' };
import darkVars from '@spectrum-web-components/styles/tokens/dark-vars.min.css' with { type: 'css' };
import darkCustom from '@spectrum-web-components/styles/tokens/spectrum/custom-dark-vars.min.css' with { type: 'css' };
// @import url('@spectrum-web-components/styles/theme-dark.css');
// @import url('@spectrum-web-components/styles/tokens/dark-vars.css');
// @import url('@spectrum-web-components/styles/tokens/spectrum/custom-dark-vars.css');
import { Theme } from './src/Theme.js';
import './core.js';

Theme.registerThemeFragment('dark', 'color', [
    darkSpectrumStyles,
    darkStyles,
    darkVars,
    darkCustom,
]);
