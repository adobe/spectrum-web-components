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
import { __decorate } from "tslib";
import { property } from 'lit-element';
import { ButtonBase } from './ButtonBase.js';
import buttonStyles from './action-button.css.js';
export class ActionButton extends ButtonBase {
    constructor() {
        super();
        this.holdAffordance = false;
        this.selected = false;
        this.toggles = false;
        this.quiet = false;
        this.onClick = () => {
            if (!this.toggles) {
                return;
            }
            this.selected = !this.selected;
        };
        this.addEventListener('click', this.onClick);
    }
    static get styles() {
        return [...super.styles, buttonStyles];
    }
    updated(changes) {
        super.updated(changes);
        if (this.toggles && changes.has('selected')) {
            this.focusElement.setAttribute('aria-pressed', this.selected ? 'true' : 'false');
        }
    }
}
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'hold-affordance' })
], ActionButton.prototype, "holdAffordance", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ActionButton.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ActionButton.prototype, "toggles", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ActionButton.prototype, "quiet", void 0);
//# sourceMappingURL=ActionButton.js.map