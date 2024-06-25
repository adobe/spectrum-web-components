/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    CSSResultArray,
    html,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    classMap,
    ifDefined,
} from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';

import styles from './breadcrumb-item.css.js';

import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';

export class BreadcrumbItem extends LikeAnchor(Focusable) {
    public static override get styles(): CSSResultArray {
        return [styles, chevronStyles];
    }

    @query('#anchor')
    anchorElement!: HTMLAnchorElement;

    @property({ attribute: 'is-menu', type: Boolean })
    public isMenu = false;

    @property({ type: Boolean })
    public isLastOfType = false;

    public override get focusElement(): HTMLElement & {
        disabled?: boolean | undefined;
    } {
        return this.anchorElement || this;
    }

    protected renderLink(): TemplateResult {
        return this.isLastOfType
            ? html`
                  <span><slot></slot></span>
              `
            : html`
                  <a
                      id="anchor"
                      part="link"
                      class=${classMap({
                          link: true,
                          'is-disabled': this.disabled,
                      })}
                      aria-disabled=${this.disabled}
                      href=${ifDefined(this.href)}
                  >
                      <slot></slot>
                  </a>
              `;
    }

    private renderSeparator(): TemplateResult {
        return html`
            <sp-icon-chevron100
                part="separator"
                size="xs"
                class="separator spectrum-UIIcon-ChevronRight100"
            ></sp-icon-chevron100>
        `;
    }

    protected override render(): TemplateResult {
        // console.log(this.isLastOfType);
        return html`
            ${this.isMenu
                ? html`
                      <slot></slot>
                  `
                : this.renderLink()}
            ${this.isLastOfType ? '' : this.renderSeparator()}
        `;
    }
}
