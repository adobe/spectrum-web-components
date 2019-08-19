/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    html,
    LitElement,
    CSSResultArray,
    TemplateResult,
    property,
} from 'lit-element';

import { StrictCustomEvent } from '../events';
import sidenavStyles from './sidenav.css';

export interface SidenavSelectDetail {
    value: string;
}

export class SideNav extends LitElement {
    public static readonly is = 'sp-sidenav';

    public static get styles(): CSSResultArray {
        return [sidenavStyles];
    }

    @property({ reflect: true })
    public value: string | undefined = undefined;

    private handleSelect(ev: StrictCustomEvent<'sp-sidenav:select'>): void {
        this.value = ev.detail.value;
    }

    protected render(): TemplateResult {
        return html`
            <nav @sidenav-select=${this.handleSelect}>
                <ul>
                    <slot></slot>
                </ul>
            </nav>
        `;
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-sidenav:select': CustomEvent<SidenavSelectDetail>;
    }
}
