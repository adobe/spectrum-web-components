/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { css } from 'lit-element';
export default css `
:host,:root{--spectrum-dropdown-placeholder-text-color:#8e8e8e;--spectrum-dropdown-text-color:#4b4b4b;--spectrum-dropdown-background-color:#fafafa;--spectrum-dropdown-border-color:#e1e1e1;--spectrum-dropdown-icon-color:#6e6e6e;--spectrum-dropdown-placeholder-text-color-hover:#2c2c2c;--spectrum-dropdown-text-color-hover:#2c2c2c;--spectrum-dropdown-background-color-hover:#fff;--spectrum-dropdown-border-color-hover:#cacaca;--spectrum-dropdown-icon-color-hover:#2c2c2c;--spectrum-dropdown-placeholder-text-color-key-focus:#2c2c2c;--spectrum-dropdown-text-color-key-focus:#2c2c2c;--spectrum-dropdown-background-color-key-focus:#fff;--spectrum-dropdown-border-color-key-focus:#2680eb;--spectrum-dropdown-icon-color-key-focus:#2c2c2c;--spectrum-dropdown-placeholder-text-color-disabled:#b3b3b3;--spectrum-dropdown-text-color-disabled:#b3b3b3;--spectrum-dropdown-background-color-disabled:#eaeaea;--spectrum-dropdown-border-color-disabled:#eaeaea;--spectrum-dropdown-icon-color-disabled:#cacaca;--spectrum-dropdown-validation-icon-color-disabled:#b3b3b3;--spectrum-dropdown-text-color-down:#2c2c2c;--spectrum-dropdown-background-color-down:#eaeaea;--spectrum-dropdown-border-color-down:#cacaca;--spectrum-dropdown-icon-color-down:#2c2c2c;--spectrum-dropdown-placeholder-text-color-down:#2c2c2c;--spectrum-dropdown-text-color-mouse-focus:#2c2c2c;--spectrum-dropdown-background-color-mouse-focus:#eaeaea;--spectrum-dropdown-border-color-mouse-focus:#cacaca;--spectrum-dropdown-icon-color-mouse-focus:#2c2c2c;--spectrum-dropdown-placeholder-text-color-mouse-focus:#2c2c2c;--spectrum-dropdown-border-color-error:#d7373f;--spectrum-dropdown-validation-icon-color-error:#c9252d;--spectrum-dropdown-border-color-error-hover:#c9252d;--spectrum-dropdown-validation-icon-color-error-hover:#c9252d;--spectrum-dropdown-border-color-error-down:#c9252d;--spectrum-dropdown-validation-icon-color-error-down:#c9252d;--spectrum-dropdown-border-color-error-key-focus:#2680eb;--spectrum-dropdown-validation-icon-color-error-key-focus:#c9252d;--spectrum-dropdown-border-color-error-mouse-focus:#d7373f;--spectrum-dropdown-validation-icon-color-error-mouse-focus:#c9252d;--spectrum-dropdown-quiet-placeholder-text-color:#8e8e8e;--spectrum-dropdown-quiet-text-color:#4b4b4b;--spectrum-dropdown-quiet-background-color:transparent;--spectrum-dropdown-quiet-border-color:transparent;--spectrum-dropdown-quiet-icon-color:#6e6e6e;--spectrum-dropdown-quiet-placeholder-text-color-hover:#2c2c2c;--spectrum-dropdown-quiet-text-color-hover:#2c2c2c;--spectrum-dropdown-quiet-background-color-hover:transparent;--spectrum-dropdown-quiet-border-color-hover:transparent;--spectrum-dropdown-quiet-icon-color-hover:#2c2c2c;--spectrum-dropdown-quiet-placeholder-text-color-key-focus:#2c2c2c;--spectrum-dropdown-quiet-text-color-key-focus:#2c2c2c;--spectrum-dropdown-quiet-background-color-key-focus:transparent;--spectrum-dropdown-quiet-border-color-key-focus:#2680eb;--spectrum-dropdown-quiet-icon-color-key-focus:#2c2c2c;--spectrum-dropdown-quiet-placeholder-text-color-disabled:#b3b3b3;--spectrum-dropdown-quiet-text-color-disabled:#b3b3b3;--spectrum-dropdown-quiet-background-color-disabled:transparent;--spectrum-dropdown-quiet-border-color-disabled:transparent;--spectrum-dropdown-quiet-icon-color-disabled:#cacaca;--spectrum-dropdown-quiet-validation-icon-color-disabled:#b3b3b3;--spectrum-dropdown-quiet-text-color-down:#2c2c2c;--spectrum-dropdown-quiet-background-color-down:transparent;--spectrum-dropdown-quiet-border-color-down:transparent;--spectrum-dropdown-quiet-icon-color-down:#2c2c2c;--spectrum-dropdown-quiet-placeholder-text-color-down:#2c2c2c;--spectrum-dropdown-quiet-text-color-mouse-focus:#2c2c2c;--spectrum-dropdown-quiet-background-color-mouse-focus:transparent;--spectrum-dropdown-quiet-border-color-mouse-focus:#cacaca;--spectrum-dropdown-quiet-icon-color-mouse-focus:#2c2c2c;--spectrum-dropdown-quiet-placeholder-text-color-mouse-focus:#2c2c2c;--spectrum-dropdown-quiet-border-color-error:#d7373f;--spectrum-dropdown-quiet-validation-icon-color-error:#c9252d;--spectrum-dropdown-quiet-border-color-error-hover:#c9252d;--spectrum-dropdown-quiet-validation-icon-color-error-hover:#c9252d;--spectrum-dropdown-quiet-border-color-error-down:#c9252d;--spectrum-dropdown-quiet-validation-icon-color-error-down:#c9252d;--spectrum-dropdown-quiet-border-color-error-key-focus:#2680eb;--spectrum-dropdown-quiet-validation-icon-color-error-key-focus:#c9252d;--spectrum-dropdown-quiet-border-color-error-mouse-focus:#d7373f;--spectrum-dropdown-quiet-validation-icon-color-error-mouse-focus:#c9252d;--spectrum-dropdown-thumbnail-small-placeholder-text-color:#8e8e8e;--spectrum-dropdown-thumbnail-small-text-color:#4b4b4b;--spectrum-dropdown-thumbnail-small-background-color:#fafafa;--spectrum-dropdown-thumbnail-small-border-color:#e1e1e1;--spectrum-dropdown-thumbnail-small-icon-color:#6e6e6e;--spectrum-dropdown-thumbnail-small-placeholder-text-color-hover:#2c2c2c;--spectrum-dropdown-thumbnail-small-text-color-hover:#2c2c2c;--spectrum-dropdown-thumbnail-small-background-color-hover:#fff;--spectrum-dropdown-thumbnail-small-border-color-hover:#cacaca;--spectrum-dropdown-thumbnail-small-icon-color-hover:#2c2c2c;--spectrum-dropdown-thumbnail-small-placeholder-text-color-key-focus:#2c2c2c;--spectrum-dropdown-thumbnail-small-text-color-key-focus:#2c2c2c;--spectrum-dropdown-thumbnail-small-background-color-key-focus:#fff;--spectrum-dropdown-thumbnail-small-border-color-key-focus:#2680eb;--spectrum-dropdown-thumbnail-small-icon-color-key-focus:#2c2c2c;--spectrum-dropdown-thumbnail-small-placeholder-text-color-disabled:#b3b3b3;--spectrum-dropdown-thumbnail-small-text-color-disabled:#b3b3b3;--spectrum-dropdown-thumbnail-small-background-color-disabled:#eaeaea;--spectrum-dropdown-thumbnail-small-border-color-disabled:#eaeaea;--spectrum-dropdown-thumbnail-small-icon-color-disabled:#cacaca;--spectrum-dropdown-thumbnail-small-validation-icon-color-disabled:#b3b3b3;--spectrum-dropdown-thumbnail-small-text-color-down:#2c2c2c;--spectrum-dropdown-thumbnail-small-background-color-down:#eaeaea;--spectrum-dropdown-thumbnail-small-border-color-down:#cacaca;--spectrum-dropdown-thumbnail-small-icon-color-down:#2c2c2c;--spectrum-dropdown-thumbnail-small-placeholder-text-color-down:#2c2c2c;--spectrum-dropdown-thumbnail-small-text-color-mouse-focus:#2c2c2c;--spectrum-dropdown-thumbnail-small-background-color-mouse-focus:#eaeaea;--spectrum-dropdown-thumbnail-small-border-color-mouse-focus:#cacaca;--spectrum-dropdown-thumbnail-small-icon-color-mouse-focus:#2c2c2c;--spectrum-dropdown-thumbnail-small-placeholder-text-color-mouse-focus:#2c2c2c;--spectrum-dropdown-thumbnail-small-border-color-error:#d7373f;--spectrum-dropdown-thumbnail-small-validation-icon-color-error:#c9252d;--spectrum-dropdown-thumbnail-small-border-color-error-hover:#c9252d;--spectrum-dropdown-thumbnail-small-validation-icon-color-error-hover:#c9252d;--spectrum-dropdown-thumbnail-small-border-color-error-down:#c9252d;--spectrum-dropdown-thumbnail-small-validation-icon-color-error-down:#c9252d;--spectrum-dropdown-thumbnail-small-border-color-error-key-focus:#2680eb;--spectrum-dropdown-thumbnail-small-validation-icon-color-error-key-focus:#c9252d;--spectrum-dropdown-thumbnail-small-border-color-error-mouse-focus:#d7373f;--spectrum-dropdown-thumbnail-small-validation-icon-color-error-mouse-focus:#c9252d}
`;

//# sourceMappingURL=dropdown.css.js.map
