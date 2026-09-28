/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
// Cap how long a story waits for Adobe Fonts before rendering anyway. Typekit
// loads from an external CDN (use.typekit.net); when it is slow, blocked, or
// reports `inactive`, the `typekit-loaded` event never fires. Without this
// ceiling the loader promise never resolves, the story never finishes
// rendering, and the CI axe smoke test times out on a random story.
const FONT_LOAD_TIMEOUT_MS = 3000;

// FontLoader is a global loader, so it runs for every story render on the page.
// Memoize the readiness promise at module scope so the timeout ceiling is paid
// at most once per page: in the failure mode (Typekit never loads) later stories
// reuse the already-resolved promise instead of each waiting the full timeout.
let fontsReady: Promise<void> | undefined;

const whenFontsReady = (): Promise<void> =>
  (fontsReady ??= new Promise<void>((resolve) => {
    // First check if the fonts are already loaded
    if (typeof window.Typekit !== 'undefined') {
      resolve();
      return;
    }

    // Fallback: never block the render on the external font CDN.
    const timer = setTimeout(resolve, FONT_LOAD_TIMEOUT_MS);

    // Listen for a custom event indicating the Adobe Fonts have loaded.
    document.addEventListener(
      'typekit-loaded',
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true }
    );
  }));

export const FontLoader = async () => ({ fonts: whenFontsReady() });
