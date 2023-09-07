/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { ActionBar as ActionBarBase } from '../src/ActionBar';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { Popover } from '@spectrum-web-components/popover';
import { ActionGroup } from '@spectrum-web-components/action-group';
import { CloseButton } from '@spectrum-web-components/button';
import { FieldLabel } from '@spectrum-web-components/field-label';

export class ActionBarScoped extends ScopedRegistryHost(ActionBarBase) {
    // The component we define here would be registered within the scope of this class.
    static elementDefinitions = {
        'sp-popover': Popover,
        'sp-action-group': ActionGroup,
        'sp-close-button': CloseButton,
        'sp-field-label': FieldLabel,
    };
}
