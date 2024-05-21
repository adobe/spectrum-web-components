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

// import mediumSpectrum from '@spectrum-web-components/styles/spectrum-scale-medium.min.css' with { type: 'css' };
import mediumStyles from '@spectrum-web-components/styles/scale-medium.min.css' with { type: 'css' };
import mediumVars from '@spectrum-web-components/styles/tokens/medium-vars.min.css' with { type: 'css' };
import mediumCustom from '@spectrum-web-components/styles/tokens/spectrum/custom-medium-vars.min.css' with { type: 'css' };
import mediumSpectrumVars from '@spectrum-web-components/styles/tokens/spectrum/medium-vars.min.css' with { type: 'css' };
// @import url('@spectrum-web-components/styles/scale-medium.css');
// @import url('@spectrum-web-components/styles/tokens/medium-vars.css');
// @import url('@spectrum-web-components/styles/tokens/spectrum/custom-medium-vars.css');
// @import url('@spectrum-web-components/styles/tokens/spectrum/medium-vars.css');
import { Theme } from './src/Theme.js';
import './core.js';

Theme.registerThemeFragment('medium', 'scale', [
    // mediumSpectrum,
    mediumStyles,
    mediumVars,
    mediumCustom,
    mediumSpectrumVars,
]);
