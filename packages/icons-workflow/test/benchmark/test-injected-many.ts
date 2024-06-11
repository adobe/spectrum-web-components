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

import '@spectrum-web-components/icon/sp-icon.js';
import { AccessibilityIcon } from '@spectrum-web-components/icons-workflow/src/icons/Accessibility.js';
import { AddIcon } from '@spectrum-web-components/icons-workflow/src/icons/Add.js';
import { AddContentIcon } from '@spectrum-web-components/icons-workflow/src/icons/AddContent.js';
import { AddToIcon } from '@spectrum-web-components/icons-workflow/src/icons/AddTo.js';
import { AddToSelectionIcon } from '@spectrum-web-components/icons-workflow/src/icons/AddToSelection.js';
import { AlertCircleIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlertCircle.js';
import { AlertTriangleIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlertTriangle.js';
import { AlignBottomIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignBottom.js';
import { AlignCenterIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignCenter.js';
import { AlignLeftIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignLeft.js';
import { AlignMiddleIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignMiddle.js';
import { AlignOnGridIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignOnGrid.js';
import { AlignRightIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignRight.js';
import { AlignTopIcon } from '@spectrum-web-components/icons-workflow/src/icons/AlignTop.js';
import { AllCapsIcon } from '@spectrum-web-components/icons-workflow/src/icons/AllCaps.js';
import { AnimationIcon } from '@spectrum-web-components/icons-workflow/src/icons/Animation.js';
import { AnimationNoIcon } from '@spectrum-web-components/icons-workflow/src/icons/AnimationNo.js';
import { AppGearIcon } from '@spectrum-web-components/icons-workflow/src/icons/AppGear.js';
import { AppsIcon } from '@spectrum-web-components/icons-workflow/src/icons/Apps.js';
import { AppsAllIcon } from '@spectrum-web-components/icons-workflow/src/icons/AppsAll.js';
import { AppsInYourPlanIcon } from '@spectrum-web-components/icons-workflow/src/icons/AppsInYourPlan.js';
import { ArchiveIcon } from '@spectrum-web-components/icons-workflow/src/icons/Archive.js';
import { ArrowHeadToolIcon } from '@spectrum-web-components/icons-workflow/src/icons/ArrowHeadTool.js';
import { ArtboardIcon } from '@spectrum-web-components/icons-workflow/src/icons/Artboard.js';
import { AspectRatioIcon } from '@spectrum-web-components/icons-workflow/src/icons/AspectRatio.js';
import { AssetIcon } from '@spectrum-web-components/icons-workflow/src/icons/Asset.js';
import { AttachIcon } from '@spectrum-web-components/icons-workflow/src/icons/Attach.js';
import { AutoSelectSubjectIcon } from '@spectrum-web-components/icons-workflow/src/icons/AutoSelectSubject.js';
import { BackgroundIcon } from '@spectrum-web-components/icons-workflow/src/icons/Background.js';
import { BellIcon } from '@spectrum-web-components/icons-workflow/src/icons/Bell.js';
import { BellRotatedIcon } from '@spectrum-web-components/icons-workflow/src/icons/BellRotated.js';
import { BetaAppIcon } from '@spectrum-web-components/icons-workflow/src/icons/BetaApp.js';
import { BinocularsIcon } from '@spectrum-web-components/icons-workflow/src/icons/Binoculars.js';
import { BriefcaseIcon } from '@spectrum-web-components/icons-workflow/src/icons/Briefcase.js';
import { BrushIcon } from '@spectrum-web-components/icons-workflow/src/icons/Brush.js';
import { BugIcon } from '@spectrum-web-components/icons-workflow/src/icons/Bug.js';
import { setCustomTemplateLiteralTag } from '@spectrum-web-components/icons-workflow/src/custom-tag.js';
import { html } from '@spectrum-web-components/base';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

setCustomTemplateLiteralTag(html);

measureFixtureCreation(html`
    <sp-icon>${AccessibilityIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AddIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AddContentIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AddToIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AddToSelectionIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlertCircleIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlertTriangleIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignBottomIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignCenterIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignLeftIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignMiddleIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignOnGridIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignRightIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignTopIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AllCapsIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AnimationIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AnimationNoIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AppGearIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AppsIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AppsAllIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AppsInYourPlanIcon({ hidden: true })}</sp-icon>
    <sp-icon>${ArchiveIcon({ hidden: true })}</sp-icon>
    <sp-icon>${ArrowHeadToolIcon({ hidden: true })}</sp-icon>
    <sp-icon>${ArtboardIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AspectRatioIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AssetIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AttachIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AutoSelectSubjectIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BackgroundIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BellIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BellRotatedIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BetaAppIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BinocularsIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BriefcaseIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BrushIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BugIcon({ hidden: true })}</sp-icon>
`);
