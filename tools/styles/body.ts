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

import baseStyles from './src/spectrum-base.css.js';
import langBaseStyles from './src/spectrum-lang.css.js';
import langOverrides from './src/lang-overrides.css.js';
import bodyBaseStyles from './src/spectrum-body.css.js';
import bodyOverrides from './src/body-overrides.css.js';

import { css } from 'lit';

// bodyStyles is a combination of bodyBaseStyles and bodyOverrides
const bodyStyles = css`
    ${bodyBaseStyles}
    ${bodyOverrides}
`;

// langStyles is a combination of langBaseStyles and langOverrides
const langStyles = css`
    ${langBaseStyles}
    ${langOverrides}
`;

export default [baseStyles, langStyles, bodyStyles];
