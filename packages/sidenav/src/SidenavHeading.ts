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

import {
    CSSResultArray,
    html,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import sidenavItemStyles from './sidenav-item.css.js';
import sidenavHeadingStyles from './sidenav-heading.css.js';

/**
 * @element sp-sidenav-heading
 *
 * @slot - the Sidenav Items to display in association with the heading
 */
export class SideNavHeading extends SpectrumElement {
    @property({ reflect: true })
    public label = '';

    public static override get styles(): CSSResultArray {
        return [sidenavItemStyles, sidenavHeadingStyles];
    }

    protected override update(changes: PropertyValues): void {
        if (!this.hasAttribute('slot')) {
            this.slot = 'descendant';
        }
        super.update(changes);
    }

    protected override render(): TemplateResult {
        return html`
            <h2 id="heading">${this.label}</h2>
            <div id="list" aria-labelledby="heading" role="list">
                <slot name="descendant"></slot>
            </div>
        `;
    }

    protected override firstUpdated(changed: PropertyValues<this>): void {
        super.firstUpdated(changed);
        this.setAttribute('role', 'listitem');
    }
}
