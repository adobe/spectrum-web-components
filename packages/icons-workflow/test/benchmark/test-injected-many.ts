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

import '@spectrum-web-components/icon/sp-icon.js';
import { AbcIcon } from '@spectrum-web-components/icons-workflow/src/icons/ABC.js';
import { AccessibilityIcon } from '@spectrum-web-components/icons-workflow/src/icons/Accessibility.js';
import { AddIcon } from '@spectrum-web-components/icons-workflow/src/icons/Add.js';
import { AddCircleIcon } from '@spectrum-web-components/icons-workflow/src/icons/AddCircle.js';
import { AddContentIcon } from '@spectrum-web-components/icons-workflow/src/icons/AddContent.js';
import { AlertDiamondIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlertDiamond.js';
import { AlertTriangleIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlertTriangle.js';
import { AlignCenterIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignCenter.js';
import { AlignTopIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignTop.js';
import { AlignBottomIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignBottom.js';
import { AlignLeftIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignLeft.js';
import { AlignRightIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignRight.js';
import { AssetIcon } from '@spectrum-web-components/icons-workflow/src/icons/Asset.js';
import { BookmarkIcon } from '@spectrum-web-components/icons-workflow/src/icons/Bookmark.js';
import { BrandIcon } from '@spectrum-web-components/icons-workflow/src/icons/Brand.js';
import { BriefcaseIcon } from '@spectrum-web-components/icons-workflow/src/icons/Briefcase.js';
import { setCustomTemplateLiteralTag } from '@spectrum-web-components/icons-workflow/src/custom-tag.js';
import { html } from '@spectrum-web-components/base';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

type IconSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
const size: IconSize = 'm';

setCustomTemplateLiteralTag(html);

measureFixtureCreation(html`
    <sp-icon size=${size}>${AbcIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AccessibilityIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AddContentIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AddIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AddCircleIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AlertDiamondIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AlertTriangleIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AlignCenterIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AlignTopIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AlignBottomIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AlignLeftIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AlignRightIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${AssetIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${BookmarkIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${BrandIcon({ hidden: true })}</sp-icon>
    <sp-icon size=${size}>${BriefcaseIcon({ hidden: true })}</sp-icon>
`);
