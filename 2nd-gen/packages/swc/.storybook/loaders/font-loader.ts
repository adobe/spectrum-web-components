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
import type {} from '../storybook-env';

export const FontLoader = async () => ({
  fonts: (async () => {
    // Wait for the Typekit library to signal that fonts have been activated.
    // The old check (`typeof window.Typekit !== 'undefined'`) resolved as soon
    // as the Typekit *script* loaded, before font files were fetched. We now
    // also gate on `FontsLoading` so we don't resolve mid-download.
    await new Promise<void>((resolve) => {
      if (
        typeof window.Typekit !== 'undefined' &&
        window.FontsLoading !== true
      ) {
        resolve();
        return;
      }

      document.addEventListener('typekit-loaded', () => resolve(), {
        once: true,
      });

      // Don't block stories forever if fonts fail to load.
      setTimeout(resolve, 5000);
    });

    // `document.fonts.ready` resolves when all queued font-face loads
    // are complete — the browser-native signal that text layout is final.
    await document.fonts.ready;

    // Two rAF ticks guarantee the browser has
    // repainted with the newly-loaded font metrics.
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve());
      });
    });
  })(),
});
