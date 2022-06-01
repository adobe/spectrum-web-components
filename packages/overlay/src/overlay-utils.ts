/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import type { ActiveOverlay } from './ActiveOverlay';

export const parentOverlayOf = (el?: Element): ActiveOverlay | null => {
    if (!el) return null;
    const closestOverlay = el.closest('active-overlay');
    if (closestOverlay) {
        return closestOverlay;
    }
    const rootNode = el.getRootNode() as ShadowRoot;
    if (rootNode.host) {
        return parentOverlayOf(rootNode.host);
    }
    return null;
};

export const findOverlaysRootedInOverlay = (
    rootOverlay: ActiveOverlay | undefined,
    activeOverlays: ActiveOverlay[]
): ActiveOverlay[] => {
    const overlays: ActiveOverlay[] = [];
    if (!rootOverlay) return [];
    for (const overlay of activeOverlays) {
        if (!overlay.root) continue;
        if (parentOverlayOf(overlay.root) === rootOverlay) {
            overlays.push(overlay);
            overlays.push(
                ...findOverlaysRootedInOverlay(overlay, activeOverlays)
            );
        }
    }
    return overlays;
};
