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
import { Theme } from '@spectrum-web-components/theme';
import { expect } from '@open-wc/testing';
import { version } from '@spectrum-web-components/base/src/version.js';

class DirElement extends Theme {}

customElements.define('dir-element', DirElement);

describe('Theme', () => {
    it('has a static VERSION property', () => {
        expect(DirElement.VERSION).to.equal(version);
    });
});
