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

import { html, CSSResultArray } from 'lit-element';
import './side-nav';
import layoutStyles from './layout.css';
import { RouteComponent } from './route-component';

export class LayoutElement extends RouteComponent {
    public static get styles(): CSSResultArray {
        return [layoutStyles];
    }

    renderContent() {
        return html`
            <div></div>
        `;
    }

    render() {
        return html`
            <div id="app">
                <div id="body">
                    <docs-side-nav id="side-nav"></docs-side-nav>
                    <div id="layout-content">
                        <div id="page">
                            ${this.renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
