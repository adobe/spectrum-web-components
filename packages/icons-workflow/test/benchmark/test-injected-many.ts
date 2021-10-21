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

import '@iliad-ui/icon/sp-icon.js';
import { AbcIcon } from '@iliad-ui/icons-workflow/src/icons/ABC.js';
import { ActionsIcon } from '@iliad-ui/icons-workflow/src/icons/Actions.js';
import { DisplayAdvertIcon } from '@iliad-ui/icons-workflow/src/icons/DisplayAdvert.js';
import { PrintAdvertIcon } from '@iliad-ui/icons-workflow/src/icons/PrintAdvert.js';
import { AddIcon } from '@iliad-ui/icons-workflow/src/icons/Add.js';
import { AddCircleIcon } from '@iliad-ui/icons-workflow/src/icons/AddCircle.js';
import { AddToIcon } from '@iliad-ui/icons-workflow/src/icons/AddTo.js';
import { AddToSelectionIcon } from '@iliad-ui/icons-workflow/src/icons/AddToSelection.js';
import { AEMScreensIcon } from '@iliad-ui/icons-workflow/src/icons/AEMScreens.js';
import { AirplaneIcon } from '@iliad-ui/icons-workflow/src/icons/Airplane.js';
import { AlertIcon } from '@iliad-ui/icons-workflow/src/icons/Alert.js';
import { AlertAddIcon } from '@iliad-ui/icons-workflow/src/icons/AlertAdd.js';
import { AlertCheckIcon } from '@iliad-ui/icons-workflow/src/icons/AlertCheck.js';
import { AlertCircleIcon } from '@iliad-ui/icons-workflow/src/icons/AlertCircle.js';
import { AlertCircleFilledIcon } from '@iliad-ui/icons-workflow/src/icons/AlertCircleFilled.js';
import { AlgorithmIcon } from '@iliad-ui/icons-workflow/src/icons/Algorithm.js';
import { AliasIcon } from '@iliad-ui/icons-workflow/src/icons/Alias.js';
import { ArrowLeftIcon } from '@iliad-ui/icons-workflow/src/icons/ArrowLeft.js';
import { AlignCenterIcon } from '@iliad-ui/icons-workflow/src/icons/AlignCenter.js';
import { AlignTopIcon } from '@iliad-ui/icons-workflow/src/icons/AlignTop.js';
import { AlignBottomIcon } from '@iliad-ui/icons-workflow/src/icons/AlignBottom.js';
import { AlignLeftIcon } from '@iliad-ui/icons-workflow/src/icons/AlignLeft.js';
import { AlignRightIcon } from '@iliad-ui/icons-workflow/src/icons/AlignRight.js';
import { AnnotateIcon } from '@iliad-ui/icons-workflow/src/icons/Annotate.js';
import { AnnotatePenIcon } from '@iliad-ui/icons-workflow/src/icons/AnnotatePen.js';
import { AssetIcon } from '@iliad-ui/icons-workflow/src/icons/Asset.js';
import { AssetsAddedIcon } from '@iliad-ui/icons-workflow/src/icons/AssetsAdded.js';
import { AssetsDownloadedIcon } from '@iliad-ui/icons-workflow/src/icons/AssetsDownloaded.js';
import { AssetsExpiredIcon } from '@iliad-ui/icons-workflow/src/icons/AssetsExpired.js';
import { AssetsLinkedPublishedIcon } from '@iliad-ui/icons-workflow/src/icons/AssetsLinkedPublished.js';
import { AssetsModifiedIcon } from '@iliad-ui/icons-workflow/src/icons/AssetsModified.js';
import { AssetsPublishedIcon } from '@iliad-ui/icons-workflow/src/icons/AssetsPublished.js';
import { BookIcon } from '@iliad-ui/icons-workflow/src/icons/Book.js';
import { BookmarkIcon } from '@iliad-ui/icons-workflow/src/icons/Bookmark.js';
import { BookmarkSingleIcon } from '@iliad-ui/icons-workflow/src/icons/BookmarkSingle.js';
import { BookmarkSingleOutlineIcon } from '@iliad-ui/icons-workflow/src/icons/BookmarkSingleOutline.js';
import { setCustomTemplateLiteralTag } from '@iliad-ui/icons-workflow/src/custom-tag.js';
import { html } from '@iliad-ui/base';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

setCustomTemplateLiteralTag(html);

measureFixtureCreation(html`
    <sp-icon>${AbcIcon({ hidden: true })}</sp-icon>
    <sp-icon>${ActionsIcon({ hidden: true })}</sp-icon>
    <sp-icon>${DisplayAdvertIcon({ hidden: true })}</sp-icon>
    <sp-icon>${PrintAdvertIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AddIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AddCircleIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AddToIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AddToSelectionIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AEMScreensIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AirplaneIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlertIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlertAddIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlertCheckIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlertCircleIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlertCircleFilledIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlgorithmIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AliasIcon({ hidden: true })}</sp-icon>
    <sp-icon>${ArrowLeftIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignCenterIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignTopIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignBottomIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignLeftIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AlignRightIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AnnotateIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AnnotatePenIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AssetIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AssetsAddedIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AssetsDownloadedIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AssetsExpiredIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AssetsLinkedPublishedIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AssetsModifiedIcon({ hidden: true })}</sp-icon>
    <sp-icon>${AssetsPublishedIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BookIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BookmarkIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BookmarkSingleIcon({ hidden: true })}</sp-icon>
    <sp-icon>${BookmarkSingleOutlineIcon({ hidden: true })}</sp-icon>
`);
