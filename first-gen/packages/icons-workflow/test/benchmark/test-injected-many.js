"use strict";
import "@spectrum-web-components/icon/sp-icon.js";
import { AbcIcon } from "@spectrum-web-components/icons-workflow/src/icons/ABC.js";
import { ActionsIcon } from "@spectrum-web-components/icons-workflow/src/icons/Actions.js";
import { DisplayAdvertIcon } from "@spectrum-web-components/icons-workflow/src/icons/DisplayAdvert.js";
import { PrintAdvertIcon } from "@spectrum-web-components/icons-workflow/src/icons/PrintAdvert.js";
import { AddIcon } from "@spectrum-web-components/icons-workflow/src/icons/Add.js";
import { AddCircleIcon } from "@spectrum-web-components/icons-workflow/src/icons/AddCircle.js";
import { AddToIcon } from "@spectrum-web-components/icons-workflow/src/icons/AddTo.js";
import { AddToSelectionIcon } from "@spectrum-web-components/icons-workflow/src/icons/AddToSelection.js";
import { AEMScreensIcon } from "@spectrum-web-components/icons-workflow/src/icons/AEMScreens.js";
import { AirplaneIcon } from "@spectrum-web-components/icons-workflow/src/icons/Airplane.js";
import { AlertIcon } from "@spectrum-web-components/icons-workflow/src/icons/Alert.js";
import { AlertAddIcon } from "@spectrum-web-components/icons-workflow/src/icons/AlertAdd.js";
import { AlertCheckIcon } from "@spectrum-web-components/icons-workflow/src/icons/AlertCheck.js";
import { AlertCircleIcon } from "@spectrum-web-components/icons-workflow/src/icons/AlertCircle.js";
import { AlertCircleFilledIcon } from "@spectrum-web-components/icons-workflow/src/icons/AlertCircleFilled.js";
import { AlgorithmIcon } from "@spectrum-web-components/icons-workflow/src/icons/Algorithm.js";
import { AliasIcon } from "@spectrum-web-components/icons-workflow/src/icons/Alias.js";
import { ArrowLeftIcon } from "@spectrum-web-components/icons-workflow/src/icons/ArrowLeft.js";
import { AlignCenterIcon } from "@spectrum-web-components/icons-workflow/src/icons/AlignCenter.js";
import { AlignTopIcon } from "@spectrum-web-components/icons-workflow/src/icons/AlignTop.js";
import { AlignBottomIcon } from "@spectrum-web-components/icons-workflow/src/icons/AlignBottom.js";
import { AlignLeftIcon } from "@spectrum-web-components/icons-workflow/src/icons/AlignLeft.js";
import { AlignRightIcon } from "@spectrum-web-components/icons-workflow/src/icons/AlignRight.js";
import { AnnotateIcon } from "@spectrum-web-components/icons-workflow/src/icons/Annotate.js";
import { AnnotatePenIcon } from "@spectrum-web-components/icons-workflow/src/icons/AnnotatePen.js";
import { AssetIcon } from "@spectrum-web-components/icons-workflow/src/icons/Asset.js";
import { AssetsAddedIcon } from "@spectrum-web-components/icons-workflow/src/icons/AssetsAdded.js";
import { AssetsDownloadedIcon } from "@spectrum-web-components/icons-workflow/src/icons/AssetsDownloaded.js";
import { AssetsExpiredIcon } from "@spectrum-web-components/icons-workflow/src/icons/AssetsExpired.js";
import { AssetsLinkedPublishedIcon } from "@spectrum-web-components/icons-workflow/src/icons/AssetsLinkedPublished.js";
import { AssetsModifiedIcon } from "@spectrum-web-components/icons-workflow/src/icons/AssetsModified.js";
import { AssetsPublishedIcon } from "@spectrum-web-components/icons-workflow/src/icons/AssetsPublished.js";
import { BookIcon } from "@spectrum-web-components/icons-workflow/src/icons/Book.js";
import { BookmarkIcon } from "@spectrum-web-components/icons-workflow/src/icons/Bookmark.js";
import { BookmarkSingleIcon } from "@spectrum-web-components/icons-workflow/src/icons/BookmarkSingle.js";
import { BookmarkSingleOutlineIcon } from "@spectrum-web-components/icons-workflow/src/icons/BookmarkSingleOutline.js";
import { setCustomTemplateLiteralTag } from "@spectrum-web-components/icons-workflow/src/custom-tag.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
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
//# sourceMappingURL=test-injected-many.js.map
