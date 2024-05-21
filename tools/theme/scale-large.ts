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

// import largeSpectrumStyles from '@spectrum-web-components/styles/spectrum-scale-large.min.css' with { type: 'css' };
import largeStyles from '@spectrum-web-components/styles/scale-large.min.css' with { type: 'css' };
import largeVars from '@spectrum-web-components/styles/tokens/large-vars.min.css' with { type: 'css' };
import largeCustom from '@spectrum-web-components/styles/tokens/spectrum/custom-large-vars.min.css' with { type: 'css' };
import largeSpectrum from '@spectrum-web-components/styles/tokens/spectrum/large-vars.min.css' with { type: 'css' };
// @import url('@spectrum-web-components/styles/scale-large.css');
// @import url('@spectrum-web-components/styles/tokens/large-vars.css');
// @import url('@spectrum-web-components/styles/tokens/spectrum/custom-large-vars.css');
// @import url('@spectrum-web-components/styles/tokens/spectrum/large-vars.css');
import { Theme } from './src/Theme.js';
import './core.js';

Theme.registerThemeFragment('large', 'scale', [
    // largeSpectrumStyles,
    largeStyles,
    largeVars,
    largeCustom,
    largeSpectrum,
]);
