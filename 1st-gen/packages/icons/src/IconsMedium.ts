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

import { TemplateResult } from '@spectrum-web-components/base';

import { IconsetSVG } from '@spectrum-web-components/iconset/src/iconset-svg.js';

import iconsSVG from './icons-medium.svg.js';

/**
 * @element sp-icons-medium
 */
export class IconsMedium extends IconsetSVG {
    public constructor() {
        super();
        this.name = 'ui'; // default iconset name for these icons
    }

    protected override firstUpdated(): void {
        super.firstUpdated();
        if (window.__swc?.DEBUG) {
            window.__swc.warn(
                this,
                'Icons package has been deprecated and will be removed from the project in an upcoming release. For default Spectrum Icons, learn more about leveraging UI Icons (https://opensource.adobe.com/spectrum-web-components/components/icons-ui/) or Workflow Icons (https://opensource.adobe.com/spectrum-web-components/components/icons-workflow/) as an alternative.',
                'https://opensource.adobe.com/spectrum-web-components/components/icons/#deprecated',
                { level: 'deprecation' }
            );
        }
    }

    protected override renderDefaultContent(): TemplateResult {
        return iconsSVG;
    }
    /**
     * Overrides createIconName to make icon strings compatible with spectrum-icon id format
     * @param icon
     * @param size
     */
    protected override getSVGIconName(icon: string): string {
        return `spectrum-icon-${icon}`;
    }
    protected override getSanitizedIconName(icon: string): string {
        return icon.replace('spectrum-icon-', '');
    }
}
