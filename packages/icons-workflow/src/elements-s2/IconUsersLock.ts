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

import { html, TemplateResult } from '@spectrum-web-components/base';
import { IconBase } from '@spectrum-web-components/icon';

import { UsersLockIcon } from '../icons-s2/UsersLock.js';
import { setCustomTemplateLiteralTag } from '../custom-tag.js';

/**
 * @element sp-icon-s2-users-lock
 */
export class IconUsersLock extends IconBase {
    protected override render(): TemplateResult {
        setCustomTemplateLiteralTag(html);
        return UsersLockIcon({
            hidden: !this.label,
            title: this.label,
        }) as TemplateResult;
    }
}
