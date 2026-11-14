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

type SwcTestGlobals = {
  warn: (...args: unknown[]) => void;
  DEBUG?: boolean;
  issuedWarnings?: Set<string>;
};

// Returns the shared SWC test globals, creating defaults when needed.
export const getSwcTestGlobals = (): SwcTestGlobals => {
  // The global `Window.__swc` is richly typed and required; override it with the loose test shape so the minimal stub below is assignable.
  const swcWindow = window as Omit<Window, '__swc'> & {
    __swc?: SwcTestGlobals;
  };

  if (!swcWindow.__swc) {
    swcWindow.__swc = { warn: () => {} };
  }

  return swcWindow.__swc;
};
